// src/components/DonutChart.jsx
import PropTypes from "prop-types";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import React from "react";

const COLORS = ["#10b981","#0ea5e9","#a78bfa","#f59e0b","#ef4444","#14b8a6"];
const INNER_RADIUS = 55;
const OUTER_RADIUS = 80;
const PADDING_ANGLE = 4;

function DonutChart({ data = [] }) {
  if (!data.length) {
    return <div style={{ color: "#64748b" }}>No data</div>;
  }

  const keyFor = (d, i) => (d?.name ? `${d.name}-${i}` : `item-${i}`);

  return (
    <div className="card" aria-label="investments-chart">
      <div style={{ fontWeight: 700, marginBottom: 8 }}>Investments</div>

      <div style={{ height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={INNER_RADIUS}
              outerRadius={OUTER_RADIUS}
              paddingAngle={PADDING_ANGLE}
              isAnimationActive={false}
            >
              {data.map((_, i) => (
                <Cell key={keyFor(_, i)} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {data.map((d, i) => (
          <div
            key={keyFor(d, i)}
            className="badge"
            style={{ display: "inline-flex", gap: 6, alignItems: "center" }}
          >
            <span
              aria-hidden
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: COLORS[i % COLORS.length],
              }}
            />
            {d.name}
          </div>
        ))}
      </div>
    </div>
  );
}

DonutChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ),
};

export default React.memo(DonutChart);
