import React from 'react'

function TableRow({props}) {
  const { product_title, product_price, product_save_price, product_special_offer_text, url } = props
  let original_price = parseFloat(product_price) + parseFloat(product_save_price)
  return (
    <>
      <tr className={
        (product_save_price === 0 && product_special_offer_text === '' ) ?
        "border-b dark:border-neutral-500" :
          (product_special_offer_text === '') ?
          "border-b border-emerald-200 bg-emerald-100 text-neutral-800" : 
          "border-b border-yellow-200 bg-yellow-100 text-neutral-800"
      }>
        <td className="px-6 py-4 font-medium">{product_title}</td>
        <td className="px-6 py-4">${product_price}</td>
        <td className="px-6 py-4">${original_price.toFixed(2)}</td>
        <td className="px-6 py-4">
        {(product_save_price === 0 && product_special_offer_text === '' ) ? (
          <>No special offer</>
        ) : (
          (product_special_offer_text === '') ? (
            <>Save ${product_save_price} (<span className='text-emerald-500	'>-{(( 1 - (product_save_price / original_price)) * 100).toFixed(2)}%</span>)</>
          ) : (
            <>{product_special_offer_text}</>
          )
        )}
        </td>
        <td className="px-6 py-4">
          <a className='text-blue-500 hover:underline' href={url} target="_blank">Link</a>
        </td>
      </tr>
    </>
  )
}

export default TableRow