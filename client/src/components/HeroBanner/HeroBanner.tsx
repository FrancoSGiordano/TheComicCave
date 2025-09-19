import './HeroBanner.css'
import banner from '../../../public/banner.jpg'
import { useNavigate } from 'react-router-dom';


export default function HeroBanner() {

    const navigate = useNavigate()

    return (
      <section className="hero">
        <div className='image-container'>
          <img className="hero__img" src={banner} alt="" />
        </div>


        <div className="hero__inner">


          <div className="hero__cards">
            <article className="hero__card hero__card--1">
              <span className="card-tag">Explorar</span>
              <div className='card-head'>
                <h3 className="card-title">Explorá el universo Marvel</h3>
                <p className="card-sub">Personajes, sinopsis y autores</p>

              </div>

              <p className="card-desc">
                Desde ComicCave podés ver información completa de todos los cómics
                de Marvel: sinopsis, autores y portadas.
              </p>
              <a className="card-button" onClick={() => navigate('/comics')}>Explorar</a>
            </article>

            <article className="hero__card hero__card--2" >
              <span className="card-tag">Favoritos</span>
              <div className='card-head'>
                <h3 className="card-title">Guardá tus cómics favoritos</h3>
                <p className="card-sub">Volvé a ellos con un click</p>
              </div>
                <p className="card-desc">
                  No pierdas de vista tus cómics preferidos: tocá el corazón y
                  accedé rápido a tu lista cuando quieras.
                </p>

              <a className="card-button" onClick={() => navigate('/comics/favorites')}>Ver favoritos</a>
            </article>

            <article className="hero__card hero__card--3" >
              <span className="card-tag">Compartir</span>
              <div className='card-head'>
                <h3 className="card-title">Compartí tus descubrimientos</h3>
                <p className="card-sub">Comparti a tus amigos</p>

              </div>
              <div>            
                <p className="card-desc">
                Podés enviar a tus amigos o a la comunidad tus hallazgos desde tu email.
                </p>
              </div>

            </article>
          </div>
        </div>
      </section>
    );
}
