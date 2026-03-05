import type { RouteObject } from "react-router-dom";
import Auth from "./auth";
import Login from "./views/login/login";

export const authRoutes: RouteObject[] = [
  {
    path: "auth",
    element: <Auth />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
];
