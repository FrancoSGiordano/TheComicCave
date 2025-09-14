import { useState } from 'react'
import './SideBar.css'
import type { Character } from '../../types'

import { getCharacters } from '../../api/MarvelAPI'
import type { SingleValue } from 'react-select'
import AsyncSelect from 'react-select/async'
import { customStyles } from './SelectStyles'

type SideBarProps = {
  isOpen: boolean
  searchTerm: string
}

type Option = {
  label: string;
  value: number;
}


export default function SideBar({isOpen, searchTerm} : SideBarProps) {

    const [selectedCharacter, setSelectedCharacter] = useState<Option | null>(null)
    const [inputText, setInputText] = useState("")
    const [enableCharacterFilter, setEnableCharacterFilter] = useState(false)

    const handleInputChange = (value : string) => {
      setInputText(value)
    }

    const handleChange = (value : SingleValue<Option>) => {
      setSelectedCharacter(value)
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEnableCharacterFilter(e.target.checked)
    }

    const loadOptions = async (inputValue: string): Promise<Option[]> => {
      if (!inputValue) return [];

      const data = await getCharacters(inputValue);
      const options = data.map((char: Character) => ({
        label: char.name,
        value: char.id,
      }));

      return options
    };
  

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
              <div className='filters-block'>
                <div className='checkbox'>
                  <input 
                    type="checkbox" 
                    checked={enableCharacterFilter}
                    onChange={(e) => handleCheckboxChange(e)}
                  />
                </div>

                <div className="select-character">
                  <AsyncSelect
                    className='custom-select'
                    classNamePrefix="custom"
                    cacheOptions
                    defaultOptions
                    value={selectedCharacter}
                    loadOptions={loadOptions}
                    onInputChange={handleInputChange}
                    onChange={handleChange}
                    isClearable
                    placeholder="Filtrar por personaje..."
                    styles={customStyles}
                    noOptionsMessage={() => "No hay opciones"}
                    loadingMessage={() => "Cargando..."}
                    isDisabled={!enableCharacterFilter}
                  />
                </div>
              </div>
              
            </div>
              
          </div>

          

        </aside>
      </>
    )
}
