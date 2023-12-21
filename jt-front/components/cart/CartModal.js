
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Divider, Skeleton} from "@nextui-org/react";
import CartProduct from "./CartProduct";
import { Suspense, useContext, useState } from "react";
import { CartContext } from "@/app/providers";
import formatPrice from "@/utils/formatPrice";

export default function CartModal({isOpen, onOpenChange}) {
  const {cart} = useContext(CartContext)
  const [validCart, setValidCart] = useState(false)

  return (
      <Modal 
        classNames={
          {
            footer: 'flex justify-between items-center ',
            body: 'w-full flex justify-center text-center my-4'
          }
        } 
        placement="center"
        isOpen={isOpen} 
        onOpenChange={onOpenChange}  
        scrollBehavior='inside' 
        backdrop={'blur'} 
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                Votre Panier
              </ModalHeader>
              <Divider/>
              <ModalBody>
              {
                cart.items > 0 ? 
                cart.products.map(prod => {
                  return (
                    <Suspense key={prod.id} fallback={<Skeleton/>}>
                      <CartProduct prod={prod} setValidCart={setValidCart}/>
                    </Suspense>
                  )
                }): 
                "Votre panier est vide :("
              }
              </ModalBody>
              <ModalFooter className="flex justify-between w-[100%]">
                <p>
                  <span className="font-semibold">Total: </span> 
                  {cart.total > 0 ? formatPrice(cart.total) : 0 } 
                  <span className="font-semibold"> KMF</span>
                </p>
                <Button color="primary" className="font-semibold" onPress={onClose} isDisabled={validCart}>
                  { cart.items > 0 ?
                    'Valider Panier' : 
                    'Continuer Achat'
                  }
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
  );
}
