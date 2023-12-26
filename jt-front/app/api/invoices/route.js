import axios from "axios"

export async function POST(request) {

    const req = await request.json(request.body.data)
    const {lastName, firstName, mail, phone, address, cart, paymentMethod, shipping, status} = req.data
    
    const res = await axios.post('http://localhost:1337/api/invoices',{data: {
        lastName: lastName,
        firstName: firstName,
        mail: mail,
        phone: phone,
        address: address,
        cart: JSON.stringify(cart),
        paymentMethod: paymentMethod,
        shipping: shipping, 
        type: 'commande',
        status: status,
        
    }})


    

    return Response.json(res.data)
}