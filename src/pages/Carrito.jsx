import React, { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { Link } from "react-router-dom";

function Carrito() {
  const { cartItems, removeFromCart, clearCart, total } = useContext(CarritoContext);

  return (
    <div>
      <h1>Carrito de Compras</h1>
      <hr />

      {cartItems.length === 0 ? (
        <p>El carrito está vacío 🌿</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="carrito-item">
              <img src={item.imagen} alt={item.nombre} width="120" />
              <h3>{item.nombre}</h3>
              <p>${item.precio}</p>
              <button onClick={() => removeFromCart(item.id)}>
                Quitar
              </button>
            </div>
          ))}

          <h2>Total: ${total}</h2>

          <button onClick={clearCart}>Vaciar carrito</button>

          <Link to="/pagar">
            <button>Ir al pago</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Carrito;
