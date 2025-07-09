import { useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import VerificationCode from '../VerificationCode/VerificationCode';

export default function EmailVerification() {
  const [isCallingApi, setIsCallingApi] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [showVerification, setShowVerification] = useState(false); 

  const user = { email: "" };

  async function ForgetPassword(values) {
    try {
      setIsCallingApi(true);
      setApiError(null);
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values);
      console.log(data);
      setIsCallingApi(false);
      setShowVerification(true); 
    } catch (error) {
      setApiError(error.response?.data?.message || "Something went wrong");
      setIsCallingApi(false);
    }
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Required'),
  });

  const ForgetForm = useFormik({
    initialValues: user,
    validationSchema: validationSchema,
    onSubmit: ForgetPassword,
  });

  return (
    <div className="mx-auto my-10 w-[70%]">
      
      {showVerification ? (
        <VerificationCode />
      ) : (
        <form onSubmit={ForgetForm.handleSubmit}>
          <h1 className="text-3xl my-7 text-main font-bold">
            Please Enter Your Verification Email
          </h1>

          {apiError && (
            <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <i className="fa-solid fa-circle-exclamation"></i>
              <span className="font-medium"> {apiError}</span>
            </div>
          )}

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="floating_email"
              onBlur={ForgetForm.handleBlur}
              value={ForgetForm.values.email}
              onChange={ForgetForm.handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
          </div>

          {ForgetForm.errors.email && ForgetForm.touched.email && (
            <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <i className="fa-solid fa-circle-exclamation"></i>
              <span className="font-medium"> {ForgetForm.errors.email}</span>
            </div>
          )}

          <button
            type="submit"
            className="text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-main font-medium rounded-lg text-sm block ml-auto w-full sm:w-auto px-5 py-2.5 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main"
          >
            {isCallingApi ? "Sending..." : "Send Code"}
          </button>
        </form>
      )}
    </div>
  );
}
