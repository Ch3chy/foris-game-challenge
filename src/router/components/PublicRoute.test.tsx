import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import PublicRoute from "./PublicRoute";

const mockUseAuthStore = vi.fn();

vi.mock("@/modules/auth/stores", () => ({
  useAuthStore: (selector: (state: { isAuthenticated: boolean }) => boolean) =>
    selector({ isAuthenticated: mockUseAuthStore() }),
}));

describe("PublicRoute", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithRouter = (initialRoute = "/public") => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/game" element={<div>Game Page</div>} />
          <Route element={<PublicRoute />}>
            <Route path="/public" element={<div>Public Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
  };

  it("renders outlet content when not authenticated", () => {
    mockUseAuthStore.mockReturnValue(false);

    renderWithRouter();

    expect(screen.getByText("Public Content")).toBeInTheDocument();
    expect(screen.queryByText("Game Page")).not.toBeInTheDocument();
  });

  it("redirects to game when authenticated", () => {
    mockUseAuthStore.mockReturnValue(true);

    renderWithRouter();

    expect(screen.getByText("Game Page")).toBeInTheDocument();
    expect(screen.queryByText("Public Content")).not.toBeInTheDocument();
  });

  it("checks authentication state from store", () => {
    mockUseAuthStore.mockReturnValue(false);

    renderWithRouter();

    expect(mockUseAuthStore).toHaveBeenCalled();
  });
});
