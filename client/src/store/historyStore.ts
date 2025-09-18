import { create } from "zustand"
import type { ComicCardType } from "../types"



type HistoryStore = {
    historyComics: ComicCardType[]
    addToHistory: (comic: ComicCardType) => void
}

const saved = JSON.parse(localStorage.getItem('history') || '[]');

export const useHistoryStore = create<HistoryStore>((set) => ({
    historyComics: saved,

    addToHistory: (comic) => {
        set((state) => {
            const exists = state.historyComics.some(c => c.id === comic.id)
            if(exists) return state

            const updatedHistory = [comic, ...state.historyComics]

            if(state.historyComics.length > 8) {
                updatedHistory.pop()
            }

            localStorage.setItem(
                'history',
                JSON.stringify(updatedHistory)
            )

            return {
                historyComics: updatedHistory
            }
        })
    }
}))