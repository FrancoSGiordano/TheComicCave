import { useEffect, useState } from 'react'
import ComicSection from '../../components/ComicSection/ComicSection.tsx'
import '../../index.css'
import './Home.css'
import { useComicsStore } from '../../store/comicStore.ts'
import type { ComicFilters } from '../../api/MarvelAPI.ts'
import { getRandomDates, getRandomPastMonthDateRange, getTwoMonthRange  } from '../../utils/index.ts'

export default function Home() {

  const { sections, loadSection } = useComicsStore()
  const newReleases = sections["newReleasesSearch"] ?? []
  const randomCharacterComcis = sections["characterSection"] ?? []
  const classics = sections["classics90"] ?? []
  const [character, setCharacter] = useState("")

  useEffect(() => {
    if(newReleases.length === 0) {
      const filters : ComicFilters = {
        dateRange: getRandomPastMonthDateRange(),
        limit: 32
      }
      loadSection("newReleasesSearch", 180, filters)
    }
  }, [newReleases.length])

  useEffect(() => {
    if(randomCharacterComcis.length === 0) {
      const filters : ComicFilters = {
        dateRange: getTwoMonthRange(),
        limit: 32
      }
      loadSection("characterSection", 5, filters)
    }
  }, [randomCharacterComcis.length])

  useEffect(() => {
   if(classics.length === 0) {
      const filters : ComicFilters = {
        dateRange: getRandomDates(),
        limit: 32
      }
      loadSection("classics90", 180, filters)
    }
  }, [classics.length])


  return (
    <>  
        <div className='publishersection'>
         
          <>
              <ComicSection                
                title='Ultimos Lanzamientos'
                comics={newReleases}
              />

              <ComicSection              
                title={"Historias donde aparece " + character}
                comics={randomCharacterComcis}
              />

              <ComicSection               
                title='Clasicos'
                comics={classics}
              />
          </>
                
         

        </div>
    </>
  )
}
