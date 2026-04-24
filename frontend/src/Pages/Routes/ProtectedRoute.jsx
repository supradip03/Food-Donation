import { Navigate } from "react-router-dom";
import { isTokenValid, getRole } from "../../Context/authContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  // if not logged in or expired
  if (!isTokenValid()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
