'use client'

import {NextUIProvider} from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { createContext, useEffect, useState } from 'react'

export const CartContext = createContext([
  {},
  ()=>{}
])


export function Providers({children}) {
    const router = useRouter()
    const [updated, setUpdate] = useState('')
    const [cart, setCart] = useState({
      products: [],
      items: 0,
      total: 0,
    })

    function updateCart(){
      let items = 0
      let total = 0

      cart.products.forEach(prod => {
        items += prod.quantity
        total += (prod.quantity * prod.unitPrice)
      })

      setCart({...cart, items: items, total: total})
    }

    function addToCart(product){

      let isItemInCart = cart.products.find(prod => prod.id === product.id)

      if(isItemInCart){
        setCart({
          ...cart,
          products:cart.products.map(prod=>{
            return prod.id === product.id ? product : prod
          }),
        })
      }else{
        setCart({
          ...cart,
          products: [...cart.products, product]
        })
      }

      setUpdate(true)
    }

    function removeFromCart(product){
      console.log('remove', product)
      const productToRemove = cart.products.find(prod => prod.id === product.id)

      if(productToRemove){
        setCart({
          ...cart,
          products: cart.products.filter(prod => prod.id !== product.id)
        })
      }

      setUpdate(true)

    }

    useEffect(()=>{
      if(typeof window !== 'undefined'){
        let cartData = localStorage.getItem('cart')
        cartData = null !== cartData ? JSON.parse(cartData) : cart
        setCart(cartData)
      }
    }, [])

    useEffect(()=>{
      
      if(updated === true){
        updateCart()
        setUpdate(false)
      }
      if(updated === false){
        localStorage.setItem('cart', JSON.stringify(cart))
      }
    
    }, [updated])

  return (
    <NextUIProvider navigate={router.push}>
    <CartContext.Provider value={{cart, setCart, addToCart, removeFromCart}}>
      {children}
    </CartContext.Provider>
    </NextUIProvider>
  )
}