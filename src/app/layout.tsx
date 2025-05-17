import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { FooterComponent } from '@/components/footer/Footer'
import { HeaderComponent } from '@/components/header/Header'

import '@/app/globals.css'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
   title: 'MedFileX',
   description: 'Importe seus arquivos do excel e gerencie em tabelas',
   keywords: ['Next.js', 'React', 'JavaScript', 'TypeScript', 'tailwindcss'],
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
}: Readonly<{ children: React.ReactNode }>) {
   return (
      <html lang="en">
         <body className={`${inter.className} bg-gray-100`}>
            <link rel="icon" href="./favicon.png" sizes="any" />
            <HeaderComponent />
            <main className="@container px-4 py-4 sm:px-6 lg:px-8">
               {children}
            </main>
            <FooterComponent />
            <Toaster
               richColors
               expand={true}
               duration={5000}
               position="top-center"
            />
         </body>
      </html>
   )
}
