import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../context/cartContext'
import { tokenContext } from '../../context/tokenContext'
import {jwtDecode} from 'jwt-decode'
import { Modal } from 'flowbite';
import { Helmet } from 'react-helmet';

export default function AllOrders() {
  
  const {getUserOrders} = useContext(cartContext)
  const {token} = useContext(tokenContext)
  const [orders, setOrders] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const $targetEl = document.getElementById('modalEl')
  const instanceOptions = {
    id: 'modalEl',
    override: true
  };
  const options = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses:
        'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
    closable: true,
    onHide: () => {
        console.log('modal is hidden');
    },
    onShow: () => {
        console.log('modal is shown');
    },
    onToggle: () => {
        console.log('modal has been toggled');
    },
  };
  const modal = new Modal($targetEl, options, instanceOptions);
  function openModal(items) {
    setSelectedItems(items)
    modal.show()
  }
function hideModal() {
  modal.hide()
}
  async function getOrders(id) {
    let data = await getUserOrders(id)
    console.log(data);
   setOrders(data)
   }

 function getId() {
let decoded = jwtDecode(token)
getOrders(decoded.id)
  }

useEffect(() => {
token && getId()
},[token])

return (
    <>
 <Helmet>
    <title>All Orders</title>
  </Helmet>   
 
<div className="flex justify-center">
<ol className="flex items-center w-full my-5 ml-44 max-w-full">
  <li className="flex w-full items-center text-main dark:text-main after:content-[''] after:w-full after:h-1 after:border-b after:border-main-100 after:border-4 after:inline-block dark:after:border-main">
    <span className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full lg:h-12 lg:w-12 dark:bg-main shrink-0">
      <svg className="w-3.5 h-3.5 text-main lg:w-4 lg:h-4 dark:text-green-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5.917 5.724 10.5 15 1.5" />
      </svg>
    </span>
  </li>
  <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
    <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
      <svg className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
        <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
      </svg>
    </span>
  </li>
  <li className="flex items-center w-full">
    <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
      <svg className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
        <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
      </svg>
    </span>
  </li>
</ol>
</div>




<div className="relative overflow-x-auto my-5 mx-5">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-white uppercase bg-main dark:bg-main dark:text-white">
      <tr>
        <th scope="col" className="px-6 py-3">
          Order ID
        </th>
        <th scope="col" className="px-6 py-3">
          is Paid
        </th>
        <th scope="col" className="px-6 py-3">
          Payment Method 
        </th>
        <th scope="col" className="px-6 py-3">
          Total Order Price
        </th>
        <th scope="col" className="px-6 py-3">
          View Details
        </th>
      </tr>
    </thead>
    <tbody>
      {orders.map(order => 
      <>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {order.id}
              </th>
              <td className="px-6 py-4">
              {order.isPaid ? <span className='text-main'>Paid</span> : <span className='text-red-600'> Not Paid</span>}
              </td>
              <td className="px-6 py-4">
                {order.paymentMethodType}
              </td>
              <td className="px-6 py-4">
                {order.totalOrderPrice} EGP
              </td>
              <td className="px-6 py-4">
<button onClick={() => openModal(order.cartItems)} className="block text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-green-50 font-medium rounded-lg text-sm px-3 py-1 text-center dark:bg-main dark:hover:bg-green-50 dark:focus:ring-main" type="button">
 <i className='fa fa-eye'></i>
</button>

              </td>
            </tr>
            </>
      )}

<div id="modalEl" data-modal-backdrop="static" tabIndex={-1} aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
  <div className="relative p-4 w-full max-w-2xl max-h-full">
    <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Order Details
        </h3>
        <button type="button" onClick={hideModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
      </div>
      <div className="p-4 md:p-5 space-y-4">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-main dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-16 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3">
              Product
            </th>
            <th scope="col" className="px-6 py-3">
              Qty
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {selectedItems.map(product => <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="p-4">
              <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
            {product.product.title} 
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center">
 
                <div>
    <span>{product.count}</span>   
             </div>

              </div>
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
            {product.price} EGP
            </td>

          </tr> )}
      
        </tbody>
      </table>

      </div>

    </div>
  </div>
</div>



    </tbody>
  </table>
</div>


   



    
    </>
  )
}
