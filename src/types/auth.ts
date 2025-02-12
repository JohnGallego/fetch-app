export type User = {
  id: string;
  name: string;
  email: string;
  token: string;
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
