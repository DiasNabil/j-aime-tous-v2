//const data = await axios.get('http://localhost:3000/api/products')

export async function GET() {

    const res = await fetch('http://localhost:1337/api/products?populate=*', { cache: 'no-store' })

    const data = await res.json()
    
    return Response.json(data)
}