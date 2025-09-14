import { cache, useEffect, useState } from 'react'
import ComicSection from '../../components/ComicSection/ComicSection.tsx'
import '../../index.css'
import './Home.css'
import { getLocalStorage, setLocalStorage } from '../../utils/cache.ts'
import fetchComics from '../../api/MarvelAPI.ts'
import type { ComicCardType } from '../../types/index.ts'
import { CHARACTER_IDS, getTwoMonthRange } from '../../utils/index.ts'
import type {ComicFilters} from '../../api/MarvelAPI.ts'
export default function Home() {

  const [newReleases, setNewReleases] = useState<ComicCardType[]>(() => {
    const cached = getLocalStorage("newReleases");
    return cached ? cached : []
  })
  const [randomCharacterComcis, setRandomCharacterComics] = useState<ComicCardType[]>(() => {
    const cached = getLocalStorage("characterCache");
    return cached ? cached.data : []
  })
  const [classics, setClassics] = useState<ComicCardType[]>(() => {
    const cached = getLocalStorage("classics90s");
    return cached ? cached : []
  })
  const [character, setCharacter] = useState<string>(() => {
    const cached = getLocalStorage("characterCache")
    return cached ? cached.name : ""
  })

  useEffect(() => {
    const cachedNew = getLocalStorage('newReleases')
    if(!cachedNew || cachedNew.length === 0) {
    const Filters : ComicFilters = {
    dateRange: getTwoMonthRange(),
    limit: 8
    }
      fetchComics(Filters).then((data) => {
        if(data){
          setNewReleases(data)
          const days = 15 * 24 * 60
          setLocalStorage("newReleases", data, days)
        }
      })
    }

    const cachedCharacter = getLocalStorage("characterCache")
    if(!cachedCharacter || cachedCharacter.data.length === 0) {
      const randomChar = CHARACTER_IDS[Math.floor(Math.random() * CHARACTER_IDS.length)]
      
      fetchComics(randomChar.id, undefined, 8).then((data) => {
        if(data){
          setRandomCharacterComics(data);
          setCharacter(randomChar.name)
          setLocalStorage("characterCache", {name: randomChar.name, data}, 30);
          
        }
      })
    } 

    const cachedClassics = getLocalStorage("classics90s");
    if (!cachedClassics || cachedClassics.length === 0) {
      fetchComics(undefined, undefined, 8, "1990-01-01,1999-12-31").then((data) => {
        if(data){
          setClassics(data);
          const days = 15 * 24 * 60
          setLocalStorage("classics90s", data, days);
        }
      });
    } 
  }, [])


  return (
    <>  
        <div className='publishersection'>
         
          <>
              <ComicSection                
                title='Ultimos Lanzamientos'
                comics={newReleases}
              />

              <ComicSection              
                title={character}
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
