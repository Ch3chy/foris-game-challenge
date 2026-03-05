import { describe, it, expect, vi, beforeEach } from "vitest";
import { login, logout } from "./authService";
import { VALID_CREDENTIALS, MOCK_TOKEN } from "../constants/login.constants";

describe("authService", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  describe("login", () => {
    it("returns token and user on valid credentials", async () => {
      const loginPromise = login(
        VALID_CREDENTIALS.username,
        VALID_CREDENTIALS.password
      );

      vi.advanceTimersByTime(1000);

      const result = await loginPromise;

      expect(result).toEqual({
        token: MOCK_TOKEN,
        user: { username: VALID_CREDENTIALS.username },
      });
    });

    it("throws error on invalid username", async () => {
      const loginPromise = login("wronguser", VALID_CREDENTIALS.password);

      vi.advanceTimersByTime(1000);

      await expect(loginPromise).rejects.toThrow(
        "Usuario o contraseña incorrectos"
      );
    });

    it("throws error on invalid password", async () => {
      const loginPromise = login(VALID_CREDENTIALS.username, "wrongpassword");

      vi.advanceTimersByTime(1000);

      await expect(loginPromise).rejects.toThrow(
        "Usuario o contraseña incorrectos"
      );
    });

    it("throws error on empty credentials", async () => {
      const loginPromise = login("", "");

      vi.advanceTimersByTime(1000);

      await expect(loginPromise).rejects.toThrow(
        "Usuario o contraseña incorrectos"
      );
    });

    it("simulates API delay", async () => {
      const loginPromise = login(
        VALID_CREDENTIALS.username,
        VALID_CREDENTIALS.password
      );

      // El timer está pendiente antes de avanzar
      expect(vi.getTimerCount()).toBe(1);

      vi.advanceTimersByTime(1000);
      await loginPromise;

      // El timer ya se ejecutó
      expect(vi.getTimerCount()).toBe(0);
    });
  });

  describe("logout", () => {
    it("removes auth_token from localStorage", () => {
      localStorage.setItem("auth_token", "some-token");
      expect(localStorage.getItem("auth_token")).toBe("some-token");

      logout();

      expect(localStorage.getItem("auth_token")).toBeNull();
    });

    it("does not throw if token does not exist", () => {
      expect(() => logout()).not.toThrow();
    });
  });
});
