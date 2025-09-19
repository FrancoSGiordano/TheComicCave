import './Publicid.css'
import { useState } from "react"
import type { ComicDetails } from '../../types';
import panini from '../../../public/LOGO-PANINI.png'

export default function ShareCard() {


  return (
    <>
      <aside className="publi-card">
        <div className="publi-logo">
          <img className="publi-img" src={panini} />
        </div>
        <div className='publi-Title'>
          <h1>¿Querés comprar un cómic?</h1>
        </div>
        <div className='publi-subtitle'>
          <h3>En Panini podes encontrar las ediciones y variantes que buscas</h3>
        </div>
      <div className="publi-button">
        <a
          className="button"
          href="https://tiendapanini.com.ar/"
          target="_blank"
        >
          Visitar Tienda
        </a>
      </div>

        
      </aside>
    </>
  )
}
