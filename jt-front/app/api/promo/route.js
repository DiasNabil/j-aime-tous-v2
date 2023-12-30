const strapiUrl = process.env.STRAPI_URL

export async function POST(request) {
    const data = await request.json()
    const limit = data.data.limit


    const res = await fetch(`${strapiUrl}/api/promos?populate=*&pagination[start]=0&pagination[limit]=${limit}`, { cache: 'no-store' })
    const products = await res.json()
    const total = products.meta.pagination.total
    
    return Response.json({products: products.data, total: total})

}