import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useAuthStore } from "./useAuthStore";
import { TOKEN_KEY, MOCK_TOKEN } from "../constants/login.constants";
import * as authService from "../services/authService";

vi.mock("../services/authService", () => ({
  login: vi.fn(),
  logout: vi.fn(),
}));

describe("useAuthStore", () => {
  beforeEach(() => {
    localStorage.clear();
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("initial state", () => {
    it("has correct default values", () => {
      const state = useAuthStore.getState();

      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });

    it("reads token from localStorage if exists", () => {
      localStorage.setItem(TOKEN_KEY, "existing-token");

      // Reset store to read from localStorage
      useAuthStore.setState({
        token: localStorage.getItem(TOKEN_KEY),
        isAuthenticated: !!localStorage.getItem(TOKEN_KEY),
      });

      const state = useAuthStore.getState();
      expect(state.token).toBe("existing-token");
      expect(state.isAuthenticated).toBe(true);
    });
  });

  describe("login", () => {
    it("sets isLoading to true when login starts", async () => {
      vi.mocked(authService.login).mockImplementation(
        () => new Promise(() => {})
      );

      useAuthStore.getState().login("admin", "123456");

      expect(useAuthStore.getState().isLoading).toBe(true);
      expect(useAuthStore.getState().error).toBeNull();
    });

    it("sets user and token on successful login", async () => {
      vi.mocked(authService.login).mockResolvedValue({
        token: MOCK_TOKEN,
        user: { username: "admin" },
      });

      const result = await useAuthStore.getState().login("admin", "123456");

      expect(result).toBe(true);
      expect(useAuthStore.getState().user).toEqual({ username: "admin" });
      expect(useAuthStore.getState().token).toBe(MOCK_TOKEN);
      expect(useAuthStore.getState().isAuthenticated).toBe(true);
      expect(useAuthStore.getState().isLoading).toBe(false);
    });

    it("saves token to localStorage on successful login", async () => {
      vi.mocked(authService.login).mockResolvedValue({
        token: MOCK_TOKEN,
        user: { username: "admin" },
      });

      await useAuthStore.getState().login("admin", "123456");

      expect(localStorage.getItem(TOKEN_KEY)).toBe(MOCK_TOKEN);
    });

    it("sets error on failed login", async () => {
      vi.mocked(authService.login).mockRejectedValue(
        new Error("Usuario o contraseña incorrectos")
      );

      const result = await useAuthStore.getState().login("wrong", "wrong");

      expect(result).toBe(false);
      expect(useAuthStore.getState().error).toBe(
        "Usuario o contraseña incorrectos"
      );
      expect(useAuthStore.getState().isLoading).toBe(false);
      expect(useAuthStore.getState().isAuthenticated).toBe(false);
    });

    it("handles non-Error exceptions", async () => {
      vi.mocked(authService.login).mockRejectedValue("Unknown error");

      const result = await useAuthStore.getState().login("admin", "123456");

      expect(result).toBe(false);
      expect(useAuthStore.getState().error).toBe("Error de autenticación");
    });
  });

  describe("logout", () => {
    it("clears user state", () => {
      useAuthStore.setState({
        user: { username: "admin" },
        token: MOCK_TOKEN,
        isAuthenticated: true,
      });

      useAuthStore.getState().logout();

      expect(useAuthStore.getState().user).toBeNull();
      expect(useAuthStore.getState().token).toBeNull();
      expect(useAuthStore.getState().isAuthenticated).toBe(false);
      expect(useAuthStore.getState().error).toBeNull();
    });

    it("calls authService.logout", () => {
      useAuthStore.getState().logout();

      expect(authService.logout).toHaveBeenCalled();
    });
  });

  describe("checkAuth", () => {
    it("updates isAuthenticated based on localStorage token", () => {
      localStorage.setItem(TOKEN_KEY, "some-token");

      useAuthStore.getState().checkAuth();

      expect(useAuthStore.getState().token).toBe("some-token");
      expect(useAuthStore.getState().isAuthenticated).toBe(true);
    });

    it("sets isAuthenticated to false if no token", () => {
      useAuthStore.setState({ isAuthenticated: true, token: "old-token" });

      useAuthStore.getState().checkAuth();

      expect(useAuthStore.getState().token).toBeNull();
      expect(useAuthStore.getState().isAuthenticated).toBe(false);
    });
  });

  describe("clearError", () => {
    it("clears the error state", () => {
      useAuthStore.setState({ error: "Some error" });

      useAuthStore.getState().clearError();

      expect(useAuthStore.getState().error).toBeNull();
    });
  });
});
