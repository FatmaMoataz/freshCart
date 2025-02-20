import React, { useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import ResetPassword from '../ResetPassword/ResetPassword';

export default function VerificationCode() {
  const [isCallingApi, setIsCallingApi] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [showResetPassword, setShowResetPassword] = useState(false); 

  const user = {
    resetCode: "",
  };

  async function VerifyEmail(values) {
    try {
      setIsCallingApi(true);
      setApiError(null);
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values);
      console.log(data);
      setIsCallingApi(false);
      setShowResetPassword(true); 
    } catch (error) {
      setApiError(error.response?.data?.message || "Something went wrong");
      setIsCallingApi(false);
    }
  }

  const validationSchema = Yup.object().shape({
    resetCode: Yup.string().required('Required'),
  });

  const VerifyForm = useFormik({
    initialValues: user,
    validationSchema: validationSchema,
    onSubmit: VerifyEmail,
  });

  return (
    <div className="mx-auto my-10 w-[70%]">

      {showResetPassword ? (
        <ResetPassword />
      ) : (
        <form onSubmit={VerifyForm.handleSubmit}>
          <h1 className="text-3xl my-7 text-main font-bold">Verification Code</h1>

          {apiError && (
            <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <i className="fa-solid fa-circle-exclamation"></i>
              <span className="font-medium"> {apiError}</span>
            </div>
          )}

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="resetCode"
              id="floating_code"
              onBlur={VerifyForm.handleBlur}
              value={VerifyForm.values.resetCode}
              onChange={VerifyForm.handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_code"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Code
            </label>
          </div>

          {VerifyForm.errors.resetCode && VerifyForm.touched.resetCode && (
            <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <i className="fa-solid fa-circle-exclamation"></i>
              <span className="font-medium"> {VerifyForm.errors.resetCode}</span>
            </div>
          )}

          <button
            type="submit"
            className="text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-main font-medium rounded-lg text-sm block ml-auto w-full sm:w-auto px-5 py-2.5 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main"
          >
            {isCallingApi ? "Verifying..." : "Verify"}
          </button>
        </form>
      )}
    </div>
  );
}
