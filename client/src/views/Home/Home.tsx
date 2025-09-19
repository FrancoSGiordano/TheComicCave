import { useEffect, useState } from 'react'
import Publicid from '../../components/Publicid/Publicid.tsx'
import '../../index.css'
import './Home.css'
import { useComicsStore } from '../../store/comicStore.ts'
import { getRandomDates, getRandomPastMonthDateRange, getTwoMonthRange  } from '../../utils/index.ts'
import ComicSection from '../../components/ComicSection/ComicSection.tsx'

export default function Home() {


  const { loadSection, visibleComics} = useComicsStore()
  const newReleases = visibleComics["newReleasesSearch"] ?? []
  const randomCharacterComcis = visibleComics["characterSection"] ?? []
  const classics = visibleComics["classics90"] ?? []
  const [character, setCharacter] = useState<string>("")

  useEffect(() => {
     loadSection("newReleasesSearch", 180, {
        dateRange: getRandomPastMonthDateRange(),
        limit: 32
      });
  },[newReleases.length, loadSection])
     
  useEffect(() => {
      loadSection("characterSection", 5, {
        dateRange: getTwoMonthRange(),
        limit: 32
      });
  }, [randomCharacterComcis.length, loadSection]);

  useEffect(() => {
      loadSection("classics90", 180, {
        dateRange: getRandomDates(),
        limit: 32
      });
  }, [classics.length, loadSection]);



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
