const strapiUrl = process.env.STRAPI_URL

  export async function POST(request) {

    const body = await request.json()
    const id = body.data.id
    const res = await fetch(`${strapiUrl}/api/invoices/${id}?populate=*`, { cache: 'no-store' })

    const data = await res.json()
    const order = data.data
    
    return Response.json(data.data)
}