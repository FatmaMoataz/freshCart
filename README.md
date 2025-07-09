**🛒 FreshCart - E-commerce Web App**

FreshCart is a responsive and modern e-commerce application built with React, Vite, and Tailwind CSS. It offers essential features like user authentication, product browsing, cart management, order tracking, wishlist, and more.

**🔗 Live Demo**

[FreshCart](https://fresh-cart-omega-one.vercel.app/)

**📸 Features**

✅ User Authentication (Login/Register/Forget Password)

🛍️ Product Listing with filtering by categories & brands

🧾 Product Details with dynamic routing

🛒 Shopping Cart with persistent state

💖 Wishlist functionality

💳 Checkout process with order history

🔐 Protected Routes for authenticated access

🎨 Responsive UI using Tailwind CSS & Flowbite

📦 Lazy loading via React.lazy and Suspense

📤 Toast notifications with react-toastify

**🧰 Tech Stack**

| Tech            | Description                        |
| --------------- | ---------------------------------- |
| React           | UI Library                         |
| Vite            | Fast build tool                    |
| Tailwind CSS    | Utility-first CSS framework        |
| React Router v7 | Routing system                     |
| Axios           | API communication                  |
| Formik + Yup    | Form handling and validation       |
| FontAwesome     | Icons                              |
| React Slick     | Carousel for product showcases     |
| React Toastify  | Toast notifications                |
| JWT Decode      | Token decoding and auth management |


**🚀 Getting Started**


1. Clone the Repository

```bash
git clone https://github.com/yourusername/freshcart.git
cd freshcart
```

2. Install Dependencies

```bash
npm install
```
3. Run the App

```bash
npm run dev
```

**🗂️ Project Structure**

```bash
src/
│
├── components/          # All reusable components
├── context/             # Token context (Auth state)
├── App.jsx              # Main app component
├── main.jsx             # App entry point
└── index.css            # Tailwind base styles
```

**🔐 Routing Setup**

/home - Home page (Protected)

/categories - Browse by category (Protected)

/brands - Browse by brand (Protected)

/products - All products (Protected)

/productDetails/:id/:categoryId - Product details

/cart - User cart (Protected)

/wishlist - Wishlist (Protected)

/checkout - Checkout process (Protected)

/allorders - View user orders (Protected)

/login, /register, /forgetPassword - Auth routes

* - 404 Not Found

**✅ Available Scripts**

Command	Description

npm run dev	Start development server

npm run build	Build for production

npm run preview	Preview production build

npm run lint	Lint code using ESLint

