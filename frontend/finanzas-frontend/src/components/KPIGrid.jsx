// src/components/KPIGrid.jsx
import PropTypes from "prop-types";

const card = {
  padding: 14,
  border: "1px solid #eee",
  borderRadius: 12,
  background: "#fff",
  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
};

export default function KPIGrid({ kpis = [] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 16 }}>
      {kpis.map((k) => (
        <div key={k.label} style={card}>
          <div style={{ fontSize: 12, color: "#666" }}>{k.label}</div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>{k.value}</div>
        </div>
      ))}
    </div>
  );
}

KPIGrid.propTypes = {
  kpis: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ),
};
