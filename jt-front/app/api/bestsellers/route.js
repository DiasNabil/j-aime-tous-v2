const strapiUrl = process.env.STRAPI_URL

export async function GET() {

    const res = await fetch(`${strapiUrl}/api/products?populate=*&sort=sell:desc&pagination[pageSize]=4`, { cache: 'no-store' })

    const data = await res.json()
    
    return Response.json(data.data)
}