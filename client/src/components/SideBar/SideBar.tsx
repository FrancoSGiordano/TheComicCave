import { useEffect, useState } from 'react'
import './SideBar.css'
import type { Character, CreatorSearch } from '../../types'
import { getCharacters, getCreators } from '../../api/MarvelAPI'
import type { SingleValue } from 'react-select'
import AsyncSelect from 'react-select/async'
import { customStyles } from './SelectStyles'
import { useSearchStore } from '../../store/searchStore'
import { useNavigate } from 'react-router-dom'

type SideBarProps = {
  isOpen: boolean
}

export type Option = {
  label?: string;
  value?: number;
}


export default function SideBar({isOpen} : SideBarProps) {

    const { setFilters, filters, searchComic, setCharacterOption, characterOption, setCreatorOption, creatorOption} = useSearchStore() 
    const [selectedCharacter, setSelectedCharacter] = useState<Option | null>(characterOption)
    const [enableCharacterFilter, setEnableCharacterFilter] = useState(characterOption ? true : false)
    const [selectedCreator, setSelectedCreator] = useState<Option | null>(creatorOption) 
    const [enableCreatorFilter, setEnableCreatorFilter] = useState(creatorOption ? true : false)
    const [searchTerm, setSearchTerm] = useState<string>(() => (filters.title ?? ""))
    const navigate = useNavigate()

    console.log(characterOption)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSearch();
    };
    const handleSearch = () => {

      console.log(filters)

      const hasFilters = Object.values(filters).some(
        (value) => value !== "" && value !== null && value !== undefined
      )

      if(!hasFilters) {
        return;
      }


      searchComic()
      navigate('comics/search')
    }

    const handleInputSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setSearchTerm(value)
      setFilters({
        title: value
      })
    }

    const handleCharacterChange = (value : SingleValue<Option>) => {
      setSelectedCharacter(value)
      setFilters({
        characterId: value?.value
      })
      setCharacterOption(
        value ? {
          value: value.value,
          label: value.label
        } : undefined
      );

    }

    const handleCharacterCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEnableCharacterFilter(e.target.checked)
    }

    const loadCharacterOptions = async (inputValue: string): Promise<Option[]> => {
      if (!inputValue) return [];

      const data = await getCharacters(inputValue);
      const options = data.map((char: Character) => ({
        label: char.name,
        value: char.id,
      }));

      return options
    };




    const handleCreatorChange = (value : SingleValue<Option>) => {
      setSelectedCreator(value)
      setFilters({
        creatorId: value?.value
      })
      setCreatorOption(
        value ? {
          value: value.value,
          label: value.label
        } : undefined
      );
    }

    const handleCreatorCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEnableCreatorFilter(e.target.checked)
    }

    const loadCreatorOptions = async (inputValue: string): Promise<Option[]> => {
      if (!inputValue) return [];

      const data = await getCreators(inputValue);
      const options = data.map((c: CreatorSearch) => ({ label: c.name, value: c.id }));
      return options;
    };


  const handleClearAllFilters = async () => {
 
    setSelectedCharacter(null)
    setEnableCharacterFilter(false)
    setCharacterOption(undefined)

    setSelectedCreator(null)
    setEnableCreatorFilter(false)
    setCreatorOption(undefined)

    setSearchTerm("")

    // opcional: volver al listado principal y recargar la página 1
    navigate('/comics')

    // disparar la búsqueda para recargar resultados (tu clearFilters ya dejó resultsByPage vacío)
    await searchComic()
  }


    useEffect(() => {
      setEnableCharacterFilter(!!characterOption)
    }, [characterOption])
  
    useEffect(() => {
      setEnableCreatorFilter(!!creatorOption)
    }, [creatorOption])

    useEffect(() => {
      if (!enableCharacterFilter) {
        setSelectedCharacter(null)
        setCharacterOption(undefined)
        setFilters({ characterId: undefined })
      }
    }, [enableCharacterFilter])

    useEffect(() => {
      if (!enableCreatorFilter) {
        setSelectedCreator(null)
        setCreatorOption(undefined)
        setFilters({ creatorId: undefined })
      }
    }, [enableCreatorFilter])
    return (
      <>


        <aside
          className={`category-aside ${isOpen ? 'open' : ''}`}
          role="complementary"
        >
          <form className="search-block" onSubmit={handleSubmit} role="search" aria-label="Buscar cómics">
            <div className="search-relative">
              <button type="submit" className="icon-button" aria-label="Buscar">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="search-icon"
                  focusable="false"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>

              <input
                type="text"
                placeholder="Buscar título"
                value={searchTerm}
                onChange={(e) => handleInputSearch(e)}
                className="search-input"
                aria-label="Buscar título, autor o editorial"
              />
            </div>
          </form>


          {/* Filters */}
          <div className="categories">
            <h3>Filtros</h3>
            <div>
              <div className='filters-block'>
                <div className='checkbox-wrapper-2'>
                  <input
                    className='sc-gJwTLC ikxBAC' 
                    type="checkbox" 
                    checked={enableCharacterFilter}
                    onChange={(e) => handleCharacterCheckboxChange(e)}
                  />
                </div>

                <div className="select-character">
                  <AsyncSelect
                    className='custom-select'
                    classNamePrefix="custom"
                    cacheOptions
                    defaultOptions
                    value={enableCharacterFilter ? selectedCharacter || null : null}
                    loadOptions={loadCharacterOptions}
                    onChange={handleCharacterChange}
                    isClearable
                    placeholder="Filtrar por personaje..."
                    styles={customStyles}
                    noOptionsMessage={() => "No hay opciones"}
                    loadingMessage={() => "Cargando..."}
                    isDisabled={!enableCharacterFilter}
                  />
                </div>
              </div>
              
              <div className='filters-block' style={{ marginTop: '0.5rem' }}>
                <div className='checkbox-wrapper-2'>
                  <input
                    className='sc-gJwTLC ikxBAC' 
                    type="checkbox"
                    checked={enableCreatorFilter}
                    onChange={(e) => handleCreatorCheckboxChange(e)}
                  />
                </div>

                <div className="select-creator">
                  <AsyncSelect
                    className='custom-select'
                    classNamePrefix="custom"
                    cacheOptions
                    defaultOptions
                    value={enableCreatorFilter ? selectedCreator || null : null}
                    loadOptions={loadCreatorOptions}
                    onChange={handleCreatorChange}
                    isClearable
                    placeholder="Filtrar por creador..."
                    styles={customStyles}
                    noOptionsMessage={() => "No hay opciones"}
                    loadingMessage={() => "Cargando..."}
                    isDisabled={!enableCreatorFilter}
                  />
                </div>
              </div>
            </div>
              
          </div>

          <div className="clear-button" style={{ marginTop: "1rem" }}>
            <button
              type="button"
              className="button"
              aria-label="Limpiar todos los filtros"
              onClick={handleClearAllFilters}

            >
              Limpiar filtros
            </button>
          </div>

          

        </aside>
      </>
    )
}
