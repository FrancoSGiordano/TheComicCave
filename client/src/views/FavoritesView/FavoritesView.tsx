import ComicSection from '../../components/ComicSection/ComicSection'
import { Pagination } from '../../components/Pagination/Pagination'
import { useFavoritesStore } from '../../store/favoriteStore'
import './FavoritesView.css'
import Publicid from '../../components/Publicid/Publicid.tsx'

export default function FavoritesView() {

    const { visibleFavorites, favorites, page, pageSize, setPage, nextPage, prevPage } = useFavoritesStore()

    return (
        <>
        <div className='comicsBody'>
            <ComicSection
                title='Favoritos'
                comics={visibleFavorites}
            />
            <Publicid/>
        </div>

        <Pagination
            page={page}
            total={favorites.length}
            limit={pageSize}
            setPage={setPage}
            nextPage={nextPage}
            prevPage={prevPage}
        />

        </>
    )
}
