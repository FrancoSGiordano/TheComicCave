import { useEffect, useState } from 'react'
import { useFavoritesStore } from '../../store/favoriteStore'
import Header from '../../components/Header/Header'
import SideBar from '../../components/SideBar/SideBar'
import Footer from '../../components/Footer/Footer'
import "./AppLayout.css"
import { Outlet, useLocation } from 'react-router-dom'
import { useSearchStore } from '../../store/searchStore'


export default function AppLayout() {
    
    const location = useLocation()
    const {quantity} = useFavoritesStore()
    const { clearFilters, setNextSearch } = useSearchStore()
    const [sideBarOpen, setSideBarOpen] = useState(true)
    const [isLanding, setIsLanding] = useState(location.pathname !== "/")
  


    const isDetailsPath = (pathname: string) => {
    return /^\/comics\/details(\/|$)/.test(pathname)
  }

    useEffect(() => {
      const isMobile = window.innerWidth < 768
      setSideBarOpen(!isMobile)
    },[location.pathname])

    useEffect(() => {
      setIsLanding(location.pathname !== "/" && !isDetailsPath(location.pathname))
    }, [location.pathname])

    useEffect(() => {

      const excludedBaseRoutes = ["/comics/search", "/comics/details", "/comics"];

      const isExcluded = excludedBaseRoutes.some((base) =>
        location.pathname.startsWith(base)
      );

      if(!isExcluded){
        clearFilters()
        setNextSearch()
      }
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
