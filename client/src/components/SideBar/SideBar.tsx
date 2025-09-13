import { useEffect, useState } from 'react'
import './SideBar.css'
import type { Character } from '../../types'
import Select from 'react-select/base'
import type { SingleValue } from 'react-select'
import { getCharacters } from '../../api/MarvelAPI'

type SideBarProps = {
  isOpen: boolean
  searchTerm: string
}


export default function SideBar({isOpen, searchTerm} : SideBarProps) {

    const [query, setQuery] = useState("")
    const [characters, setCharacters] = useState<Character[]>([])
    const [selectedCharacter, setSelectedCharacter] = useState<Character>()

   
    useEffect(() => {
      getCharacters(query).then((data) => {
        if(data){
          setCharacters(data)
        }
      })
    }, [query])

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
                className="search-input"
                aria-label="Buscar título, autor o editorial"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="categories">
            <h3>Filtros</h3>
            <div>
              <div className='filter'>
                <div className='checkbox'>
                  <input type="checkbox" />
                </div>
                <div className="search-relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="search-icon-secondary"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>

                  
                </div>
              </div>
              
            </div>
              
          </div>

          

        </aside>
      </>
    )
}
