import { useEffect, useState } from 'react'
import { useFavoritesStore } from '../../store/favoriteStore'
import Header from '../../components/Header/Header'
import SideBar from '../../components/SideBar/SideBar'
import Footer from '../../components/Footer/Footer'
import "./AppLayout.css"
import { Outlet, useLocation } from 'react-router-dom'


export default function AppLayout() {
    
    const location = useLocation()
    const {quantity} = useFavoritesStore()
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")


    const isDetailsPath = (pathname: string) => {
    return /^\/comics\/details(\/|$)/.test(pathname)
  }

  const [isLanding, setIsLanding] = useState(
    () => location.pathname !== "/" && !isDetailsPath(location.pathname)
  )
    useEffect(() => {
      const isMobile = window.innerWidth < 768
      setSideBarOpen(!isMobile)
    },[location.pathname])

    useEffect(() => {
      setIsLanding(location.pathname !== "/" && !isDetailsPath(location.pathname))
    }, [location.pathname])

    return (
        <>  
            <div className='totalbody'>
              <Header
                onToggleSideBar={()=>setSideBarOpen(!sideBarOpen)}
                quantity={quantity}
                isLanding={isLanding}
              />
                <div className={`content ${sideBarOpen ? 'sidebar-open' : ''}`}>
                  
                  
                  {location.pathname !== "/" &&  !isDetailsPath(location.pathname) &&(
                      <SideBar
                        isOpen={sideBarOpen}
                        searchTerm={searchTerm}
                        
                      />
                  )}

                  <main className='main-content'>
                    <div className='container'>
                      
                      <Outlet/>
    
                    </div>
                   
                  </main>
    
                </div>
              
              <Footer/>
    
            </div>
            
        </>
      )
}
