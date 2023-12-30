'use client'

import { CartContext } from "@/app/providers";
import { Button, Card, Input, Select, SelectItem} from "@nextui-org/react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const domainUrl = process.env.NEXT_PUBLIC_DOMAIN

export default function CheckoutFom(){
    const stripe = useStripe();
    const elements = useElements();
    const[invoiceInput, setInvoiceInput] = useState(null)
    const {cart, setCart, updateCart, resetCart} = useContext(CartContext)
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
      firstName: '',
      lastName: '',
      address: '',
      mail: '',
      phone: '',
      paymentMethod: '',
      shipping: '',
    })
    const [shippingCost, setShippingCost] = useState(2500)
    const router = useRouter()

    useEffect(()=>{console.log(isLoading)}, [isLoading])

    useEffect(()=>{
      async function getInput(){
        const data = await axios.get(`${domainUrl}/api/invoiceInput`)
        setInvoiceInput(data.data)
      }


      getInput()
    }, [])

    useEffect(()=>{
      updateCart()
      
      if(data.shipping === 'livraison'){
        setCart(prev => {
          return {
            ...prev, 
            total: prev.total + shippingCost
          }
        })
      }
    }, [data.shipping])

    async function handleSubmit(e){
        e.preventDefault()
        setIsLoading(true);

        if(data.paymentMethod === 'carte bancaire'){
          if (!stripe || !elements) {
              // Stripe.js hasn't yet loaded.
              // Make sure to disable form submission until Stripe.js has loaded.
              setMessage("Une erreur est survenue.");
              return;
            }
            
            const payment = await stripe.confirmPayment({
              elements,
              redirect: 'if_required',
            });
          
            if(payment.paymentIntent?.status === 'succeeded'){
              
              axios.post(`${domainUrl}/api/invoices`, {data: {...data, cart: cart, status: 'payée' }})
              .then(res=> {
                  resetCart()
                  router.push(`/confirmation/${res.data.data.id}`)
              })
            }
            // This point will only be reached if there is an immediate error when
            // confirming the payment. Otherwise, your customer will be redirected to
            // your `return_url`. For some payment methods like iDEAL, your customer will
            // be redirected to an intermediate site first to authorize the payment, then
            // redirected to the `return_url`.
            if(payment.error){
              console.log(payment)
              if (payment.error.type === "card_error" || payment.error.type === "validation_error") {
                setMessage('Votre paiement à echoué, veuillez réessayer.');
              } else {
                setMessage("Une erreur est survenue.");
              }
            }
        
        }else {
          const res = await axios.post(`${domainUrl}/api/invoices`, {data: {...data, cart: cart, status: 'confirmée' }})
          if(res.status === 200){

            resetCart()
            router.push(`/confirmation/${res.data.data.id}`)
            
          }else{
            setMessage("Une erreur est survenue.");
          }

          
        }

    }

    const paymentElementOptions = {
        layout: "tabs",
    };

    function handleChange(e){
      const value = e.target.value
      const name = e.target.name


      setData(prev => {return {...prev,[name]: value}})
    }




    return (
        <form onSubmit={handleSubmit} className=" md:w-[50%] flex flex-col gap-4">
          <div className="flex gap-4">
            <Input type="text" className="w-[50%]" name="lastName" value={data.lastName} variant="underlined"  label='Votre nom' onChange={handleChange} isRequired={true}/>
            <Input type="text" className="w-[50%]" name="firstName" value={data.firstName} variant="underlined"  label='Votre prenom' onChange={handleChange} isRequired={true}/>
          </div>
            <Input type="mail" name="mail" value={data.mail} variant="underlined" label='Votre mail' onChange={handleChange} isRequired={true}/>
            <Input type="number" name="phone" value={data.phone} variant="underlined" label='Votre numero de téléphone' onChange={handleChange} isRequired={true}/>
            <Input type="text" name="address" value={data.address} variant="underlined" label='Votre addresse' onChange={handleChange} isRequired={true}/>
            <Select name='shipping' variant="underlined" label='Selectionner un moyen de livraison' onChange={handleChange} isRequired={true}>
              {invoiceInput &&
                invoiceInput.shipping.enum.map(ship => {
                return ( 
                  <SelectItem key={ship}  value={ship}>
                  {ship === 'livraison' ? `${ship} ${shippingCost} KMF` : ship}
                  </SelectItem>)
                })
              }
            </Select>
            <Select name='paymentMethod' variant="underlined" label='Selectionner un moyen de paiement' onChange={handleChange} isRequired={true}>
              {invoiceInput &&
                invoiceInput.paymentMethod.enum.map(meth => {
                return <SelectItem key={meth} value={meth}>{meth}</SelectItem>
                })
              }
            </Select>
            {
              data.paymentMethod === 'carte bancaire' && 
              <Card className="mt-4 p-4">
              <PaymentElement id="payment-element" options={paymentElementOptions}/>
              </Card>
            }

            {message && <Card id="payment-message" className="mt-4 bg-danger border-none p-2 text-white">{message}</Card>}
            <Button color="primary" isDisabled={!stripe || !elements} variant="shadow" className="font-bold" isLoading={isLoading} type="submit">
              Valider le paiment
            </Button>

        </form>
    )
}