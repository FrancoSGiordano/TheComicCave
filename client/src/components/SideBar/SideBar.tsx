import './SideBar.css'

type SideBarProps = {
    selectPublisher: React.Dispatch<React.SetStateAction<string | null>>
}

export default function SideBar({selectPublisher} : SideBarProps) {
  return (
    <>
        <aside className="category-aside">
            <h3>Categorias</h3>
                <ul>
                    <li onClick={() => selectPublisher(null)}>Inicio</li>
                    <li onClick={() => selectPublisher("Marvel")}><a>Marvel</a></li>
                    <li onClick={() => selectPublisher("DC Comics")}><a>DC</a></li>
                    <li onClick={() => selectPublisher("Others")}>Otras</li>            
                </ul>
            </aside>
    </>
  )
}
