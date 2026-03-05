import { MOCK_TOKEN, VALID_CREDENTIALS } from "../constants/login.constants";
import type { LoginResponse } from "../types/auth.types";

export const login = async (
  username: string,
  password: string,
): Promise<LoginResponse> => {
  // Simular delay de llamada a API
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (
    username === VALID_CREDENTIALS.username &&
    password === VALID_CREDENTIALS.password
  ) {
    return {
      token: MOCK_TOKEN,
      user: { username },
    };
  }

  throw new Error("Usuario o contraseña incorrectos");
};

export const logout = (): void => {
  localStorage.removeItem("auth_token");
};
