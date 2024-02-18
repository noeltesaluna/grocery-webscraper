import { useState } from "react";

export default function App() {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Form submitted with value:', inputValue)
  }

  const handleChange = (event) => {
    setInputValue(event.target.value);
  }

  return (
    <div className="m-8 text-center"> 
      <h1 className="text-3xl font-bold">Shop Harvest 🛒</h1>
      <form className="flex flex-col	items-center" onSubmit={handleSubmit}>
        <label className="m-2">Enter Product URL </label>
        <input 
          className="w-full py-2 px-4 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
          type="text" 
          name="name" 
          value={inputValue}
          onChange={handleChange}
        />
        <input 
          className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500" 
          type="submit" 
          value="Add Product" 
        />
      </form>
    </div>
  );
}
