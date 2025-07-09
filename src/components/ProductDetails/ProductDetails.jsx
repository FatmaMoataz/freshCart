import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';
import RelatedProducts from './components/RelatedProducts/RelatedProducts';
import Slider from "react-slick";
import { cartContext } from '../../context/cartContext';
import { toast } from 'react-toastify';
import { wishlistContext } from '../../context/wishlistContext';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {
 const [details, setDetails] = useState(null);
 const [isLoading, setIsLoading] = useState(true)
 const [isCallingApi, setIsCallingApi] = useState(false)
 const {id, categoryId} = useParams()
 let {addToCart,getCart} = useContext(cartContext)
   let {addToWishlist , getWishlist , removeFromWishlist} = useContext(wishlistContext)
  let [inWishlist , setInWishlist] = useState(false)
 const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};
async function addProductToWishlist(id) {
  let data = await addToWishlist(id)
  console.log(data);
  setInWishlist(true)
  getWishlist()
  }
  async function deleteProductfromWishlist(id) {
    let data = await removeFromWishlist(id)
    console.log(data);
    setInWishlist(false)
    getWishlist()
    }
 
 async function getProductDetails () {
setIsLoading(true)
 try {
  let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  console.log(data);
  setDetails(data.data)
 }
 catch(error) {
console.log(error);

 }
 finally {
setIsLoading(false)
 }
 }

 async function addProductToCart(id) {
  setIsCallingApi(true)
  let data = await addToCart(id)
  if(data.status == "success") {
    toast("Product added successfully!",{type:"success", theme:"dark", position:"bottom-right"});
  }
  setIsCallingApi(false)
  getCart()
  }

 useEffect(() => {
  getProductDetails()
 },[id])
 if(isLoading) {
  return (
    <div className='main-layout mb-8 flex justify-center items-center h-screen'>
    <BounceLoader color='#0aad0a' />
  </div>
  )
 } 
  return (
    <>
              <Helmet>
    <title>Product Details</title>
  </Helmet>
    <div className='main-layout items-center mx-5 py-16 sm:flex-col md:flex-row'>
      <div className="w-4/12 mb-5">
      <Slider {...settings}>
{details?.images.map(src => <img src={src} alt="product item" />)}
</Slider>
      </div>
      <div className="w-8/12">
      <h1 className='mb-4 font-bold'>{details?.title}</h1>
      <p>{details?.description}</p>
      <span>{details?.category?.name}</span>
      <div className="flex justify-between mb-4">
  <p>{details?.price} EGP</p>
  <p>  <i className="fa-solid fa-star" style={{color: '#FFD43B'}} />{details?.ratingsAverage}</p>
 
</div>
<div className="flex justify-between items-center">
  {isCallingApi ? <button className='btn w-40 bg-main text-white p-2 rounded-md'>Loading ...</button>
: <button onClick={() => addProductToCart(details.id)} className='btn w-40 bg-main text-white p-2 rounded-md'>Add To Cart</button>
}
<label className="cursor-pointer">
  <input type="checkbox" className="sr-only peer"/>
  {inWishlist ?  
  <i onClick={() => deleteProductfromWishlist(id)} className="fa-solid fa-heart text-red-600 text-2xl transition-all"></i> 
  :  
  <i onClick={() => addProductToWishlist(id)} className="fa-solid fa-heart text-gray-300 text-2xl transition-all"></i>}

</label>
</div>
      </div>
      <h1 className='font-medium text-4xl'>Related Products</h1>
      <RelatedProducts categoryId={details?.category?._id}  />
    </div>
    </>
  )
}
