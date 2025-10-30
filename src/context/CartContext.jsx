import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    try {
      const raw = localStorage.getItem("carrito_plantas");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("carrito_plantas", JSON.stringify(carrito));
    } catch {}
  }, [carrito]);

  const vaciarCarrito = () => setCarrito([]);
  const agregarAlCarrito = (producto) => setCarrito(prev => [...prev, producto]);
  const quitarDelCarrito = (id) => setCarrito(prev => prev.filter(p => p.id !== id));
  const total = carrito.reduce((s, it) => s + Number(it.precio || 0), 0);

  return (
    <CartContext.Provider value={{
      carrito,
      setCarrito,
      vaciarCarrito,
      agregarAlCarrito,
      quitarDelCarrito,
      total
    }}>
      {children}
    </CartContext.Provider>
  );
}
