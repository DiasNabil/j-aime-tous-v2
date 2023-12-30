'use client'

import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, Card, Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection} from "@nextui-org/react";
import axios from "axios";
import { useParams, usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdOutlineFilterList } from "react-icons/md";
import { MdOutlineDone } from "react-icons/md";
import { MdFilterListOff } from "react-icons/md";
import { RiSortDesc } from "react-icons/ri";

export const ProductsContext = createContext([
    {},
    ()=>{}
  ])

  const domainUrl = process.env.NEXT_PUBLIC_URL

export default function Template({children}){
    const [cat, setCat] = useState(null)
    const [sort, setSort] = useState('asc')
    const [input, setInput] = useState(null)
    const param = useParams().cat
    const path = usePathname()


    useEffect(()=>{
        async function getCat(){
            const data = await axios.get(`${domainUrl}/api/categories`)
            setCat(data.data)
        }

        getCat()

    }, [])



    return (
        <section>
            <Card className="container">

                <Navbar isBordered>
                <NavbarContent justify="start">
                    <Dropdown shouldBlockScroll={false} >
                        <DropdownTrigger>
                                <Button isIconOnly color="primary" variant="light" size="sm"><MdOutlineFilterList size={16}/></Button>
                        </DropdownTrigger>
                        <DropdownMenu 
                            aria-label="Dynamic Actions" 
                            variant="shadow" 
                            color="primary"
                        >
                        <DropdownSection showDivider>
                            <DropdownItem startContent={<MdFilterListOff size={16}/>} href="/products">Réinitialiser les filtres</DropdownItem>
                            <DropdownItem href={param ? `/products/promo/${param}` : `/products/promo`} endContent={path.includes('promo')&& <MdOutlineDone />}>Promotions</DropdownItem>
                        </DropdownSection>


                        <DropdownSection title='filtrer par categories' items={cat}>
                        
                            {(item)=>(
                                <DropdownItem 
                                    key={item.attributes.slug}   
                                    endContent={param === item.attributes.slug && <MdOutlineDone />}
                                    href={path.includes('promo')? `/products/promo/${item.attributes.slug}`: `/products/${item.attributes.slug}`}
                                >
                                    {item.attributes.name}
                                </DropdownItem>
                            )}
                        
                        </DropdownSection>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            
                <NavbarContent as="div" className="items-center " justify="end">
                    <Input
                    classNames={{
                    base: "max-w-full sm:max-w-[10rem] h-10 ",
                    mainWrapper: "h-full",
                    input: "text-small",
                    inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                    }}
                    placeholder="Je recherche..."
                    size="sm"
                    startContent={<CiSearch size={18}/>}
                    type="search"
                    onValueChange={setInput}
                    />  

                    <Dropdown shouldBlockScroll={false} >
                    <DropdownTrigger>
                            <Button isIconOnly color="primary" variant="light" size="sm"><RiSortDesc size={16}/></Button>
                    </DropdownTrigger>
                    <DropdownMenu 
                        aria-label="Dynamic Actions" 
                        variant="shadow" 
                        color="primary"
                        onAction={(key)=> setSort(key)}
                    >
                        <DropdownSection title='Trier' >
                            <DropdownItem key="asc" endContent={sort === 'asc' && <MdOutlineDone />} >Prix croissants</DropdownItem>
                            <DropdownItem key="desc" endContent={sort === 'desc' && <MdOutlineDone />}>Prix décroissants</DropdownItem>
                        </DropdownSection>
                    </DropdownMenu>
                </Dropdown>
                
                </NavbarContent>
                </Navbar>


                <ProductsContext.Provider value={{sort, cat, input}}>
                {children}
                </ProductsContext.Provider>

            </Card>
        </section>
    )
}