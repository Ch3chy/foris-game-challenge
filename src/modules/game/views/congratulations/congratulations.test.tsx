import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Congratulations from "./congratulations";

const mockLogout = vi.fn();
const mockResetGame = vi.fn();

vi.mock("@/stores", () => ({
  useAuthStore: () => ({
    logout: mockLogout,
  }),
  useGameStore: () => ({
    turns: 10,
    resetGame: mockResetGame,
  }),
}));

describe("Congratulations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders congratulations title", () => {
      render(<Congratulations />);

      expect(screen.getByText("¡Felicidades!")).toBeInTheDocument();
    });

    it("renders turns count from store", () => {
      render(<Congratulations />);

      expect(
        screen.getByText("Terminaste el juego con 10 turnos")
      ).toBeInTheDocument();
    });

    it("renders Repetir button", () => {
      render(<Congratulations />);

      expect(
        screen.getByRole("button", { name: /repetir/i })
      ).toBeInTheDocument();
    });

    it("renders Inicio button", () => {
      render(<Congratulations />);

      expect(
        screen.getByRole("button", { name: /inicio/i })
      ).toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    it("calls resetGame when Repetir button is clicked", async () => {
      const user = userEvent.setup();

      render(<Congratulations />);

      await user.click(screen.getByRole("button", { name: /repetir/i }));

      expect(mockResetGame).toHaveBeenCalledTimes(1);
    });

    it("calls logout when Inicio button is clicked", async () => {
      const user = userEvent.setup();

      render(<Congratulations />);

      await user.click(screen.getByRole("button", { name: /inicio/i }));

      expect(mockLogout).toHaveBeenCalledTimes(1);
    });
  });
});
