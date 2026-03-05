import { createBrowserRouter, Navigate } from "react-router-dom";
import { authRoutes } from "@/modules/auth/routes";
import { gameRoutes } from "@/modules/game/routes";
import { ProtectedRoute, PublicRoute } from "./components";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Navigate to="/auth/login" replace />,
    },
    {
      element: <PublicRoute />,
      children: authRoutes,
    },
    {
      element: <ProtectedRoute />,
      children: gameRoutes,
    },
  ],
  {
    basename: "/foris-game-challenge",
  }
);
