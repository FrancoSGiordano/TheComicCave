import './SideBar.css'

type SideBarProps = {
  isOpen: boolean
  selectPublisher: React.Dispatch<React.SetStateAction<string | null>>
  searchTerm: string
  onSearchChange: (term: string) => void
}


export default function SideBar({
  isOpen,
  selectPublisher,
  searchTerm,
  onSearchChange,
} : SideBarProps) {

  return (
    <>
      

      <aside
        className={`category-aside ${isOpen ? 'open' : ''}`}
        role="complementary"
        aria-expanded={isOpen}
      >
        {/* Search */}
        <div className="search-block">
          <div className="search-relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="search-icon"
              aria-hidden="true"
              focusable="false"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>

            <input
              type="text"
              placeholder="Buscar título"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
              aria-label="Buscar título, autor o editorial"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="categories">
          <h3>Categorías</h3>
          <ul>
            <li onClick={() => selectPublisher(null)}>Inicio</li>
            <li onClick={() => selectPublisher("Marvel")}><button className="publisher">Marvel</button></li>
            <li onClick={() => selectPublisher("DC Comics")}><button className="publisher">DC</button></li>
            <li onClick={() => selectPublisher("Others")}>Otras</li>
          </ul>
        </div>
      </aside>
    </>
  )
}
