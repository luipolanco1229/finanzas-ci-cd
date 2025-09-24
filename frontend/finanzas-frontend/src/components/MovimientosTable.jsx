// src/components/MovimientosTable.jsx
import React from 'react';
import PropTypes from 'prop-types';

const HEADERS = ['#', 'Tipo', 'Monto', 'Descripción', 'Categoría', ''];
const WRAP_STYLE = { overflowX: 'auto' };
const EMPTY_STYLE = { padding: 12, textAlign: 'center', color: '#64748b' };

// key estable: usa m.id si existe; si no, compón una firma con campos
function keyFor(m, i) {
  return m.id != null
    ? `mov-${m.id}`
    : `${m.tipo}-${m.descripcion ?? ''}-${m.categoria ?? ''}-${i}`;
}

function MovimientosTable({ movimientos = [], onDelete, disabled = false }) {
  return (
    <div style={WRAP_STYLE}>
      <table className="table" role="table">
        <thead>
          <tr>
            {HEADERS.map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {movimientos.map((m, i) => (
            <tr key={keyFor(m, i)}>
              <td>{i}</td>
              <td>{m.tipo}</td>
              <td>{m.monto}</td>
              <td>{m.descripcion ?? '—'}</td>
              <td>{m.categoria ?? '—'}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => onDelete(i)}
                  disabled={disabled}
                  aria-label={`Eliminar movimiento ${i}`}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}

          {movimientos.length === 0 && (
            <tr>
              <td colSpan={HEADERS.length} style={EMPTY_STYLE}>
                Sin movimientos todavía.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

MovimientosTable.propTypes = {
  movimientos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      tipo: PropTypes.oneOf(['ingreso', 'gasto']).isRequired,
      monto: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      descripcion: PropTypes.string,
      categoria: PropTypes.string,
    })
  ),
  onDelete: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default React.memo(MovimientosTable);