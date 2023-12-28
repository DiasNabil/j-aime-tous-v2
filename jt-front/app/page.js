//import ProductCard from "@/components/product/productCard"

import setPromo from "@/utils/setPromo";
import { Link, Skeleton } from "@nextui-org/react"
import axios from "axios"
import dynamic from "next/dynamic";

import { TiArrowRight } from "react-icons/ti";

const ProductCard = dynamic(
  ()=>import('@/components/product/productCard'),
  {
    loading: ()=> <Skeleton />
  }
)

async function getCategories(){
  
  const data = await axios.get('http://localhost:3000/api/categories')

  return data.data
}

async function getPromo(){
  const data = await axios.get('http://localhost:3000/api/promo')

  const array = data.data

  const products = array.map(promo => {
    const newPrice = promo.attributes.promo
    const product = promo.attributes.product.data

    product.attributes.promo = newPrice
    return product
  })

  
  return products
}

async function getBestSellers(){
  const data = await axios.get('http://localhost:3000/api/bestsellers')
  const array = data.data

  const products = setPromo(array)

  return products
}


export default async function Home() {

const categoriesData = getCategories()
const promoData = getPromo()
const bestSellersData = getBestSellers()
const [categories, promo, bestSellers] = await Promise.all([categoriesData, promoData, bestSellersData])

console.log(categories)
  return (
    <section>
      <div className="container">
        <h2 className="mb-unit-xl">Categories</h2>
      </div>
      <div className="container">
        <div className="flex justify-between mb-unit-xl">
          <h2>Promotions</h2>
          <Link href="#" showAnchorIcon anchorIcon={<TiArrowRight className="align-middle" size={24} />} >
            <p >Toutes les promos</p>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 px-unit-xl">
          {
            promo.map(prod => {
              if(promo.indexOf(prod)<=3){
                return <ProductCard key={prod.id} product={prod}/>
              }
            })
          }
        </div>
      </div>
      <div className="container">
        <h2 className="mb-unit-xl">Meilleures ventes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 px-unit-xl">
          {
            bestSellers.map(prod => {
              if(bestSellers.indexOf(prod)<=3){
                return <ProductCard key={prod.id} product={prod}/>
              }
            })
          }
        </div>
      </div>
    </section>
  )
}
