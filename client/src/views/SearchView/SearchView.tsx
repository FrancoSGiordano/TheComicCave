import ComicSection from "../../components/ComicSection/ComicSection"
import { Pagination } from "../../components/Pagination/Pagination"
import { useSearchStore } from "../../store/searchStore"
import './SearchView.css'
import Publicid from '../../components/Publicid/Publicid.tsx'


export default function SearchView() {

    const { resultsByPage, page, total, limit, setPage, nextPage, prevPage } = useSearchStore()
    const comics = resultsByPage[page] ?? []

    return (
        <>
            <div className="comicsBody">
                <ComicSection
                    title="Resultados de busqueda..."
                    comics={comics}
                />

                <Publicid/>
            </div>

            <Pagination
                page={page}
                total={total}
                limit={limit}
                setPage={setPage}
                nextPage={nextPage}
                prevPage={prevPage}
            />
        
        </>
    )
}
