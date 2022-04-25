import { useState } from "react"
import Image from "next/image"
import { callShopify, Slugs, singleProduct, createCheckout } from "../helpers/shopify"

function ProductDetails({ productData }) {
  const [isLoading, setIsLoading] = useState(false)

  const imageNode = productData.images.edges[0].node
  const title = productData.title
  const price = productData.priceRange.maxVariantPrice.amount.replace(/\.0/g, '')
  const description = productData.description
  const productVariant = productData.variants.edges[0].node.id

  
  async function checkout() {
    setIsLoading(true)
    const response = await callShopify(createCheckout, { variantId: productVariant })
    const { webUrl } = response.data.checkoutCreate.checkout
    window.location.href = webUrl

  }
  
  return (
    <div
      className="
        px-4
        sm:py-12
        md:flex-row
        py-4 w-full flex flex-1 flex-col my-0 mx-auto
        max-w-7xl
      "
    >
      <div className="w-full flex flex-1 bg-gray-100">
        <div className="h-96 py-16 p10 flex flex-1 justify-center items-center w-full h-full relative">
          <Image
            src={imageNode.url}
            alt="Inventory item"
            className="object-scale-down max-h-full"
            layout='fill'
            objectFit='contain'
          />
        </div>
      </div>
      <div className="pt-2 px-0 md:px-10 pb-8 w-full md:w-1/2">
        <h1
          className="
           sm:mt-0 mt-2 text-5xl font-light leading-large
          "
        >
          {title}
        </h1>
        <h2 className="text-2xl tracking-wide sm:py-8 py-6">${price}</h2>
        <p className="text-gray-600 leading-7">{description}</p>
        <div className="my-6"></div>
        <button
          className="text-sm font-bold tracking-wider bg-black text-white font-semibold py-4 px-12 border-2 border-black hover:border-transparent w-full"
          onClick={checkout}
        >
          {isLoading && (
            <svg className="inline animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          )}
          <span>Buy</span>
        </button>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const response = await callShopify(Slugs)
  const productSlugs = response.data.products.edges

  const paths = productSlugs.map((slug) => {    
    const product = String(slug.node.handle)
    return {
      params: { product }
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const response = await callShopify(singleProduct, { handle: params.product })
  const productData = response.data.product

  return {
    props: {
      productData,
    },
  }
}

export default ProductDetails
