import React from 'react'

function Inicio() {
  return (
    <>
      <section className="hero">
        <img
          src="https://wallpapers.com/images/hd/plant-background-mh4y9mexexlv960o.jpg"
          alt="Vivero Plantas Urbano"
        />
        <div className="hero-texto">
          <h1>Bienvenido a <span>Plantas Urbano</span></h1>
          <p>Cultivamos especies tropicales y exóticas para amantes de la naturaleza 🌱</p>
        </div>
      </section>

      <section className="info-cards">
        <div className="card-info">
          <h3>🌿 Plantas Tropicales</h3>
          <p>Descubrí variedades únicas, ideales para coleccionistas y espacios con estilo.</p>
        </div>

        <div className="card-info">
          <h3>🌸 Asesoramiento</h3>
          <p>Te ayudamos a mantener tus plantas sanas, fuertes y radiantes todo el año.</p>
        </div>

        <div className="card-info">
          <h3>🌎 Sustentabilidad</h3>
          <p>Promovemos el cultivo responsable con envases reciclables y prácticas ecológicas.</p>
        </div>
      </section>
    </>
  );
}

export default Inicio;
