// src/components/MovimientoForm.jsx
import { useState } from "react";
import PropTypes from "prop-types";

export default function MovimientoForm({ onSubmit, disabled }) {
  const [tipo, setTipo] = useState("ingreso");
  const [monto, setMonto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [errors, setErrors] = useState({});

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await onSubmit({
      tipo,
      monto,
      descripcion: descripcion || null,
      categoria: categoria || null,
    });
    if (res?.ok) {
      setMonto("");
      setDescripcion("");
      setCategoria("");
      setErrors({});
    } else setErrors(res?.errors || {});
  };

  const input = { width: "100%", padding: "10px 12px", border: "1px solid #e5e7eb", borderRadius: 12 };

  return (
    <form onSubmit={handleAdd} className="form-grid">
      <div>
        <label htmlFor="mf-tipo">Tipo</label>
        <select
          id="mf-tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          style={input}
          disabled={disabled}
        >
          <option value="ingreso">Ingreso</option>
          <option value="gasto">Gasto</option>
        </select>
        {errors.tipo && <small style={{ color: "#b91c1c" }}>{errors.tipo}</small>}
      </div>

      <div>
        <label htmlFor="mf-monto">Monto</label>
        <input
          id="mf-monto"
          type="number"
          step="0.01"
          min="0"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          style={input}
          disabled={disabled}
        />
        {errors.monto && <small style={{ color: "#b91c1c" }}>{errors.monto}</small>}
      </div>

      <div>
        <label htmlFor="mf-desc">Descripción</label>
        <input
          id="mf-desc"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Opcional"
          style={input}
          disabled={disabled}
        />
      </div>

      <div>
        <label htmlFor="mf-cat">Categoría</label>
        <input
          id="mf-cat"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          placeholder="Opcional"
          style={input}
          disabled={disabled}
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={disabled}>
        Agregar
      </button>
    </form>
  );
}

MovimientoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

MovimientoForm.defaultProps = {
  disabled: false,
};
