import Image from "next/image"

function ProductDetails() {
  const description =
    "Easy to love. The Sven in birch ivory looks cozy and refined, like a sweater that a fancy lady wears on a coastal vacation. This ivory loveseat has a tufted bench seat, loose back pillows and bolsters, solid walnut legs, and is ready to make your apartment the adult oasis you dream of. Nestle it with plants, an ottoman, an accent chair, or 8 dogs. Your call."

  return (
    <div
      className="
        sm:py-12
        md:flex-row
        py-4 w-full flex flex-1 flex-col my-0 mx-auto
        max-w-7xl
      "
    >
      <div className="w-full md:w-1/2 h-120 flex flex-1 bg-gray-100">
        <div className="py-16 p10 flex flex-1 justify-center items-center w-full h-full relative">
          <Image
            src="/couch6.png"
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
          Mod Leather Sofa
        </h1>
        <h2 className="text-2xl tracking-wide sm:py-8 py-6">$800</h2>
        <p className="text-gray-600 leading-7">{description}</p>
        <div className="my-6"></div>
        <button
          className="text-sm font-bold tracking-wider bg-transparent hover:bg-black text-black font-semibold hover:text-white py-4 px-12 border-2 border-black hover:border-transparent w-full"
          onClick={() => console.log("Added to Cart")}
        >
          <div>Add to Cart</div>
        </button>
      </div>
    </div>
  )
}

export default ProductDetails
