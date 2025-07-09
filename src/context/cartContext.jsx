import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { toast } from "react-toastify";

export const cartContext = createContext()

export default function CartContextProvider({children}) {
    const [numOfCartItems, setNumOfCartItems] = useState(0)
    const [cartId, setCartId] = useState('')
    const [cartDetails, setCartDetails] = useState(null)
    const API_URL = `https://ecommerce.routemisr.com/api/v1/cart`
    const ORDER_API_URL = `https://ecommerce.routemisr.com/api/v1/orders`
    const getHeaders = () => {
  return {
    token: localStorage.getItem("userToken")
  };
};
  const headers = {
    token : localStorage.getItem("userToken")
  }
  useEffect(() => {
    getCart()
      },[])
  async function addToCart(productId) {
  const {data} = await axios.post(API_URL,{productId} , {headers: getHeaders()})
  if(data.status == "success") {
    setNumOfCartItems(data.numOfCartItems)
  }
  return data
  }
  async function getCart() {
    const {data} = await axios.get(API_URL, {headers: getHeaders()})
    if(data.status == "success") {
      setNumOfCartItems(data.numOfCartItems)
    }
    setCartId(data.cartId)
    setCartDetails(data)
    return data   
    }
    async function removeProduct(id) {
        const {data} = await axios.delete(`${API_URL}/${id}`, {headers: getHeaders()})
        if(data.status == "success") {
          setNumOfCartItems(data.numOfCartItems)
           toast.success("Product removed successfully!",{type:"success", theme:"dark", position:"bottom-right"});
        }
        setCartDetails(data)
        return data
        }
        async function updateCount(id,count) {
            const {data} = await axios.put(`${API_URL}/${id}`,{count}, {headers: getHeaders()})
            setCartDetails(data)
            return data
            }
            async function clearCart() {
              const { data } = await axios.delete(API_URL, { headers: getHeaders() });
              if (data.status === "success") {
                
                setCartDetails(null);
                setNumOfCartItems(0);
                toast.success("Cart cleared successfully!", { theme: "dark", position: "bottom-right" });
            } 
            return data; 
                }
                async function cashOnDelivery(shippingAddress) {
                  const {data} = await axios.post(`${ORDER_API_URL}/${cartId}`,{shippingAddress}, {headers: getHeaders()})
                  if(data.status == 'success') {
                    getCart()
                  }
                  return data
                  }
                  async function onlinePayment(shippingAddress) {
                    const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,{shippingAddress}, {headers: getHeaders()})
                    if(data.status == 'success') {
                      getCart()
                    }
                    return data
                    }
async function getUserOrders(userId) {
  const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}?url=http://localhost:5173`)
return data
}

    return (
    <cartContext.Provider value={{numOfCartItems,setNumOfCartItems, addToCart, getCart, cartDetails,removeProduct,updateCount, clearCart,cashOnDelivery, onlinePayment, getUserOrders}}>
        {children}
    </cartContext.Provider>
  )
}
