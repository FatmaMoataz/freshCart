import { useContext, useEffect } from 'react'
import { wishlistContext } from '../../context/wishlistContext'
import { Helmet } from 'react-helmet';
import { cartContext } from '../../context/cartContext';

export default function WishList() {
  
  const {removeFromWishlist, getWishlist} = useContext(wishlistContext)
  const { wishlist } = useContext(wishlistContext);
  const { addToCart, getCart } = useContext(cartContext)
 

  async function addProductToCart(id) {
    try {
      let data = await addToCart(id);
      console.log(data);
      getCart();
      toast.success("Product added successfully!",{type:"success", theme:"dark", position:"bottom-right"});
    } catch (error) {
      console.log(error);
    }
  }

  async function removeProductFromWishlist(id) {
    try {
      let data = await removeFromWishlist(id);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function getMyWishlist() {
    try {
      let data = await getWishlist();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getMyWishlist();
  }, [wishlist]);
    return (
    <>
          <Helmet>
    <title>Wishlist</title>
  </Helmet>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5 mx-3">
        <div className="flex items-center justify-center gap-3">
        <h2 className='text-4xl my-5 text-main font-medium'>My Wishlist</h2>
        </div>
              
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-white uppercase bg-main dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-16 py-3"><span className="sr-only">Image</span></th>
                    <th scope="col" className="px-6 py-3">Product</th>
                    <th scope="col" className="px-6 py-3">Price</th>
                    <th scope="col" className="px-6 py-3">Action</th>
                    <th scope="col" className="px-6 py-3">Cart</th>
                  </tr>
                </thead>
                <tbody>
   {wishlist?.data?.map((product) => (
     <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
       <td className="p-4">
         <img src={product.imageCover} className="w-16 md:w-32" alt={product.title} />
       </td>
       <td className="px-6 py-4 font-semibold">{product.title}</td>
       <td className="px-6 py-4 font-semibold">{product.price} EGP</td>
       <td className="px-6 py-4">
         <span onClick={() => removeProductFromWishlist(product.id)}
           className="text-red-600 cursor-pointer hover:underline">Remove</span>
       </td>
       <td className="px-6 py-4">
         <button onClick={() => addProductToCart(product.id)} className="btn border border-main text-main px-3 py-2 rounded-md hover:bg-main hover:text-white">
           Add To Cart
         </button>
       </td>
     </tr>
   ))}
</tbody>

              </table>
            </div>

    </>
  )
}
