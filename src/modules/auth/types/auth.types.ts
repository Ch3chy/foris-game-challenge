export interface LoginResponse {
  token: string;
  user: {
    username: string;
  };
}

export interface LoginError {
  message: string;
}
