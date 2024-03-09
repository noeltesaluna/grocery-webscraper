export async function createProductListing(URL) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: URL })
    };
    const response = await fetch('/product_listings', requestOptions)
    const data = await response.json();
    return data
}

export async function getProductListings() {
    const response = await fetch('/product_listings')
    const data = await response.json();
    return data
}

export async function updateProductListings() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch('/update_productlistings', requestOptions)
    const data = await response.json();
    return data
}