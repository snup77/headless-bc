import Image from "next/image"
import Link from "next/link"

function ProductCard() {
  return (
    <div
      className="
    w-100
    md:w-1/2
    lg:w-1/4
    p1 sm:p-2
  "
    >
      <Link href={`/`}>
        <a aria-label="Mod Leather Sofa">
          <div className="h-72 flex justify-center items-center bg-gray-100 hover:bg-gray-200">
            <div className="flex flex-column justify-center items-center">
              <Image
                alt="couch6"
                src="/couch6.png"
                className="object-scale-down"
                width={190}
                height={190}
              />
            </div>
          </div>
        </a>
      </Link>
      <div>
        <p className="m-4 text-center text-l font-semibold mb-1">
          Mod Leather Sofa
        </p>
        <p className="text-center text-gray-700 mb-4">$800</p>
      </div>
    </div>
  )
}

export default ProductCard
