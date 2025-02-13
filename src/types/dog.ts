import { Location } from "@/types/location";

export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
  location?: Location;
}

export interface DogSearchResult {
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
}

export interface DogSearchParams {
  breeds?: string[];
  ageMin?: number;
  ageMax?: number;
  page?: number;
  from?: number;
  size?: number;
  sort?: "breed" | "name" | "age";
  sortDirection?: "asc" | "desc";
  zipCodes?: string;
}

export interface Match {
  match: string;
  dog?: Dog;
}
