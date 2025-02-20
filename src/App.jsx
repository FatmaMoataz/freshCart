import { lazy, Suspense, useContext, useEffect } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import NotFound from './components/NotFound/NotFound'
import { tokenContext } from './context/tokenContext'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import AuthView from './components/AuthView/AuthView'
import { ToastContainer } from 'react-toastify';

function App() {

const Cart = lazy(() => import('./components/Cart/Cart'))
const Home = lazy(() => import('./components/Home/Home'))
const Categories = lazy(() => import('./components/Categories/Categories'))
const Brands = lazy(() => import('./components/Brands/Brands'))
const Products = lazy(() => import('./components/Products/Products'))
const Login = lazy(() => import('./components/Login/Login'))
const Register = lazy(() => import('./components/Register/Register'))
const ProductDetails = lazy(() => import('./components/ProductDetails/ProductDetails'))
const Checkout = lazy(() => import('./components/Checkout/Checkout'))
const AllOrders = lazy(() => import('./components/AllOrders/AllOrders'))
const WishList = lazy(() => import('./components/WishList/WishList'))
const ForgetPassword = lazy(() => import('./components/ForgetPassword/ForgetPassword'))

let {setToken} = useContext(tokenContext)
useEffect(() => {
if(localStorage.getItem("userToken")) {
setToken(localStorage.getItem("userToken"))
}
},[])

  const routes = createBrowserRouter([
  {path:"", element:<Layout/>, children:[
    {path:"home", element:
    <Suspense>
    <ProtectedRoutes><Home/></ProtectedRoutes>
    </Suspense>
},
    {path:"categories", element:
    <Suspense>
  <ProtectedRoutes><Categories/></ProtectedRoutes>
    </Suspense>
  },
    {path:"brands", element:
    <Suspense>
<ProtectedRoutes><Brands/></ProtectedRoutes>
    </Suspense>
    },
    {path:"products", element:
    <Suspense>
    <ProtectedRoutes><Products/></ProtectedRoutes>
    </Suspense>
},
    {path:"login", element:
    <Suspense>
    <AuthView><Login/> </AuthView>
    </Suspense>
},
    {path:"register", element:
    <Suspense>
    <AuthView><Register/> </AuthView>
    </Suspense>
},
    {path:"cart", element:
    <Suspense>
   <ProtectedRoutes><Cart/></ProtectedRoutes>
    </Suspense>
 },
    {path:"productDetails/:id/:categoryId", element:
    <Suspense>
    <ProtectedRoutes><ProductDetails/></ProtectedRoutes>
    </Suspense>
},
    {path:"checkout", element:
    <Suspense>
    <ProtectedRoutes><Checkout/></ProtectedRoutes>
    </Suspense>
},
    {path:"allorders", element:
    <Suspense>
    <ProtectedRoutes><AllOrders/></ProtectedRoutes>
    </Suspense>
},
    {path:"wishlist", element:
    <Suspense>
    <ProtectedRoutes><WishList/></ProtectedRoutes>
    </Suspense>
},
    {path:"forgetPassword", element:
    <Suspense>
    <AuthView><ForgetPassword/></AuthView>
    </Suspense>
},
    {path:"*", element: <NotFound/>}
  ]}
])
  return (
    <>
<RouterProvider router={routes}></RouterProvider>
<ToastContainer />
    </>
  )
}

export default App
