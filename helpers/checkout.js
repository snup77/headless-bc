const storeHash = process.env.NEXT_PUBLIC_BIGCOMMERCE_STORE_HASH
const xAuthToken = process.env.NEXT_PUBLIC_BIGCOMMERCE_X_AUTH_TOKEN

export async function createCheckout(productId) {
    const fetchUrl = `https://api.bigcommerce.com/stores/${storeHash}/v3/carts?include=redirect_urls`
  
    const fetchOptions = {
      endpoint: fetchUrl,
        method: "POST",
        headers: {
            "X-Auth-Token": xAuthToken,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        "line_items": [
          {
            "quantity": 1,
            "product_id": productId,
          }
        ]
      }),
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