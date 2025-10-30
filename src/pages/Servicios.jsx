import React from 'react'
import { Link } from 'react-router-dom'

function Servicios() {
  return (
    <div className="servicios-container">
      <h1>Servicios</h1>
      <hr />
      <p className="intro-servicios">
        Ofrecemos asistencia completa para el cuidado de tus plantas, desde la raíz hasta las hojas 🌱
      </p>

      <section className="cards-servicios">
        <div className="servicio-card">
          <img src="https://cdn-icons-png.flaticon.com/512/4345/4345577.png" alt="Riego" />
          <h3>💧 Asesoría de Riego</h3>
          <p>Aprendé a regar correctamente según la especie, estación y tipo de sustrato.</p>
        </div>

        <div className="servicio-card">
          <img src="https://cdn-icons-png.flaticon.com/512/762/762742.png" alt="Trasplante" />
          <h3>🪴 Trasplante</h3>
          <p>Realizamos el cambio de maceta cuidando el crecimiento y la salud de la planta.</p>
        </div>

        <div className="servicio-card">
          <img src="https://cdn-icons-png.flaticon.com/512/3722/3722241.png" alt="Abonado" />
          <h3>🌿 Abonado y Nutrición</h3>
          <p>Te asesoramos sobre los mejores nutrientes naturales para cada tipo de planta.</p>
        </div>

        <div className="servicio-card">
          <img src="https://cdn-icons-png.flaticon.com/512/7666/7666622.png" alt="Mantenimiento" />
          <h3>🌸 Mantenimiento</h3>
          <p>Servicios de limpieza, poda y control de plagas para mantener tu jardín impecable.</p>
        </div>
      </section>

      <Link to="/">
        <button className="btn-volver">Volver al Inicio</button>
      </Link>
    </div>
  );
}

export default Servicios;