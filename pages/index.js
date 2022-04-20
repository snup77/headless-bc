import { Fragment } from "react"
import ProductCard from "../components/ProductCard"

import { getAllProducts } from "../helpers/shopify"

export default function Home({ products }) {

  return (
    <Fragment>
      <div className="text-center">
        <h1 className="font-bold leading-relaxed text-palette-primary text-5xl mt-4 py-2 sm:py-4">
          Your Home, Reimagined
        </h1>
        <p className="max-w-xl text-center px-2 mx-auto text-base text-lg text-gray-600">
          Reimagine your living room with our sofas and chairs.
        </p>
      </div>
      <div className="max-w-7xl flex flex-1 flex-wrap flex-row mx-auto px-6 pt-10">
      {
          products.map((product) => (
            <ProductCard key={product.node.id} product={product} />
        ))
      }
      </div>
    </Fragment>
  )
}

export async function getStaticProps() {
  const products = await getAllProducts()

  return {
    props: {
      products
    },
  }
}
