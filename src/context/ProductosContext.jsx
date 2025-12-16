import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductosContext = createContext();

export function ProductosProvider({ children }) {
  const API_URL = "https://66ddb48c4ea6581431d82e63.mockapi.io/productos";

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 6;

  // 🔄 Obtener todos los productos
  const fetchProductos = async () => {
    try {
      setCargando(true);
      const res = await axios.get(API_URL);
      setProductos(res.data);
      setError(null);
    } catch (e) {
      setError("Error al cargar los productos.");
    } finally {
      setCargando(false);
    }
  };

  // Cargar productos al iniciar
  useEffect(() => {
    fetchProductos();
  }, []);

  // 🟢 Crear producto
  const agregarProducto = async (nuevoProducto) => {
    try {
      const res = await axios.post(API_URL, nuevoProducto);
      setProductos((prev) => [...prev, res.data]);
      return { ok: true };
    } catch {
      return { ok: false, error: "No se pudo agregar el producto" };
    }
  };

  // 🟡 Editar producto
  const editarProducto = async (id, datosActualizados) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, datosActualizados);
      setProductos((prev) =>
        prev.map((p) => (p.id === id ? res.data : p))
      );
      return { ok: true };
    } catch {
      return { ok: false, error: "No se pudo editar el producto" };
    }
  };

  // 🔴 Eliminar producto
  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProductos((prev) => prev.filter((p) => p.id !== id));
      return { ok: true };
    } catch {
      return { ok: false, error: "No se pudo eliminar el producto" };
    }
  };

  // 🔎 Obtener producto por ID (para editar)
  const obtenerProductoPorId = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/${id}`);
      return res.data;
    } catch {
      return null;
    }
  };

  // 🔍 Filtro por búsqueda
  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // 📄 Paginación
  const indexInicial = (paginaActual - 1) * itemsPorPagina;
  const productosPagina = productosFiltrados.slice(
    indexInicial,
    indexInicial + itemsPorPagina
  );

  const totalPaginas = Math.ceil(productosFiltrados.length / itemsPorPagina);

  return (
    <ProductosContext.Provider
      value={{
        productos,
        cargando,
        error,
        busqueda,
        setBusqueda,
        paginaActual,
        setPaginaActual,
        productosPagina,
        totalPaginas,
        fetchProductos,
        agregarProducto,
        editarProducto,
        eliminarProducto,
        obtenerProductoPorId,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
}
