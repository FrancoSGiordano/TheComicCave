import './LandingPage.css'
import HeroBanner from '../../components/HeroBanner/HeroBanner'
import ComicSection from '../../components/ComicSection/ComicSection'
import { useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../../utils/cache';
import { getTwoMonthRange } from '../../utils';
import fetchComics, { type ComicFilters } from '../../api/MarvelAPI';
import type { ComicCardType } from '../../types';

export default function LandingPage(){

    const [newReleases, setNewReleases] = useState<ComicCardType[]>(() => {
        const cached = getLocalStorage("newReleases");
        return cached ? cached : []
      })
    
    useEffect(() => {
        const cachedNew = getLocalStorage('newReleases')
        if(!cachedNew || cachedNew.length === 0) {
          const filters : ComicFilters = {
            dateRange: getTwoMonthRange(),
            limit: 8
          }
          fetchComics(filters).then((data) => {
            if(data){
              setNewReleases(data)
              const days = 15 * 24 * 60
              setLocalStorage("newReleases", data, days)
            }
          })
        }
    })

    return (
        <>    
            <div className='landing-container'>
                <HeroBanner/>
            </div>
                <ComicSection
                    title='Novedades'
                    comics={newReleases}
                />           
        </>
    )
}
