import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductosContext } from "../context/ProductosContext";
import { toast } from "react-toastify";

function AgregarProducto() {
  const { agregarProducto } = useContext(ProductosContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    imagen: "",
    descripcion: "",
  });

  const [errores, setErrores] = useState([]);

  // -------------------------
  // HANDLE CHANGE
  // -------------------------
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // -------------------------
  // VALIDACIONES
  // -------------------------
  const validarFormulario = () => {
    const erroresTemp = [];

    if (!form.nombre.trim()) {
      erroresTemp.push("El nombre es obligatorio");
    }

    if (!form.precio || Number(form.precio) <= 0) {
      erroresTemp.push("El precio debe ser mayor a 0");
    }

    if (!form.descripcion || form.descripcion.length < 10) {
      erroresTemp.push("La descripción debe tener al menos 10 caracteres");
    }

    setErrores(erroresTemp);
    return erroresTemp.length === 0;
  };

  // -------------------------
  // SUBMIT
  // -------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      toast.error("Corrige los errores del formulario");
      return;
    }

    const res = await agregarProducto(form);

    if (res?.ok) {
      toast.success("Producto agregado correctamente ✅");
      navigate("/admin/productos");
    } else {
      toast.error(res?.error || "Error al agregar el producto");
    }
  };

  return (
    <div className="admin-container">
      <h1>Agregar Producto</h1>

      {/* ERRORES */}
      {errores.length > 0 && (
        <ul style={{ color: "red", marginBottom: "15px" }}>
          {errores.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="form-admin">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
        />

        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
        />

        <input
          type="text"
          name="imagen"
          placeholder="URL de imagen"
          value={form.imagen}
          onChange={handleChange}
        />

        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
        />

        <button type="submit" className="btn-admin">
          Guardar producto
        </button>
      </form>
    </div>
  );
}

export default AgregarProducto;
