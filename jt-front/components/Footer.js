'use client'

import Logo from "@/app/Logo"
import { Divider } from "@nextui-org/react"
import {Link} from "@nextui-org/react";
import { ImFacebook2 ,ImWhatsapp } from "react-icons/im";





export default function Footer() {

    const link = [
        'https://www.facebook.com/Nassurprsdnt94/photos/a.109807598012356/178694964456952/',
        'https://wa.me/2694371400'
    ]
    return ( 
        <footer className=" flex flex-col ">
            <Divider className="my-2"/>
            <div className='container place-self-center flex flex-col items-center w-full' >
                <Logo/>
                <p className="font-semibold">Mandza Mboude, Ngazidja</p>
                <p className="font-semibold">jaimetout2020@gmail.com</p>
                <div className="flex gap-3 my-2">
                    <Link href={link[0]} isExternal><ImFacebook2 size={20} className="text-primary-700" /></Link>
                    <Link href={link[1]} isExternal><ImWhatsapp size={20} className="text-primary-700" /></Link>
                </div>
            </div>
        </footer>
    )
}