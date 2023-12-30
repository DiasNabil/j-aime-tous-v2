const strapiUrl = process.env.STRAPI_URL

export async function GET() {

    
    const res = await fetch(`${strapiUrl}/api/content-type-builder/content-types/api::invoice.invoice`, { cache: 'no-store' })

    const data = await res.json()
    return Response.json(data.data.schema.attributes)
}