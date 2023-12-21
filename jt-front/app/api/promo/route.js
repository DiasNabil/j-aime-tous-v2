export async function GET() {

    const res = await fetch('http://localhost:1337/api/promos?populate=*', { cache: 'no-store' })

    const data = await res.json()
    
    return Response.json(data.data)
}