import { useEffect, useState } from 'react'
import ComicSection from '../../components/ComicSection/ComicSection.tsx'
import Publicid from '../../components/Publicid/Publicid.tsx'
import '../../index.css'
import './Home.css'
import type { ComicCardType } from '../../types/index.ts'
import { CHARACTER_IDS, getRandomDates, getRandomPastMonthDateRange} from '../../utils/index.ts'
import type { ComicFilters } from '../../api/MarvelAPI.ts'
import fetchComics from '../../api/MarvelAPI.ts'

export default function Home() {

  const [newReleases, setNewReleases] = useState<ComicCardType[]>([])
  const [randomCharacterComcis, setRandomCharacterComics] = useState<ComicCardType[]>([])
  const [classics, setClassics] = useState<ComicCardType[]>([])
  const [character, setCharacter] = useState<string>("")

  useEffect(() => {
    const filtersNewRealeases : ComicFilters = {
      dateRange: getRandomPastMonthDateRange(),
      limit: 8,
      
    }
    fetchComics(filtersNewRealeases).then((data) => {
      if(data){
        setNewReleases(data)
      }
    })
    
    
    const randomChar = CHARACTER_IDS[Math.floor(Math.random() * CHARACTER_IDS.length)]
    const filtersCharacterComics : ComicFilters = {
      characterId: randomChar.id,
      limit: 8
    }
    fetchComics(filtersCharacterComics).then((data) => {
      if(data){
        setRandomCharacterComics(data);
        setCharacter(randomChar.name)  
      }
    })
     

   
    const filtersClassics : ComicFilters = {
      dateRange: getRandomDates(),
      limit: 8
    }
    fetchComics(filtersClassics).then((data) => {
      if(data){
        setClassics(data);
      }
    });
    
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
                title={"Historias donde aparece " + character}
                comics={randomCharacterComcis}
              />

              <ComicSection               
                title='Clasicos'
                comics={classics}
              />

              <Publicid/>

          </>
                


        </div>

    </>
  )
}
