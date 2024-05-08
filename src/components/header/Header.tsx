import Image from 'next/image'
import style from './Header.module.scss'
import bannerHome from '../../assets/banner-home.svg'

export const HeaderComponent = () => {
   return (
      <section className={style['text-header-section']}>
         <section>
            <h1>MedFileX</h1>
            <p>
               Facilite a sua rotina: importe do Excel com apenas alguns
               cliques.{' '}
            </p>
         </section>
         <section>
            <Image
               src={bannerHome}
               alt="banner home section"
               draggable={false}
            />
         </section>
      </section>
   )
}
