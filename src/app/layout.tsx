import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Content, Footer } from 'antd/es/layout/layout'
import { FooterComponent } from '@/components/footer/Footer'
import { HeaderComponent } from '@/components/header/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
   title: 'MedFileX',
   description: 'Importe seus arquivos do excel e gerencie em tabelas',
}

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang="en">
         <body
            className={inter.className}
            style={{ backgroundColor: '#f7f7f7', margin: '0 auto' }}
         >
            <link rel="icon" href="./favicon.png" sizes="any" />
            <HeaderComponent />
            <Content style={{ margin: '50px 30px' }}>{children}</Content>
            <Footer>
               <FooterComponent />
            </Footer>
         </body>
      </html>
   )
}
