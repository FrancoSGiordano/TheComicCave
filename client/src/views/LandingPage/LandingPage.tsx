import './LandingPage.css'
import HeroBanner from '../../components/HeroBanner/HeroBanner'
import ComicSection from '../../components/ComicSection/ComicSection'
import { useEffect } from 'react';
import { getTwoMonthRange } from '../../utils';
import { type ComicFilters } from '../../api/MarvelAPI';
import { useComicsStore } from '../../store/comicStore';

export default function LandingPage(){

    
    
    const { sections, loadSection } = useComicsStore() 
    const newReleases = sections["newReleases"] ?? []
    useEffect(() => {
      if(newReleases.length === 0) {
        const filters : ComicFilters = {
          dateRange: getTwoMonthRange(),
          limit: 32
        }
        loadSection("newReleases", 180, filters)
      }
    }, [newReleases.length])

    return (
        <>    
            <div className='landing-container'>
                <HeroBanner/>
            </div>
            <div className='comicBody'>
                <ComicSection
                    title='Novedades'
                    comics={newReleases}
                />  
            </div>
         
        </>
    )
}
