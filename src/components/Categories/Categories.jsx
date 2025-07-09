import axios from 'axios';
import { useEffect, useState } from 'react'
import SubCategories from './components/SubCategories';
import { BounceLoader } from 'react-spinners';
import { Helmet } from 'react-helmet';

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [subcategories, setSubCategories] = useState([])
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const[isLoading, setIsLoading] = useState(false)
  async function getAllCategories() {
    try {
      setIsLoading(true)
      let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
      setCategories(response.data.data); 
    } catch (error) {
      console.error("Error fetching categories:", error);
    } 
    finally {
      setIsLoading(false)
    }
  }
  async function getAllSubCategoriesOnCategory(id,name) {
    try {
      setIsLoading(true)
      let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
      console.log("Subcategories:", response.data); 
      setSubCategories(response.data.data);
      setSelectedCategoryName(name);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
    finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    getAllCategories()
  },[])
  return (
<>
<Helmet>
    <title>Categories</title>
  </Helmet>
{isLoading ? <div className="flex justify-center items-center bg-slate-50/35 absolute inset-0">
  <BounceLoader color='#0aad0a' />
  </div> : 
  <>
  <h1 className="text-main text-4xl font-medium text-center my-5">All Categories</h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 px-11 mb-5">
  {categories.map(category =>
            <button className='w-full' onClick={() => getAllSubCategoriesOnCategory(category._id, category.name)}>
            <div className="hover:shadow-md bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <img className="rounded-t-lg w-full h-80 object-cover" src={category.image} alt={category.name} />
              <div className="p-5 text-center">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-main dark:text-white">{category.name}</h5>
              </div>
            </div>
          </button>
  )} 
  </div>
  </>
  }


{selectedCategoryName && (
        <h1 className="text-main text-3xl font-medium text-center my-5">
          {selectedCategoryName} SubCategories
        </h1>
      )}
<SubCategories subcategories={subcategories}/>

</>

  )
}
