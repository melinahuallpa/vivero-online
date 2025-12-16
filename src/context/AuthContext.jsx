// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";

// Crear el contexto
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Estado global de usuario
  const [user, setUser] = useState(null);

  // Al iniciar la app, reviso si hay usuario en localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Función de login (simulada)
  const login = (email, password) => {
    // Simulamos validación
    if (email === "admin@plantasurbano.com" && password === "123456") {
      const userData = {
        email,
        role: "admin",
        name: "Administrador",
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return { ok: true };
    }

    return { ok: false, msg: "Credenciales incorrectas" };
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Booleano útil
  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
