# Padmavati Bhojnalaya (पद्मावती भोजनालय)

> **Authentic Shuddh Desi Ghee Indian Cuisine Ordering & Real-Time Delivery Tracking System**

[![React](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933?logo=node.js&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20%2F%20Resilient%20Store-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Maps-Leaflet.js-199900?logo=leaflet&logoColor=white)](https://leafletjs.com/)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Features](#2-features)
3. [Technology Stack](#3-technology-stack)
4. [Project Structure](#4-project-structure)
5. [Installation and Setup (Windows PowerShell)](#5-installation-and-setup-windows-powershell)
6. [Environment Variables and Security](#6-environment-variables-and-security)
7. [API Documentation](#7-api-documentation)
8. [Reference Design and UI Requirements](#8-reference-design-and-ui-requirements)
9. [Testing and Troubleshooting](#9-testing-and-troubleshooting)
10. [Current Status and Future Improvements](#10-current-status-and-future-improvements)

---

## 1. Project Overview

### What is Padmavati Bhojnalaya?
**Padmavati Bhojnalaya** is a modern, full-stack food ordering platform dedicated to traditional, homestyle pure vegetarian Indian cuisine. Inspired by generational culinary heritage, the kitchen prepares all gravies, dal tadkas, royal thalis, and tandoori breads using **100% pure Gir cow desi ghee**, stone-ground spices, and earthen cookware—completely free of chemical preservatives, artificial food coloring, baking soda, and MSG.

### Purpose of the Website
The application provides customers with a visual, appetizing, and seamless digital dining experience. It connects home-style food lovers directly to the central rasoi (kitchen), enabling customers to:
- Browse an authentic, categorized food catalog with prominent high-definition photographs.
- Customize dishes according to individual dietary and spice preferences (including strict Jain options).
- Manage a live shopping cart with real-time bill breakdown, taxes, and promotional coupons.
- Detect or pinpoint their exact delivery location via interactive maps.
- Complete checkout with instant order generation.
- Monitor active delivery progress using a simulated real-time GPS fleet tracking map.

### Customer Ordering Experience
The platform offers an uninterrupted, single-page customer journey:
1. **Explore & Filter:** Customers can browse through traditional categories (Royal Thalis, Dal & Gravies, Paneer Delights, Tandoori Rotis, Dum Biryani, Desi Mithai, Beverages, and Snacks) or use the live header search.
2. **Personalize:** Customers click on any dish card to launch the **Customizer Modal**, selecting their preferred spice level, toggling Jain preparation (no onion/garlic), and choosing premium addons (extra desi ghee drizzle, extra butter pav, roasted papad, etc.).
3. **Cart & Coupons:** Items enter the slide-over **Cart Drawer**, where subtotal, 5% GST/packaging, delivery charges (free on orders over ₹200), and coupon savings (`GHARKA20`, `FREESHIP`, `THALIDAY`) are computed live.
4. **Doorstep Precision:** At checkout, customers specify their contact information and fine-tune their delivery location with an interactive draggable Leaflet map pin.
5. **Real-Time Tracking:** Upon order placement, the customer is directed to the **Live Order Delivery Tracker**, displaying live ETA, order status milestones, and an animated courier rider navigating Pune streets toward their doorstep.

### Main Technologies
The system is built on a decoupled, responsive architecture:
- **Frontend Client:** React 18 with Vite, Tailwind CSS, custom design tokens, and Leaflet.js.
- **Backend API:** Node.js with Express, providing RESTful endpoints for dishes, orders, and authentication.
- **Persistence Layer:** Dual-mode persistence combining MongoDB (via Mongoose) with an automatic file-backed JSON store fallback (`backend/data/store.json`) for zero-configuration local runs.

---

## 2. Features

### Customer-Facing Features (Implemented)

| Feature | Description | Implementation Status |
| :--- | :--- | :--- |
| **Landing Page & Navigation** | Sticky top navigation bar featuring brand identity, links to menu sections, offers, and live tracking. Includes an embedded search bar, quick order button, customer authentication modal trigger, and dynamic cart badge counter. | ✅ Completed |
| **Hero & Geolocation Bar** | Hero section with heritage messaging, trust badges (Desi Ghee, 30-min preparation, 4.9/5 parivaar rating), featured spotlight card (Maharaja Special Thali), and an address bar with browser geolocation auto-detection (`navigator.geolocation` + OpenStreetMap Nominatim reverse geocoding). | ✅ Completed |
| **Food Menu & Categories** | Horizontal carousel category selector supporting 9 authentic categories (All Dishes, Royal Thalis, Dal & Gravies, Paneer Delights, Tandoori Rotis, Dum Biryani, Desi Mithai, Masala Chaas, Snacks) with instant filtering and fallback messaging. | ✅ Completed |
| **Dish Cards & Pricing** | Responsive grid of dish cards displaying photography, vegetarian badge, category tag, customer star rating with review counts, title, description, discounted price, original strikethrough price, and direct "ADD" / customization triggers. | ✅ Completed |
| **Customizer Modal & Dynamic Pricing** | Modal allowing customers to select from 4 spice tiers (*Mild*, *Medium*, *Desi Teekha*, *Extra Spicy*), toggle 100% Jain preparation (no onion/garlic), and select paid addons with live price recalculation before adding to cart. | ✅ Completed |
| **Slide-Over Cart Drawer** | Slide-out cart displaying customized item tags, unit prices, quantity increment/decrement controls, coupon application input with instant validation, and a transparent price breakdown (Subtotal, 5% GST, Delivery Fee, Discount, Grand Total). | ✅ Completed |
| **Promotional Offers (Bento Grid)** | Interactive coupon cards showcasing `GHARKA20` (Flat 20% off), `FREESHIP` (Free express delivery pass), and `THALIDAY` (Free Gulab Jamun duo), with direct one-click coupon application to cart. | ✅ Completed |
| **Customer Authentication Modal** | Modal inspired by the reference design with dual tabs (*Sign In* and *Create Account*), mobile number / email identifier, show/hide password toggle, "Remember my thali preference" checkbox, instant OTP login flow, and simulated Google / WhatsApp logins. | ✅ Completed |
| **Address & Location Pinpointing** | Checkout modal capturing customer name, contact phone, full delivery address, and an embedded Leaflet map allowing users to drag the marker or click to update latitude and longitude. | ✅ Completed |
| **Checkout & Order Placement** | Fast-dispatch checkout modal supporting payment selection (UPI / GPay / PhonePe, Cash on Delivery, Cards / NetBanking). Submits orders to `/api/orders`, generates a unique `#PB-XXXXX` order ID, clears the cart, and redirects to live tracking. | ✅ Completed |
| **Live GPS Fleet Delivery Tracking** | Interactive map section displaying Central Kitchen (Bhandarkar Road, Deccan), Courier Rider (Ramesh Kumar), and Customer Doorstep pins with a connecting polyline route. | ✅ Completed |
| **Simulated Rider Movement & Stages** | 4-stage tracking progress bar (*1. Order Received*, *2. Preparing*, *3. Out for Delivery*, *4. Delivered*) with interactive stage buttons to simulate kitchen updates, plus an animated rider simulation moving along actual Pune route waypoints. | ✅ Completed |
| **Responsive Design** | Full responsiveness across mobile, tablet, laptop, and desktop viewports utilizing Tailwind utility classes and responsive modals/drawers. | ✅ Completed |

### Implementation Distinctions & Simulated Elements
- **Simulated Payment Gateway:** Payment method selection is functional and persists the payment state to the database/store, but does not currently invoke a third-party gateway (such as Razorpay or Cashfree).
- **Simulated OTP Service:** The OTP flow allows instant mobile login with browser confirmation without requiring a paid external SMS gateway (such as Twilio or MSG91).
- **Simulated Courier GPS:** Live rider positions are animated across Pune waypoints via Leaflet interval timers rather than polling physical IoT hardware or WebSocket GPS trackers.
- **Admin Dashboard Status:** **The admin system is not required.** All legacy admin dashboard components, admin routes (`admin.js`), and admin navigation links have been removed.

---

## 3. Technology Stack

### Frontend Client (`frontend/`)
- **Library / Framework:** React 18 (`react@18.3.1`, `react-dom@18.3.1`)
- **Build Tool & Dev Server:** Vite 5 (`vite@5.4.10` / `5.4.21`, `@vitejs/plugin-react@4.3.3`)
- **Styling & CSS Utilities:**
  - Tailwind CSS (`tailwindcss@3.4.19`, `postcss@8.5.32`, `autoprefixer@10.6.2`, `@tailwindcss/vite@4.3.3`)
  - Custom design tokens in `frontend/src/index.css` (Sattvic Elegance color tokens, royal fonts, custom scrollbars, and card micro-interactions)
  - Google Fonts (*Rozha One* for royal display headings, *Plus Jakarta Sans* for clean typography)
  - Material Symbols Outlined icons
- **Mapping & Geolocation:** Leaflet (`leaflet@1.9.4`) with OpenStreetMap tile servers
- **State Management:** React Context API (`CartContext.jsx`, `AuthContext.jsx`) with persistent `localStorage` synchronization

### Backend Server (`backend/`)
- **Runtime Environment:** Node.js (v18.0.0 or higher recommended)
- **Web Framework:** Express 4 (`express@4.21.1`)
- **Cross-Origin Resource Sharing:** `cors@2.8.5`
- **Environment Management:** `dotenv@16.4.5`
- **Database & ODM:** Mongoose 8 (`mongoose@8.7.1`)
- **Database Architecture:**
  - Primary: MongoDB (local instance or MongoDB Atlas via `MONGODB_URI`)
  - Fallback: Zero-dependency JSON store (`backend/data/store.json`) handled by `backend/config/db.js`, enabling all dish queries, order creation, and user authentication to function immediately without requiring a local MongoDB daemon to be installed or active.

---

## 4. Project Structure

```text
Padmavati Bhojnalaya/
├── .gitignore                      # Git ignore rules for node_modules, build outputs, and logs
├── package.json                    # Root workspace package script orchestrator
├── package-lock.json               # Root lockfile
├── README.md                       # Comprehensive project documentation
│
├── backend/                        # Express API Server
│   ├── config/
│   │   └── db.js                   # MongoDB connection logic & resilient JSON store fallback
│   ├── data/
│   │   ├── seedData.js             # Initial catalog of 12 authentic dishes and addon options
│   │   └── store.json              # Local persistent JSON data store (dishes, orders, users)
│   ├── models/
│   │   ├── Dish.js                 # Dish schema, Mongoose model, and store query methods
│   │   ├── Order.js                # Order schema, calculation structures, and timeline models
│   │   └── User.js                 # Customer schema, mobile/email lookup, and creation logic
│   ├── routes/
│   │   ├── auth.js                 # Authentication routes (login, register, otp-login)
│   │   ├── dishes.js               # Dish catalog routes (filtering, search, CRUD)
│   │   └── orders.js               # Order placement, calculation, retrieval, and stage updates
│   ├── package.json                # Backend dependency declarations and start scripts
│   └── server.js                   # Express application entry point (Port 5000)
│
├── frontend/                       # React 18 + Vite Frontend Application
│   ├── public/                     # Static public assets served directly by Vite
│   ├── src/
│   │   ├── assets/                 # Vector assets, background images, and brand illustrations
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   └── AuthModal.jsx   # Sign In & Registration modal with full client validation
│   │   │   ├── cart/
│   │   │   │   └── CartDrawer.jsx  # Slide-over cart with live bill breakdown & coupon input
│   │   │   ├── checkout/
│   │   │   │   ├── CheckoutModal.jsx      # Order checkout form & payment method selection
│   │   │   │   └── LocationPickerMap.jsx  # Leaflet draggable marker for delivery coordinates
│   │   │   ├── layout/
│   │   │   │   ├── Footer.jsx      # Heritage footer with kitchen timings and FSSAI details
│   │   │   │   └── Navbar.jsx      # Header with search, nav links, profile, and cart button
│   │   │   ├── menu/
│   │   │   │   ├── CategoryNav.jsx # Horizontal carousel for 9 food categories
│   │   │   │   ├── CustomizerModal.jsx # Spice level, Jain toggle, and addon selector
│   │   │   │   ├── DishCard.jsx    # Dish visual card with price, rating, and ADD trigger
│   │   │   │   └── OffersBento.jsx # Promotional offer cards with coupon application
│   │   │   └── tracking/
│   │   │       ├── LeafletTrackingMap.jsx # Interactive Leaflet map with simulated rider
│   │   │       └── LiveTrackingSection.jsx # Order timeline & stage controller (Stages 1-4)
│   │   ├── context/
│   │   │   ├── AuthContext.jsx     # Customer authentication state & methods
│   │   │   └── CartContext.jsx     # Cart items, pricing calculations, and coupon handlers
│   │   ├── pages/
│   │   │   └── Home.jsx            # Main landing page assembling all sections
│   │   ├── services/
│   │   │   ├── api.js              # Centralized fetch wrapper with error handling
│   │   │   ├── authService.js      # Auth API client calls
│   │   │   ├── dishService.js      # Dishes API client calls
│   │   │   └── orderService.js     # Orders API client calls
│   │   ├── App.jsx                 # App root component with providers and modals
│   │   ├── index.css               # Design system tokens and custom CSS
│   │   └── main.jsx                # React DOM entry point
│   ├── index.html                  # HTML template with Google Fonts & Material Symbols
│   ├── package.json                # Frontend dependencies and Vite build scripts
│   ├── tailwind.config.js          # Tailwind CSS theme extensions
│   └── vite.config.js              # Vite server config with /api proxy to Port 5000
│
└── referencematerial/              # Design & UI Reference Screenshots
    ├── landingpage/
    │   ├── footer.png              # Reference layout for website footer
    │   ├── landingnavbaar.png      # Reference layout for header & hero navigation
    │   ├── landingpagedishes.png   # Reference layout for dishes & categories
    │   └── landingpagemap.png      # Reference layout for live map tracking
    └── login-registration.png      # Reference layout for two-column auth modal
```

---

## 5. Installation and Setup (Windows PowerShell)

Follow these step-by-step instructions to set up and run the application locally on Windows using PowerShell.

### Prerequisites
- **Node.js**: v18.0.0 or later (Verify using `node -v`)
- **npm**: v9.0.0 or later (Verify using `npm -v`)
- **Web Browser**: Chrome, Edge, Firefox, or Brave

---

### Step 1: Install Dependencies

Open a Windows PowerShell terminal in the project root directory:

```powershell
# Navigate to the workspace root
cd "C:\Users\rinka\OneDrive\Desktop\Padmavati Bhojnalaya"

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ..\frontend
npm install

# Return to root directory
cd ..
```

---

### Step 2: Configure Environment Variables

Create the local configuration files if they are not already present:

#### 1. Backend Configuration (Optional)
In `backend/`, you can optionally create a `.env` file:
```powershell
# backend/.env (Optional - Defaults apply automatically if omitted)
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/padmavati_bhojnalaya
```
> **Note on Database Connection:** If MongoDB is running on your machine, the backend connects automatically. If MongoDB is not active or installed, the server automatically initializes its resilient high-speed JSON store (`backend/data/store.json`). No configuration changes are required for zero-setup execution!

#### 2. Frontend Configuration
The frontend configuration file `frontend/.env` specifies the API proxy endpoint:
```env
VITE_API_BASE_URL=/api
```

---

### Step 3: Start the Backend Server (Port 5000)

> [!IMPORTANT]
> **Check if the backend is already running before starting!**
> If an instance is already listening on port `5000`, running `npm start` again will result in an `EADDRINUSE: address already in use :::5000` error.

Check if port `5000` is currently occupied:
```powershell
Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue
```

- **If port 5000 is free**, start the backend server:
  ```powershell
  cd "C:\Users\rinka\OneDrive\Desktop\Padmavati Bhojnalaya\backend"
  npm start
  ```
  *Or from the root directory:*
  ```powershell
  npm run start
  ```
- **Expected Console Output:**
  ```text
  [Database Notice] MongoDB server is not running locally. Using resilient high-speed JSON/In-Memory persistence layer.
  [Padmavati Bhojnalaya] Royal Kitchen server running at http://localhost:5000
  ```

---

### Step 4: Start the Frontend Client (Port 5173)

Open a **second, separate Windows PowerShell window**:

```powershell
cd "C:\Users\rinka\OneDrive\Desktop\Padmavati Bhojnalaya\frontend"
npm run dev
```
*Or from the root directory in a new terminal:*
```powershell
npm run dev:frontend
```

**Expected Console Output:**
```text
  VITE v5.4.10  ready in 420 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

---

### Step 5: Open the Application in Your Browser

Navigate to:
👉 **`http://localhost:5173`**

All API requests to `/api/*` from the frontend are automatically routed through the Vite dev proxy to the Express backend running on `http://localhost:5000`.

---

### Available Root Scripts Summary

| Command | Working Directory | Description |
| :--- | :--- | :--- |
| `npm run start` | Root | Starts the Node.js Express backend server on port 5000 |
| `npm run dev:backend` | Root | Runs the backend with Node's native file watcher (`node --watch`) |
| `npm run dev:frontend` | Root | Starts the Vite React development server on port 5173 |
| `npm run build:frontend` | Root | Compiles the production build of the React app into `frontend/dist` |

---

## 6. Environment Variables and Security

All environment configuration options are documented below using placeholders. **Never commit actual production secrets, passwords, or live database credentials to source control.**

### Backend (`backend/.env`)
| Variable | Required | Default Value | Description |
| :--- | :---: | :--- | :--- |
| `PORT` | No | `5000` | Port on which the Express REST API server listens |
| `MONGODB_URI` | No | `mongodb://127.0.0.1:27017/padmavati_bhojnalaya` | MongoDB connection string (Local or MongoDB Atlas) |

#### Sample `.env.example` for Backend:
```env
# Server Port
PORT=5000

# Database Connection String (MongoDB URI or Atlas cluster)
MONGODB_URI=mongodb://username:password@cluster.mongodb.net/padmavati_bhojnalaya?retryWrites=true&w=majority
```

### Frontend (`frontend/.env`)
| Variable | Required | Default Value | Description |
| :--- | :---: | :--- | :--- |
| `VITE_API_BASE_URL` | No | `/api` | Base path for REST API calls proxied by Vite |

#### Sample `.env.example` for Frontend:
```env
# Frontend API Base URL
VITE_API_BASE_URL=/api
```

---

## 7. API Documentation

The backend exposes RESTful endpoints with standard JSON request and response formatting.

### 1. Dishes Endpoints (`/api/dishes`)

#### `GET /api/dishes`
Fetches all dishes in the catalog with optional filtering.
- **Query Parameters:**
  - `category` *(string, optional)*: Filter by category (e.g., `Royal Thalis`, `Dal & Gravies`, `Paneer Delights`). Pass `All` to retrieve all categories.
  - `search` *(string, optional)*: Case-insensitive search across dish names, descriptions, and categories.
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "count": 12,
    "dishes": [
      {
        "id": "dish-1",
        "name": "Maharaja Special Thali",
        "category": "Royal Thalis",
        "price": 280,
        "originalPrice": 340,
        "badge": "👑 Grand Bestseller",
        "badgeType": "primary",
        "tag": "Includes 8 Items",
        "rating": 4.9,
        "reviewsCount": "4.8k",
        "description": "Paneer Lababdar, Dal Makhani, 4 Butter Tawa Rotis, Jeera Basmati Rice, Gulab Jamun, Roasted Papad, Pickle & Fresh Kachumber Salad.",
        "image": "https://lh3.googleusercontent.com/...",
        "isVeg": true,
        "customizable": true,
        "availableSpiceLevels": ["Mild", "Medium", "Desi Teekha", "Extra Spicy"],
        "addonOptions": [
          { "id": "extra_ghee", "name": "Extra Desi Ghee Drizzle", "price": 25 },
          { "id": "extra_sweet", "name": "Extra Hot Gulab Jamun (1 pc)", "price": 35 }
        ]
      }
    ]
  }
  ```

#### `GET /api/dishes/:id`
Retrieves a single dish by its unique identifier.
- **Response `200 OK`:** Returns `{ "success": true, "dish": { ... } }`.
- **Response `404 Not Found`:** Returns `{ "success": false, "message": "Dish not found" }`.

#### `POST /api/dishes`
Creates a new dish entry in the catalog.
- **Request Body:** Requires `name`, `category`, `price`, `description`, `image`. Optional: `originalPrice`, `badge`, `badgeType`, `tag`, `customizable`.
- **Response `201 Created`:** Returns created dish object.

#### `PUT /api/dishes/:id`
Updates an existing dish by ID.
- **Response `200 OK`:** Returns updated dish object.

#### `DELETE /api/dishes/:id`
Removes a dish by ID.
- **Response `200 OK`:** Returns `{ "success": true, "message": "Dish removed successfully" }`.

---

### 2. Orders Endpoints (`/api/orders`)

#### `GET /api/orders`
Retrieves all placed orders.
- **Response `200 OK`:** Returns `{ "success": true, "count": N, "orders": [ ... ] }`.

#### `GET /api/orders/:orderId`
Retrieves a specific order by order ID (accepts with or without `#`, e.g., `PB-84920` or `#PB-84920`).
- **Response `200 OK`:** Returns order object.
- **Response `404 Not Found`:** Returns `{ "success": false, "message": "Order not found" }`.

#### `POST /api/orders`
Places a new customer order with server-side price recalculation.
- **Request Body:**
  ```json
  {
    "customer": {
      "name": "Anand Joshi",
      "phone": "+91 98220 54128",
      "address": "Flat 402, Shivshankar Heights, FC Road",
      "coordinates": { "lat": 18.5284, "lng": 73.8443 }
    },
    "items": [
      {
        "dishId": "dish-1",
        "name": "Maharaja Special Thali",
        "price": 280,
        "qty": 1,
        "spiceLevel": "Medium",
        "isJain": false,
        "selectedAddons": [
          { "id": "extra_ghee", "name": "Extra Desi Ghee Drizzle", "price": 25 }
        ]
      }
    ],
    "couponCode": "GHARKA20",
    "paymentMethod": "upi"
  }
  ```
- **Server Calculations:**
  - Calculates item unit total and subtotal.
  - Computes 5% GST & packaging tax: `Math.round(subtotal * 0.05 * 100) / 100`.
  - Computes delivery fee: `₹0` if subtotal ≥ ₹200; otherwise `₹30`.
  - Validates promotional coupons:
    - `GHARKA20`: 20% discount (max savings ₹100).
    - `FREESHIP`: 100% discount on delivery fee.
    - `THALIDAY`: Flat ₹40 discount.
  - Assigns unique order ID (e.g., `#PB-48291`), sets `trackingStage: 1`, assigns courier rider details, and kitchen coordinates.
- **Response `201 Created`:**
  ```json
  {
    "success": true,
    "message": "Order placed successfully! Kitchen has fired the stoves.",
    "order": {
      "orderId": "#PB-48291",
      "grandTotal": 315.25,
      "trackingStage": 1,
      "estimatedMinutes": 28,
      "paymentStatus": "Paid"
    }
  }
  ```

#### `PATCH /api/orders/:orderId/stage`
Updates the delivery tracking stage for an order.
- **Request Body:** `{ "stage": 1 | 2 | 3 | 4 }`
  - `1`: Order Received & Verified (ETA: 28 mins)
  - `2`: Kadhai Cooking & Handi Dum (ETA: 20 mins)
  - `3`: Dispatched & On the Road (ETA: 12 mins)
  - `4`: Doorstep Handover & Feast Ready (ETA: 0 mins, status updated to "Completed & Delivered")
- **Response `200 OK`:** Returns updated order object.

---

### 3. Authentication Endpoints (`/api/auth`)

#### `POST /api/auth/login`
Signs in an existing customer using mobile number or email.
- **Request Body:**
  ```json
  {
    "identifier": "98220 54128",
    "password": "password123",
    "rememberThaliPreference": true
  }
  ```
- **Response `200 OK`:**
  ```json
  {
    "success": true,
    "message": "Swagat Hai! Logged in successfully.",
    "user": {
      "id": "usr_...",
      "name": "Anand Joshi",
      "phone": "+91 98220 54128",
      "email": "anand.joshi@example.com",
      "rememberThaliPreference": true,
      "preferredSpiceLevel": "Medium"
    },
    "token": "pb_jwt_..."
  }
  ```
- **Response `401 Unauthorized`:** Incorrect password or account does not exist.

#### `POST /api/auth/register`
Registers a new customer account.
- **Request Body:**
  ```json
  {
    "name": "Anand Joshi",
    "phone": "+91 98220 54128",
    "email": "anand.joshi@example.com",
    "password": "securePassword123",
    "rememberThaliPreference": true
  }
  ```
- **Validation:** Name required (min 2 chars), valid 10-digit phone, valid email regex format, password minimum 6 characters. Duplicate phone or email checks are enforced.
- **Response `201 Created`:** Returns registered user profile and authentication token.

#### `POST /api/auth/otp-login`
Fast OTP authentication flow.
- **Request Body:** `{ "phone": "+91 98220 54128" }`
- **Response `200 OK`:** Finds existing user or registers a guest profile and returns user session.

---

## 8. Reference Design and UI Requirements

The visual aesthetics, typography, and section arrangements are designed in accordance with the reference design assets located in `referencematerial/`:

```text
referencematerial/
├── landingpage/
│   ├── landingstartpage.png (or landingnavbaar.png) # Header, Hero section & delivery search
│   ├── landingpagedishes.png                       # Category pills & prominent dish cards
│   ├── landingpagemap.png                          # Live delivery tracking & route map
│   └── footer.png                                  # Heritage footer, kitchen hours & FSSAI
└── login-registration.png                          # Two-column authentication modal
```

### Visual Architecture & Sections

1. **Header & Hero Section (`landingstartpage.png` / `landingnavbaar.png`):**
   - Clean, fixed top navigation bar with the deep royal maroon brand mark (*Padmavati Bhojnalaya*).
   - Prominent hero layout highlighting authentic royal heritage, pure Gir cow desi ghee, and 30-minute delivery promise.
   - Interactive delivery address bar equipped with a live geolocation detection button (`Locate`).
   - Spotlight showcase card featuring the flagship *Maharaja Special Thali* with direct customization and order actions.

2. **Menu Categories & Delicacies (`landingpagedishes.png`):**
   - Horizontal category filter with authentic imagery and high-contrast active states.
   - Large, prominent food photography celebrating Indian cuisine textures (saffron gravies, golden rotis, fresh garnishes).
   - Structured dish cards highlighting dietary indicators (green veg dot badge), user star ratings, spice tiers, and clear price indicators.

3. **Live GPS Fleet Map (`landingpagedishes.png` / `landingpagemap.png`):**
   - Interactive Leaflet-powered map displaying Central Rasoi (Bhandarkar Road) and customer destination markers.
   - High-contrast route polyline connecting the kitchen to the delivery address.
   - Animated courier rider representation with real-time stage progression.

4. **Heritage Footer (`footer.png`):**
   - Structured multi-column layout with brand story, culinary pillars (100% Desi Ghee, Zero MSG/Soda, Earthen Pots), lunch/dinner operating hours, customer helpline, and FSSAI license accreditation.

5. **Customer Authentication (`login-registration.png`):**
   - Two-column visual modal: a clean, floating white card on the left containing the form fields and a cultural heritage illustration on the right.
   - Dual-mode tab toggle (*Sign In* vs *Create Account*).
   - Complete input validation (10-digit mobile number, formatted email, matching passwords) and seamless switching between sign-in and registration.

### Core Design Rules & Constraints
- **Prominent Food Imagery:** Dishes and their photography must remain the primary visual focal point.
- **Subtle, Professional Copywriting:** Avoid repetitive branding, excessive promotional slogans, or redundant repetitions of city and generic terms. Customer-facing text should be warm, authentic, and written in clear English.
- **Dynamic Customer Locations:** Customer delivery locations must never be hardcoded. The application allows users to detect location via GPS or pinpoint any address on an interactive map.
- **Registration Form Integrity:** Registration must feature validation for all fields, proper error feedback, and smooth navigation back to sign-in.
- **Preserve Working Customer Functionality:** All cart additions, price calculations, modal operations, and order placement flows must remain fully functional.
- **No Admin Dashboard:** The admin dashboard is not required and has been omitted from the customer interface.

---

## 9. Testing and Troubleshooting

### Verification Commands

Verify frontend compilation and assets generation:
```powershell
cd "C:\Users\rinka\OneDrive\Desktop\Padmavati Bhojnalaya\frontend"
npm run build
```
*(Expected: Vite builds successfully without syntax or module resolution errors).*

Verify backend API responsiveness:
```powershell
# In PowerShell, query dishes from the running backend:
Invoke-RestMethod -Uri "http://localhost:5000/api/dishes" -Method GET
```

---

### Common Troubleshooting Scenarios

#### 1. Port 5000 Already in Use (`EADDRINUSE: address already in use :::5000`)
- **Cause:** A Node.js backend process is already running in another terminal or in the background.
- **Diagnosis:** Run in PowerShell:
  ```powershell
  Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue
  ```
- **Resolution:**
  - If the existing backend process is working normally, you do not need to start it again.
  - To stop the existing process and restart fresh:
    ```powershell
    # Find the process ID
    $conn = Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue
    if ($conn) {
        Stop-Process -Id $conn.OwningProcess -Force
        Write-Host "Process on port 5000 stopped. You can now run 'npm start'."
    }
    ```

#### 2. Port 5173 Already Occupied (Vite chooses 5174)
- **Cause:** Another Vite instance is active.
- **Resolution:** Check running processes or terminate the existing port 5173 process:
  ```powershell
  Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue
  ```
  If Vite switches to `5174`, you can still access the site at `http://localhost:5174` because Vite's proxy will continue forwarding `/api` calls to port `5000`.

#### 3. Database Connection Notice / MongoDB Not Installed
- **Message:** `[Database Notice] MongoDB server is not running locally. Using resilient high-speed JSON/In-Memory persistence layer.`
- **Explanation:** This is an intentional built-in feature. When a local MongoDB daemon is not detected, the system automatically falls back to `backend/data/store.json`. All dish searches, cart operations, user sign-ups, and order placements will persist without requiring MongoDB installation.
- **To use MongoDB:** Install MongoDB Community Server locally or provide a valid MongoDB Atlas connection string in `backend/.env` under `MONGODB_URI`.

#### 4. Outdated UI Appearing in Browser
- **Cause:** Browser cache or Vite module cache holding stale chunks.
- **Resolution:**
  1. Perform a hard refresh in your browser using `Ctrl + Shift + R` (or `Ctrl + F5`).
  2. Clear Vite cache in the frontend folder:
     ```powershell
     cd "C:\Users\rinka\OneDrive\Desktop\Padmavati Bhojnalaya\frontend"
     Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue
     npm run dev -- --force
     ```

#### 5. API Requests Failing with 404 or Network Error
- **Cause:** The backend server on port 5000 is not running, or Vite proxy configuration is mismatched.
- **Resolution:**
  1. Verify backend status: `Invoke-RestMethod -Uri "http://localhost:5000/api/dishes" -Method GET`.
  2. Verify `frontend/vite.config.js` contains the `/api` proxy target `http://localhost:5000`.
  3. Ensure `frontend/.env` contains `VITE_API_BASE_URL=/api`.

---

## 10. Current Status and Future Improvements

### Verified & Fully Implemented
- [x] Full-stack architecture with Express backend and Vite React frontend.
- [x] Resilient dual-mode database engine (MongoDB + file-backed JSON store fallback).
- [x] Category navigation across 9 categories with horizontal scroll controls.
- [x] Real-time live text search filtering by dish name, description, and category.
- [x] Interactive Customizer Modal with 4 spice levels, Jain toggle, and dynamic addon pricing.
- [x] Slide-over Cart Drawer with coupon validation (`GHARKA20`, `FREESHIP`, `THALIDAY`) and price calculations.
- [x] Draggable Leaflet location pin on checkout modal updating delivery coordinates.
- [x] Order placement pipeline writing to backend and generating unique order IDs.
- [x] Interactive Live GPS Fleet Tracker with 4-stage simulation and animated Leaflet rider polyline.
- [x] Customer Authentication Modal with tab switching, 10-digit phone verification, email regex validation, password checks, and backend registration integration.
- [x] Removal of all legacy admin dashboard components from the customer user flow.
- [x] Responsive layout with custom Sattvic Elegance styling and high-resolution dish photography.

### Known Limitations
1. **Third-Party Payment Gateway:** Payment options currently record customer choices without connecting to an external payment processor (such as Razorpay or Stripe).
2. **SMS Gateway:** OTP login operates through client/server simulation rather than sending SMS text messages via an external telecom provider.
3. **Physical Fleet GPS:** Courier rider tracking is an animated coordinate simulation rather than an active IoT device stream.

### Recommended Next Steps
- **Payment Integration:** Integrate a production payment gateway (e.g., Razorpay UPI/NetBanking or Stripe) using webhook-based verification.
- **SMS / WhatsApp Notifications:** Integrate Twilio or Gupshup WhatsApp Business API to dispatch automated order dispatch notifications to the customer's phone number.
- **Customer Order History:** Add an account drawer or modal view where authenticated customers can review previous orders and reorder favorite thalis with a single click.
- **PWA Capabilities:** Add a service worker and web app manifest to allow customers to install Padmavati Bhojnalaya directly onto mobile devices as a Progressive Web App.

---

*Padmavati Bhojnalaya — Ghar Jaisa Swad, Shuddh Desi Ghee Ke Saath.*
