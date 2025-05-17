import Image from 'next/image'
import bannerHome from '../../../public/assets/banner-home.svg'

export const HeaderComponent = () => {
   return (
      <header className="mx-auto mb-8 flex w-full max-w-6xl items-center justify-between gap-8 rounded-lg px-8 py-12 max-lg:flex-col md:gap-6 md:px-4 md:py-8 lg:flex-row">
         <section className="flex flex-1 flex-col items-start justify-center gap-4">
            <h1 className="mb-2 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-6xl font-extrabold text-transparent max-md:text-4xl">
               MedFileX
            </h1>
            <p className="text-lg font-medium text-gray-700 max-md:text-base">
               Facilite a sua rotina: importe do Excel com apenas alguns
               cliques.
            </p>
         </section>
         <section className="flex flex-1 items-center justify-center">
            <Image
               src={bannerHome}
               alt="banner home section"
               draggable={false}
               priority={true}
               className="h-auto w-full"
            />
         </section>
      </header>
   )
}
