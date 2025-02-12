export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
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
  pageSize?: number;
  sort?: "breed" | "name" | "age";
  sortDirection?: "asc" | "desc";
}

export interface Match {
  match: string;
  dog?: Dog;
}
