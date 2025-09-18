import ComicSection from '../../components/ComicSection/ComicSection'
import { useFavoritesStore } from '../../store/favoriteStore'
import './FavoritesView.css'
import Publicid from '../../components/Publicid/Publicid.tsx'

export default function FavoritesView() {

    const { favorites } = useFavoritesStore()

    return (
        <>
        <div className='comicsBody'>
            <ComicSection
                title='Favoritos'
                comics={favorites}
            />
            <Publicid/>
        </div>

        </>
    )
}
