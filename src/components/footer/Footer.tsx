import style from './Footer.module.scss'

export const FooterComponent = () => {
   return (
      <footer className={style['text-footer-item']}>
         <p>
            Feito por{' '}
            <a
               href="https://github.com/alezzott"
               target="_blank"
               rel="noopener noreferrer"
            >
               Alezzo
            </a>
         </p>
      </footer>
   )
}
