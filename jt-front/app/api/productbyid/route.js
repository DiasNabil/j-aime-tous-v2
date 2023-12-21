/**    const data = await axios.post('http://localhost:3000/api/productbyid', {
      data: {
        id: 969
      }
    })*/

  export async function POST(request) {

    const body = await request.json()
    const id = body.data.id
    const res = await fetch(`http://localhost:1337/api/products/${id}?populate=*`, { cache: 'no-store' })

    const data = await res.json()

    console.log(data.data)
    
    return Response.json(data.data)
}