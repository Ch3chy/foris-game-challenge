import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const mockUseAuthStore = vi.fn();

vi.mock("@/modules/auth/stores", () => ({
  useAuthStore: (selector: (state: { isAuthenticated: boolean }) => boolean) =>
    selector({ isAuthenticated: mockUseAuthStore() }),
}));

describe("ProtectedRoute", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithRouter = (initialRoute = "/protected") => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/auth/login" element={<div>Login Page</div>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/protected" element={<div>Protected Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
  };

  it("renders outlet content when authenticated", () => {
    mockUseAuthStore.mockReturnValue(true);

    renderWithRouter();

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
    expect(screen.queryByText("Login Page")).not.toBeInTheDocument();
  });

  it("redirects to login when not authenticated", () => {
    mockUseAuthStore.mockReturnValue(false);

    renderWithRouter();

    expect(screen.getByText("Login Page")).toBeInTheDocument();
    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });

  it("checks authentication state from store", () => {
    mockUseAuthStore.mockReturnValue(true);

    renderWithRouter();

    expect(mockUseAuthStore).toHaveBeenCalled();
  });
});
