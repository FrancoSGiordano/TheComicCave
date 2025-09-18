import ComicSection from '../../components/ComicSection/ComicSection'
import { useHistoryStore } from '../../store/historyStore'
import './HistoryView.css'

export default function HistoryView() {

    const { historyComics } = useHistoryStore()

    return (
        <>
            <div className='comicsBody'>
                <ComicSection
                    title='Ultimas visitas...'
                    comics={historyComics}
                />
            </div>
        </>
    )
}
