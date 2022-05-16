import Image from "next/image"
import Link from "next/link"

function ProductCard({ product }) {

  const path = product.node.path
  const name = product.node.name
  const image = product.node.images.edges[0].node.urlOriginal
  const price = product.node.prices.price.value

  return (
    <div
      className="
    w-full
    md:w-1/2
    lg:w-1/3
    p-2
  "
    >
      <Link href={`${path}`}>
        <a aria-label="Mod Leather Sofa">
          <div className="h-72 flex justify-center items-center bg-gray-100 hover:bg-gray-200">
            <div className="flex flex-column justify-center items-center relative w-3/5 h-3/5">
              <Image
                alt="couch6"
                src={image}
                layout='fill'
                objectFit='contain'
              />
            </div>
          </div>
        </a>
      </Link>
      <div>
        <p className="m-4 text-center text-l font-semibold mb-1">
          {name}
        </p>
        <p className="text-center text-gray-700 mb-4">${price}</p>
      </div>
    </div>
  )
}

export default ProductCard
