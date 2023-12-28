'use client'
import Logo from "@/app/Logo";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, Button, Badge, useDisclosure} from "@nextui-org/react";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import CartModal from "./cart/CartModal";
import CartButton from "./cart/CartButton";


export default function Nav() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    {name: 'Accueil', href: '/'}, 
    {name: 'Produits', href: '/products'}, 
    {name:'Offres Speciales', href: '/promo'},
    {name:'Contactez-nous', href: 'https://wa.me/2693471400'}
  ];

    return (
      <>
        <Navbar isBordered shouldHideOnScroll onMenuOpenChange={setIsMenuOpen}>
          <NavbarContent justify="start">
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="sm:hidden"
            />
            <NavbarBrand className="mr-4">
              <Link href="/">
                <Logo/>
              </Link>
            </NavbarBrand>
          </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-6" justify="center">
          <NavbarItem>
            <Link color="foreground" isBlock className="font-semibold" href="/">
              Accueil
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="/products" aria-current="page" isBlock className="font-semibold" color="PRIMARY">
              Produits
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" isBlock className="font-semibold" href="/promo">
              Offres Speciales
            </Link>
          </NavbarItem>
        </NavbarContent>
    
        <NavbarContent as="div" className="items-center " justify="end">
            <Input
              classNames={{
                base: "max-w-full sm:max-w-[10rem] h-8 hidden sm:flex",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Je recherche..."
              size="sm"
              startContent={<CiSearch size={18}/>}
              type="search"
            />
            <CartButton onOpen={onOpen} />
        </NavbarContent>

        <NavbarMenu>
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
        />
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`} className="py-2">
            <Link
              className="w-full font-semibold"
              color={item.name == 'Produits'? "primary" : "foreground"}
              size="lg"
              isBlock 
              href={item.href}
              isExternal= {item.name === 'Contactez-nous'}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>


        </Navbar>
        <CartModal isOpen={isOpen} onOpenChange={onOpenChange}/>
      </>
    )
}