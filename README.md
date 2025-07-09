# 🛒 FreshCart – E-commerce Web App

**FreshCart** is a modern, responsive e-commerce web application built with **React**, **Vite**, and **Tailwind CSS**. It includes key features like user authentication, product browsing, cart management, wishlist, order tracking, and a smooth dark/light mode experience.

---

## 🔗 Live Demo

➡️ [Visit FreshCart](https://fresh-cart-omega-one.vercel.app/)

---

## 📸 Key Features

- ✅ **User Authentication** (Login / Register / Forget Password)
- 🛍️ **Product Listing** with filtering by categories and brands
- 📄 **Product Details** page with dynamic routing
- 🛒 **Shopping Cart** with persistent state (localStorage)
- 💖 **Wishlist** functionality
- 💳 **Checkout** process with order tracking
- 🔐 **Protected Routes** for secure pages
- 🌗 **Dark / Light Mode** toggle
- 🎨 **Responsive UI** using Tailwind CSS and Flowbite
- 💤 **Lazy Loading** with `React.lazy` and `Suspense`
- 📤 **Toast Notifications** using `react-toastify`

---

## 🧰 Tech Stack

| Tech              | Description                         |
|-------------------|-------------------------------------|
| React             | Frontend UI library                 |
| Vite              | Fast bundler and dev server         |
| Tailwind CSS      | Utility-first CSS framework         |
| React Router v7   | Routing and navigation              |
| Axios             | API communication                   |
| Formik + Yup      | Form management and validation      |
| React Toastify    | Toast notifications                 |
| React Slick       | Carousel for product showcases      |
| FontAwesome       | Icon library                        |
| JWT Decode        | Token decoding and auth handling    |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/FatmaMoataz/freshCart.git
cd freshCart
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the App

```bash
npm run dev
```

---

## 🗂️ Project Structure

```bash
src/
│
├── components/          # Reusable components
├── context/             # Token context (auth state)
├── App.jsx              # Main App setup & routing
├── main.jsx             # Entry point
└── index.css            # Tailwind base styles
```

---

## 🔐 Routing Overview

| Route                                | Description                         |
|--------------------------------------|-------------------------------------|
| /home                                | Home page (Protected)               |
| /categories                          | View product categories             |
| /brands                              | View all brands                     |
| /products                            | All products                        |
| /productDetails/:id/:categoryId      | Product details (Dynamic)           |
| /cart                                | Shopping cart (Protected)           |
| /wishlist                            | Wishlist (Protected)                |
| /checkout                            | Checkout (Protected)                |
| /allorders                           | Order history (Protected)           |
| /login , /register , /forgetPassword | Auth routes                         |
| *                                    | 404 Not Found                       |

---

## ✅ Available Scripts

| Command                    | Description                         |
|----------------------------|-------------------------------------|
| npm run dev                | Start the development server        |
| npm run build              | Build the app for production        |
| npm run preview            | Preview the production build        |
| npm run lint               | Lint code using ESLint              |
