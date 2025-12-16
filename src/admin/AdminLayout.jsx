import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AdminLayout() {
  const { user } = useContext(AuthContext);


  return (
    <div className="admin-layout">

      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <h2 className="sidebar-title">ADMIN</h2>

        <nav>
          <ul>
            <li><Link to="/admin">🏠 Dashboard</Link></li>
            <li><Link to="/admin/productos">📦 Productos</Link></li>
            <li><Link to="/admin/usuarios">👤 Usuarios</Link></li>
            <li><Link to="/admin/ordenes">🧾 Órdenes</Link></li>
          </ul>
        </nav>
      </aside>

      {/* CONTENIDO */}
      <main className="admin-content">
        <Outlet />
      </main>

    </div>
  );
}
