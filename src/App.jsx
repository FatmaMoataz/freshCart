import { lazy, Suspense, useContext, useEffect } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import NotFound from './components/NotFound/NotFound';
import { tokenContext } from './context/tokenContext';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import AuthView from './components/AuthView/AuthView';
import { ToastContainer } from 'react-toastify';

const Cart = lazy(() => import('./components/Cart/Cart'));
const Home = lazy(() => import('./components/Home/Home'));
const Categories = lazy(() => import('./components/Categories/Categories'));
const Brands = lazy(() => import('./components/Brands/Brands'));
const Products = lazy(() => import('./components/Products/Products'));
const Login = lazy(() => import('./components/Login/Login'));
const Register = lazy(() => import('./components/Register/Register'));
const ProductDetails = lazy(() => import('./components/ProductDetails/ProductDetails'));
const Checkout = lazy(() => import('./components/Checkout/Checkout'));
const AllOrders = lazy(() => import('./components/AllOrders/AllOrders'));
const WishList = lazy(() => import('./components/WishList/WishList'));
const ForgetPassword = lazy(() => import('./components/ForgetPassword/ForgetPassword'));

function App() {
  const { setToken } = useContext(tokenContext);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setToken(localStorage.getItem("userToken"));
    }
  }, []);

  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "",
          element: localStorage.getItem("userToken")
            ? <Navigate to="home" />
            : <Navigate to="login" />
        },
        {
          path: "home",
          element: (
            <Suspense fallback={<div className="text-center p-5">Loading...</div>}>
              <ProtectedRoutes><Home /></ProtectedRoutes>
            </Suspense>
          )
        },
        {
          path: "categories",
          element: (
            <Suspense fallback={<div className="text-center p-5">Loading...</div>}>
              <ProtectedRoutes><Categories /></ProtectedRoutes>
            </Suspense>
          )
        },
        {
          path: "brands",
          element: (
            <Suspense fallback={<div className="text-center p-5">Loading...</div>}>
              <ProtectedRoutes><Brands /></ProtectedRoutes>
            </Suspense>
          )
        },
        {
          path: "products",
          element: (
            <Suspense fallback={<div className="text-center p-5">Loading...</div>}>
              <ProtectedRoutes><Products /></ProtectedRoutes>
            </Suspense>
          )
        },
        {
          path: "productDetails/:id/:categoryId",
          element: (
            <Suspense fallback={<div className="text-center p-5">Loading...</div>}>
              <ProtectedRoutes><ProductDetails /></ProtectedRoutes>
            </Suspense>
          )
        },
        {
          path: "cart",
          element: (
            <Suspense fallback={<div className="text-center p-5">Loading...</div>}>
              <ProtectedRoutes><Cart /></ProtectedRoutes>
            </Suspense>
          )
        },
        {
          path: "checkout",
          element: (
            <Suspense fallback={<div className="text-center p-5">Loading...</div>}>
              <ProtectedRoutes><Checkout /></ProtectedRoutes>
            </Suspense>
          )
        },
        {
          path: "allorders",
          element: (
            <Suspense fallback={<div className="text-center p-5">Loading...</div>}>
              <ProtectedRoutes><AllOrders /></ProtectedRoutes>
            </Suspense>
          )
        },
        {
          path: "wishlist",
          element: (
            <Suspense fallback={<div className="text-center p-5">Loading...</div>}>
              <ProtectedRoutes><WishList /></ProtectedRoutes>
            </Suspense>
          )
        },
        {
          path: "login",
          element: (
            <Suspense fallback={<div className="text-center p-5">Loading...</div>}>
              <AuthView><Login /></AuthView>
            </Suspense>
          )
        },
        {
          path: "register",
          element: (
            <Suspense fallback={<div className="text-center p-5">Loading...</div>}>
              <AuthView><Register /></AuthView>
            </Suspense>
          )
        },
        {
          path: "forgetPassword",
          element: (
            <Suspense fallback={<div className="text-center p-5">Loading...</div>}>
              <AuthView><ForgetPassword /></AuthView>
            </Suspense>
          )
        },
        {
          path: "*",
          element: <NotFound />
        }
      ]
    }
  ]);

  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer />
    </>
  );
}

export default App;
