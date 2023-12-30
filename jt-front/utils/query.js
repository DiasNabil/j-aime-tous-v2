import setPromo from "./setPromo"

const { default: axios } = require("axios")
const domainUrl = process.env.NEXT_PUBLIC_URL

export async function getCategories(){
  
    const data = await axios.get(`${domainUrl}/api/categories`)
  
    return data.data
  }
  
  export async function getPromo(limit){
    const data = await axios.post(`${domainUrl}/api/promo`,  {data: {limit: limit}})
    
    const array = data.data.products
    
  
    const products = array.map(promo => {
      const newPrice = promo.attributes.promo
      const product = promo.attributes.product.data
  
      product.attributes.promo = newPrice
      return product
    })

  
    const total = data.data.total
    return {products, total}
  }
  
  export async function getBestSellers(){
    const data = await axios.get(`${domainUrl}/api/bestsellers`)
    const array = data.data
  
    const products = setPromo(array)
  
    return products
  }

  export async function getProducts(limit, sort, cat = null, promo = false){
    const data = await axios.post(`${domainUrl}/api/products`, {data: {limit: limit, sort: sort, cat: cat, promo: promo}})
    const array = data.data.products
    const products = setPromo(array)
    const total = data.data.total
      
      return {products, total}
  }