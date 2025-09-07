import { comics } from '../../api/helper';
import ComicCard from '../ComicCard/ComicCard';
import "./ComicSection.css"

type ComicSectionProps = {
  title: string
}

export default function ComicSection({title} : ComicSectionProps) {
  return (
    <section className='comic-section'>
      <div className='title-section'>
        <h2>{title}</h2>
      </div>
      <div className='comics'>
        {comics
          .filter(comic => comic.publisher.toLowerCase() === title.toLowerCase())
          .map((comic) => (
            <ComicCard
              comic={comic}                       // <-- pasamos el objeto completo
              publisher={comic.publisher}
              onClick={() => console.log('Abrir detalle de', comic.name)}
            />
        ))}
      </div>
    </section>
  )
}
