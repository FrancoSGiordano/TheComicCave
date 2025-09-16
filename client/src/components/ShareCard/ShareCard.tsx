import './ShareCard.css'
import { useEffect, useState } from "react"
import absoluteBatman from "../../../public/AbsoluteBatman.jpg"
import type { ComicDetails } from '../../types';

interface ShareCardProps{
    onClose?: () => void;
    isOpen: boolean
    comicSharing: ComicDetails
}

export default function ShareCard( {onClose, isOpen, comicSharing}: ShareCardProps) {
    const [emisor, setEmisor] = useState("");
    const [touchedEmisor, setTouchedEmisor] = useState(false);
    const [emisorError, setEmisorError] = useState("");

    const [destino, setDestino] = useState("");
    const [touchedDestino, setTouchedDestino] = useState(false);
    const [destinoError, setDestinoError] = useState("");
    
    const handleReset = () => {
    setEmisor("");
    setTouchedEmisor(false);
    setEmisorError("");

    setDestino(""); 
    setTouchedDestino(false); 
    setDestinoError("");
    };

  const handleCancel = () => {
 
      if (onClose) onClose();

  };

  return (
    <>
        <section className={`share-card ${isOpen ? 'open' : ''}`}>
            <div className='shareTitle'>
                <h2>Compartir</h2>
            </div>

            <div className='shareComic'>
                <div className='comicImage'>
                    <img src={comicSharing.imageUrl} alt="" />
                </div>
                <h3>{comicSharing.title}</h3>
            </div>
            <form action="">
                <div className='field'>
                    <div className='input-title'>
                        <label htmlFor="email">Tu email:</label>
                    </div>
                    <input
                        id='emisor'
                        name='email'
                        type="email"
                        placeholder='tuemail@mail.com'
                    />
                </div>
                <div className='field'>
                    <div className='input-title'>
                        <label htmlFor="email">Email destino:</label>
                    </div>
                    <input
                        id='destino'
                        name='email'
                        type="email"
                        placeholder='emaildestino@mail.com'
                    />
                </div>

                <div className='field'>
                    <div className='input-title'>
                        <label htmlFor="email">Comentario:</label>
                    </div>                    
                    <textarea name="comentario" id="comentario" rows={4} placeholder='Opcional: Ingrese un comentario'></textarea> 
                </div>
                <div className='buttons'>
                    <button type='submit' >Enviar</button>
                    <button type='button' className='cancel' onClick={handleCancel}>Cancelar</button>
                    <button type='button' className='reset' onClick={handleReset}>Restablecer</button>    
    
                </div>

            </form>


        </section>
    </>
   
  )
}
