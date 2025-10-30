import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CarritoCompras from "./Carrito";
import { CartContext } from "../context/CartContext";

const MOCKAPI_URL = "https://68f010480b966ad50031d81b.mockapi.io/productos";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const { agregarAlCarrito } = useContext(CartContext);
  const { carrito, setCarrito } = useContext(CartContext);

  useEffect(() => {
    setCargando(true);
    fetch(MOCKAPI_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Respuesta no OK");
        return res.json();
      })
      .then((datos) => {
        setProductos(datos);
        setCargando(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Hubo un problema al cargar las plantas. Revisa MOCKAPI_URL.");
        setCargando(false);
      });
  }, []);

  const agregar = (producto) => {
    agregarAlCarrito(producto);
    alert(`🌿 ${producto.nombre} agregado al carrito`);
  };

  if (cargando) return <p>Cargando plantas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <ul id="lista-productos">
        {productos.map((producto) => (
          <li key={producto.id}>
            <h2>{producto.nombre}</h2>
            <p>{producto.descripcion}</p>
            <p><strong>${producto.precio}</strong></p>
            <img src={producto.avatar} alt={producto.nombre} width="80%" />
            <div style={{ marginTop: ".6rem" }}>
              <Link to={`/productos/${producto.categoria || 'sin-categoria'}/${producto.id}`} state={{producto}}>
                <button>Más detalles</button>
              </Link>
              <button onClick={() => agregar(producto)} style={{ marginLeft: ".6rem" }}>
                Comprar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Carrito mostrado debajo */}
      <CarritoCompras />
    </>
  );
}

