import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductosContext } from "../context/ProductosContext";
import { CarritoContext } from "../context/CarritoContext";
import { AuthContext } from "../context/AuthContext";

function DetalleProductos() {
  const { id } = useParams();
  const { productos } = useContext(ProductosContext);
  const { addToCart } = useContext(CarritoContext);
  const { isAuthenticated } = useContext(AuthContext);

  const producto = productos.find((p) => p.id == id); // aseguramos coincidencia

  if (!producto) {
    return <h2>Producto no encontrado 🥀</h2>;
  }

  const handleAgregar = () => {
    if (!isAuthenticated) {
      alert("Debes iniciar sesión para agregar productos al carrito.");
      window.location.href = "/iniciar-sesion";
      return;
    }

    addToCart(producto);
    alert("Producto agregado al carrito ✔️");
  };

  return (
    <div className="detalle-container">
      <img src={producto.imagen} alt={producto.nombre} width="300" />
      <h2>{producto.nombre}</h2>
      <p>{producto.descripcion}</p>
      <h3>${producto.precio}</h3>

      <button onClick={handleAgregar}>Agregar al carrito</button>

      <br /><br />
      <Link to="/productos">Volver</Link>
    </div>
  );
}

export default DetalleProductos;

