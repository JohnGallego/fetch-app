import { DEFAULTS } from "@/constants/search";
import { DogSearchParams } from "@/types/dog";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filtersToQueryParams(
  filters: DogSearchParams
): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.breeds && filters.breeds.length > 0) {
    params.set("breeds", filters.breeds.join(","));
  }

  // Age Range - Remove params if they are at their "no restriction" values
  if (filters.ageMin !== 0) {
    // Remove ageMin param if it's 0
    params.set("ageMin", String(filters.ageMin));
  }

  if (filters.ageMax !== 13) {
    // Remove ageMax param if it's 13
    params.set("ageMax", String(filters.ageMax));
  }

  if (filters.sort !== undefined && filters.sort !== DEFAULTS.sort) {
    params.set("sort", filters.sort);
  }

  if (
    filters.sortDirection !== undefined &&
    filters.sortDirection !== DEFAULTS.sortDirection
  ) {
    params.set("sortDirection", filters.sortDirection);
  }

  if (filters.page !== undefined && filters.page > 1) {
    // Only set page if it's > 1 for cleaner URLs, page 1 is default
    params.set("page", String(filters.page));
  }

  if (filters.size !== undefined) {
    params.set("size", String(filters.size));
  }

  if (filters.page && filters.size) {
    params.set("from", String((filters.page - 1) * filters.size));
  } else {
    params.set("from", String(0)); // Default from to 0 if page or pageSize is missing (shouldn't happen with defaults)
  }

  return params;
}

export function queryParamsToFilters(params: {
  [key: string]: string | string[] | undefined;
}): DogSearchParams {
  const filters: DogSearchParams = {};

  if (params.breeds) {
    if (typeof params.breeds === "string") {
      filters.breeds = params.breeds.split(",");
    } else if (Array.isArray(params.breeds)) {
      filters.breeds = params.breeds.flatMap((breed) =>
        typeof breed === "string" ? breed.split(",") : []
      );
    }
  }

  // Age Range - Handle missing params as 0 and 13 respectively
  const ageMinParam = params.ageMin;
  const ageMaxParam = params.ageMax;
  filters.ageMin = ageMinParam === undefined ? 0 : Number(ageMinParam); // Missing ageMin = 0
  filters.ageMax = ageMaxParam === undefined ? 13 : Number(ageMaxParam); // Missing ageMax = 13

  if (params.sort && typeof params.sort === "string") {
    filters.sort = params.sort as "breed" | "name" | "age";
  }

  if (params.sortDirection && typeof params.sortDirection === "string") {
    filters.sortDirection = params.sortDirection as "asc" | "desc";
  }

  if (params.page && typeof params.page === "string") {
    const page = Number(params.page);
    filters.page = page > 0 ? page : 1; // Ensure page is at least 1
  } else {
    filters.page = 1; // Default to page 1
  }

  if (params.size && typeof params.size === "string") {
    filters.size = Number(params.size);
  } else {
    filters.size = DEFAULTS.size; // Use default page size if not in params
  }

  // Calculate 'from' based on 'page' and 'pageSize'
  if (filters.page && filters.size) {
    filters.from = (filters.page - 1) * filters.size;
  } else {
    filters.from = 0; // Default from to 0 if page or pageSize is missing (shouldn't happen with defaults)
  }

  return filters;
}
