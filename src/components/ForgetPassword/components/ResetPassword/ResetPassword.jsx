import axios from 'axios';
import { useFormik } from 'formik'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';
import * as Yup from 'yup';
import { tokenContext } from '../../../../context/tokenContext';

export default function ResetPassword() {
  
const [isCallingApi, setIsCallingApi] = useState(false)
const [ApiError, setApiError] = useState(null)
const { setToken } = useContext(tokenContext);

let navigate = useNavigate()

  const user = {
  email:"",
  newPassword:"",
}

async function callReset(values) {
 try {
  setIsCallingApi(true)
  setApiError(null)
  let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,values)  
  console.log(data);
  localStorage.setItem("userToken", data.token)
  setToken(data.token)
  setIsCallingApi(false)
  navigate('/home')
 }
catch(error) {
setApiError(error.response.data.message)
setIsCallingApi(false)
}
}

const validationSchema = Yup.object().shape({
  email : Yup.string().email('Invalid email format').required('Required'),
  newPassword : Yup.string().matches(new RegExp('^[A-Z][a-z0-9]{3,8}$'),'Invalid password').min(6,'Minimum 6 characters').required('Required'),
})

const ResetForm = useFormik({
  initialValues : user,
  validationSchema : validationSchema,
  onSubmit : callReset
})

  return (
<form onSubmit={ResetForm.handleSubmit} className=" mx-auto my-10 w-[70%]">
  <h1 className='text-3xl my-7 text-main font-bold'>Reset Your Acccount Password</h1>
  
  {
ApiError ? <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
<i className="fa-solid fa-circle-exclamation"></i>
<span className="font-medium">  {ApiError}</span>
</div> : ''
}
  <div className="relative z-0 w-full mb-5 group">
    <input type="email" name="email" id="floating_email" onBlur={ResetForm.handleBlur} value={ResetForm.values.email} onChange={ResetForm.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
  </div>
  {
ResetForm.errors.email && ResetForm.touched.email ?   <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
<i className="fa-solid fa-circle-exclamation"></i>
<span className="font-medium">  {ResetForm.errors.email}</span>
</div> : ''
}
  <div className="relative z-0 w-full mb-5 group">
    <input type="password" name="newPassword" id="floating_password" onBlur={ResetForm.handleBlur} value={ResetForm.values.password} onChange={ResetForm.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  </div>
  {
ResetForm.errors.newPassword && ResetForm.touched.newPassword ?   <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
<i className="fa-solid fa-circle-exclamation"></i>
<span className="font-medium">  {ResetForm.errors.newPassword}</span>
</div> : ''
}

{
  isCallingApi ? <div className="flex justify-center items-center bg-slate-50/35 absolute inset-0">
  <BounceLoader color='#0aad0a' />
  </div> : <div className="flex justify-around items-center">
  <button type="submit" className="text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-main font-medium rounded-lg text-sm block ml-auto w-full sm:w-auto  px-5 py-2.5 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main">Reset Password</button>
  </div>

}

</form>

  )
}
