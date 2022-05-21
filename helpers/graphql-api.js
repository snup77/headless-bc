const domain = process.env.NEXT_PUBLIC_BIGCOMMERCE_STORE_DOMAIN
const authToken = process.env.NEXT_PUBLIC_BIGCOMMERCE_AUTH_BEARER_TOKEN

export async function callGraphAPI(query, variables = {}) {
  const fetchUrl = `https://${domain}/graphql`

  const fetchOptions = {
    endpoint: fetchUrl,
    method: "POST",
    headers: {
      "Authorization": "Bearer " + authToken,
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

const gql = String.raw

export const AllProducts = gql`
  query Products {
    site {
      products(first: 23) {
        edges {
          node {
            entityId
            name
            path
            description
            prices {
              price {
                value
              }
            }
            images {
              edges {
                node {
                  urlOriginal
                }
              }
            }
          }
        }
      }
    }
  }
`

export const Slugs = gql`
  query Products {
    site {
      products(first: 23) {
        edges {
          node {
            path
          }
        }
      }
    }
  }
`

export const singleProduct = gql`
query LookUpUrl( $path: String!) {
  site {
    route(path: $path) {
      node {
        ... on Product {
          id
          entityId
          name
          description
          prices {
            price {
              value
            }
          }
          images {
            edges {
              node {
                urlOriginal
              }
            }
          }
        }
      }
    }
  }
} 
`
