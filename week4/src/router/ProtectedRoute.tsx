import { Navigate } from "react-router-dom";
import { ROUTES } from "@router/constants/routes";
import { isAuthenticated } from "@utils/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!isAuthenticated()) {
    return <Navigate to={ROUTES.LOG_IN} replace />;
  }

  return <>{children}</>;
}
