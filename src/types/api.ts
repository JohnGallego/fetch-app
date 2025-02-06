import { ApiError } from "./error";

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}
