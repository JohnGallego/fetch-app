import { DogSearchParams } from "@/types/dog";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filtersToQueryParams({
  breeds,
  ageMin,
  ageMax,
  page,
  pageSize,
  sort,
  sortDirection,
}: DogSearchParams): string {
  const params = new URLSearchParams();

  if (pageSize != null) {
    params.append("pageSize", pageSize.toString());
  }

  // Combine sort and sortDirection into a single 'sort' parameter
  if (sort != null && sortDirection != null) {
    params.append("sort", `${sort}:${sortDirection}`);
  }

  if (page != null) {
    params.append("page", page.toString());
  }
  if (ageMin != null) {
    params.append("ageMin", ageMin.toString());
  }
  if (ageMax != null) {
    params.append("ageMax", ageMax.toString());
  }
  // Only add breeds if the array is not empty. Empty array implies all breeds, so we skip adding the param.
  if (breeds && breeds.length > 0) {
    breeds.forEach((breed) => {
      params.append("breeds", breed);
    });
  }

  return params.toString();
}

export function queryParamsToFilters(params: {
  [key: string]: string | string[] | undefined;
}): DogSearchParams {
  const filters: DogSearchParams = {};

  if (params.breeds) {
    filters.breeds = Array.isArray(params.breeds)
      ? params.breeds.map(String)
      : [String(params.breeds)];
  }
  if (params.ageMin) {
    filters.ageMin = Number(params.ageMin);
  }
  if (params.ageMax) {
    filters.ageMax = Number(params.ageMax);
  }
  if (params.page) {
    filters.page = Number(params.page);
  }
  if (params.pageSize) {
    filters.pageSize = Number(params.pageSize);
  }

  // Split the combined 'sort' parameter back into sort and sortDirection
  if (params.sort) {
    const [sort, sortDirection] = (params.sort as string).split(":");
    filters.sort = sort as DogSearchParams["sort"];
    filters.sortDirection = sortDirection as DogSearchParams["sortDirection"];
  }

  return filters;
}
