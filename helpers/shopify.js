const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN

async function callShopify(query) {
  const fetchUrl = `https://${domain}/api/2022-04/graphql.json`

  const fetchOptions = {
    endpoint: fetchUrl,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  }

  try {
    const data = await fetch(fetchUrl, fetchOptions).then((response) =>
      response.json()
    )
    return data
  } catch (error) {
    throw new Error("Could not fetch products!")
  }
}

export async function getAllProducts() {
  const query = `{
    products(first: 22) {
      edges {
        node {
          id
          title
          handle
          images(first: 10) {
            edges {
              node {
                url
              }
            }
          }
          priceRange {
            maxVariantPrice {
              amount
            }
          }
        }
      }
    }
  }`
  const response = await callShopify(query)

  const allProducts = response.data.products.edges
    ? response.data.products.edges
    : []

  return allProducts
}

export async function getProductSlugs() {
  const query =
    `{
      products(first: 22) {
        edges {
          node {
            handle
          }
        }
      }
    }`

  const response = await callShopify(query);

  const slugs = response.data.products.edges
    ? response.data.products.edges
    : []

  return slugs
}

export async function getProduct(handle) {
  const query =
    `{
      product(handle: "${handle}") {
        title
        description
        images(first: 10) {
          edges {
            node {
              url
            }
          }
        }
        priceRange {
          maxVariantPrice {
            amount
          }
        }
      }
    }`

  const response = await callShopify(query);

  const product = response.data.product
    ? response.data.product
    : []

  return product
}