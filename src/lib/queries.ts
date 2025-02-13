import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { Dog, DogSearchParams, DogSearchResult } from "@/types/dog";
import { Location } from "@/types/location";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { fetchAPI } from "./api";
import { filtersToQueryParams } from "./utils";

export const queryBreeds = queryOptions({
  queryKey: ["breeds"],
  queryFn: async () => fetchAPI<string[]>(API_ENDPOINTS.BREEDS),
});

export const queryDogs = (filters: DogSearchParams) =>
  queryOptions({
    queryKey: ["dogs", filters],
    queryFn: async () => {
      const params = filtersToQueryParams(filters);

      const searchResults = await fetchAPI<DogSearchResult>(
        `${API_ENDPOINTS.DOGS_SEARCH}?${params.toString()}`
      );

      const dogDetails = await fetchAPI<Dog[]>(API_ENDPOINTS.DOGS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchResults.resultIds),
      });

      const dogZips = dogDetails.map((dog) => dog.zip_code);

      const dogLocations = await fetchAPI<Location[]>(API_ENDPOINTS.LOCATIONS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dogZips),
      });

      const enrichedDogDetails = dogDetails.map((dog) => {
        const location = dogLocations
          .filter((location) => !!location)
          .find((location) => location.zip_code === dog.zip_code);

        return {
          ...dog,
          location,
        };
      });

      return {
        data: enrichedDogDetails,
        totalCount: searchResults.total,
      };
    },
    placeholderData: keepPreviousData,
  });

export const queryFavoriteDogs = (dogIds: string[]) =>
  queryOptions({
    queryKey: ["favoriteDogs", dogIds],
    queryFn: async () => {
      if (!dogIds || dogIds.length === 0) {
        return { data: [], totalCount: 0 };
      }

      const dogDetails = await fetchAPI<Dog[]>(API_ENDPOINTS.DOGS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dogIds),
      });

      const dogZips = dogDetails.map((dog) => dog.zip_code);

      const dogLocations = await fetchAPI<Location[]>(API_ENDPOINTS.LOCATIONS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dogZips),
      });

      const enrichedDogDetails = dogDetails.map((dog) => {
        const location = dogLocations
          .filter((location) => !!location)
          .find((location) => location.zip_code === dog.zip_code);

        return {
          ...dog,
          location,
        };
      });

      return { data: enrichedDogDetails, totalCount: dogIds.length };
    },
    enabled: dogIds && dogIds.length > 0, // Enable only if there are dogIds
  });

export const queryMatchDog = (favoriteDogIds: string[]) =>
  queryOptions({
    queryKey: ["matchDog", favoriteDogIds],
    queryFn: async () => {
      if (!favoriteDogIds || favoriteDogIds.length === 0) {
        return { data: [] };
      }

      const matchedDogId = await fetchAPI<{ match: string }>(
        API_ENDPOINTS.DOGS_MATCH,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(favoriteDogIds),
        }
      );

      const dogDetails = await fetchAPI<Dog[]>(API_ENDPOINTS.DOGS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([matchedDogId.match]),
      });

      return { data: dogDetails };
    },
    enabled: favoriteDogIds && favoriteDogIds.length > 0, // Enable only if there are dogIds
  });
