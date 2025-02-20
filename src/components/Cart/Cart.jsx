import React, { useContext, useEffect, useState } from 'react';
import { cartContext } from '../../context/cartContext';
import { BounceLoader } from "react-spinners";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Cart() {
  const { cartDetails, removeProduct, updateCount, clearCart, getCart } = useContext(cartContext);
  const [isLoading, setIsLoading] = useState(false);

  async function deleteProduct(id) {
    try {
      let data = await removeProduct(id);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateItems(id, count) {
    try {
      let data = await updateCount(id, count);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function clearAllCart() {
    setIsLoading(true); 
    try {
      await clearCart();
      await getCart();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false); 
  }

  useEffect(() => {
    console.log(cartDetails);
  }, [cartDetails, updateItems]);

  return (
    <>
        <Helmet>
    <title>Cart</title>
  </Helmet>
      {isLoading ? (
        <div className="main-layout mb-8 flex justify-center items-center h-screen">
          <BounceLoader color="#0aad0a" />
        </div>
      ) : cartDetails ? (
        cartDetails?.data?.products?.length === 0 ? (
          <div className="flex justify-center items-center gap-2 my-3">
            <i className="fa-regular fa-face-frown fa-2xl text-main"></i>
            <h2 className='text-3xl text-main font-medium'>Empty Cart</h2>
          </div>
        ) : (
          <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5 mx-3">
              <div className="flex md:justify-between md:flex-row sm:flex-col sm:text-center">
                <h2 className='text-4xl my-5'>Total Product Items <span className='text-main'>{cartDetails.numOfCartItems}</span></h2>
                <h2 className='text-4xl my-5'>Total Price <span className='text-main'>{cartDetails.data.totalCartPrice} EGP</span></h2>
              </div>
              <button onClick={clearAllCart} className='text-main w-full text-right font-semibold cursor-pointer hover:underline my-1 pe-3'>
                Clear All <i className="fa-regular fa-trash-can"></i>
              </button>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-white uppercase bg-main dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-16 py-3"><span className="sr-only">Image</span></th>
                    <th scope="col" className="px-6 py-3">Product</th>
                    <th scope="col" className="px-6 py-3">Qty</th>
                    <th scope="col" className="px-6 py-3">Price</th>
                    <th scope="col" className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartDetails.data.products.map(product => (
                    <tr key={product.product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="p-4">
                        <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Product" />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{product.product.title}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <button onClick={() => updateItems(product.product._id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                            </svg>
                          </button>
                          <span>{product.count}</span>
                          <button onClick={() => updateItems(product.product._id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{product.price} EGP</td>
                      <td className="px-6 py-4">
                        <span onClick={() => deleteProduct(product.product._id)} className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline">Remove</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex">
              <Link to={'/checkout'} className='bg-main rounded-md text-white px-8 py-2 ml-auto text-center my-5 mx-3'>Checkout</Link>
            </div>
          </>
        )
      ) : (
        <div className="main-layout mb-8 flex justify-center items-center h-screen">
          <BounceLoader color="#0aad0a" />
        </div>
      )}
    </>
  );
}
