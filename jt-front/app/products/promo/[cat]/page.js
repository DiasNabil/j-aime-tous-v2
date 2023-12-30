'use client'

import ProductCard from "@/components/product/productCard"
import { getProducts } from "@/utils/query"
import { Skeleton } from "@nextui-org/react"
import { useContext, useEffect, useRef, useState } from "react"
import { ProductsContext } from "@/app/products/template"
import { useParams } from "next/navigation"


export default function PromoCat(){
    const [products, setProducts] = useState(null)
    const [limit, setLimit] = useState(16)
    const [total, setTotal] = useState(0)
    const prodRef = useRef()
    const {sort, input} = useContext(ProductsContext)
    const param = useParams().cat

    useEffect(()=>{

        if(products){
            
            const array = [...products].filter(prod => {
                return prod.attributes.name.toLowerCase().includes(input.toLowerCase())
            })
    
            setTotal(array.length)
            setProducts(array)
        }
    }, [input])



    useEffect(()=>{
        async function fetch(){

                    const{products: prod, total} = await getProducts(limit, sort, param, true)
                    setTotal(total)
                    setProducts(prod)
        }

        if(input) {return }

        fetch()

      }, [limit,sort, input])

      useEffect(()=>{
        const observer = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting) {

                if(limit < total){setLimit(prev => prev + 8)}
                else if(limit > total){setLimit(total)}
                else if(limit === total) return 
            }
        })

        if(products) {
            if(products.length === 0) {return} 
            else observer.observe(prodRef.current)
        }

      }, [products])





    return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 px-unit-xl p-3 overflow-y-auto max-h-[80vh]">
                {
                    products ? products.length === 0 ? <span className="m-4">Aucun produit disponible</span> : products.map((prod , index) => <ProductCard key={prod.id} ref={Number(index) == (products.length - 1) ? prodRef : undefined} product={prod}/>)  :
                    <>
                        <Skeleton className="w-full h-80 rounded-small"/>
                        <Skeleton className="w-full h-80 rounded-small"/>
                        <Skeleton className="w-full h-80 rounded-small"/>
                        <Skeleton className="w-full h-80 rounded-small"/>
                    </>
                }

            </div>
    )
}