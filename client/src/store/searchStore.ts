import { create } from "zustand"
import fetchComics, { type ComicFilters } from "../api/MarvelAPI"
import type { ComicCardType } from "../types"
import type { Option } from "../components/SideBar/SideBar"



type SearchState = {
    filters: ComicFilters
    results: ComicCardType[]
    characterOption: Option | null
    setFilters: (filters: ComicFilters) => void
    setCharacterOption: (characterOption : Option | null | undefined) => void
    searchComic: () => Promise<void>
    clearFilters: () => void
}

const storedFilters = JSON.parse(localStorage.getItem("filters") || "{}");
const initialFilters = storedFilters.filters ? storedFilters.filters : storedFilters;

const storedOption = JSON.parse(localStorage.getItem("characterOption") || "null");
const initialOption = storedOption ? storedOption : null;

const storedResults = JSON.parse(localStorage.getItem("results") || "{}");
const initialResults = storedResults ? storedResults : [];



export const useSearchStore = create<SearchState>((set, get) => ({
    filters: initialFilters,
    results: initialResults,
    characterOption: initialOption,
    searchComic: async () => {
        const results = await fetchComics(get().filters)
        set({results})
        localStorage.setItem("results", JSON.stringify(results))
    },
    setFilters: (newFilters: Partial<ComicFilters>) => {
        const updatedFilters = {...get().filters, ...newFilters}
        localStorage.setItem("filters", JSON.stringify(updatedFilters))
        set({filters: updatedFilters})
    },
    setCharacterOption: (option: Option | null | undefined) => {
        if(option) {
            localStorage.setItem("characterOption", JSON.stringify(option))
            set({characterOption: option})
        } else {
            localStorage.removeItem("characterOption");
            set({ characterOption: null });
        }
    },
    clearFilters: () => {
        set({ filters: {}, results: [], characterOption: null, });
        localStorage.removeItem("filters");
        localStorage.removeItem("results");
        localStorage.removeItem("characterOption");
    }
}))