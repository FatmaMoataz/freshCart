import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react'
import ProductItem from '../../../Shared/ProductItem/ProductItem';

export default function RelatedProducts(props) {
 let {categoryId} = props 
 const [relatedProducts, setRelatedProducts] = useState([])
 
 
 async function getRelatedProducts() {
   try {
    let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
    console.log(data);
    let res = data.data.filter(product => product.category._id == categoryId)
    setRelatedProducts(res)
   }
   catch(error) {
  console.log(error);
   }
   }

   useEffect(() => {
getRelatedProducts()
   },[])
  return (
        <div className='main-layout mb-8'>
{relatedProducts.map(product => <ProductItem key={product.id} product={product}/>)}
 </div>
  )
}
