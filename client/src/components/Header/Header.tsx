import './Header.css'
import logo from '../../../public/logo.png'

export default function Header() {
     
  return (
    <>
        <header className="header">
            <div className="header-content">
                <div className="logo">
                    <img src={logo} alt="" />
                </div>

                <div className="title">
                    <h1 className="text-title">The Comic Cave</h1>
                </div>

            </div>
        </header>
    </>  
  )
}
