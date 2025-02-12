import { DogSearchParams } from "@/types/dog";

export const DEFAULTS: Required<DogSearchParams> = {
  breeds: [],
  ageMin: 1,
  ageMax: 10,
  page: 0,
  pageSize: 20,
  sort: "breed",
  sortDirection: "asc",
};

export const SORT_FIELDS: Array<"breed" | "name" | "age"> = [
  "breed",
  "name",
  "age",
];

export const SORT_ORDER: Array<"asc" | "desc"> = ["asc", "desc"];
