import { comics } from '../../api/helper';
import ComicCard from '../ComicCard/ComicCard';
import "./ComicSection.css"

type ComicSectionProps = {
  title: string
}

export default function ComicSection({title} : ComicSectionProps) {

    
    return (
      <>
        <h2>{title}</h2>
        <div className='comics'>
            {comics.filter(comic => comic.publisher.toLowerCase() === title.toLowerCase()).map((comic) =>
               <ComicCard
                name={comic.name}
                image={comic.image}
               />
            )}   
        </div>
      </>
    )
}
