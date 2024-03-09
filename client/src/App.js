import { useState, useEffect } from "react";
import Form from "./components/Form";
import { getProductListings, createProductListing, updateProductListings } from "./utils/api";
import ProductTable from "./components/ProductTable";

export default function App() {
  const [inputValue, setInputValue] = useState('')
  const [productData, setProductData] = useState([])
  const [lastUpdated, setLastUpdated] = useState('')

  useEffect(() => {
    getUpdatedProductListings()
    // Empty array to ensure only runs when mounted
  }, [])
  
  async function getUpdatedProductListings() {
    await updateProductListings()
    const data = await getProductListings()
    var currentDateTime = new Date();
    var date = currentDateTime.toLocaleDateString();
    var time = currentDateTime.toLocaleTimeString();
    setLastUpdated(date + ", " + time)
    setProductData(data);
  }
  
  async function createNewProductListing(URL) {
    await createProductListing(URL)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setProductData([])
    createNewProductListing(inputValue)
    getUpdatedProductListings()
    setInputValue('')
  }

  const handleChange = (event) => {
    setInputValue(event.target.value);
  }


  return (
    <div className="m-8 text-center"> 
      <h1 className="text-3xl font-bold">Shop Harvest 🛒</h1>
      <Form
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        inputValue={inputValue}
      />
      <ProductTable 
        product_listings={productData.product_listings} 
        lastUpdated={lastUpdated} 
      />
    </div>
  );
}
