import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const { isAuthenticated } = useContext(AuthContext);

  const [cartItems, setCartItems] = useState(() => {
    try {
      const raw = localStorage.getItem("cart_items");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart_items", JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  const addToCart = (product) => {
    if (!isAuthenticated) {
      return alert("Debes iniciar sesión para agregar productos al carrito");
    }
    setCartItems((prev) => [...prev, product]);
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const total = cartItems.reduce((sum, item) => sum + Number(item.precio || 0), 0);

  return (
    <CarritoContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        total,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}
