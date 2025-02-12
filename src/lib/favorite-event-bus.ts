const FAVORITE_UPDATED_EVENT_NAME = "favorite-updated";

export const dispatchFavoriteUpdatedEvent = () => {
  window.dispatchEvent(new CustomEvent(FAVORITE_UPDATED_EVENT_NAME));
};

export const subscribeToFavoriteUpdates = (handler: () => void) => {
  window.addEventListener(FAVORITE_UPDATED_EVENT_NAME, handler);
  return () => {
    // Return unsubscribe function
    window.removeEventListener(FAVORITE_UPDATED_EVENT_NAME, handler);
  };
};
