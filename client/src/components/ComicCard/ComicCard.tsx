import { useFavoritesStore } from '../../store/favoriteStore'
import type { Comic, FavoriteComic } from '../../types'
import './ComicCard.css'
import { useEffect, useState } from "react"


type ComicCardProps = {
  comic: Comic
  onClick?: () => void
}

export default function ComicCard({ comic, onClick} : ComicCardProps) {
  // inicializador seguro (evita crashes si comic es undefined)
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  const { addFavorite, removeFavorite, favorites } = useFavoritesStore()

  useEffect(() => {
    setIsFavorite(favorites.some((fav) => fav.id === comic.id));
  }, [favorites, comic.id]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()

    if(isFavorite){
        removeFavorite(comic.id)   
    } else {
      const favoriteComic : FavoriteComic = {
        id: comic.id,
        name: comic.name,
        image: comic.image,
        publisher: comic.publisher
      }
      addFavorite(favoriteComic)
    }

    setIsFavorite(!isFavorite)
  }

  // placeholder si no hay comic todavía (evita crash)
  if (!comic) {
    return (
      <article className="comic placeholder" aria-busy="true">
        <div className="comic-image" />
        <div className="content">
          <h4 className="comic-title">Cargando...</h4>
        </div>
      </article>
    )
  }

  const title = comic.name ?? "Sin título"

  return (
    <article
      className="comic"
      tabIndex={0}
      role="button"
      onClick={() => onClick?.()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onClick?.()
        }
      }}
      aria-label={`Ver detalles de ${title}`}
    >
      <div className="comic-image">
        <img
          src={comic.image ?? '/placeholder.svg'}
          alt={title}
          width="400"
          height="600"
          loading="lazy"
        />

        <button
          onClick={handleFavoriteClick}
          className={`favorite-button ${isFavorite ? 'is-fav' : ''}`}
          aria-pressed={isFavorite}
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
      </div>

      <div className='description'>
        <h4 className="comic-title">{title}</h4>
        
      </div>
    </article>
  )
}
