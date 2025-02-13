import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface FavoriteDogsState {
  favoriteDogIds: string[];
  addFavoriteDog: (dogId: string) => void;
  removeFavoriteDog: (dogId: string) => void;
  isFavoriteDog: (dogId: string) => boolean;
}

export const useFavoriteDogsStore = create<FavoriteDogsState>()(
  persist(
    (set, get) => ({
      favoriteDogIds: [],
      addFavoriteDog: (dogId: string) => {
        set((state) => {
          if (state.favoriteDogIds.includes(dogId)) {
            return state;
          }

          return { favoriteDogIds: [...state.favoriteDogIds, dogId] };
        });
      },
      removeFavoriteDog: (dogId: string) => {
        set((state) => {
          return {
            favoriteDogIds: state.favoriteDogIds.filter((id) => id !== dogId),
          };
        });
      },
      isFavoriteDog: (dogId: string) => {
        return get().favoriteDogIds.includes(dogId);
      },
    }),
    {
      name: "favorite-dogs-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
