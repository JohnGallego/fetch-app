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
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: number;
  sort?: string; // e.g., "breed:asc"
}

export interface Match {
  match: string;
  dog?: Dog;
}
