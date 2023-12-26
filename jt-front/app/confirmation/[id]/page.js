import axios from "axios"


export async function getOrder(id) {

    const data = await axios.post('http://localhost:3000/api/invoiceById', {
        data: {
        id
        }
    })

    return data
}


export default async function confirmationPage({params}){

    const orderData = getOrder(params.id)

    let [order] = await Promise.all([orderData])
    order = order.data

    return (
        <>
            {order.id}
        </>
        
    )
}