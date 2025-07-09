import axios from 'axios';
import { useEffect, useState } from 'react';
import { BounceLoader } from 'react-spinners';
import { Modal } from 'flowbite';
import { Helmet } from 'react-helmet';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const $targetEl = document.getElementById('modalEl');

  const options = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
    closable: true,
    onHide: () => console.log('modal is hidden'),
    onShow: () => console.log('modal is shown'),
    onToggle: () => console.log('modal has been toggled'),
  };

  let modal;
  if ($targetEl) {
    modal = new Modal($targetEl, options);
  }

  function openModal(item) {
    setSelectedItem(item);
    modal?.show();
  }

  function hideModal() {
    modal?.hide();
    setSelectedItem(null);
  }

  async function getAllBrands() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      setBrands(data.data);
      console.log(data);
      
    } catch (error) {
      console.error('Error fetching brands:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllBrands();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BounceLoader color="#0aad0a" />
      </div>
    );
  }

  return (
    <>
    <Helmet>
    <title>Brands</title>
  </Helmet>
      <h1 className="text-main text-4xl font-medium text-center my-5">All Brands</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
        {brands.map((brand) => (
          <button key={brand._id} onClick={() => openModal(brand)}>
            <div className="hover:shadow-md max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <img className="rounded-t-lg w-full h-32 object-cover" src={brand.image} alt={brand.name} />
              <div className="p-5 text-center">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-main dark:text-white">{brand.name}</h5>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      <div id="modalEl" tabIndex={-1} className="hidden fixed inset-0 z-50 justify-center items-center w-full h-full bg-gray-900/50">
        <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <button
            onClick={hideModal}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
          >
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          {selectedItem && (
            <div className="p-4 text-center">
              <img className="w-full h-40 object-cover rounded" src={selectedItem.image} alt={selectedItem.name} />
              <p className='text-main'>{selectedItem.slug}</p>
              <h3 className="text-xl font-semibold mt-4">{selectedItem.name}</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
