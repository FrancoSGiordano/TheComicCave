import { useState } from 'react'
import ComicSection from '../../components/ComicSection/ComicSection.tsx'
import Footer from '../../components/Footer/Footer.tsx'
import Header from '../../components/Header/Header.tsx'
import HeroBanner from '../../components/HeroBanner/HeroBanner.tsx'
import '../../index.css'
import './Home.css'
import SideBar from '../../components/SideBar/SideBar.tsx'
import type { FavoriteState } from '../../types/index.ts'
import { useFavoritesStore } from '../../store/favoriteStore.ts'
import Encuesta from '../../components/Encuesta/Encuenta.tsx'


export default function Home() {



  const {quantity} = useFavoritesStore()

  const [value, setValue] = useState<string | null>(null)
  const [sideBarOpen, setSideBarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showEncuesta, setShowEncuesta] = useState(false)
  const [showHero, setShowHero] = useState(true)

  return (
    <>  
        <div className='totalbody'>
          <Header
            onToggleSideBar={()=>setSideBarOpen(!sideBarOpen)}
            quantity={quantity}
          />
            <div className={`content ${sideBarOpen ? 'sidebar-open' : ''}`}>
              <SideBar
                isOpen={sideBarOpen}
                selectPublisher={setValue}  
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}

              />
              
              <div >
                <HeroBanner/>
                <div className='main-content'>             
                  <div className="container">
                  <ComicSection title='Ultimos lanzamientos'/>

                  </div>
                </div> 

              </div>
              

              {!showHero && (
                <main className='main-content'>
                  <div className='container'>
                    {showEncuesta ? (
                      <Encuesta onClose={() => setShowEncuesta(false)} />
                    ) : (

                      <div className='publishersection'>
                        {value ? (
                          <ComicSection
                            title={value}
                          />
                          ) : (
                        <>
                            <ComicSection
                                
                                title='Marvel'
                              />

                            <ComicSection
                              
                              title='DC Comics'
                            />

                            <ComicSection
                              
                              title='Others'
                            />
                        </>
                              
                        )}

                      </div>
                    )}


                  </div>
                

                </main>
              )}
            </div>
          
          <Footer/>

        </div>
        
    </>
  )
}
