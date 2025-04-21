import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isChecking } = useAuth();
  const location = useLocation();
  

  if (!isAuthenticated && !isChecking) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;