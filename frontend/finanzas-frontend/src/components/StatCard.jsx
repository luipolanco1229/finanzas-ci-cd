// src/components/StatCard.jsx
import PropTypes from "prop-types";

export default function StatCard({ title, amount, trend }) {
  const positive = trend?.startsWith("+");
  return (
    <div className="card">
      <div className="stat">
        <div className="title">{title}</div>
        <div className="number">{amount}</div>
      </div>
      {trend && (
        <div className={positive ? "trend-up" : "trend-down"} style={{ marginTop: 6 }}>
          {trend}
        </div>
      )}
    </div>
  );
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  trend: PropTypes.string, // ej: "+4%" o "-1%"
};
