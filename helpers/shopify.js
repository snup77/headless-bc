const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const storefrontAccessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN

export async function callShopify(query, variables = {}) {
  const fetchUrl = `https://${domain}/api/2022-04/graphql.json`

  const fetchOptions = {
    endpoint: fetchUrl,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
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

export const AllProducts = `
  query Products {
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
  }
`

export const Slugs = `
  query ProductSlugs {
    products(first: 22) {
      edges {
        node {
          handle
        }
      }
    }
  }
`

export async function getProduct(handle) {
  const query = `{
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
        variants(first: 1) {
          edges {
            node {
              id
            }
          }
        }
      }
    }`

  const response = await callShopify(query)

  const product = response.data.product ? response.data.product : []

  return product
}

export async function createCheckout(variantId) {
  const query = `mutation {
      checkoutCreate(input: {
        lineItems: [{ variantId: "${variantId}", quantity: 1 }]
      }) {
        checkout {
           id
           webUrl
           lineItems(first: 5) {
             edges {
               node {
                 title
                 quantity
               }
             }
           }
        }
      }
    }`

  const response = await callShopify(query)

  const checkout = response.data.checkoutCreate.checkout
    ? response.data.checkoutCreate.checkout
    : []

  return checkout
}