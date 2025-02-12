import { DogSearchParams } from "@/types/dog";

export const DEFAULTS: Required<DogSearchParams> = {
  breeds: [],
  ageMin: 0,
  ageMax: 13,
  page: 0,
  from: 0,
  size: 20,
  sort: "breed",
  sortDirection: "asc",
};

export const SORT_FIELDS: Array<"breed" | "name" | "age"> = [
  "breed",
  "name",
  "age",
];

export const SORT_ORDER: Array<"asc" | "desc"> = ["asc", "desc"];
