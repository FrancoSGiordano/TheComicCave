import ComicCard from '../ComicCard/ComicCard';
import "./ComicSection.css"
import type { ComicCardType } from '../../types';
import Loader from '../Loader/Loader';

type ComicSectionProps = {
  title: string
  comics: ComicCardType[]
  loading?: boolean

}

export default function ComicSection({title, comics, loading = false} : ComicSectionProps) {
    const hasComics = Array.isArray(comics) && comics.length > 0;

    return (
      <section className='comic-section'>
        <div className='title-section'>
          <h2>{title}</h2>
        </div>
        <div className='comics'>
{loading ? (
          // loader global pequeño + skeletons
          <>
            <div className="section-loader">
              <Loader size={36} label="Cargando..." />
            </div>

          </>
        ) : hasComics ? (
          comics.map((comic) => (
            <ComicCard
              key={comic.id}
              comic={comic}
              onClick={() => console.log('Abrir detalle de', comic.title)}
            />
          ))
        ) : (
          <p className='not-found-comics'>Uuups! Parece que no hay comics para mostrar!</p>
        )}
        </div>
      </section>
  )
}
