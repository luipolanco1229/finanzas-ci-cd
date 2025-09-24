// src/components/Sidebar.jsx
export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span style={{ width: 28, height: 28, background: "#14b8a6", borderRadius: 8, display: "inline-block" }} />
        <span>Finans</span>
      </div>

      <nav className="nav" aria-label="Main">
        <button type="button" className="active nav-btn">
          <span role="img" aria-label="home">🏠</span> Overview
        </button>
        <button type="button" className="nav-btn">
          <span role="img" aria-label="budgets">📊</span> Budgets
        </button>
        <button type="button" className="nav-btn">
          <span role="img" aria-label="expenses">💸</span> Expenses
        </button>
        <button type="button" className="nav-btn">
          <span role="img" aria-label="investments">📈</span> Investments
        </button>
      </nav>

      <div style={{ marginTop: "auto" }} className="card">
        <div style={{ fontWeight: 700, marginBottom: 6 }}>Have a question?</div>
        <div style={{ color: "#8aa0b3", fontSize: 13, marginBottom: 10 }}>
          Send us a message and we will get back to you in no time.
        </div>
        <button className="btn btn-primary" style={{ width: "100%" }}>Contact us</button>
      </div>
    </aside>
  );
}
