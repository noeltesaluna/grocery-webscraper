export async function createProductListing(URL) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: URL })
    };
    const response = await fetch('/create_productlisting', requestOptions)
    const data = await response.json;
    return data
}