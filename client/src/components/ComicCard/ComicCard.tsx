import './ComicCard.css'

type ComicCardProps = {
    name: string
    image?: string
}

export default function ComicCard({name, image} : ComicCardProps) {
  return (
    <>
         <div className="comic">
            <div className="comic-image">
              <img src={image} alt=""/>
            </div>
            <h4 className="comic-title">{name}</h4>
          </div>
    </>
  )
}
