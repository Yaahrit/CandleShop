const express = require('express');
const cors = require('cors');
const path = require('path');
const crypto = require('crypto');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and JSON parsing middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets from the current directory
app.use(express.static(path.join(__dirname)));

// Seed database on startup
db.readDb().catch(err => {
  console.error('Error seeding DB on startup:', err);
});

// ---------- REST API Endpoints ----------

// 1. Get all products
app.get('/api/products', async (req, res) => {
  try {
    const dbData = await db.readDb();
    res.json(dbData.products);
  } catch (error) {
    console.error('Fetch products error:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// 2. Get single product detail
app.get('/api/products/:id', async (req, res) => {
  try {
    const dbData = await db.readDb();
    const product = dbData.products.find(p => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Fetch product error:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// 3. Post a new product review
app.post('/api/products/:id/reviews', async (req, res) => {
  try {
    const { user, rating, title, text } = req.body;
    if (!user || !rating || !title || !text) {
      return res.status(400).json({ error: 'All fields (user, rating, title, text) are required' });
    }
    const dbData = await db.readDb();
    const product = dbData.products.find(p => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const newReview = {
      user: user.trim(),
      rating: parseInt(rating),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      title: title.trim(),
      text: text.trim()
    };

    product.reviews = product.reviews || [];
    product.reviews.unshift(newReview);

    // Recalculate average rating
    const totalRating = product.reviews.reduce((sum, r) => sum + r.rating, 0);
    product.rating = parseFloat((totalRating / product.reviews.length).toFixed(1));

    await db.writeDb(dbData);
    res.status(201).json(product);
  } catch (error) {
    console.error('Post review error:', error);
    res.status(500).json({ error: 'Failed to save review' });
  }
});

// 4. Place a new order
app.post('/api/orders', async (req, res) => {
  try {
    const { items, total, customer } = req.body;
    if (!items || !total || !customer || !customer.name || !customer.email || !customer.address) {
      return res.status(400).json({ error: 'Invalid order data. Customer details and cart items are required' });
    }
    const dbData = await db.readDb();
    const newOrder = {
      orderId: 'V&V-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      items,
      total: parseFloat(total),
      customer
    };
    dbData.orders = dbData.orders || [];
    dbData.orders.push(newOrder);
    await db.writeDb(dbData);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Place order error:', error);
    res.status(500).json({ error: 'Failed to process order' });
  }
});

// 5. Submit newsletter subscriber email
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    const dbData = await db.readDb();
    dbData.subscribers = dbData.subscribers || [];
    const normalizedEmail = email.trim().toLowerCase();
    if (!dbData.subscribers.includes(normalizedEmail)) {
      dbData.subscribers.push(normalizedEmail);
      await db.writeDb(dbData);
    }
    res.status(200).json({ message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Newsletter error:', error);
    res.status(500).json({ error: 'Failed to subscribe' });
  }
});

// 6. User registration
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }
    const dbData = await db.readDb();
    dbData.users = dbData.users || [];
    const emailLower = email.trim().toLowerCase();
    if (dbData.users.some(u => u.email === emailLower)) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // SHA-256 password hashing simulation
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    const newUser = {
      id: 'u-' + crypto.randomBytes(4).toString('hex'),
      name: name.trim(),
      email: emailLower,
      password: hashedPassword,
      registeredAt: new Date().toISOString()
    };
    dbData.users.push(newUser);
    await db.writeDb(dbData);

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// 7. User login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const dbData = await db.readDb();
    const emailLower = email.trim().toLowerCase();
    const user = dbData.users.find(u => u.email === emailLower);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    if (user.password !== hashedPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate session token
    const token = crypto.randomBytes(32).toString('hex');
    user.token = token;
    await db.writeDb(dbData);

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// 8. Fetch profile details (secure)
app.get('/api/auth/profile', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization token required' });
    }
    const token = authHeader.split(' ')[1];
    const dbData = await db.readDb();
    const user = dbData.users.find(u => u.token === token);
    if (!user) {
      return res.status(401).json({ error: 'Invalid or expired session token' });
    }

    // Retrieve historical orders for this user's email
    const orders = dbData.orders.filter(o => o.customer.email.toLowerCase() === user.email.toLowerCase());

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      orders
    });
  } catch (error) {
    console.error('Fetch profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// 9. User logout
app.post('/api/auth/logout', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const dbData = await db.readDb();
      const user = dbData.users.find(u => u.token === token);
      if (user) {
        delete user.token;
        await db.writeDb(dbData);
      }
    }
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
});

// Start Express server
app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`VESPER & VINE - Backend Server Running`);
  console.log(`Local Access: http://localhost:${PORT}`);
  console.log(`Statically serving frontend pages`);
  console.log(`=========================================`);
});
