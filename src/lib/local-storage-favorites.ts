const FAVORITES_STORAGE_KEY = "favorite_dog_ids";

export const getFavoriteDogIds = (): string[] => {
  try {
    const item = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    return item ? JSON.parse(item) : [];
  } catch (error) {
    console.error("Error getting favorite dog IDs from localStorage:", error);
    return [];
  }
};

export const addFavoriteDogId = (dogId: string) => {
  const favoriteIds = getFavoriteDogIds();

  if (!favoriteIds.includes(dogId)) {
    favoriteIds.push(dogId);
    try {
      window.localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(favoriteIds)
      );
    } catch (error) {
      console.error("Error adding favorite dog ID to localStorage:", error);
    }
  }
};

export const removeFavoriteDogId = (dogId: string) => {
  const favoriteIds = getFavoriteDogIds();
  const updatedFavorites = favoriteIds.filter((id) => id !== dogId);

  try {
    window.localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(updatedFavorites)
    );
  } catch (error) {
    console.error("Error removing favorite dog ID from localStorage:", error);
  }
};

export const isDogIdFavorite = (dogId: string): boolean => {
  const favoriteIds = getFavoriteDogIds();
  return favoriteIds.includes(dogId);
};
