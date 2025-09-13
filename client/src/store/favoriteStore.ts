import { create } from "zustand";
import type { ComicCardType } from "../types";

type FavoritesState = {
  favorites: ComicCardType[];
  quantity: number
  addFavorite: (comic: ComicCardType) => void;
  removeFavorite: (id: number) => void;
  clearFavorites: () => void;
};

const saved = JSON.parse(localStorage.getItem('favorites') || '{"favorites": [], "quantity": 0}');


export const useFavoritesStore = create<FavoritesState>((set) => ({
  favorites: saved.favorites,
  quantity: saved.quantity,

  addFavorite: (comic) =>
    set((state) => {
      const exists = state.favorites.some((fav) => fav.id === comic.id);
      if (exists) return state; // no duplicar
      
      const updatedFavorites = [...state.favorites, comic];
      const updatedQuantity = state.quantity + 1;

      localStorage.setItem(
        'favorites',
        JSON.stringify({ favorites: updatedFavorites, quantity: updatedQuantity})
      )
      
      return { 
        favorites: updatedFavorites,
        quantity: updatedQuantity, 
    };
    }),

  removeFavorite: (id) =>
    set((state) => {
      const updatedFavorites = state.favorites.filter((fav) => fav.id !== id);
      const updatedQuantity = state.quantity - 1;

      localStorage.setItem(
        'favorites',
        JSON.stringify({ favorites: updatedFavorites, quantity: updatedQuantity })
      );

      return { favorites: updatedFavorites, quantity: updatedQuantity };
    }),

  clearFavorites: () => set({ favorites: [] }),
}));