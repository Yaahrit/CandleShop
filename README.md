# 🕯️ Vesper & Vine — Premium Artisanal Fragrances

Vesper & Vine is a premium, high-end artisanal candle and fragrance e-commerce web application. Designed with a clean, minimalist luxury aesthetic (inspired by modern fragrance houses like Aesop and Jo Malone), the platform features a responsive client experience, a dynamic customer dashboard, interactive shopping cart/wishlist management, and a robust Node.js/Express backend API.

---

## ✦ Key Features

### 1. Customer Account Dashboard (`profile.html`)
An all-in-one personalized portal for registered users to manage their scent journey:
*   **Personal Dashboard:** Real-time stats counting total orders, saved wishlist scents, and loyalty points.
*   **Order History:** Interactive tracking page with inline order searching, status filtering (Processing, Shipped, Delivered), and sorting by price or date.
*   **Interactive Shopping Bag & Wishlist:** Quick Add actions to seamlessly move items from your saved wishlist directly into your bag.
*   **Profile Settings:** Update details (name, email, phone) and change passwords with instant dashboard-wide welcome sync.
*   **Direct Photo Uploads:** Upload profile photos directly from the sidebar avatar or settings tab with offline base64 image caching.
*   **Rewards & Subscriptions:** Manage the "Seasonal Discovery" candle plan and view loyalty milestones.

### 2. Immersive Store Experience
*   **Scents Catalog:** Complete listing with category filtering (Floral, Fresh, Woody) and price-range sliders.
*   **Instant Search Overlay:** Accessible from any page with real-time text query matches on product name, scent profile, or category.
*   **Interactive Product Pages:** Comprehensive tabs for scent descriptions, notes hierarchy (Top, Heart, Base), and dynamic user-submitted reviews.
*   **Theme Toggle:** Real-time transition support for dark mode preferences across the site.

### 3. Dual-Mode Architecture (Resilient Offline Fallback)
The application works in two modes automatically based on how it is loaded:
*   **HTTP Mode (Full Backend):** When served by a web server, the frontend performs secure authentication, logs users in, submits reviews, registers orders, and queries database resources via the backend APIs.
*   **File Mode (Offline/Local Fallback):** When opened locally via the `file://` protocol, the application falls back gracefully to a mock database using `localStorage` so all front-end dashboards, cart actions, and styling transitions remain fully functional.

---

## 🛠️ Tech Stack & Architecture

### Frontend
*   **Structure:** Semantic HTML5
*   **Styles:** Custom vanilla CSS, custom micro-transitions, scroll reveal observers, and Bootstrap 5.3 layouts.
*   **Logic:** Native Vanilla JavaScript (using modern ES Modules for account components and a modular structure).

### Backend
*   **Runtime:** Node.js
*   **Framework:** Express.js (supporting static file routing and REST APIs)
*   **Database:** Local JSON-serialized database (`data/db.json`) powered by a serial queue to prevent overlapping async write operations.

---

## 📂 Project Directory Structure

```text
CandleShop/
├── css/
│   └── style.css            # Custom premium stylesheets & animations
├── data/
│   └── db.json              # Local serialized JSON database file (auto-generated)
├── images/                  # Product photography & lifestyle assets
├── js/
│   ├── account/             # Customer dashboard modular scripts
│   │   ├── account.js       # App orchestrator & sidebar coordinator
│   │   ├── api.js           # API endpoints & HTTP detection service
│   │   ├── addresses.js     # Address book controller
│   │   ├── cart.js          # Cart & checkout tab controller
│   │   ├── orders.js        # Order tracking & search controller
│   │   ├── profile.js       # Dashboard overview controller
│   │   ├── rewards.js       # Loyalty program tab controller
│   │   ├── settings.js      # Profile details & avatar upload controller
│   │   ├── subscription.js  # Subscription management controller
│   │   └── wishlist.js      # Scent favorites tab controller
│   └── main.js              # Global site script, cart manager & dynamic offcanvas
├── about.html               # Brand narrative & story page
├── db.js                    # Database JSON file read/write serial controller
├── faq.html                 # Frequently Asked Questions & contacts
├── index.html               # Landings page & collections showcase
├── journal.html             # Brand journal & articles
├── login.html               # Secure register / sign-in forms
├── package.json             # Node dependencies & running scripts
├── product.html             # Scents detail view, ingredients & reviews page
├── profile.html             # Unified customer account dashboard
├── server.js                # Express Server hosting REST endpoints & static files
└── shop.html                # Product explorer & scent catalog filtering
```

---

## 🚀 Getting Started

### 📋 Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 📥 Installation

1. Clone or download the repository directory to your local computer:
   ```bash
   cd CandleShop
   ```

2. Install the server dependencies (Express and CORS):
   ```bash
   npm install
   ```

### ⚡ Running the Server (Recommended)
Because modern browsers restrict ES6 JavaScript modules (`type="module"`) over local filesystem paths due to CORS policies, you should run the local server to explore the full platform:

1. Start the backend development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to the local web page:
   ```text
   http://localhost:3000
   ```

> [!NOTE]
> When accessing the application via `http://localhost:3000`, all static files are served correctly, and the REST endpoints securely connect to the backend server.

---

## 🔌 API Documentation

The backend server exposes the following REST API endpoints under `/api`:

### 🔐 Authentication & Profile

| Method | Endpoint | Description | Headers |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user with SHA-256 hashed password. | `Content-Type: application/json` |
| `POST` | `/api/auth/login` | Login and retrieve a session token and user details. | `Content-Type: application/json` |
| `GET` | `/api/auth/profile` | Retrieve profile information and order history. | `Authorization: Bearer <token>` |
| `POST` | `/api/auth/profile/update` | Update name and email settings. | `Authorization: Bearer <token>` |
| `POST` | `/api/auth/logout` | Destroy active session token. | `Authorization: Bearer <token>` |

### 🕯️ Products & Orders

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/products` | Get details and review histories for all candles in the shop. |
| `GET` | `/api/products/:id` | Get details of a single product candle by its ID. |
| `POST` | `/api/products/:id/reviews` | Submit a rating and review for a specific product. |
| `POST` | `/api/orders` | Place a new order and record it in the database. |
| `POST` | `/api/newsletter` | Add a subscriber's email to the newsletter records. |

---

## ✦ Luxury Design Details
*   **Glow Cursor:** Subtle radial light follow cursor trail that lights up page assets.
*   **Skeleton Shimmers:** Sleek loaders that animate before populating data to provide a seamless paint experience.
*   **Micro-Animations:** Fluid transformations on dropdowns, tabs, and buttons for responsive interactions.

---

## ⚖️ License
This project is open-source and available under the MIT License.
