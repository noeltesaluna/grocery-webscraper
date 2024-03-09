import React from 'react'
import TableRow from './TableRow'
import { motion } from "framer-motion"


function ProductTable({product_listings, lastUpdated}) {
    console.log(product_listings)
  return (
    <div>
        { !product_listings ? (
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
              <th className="px-2 py-2"></th>
              <th className="px-2 py-2">Product</th>
              <th className="px-2 py-2">Supermarket</th>
              <th className="px-2 py-2">Current Price</th>
              <th className="px-2 py-2">Orignal Price</th>
              <th className="px-2 py-2">Special Offer</th>
              <th className="px-2 py-2">Link To Product</th>
            </tr>
          </thead>
          <tbody>
          {product_listings.map((product) =>
            <TableRow props={product}/>
          )}
          </tbody>
        </table>
        </motion.div>
      )
    }

    </div>
  )
}

export default ProductTable