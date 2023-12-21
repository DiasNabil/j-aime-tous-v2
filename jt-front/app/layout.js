
import './globals.css'
import { Providers } from './providers'


export const metadata = {
  title: "J'aime tous marketplace ",
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
    <body>
      <Providers>
      {children}
      </Providers>  
    </body>
    </html>
  )
}
