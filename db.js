const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_DIR = path.join(__dirname, 'data');
const DB_PATH = path.join(DB_DIR, 'db.json');

// Core products list
const INITIAL_PRODUCTS = [
  {
    id: "lavender-wild-honey",
    name: "Lavender & Wild Honey",
    scent: "French Lavender & Honey",
    scentFamily: "floral",
    badge: "Best Seller",
    price: 52.00,
    image: "images/candle_lavender.png",
    thumbnails: [
      "images/candle_lavender.png",
      "images/candle_tuscan_leather.png",
      "images/candle_midnight_fig.png",
      "images/lifestyle_bedroom.png"
    ],
    description: "A restorative blend designed to transform your space into a sanctuary. Our hand-poured Lavender & Wild Honey candle pairs the botanical clarity of French lavender with the rich, nectarous warmth of locally sourced honey. Each batch is consciously crafted to evoke the stillness of a sun-drenched meadow at dusk.",
    tags: ["Wax Type: 100% Soy", "Burn Time: 60 Hours", "Weight: 12 oz"],
    notes: {
      top: "Lavender & Citrus Zest",
      heart: "Wild Honey & Neroli",
      base: "Madagascar Vanilla & Musk"
    },
    rating: 4.8,
    reviews: [
      { user: "Eleanor R.", rating: 5, date: "May 12, 2026", title: "Pure bliss", text: "The scent throw is incredible, not too sweet, just perfect lavender calming notes." },
      { user: "Marcus V.", rating: 4, date: "April 28, 2026", title: "Very relaxing", text: "Perfect for bedtime reading. Smells clean and burns evenly." }
    ]
  },
  {
    id: "tuscan-leather",
    name: "Tuscan Leather",
    scent: "Sandalwood & Amber",
    scentFamily: "woody",
    badge: "Limited Edition",
    price: 48.00,
    image: "images/candle_tuscan_leather.png",
    thumbnails: [
      "images/candle_tuscan_leather.png",
      "images/candle_sea_salt.png",
      "images/candle_smoked_vanilla.png",
      "images/lifestyle_living.png"
    ],
    description: "Bold, warm, and sophisticated. Tuscan Leather brings the rich texture of fine suede and warm tobacco together with soft amber and sandalwood base notes. It is a grounding scent that adds immediate depth and character to any library, study, or living area.",
    tags: ["Wax Type: 100% Soy", "Burn Time: 55 Hours", "Weight: 12 oz"],
    notes: {
      top: "Saffron & Raspberry",
      heart: "Thyme & Night-blooming Jasmine",
      base: "Leather, Sandalwood & Amber"
    },
    rating: 4.9,
    reviews: [
      { user: "Sophia L.", rating: 5, date: "June 02, 2026", title: "Warm and inviting", text: "Absolutely love this during rainy evenings. It feels extremely luxurious." }
    ]
  },
  {
    id: "midnight-fig",
    name: "Midnight Fig",
    scent: "Black Fig & Cedar",
    scentFamily: "woody",
    badge: "Eco Friendly",
    price: 52.00,
    image: "images/candle_midnight_fig.png",
    thumbnails: [
      "images/candle_midnight_fig.png",
      "images/candle_spiced_cedar.png",
      "images/lifestyle_shelf.png",
      "images/about_ingredients.png"
    ],
    description: "Deep, earthy, and mysterious. Midnight Fig features the luscious sweetness of ripe black fig blended with wild patchouli and the woody structure of cedarwood. It captures the essence of a stroll through an ancient orchard in the midnight hour.",
    tags: ["Wax Type: 100% Soy", "Burn Time: 60 Hours", "Weight: 12 oz"],
    notes: {
      top: "Ripe Fig & Plum",
      heart: "Green Leaves & Cedar",
      base: "Patchouli & Dark Musk"
    },
    rating: 4.7,
    reviews: [
      { user: "Julian K.", rating: 5, date: "May 20, 2026", title: "My absolute favorite!", text: "Unique scent. Not overpowering but has a wonderful depth. Will buy again!" }
    ]
  },
  {
    id: "spring-meadow",
    name: "Spring Meadow",
    scent: "Bergamot & Wild Grass",
    scentFamily: "fresh",
    badge: "New Arrival",
    price: 44.00,
    image: "images/candle_spring_meadow.png",
    thumbnails: [
      "images/candle_spring_meadow.png",
      "images/candle_eucalyptus.png",
      "images/candle_sea_salt.png",
      "images/lifestyle_bath.png"
    ],
    description: "Fresh, airy, and revitalizing. Spring Meadow captures the clean scent of wet morning dew, crushed green leaves, and wild bergamot flowers. It is the perfect clean burning choice to refresh your kitchen or space after cleaning.",
    tags: ["Wax Type: 100% Soy", "Burn Time: 50 Hours", "Weight: 12 oz"],
    notes: {
      top: "Bergamot & Citrus Zest",
      heart: "Wild Grass & Ferns",
      base: "White Patchouli & Vetiver"
    },
    rating: 4.6,
    reviews: [
      { user: "Clara T.", rating: 4, date: "April 15, 2026", title: "Very fresh", text: "Smells like a sunny morning. Perfect for spring/summer days." }
    ]
  },
  {
    id: "sea-salt-sage",
    name: "Sea Salt & Sage",
    scent: "Ocean Air & Wood Sage",
    scentFamily: "fresh",
    badge: "Best Seller",
    price: 48.00,
    image: "images/candle_sea_salt.png",
    thumbnails: [
      "images/candle_sea_salt.png",
      "images/candle_spring_meadow.png",
      "images/lifestyle_bath.png"
    ],
    description: "Escape to the wind-swept coast. Sea Salt & Sage pairs the crisp freshness of ocean mineral spray with the woody, herbaceous notes of wild sage. Grounded in earth and sky, it brings a breezy, relaxed ambiance to your bathroom or living space.",
    tags: ["Wax Type: 100% Soy", "Burn Time: 55 Hours", "Weight: 12 oz"],
    notes: {
      top: "Ambrette Seeds & Grapefruit",
      heart: "Sea Salt & Mineral Accord",
      base: "Sage & Red Algae"
    },
    rating: 4.8,
    reviews: [
      { user: "Oliver P.", rating: 5, date: "June 05, 2026", title: "Coastal escape", text: "Feels like sitting on a cliff by the ocean. Incredibly calming." }
    ]
  },
  {
    id: "eucalyptus-mint",
    name: "Eucalyptus Mint",
    scent: "Fresh Mint & Herb",
    scentFamily: "fresh",
    badge: "Eco Friendly",
    price: 42.00,
    image: "images/candle_eucalyptus.png",
    thumbnails: [
      "images/candle_eucalyptus.png",
      "images/candle_sea_salt.png",
      "images/lifestyle_bath.png"
    ],
    description: "A purifying, cooling, and stimulating scent profile. Eucalyptus Mint clears the air and grounds the mind with crisp eucalyptus leaves, cooling peppermint oil, and aromatic rosemary. Ideal for a home spa ritual or morning clarity.",
    tags: ["Wax Type: 100% Soy", "Burn Time: 50 Hours", "Weight: 12 oz"],
    notes: {
      top: "Peppermint & Spearmint",
      heart: "Eucalyptus Leaves & Rosemary",
      base: "Cedarwood & Light Musk"
    },
    rating: 4.5,
    reviews: [
      { user: "Nora G.", rating: 5, date: "May 30, 2026", title: "A spa in my room", text: "Burns beautifully and smells incredibly refreshing. Perfect for the bath." }
    ]
  },
  {
    id: "smoked-vanilla",
    name: "Smoked Vanilla",
    scent: "Vanilla Bean & Smoke",
    scentFamily: "woody",
    badge: "Limited Edition",
    price: 56.00,
    image: "images/candle_smoked_vanilla.png",
    thumbnails: [
      "images/candle_smoked_vanilla.png",
      "images/candle_tuscan_leather.png",
      "images/lifestyle_living.png"
    ],
    description: "A cozy, sophisticated twist on classic sweet vanilla. Smoked Vanilla pairs rich, dark Madagascar vanilla bean with the smoky undertones of burning oakwood and tobacco leaves. It is the ultimate comfort scent for cold nights.",
    tags: ["Wax Type: 100% Soy", "Burn Time: 60 Hours", "Weight: 12 oz"],
    notes: {
      top: "Vanilla Bean & Honey",
      heart: "Charred Oak & Tobacco Leaf",
      base: "Smoked Wood & Amber"
    },
    rating: 4.9,
    reviews: [
      { user: "Lucas M.", rating: 5, date: "June 08, 2026", title: "Smoky goodness", text: "Not your basic sweet vanilla. It has a beautiful campfire smokiness to it." }
    ]
  },
  {
    id: "spiced-cedar",
    name: "Spiced Cedar",
    scent: "Cedar & Cinnamon",
    scentFamily: "woody",
    badge: "New Arrival",
    price: 50.00,
    image: "images/candle_spiced_cedar.png",
    thumbnails: [
      "images/candle_spiced_cedar.png",
      "images/candle_midnight_fig.png",
      "images/lifestyle_shelf.png"
    ],
    description: "An aromatic, woody blend that brings the crisp outdoors inside. Spiced Cedar blends freshly cut cedarwood and red balsam with warm spices like cinnamon, clove, and sweet orange peel. It is a festive, welcoming scent.",
    tags: ["Wax Type: 100% Soy", "Burn Time: 55 Hours", "Weight: 12 oz"],
    notes: {
      top: "Cinnamon & Orange Peel",
      heart: "Balsam Fir & Clove",
      base: "Cedarwood & Oakmoss"
    },
    rating: 4.7,
    reviews: [
      { user: "Anna S.", rating: 4, date: "May 25, 2026", title: "Warm winter scent", text: "Very cozy, though the cinnamon is a bit strong. Still love the woody cedar undertone." }
    ]
  }
];

let writeQueue = Promise.resolve();

async function initDb() {
  try {
    await fs.mkdir(DB_DIR, { recursive: true });
    let dbData;
    let exists = true;
    try {
      await fs.access(DB_PATH);
    } catch {
      exists = false;
    }

    if (!exists) {
      dbData = {
        products: INITIAL_PRODUCTS,
        orders: [],
        subscribers: [],
        users: [],
        coupons: [],
        giftCards: [],
        notifications: [],
        emailLogs: []
      };
    } else {
      const data = await fs.readFile(DB_PATH, 'utf8');
      dbData = JSON.parse(data);
    }

    // Seed default coupons
    if (!dbData.coupons || dbData.coupons.length === 0) {
      dbData.coupons = [
        { code: 'VESPER10', discountType: 'percentage', value: 10, isActive: true },
        { code: 'SANCTUARY20', discountType: 'percentage', value: 20, isActive: true },
        { code: 'FREESHIP', discountType: 'fixed', value: 6.95, isActive: true }
      ];
    }

    // Seed default gift cards
    if (!dbData.giftCards || dbData.giftCards.length === 0) {
      dbData.giftCards = [
        { code: 'GIFT-50-AMBER', balance: 50.00, isActive: true },
        { code: 'GIFT-100-MYST', balance: 100.00, isActive: true }
      ];
    }

    // Seed users
    if (!dbData.users) {
      dbData.users = [];
    }

    let admin = dbData.users.find(u => u.email === 'admin@vesperandvine.com');
    if (!admin) {
      const hashedAdminPassword = bcrypt.hashSync('admin1234', 10);
      dbData.users.push({
        id: 'u-admin',
        name: 'Atelier Admin',
        email: 'admin@vesperandvine.com',
        password: hashedAdminPassword,
        role: 'admin',
        registeredAt: new Date().toISOString(),
        addresses: [],
        paymentMethods: [],
        notifications: [],
        points: 1000,
        referralCode: 'admin-ref'
      });
    } else if (!admin.password.startsWith('$2a$')) {
      admin.password = bcrypt.hashSync('admin1234', 10);
    }

    let tester = dbData.users.find(u => u.email === 'tester@vesper.com');
    if (!tester) {
      const hashedTesterPassword = bcrypt.hashSync('password123', 10);
      dbData.users.push({
        id: 'u-tester',
        name: 'Flora Merrit',
        email: 'tester@vesper.com',
        password: hashedTesterPassword,
        role: 'customer',
        registeredAt: new Date().toISOString(),
        addresses: [
          {
            id: 'addr-1',
            label: 'Home',
            type: 'home',
            firstName: 'Flora',
            lastName: 'Merrit',
            street: '142 King Street',
            city: 'Charleston',
            state: 'SC',
            zip: '29401',
            country: 'United States',
            phone: '+1 (555) 123-4567',
            isDefault: true,
            lastUsed: 'Jun 14, 2026',
            orderCount: 8,
            preferredFor: 'Primary Residence',
            hasSubscription: true
          }
        ],
        paymentMethods: [
          {
            id: 'pm-1',
            cardholderName: 'Flora Merrit',
            cardNumber: '•••• •••• •••• 4242',
            expiryDate: '12/28',
            cardType: 'Visa',
            isDefault: true
          }
        ],
        notifications: [
          {
            id: 'notif-1',
            title: 'Welcome to the Scent Atelier',
            message: 'Thank you for registering. You have been awarded 100 scent points to start your journey.',
            date: 'Jun 15, 2026',
            read: false
          }
        ],
        points: 128
      });
    } else if (!tester.password.startsWith('$2a$')) {
      tester.password = bcrypt.hashSync('password123', 10);
    }

    // Seed default orders if empty
    if (!dbData.orders || dbData.orders.length === 0) {
      dbData.orders = [
        {
          orderId: 'V&V-294723',
          date: 'Jun 10, 2026',
          status: 'delivered',
          items: [
            { id: 'lavender-wild-honey', name: 'Lavender & Wild Honey', qty: 1, price: 52, image: 'images/candle_lavender.png', scent: 'French Lavender & Honey' },
            { id: 'spiced-cedar', name: 'Spiced Cedar', qty: 1, price: 50, image: 'images/candle_spiced_cedar.png', scent: 'Cedar & Cinnamon' }
          ],
          total: 102.00,
          customer: {
            name: 'Flora Merrit',
            email: 'tester@vesper.com',
            address: '142 King Street, Charleston SC 29401'
          }
        },
        {
          orderId: 'V&V-359610',
          date: 'Jun 14, 2026',
          status: 'shipped',
          items: [
            { id: 'midnight-fig', name: 'Midnight Fig', qty: 1, price: 52, image: 'images/candle_midnight_fig.png', scent: 'Black Fig & Cedar' }
          ],
          total: 52.00,
          customer: {
            name: 'Flora Merrit',
            email: 'tester@vesper.com',
            address: '142 King Street, Charleston SC 29401'
          }
        },
        {
          orderId: 'V&V-482019',
          date: 'Jun 15, 2026',
          status: 'processing',
          items: [
            { id: 'tuscan-leather', name: 'Tuscan Leather', qty: 1, price: 48, image: 'images/candle_tuscan_leather.png', scent: 'Sandalwood & Amber' }
          ],
          total: 48.00,
          customer: {
            name: 'Flora Merrit',
            email: 'tester@vesper.com',
            address: '142 King Street, Charleston SC 29401'
          }
        }
      ];
    }

    await fs.writeFile(DB_PATH, JSON.stringify(dbData, null, 2), 'utf8');
    console.log('Database initialized and seeded successfully.');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

async function readDb() {
  await initDb();
  const data = await fs.readFile(DB_PATH, 'utf8');
  return JSON.parse(data);
}

async function writeDb(data) {
  // Use a serial queue to prevent overlapping write operations
  writeQueue = writeQueue.then(async () => {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
  });
  return writeQueue;
}

module.exports = {
  readDb,
  writeDb
};
