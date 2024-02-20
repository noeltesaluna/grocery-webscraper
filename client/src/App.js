import { useState, useEffect } from "react";
import TableRow from "./components/TableRow";

export default function App() {
  const [inputValue, setInputValue] = useState('')
  const [productList, setProductList] = useState([])
  const [productData, setProductData] = useState([])

  useEffect(() => {
    const savedData = localStorage.getItem('productList');
    if (savedData) {
      setProductList(JSON.parse(savedData));
      handleApiCall(JSON.parse(savedData))
    }
    // Empty array to ensure only runs when mounted
  }, [])
  
  const handleSubmit = (event) => {
    event.preventDefault()
    const updatedProductList = [...productList, inputValue];
    setProductList(updatedProductList);
    localStorage.setItem('productList', JSON.stringify(updatedProductList));
    handleApiCall(updatedProductList)
    setInputValue('')
  }

  const handleChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleApiCall = async (itemArray) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: itemArray })
    };
    fetch('/items', requestOptions)
        .then(response => response.json())
        .then(data => setProductData(data));
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
      { !productData.products_details ? (
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
          {productData.products_details.map((product) =>
            <TableRow props={product}/>
          )}
          </tbody>
        </table>
      )
}
    </div>
  );
}
