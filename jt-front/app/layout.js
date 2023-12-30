
import './globals.css'
import { Providers } from './providers'
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";


export const metadata = {
  title: "J'aime tous marketplace ",
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
    <body>
      <Providers>
        <Nav/>
          {children}
        <Footer/>
      </Providers>  
    </body>
    </html>
  )
}
