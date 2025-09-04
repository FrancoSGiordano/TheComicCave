

import { useState } from 'react'
import ComicSection from '../../components/ComicSection/ComicSection.tsx'
import Footer from '../../components/Footer/Footer.tsx'
import Header from '../../components/Header/Header.tsx'
import '../../index.css'
import './Home.css'
import SideBar from '../../components/SideBar/SideBar.tsx'


export default function Home() {

  const [value, setValue] = useState<string | null>(null)

  

  return (
    <>
        <Header/>
        <div className='content'>
            
            <SideBar
              selectPublisher={setValue}
            />

            <main className='main-content'>
            
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
                  
            </main>

          </div>
        
        <Footer/>
    </>
  )
}
