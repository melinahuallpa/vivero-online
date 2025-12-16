import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, user } = useContext(AuthContext);

  // ❌ Usuario NO logueado
  if (!isAuthenticated) {
    return <Navigate to="/iniciar-sesion" replace />;
  }

  // ❌ Usuario logueado pero NO admin
  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // ✅ Todo OK
  return children;
}

export default ProtectedRoute;
