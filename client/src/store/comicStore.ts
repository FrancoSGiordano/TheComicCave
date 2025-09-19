import { create } from "zustand"
import type { ComicCardType } from "../types"
import type { ComicFilters } from "../api/MarvelAPI"
import { getLocalStorage, setLocalStorage } from "../utils/cache"
import { getTwoMonthRange, rotateComics } from "../utils"
import fetchComics from "../api/MarvelAPI"


type ComicsStore = {
    sections: Record<string, ComicCardType[]>
    visibleComics: Record<string, ComicCardType[]>
    hasRotated: Record<string, boolean>
    loading: Record<string, boolean>
    actualCharacter: string
    setActualCharacter: (character: string) => void
    loadSection: (key: string, ttl: number, filters?: ComicFilters) => Promise<void>
    rotateSection: (key: string) => void
}

const sectionKeys = ["newReleasesSearch", "characterSection", "classics90"];
const initialHasRotated: Record<string, boolean> = {};
const initialSections = getLocalStorage("sections") || {}
const initialVisible = getLocalStorage("visibleComics") || {}
const initialCharacter = localStorage.getItem("actualCharacter") || ""

sectionKeys.forEach((key) => {
  if (!(key in initialHasRotated)) {
    initialHasRotated[key] = false;
  }
});


export const useComicsStore = create<ComicsStore>((set, get) => ({
    sections: initialSections,
    hasRotated: initialHasRotated,
    visibleComics: initialVisible,
    loading: {},
    actualCharacter: initialCharacter,
    loadSection: async(key, ttl, filters) => {
        const { loading } = get()
        
        if(loading[key]) {
            return
        }

        set((state) => ({
            loading: {...state.loading, [key]: true}
        }))
        
        const defaultFilters: ComicFilters = filters ?? {
            dateRange: getTwoMonthRange(),
            limit: 32
        }

        try {
            const data = await fetchComics(defaultFilters)
            if(data) {
                set((state) => ({
                    sections: {
                        ...state.sections, [key]: data.comics
                    },
                    hasRotated:{
                        ...state.hasRotated, [key]: false
                    },
                    visibleComics: {
                        ...state.visibleComics,
                        [key]: data.comics.slice(0, 8)
                    },
                    loading: {...state.loading, [key]: false}
                }))
                localStorage.setItem(`${key}Index`, "8")
                setLocalStorage("sections", get().sections, ttl)
                setLocalStorage("visibleComics", get().visibleComics, ttl)
                setLocalStorage("hasRotate", get().hasRotated, ttl)
            }
        } catch (err) {
            console.error(err)
            set((state) => ({
                loading: { ...state.loading, [key]: false }
            }))
        }   
    },
    setActualCharacter: (character) => {
        set({
            actualCharacter: character
        })
        localStorage.setItem("actualCharacter", character)
    },
    rotateSection: (key) => {
        const { hasRotated, sections } = get()
        
        const cached = sections[key]
        console.log(key, cached)
        if(cached){
            if(!hasRotated[key]){
                console.log("Key: ", key)
                const data = rotateComics(cached, `${key}Index`)
                set((state) => ({
                    visibleComics: {
                        ...state.visibleComics,
                        [key]: data
                    },
                    hasRotated:{
                        ...state.hasRotated, [key]: true
                    }
                }))
                return
            }  
        }
    }
}))