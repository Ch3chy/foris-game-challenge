import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Login from "./login";

const mockNavigate = vi.fn();
const mockLogin = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../stores", () => ({
  useAuthStore: () => ({
    login: mockLogin,
    isLoading: false,
    error: null,
  }),
}));

describe("Login View", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderLogin = () => {
    return render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  };

  describe("Rendering", () => {
    it("renders logo", () => {
      renderLogin();
      expect(screen.getByAltText("Rick and Morty")).toBeInTheDocument();
    });

    it("renders login form with username field", () => {
      renderLogin();
      expect(screen.getByLabelText(/usuario/i)).toBeInTheDocument();
    });

    it("renders login form with password field", () => {
      renderLogin();
      expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    });

    it("renders submit button", () => {
      renderLogin();
      expect(
        screen.getByRole("button", { name: /iniciar sesión/i })
      ).toBeInTheDocument();
    });

    it("renders forgot password link", () => {
      renderLogin();
      expect(
        screen.getByText(/¿olvidaste tu usuario o contraseña?/i)
      ).toBeInTheDocument();
    });
  });

  describe("Login flow", () => {
    it("calls login with credentials on form submit", async () => {
      mockLogin.mockResolvedValue(true);
      const user = userEvent.setup();

      renderLogin();

      await user.type(screen.getByLabelText(/usuario/i), "admin");
      await user.type(screen.getByLabelText(/contraseña/i), "123456");
      await user.click(screen.getByRole("button", { name: /iniciar sesión/i }));

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith("admin", "123456");
      });
    });

    it("navigates to /game on successful login", async () => {
      mockLogin.mockResolvedValue(true);
      const user = userEvent.setup();

      renderLogin();

      await user.type(screen.getByLabelText(/usuario/i), "admin");
      await user.type(screen.getByLabelText(/contraseña/i), "123456");
      await user.click(screen.getByRole("button", { name: /iniciar sesión/i }));

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith("/game");
      });
    });

    it("does not navigate on failed login", async () => {
      mockLogin.mockResolvedValue(false);
      const user = userEvent.setup();

      renderLogin();

      await user.type(screen.getByLabelText(/usuario/i), "wronguser");
      await user.type(screen.getByLabelText(/contraseña/i), "wrongpass");
      await user.click(screen.getByRole("button", { name: /iniciar sesión/i }));

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith("wronguser", "wrongpass");
      });

      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
