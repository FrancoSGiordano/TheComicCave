import { create } from "zustand";
import type { ComicCardType } from "../types";

type FavoritesState = {
  favorites: ComicCardType[]
  visibleFavorites: ComicCardType[]
  quantity: number
  page: number
  pageSize: number
  addFavorite: (comic: ComicCardType) => void;
  removeFavorite: (id: number) => void;
  clearFavorites: () => void;
  setPage: (page: number) => void
  nextPage: () => void
  prevPage: () => void
};


const saved = JSON.parse(localStorage.getItem('favorites') || '{"favorites": [], "quantity": 0}');


export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: saved.favorites,
  quantity: saved.quantity,
  visibleFavorites: saved.favorites.slice(0, 8),
  page: 1,
  pageSize: 8,
  addFavorite: (comic) =>
    set((state) => {
      const exists = state.favorites.some((fav) => fav.id === comic.id);
      if (exists) return state; // no duplicar
      
      const updatedFavorites = [...state.favorites, comic];
      const updatedQuantity = state.quantity + 1;

      const totalPages = Math.ceil(updatedFavorites.length / state.pageSize)

      const newPage = state.page > totalPages ? totalPages : state.page

      const start = (newPage - 1) * state.pageSize

      const end = start + state.pageSize

      localStorage.setItem(
        'favorites',
        JSON.stringify({ favorites: updatedFavorites, quantity: updatedQuantity})
      )
      
      return { 
        favorites: updatedFavorites,
        quantity: updatedQuantity,
        visibleFavorites: updatedFavorites.slice(start, end) 
    };
    }),

  removeFavorite: (id) =>
    set((state) => {
      const updatedFavorites = state.favorites.filter((fav) => fav.id !== id);
      const updatedQuantity = state.quantity - 1;

      const totalPages = Math.ceil(updatedFavorites.length / state.pageSize)

      const newPage = state.page > totalPages ? totalPages : state.page

      const start = (newPage - 1) * state.pageSize

      const end = start + state.pageSize

      localStorage.setItem(
        'favorites',
        JSON.stringify({ favorites: updatedFavorites, quantity: updatedQuantity })
      );

      return { favorites: updatedFavorites, quantity: updatedQuantity, visibleFavorites: updatedFavorites.slice(start, end)};
    }),

  clearFavorites: () => set({ favorites: [] }),
  setPage: (page) => {
    const { favorites, pageSize } = get();
    const totalPages = Math.ceil(favorites.length / pageSize)
    if(page < 1 || page > totalPages) return
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    set({
      page: page,
      visibleFavorites: favorites.slice(start, end)
    })
  },
  nextPage: () => {
    const { page, favorites, pageSize } = get()
    const totalPages = Math.ceil(favorites.length / pageSize)
    if(page < totalPages) {
      const newPage = page + 1
      const start = (newPage - 1) * pageSize
      set({
        page: newPage,
        visibleFavorites: favorites.slice(start, start + pageSize)
      })
    }
  },
  prevPage: () => {
    const { page, favorites, pageSize } = get()
    if(page > 1) {
      const newPage = page - 1
      const start = (newPage - 1) * pageSize
      set({
        page: newPage,
        visibleFavorites: favorites.slice(start, start + pageSize)
      })
    }
  }
}));