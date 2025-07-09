import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cartContext } from '../../../context/cartContext';
import { toast } from 'react-toastify';
import { wishlistContext } from '../../../context/wishlistContext';

export default function ProductItem(props) {
  let { imageCover, title, category, price, ratingsAverage, id } = props.product;
  let { addToCart, getCart } = useContext(cartContext);
  let { addToWishlist, removeFromWishlist, getWishlist, wishlist } = useContext(wishlistContext);
  
  const [inWishlist, setInWishlist] = useState(false);
  const [isCallingApi, setIsCallingApi] = useState(false)


  useEffect(() => {
    getWishlist();
  }, []);


  useEffect(() => {
    setInWishlist(wishlist?.data?.some(item => item.id === id));
  }, [wishlist, id]);

  async function addProductToCart(id) {
    setIsCallingApi(true)
    let data = await addToCart(id);
    if (data.status === "success") {
      toast("Product added successfully!", { type: "success", theme: "dark", position: "bottom-right" });
    }
    setIsCallingApi(false)
    getCart();
  }

  async function addProductToWishlist(id) {
    await addToWishlist(id);
    getWishlist();
  }

  async function deleteProductFromWishlist(id) {
    await removeFromWishlist(id);
    getWishlist();
  }

  return (
    <div className="md:w-1/3 lg:w-1/6 px-3 mb-3">
      <div className="product">
        <Link to={`/productDetails/${id}/${category._id}`}>
          <img src={imageCover} className="mb-2" alt="product item" />
          <span className="text-main">{category.name}</span>
          <h2 className="mb-4 font-semibold">{title.split(" ").splice(0, 2).join(' ')}</h2>
          <div className="flex justify-between mb-4">
            <p>{price} EGP</p>
            <p><i className="fa-solid fa-star" style={{ color: '#FFD43B' }} />{ratingsAverage}</p>
          </div>
        </Link>
        <div className="flex justify-between items-center">
          {isCallingApi ?  <button className="btn w-40 bg-main text-white p-2 rounded-md">
            Loading ...
          </button> : 
                    <button onClick={() => addProductToCart(id)} className="btn w-40 bg-main text-white p-2 rounded-md">
                    Add To Cart
                  </button>}
          <label className="cursor-pointer">
            {inWishlist ?  
              <i onClick={() => deleteProductFromWishlist(id)} className="fa-solid fa-heart text-red-600 text-2xl transition-all"></i> 
              :  
              <i onClick={() => addProductToWishlist(id)} className="fa-solid fa-heart text-gray-300 text-2xl transition-all"></i>}
          </label>
        </div>
      </div>
    </div>
  );
}
