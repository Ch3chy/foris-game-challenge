import { create } from "zustand";
import { login as loginService, logout as logoutService } from "../services";
import type { AuthState } from "./state";
import { TOKEN_KEY } from "../constants/login.constants";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem(TOKEN_KEY),
  isAuthenticated: !!localStorage.getItem(TOKEN_KEY),
  isLoading: false,
  error: null,

  login: async (username: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await loginService(username, password);
      localStorage.setItem(TOKEN_KEY, response.token);
      set({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
      });
      return true;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error de autenticación";
      set({ error: message, isLoading: false });
      return false;
    }
  },

  logout: () => {
    logoutService();
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
  },

  checkAuth: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    set({
      token,
      isAuthenticated: !!token,
    });
  },

  clearError: () => set({ error: null }),
}));
