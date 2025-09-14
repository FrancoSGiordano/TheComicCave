import './Details.css'
import AbsoluteBatman from '../../../public/AbsoluteBatman.jpg'


type DetailsProps = {
  comic: string
}

export default function Details({comic} : DetailsProps) {
  return (
    <>
        <section className='detail-master' style={{ backgroundImage: `url(${AbsoluteBatman})` }} >
              <div className="detail-overlay" />

            
            <div className='detail-header'>
                <div className="backSection">
                    <button type="button" className="back buttonheader" >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                        <span className="label">Volver</span>
                    </button>
                </div>




                <div className="shareSection">
                    <button className='share buttonheader'>
                
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth="1.5" 
                    stroke="currentColor" 
                    className="icon">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                    </svg>

                    </button>

                </div>


            </div>
           <div className='detail-content'>
                <div className='detail-image'>
                    <img src={AbsoluteBatman} alt="" />

                </div>

                <div className='detail-text'>
                    <div className='title-container'>
                        <h2>Punisher: Red Band (2025) #1</h2>
                    </div>
                     <div className='date-container'>
                        <h3 className='title'>Publicado:</h3>
                        <p>10 de septiembre, 2025</p>
                    </div>
                    <div className='publisher-container'>
                        <h3 className='title'>Author</h3>
                        <p>Benjamin Percy</p>
                    </div>
                    <div className='description-container'>
                        <p>¡FRANK HA VUELTO! Relean y recarguen, fieles creyentes: Frank Castle ha VUELTO. Sin recuerdos, con el cargador lleno y una sed de venganza furiosa, su violenta búsqueda de respuestas solo podría narrarse en una serie de Red Band. ¡Las balas volarán, la sangre correrá, y tanto los ciudadanos como los criminales de Nueva York temerán el nombre de EL CASTIGADOR! Del equipo creativo de superestrellas HELLVERINE, Benjamin Percy y Julius Ohta, ¡no se pierdan ni una sola página trepidante de esta nueva y explosiva serie!</p>
                    </div>
                </div>
           </div>
        </section>
    </>
   
  )
}
