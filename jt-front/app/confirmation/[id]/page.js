import formatPrice from "@/utils/formatPrice"
import { Card, CardBody, Divider } from "@nextui-org/react"
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
    order = order.data.attributes
    const cart = JSON.parse(order.cart)
    
    return (
        <section>
            <div className="container">
                <div className="flex justify-between mb-4">
                    <h3 className="text-xl font-bold">Commande confirmée</h3>
                    <p className="font-bold"><small className="font-normal text-default-500">Montant: <br/> </small>{formatPrice(cart.total)} KMF</p>
                </div>

                <Card className="p-8">
                    <CardBody>
                        <div className="flex flex-col md:flex-row gap-4 justify-between mb-12">
                            <div className="md:w-[50%]">
                                <h3 className="text-xl font-bold">Vos Informations</h3>
                                <Divider className="mt-4 w-[25%]" />
                                <div className="flex flex-col gap-1 p-2">                                
                                    <p className="font-bold">{order.lastName} {order.firstName}</p>
                                    <p>{order.phone}</p>
                                    <span>{order.mail}</span>
                                </div>
                            </div>

                            <div className="md:w-[50%]">
                                <h3 className="text-xl font-bold">Informations de livraison</h3>
                                <Divider className="mt-4 w-[25%]" />
                                <div className="flex flex-col gap-1 p-2"> 
                                <p className="font-bold">{order.shipping}</p>
                                <>
                                    {
                                        order.shipping === 'retrait magasin'?
                                        <span>Vous receverez une notification lorsque votre commande sera prête a être retirer en magasin.</span>
                                        : <span>{order.address}</span>

                                    }
                                </>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 justify-between">
                        <div className="md:w-[50%]">
                            <h3 className="text-xl font-bold">Informations de paiement</h3>
                            <Divider className="mt-4 w-[25%]" />
                            <div className="flex flex-col gap-1 p-2"> 
                                <p className="font-bold">{order.paymentMethod}</p>
                                <>
                                    {
                                        order.paymentMethod === 'especes' && order.shipping === 'retrait magasin' &&
                                        <span>{'Montant à regler au moment du retrait en magasin.'}</span>
                                    }

                                    {
                                        order.paymentMethod === 'especes' && order.shipping === 'livraison' &&
                                        <span>{'Montant à regler au moment de la livraison.'}</span>
                                    }
                                </>
                            </div>
                        </div>

                        <div className="md:w-[50%]">
                            <h3 className="text-xl font-bold">Etat de la commande</h3>
                            <Divider className="mt-4 w-[25%]" />
                            <div className="flex flex-col gap-1 p-2"> 
                                <p className="font-bold">{order.status}</p>
                                <span>{'Vous receverez une notification lorsque votre commande sera en cours de préparation.'}</span>
                            </div>
                        </div>
                        </div>
                    
                    
                    </CardBody>
                </Card>
            
            </div>
        </section>
        
    )
}