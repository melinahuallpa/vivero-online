import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function DashboardAdmin() {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== "admin") {
    return <h2>❌ No tienes permisos para ver esta página.</h2>;
  }

  return (
    <div className="dashboard-admin">
      <h1>Panel de Administración</h1>
      <p>Bienvenido, {user.nombre}</p>

      <div className="dashboard-grid">
        <Link to="/admin/productos" className="dashboard-card">
          <h2>📦 Productos</h2>
          <p>Administrar y editar productos.</p>
        </Link>

        <Link to="/admin/usuarios" className="dashboard-card">
          <h2>👤 Usuarios</h2>
          <p>(Opcional) Ver usuarios registrados.</p>
        </Link>

        <Link to="/admin/ordenes" className="dashboard-card">
          <h2>🧾 Órdenes</h2>
          <p>(Opcional) Ver compras realizadas.</p>
        </Link>
      </div>
    </div>
  );
}
