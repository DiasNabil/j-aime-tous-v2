import { Image } from "@nextui-org/react";


export default function Hero(){

    return (
        <div className="flex flex-col md:flex-row align-middle w-full mb-10 ">
            <div className="md:w-[50%]">
                <Image width={450} src="/first.svg"/>
            </div>
            <div className="flex flex-col md:w-[50%] gap-4 justify-center">
                <h1 className="font-bold text-4xl"> Faites vos courses sans quitter le confort de votre foyer. </h1>
                <span className="text-small">Votre supermarché à portée de clic, parcourez nos rayons virtuels et remplissez votre panier en toute simplicité.</span>
            </div>
        
        </div>
    )
}