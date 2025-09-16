import './Details.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useState ,useEffect} from 'react';
import type { ComicCardType, ComicDetails } from '../../types';
import { fetchComicById } from '../../api/MarvelAPI'
import { useFavoritesStore } from '../../store/favoriteStore'
import ShareCard from '../ShareCard/ShareCard';


interface DetailsProps{
    onToggleShareCard: () => void
    isOpen: boolean
}


export default function Details({onToggleShareCard, isOpen}: DetailsProps) {
    
    const navigate = useNavigate()
    const {id} = useParams<{id: string}>()
    const [comic, setComic] = useState<ComicDetails | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isFavorite, setIsFavorite] = useState<boolean>(false)
    const { addFavorite, removeFavorite, favorites } = useFavoritesStore()
    




    useEffect(() => {
        if (!id) {
        setError("ID no válido")
        setLoading(false)
        return
        }

        setLoading(true)
        fetchComicById(id)
        .then((c) => {
            setComic(c)
            setLoading(false)
        })
        .catch((err) => {
            setError(String(err))
            setLoading(false)
        })
    }, [id])

        useEffect(() => {
    setIsFavorite(favorites.some((fav) => fav.id === comic?.id));
     }, [favorites, comic?.id]);

    if (loading) return <p>Cargando...</p>
    if (error) return <p>Error: {error}</p>
    if (!comic) return <p>No se encontró el cómic.</p>
    
    function formatComicDate(rawIso?: string | null) {
        if (!rawIso) return "—";
        try {
            const d = new Date(rawIso);
            return d.toLocaleDateString("es-AR", {
            day: "numeric",
            month: "long",
            year: "numeric",
            });
        } catch {
        return rawIso;
    }
    }



    const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()

    if(isFavorite){
        removeFavorite(comic.id)   
    } else {
      const favoriteComic : ComicCardType = {
        id: comic.id,
        title: comic.title,
        imageUrl: comic.imageUrl,
      }
      addFavorite(favoriteComic)
    }

    setIsFavorite(!isFavorite)
    }
    
    return (
    <>
        <section className='detail-master' style={{ backgroundImage: `url(${comic.imageUrl})` }} >
              <div className="detail-overlay" />

            
            <div className='detail-header'>
                <div className="backSection">
                    <button type="button" className="back buttonheader" onClick={() => navigate(-1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                        <span className="label">Volver</span>
                    </button>
                </div>




                <div className="shareSection">
                    <button
                              onClick={handleFavoriteClick}

                className={`favoritebutton ${isFavorite ? 'is-fav' : ''}`}
                >
                <svg
                    className="icono"
                    viewBox="0 0 24 24"
                    width={20}
                    height={20}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    focusable="false"
                >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                </button>
                    <button 
                        className='share buttonheader'
                        onClick={onToggleShareCard}
                        >
                
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
                    <img src={comic.imageUrl} alt="" />

                </div>

                <div className='detail-text'>
                    <div className='title-container'>
                        <h2>{comic.title}</h2>
                    </div>
                     <div className='date-container'>
                        <h3 className='title'>Publicado:</h3>
                        <p>{formatComicDate(comic.date) }</p>
                    </div>
                    <div className='description-container'>
                        <p>{comic.description}</p>
                    </div>

                    <div className='creators-container'>
                        <h3 className='title'>Creadores</h3>
                        <ul>
                        {comic.creators?.map((cr, i) => (
                            <li key={i}>{cr.name} {cr.role ? `: ${cr.role}` : ''}</li>
                        ))}
                        </ul>
                    </div>
                </div>
           </div>

           {isOpen && comic && (
            <ShareCard isOpen={isOpen} comicSharing={comic} onClose={onToggleShareCard} />
            )}
        </section>
    </>
   
  )
}
