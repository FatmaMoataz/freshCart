import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import '../node_modules/flowbite/dist/flowbite.min.js'
import TokenContextProvider from './context/tokenContext.jsx'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CartContextProvider from './context/cartContext.jsx'
import WishlistContextProvider from './context/wishlistContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <TokenContextProvider>
          <WishlistContextProvider>
          <CartContextProvider>

<App/>

</CartContextProvider>
          </WishlistContextProvider>

        </TokenContextProvider>
  </React.StrictMode>,
)
