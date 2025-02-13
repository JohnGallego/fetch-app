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

  // Breeds
  const breedsParams = encodeBreedsArrayForAPI(filters.breeds);
  breedsParams.forEach((value, key) => {
    params.append(key, value);
  });

  // Sort and Sort Direction - Use encodeSortParamsForAPI
  const sortParams = encodeSortParamsForAPI(
    filters.sort,
    filters.sortDirection
  );
  sortParams.forEach((value, key) => {
    params.append(key, value);
  });

  // Age Range (remains the same)
  if (filters.ageMin !== 0) {
    params.set("ageMin", String(filters.ageMin));
  }
  if (filters.ageMax !== 13) {
    params.set("ageMax", String(filters.ageMax));
  }

  // Zip Codes, Page, Size, From (remain the same)
  if (filters.zipCodes) {
    params.set("zipCodes", filters.zipCodes);
  }
  if (filters.page !== undefined && filters.page > 1) {
    params.set("page", String(filters.page));
  }
  if (filters.size !== undefined) {
    params.set("size", String(filters.size));
  }
  if (filters.page && filters.size) {
    params.set("from", String((filters.page - 1) * filters.size));
  } else {
    params.set("from", String(0));
  }

  return params;
}

export function queryParamsToFilters(params: {
  [key: string]: string | string[] | undefined;
}): DogSearchParams {
  const filters: DogSearchParams = {};

  // Breeds (remains the same)
  filters.breeds = decodeBreedsArrayFromAPI(params);

  // Decode Sort Parameters - Use decodeSortParamsFromAPI
  const decodedSortParams = decodeSortParamsFromAPI(params);
  filters.sort = decodedSortParams.sort;
  filters.sortDirection = decodedSortParams.sortDirection;

  // Age Range, Zip Codes, Page, Size, From (remain the same)
  const ageMinParam = params.ageMin;
  const ageMaxParam = params.ageMax;
  filters.ageMin = ageMinParam === undefined ? 0 : Number(ageMinParam);
  filters.ageMax = ageMaxParam === undefined ? 13 : Number(ageMaxParam);

  const zipCodesParam = params.zipCodes;
  filters.zipCodes =
    zipCodesParam === undefined ? undefined : (zipCodesParam as string);

  if (params.page && typeof params.page === "string") {
    const page = Number(params.page);
    filters.page = page > 0 ? page : 1;
  } else {
    filters.page = 1;
  }

  if (params.size && typeof params.size === "string") {
    filters.size = Number(params.size);
  } else {
    filters.size = DEFAULTS.size;
  }
  if (filters.page && filters.size) {
    filters.from = (filters.page - 1) * filters.size;
  } else {
    filters.from = 0;
  }

  return filters;
}

export const encodeBreedsArrayForAPI = (
  breeds: string[] | undefined
): URLSearchParams => {
  const params = new URLSearchParams();
  if (breeds && breeds.length > 0) {
    breeds.forEach((breed, index) => {
      params.append(`breeds[${index}]`, breed);
    });
  }
  return params;
};

export const decodeBreedsArrayFromAPI = (params: {
  [key: string]: string | string[] | undefined;
}): string[] => {
  const breeds: string[] = [];
  for (const key in params) {
    if (key.startsWith("breeds[")) {
      const value = params[key];
      if (typeof value === "string") {
        breeds.push(value);
      } else if (Array.isArray(value)) {
        breeds.push(
          ...(value.filter((v) => typeof v === "string") as string[])
        );
      }
    }
  }
  return breeds;
};

export const encodeSortParamsForAPI = (
  sort?: DogSearchParams["sort"],
  sortDirection?: DogSearchParams["sortDirection"]
): URLSearchParams => {
  const params = new URLSearchParams();
  if (sort && sortDirection) {
    params.set("sort", `${sort}:${sortDirection}`);
  }
  return params;
};

export const decodeSortParamsFromAPI = (params: {
  [key: string]: string | string[] | undefined;
}): Pick<DogSearchParams, "sort" | "sortDirection"> => {
  const sortParams: Pick<DogSearchParams, "sort" | "sortDirection"> = {};
  const sortParam = params.sort;

  if (typeof sortParam === "string") {
    const [field, direction] = sortParam.split(":");
    if (field && direction && (direction === "asc" || direction === "desc")) {
      sortParams.sort = field as DogSearchParams["sort"];
      sortParams.sortDirection = direction as DogSearchParams["sortDirection"];
    }
  }
  return sortParams;
};
