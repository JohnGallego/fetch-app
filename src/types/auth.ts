export type User = {
  name: string;
  email: string;
  favorites?: string[];
};

export interface LoginResponse {
  status: number;
  message?: string;
}

export interface LogoutResponse {
  status: number;
  message?: string;
}
