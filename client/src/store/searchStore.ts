import { create } from "zustand"
import fetchComics, { type ComicFilters } from "../api/MarvelAPI"
import type { ComicCardType } from "../types"
import type { Option } from "../components/SideBar/SideBar"



type SearchState = {
    filters: ComicFilters
    resultsByPage: Record<number, ComicCardType[]>
    characterOption: Option | null
    page: number
    total: number
    limit: number
    setFilters: (filters: ComicFilters) => void
    setCharacterOption: (characterOption : Option | null | undefined) => void
    searchComic: () => Promise<void>
    clearFilters: () => void
    setPage: (page: number) => void
    nextPage: () => void
    prevPage: () => void
}



const storedFilters = JSON.parse(localStorage.getItem("filters") || "{}");
const initialFilters = storedFilters.filters ? storedFilters.filters : storedFilters;

const storedOption = JSON.parse(localStorage.getItem("characterOption") || "null");
const initialOption = storedOption ? storedOption : null;

const storedResults = JSON.parse(localStorage.getItem("resultsByPage") || "{}");
const initialResults = storedResults ? storedResults : {};

const storedTotal = JSON.parse(localStorage.getItem("total") || "0")
const initialTotal = storedTotal ? storedTotal : 0

const storedPage = JSON.parse(localStorage.getItem("actualPage") || "1")
const initialPage = storedPage ? storedPage : 1



export const useSearchStore = create<SearchState>((set, get) => ({
    filters: initialFilters,
    resultsByPage: initialResults,
    characterOption: initialOption,
    page: initialPage,
    total: initialTotal,
    limit: 16,
    searchComic: async () => {
        const { filters, page, limit, resultsByPage } = get()
        if(resultsByPage[page]) return;
        const offset = (page - 1) * limit
        const newFilters = {...filters, offset, limit}
        const {comics, total} = await fetchComics(newFilters)
        set({
            resultsByPage: {
                ...resultsByPage, [page]: comics
            },
            total
        })
        localStorage.setItem(
            "resultsByPage",
            JSON.stringify({
                ...resultsByPage, [page]: comics
            })
        )
        localStorage.setItem("total", total.toString());

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
        set({ filters: {}, resultsByPage: {}, characterOption: null, total: 0, page: 1 });
        localStorage.removeItem("filters");
        localStorage.removeItem("resultsByPage");
        localStorage.removeItem("characterOption");
        localStorage.removeItem("total");
        localStorage.removeItem('actualPage')
    },
    setPage: (page) => {
        set({page})
        localStorage.setItem("actualPage", page.toString())
        get().searchComic()
    },
    nextPage: () => {
        const { page, limit, total } = get()
        if(page * limit < total) {
            set({
                page: page + 1
            })
            localStorage.setItem("actualPage", page.toString())
            get().searchComic()
        }
    },
    prevPage: () => {
        const { page } = get();
        if (page > 1) {
            set({
                page: page - 1 
            });
            localStorage.setItem("actualPage", page.toString())
            get().searchComic();
        }
    }
}))