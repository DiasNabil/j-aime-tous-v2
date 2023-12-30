const strapiUrl = process.env.STRAPI_URL

export async function GET() {

    const res = await fetch(`${strapiUrl}/api/categories?populate=*`, { cache: 'no-store' })

    const data = await res.json()
    
    return Response.json(data.data)
}