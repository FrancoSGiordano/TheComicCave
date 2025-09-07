import './Header.css'
import logo from '../../../public/logo.png'

interface HeaderProps{
    onToggleSideBar: () => void
}

export default function Header({onToggleSideBar}: HeaderProps) {
     
  return (
    <>
        <header className="header">
            <div className="header-content">
                <div className="titleButton">
                    <button 
                        className='menuButton'
                        onClick={onToggleSideBar}
                        aria-label="Abrir Filtros"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24"
                        width={24}
                        height={24}
                        stroke="currentColor"
                        strokeWidth={1.5}
                        fill="none"
                        aria-hidden="true"
                        focusable="false"
                        className="icon"
                        >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    </svg>


                    </button>



                    <div className="title">
                        <h1 className="text-title">The Comic Cave</h1>
                    </div>
                </div>

                
                <div className="logo" aria-hidden="false">
                    <img src={logo} alt="" />
                </div>

                <div className="favoriteSection">
                    <button className='favorite'>
                    <svg
                        className="icon"
                        viewBox="0 0 24 24"
                        width={24}
                        height={24}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        focusable="false"
                        >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>                        
                    <span className='favoriteNumber' aria-hidden="true">3</span>


                    </button>

                </div>




            </div>
        </header>
        
    </>  
  )
}
