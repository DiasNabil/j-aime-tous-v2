
export async function GET() {

    
    const res = await fetch('http://localhost:1337/api/content-type-builder/content-types/api::invoice.invoice', { cache: 'no-store' })

    const data = await res.json()
    return Response.json(data.data.schema.attributes)
}