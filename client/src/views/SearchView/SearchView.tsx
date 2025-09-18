import ComicSection from "../../components/ComicSection/ComicSection"
import { useSearchStore } from "../../store/searchStore"
import './SearchView.css'


export default function SearchView() {

    const { results } = useSearchStore()

    return (
        <>
            <div className="comicsBody">
                <ComicSection
                    title="Resultados de busqueda..."
                    comics={results}
                />
            </div>
        
        </>
    )
}
