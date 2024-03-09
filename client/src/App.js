import { useState, useEffect } from "react";
import TableRow from "./components/TableRow";
import { getProductListings, createProductListing, updateProductListings } from "./utils/api";
import { motion } from "framer-motion"

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
      <form className="flex flex-col	items-center" onSubmit={handleSubmit}>
        <label className="m-2 text-sm">Enter Product URL </label>
        <input 
          className="w-full py-2 px-4 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
          type="text" 
          name="name" 
          value={inputValue}
          onChange={handleChange}
        />
        <input 
          className="mt-4 text-sm bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500" 
          type="submit" 
          value="Add Product" 
        />
      </form>
      { !productData.product_listings ? (
        <p className="animate-pulse">loading</p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }} // Initial state (invisible)
          animate={{ opacity: 1 }} // Animate to fully visible
          transition={{ duration: 0.5 }} // Duration of the animation
        >
        <p className="text-left text-xs italic">Last updated: {lastUpdated}</p>
        <table className="min-w-full text-left text-xs font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Supermarket</th>
              <th className="px-6 py-4">Current Price</th>
              <th className="px-6 py-4">Orignal Price</th>
              <th className="px-6 py-4">Special Offer</th>
              <th className="px-6 py-4">Link To Product</th>
            </tr>
          </thead>
          <tbody>
          {productData.product_listings.map((product) =>
            <TableRow props={product}/>
          )}
          </tbody>
        </table>
        </motion.div>
      )
}
    </div>
  );
}
