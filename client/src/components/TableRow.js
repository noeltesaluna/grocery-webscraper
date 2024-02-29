import React from 'react'

function TableRow({props}) {
  const { name, price, price_off, supermarket, offer_text, code } = props
  const url =  'Coles' ? 'https://www.coles.com.au/product/' + code : 'Minor';
  let original_price = parseFloat(price) + parseFloat(price_off)
  return (
    <>
      <tr className={
        (price_off === 0 && offer_text === '' ) ?
        "border-b dark:border-neutral-500" :
          (offer_text === '') ?
          "border-b border-emerald-200 bg-emerald-100 text-neutral-800" : 
          "border-b border-yellow-200 bg-yellow-100 text-neutral-800"
      }>
        <td className="px-6 py-4 font-medium">{name}</td>
        <td className="px-6 py-4">{supermarket}</td>
        <td className="px-6 py-4">${price.toFixed(2)}</td>
        <td className="px-6 py-4">${original_price.toFixed(2)}</td>
        <td className="px-6 py-4">
        {(price_off === 0 && offer_text === '' ) ? (
          <>No special offer</>
        ) : (
          (offer_text === '') ? (
            <>Save ${price_off.toFixed(2)} (<span className='text-emerald-500	'>-{(100 * (original_price - price) / original_price).toFixed(2)}%</span>)</>
          ) : (
            <>{offer_text}</>
          )
        )}
        </td>
        <td className="px-6 py-4">
          <a className='text-blue-500 hover:underline' href={url} target="_blank" rel="noreferrer">Link</a>
        </td>
        <td className="px-6 py-4">X</td>
      </tr>
    </>
  )
}

export default TableRow