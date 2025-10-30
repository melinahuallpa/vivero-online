import { Link, useParams, useLocation } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductoDetalle = () => {
  const { id } = useParams();
  const location = useLocation();
  const producto = location.state?.producto;
  const { agregarAlCarrito } = useContext(CartContext);

  if (!producto) {
    return (
      <div>
        <p>No se pudo cargar el producto</p>
        <Link to="/productos">
          <button>Volver a Productos</button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <h2>Detalles del Producto {id}</h2>
      <div className="detalle-producto">
        <img src={producto.avatar} alt={producto.nombre} width="40%" />
        <div>
          <h3>{producto.nombre}</h3>
          <p><strong>Descripción:</strong> {producto.descripcion}</p>
          <p><strong>Precio:</strong> ${producto.precio}</p>
          <button onClick={() => { agregarAlCarrito(producto); alert("Producto agregado al carrito"); }}>
            Agregar al carrito
          </button>
        </div>
      </div>
      <hr />
      <Link to={`/productos`}><button>Volver</button></Link>
    </>
  );
};
export default ProductoDetalle;
