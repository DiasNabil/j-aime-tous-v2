export async function GET() {

    const res = await fetch('http://localhost:1337/api/products?populate=*&sort=sell:desc&pagination[pageSize]=6', { cache: 'no-store' })

    const data = await res.json()
    
    return Response.json(data.data)
}