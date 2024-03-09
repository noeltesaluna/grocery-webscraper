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
        <td className="px-2 py-1">X</td>
        <td className="px-2 py-1 font-medium">{name}</td>
        <td className="px-2 py-1">{supermarket}</td>
        <td className="px-2 py-1">${price.toFixed(2)}</td>
        <td className="px-2 py-1">${original_price.toFixed(2)}</td>
        <td className="px-2 py-1">
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
        <td className="px-2 py-1">
          <a className='text-blue-500 hover:underline' href={url} target="_blank" rel="noreferrer">Link</a>
        </td>
      </tr>
    </>
  )
}

export default TableRow