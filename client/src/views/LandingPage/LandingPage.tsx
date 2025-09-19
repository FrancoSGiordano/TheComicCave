import './LandingPage.css'
import HeroBanner from '../../components/HeroBanner/HeroBanner'
import ComicSection from '../../components/ComicSection/ComicSection'
import { useEffect } from 'react';
import { getTwoMonthRange } from '../../utils';

import { useComicsStore } from '../../store/comicStore';

export default function LandingPage(){

    
    
    const { visibleComics, loadSection } = useComicsStore() 
    const newReleases = visibleComics["newReleases"] ?? []
    useEffect(() => {
         loadSection("newReleases", 180, {
            dateRange: getTwoMonthRange(),
            limit: 32
          });
      },[newReleases.length, loadSection])

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
