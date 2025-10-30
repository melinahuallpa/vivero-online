import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function CarritoCompras() {
  const navigate = useNavigate();
  const { carrito, setCarrito, vaciarCarrito, quitarDelCarrito, total } = useContext(CartContext);

  const irAPagar = () => {
    navigate("/pagar", { state: { carrito } });
  };

  return (
    <div id="carrito">
      <hr />
      <h2>Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          {carrito.map((item) => (
            <div key={item.id} className="item-carrito">
              <img src={item.avatar} alt={item.nombre} width="60" />
              <div className="item-info">
                <strong>{item.nombre}</strong>
                <div>${Number(item.precio).toFixed(2)}</div>
              </div>
              <div>
                <button onClick={() => quitarDelCarrito(item.id)}>Quitar</button>
              </div>
            </div>
          ))}
          <div>
            <hr />
            <div>Total: ${Number(total).toFixed(2)}</div>
          </div>
          <div style={{ marginTop: ".6rem" }}>
            <button onClick={vaciarCarrito}>Vaciar Carrito</button>
            <button onClick={irAPagar} style={{ marginLeft: ".6rem" }}>Pagar</button>
          </div>
        </>
      )}
    </div>
  );
}
