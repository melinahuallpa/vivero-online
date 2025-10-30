import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext'

function Navbar({ isAuthenticated, setIsAuthenticated, setUsuario, usuario }) {
  const { carrito } = useContext(CartContext);
  const navigate = useNavigate();

  const logout = () => {
    setIsAuthenticated(false);
    setUsuario({ nombre: "", email: "" });
    navigate('/');
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/servicios">Servicios</Link></li>
        <li><Link to="/productos">Productos</Link></li>
      </ul>

      <div className="nav-right">
        {isAuthenticated ? (
          <>
            <span className="nav-user">Hola, {usuario.nombre}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/iniciar-sesion"><button>Iniciar sesión</button></Link>
        )}

        <Link to="/pagar" className="carrito-link">
          Carrito ({carrito.length})
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
