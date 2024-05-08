import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Content, Footer } from 'antd/es/layout/layout'
import { FooterComponent } from '@/components/footer/Footer'
import { HeaderComponent } from '@/components/header/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
   title: 'MedFileX',
   description: 'Importe seus arquivos do excel e gerencie em tabelas',
   keywords: ['Next.js', 'React', 'JavaScript', 'TypeScript'],
   applicationName: 'MedFileX',
   openGraph: {
      locale: 'pt_BR',
      type: 'website',
      url: 'https://shs.vercel.app',
      images: [
         {
            url: 'https://raw.githubusercontent.com/alezzott/shs-excel/main/public/assets/og.png',
            width: 800,
            height: 600,
         },
         {
            url: 'https://raw.githubusercontent.com/alezzott/shs-excel/main/public/assets/og.png',
            width: 1800,
            height: 1600,
            alt: 'open-graph alt',
         },
      ],
   },
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
