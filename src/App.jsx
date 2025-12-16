import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Inicio from "./pages/Inicio";
import Servicios from "./pages/Servicios";
import Navbar from "./pages/Navbar";
import Productos from "./pages/Productos";
import DetalleProductos from "./pages/DetalleProductos";
import Pagar from "./pages/Pagar";
import ProtectedRoute from "./components/ProtectedRoute";
import IniciarSesion from "./pages/IniciarSesion";
import Footer from "./pages/Footer";

// ADMIN
import AdminLayout from "./admin/AdminLayout";
import DashboardAdmin from "./admin/DashboardAdmin";
import ProductosAdmin from "./admin/ProductosAdmin";
import AgregarProducto from "./admin/AgregarProducto";
import EditarProducto from "./admin/EditarProducto";

function App() {
  return (
    <div>
      <Navbar />

      {/* 🔔 TOASTIFY GLOBAL */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        theme="colored"
      />

      <Routes>
        {/* PUBLICAS */}
        <Route path="/" element={<Inicio />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/:id" element={<DetalleProductos />} />

        {/* LOGIN */}
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />

        {/* PAGAR */}
        <Route
          path="/pagar"
          element={
            <ProtectedRoute>
              <Pagar />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardAdmin />} />
          <Route path="productos" element={<ProductosAdmin />} />
          <Route path="agregar-producto" element={<AgregarProducto />} />
          <Route path="editar-producto/:id" element={<EditarProducto />} />
        </Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
