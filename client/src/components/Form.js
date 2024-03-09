import React from 'react'

function Form({handleSubmit, inputValue, handleChange}) {
  return (
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
  )
}

export default Form