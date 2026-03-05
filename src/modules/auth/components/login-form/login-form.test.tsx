import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import LoginForm from "./login-form";

describe("LoginForm", () => {
  const defaultProps = {
    onSubmit: vi.fn(),
    isLoading: false,
    error: null,
  };

  describe("Rendering", () => {
    it("renders username field", () => {
      render(<LoginForm {...defaultProps} />);
      expect(screen.getByLabelText("Usuario")).toBeInTheDocument();
    });

    it("renders password field", () => {
      render(<LoginForm {...defaultProps} />);
      expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
    });

    it("renders submit button", () => {
      render(<LoginForm {...defaultProps} />);
      expect(
        screen.getByRole("button", { name: /iniciar sesión/i })
      ).toBeInTheDocument();
    });

    it("shows error message when error prop is provided", () => {
      render(<LoginForm {...defaultProps} error="Invalid credentials" />);
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });

    it("does not show error message when error is null", () => {
      render(<LoginForm {...defaultProps} error={null} />);
      expect(screen.queryByText("Invalid credentials")).not.toBeInTheDocument();
    });
  });

  describe("Loading state", () => {
    it("shows 'Iniciando...' when loading", () => {
      render(<LoginForm {...defaultProps} isLoading={true} />);
      expect(
        screen.getByRole("button", { name: /iniciando/i })
      ).toBeInTheDocument();
    });

    it("disables submit button when loading", () => {
      render(<LoginForm {...defaultProps} isLoading={true} />);
      expect(
        screen.getByRole("button", { name: /iniciando/i })
      ).toBeDisabled();
    });

    it("shows 'Iniciar sesión' when not loading", () => {
      render(<LoginForm {...defaultProps} isLoading={false} />);
      expect(
        screen.getByRole("button", { name: /iniciar sesión/i })
      ).toBeInTheDocument();
    });
  });

  describe("Form validation", () => {
    it("shows error when username is empty on blur", async () => {
      const user = userEvent.setup();
      render(<LoginForm {...defaultProps} />);

      const usernameField = screen.getByLabelText("Usuario");
      await user.click(usernameField);
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText("El usuario es requerido")).toBeInTheDocument();
      });
    });

    it("shows error when password is empty on blur", async () => {
      const user = userEvent.setup();
      render(<LoginForm {...defaultProps} />);

      const passwordField = screen.getByLabelText("Contraseña");
      await user.click(passwordField);
      await user.tab();

      await waitFor(() => {
        expect(
          screen.getByText("La contraseña es requerida")
        ).toBeInTheDocument();
      });
    });

    it("shows error when username is less than 3 characters", async () => {
      const user = userEvent.setup();
      render(<LoginForm {...defaultProps} />);

      const usernameField = screen.getByLabelText("Usuario");
      await user.type(usernameField, "ab");
      await user.tab();

      await waitFor(() => {
        expect(
          screen.getByText("El usuario debe tener al menos 3 caracteres")
        ).toBeInTheDocument();
      });
    });

    it("shows error when password is less than 6 characters", async () => {
      const user = userEvent.setup();
      render(<LoginForm {...defaultProps} />);

      const passwordField = screen.getByLabelText("Contraseña");
      await user.type(passwordField, "12345");
      await user.tab();

      await waitFor(() => {
        expect(
          screen.getByText("La contraseña debe tener al menos 6 caracteres")
        ).toBeInTheDocument();
      });
    });
  });

  describe("Form submission", () => {
    it("calls onSubmit with username and password on valid form", async () => {
      const user = userEvent.setup();
      const handleSubmit = vi.fn();
      render(<LoginForm {...defaultProps} onSubmit={handleSubmit} />);

      await user.type(screen.getByLabelText("Usuario"), "admin");
      await user.type(screen.getByLabelText("Contraseña"), "123456");
      await user.click(screen.getByRole("button", { name: /iniciar sesión/i }));

      await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalledWith("admin", "123456");
      });
    });

    it("does not call onSubmit when form is invalid", async () => {
      const user = userEvent.setup();
      const handleSubmit = vi.fn();
      render(<LoginForm {...defaultProps} onSubmit={handleSubmit} />);

      await user.click(screen.getByRole("button", { name: /iniciar sesión/i }));

      await waitFor(() => {
        expect(handleSubmit).not.toHaveBeenCalled();
      });
    });

    it("does not call onSubmit with invalid username", async () => {
      const user = userEvent.setup();
      const handleSubmit = vi.fn();
      render(<LoginForm {...defaultProps} onSubmit={handleSubmit} />);

      await user.type(screen.getByLabelText("Usuario"), "ab");
      await user.type(screen.getByLabelText("Contraseña"), "123456");
      await user.click(screen.getByRole("button", { name: /iniciar sesión/i }));

      await waitFor(() => {
        expect(handleSubmit).not.toHaveBeenCalled();
      });
    });
  });

  describe("User input", () => {
    it("updates username field value", async () => {
      const user = userEvent.setup();
      render(<LoginForm {...defaultProps} />);

      const usernameField = screen.getByLabelText("Usuario");
      await user.type(usernameField, "testuser");

      expect(usernameField).toHaveValue("testuser");
    });

    it("updates password field value", async () => {
      const user = userEvent.setup();
      render(<LoginForm {...defaultProps} />);

      const passwordField = screen.getByLabelText("Contraseña");
      await user.type(passwordField, "testpass");

      expect(passwordField).toHaveValue("testpass");
    });
  });
});
