
const strapiUrl = process.env.STRAPI_URL

export async function POST(request) {
    const data = await request.json()
    const limit = data.data.limit
    const sort = data.data.sort
    const cat = data.data.cat
    const promo = data.data.promo


    const res = await fetch(`${strapiUrl}/api/products?populate=*&pagination[start]=0&pagination[limit]=${limit}${cat !== null ? `&filters[category][slug][$eq]=${cat}` : ''}${promo !== false ? `&filters[promo][id][$null]` : ''}&sort=price:${sort}`, { cache: 'no-store' })
    const products = await res.json()
    const total = products.meta.pagination.total

    
    return Response.json({products: products.data, total: total})
}