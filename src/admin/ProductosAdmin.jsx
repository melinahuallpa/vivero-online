import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ProductosContext } from "../context/ProductosContext";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

function ProductosAdmin() {
  const {
    productos,
    eliminarProducto,
    cargando,
    error,
  } = useContext(ProductosContext);

  const { user } = useContext(AuthContext);

  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 8;

  // 🔴 MODAL
  const [mostrarModal, setMostrarModal] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  // 🔐 PROTECCIÓN ADMIN
  if (!user || user.role !== "admin") {
    return (
      <h2>❌ No tienes permisos para ver esta página.</h2>
    );
  }

  // ⏳ LOADING / ERROR
  if (cargando) {
    return <h2>Cargando productos...</h2>;
  }

  if (error) {
    return <h2 style={{ color: "red" }}>{error}</h2>;
  }

  // 🔍 FILTRADO
  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // 📄 PAGINACIÓN
  const indiceInicial =
    (paginaActual - 1) * productosPorPagina;

  const paginaProductos = productosFiltrados.slice(
    indiceInicial,
    indiceInicial + productosPorPagina
  );

  const totalPaginas = Math.ceil(
    productosFiltrados.length / productosPorPagina
  );

  // 🗑️ CONFIRMAR ELIMINACIÓN
  const confirmarEliminar = async () => {
    const res = await eliminarProducto(productoAEliminar.id);

    if (res?.ok) {
      toast.success(
        "Producto eliminado correctamente 🗑️"
      );
    } else {
      toast.error("Error al eliminar el producto");
    }

    setMostrarModal(false);
    setProductoAEliminar(null);
  };

  return (
    <div className="admin-container">
      <h1>Panel de Productos</h1>

      <Link to="/admin/agregar-producto">
        <button className="btn-admin">
          <FaPlus /> Agregar producto
        </button>
      </Link>

      {/* 🔍 BUSCADOR */}
      <input
        type="text"
        className="buscador-admin"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => {
          setBusqueda(e.target.value);
          setPaginaActual(1);
        }}
      />

      {/* 📦 TABLA */}
      <table className="tabla-admin">
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {paginaProductos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>
                <img
                  src={p.imagen}
                  alt={p.nombre}
                  width="60"
                />
              </td>
              <td>{p.nombre}</td>
              <td>${p.precio}</td>
              <td>
                <Link
                  to={`/admin/editar-producto/${p.id}`}
                >
                  <button className="btn-editar">
                    <FaEdit /> Editar
                  </button>
                </Link>

                <button
                  className="btn-eliminar"
                  onClick={() => {
                    setProductoAEliminar(p);
                    setMostrarModal(true);
                  }}
                >
                  <FaTrash /> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 📄 PAGINACIÓN */}
      <div className="paginacion">
        <button
          disabled={paginaActual === 1}
          onClick={() =>
            setPaginaActual((prev) => prev - 1)
          }
        >
          ◀ Anterior
        </button>

        <span>
          Página {paginaActual} de {totalPaginas}
        </span>

        <button
          disabled={paginaActual === totalPaginas}
          onClick={() =>
            setPaginaActual((prev) => prev + 1)
          }
        >
          Siguiente ▶
        </button>
      </div>

      {/* 🔴 MODAL */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>⚠️ Confirmar eliminación</h3>
            <p>
              ¿Estás segura que querés eliminar el
              producto
              <strong>
                {" "}
                {productoAEliminar?.nombre}
              </strong>
              ?
            </p>

            <div className="modal-actions">
              <button
                className="btn-eliminar"
                onClick={confirmarEliminar}
              >
                Sí, eliminar
              </button>

              <button
                onClick={() => {
                  setMostrarModal(false);
                  setProductoAEliminar(null);
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductosAdmin;
