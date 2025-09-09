import { create } from "zustand";
import type { FavoriteComic } from "../types";

type FavoritesState = {
  favorites: FavoriteComic[];
  quantity: number
  addFavorite: (comic: FavoriteComic) => void;
  removeFavorite: (id: number) => void;
  clearFavorites: () => void;
};

export const useFavoritesStore = create<FavoritesState>((set) => ({
  favorites: [],
  quantity: 0,

  addFavorite: (comic) =>
    set((state) => {
      const exists = state.favorites.some((fav) => fav.id === comic.id);
      if (exists) return state; // no duplicar
      return { 
        favorites: [...state.favorites, comic],
        quantity: state.quantity + 1 
    };
    }),

  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((fav) => fav.id !== id),
      quantity: state.quantity - 1
    })),

  clearFavorites: () => set({ favorites: [] }),
}));