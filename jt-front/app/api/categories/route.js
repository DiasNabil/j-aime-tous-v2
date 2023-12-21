//const data = await axios.get('http://localhost:3000/api/categories')

export async function GET() {

    const res = await fetch('http://localhost:1337/api/categories?populate=*', { cache: 'no-store' })

    const data = await res.json()
    
    return Response.json(data.data)
}