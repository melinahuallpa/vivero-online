import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!user.trim()) return alert("Ingresa un nombre de usuario");
    localStorage.setItem("user_plantas", user);
    navigate("/productos");
  };

  return (
    <div>
      <h2>Login (simulado)</h2>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Tu nombre"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
      <p>Ojo: este login es local y simulado (para rutas protegidas).</p>
    </div>
  );
}
