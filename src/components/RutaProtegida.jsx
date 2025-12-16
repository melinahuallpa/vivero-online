// src/components/RutaProtegida.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function RutaProtegida({ children, adminOnly = false }) {
  const { isAuthenticated, user } = useContext(AuthContext);

  // Si no está logueado, redirige al login
  if (!isAuthenticated) {
    return <Navigate to="/iniciar-sesion" replace />;
  }

  // Si la ruta es solo para admin y no es admin → bloquear
  if (adminOnly && user?.role !== "admin") {
    return <h2 style={{ textAlign: "center", marginTop: "40px" }}>
      ❌ No tienes permiso para acceder a esta sección.
    </h2>;
  }

  return children;
}
