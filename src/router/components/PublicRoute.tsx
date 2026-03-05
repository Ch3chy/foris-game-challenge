import type { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/modules/auth/stores";

const PublicRoute: FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/game" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
