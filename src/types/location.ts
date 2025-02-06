export interface Location {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface LocationSearchResult {
  results: Location[];
  total: number;
}

export interface LocationSearchParams {
  city?: string;
  states?: string[];
  geoBoundingBox?: {
    top?: Coordinates;
    left?: Coordinates;
    bottom?: Coordinates;
    right?: Coordinates;
    bottom_left?: Coordinates;
    top_right?: Coordinates;
  };
  size?: number;
  from?: number;
}

export interface GeoBoundingBox {
  top?: Coordinates;
  left?: Coordinates;
  bottom?: Coordinates;
  right?: Coordinates;
  bottom_left?: Coordinates;
  top_right?: Coordinates;
}
