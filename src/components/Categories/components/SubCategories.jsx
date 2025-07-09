
export default function SubCategories({subcategories}) {
  
    return (
        <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 px-11 mb-5">
        {subcategories.map(subcategory =>
          <div className="hover:shadow-md bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="p-5 text-center">
              <h5 className="mb-2 text-xl font-bold tracking-tight dark:text-white">{subcategory.name}</h5>
            </div>
          </div>
)}
        </div>
        </>
  )
}
