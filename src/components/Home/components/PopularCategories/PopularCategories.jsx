import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import styles from '../PopularCategories/PopularCategories.module.css';

export default function PopularCategories() {
const [categories, setCategories] = useState([])
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 2,
  arrows: false,
  responsive: [{
 
    breakpoint: 1024,
    settings: {
      slidesToShow: 3,
      infinite: true
    }

  }, {

    breakpoint: 600,
    settings: {
      slidesToShow: 2,
      dots: true
    }

  }, {

    breakpoint: 300,
    settings: "unslick" 

  }]
};
  async function getCategories() {
try {
  const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  console.log(data);
  setCategories(data.data)
  
} catch (error) {
  console.log(error);
  
}
}
useEffect(() => {
  getCategories()
},[]) 
  return (
   <div>
     <h2 className='text-3xl font-medium my-3 text-main'>Shop Popular Categories</h2>
    <Slider {...settings}>
    {categories.map(category => <div>
      <img src={category.image} className={styles.categoryImage} alt="product item" />
      <h5 className='font-medium'>{category.name}</h5>
    </div>)}
    </Slider>
   </div>
  )
}
