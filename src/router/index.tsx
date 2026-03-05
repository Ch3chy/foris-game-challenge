import { createBrowserRouter, Navigate } from "react-router-dom";
import { authRoutes } from "@/modules/auth/routes";
import { gameRoutes } from "@/modules/game/routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth/login" replace />,
  },
  ...authRoutes,
  ...gameRoutes,
]);
