import formatPrice from "./formatPrice"

export default function setPromo(products){

    const array = products.map(prod => {
        const price = prod.attributes.price
        const promoData = prod.attributes.promo.data
        if(promoData !== null){
          prod.attributes.promo = promoData.attributes.promo
        }else{
          prod.attributes.promo = null
        }
    
        prod.attributes.price = price
        
        return prod
      })
    
      return array

}