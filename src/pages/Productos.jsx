import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductosContext } from "../context/ProductosContext";
import { CarritoContext } from "../context/CarritoContext";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

function Productos() {
  const { productos, cargando, error } = useContext(ProductosContext);
  const { addToCart } = useContext(CarritoContext);
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // 🔍 BÚSQUEDA
  const [busqueda, setBusqueda] = useState("");

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // 📄 PAGINACIÓN
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 6;

  const indiceInicial = (paginaActual - 1) * productosPorPagina;
  const indiceFinal = indiceInicial + productosPorPagina;

  const paginaProductos = productosFiltrados.slice(
    indiceInicial,
    indiceFinal
  );

  const totalPaginas = Math.ceil(
    productosFiltrados.length / productosPorPagina
  );

  // ⏳ LOADING / ERROR
  if (cargando) return <h2>Cargando productos...</h2>;
  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

  return (
      <>
    <Helmet>
      <title>Productos | Vivero Urbano</title>
      <meta
        name="description"
        content="Explorá nuestro catálogo de plantas y productos para tu jardín urbano."
      />
    </Helmet>
    <div className="productos-container">
      <h1>Nuestro Catálogo</h1>
      <hr />

      {/* 🔍 BUSCADOR */}
      <input
        type="text"
        placeholder="Buscar por nombre..."
        className="buscador"
        value={busqueda}
        onChange={(e) => {
          setBusqueda(e.target.value);
          setPaginaActual(1);
        }}
      />

      {/* 👑 BOTÓN ADMIN */}
      {user?.role === "admin" && (
        <Link to="/agregar-producto">
          <button className="btn-admin">➕ Agregar producto</button>
        </Link>
      )}

      {/* 🧱 GRID DE PRODUCTOS */}
      <div className="productos-grid">
        {paginaProductos.map((p) => (
          <div key={p.id} className="producto-card">
            <img
              src={p.imagen}
              alt={p.nombre}
              className="producto-img"
            />

            <h3>{p.nombre}</h3>
            <p className="precio">${p.precio}</p>

            <div className="botones-card">
              <Link to={`/productos/${p.id}`}>
                <button className="btn-detalle">
                  Ver detalle
                </button>
              </Link>

              <button
                className="btn-carrito"
                onClick={() => {
                  if (!isAuthenticated) {
                    toast.error(
                      "Debes iniciar sesión para agregar al carrito"
                    );
                    navigate("/iniciar-sesion");
                    return;
                  }

                  addToCart(p);
                  toast.success("Producto agregado al carrito 🛒");
                }}
              >
                Agregar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 📄 PAGINACIÓN */}
      <div className="paginacion">
        <button
          disabled={paginaActual === 1}
          onClick={() => setPaginaActual((prev) => prev - 1)}
        >
          ◀ Anterior
        </button>

        <span>
          Página {paginaActual} de {totalPaginas}
        </span>

        <button
          disabled={paginaActual === totalPaginas}
          onClick={() => setPaginaActual((prev) => prev + 1)}
        >
          Siguiente ▶
        </button>
      </div>
    </div>
      </>
  );
}

export default Productos;
