import { describe, it, expect } from "vitest";
import { VALIDATION_SCHEMA } from "./login-validation";

describe("VALIDATION_SCHEMA", () => {
  describe("username validation", () => {
    it("passes with valid username", async () => {
      const result = await VALIDATION_SCHEMA.validateAt("username", {
        username: "admin",
      });
      expect(result).toBe("admin");
    });

    it("fails when username is empty", async () => {
      await expect(
        VALIDATION_SCHEMA.validateAt("username", { username: "" })
      ).rejects.toThrow("El usuario es requerido");
    });

    it("fails when username is less than 3 characters", async () => {
      await expect(
        VALIDATION_SCHEMA.validateAt("username", { username: "ab" })
      ).rejects.toThrow("El usuario debe tener al menos 3 caracteres");
    });

    it("passes when username has exactly 3 characters", async () => {
      const result = await VALIDATION_SCHEMA.validateAt("username", {
        username: "abc",
      });
      expect(result).toBe("abc");
    });
  });

  describe("password validation", () => {
    it("passes with valid password", async () => {
      const result = await VALIDATION_SCHEMA.validateAt("password", {
        password: "123456",
      });
      expect(result).toBe("123456");
    });

    it("fails when password is empty", async () => {
      await expect(
        VALIDATION_SCHEMA.validateAt("password", { password: "" })
      ).rejects.toThrow("La contraseña es requerida");
    });

    it("fails when password is less than 6 characters", async () => {
      await expect(
        VALIDATION_SCHEMA.validateAt("password", { password: "12345" })
      ).rejects.toThrow("La contraseña debe tener al menos 6 caracteres");
    });

    it("passes when password has exactly 6 characters", async () => {
      const result = await VALIDATION_SCHEMA.validateAt("password", {
        password: "123456",
      });
      expect(result).toBe("123456");
    });
  });

  describe("full form validation", () => {
    it("passes with valid credentials", async () => {
      const result = await VALIDATION_SCHEMA.validate({
        username: "admin",
        password: "123456",
      });

      expect(result).toEqual({
        username: "admin",
        password: "123456",
      });
    });

    it("fails with invalid credentials", async () => {
      await expect(
        VALIDATION_SCHEMA.validate({
          username: "",
          password: "",
        })
      ).rejects.toThrow();
    });

    it("validates all fields", async () => {
      await expect(
        VALIDATION_SCHEMA.validate(
          { username: "ab", password: "12345" },
          { abortEarly: false }
        )
      ).rejects.toThrow();
    });
  });
});
