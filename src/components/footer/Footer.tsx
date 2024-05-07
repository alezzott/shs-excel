import style from './Footer.module.scss'

export const FooterComponent = () => {
   return (
      <section className={style['text-footer-item']}>
         <h1>
            Feito por{' '}
            <a href="https://github.com/alezzott" target="_blank">
               Alezzo
            </a>
         </h1>
      </section>
   )
}
