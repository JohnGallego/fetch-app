export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  BREEDS: `${API_BASE_URL}/dogs/breeds`,
  DOGS_SEARCH: `${API_BASE_URL}/dogs/search`,
  DOGS: `${API_BASE_URL}/dogs`,
  DOGS_MATCH: `${API_BASE_URL}/dogs/match`,
  LOCATIONS: `${API_BASE_URL}/locations`,
  LOCATIONS_SEARCH: `${API_BASE_URL}/locations/search`,
};
