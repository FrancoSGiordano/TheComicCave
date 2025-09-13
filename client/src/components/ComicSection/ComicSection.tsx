import ComicCard from '../ComicCard/ComicCard';
import "./ComicSection.css"
import type { ComicCardType } from '../../types';


type ComicSectionProps = {
  title: string
  comics: ComicCardType[]
}

export default function ComicSection({title, comics} : ComicSectionProps) {

    return (
      <section className='comic-section'>
        <div className='title-section'>
          <h2>{title}</h2>
        </div>
        <div className='comics'>
          {(comics && comics.length) ? (
            comics
            .map((comic) => (
              <ComicCard
                key={comic.id}
                comic={comic}                       // <-- pasamos el objeto completo
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
