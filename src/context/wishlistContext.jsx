import axios from 'axios'
import { createContext, useState } from 'react'
import { toast } from 'react-toastify'

export let wishlistContext = createContext()

export default function WishlistContextProvider({children}) {
 
 const wishlist_API = 'https://ecommerce.routemisr.com/api/v1/wishlist'
 const headers = {
    token : localStorage.getItem("userToken")
  }
  const [numOfWishlistItems, setNumOfWishlistItems] = useState(0)
  const [wishlist, setWishlist] = useState(null)

async function addToWishlist(productId) {
    let {data} = await axios.post(wishlist_API, {productId}, {headers})
    if(data.status == "success") {
        setNumOfWishlistItems(data.numOfWishlistItems)
        toast("Product added to wishlist successfully!",{type:"success", theme:"dark", position:"bottom-right"});
      } 
      const updatedWishlist = await getWishlist();
      setWishlist(updatedWishlist);
 }
 async function removeFromWishlist(id) {
    const {data} = await axios.delete(`${wishlist_API}/${id}`, {headers})
    if(data.status == "success") {
      setNumOfWishlistItems(data.numOfWishlistItems)
       toast("Product removed from wishlist successfully!",{type:"success", theme:"dark", position:"bottom-right"});
    }
    setWishlist(data)
    return data   
 }
 async function getWishlist() {
    const {data} = await axios.get(wishlist_API, {headers})
    if(data.status == "success") {
      setNumOfWishlistItems(data.numOfWishlistItems)
    }
    setWishlist(data)
    return data   
    }
    return (
   <wishlistContext.Provider value={{wishlist ,addToWishlist, removeFromWishlist, getWishlist}}>
{children}
   </wishlistContext.Provider>
  )
}
