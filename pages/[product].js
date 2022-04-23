import Image from "next/image"
import { getProductSlugs, getProduct, createCheckout } from "../helpers/shopify"

function ProductDetails({ productData }) {
  
  async function checkout() {
    const { webUrl } = await createCheckout(productData.variants.edges[0].node.id)
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
            src={productData.images.edges[0].node.url}
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
          {productData.title}
        </h1>
        <h2 className="text-2xl tracking-wide sm:py-8 py-6">${productData.priceRange.maxVariantPrice.amount.replace(/\.0/g, '')}</h2>
        <p className="text-gray-600 leading-7">{productData.description}</p>
        <div className="my-6"></div>
        <button
          className="text-sm font-bold tracking-wider bg-transparent hover:bg-black text-black font-semibold hover:text-white py-4 px-12 border-2 border-black hover:border-transparent w-full"
          onClick={checkout}
        >
          <div>Buy</div>
        </button>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const productSlugs = await getProductSlugs()

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
  const productData = await getProduct(params.product)  

  return {
    props: {
      productData,
    },
  }
}

export default ProductDetails
