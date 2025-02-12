import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { Dog, DogSearchParams, DogSearchResult } from "@/types/dog";
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

      const searchResult = await fetchAPI<DogSearchResult>(
        `${API_ENDPOINTS.DOGS_SEARCH}?${params.toString()}`
      );

      return fetchAPI<Dog[]>(API_ENDPOINTS.DOGS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchResult.resultIds),
      });
    },
    placeholderData: keepPreviousData,
  });
