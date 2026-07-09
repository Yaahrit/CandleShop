const express = require('express');
const cors = require('cors');
const path = require('path');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');
const PDFDocument = require('pdfkit');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'vesper-and-vine-luxury-scent-key-9988';

// ---------- Security Headers Middleware ----------
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self' https://cdn.jsdelivr.net; img-src 'self' data:; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;"
  );
  next();
});

// ---------- Rate Limiting ----------
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 150, // limit each IP to 150 requests per window
  message: { error: 'Too many requests from this IP, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // stricter limit for login/register
  message: { error: 'Too many login attempts, please try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false
});

// Enable CORS and body parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply rate limits
app.use('/api/', apiLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// Serve static assets from the current directory
app.use(express.static(path.join(__dirname)));

// ---------- Helper Middlewares & Validators ----------
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access token required' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired session token' });
  }
}

function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Administrator access required.' });
  }
  next();
}

// CSRF Validation (Double submit verification check for mutations)
function validateCSRF(req, res, next) {
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    const origin = req.headers.origin || req.headers.referer;
    if (origin && !origin.includes(req.headers.host)) {
      return res.status(403).json({ error: 'CSRF verification failed. Cross-origin request denied.' });
    }
  }
  next();
}
app.use(validateCSRF);

// Input Validation helpers
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function validateEmail(email) {
  return email && emailRegex.test(email);
}

// Seed database on startup
db.readDb().catch(err => {
  console.error('Error seeding DB on startup:', err);
});

// ---------- REST API Endpoints ----------

// 1. Get all products
app.get('/api/products', async (req, res, next) => {
  try {
    const dbData = await db.readDb();
    res.json(dbData.products);
  } catch (error) {
    next(error);
  }
});

// 2. Get single product detail
app.get('/api/products/:id', async (req, res, next) => {
  try {
    const dbData = await db.readDb();
    const product = dbData.products.find(p => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// 3. Post a new product review
app.post('/api/products/:id/reviews', async (req, res, next) => {
  try {
    const { user, rating, title, text } = req.body;
    if (!user || !rating || !title || !text) {
      return res.status(400).json({ error: 'All fields (user, rating, title, text) are required' });
    }
    const cleanRating = parseInt(rating);
    if (isNaN(cleanRating) || cleanRating < 1 || cleanRating > 5) {
      return res.status(400).json({ error: 'Rating must be an integer between 1 and 5' });
    }

    const dbData = await db.readDb();
    const product = dbData.products.find(p => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const newReview = {
      user: user.trim(),
      rating: cleanRating,
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
    next(error);
  }
});

// 4. Place a new order
app.post('/api/orders', async (req, res, next) => {
  try {
    const { items, total, customer, couponCode, giftCardCode } = req.body;
    if (!items || !total || !customer || !customer.name || !customer.email || !customer.address) {
      return res.status(400).json({ error: 'Invalid order data. Customer details and items are required' });
    }

    const dbData = await db.readDb();
    let finalTotal = parseFloat(total);

    // 1. Coupon validation
    let couponApplied = null;
    if (couponCode) {
      const dbCoupon = dbData.coupons?.find(c => c.code.toUpperCase() === couponCode.toUpperCase() && c.isActive);
      if (dbCoupon) {
        couponApplied = { code: dbCoupon.code, discountType: dbCoupon.discountType, value: dbCoupon.value };
        if (dbCoupon.discountType === 'percentage') {
          finalTotal = finalTotal * (1 - dbCoupon.value / 100);
        } else if (dbCoupon.discountType === 'fixed') {
          finalTotal = Math.max(0, finalTotal - dbCoupon.value);
        }
      }
    }

    // 2. Gift Card validation & deduction
    let giftCardApplied = null;
    if (giftCardCode) {
      const dbCard = dbData.giftCards?.find(gc => gc.code.toUpperCase() === giftCardCode.toUpperCase() && gc.isActive);
      if (dbCard) {
        if (dbCard.balance > 0) {
          const deduction = Math.min(finalTotal, dbCard.balance);
          dbCard.balance = parseFloat((dbCard.balance - deduction).toFixed(2));
          if (dbCard.balance <= 0) {
            dbCard.isActive = false;
          }
          finalTotal = parseFloat((finalTotal - deduction).toFixed(2));
          giftCardApplied = { code: dbCard.code, amountDeducted: deduction };
        }
      }
    }

    // Ensure final total is positive
    finalTotal = Math.max(0, finalTotal);

    const orderId = 'V&V-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      orderId,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      items,
      total: parseFloat(finalTotal.toFixed(2)),
      customer,
      status: 'processing',
      coupon: couponApplied,
      giftCard: giftCardApplied
    };

    dbData.orders = dbData.orders || [];
    dbData.orders.push(newOrder);

    // 3. User account updates if logged in
    const user = dbData.users.find(u => u.email.toLowerCase() === customer.email.toLowerCase());
    if (user) {
      // Award loyalty points: 1 point per $1 spent
      const pointsEarned = Math.round(newOrder.total);
      user.points = (user.points || 0) + pointsEarned;

      // Add default order notification to user's profile
      user.notifications = user.notifications || [];
      user.notifications.unshift({
        id: 'notif-' + crypto.randomBytes(3).toString('hex'),
        title: 'Order Confirmed',
        message: `Your scent request #${orderId} is being hand-poured in the atelier. (+${pointsEarned} points)`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        read: false
      });
    }

    await db.writeDb(dbData);
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
});

// 5. Submit newsletter subscriber email
app.post('/api/newsletter', async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Please specify a valid email address.' });
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
    next(error);
  }
});

// 6. User registration
app.post('/api/auth/register', async (req, res, next) => {
  try {
    const { name, email, password, referralCode } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Please enter a valid email format' });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    const dbData = await db.readDb();
    dbData.users = dbData.users || [];
    const emailLower = email.trim().toLowerCase();
    if (dbData.users.some(u => u.email === emailLower)) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const selfReferralCode = name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + crypto.randomBytes(2).toString('hex');

    const newUser = {
      id: 'u-' + crypto.randomBytes(4).toString('hex'),
      name: name.trim(),
      email: emailLower,
      password: hashedPassword,
      role: 'customer',
      registeredAt: new Date().toISOString(),
      addresses: [],
      paymentMethods: [],
      notifications: [],
      points: 100, // Starter loyalty points
      referralCode: selfReferralCode
    };

    // Handle incoming referral links
    if (referralCode) {
      const referrer = dbData.users.find(u => u.referralCode === referralCode);
      if (referrer) {
        referrer.points = (referrer.points || 0) + 50; // Give referrer 50 points
        newUser.points += 50; // Give new user 50 points
        referrer.notifications = referrer.notifications || [];
        referrer.notifications.unshift({
          id: 'notif-' + crypto.randomBytes(3).toString('hex'),
          title: 'Referral Reward!',
          message: `${newUser.name} registered using your referral code. (+50 points)`,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
          read: false
        });
      }
    }

    newUser.notifications.push({
      id: 'notif-welcome',
      title: 'Welcome to Vesper & Vine',
      message: 'Thank you for registering. You have been awarded 100 scent points to start your journey.',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      read: false
    });

    dbData.users.push(newUser);
    await db.writeDb(dbData);

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    next(error);
  }
});

// 7. User login (JWT auth)
app.post('/api/auth/login', async (req, res, next) => {
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

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Sign securely with JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role || 'customer' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || 'customer'
      }
    });
  } catch (error) {
    next(error);
  }
});

// 8. Fetch profile details (secure JWT-based)
app.get('/api/auth/profile', authenticateToken, async (req, res, next) => {
  try {
    const dbData = await db.readDb();
    const user = dbData.users.find(u => u.id === req.user.id);
    if (!user) {
      return res.status(401).json({ error: 'User session not found.' });
    }

    const orders = dbData.orders.filter(o => o.customer.email.toLowerCase() === user.email.toLowerCase());

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || 'customer',
        addresses: user.addresses || [],
        paymentMethods: user.paymentMethods || [],
        notifications: user.notifications || [],
        points: user.points || 0,
        referralCode: user.referralCode || ''
      },
      orders
    });
  } catch (error) {
    next(error);
  }
});

// 9. Update profile settings
app.post('/api/auth/profile/update', authenticateToken, async (req, res, next) => {
  try {
    const { firstName, lastName, email } = req.body;
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: 'First name, last name, and email are required.' });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Please enter a valid email format.' });
    }

    const dbData = await db.readDb();
    const user = dbData.users.find(u => u.id === req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User profile not found.' });
    }

    const newEmailLower = email.trim().toLowerCase();
    if (newEmailLower !== user.email.toLowerCase()) {
      if (dbData.users.some(u => u.email === newEmailLower && u.id !== user.id)) {
        return res.status(400).json({ error: 'Email already in use by another account.' });
      }
      // Update email on customer orders history
      dbData.orders.forEach(o => {
        if (o.customer.email.toLowerCase() === user.email.toLowerCase()) {
          o.customer.email = newEmailLower;
        }
      });
      user.email = newEmailLower;
    }

    user.name = `${firstName.trim()} ${lastName.trim()}`;
    await db.writeDb(dbData);

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    next(error);
  }
});

// 10. Saved Addresses CRUD
app.post('/api/auth/addresses', authenticateToken, async (req, res, next) => {
  try {
    const { action, addressId, addressData } = req.body;
    const dbData = await db.readDb();
    const user = dbData.users.find(u => u.id === req.user.id);
    if (!user) return res.status(404).json({ error: 'User profile not found.' });

    user.addresses = user.addresses || [];

    if (action === 'save') {
      if (addressId) {
        // Edit existing
        const idx = user.addresses.findIndex(a => a.id === addressId);
        if (idx !== -1) {
          user.addresses[idx] = { ...user.addresses[idx], ...addressData };
          if (addressData.isDefault) {
            user.addresses.forEach((a, i) => { if (i !== idx) a.isDefault = false; });
          }
        }
      } else {
        // Add new
        const newAddr = {
          id: 'addr-' + crypto.randomBytes(3).toString('hex'),
          ...addressData,
          orderCount: 0,
          lastUsed: 'Never'
        };
        if (newAddr.isDefault) {
          user.addresses.forEach(a => a.isDefault = false);
        }
        user.addresses.push(newAddr);
      }
    } else if (action === 'delete') {
      user.addresses = user.addresses.filter(a => a.id !== addressId);
    }

    await db.writeDb(dbData);
    res.json(user.addresses);
  } catch (error) {
    next(error);
  }
});

// 11. Payment Methods CRUD
app.post('/api/auth/payment-methods', authenticateToken, async (req, res, next) => {
  try {
    const { action, methodId, cardData } = req.body;
    const dbData = await db.readDb();
    const user = dbData.users.find(u => u.id === req.user.id);
    if (!user) return res.status(404).json({ error: 'User profile not found.' });

    user.paymentMethods = user.paymentMethods || [];

    if (action === 'save') {
      const last4 = cardData.cardNumber.slice(-4);
      const newMethod = {
        id: 'pm-' + crypto.randomBytes(3).toString('hex'),
        cardholderName: cardData.cardholderName,
        cardNumber: `•••• •••• •••• ${last4}`,
        expiryDate: cardData.expiryDate,
        cardType: cardData.cardType || 'Visa',
        isDefault: cardData.isDefault
      };
      if (newMethod.isDefault) {
        user.paymentMethods.forEach(pm => pm.isDefault = false);
      }
      user.paymentMethods.push(newMethod);
    } else if (action === 'delete') {
      user.paymentMethods = user.paymentMethods.filter(pm => pm.id !== methodId);
    }

    await db.writeDb(dbData);
    res.json(user.paymentMethods);
  } catch (error) {
    next(error);
  }
});

// 12. Read notifications
app.post('/api/auth/notifications/read', authenticateToken, async (req, res, next) => {
  try {
    const dbData = await db.readDb();
    const user = dbData.users.find(u => u.id === req.user.id);
    if (user && user.notifications) {
      user.notifications.forEach(n => n.read = true);
      await db.writeDb(dbData);
    }
    res.json({ message: 'Notifications read successfully' });
  } catch (error) {
    next(error);
  }
});

// 13. Simulated password reset request
app.post('/api/auth/forgot-password', async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Please specify a valid email address.' });
    }
    const dbData = await db.readDb();
    const user = dbData.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      // Avoid enum checking vulnerability, return status 200
      return res.json({ message: 'If the email matches an active account, reset instructions will be sent shortly.' });
    }

    const resetToken = crypto.randomBytes(24).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpires = Date.now() + 3600000; // 1 hour

    // Log simulated email to db
    dbData.emailLogs = dbData.emailLogs || [];
    const simulatedLink = `${req.protocol}://${req.headers.host}/login.html?resetToken=${resetToken}`;
    dbData.emailLogs.push({
      id: 'email-' + crypto.randomBytes(3).toString('hex'),
      to: user.email,
      subject: 'Reset Password - Vesper & Vine Scent Atelier',
      body: `Hi ${user.name},\n\nYou requested a password reset. Please click this link within 1 hour to choose a new password:\n${simulatedLink}\n\nWarmly,\nVesper & Vine`,
      date: new Date().toISOString()
    });

    await db.writeDb(dbData);
    res.json({
      message: 'If the email matches an active account, reset instructions will be sent shortly.',
      simulatedLink // Returned for simulation/testing in browser console
    });
  } catch (error) {
    next(error);
  }
});

// 14. Password reset verify & write
app.post('/api/auth/reset-password', async (req, res, next) => {
  try {
    const { resetToken, password } = req.body;
    if (!resetToken || !password) {
      return res.status(400).json({ error: 'Token and new password are required.' });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long.' });
    }

    const dbData = await db.readDb();
    const user = dbData.users.find(u => u.resetToken === resetToken && u.resetTokenExpires > Date.now());
    if (!user) {
      return res.status(400).json({ error: 'Password reset link is invalid or has expired.' });
    }

    user.password = bcrypt.hashSync(password, 10);
    delete user.resetToken;
    delete user.resetTokenExpires;

    await db.writeDb(dbData);
    res.json({ message: 'Password has been updated successfully.' });
  } catch (error) {
    next(error);
  }
});

// 15. Server-Side Branded Invoice PDF Generation
app.get('/api/orders/:orderId/invoice', async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const dbData = await db.readDb();
    const order = dbData.orders.find(o => o.orderId === orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // PDF generation using pdfkit
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    
    // Set headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=invoice-${orderId}.pdf`);
    
    doc.pipe(res);
    
    // Branding / Header (Lux minimal aesthetic)
    const orderStatus = (order.status || 'processing').toUpperCase();
    const orderDate = order.date || new Date().toLocaleDateString('en-US');
    const customerName = order.customer?.name || 'Sanctuary Customer';
    const customerEmail = order.customer?.email || '';
    const customerAddress = order.customer?.address || 'Atelier Delivery';
    const items = order.items || [];

    doc.fillColor('#2C2825')
       .font('Helvetica-Bold')
       .fontSize(22)
       .text('VESPER & VINE', 50, 50);
    
    doc.font('Helvetica-Oblique')
       .fontSize(10)
       .fillColor('#C4A265')
       .text('Consciously Crafted Scents', 50, 78);
    
    doc.font('Helvetica')
       .fontSize(9)
       .text('info@vesperandvine.com | Baltimore, MD', 50, 90);

    // Invoice Metadata right-aligned
    doc.fillColor('#2C2825')
       .font('Helvetica-Bold')
       .fontSize(12)
       .text('INVOICE / RECEIPT', 380, 50, { align: 'right' });
    
    doc.font('Helvetica')
       .fontSize(9)
       .fillColor('#6B635B')
       .text(`Invoice No: INV-${order.orderId.replace('V&V-', '')}`, 380, 68, { align: 'right' })
       .text(`Date Placed: ${orderDate}`, 380, 80, { align: 'right' })
       .text(`Status: ${orderStatus}`, 380, 92, { align: 'right' });

    // Decorative Line separator
    doc.moveTo(50, 115).lineTo(545, 115).strokeColor('#DDD6CD').lineWidth(1).stroke();

    // Billing / Shipping Details
    doc.fillColor('#2C2825')
       .font('Helvetica-Bold')
       .fontSize(10)
       .text('DELIVERED TO:', 50, 135);

    doc.font('Helvetica')
       .fontSize(9)
       .fillColor('#6B635B')
       .text(customerName, 50, 150)
       .text(customerEmail, 50, 162)
       .text(customerAddress, 50, 174, { width: 220 });

    // Payment details column
    doc.fillColor('#2C2825')
       .font('Helvetica-Bold')
       .text('PAYMENT DETAILS:', 320, 135);

    doc.font('Helvetica')
       .fontSize(9)
       .fillColor('#6B635B')
       .text('Method: Secured Payment Gateway', 320, 150)
       .text(`Transaction ID: tx-${crypto.randomBytes(6).toString('hex')}`, 320, 162);

    // Table Header
    doc.moveTo(50, 220).lineTo(545, 220).strokeColor('#DDD6CD').stroke();
    
    doc.fillColor('#2C2825')
       .font('Helvetica-Bold')
       .fontSize(9)
       .text('Item Description', 55, 230)
       .text('Qty', 350, 230, { width: 30, align: 'center' })
       .text('Unit Price', 400, 230, { width: 60, align: 'right' })
       .text('Amount', 480, 230, { width: 60, align: 'right' });

    doc.moveTo(50, 245).lineTo(545, 245).strokeColor('#E8E2DA').stroke();

    let yPosition = 255;
    items.forEach(item => {
      doc.fillColor('#6B635B')
         .font('Helvetica')
         .fontSize(9)
         .text(`${item.name} (${item.scent || 'Artisanal Blend'})`, 55, yPosition, { width: 280 })
         .text(item.qty.toString(), 350, yPosition, { width: 30, align: 'center' })
         .text(`$${item.price.toFixed(2)}`, 400, yPosition, { width: 60, align: 'right' })
         .text(`$${(item.price * item.qty).toFixed(2)}`, 480, yPosition, { width: 60, align: 'right' });
      
      yPosition += 20;
    });

    // Summary calculations box
    doc.moveTo(50, yPosition + 5).lineTo(545, yPosition + 5).strokeColor('#DDD6CD').stroke();
    
    yPosition += 15;
    const subtotal = items.reduce((sum, i) => sum + (i.price * i.qty), 0);
    
    doc.fillColor('#6B635B')
       .font('Helvetica')
       .text('Subtotal:', 350, yPosition, { width: 110, align: 'right' })
       .text(`$${subtotal.toFixed(2)}`, 480, yPosition, { width: 60, align: 'right' });

    if (order.coupon) {
      yPosition += 15;
      const discText = order.coupon.discountType === 'percentage' ? `${order.coupon.value}%` : `$${order.coupon.value}`;
      doc.text(`Promo Applied (${order.coupon.code}):`, 350, yPosition, { width: 110, align: 'right' })
         .text(`-${discText}`, 480, yPosition, { width: 60, align: 'right' });
    }

    if (order.giftCard) {
      yPosition += 15;
      doc.text(`Gift Card Deducted (${order.giftCard.code}):`, 350, yPosition, { width: 110, align: 'right' })
         .text(`-$${order.giftCard.amountDeducted.toFixed(2)}`, 480, yPosition, { width: 60, align: 'right' });
    }

    yPosition += 20;
    doc.fillColor('#2C2825')
       .font('Helvetica-Bold')
       .fontSize(10)
       .text('Grand Total:', 350, yPosition, { width: 110, align: 'right' })
       .text(`$${order.total.toFixed(2)}`, 480, yPosition, { width: 60, align: 'right' });

    // Footer note
    doc.moveTo(50, 750).lineTo(545, 750).strokeColor('#DDD6CD').stroke();
    
    doc.font('Helvetica-Oblique')
       .fontSize(8)
       .fillColor('#9B9289')
       .text('Thank you for supporting slow craftsmanship. May this candle ground your sanctuary.', 50, 765, { align: 'center' });

    doc.end();
  } catch (error) {
    next(error);
  }
});

// ---------- ADMINISTRATOR API endpoints ----------

// 1. Analytics & Sales statistics
app.get('/api/admin/analytics', authenticateToken, requireAdmin, async (req, res, next) => {
  try {
    const dbData = await db.readDb();
    const orders = dbData.orders || [];
    
    const activeOrders = orders.filter(o => o.status !== 'cancelled');
    const totalRevenue = activeOrders.reduce((sum, o) => sum + o.total, 0);
    const orderCount = orders.length;
    const avgOrderValue = activeOrders.length > 0 ? parseFloat((totalRevenue / activeOrders.length).toFixed(2)) : 0;
    
    // Scents count mapping
    const scentSales = {};
    orders.forEach(o => {
      if (o.status === 'cancelled') return;
      o.items.forEach(item => {
        const prod = dbData.products.find(p => p.id === item.id);
        const family = prod ? prod.scentFamily : 'other';
        scentSales[family] = (scentSales[family] || 0) + item.qty;
      });
    });

    res.json({
      revenue: parseFloat(totalRevenue.toFixed(2)),
      ordersCount: orderCount,
      aov: avgOrderValue,
      scentFamilyDistribution: scentSales
    });
  } catch (error) {
    next(error);
  }
});

// 2. Fetch all system orders
app.get('/api/admin/orders', authenticateToken, requireAdmin, async (req, res, next) => {
  try {
    const dbData = await db.readDb();
    res.json(dbData.orders || []);
  } catch (error) {
    next(error);
  }
});

// 3. Update Order status + notification dispatch
app.put('/api/admin/orders/:orderId/status', authenticateToken, requireAdmin, async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    if (!status) return res.status(400).json({ error: 'Status attribute is required.' });

    const dbData = await db.readDb();
    const order = dbData.orders.find(o => o.orderId === orderId);
    if (!order) return res.status(404).json({ error: 'Order not found.' });

    const oldStatus = order.status;
    order.status = status.toLowerCase();

    // Alert Customer via log + in-app notification
    const customerUser = dbData.users.find(u => u.email.toLowerCase() === order.customer.email.toLowerCase());
    if (customerUser) {
      customerUser.notifications = customerUser.notifications || [];
      customerUser.notifications.unshift({
        id: 'notif-' + crypto.randomBytes(3).toString('hex'),
        title: `Order status: ${status.toUpperCase()}`,
        message: `Your package #${orderId} has been updated from ${oldStatus} to ${status}.`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        read: false
      });
    }

    // Dispatch tracking email log
    dbData.emailLogs = dbData.emailLogs || [];
    dbData.emailLogs.push({
      id: 'email-' + crypto.randomBytes(3).toString('hex'),
      to: order.customer.email,
      subject: `Order #${orderId} Status Update`,
      body: `Dear customer,\n\nYour order Vesper & Vine #${orderId} is now ${status.toUpperCase()}.\n\nTrack progress on your customer profile dashboard.\n\nBest regards,\nVesper & Vine Support`,
      date: new Date().toISOString()
    });

    await db.writeDb(dbData);
    res.json(order);
  } catch (error) {
    next(error);
  }
});

// 4. Fetch registered customers registry
app.get('/api/admin/customers', authenticateToken, requireAdmin, async (req, res, next) => {
  try {
    const dbData = await db.readDb();
    const customers = dbData.users.map(u => {
      const userOrders = dbData.orders.filter(o => o.customer.email.toLowerCase() === u.email.toLowerCase() && o.status !== 'cancelled');
      const totalSpent = userOrders.reduce((sum, o) => sum + o.total, 0);
      return {
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        registeredAt: u.registeredAt,
        points: u.points || 0,
        totalOrders: userOrders.length,
        totalSpent: parseFloat(totalSpent.toFixed(2))
      };
    });
    res.json(customers);
  } catch (error) {
    next(error);
  }
});

// 5. Products CRUD
app.post('/api/admin/products', authenticateToken, requireAdmin, async (req, res, next) => {
  try {
    const productData = req.body;
    if (!productData.id || !productData.name || !productData.price) {
      return res.status(400).json({ error: 'Product ID, Name, and Price are required.' });
    }
    const dbData = await db.readDb();
    if (dbData.products.some(p => p.id === productData.id)) {
      return res.status(400).json({ error: 'Product ID already exists.' });
    }

    const newProd = {
      ...productData,
      price: parseFloat(productData.price),
      rating: 5.0,
      reviews: []
    };
    dbData.products.push(newProd);
    await db.writeDb(dbData);
    res.status(201).json(newProd);
  } catch (error) {
    next(error);
  }
});

app.put('/api/admin/products/:id', authenticateToken, requireAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const productData = req.body;
    const dbData = await db.readDb();
    const idx = dbData.products.findIndex(p => p.id === id);
    if (idx === -1) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    dbData.products[idx] = {
      ...dbData.products[idx],
      ...productData,
      price: parseFloat(productData.price || dbData.products[idx].price)
    };
    await db.writeDb(dbData);
    res.json(dbData.products[idx]);
  } catch (error) {
    next(error);
  }
});

app.delete('/api/admin/products/:id', authenticateToken, requireAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const dbData = await db.readDb();
    const idx = dbData.products.findIndex(p => p.id === id);
    if (idx === -1) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    dbData.products.splice(idx, 1);
    await db.writeDb(dbData);
    res.json({ message: 'Product deleted successfully.' });
  } catch (error) {
    next(error);
  }
});

// 6. Reply to review
app.post('/api/admin/reviews/:productId/reply', authenticateToken, requireAdmin, async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { reviewUser, replyText } = req.body;
    if (!reviewUser || !replyText) {
      return res.status(400).json({ error: 'Review user name and reply text are required.' });
    }

    const dbData = await db.readDb();
    const product = dbData.products.find(p => p.id === productId);
    if (!product) return res.status(404).json({ error: 'Product not found.' });

    const review = product.reviews?.find(r => r.user === reviewUser);
    if (!review) return res.status(404).json({ error: 'Review not found.' });

    review.reply = replyText.trim();
    await db.writeDb(dbData);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// ---------- Global Error Handling Middleware ----------
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'An unexpected error occurred in our scent atelier. Please try again.'
  });
});

// Start Express server
app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`VESPER & VINE - Backend Server Running`);
  console.log(`Local Access: http://localhost:${PORT}`);
  console.log(`Statically serving frontend pages`);
  console.log(`=========================================`);
});
