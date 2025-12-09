import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/store";
import { ROUTES } from "@/constants";

export function ProtectedRoute() {
  const user = useAppSelector((s) => s.auth.user);

  if (!user) {
    return <Navigate to={ROUTES.login} replace />;
  }

  return <Outlet />;
}
