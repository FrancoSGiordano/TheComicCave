import './ShareCard.css'
import { useState } from "react"
import type { ComicDetails } from '../../types';

interface ShareCardProps{
  onClose?: () => void;
  isOpen: boolean
  comicSharing: ComicDetails
}

const validateEmail = (email: string) => {
  return /\S+@\S+\.\S+/.test(email);
}

export default function ShareCard( {onClose, isOpen, comicSharing}: ShareCardProps) {
  const [emisor, setEmisor] = useState("");
  const [touchedEmisor, setTouchedEmisor] = useState(false);
  const [emisorError, setEmisorError] = useState("");

  const [destino, setDestino] = useState("");
  const [touchedDestino, setTouchedDestino] = useState(false);
  const [destinoError, setDestinoError] = useState("");
  
  const [message, setMessage] = useState("");

  const handleReset = () => {
    setEmisor("");
    setTouchedEmisor(false);
    setEmisorError("");

    setDestino(""); 
    setTouchedDestino(false); 
    setDestinoError("");

    setMessage("");
  };

  const handleCancel = () => {
    if (onClose) onClose();
  };

  const handleEmisorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emi = e.target.value;
    setEmisor(emi);
    if (touchedEmisor) {
      if (emi.trim() === "") {
        setEmisorError("Campo obligatorio");
      } else {
        setEmisorError(validateEmail(emi) ? "" : "Ingrese un email válido");
      }
    }
  };

  const handleDestinoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dest = e.target.value;
    setDestino(dest);
    if (touchedDestino) {
      if (dest.trim() === "") {
        setDestinoError("Campo obligatorio");
      } else {
        setDestinoError(validateEmail(dest) ? "" : "Ingrese un email válido");
      }
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleEmisorBlur = () => {
    setTouchedEmisor(true);
    if (emisor.trim() === "") setEmisorError("Campo obligatorio");
    else setEmisorError(validateEmail(emisor) ? "" : "Ingrese un email válido");
  };

  const handleDestinoBlur = () => {
    setTouchedDestino(true);
    if (destino.trim() === "") setDestinoError("Campo obligatorio");
    else setDestinoError(validateEmail(destino) ? "" : "Ingrese un email válido");
  };


  const openMail = (url: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };




  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTouchedEmisor(true);
    setTouchedDestino(true);

    //validaciones
    let error = false;
    if (emisor.trim() === "") { setEmisorError("Campo obligatorio"); error = true; }
    else if (!validateEmail(emisor)) { setEmisorError("Ingrese un email válido"); error = true; }
    else setEmisorError("");

    if (destino.trim() === "") { setDestinoError("Campo obligatorio"); error = true; }
    else if (!validateEmail(destino)) { setDestinoError("Ingrese un email válido"); error = true; }
    else setDestinoError("");

    if (error) return;

    const subject = `Te comparto: ${comicSharing.title}`;
    const emailMessage = message.trim() || "Un amigo tuyo te compartió un cómic desde TheComicCave";

    const cuerpo = [
        `${emailMessage}`,
        `Link: ${window.location.href}`,
    ];
    const body = cuerpo.join('\n\n');

    const params: Record<string,string> = {
      subject,
      body
    };
    params.cc = emisor;

    const mailtoUrl = `mailto:${destino}?${new URLSearchParams(params).toString()}`;

    openMail(mailtoUrl);

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

        <form onSubmit={handleSubmit} noValidate>
          <div className='field'>
            <div className='input-title'>
              <label htmlFor="emisor">Tu email:</label>
              {emisorError && <small id="emisor-error" className="error">{emisorError}</small>}
            </div>

            <input
              id='emisor'
              name='emisor'
              type="email"
              placeholder='tuemail@mail.com'
              value={emisor}
              onChange={handleEmisorChange}
              onBlur={handleEmisorBlur}
            />
          </div>

          <div className='field'>
            <div className='input-title'>
              <label htmlFor="destino">Email destino:</label>
              {destinoError && <small id="destino-error" className="error">{destinoError}</small>}
            </div>
            <input
              id='destino'
              name='destino'
              type="email"
              placeholder='emaildestino@mail.com'
              value={destino}
              onChange={handleDestinoChange}
              onBlur={handleDestinoBlur}
            />
          </div>

          <div className='field'>
            <div className='input-title'>
              <label htmlFor="comentario">Comentario:</label>
            </div>                    
            <textarea 
              id="comentario" 
              name="comentario" 
              rows={4} 
              placeholder='Opcional: Ingrese un comentario' 
              value={message}
              onChange={handleMessageChange}
            />
          </div>

          <div className='buttons'>
            <button type='submit'>Enviar</button>
            <button type='button' className='cancel' onClick={handleCancel}>Cancelar</button>
            <button type='button' className='reset' onClick={handleReset}>Restablecer</button>    
          </div>
        </form>
      </section>
    </>
  )
}
