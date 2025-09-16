import ComicSection from "../../components/ComicSection/ComicSection"
import { useSearchStore } from "../../store/searchStore"


export default function SearchView() {

    const { results } = useSearchStore()

    return (
        <>
            <ComicSection
                title="Resultados de busqueda..."
                comics={results}
            />
        </>
    )
}
