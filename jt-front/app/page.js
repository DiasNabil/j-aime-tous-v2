//import ProductCard from "@/components/product/productCard"

import { getBestSellers, getCategories, getPromo } from "@/utils/query";
import { Button, Link, Skeleton } from "@nextui-org/react"
import dynamic from "next/dynamic";

import { TiArrowRight } from "react-icons/ti";

const ProductCard = dynamic(
  ()=>import('@/components/product/productCard'),
  {
    loading: ()=> <Skeleton />
  }
)



export default async function Home() {

const categoriesData = getCategories()
const promoData = getPromo(4)
const bestSellersData = getBestSellers()
const [categories,{products: promo}, bestSellers] = await Promise.all([categoriesData, promoData, bestSellersData])



  return (
    <section>
      <div className="container">
        <h2 className="mb-unit-md">Categories</h2>
        <div className="flex flex-wrap gap-3 p-2">
          {
            categories.map(cat=>{
              cat = cat.attributes
              return <Button key={cat.slug} as={Link} color="primary" href={`/products/${cat.slug}`} variant="flat" className="p-1" size="sm">{cat.name}</Button>
            })
          }
        </div> 
      </div>
      <div className="container">
        <div className="flex justify-between mb-unit-xl">
          <h2>Promotions</h2>
          <Link href="/products/promo" showAnchorIcon anchorIcon={<TiArrowRight className="align-middle" size={24}/>} >
            <p >Toutes les promos</p>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 px-unit-xl">
          {
            promo.map((prod, index) => {
             
                return <ProductCard key={prod.id} product={prod}/>
              
            })
          }
        </div>
      </div>
      <div className="container">
        <h2 className="mb-unit-xl">Meilleures ventes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 px-unit-xl">
          {
            bestSellers.map(prod => {
                return <ProductCard key={prod.id} product={prod}/>
              
            })
          }
        </div>
      </div>
    </section>
  )
}
