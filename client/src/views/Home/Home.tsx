import { useEffect, useRef } from 'react'
import Publicid from '../../components/Publicid/Publicid.tsx'
import '../../index.css'
import './Home.css'
import { useComicsStore } from '../../store/comicStore.ts'
import {  getRandomCharacter, getRandomDates, getRandomPastMonthDateRange, getTwoMonthRange  } from '../../utils/index.ts'
import ComicSection from '../../components/ComicSection/ComicSection.tsx'
import type { Character } from '../../types/index.ts'

export default function Home() {


  const { loadSection, visibleComics, actualCharacter, setActualCharacter, rotateSection} = useComicsStore()
  const newReleases = visibleComics["newReleasesSearch"] ?? []
  const randomCharacterComcis = visibleComics["characterSection"] ?? []
  const classics = visibleComics["classics90"] ?? []
  const characterRef = useRef<Character | null>(null)
  

  useEffect(() => {
    if(newReleases.length === 0) {
      loadSection("newReleasesSearch", 180, {
        dateRange: getRandomPastMonthDateRange(),
        limit: 32
      });
    } else {
      rotateSection("newReleasesSearch")
    }
     
  },[newReleases.length, loadSection])
     
  useEffect(() => {
    if(randomCharacterComcis.length === 0){
      if(!characterRef.current) {
        characterRef.current = getRandomCharacter()
      }
      const character = characterRef.current
      console.log("Personaje:", character)
      loadSection("characterSection", 5, {
        limit: 32,
        characterId: character.id
      });
      setActualCharacter(character.name)
    } else {
      rotateSection("characterSection")
    }
      
  }, [randomCharacterComcis.length, loadSection]);

  useEffect(() => {
    if(classics.length === 0) {
      loadSection("classics90", 180, {
        dateRange: getRandomDates(),
        limit: 32
      });
    } else {
      rotateSection("classics90")
    }
   
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
                title={"Historias donde aparece " + actualCharacter}
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
