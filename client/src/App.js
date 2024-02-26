import { useState, useEffect } from "react";
import TableRow from "./components/TableRow";
import { getProductListings, createProductListing, updateProductListings } from "./utils/api";

export default function App() {
  const [inputValue, setInputValue] = useState('')
  const [productData, setProductData] = useState([])

  useEffect(() => {
    getUpdatedProductListings()
    console.log(productData)
    // Empty array to ensure only runs when mounted
  }, [])
  
  async function getUpdatedProductListings() {
    await updateProductListings()
    const data = await getProductListings()
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
      { !productData.productlistings ? (
        <p>loading</p>
      ) : (
        <table className="min-w-full text-left text-xs font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Current Price</th>
              <th className="px-6 py-4">Orignal Price</th>
              <th className="px-6 py-4">Special Offer</th>
              <th className="px-6 py-4">Link To Product</th>
            </tr>
          </thead>
          <tbody>
          {productData.productlistings.map((product) =>
            <TableRow props={product}/>
          )}
          </tbody>
        </table>
      )
}
    </div>
  );
}
