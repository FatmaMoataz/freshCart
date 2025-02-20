import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { BounceLoader } from 'react-spinners';
import * as Yup from 'yup';
import { cartContext } from '../../context/cartContext';

export default function Checkout() {
  
const [isCallingApi, setIsCallingApi] = useState(false)
const [ApiError, setApiError] = useState(null)
let {cashOnDelivery, onlinePayment} = useContext(cartContext)
let [isOnline, setIsOnline] = useState(false)

  const initialValues = {
  details:"",
  phone:"",
  city:""
}

async function callPayment(values) {
 try {
  setIsCallingApi(true)

  if(isOnline) {
    let data = await onlinePayment(values)
    console.log(data);
    window.location.href = data.session.url
  } else {
    let data = await cashOnDelivery(values)
    console.log(data);
  }

  setApiError(null) 
  setIsCallingApi(false)
 }
catch(error) {
setApiError(error.response.data.message)
setIsCallingApi(false)
}
}

const validationSchema = Yup.object().shape({
  details : Yup.string().required('Required'),
  phone : Yup.string().required('Required'),
  city : Yup.string().required('Required'),
})

const shippingForm = useFormik({
  initialValues ,
  validationSchema ,
  onSubmit : callPayment
})

  return (
<form onSubmit={shippingForm.handleSubmit} className=" mx-auto my-10 w-[70%]">
  <h1 className='text-3xl my-7 text-main font-bold'>Shipping Info</h1>
  
  {
ApiError ? <div class="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
<i class="fa-solid fa-circle-exclamation"></i>
<span class="font-medium">  {ApiError}</span>
</div> : ''
}
  <div className="relative z-0 w-full mb-5 group">
    <input type="text" name="details" id="floating_details" onBlur={shippingForm.handleBlur} value={shippingForm.values.details} onChange={shippingForm.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
    <label htmlFor="floating_details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details</label>
  </div>
  {
shippingForm.errors.details && shippingForm.touched.details ?   <div class="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
<i class="fa-solid fa-circle-exclamation"></i>
<span class="font-medium">  {shippingForm.errors.details}</span>
</div> : ''
}
  <div className="relative z-0 w-full mb-5 group">
    <input type="tel" name="phone" id="floating_phone" onBlur={shippingForm.handleBlur} value={shippingForm.values.phone} onChange={shippingForm.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
    <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
  </div>
  {
shippingForm.errors.phone && shippingForm.touched.phone ?   <div class="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
<i class="fa-solid fa-circle-exclamation"></i>
<span class="font-medium">  {shippingForm.errors.phone}</span>
</div> : ''
}
<div className="relative z-0 w-full mb-5 group">
    <input type="text" name="city" id="floating_city" onBlur={shippingForm.handleBlur} value={shippingForm.values.city} onChange={shippingForm.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
    <label htmlFor="floating_city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
  </div>
  {
shippingForm.errors.city && shippingForm.touched.city ?   <div class="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
<i class="fa-solid fa-circle-exclamation"></i>
<span class="font-medium">  {shippingForm.errors.city}</span>
</div> : ''
}
<div className="relative z-0 w-full mb-5 group">
    <input type="checkbox" value='online' onChange={() => setIsOnline(true)} id='online'className="accent-green-600 focus:ring-2 focus:ring-main focus:ring-offset-0 focus:ring-offset-white checked:bg-main checked:border-transparent"/>
    <label htmlFor="online" className='mx-3 cursor-pointer'>Online</label>
  </div>
{
  isCallingApi ? <div className="flex justify-center items-center bg-slate-50/35 absolute inset-0">
  <BounceLoader color='#0aad0a' />
  </div> :   <button type="submit" className="text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-main font-medium rounded-lg text-sm block ml-auto w-full sm:w-auto  px-5 py-2.5 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main">Pay Now</button>

}

</form>

  )
}
