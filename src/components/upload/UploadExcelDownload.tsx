import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import Link from 'next/link'

export function UploadExcelDownload() {
   return (
      <>
         <p className="mt-8 text-center text-gray-700 dark:text-gray-200">
            Caso tenha problemas ao importar o arquivo, por favor, baixe o
            <span className="ml-1 font-semibold text-green-600 dark:text-green-400">
               Arquivo modelo
            </span>
         </p>
         <nav
            className="mt-5 flex justify-center"
            aria-label="Download do arquivo modelo"
         >
            <Button
               asChild
               size="default"
               className="text-md bg-green-500 text-white hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:outline-none dark:bg-green-600 dark:hover:bg-green-700"
               aria-label="Baixar arquivo modelo Excel"
            >
               <Link
                  download="arquivo-modelo.xlsx"
                  href="/assets/excel/arquivo-modelo.xls"
               >
                  <Download className="mr-2 w-8" aria-hidden="true" />
                  Baixe o arquivo
               </Link>
            </Button>
         </nav>
      </>
   )
}
