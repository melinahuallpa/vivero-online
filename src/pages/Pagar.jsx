import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Pagar({
  isAuthenticated,
  setIsAuthenticated,
  usuario,
  setUsuario,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { carrito: carritoContext, vaciarCarrito } = useContext(CartContext);

  // Prioriza carrito pasado por state, si no existe usa el del contexto
  const carrito = location.state?.carrito || carritoContext || [];

  const total = carrito.reduce(
    (suma, producto) => suma + Number(producto.precio || 0),
    0
  );

  const comprar = () => {
    alert("¡Compra realizada con éxito!");
    vaciarCarrito();
    navigate("/productos");
  };

  const cerrarSesion = () => {
    setIsAuthenticated(false);
    setUsuario({ nombre: "", email: "" });
    navigate("/");
  };

  return (
    <div>
      <div>
        <h2>{usuario?.nombre || "Usuario"}</h2>
        <p>Email: {usuario?.email || "-"}</p>
        <button onClick={cerrarSesion}>Cerrar sesión</button>
        <hr />
      </div>

      <div>
        <h2>Tu compra:</h2>

        {carrito.length === 0 ? <p>No hay productos en el carrito.</p> : (
          carrito.map((producto) => (
            <div key={producto.id} className="item-pagar">
              <img src={producto.avatar} alt={producto.nombre} width="60" />
              <span>{producto.nombre}</span>
              <strong>${producto.precio}</strong>
            </div>
          ))
        )}

        <h3>Total a pagar: ${total.toFixed(2)}</h3>
      </div>

      <div style={{ marginTop: ".6rem" }}>
        <button onClick={comprar} disabled={carrito.length === 0}>Confirmar y Pagar</button>
        <button onClick={() => navigate("/productos")} style={{ marginLeft: ".6rem" }}>Cancelar</button>
      </div>
    </div>
  );
}
