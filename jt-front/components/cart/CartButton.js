'use client'

import { CartContext } from "@/app/providers";
import { Badge, Button } from "@nextui-org/react";
import { useContext, useEffect } from "react";
import { CgShoppingCart } from "react-icons/cg";


export default function CartButton({onOpen}){
    const {cart, updateCart} = useContext(CartContext)

    useEffect(()=>{
      updateCart()
    }, [])

    return( 
        <Badge content={cart.items} color="primary" isInvisible={cart.items > 0 ? false : true} showOutline={cart.items > 0 ? true : false}>
        <Button isIconOnly color="primary" size='sm' radius='sm' variant="light" aria-label="cart" onClick={onOpen} >
          <CgShoppingCart size={18}/>
        </Button>
        </Badge> 
    )
}