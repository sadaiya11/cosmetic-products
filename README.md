# 🌿 Cosmetic Products E-Commerce Platform

A production-ready full-stack e-commerce architecture built specifically for luxury cosmetic products. Features separate customer and admin applications, backed by a Node.js REST API powered by Express, Prisma ORM, and MongoDB.

---

## 🏗️ Tech Stack

- **Customer Storefront (`client/customer`)**: React (v19) + Vite + Tailwind CSS (v4) + Redux Toolkit + React Router DOM
- **Admin Portal (`client/admin`)**: React (v19) + Vite + Tailwind CSS (v4) + Redux Toolkit + React Router DOM
- **Backend API (`server`)**: Node.js + Express + Prisma ORM + MongoDB + JWT Authentication
- **Deployments**:
  - **Render**: Configured for backend server Web Service (`server/render.yaml`)
  - **Vercel**: Configured for frontend applications & serverless function deployment (`server/vercel.json`)

---

## 📁 Directory Architecture

```
cosmetic-products/
├── client/
│   ├── customer/            # Customer shopping storefront (Port 3000)
│   │   ├── src/
│   │   │   ├── components/  # Navbar, Footer, ProductCard, CartDrawer, HeroBanner
│   │   │   ├── pages/       # Home, Shop, ProductDetail, Cart, Checkout, Login, Register
│   │   │   ├── store/       # Redux store & slices (auth, products, cart)
│   │   │   ├── data/        # Fallback mock data
│   │   │   ├── App.jsx
│   │   │   └── main.jsx
│   │   └── vite.config.js
│   └── admin/               # Admin control panel dashboard (Port 3001)
│       ├── src/
│       │   ├── components/  # AdminSidebar, AdminHeader, ProductModal
│       │   ├── pages/       # Dashboard, ProductsManager, OrdersManager, CustomersManager, Login
│       │   ├── store/       # Redux store & slices (adminAuth, adminProducts, adminOrders)
│       │   ├── App.jsx
│       │   └── main.jsx
│       └── vite.config.js
├── server/                  # Node.js Express REST API (Port 5000)
│   ├── prisma/
│   │   └── schema.prisma    # MongoDB Prisma schema (User, Product, Category, Review, Cart, Order)
│   ├── src/
│   │   ├── config/          # Prisma client singleton
│   │   ├── controllers/     # Auth, Product, Category, Cart, Order controllers
│   │   ├── middleware/      # JWT Protect, Admin verify, Error handler
│   │   ├── routes/          # API express router handlers
│   │   ├── app.js
│   │   └── index.js
│   ├── render.yaml          # Render deployment blueprint
│   └── vercel.json          # Vercel serverless deployment config
└── package.json             # Root workspace runner scripts
```

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
Run npm install in each directory:
```bash
# Backend Server
cd server && npm install

# Customer Storefront
cd ../client/customer && npm install

# Admin Panel
cd ../admin && npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the `server` directory:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="mongodb+srv://<username>:<password>@cluster0.mongodb.net/cosmetics_db?retryWrites=true&w=majority"
JWT_SECRET="super_secret_jwt_key"
```

### 3. Generate Prisma Client
Generate the Prisma MongoDB client types:
```bash
cd server
npx prisma generate
```

### 4. Run Development Servers
From the root directory:
```bash
# Run Customer Client (http://localhost:3000)
npm run dev:customer

# Run Admin Client (http://localhost:3001)
npm run dev:admin

# Run Backend API Server (http://localhost:5000)
npm run dev:server
```

---

## 🌐 Deployment Instructions

### Deploying Backend to Render
1. Push your repository to GitHub / GitLab.
2. Log into [Render Dashboard](https://dashboard.render.com).
3. Create a **New Web Service** and connect your repo.
4. Set **Root Directory** to `server`.
5. Set **Build Command**: `npm install && npx prisma generate`
6. Set **Start Command**: `npm start`
7. Add Environment Variables (`DATABASE_URL`, `JWT_SECRET`, `NODE_ENV=production`).

### Deploying Frontends to Vercel
1. Log into [Vercel](https://vercel.com).
2. For Customer App: Select `client/customer` as Root Directory -> Framework Preset **Vite**.
3. For Admin App: Select `client/admin` as Root Directory -> Framework Preset **Vite**.
4. Set build command `npm run build` and output directory `dist`.
