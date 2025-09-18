import { create } from "zustand"
import type { ComicCardType } from "../types"
import type { ComicFilters } from "../api/MarvelAPI"
import { getLocalStorage, setLocalStorage } from "../utils/cache"
import { getTwoMonthRange, rotateComics } from "../utils"
import fetchComics from "../api/MarvelAPI"


type ComicsStore = {
    sections: Record<string, ComicCardType[]>
    hasRotated: Record<string, boolean>
    loadSection: (key: string, ttl: number, filters?: ComicFilters) => Promise<void>
}

export const useComicsStore = create<ComicsStore>((set, get) => ({
    sections: {},
    hasRotated: {},

    loadSection: async(key, ttl, filters) => {
        const { hasRotated } = get()
        const cached = getLocalStorage(key) || []
        if(cached.length > 0) {
            if(!hasRotated[key]){
                const data = rotateComics(cached, `${key}Index`)
                set((state) => ({
                    sections: {
                        ...state.sections, [key]: data
                    },
                    hasRotated:{
                        ...state.hasRotated, [key]: true
                    }
                }))
            }  
        } else {
            const defaultFilters: ComicFilters = filters ?? {
                dateRange: getTwoMonthRange(),
                limit: 32
            }

            const data = await fetchComics(defaultFilters)
            if(data) {
                set((state) => ({
                    sections: {
                        ...state.sections, [key]: data.slice(0, 8)
                    },
                    hasRotated:{
                        ...state.hasRotated, [key]: true
                    }
                }))
                setLocalStorage(key, data, ttl)
            }
        }
        
    }
}))