import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ProductItem from "../../../Shared/ProductItem/ProductItem";
import { BounceLoader } from "react-spinners";
import { cartContext } from "../../../../context/cartContext";
import { toast } from "react-toastify";

export default function RecentProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
let {addToCart,getCart} = useContext(cartContext)
  async function getProducts() {
    setIsLoading(true);
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      console.log(data);
      setProducts(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
async function addProductToCart(id) {
let data = await addToCart(id)
console.log(data);
if(data.status == "success") {
  toast("Product added successfully!",{type:"success", theme:"dark", position:"bottom-right"});
}
getCart()
}
  useEffect(() => {
    getProducts();
  }, []);
  if (isLoading) {
    return (
      <div className="main-layout mb-8 flex justify-center items-center h-screen">
        <BounceLoader color="#0aad0a" />
      </div>
    );
  }
  return (
    <div className="main-layout mb-8">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} addProductToCart={addProductToCart} />
      ))}
    </div>
  );
}
