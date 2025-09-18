import './Footer.css'
import FooterMap from './FooterMap'

export default function Footer() {
  return (
    <>
        <footer>
            <div className='footer-grid'>
              <div className='sectiontext'>
                <h4 className="footer-text">Desarrollado por:</h4>
                <p>Giordano Franco - fransantinogiordano@gmail.com</p>
                <p>Lapegna Iván - lapegnaivan@gmail.com</p>
              </div>
              <div className='sectiontext'>
                <h4 className="footer-text">Donde nos ubicamos?</h4>
                <p>Buenos Aires, La plata, Calle 14, Numero 951-957</p>
              </div>
              <FooterMap  heightPx={160} />
            </div>

            <p className="footer-text copy">The Comic Cave © Todos los Derechos Reservados </p>

        </footer>
    </>
   
  )
}
