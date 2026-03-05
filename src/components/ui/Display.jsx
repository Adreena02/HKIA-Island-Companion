/**
 * Shared display components.
 * SearchBar  — styled search input
 * EmptyState — centered placeholder when a list is empty
 */
export function SearchBar({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: "100%",
        padding: "10px 18px",
        border: "2px solid rgba(255,255,255,0.7)",
        borderRadius: 50,
        fontFamily: "'Nunito', sans-serif",
        fontSize: "0.95rem",
        background: "rgba(255,255,255,0.65)",
        backdropFilter: "blur(8px)",
        color: "#3a2e2e",
        outline: "none",
        marginBottom: 18,
        boxSizing: "border-box",
        transition: "border-color 0.2s, background 0.2s",
      }}
      onFocus={(e) => { e.target.style.borderColor = "#ff8fa3"; e.target.style.background = "#fff"; }}
      onBlur={(e)  => { e.target.style.borderColor = "rgba(255,255,255,0.7)"; e.target.style.background = "rgba(255,255,255,0.65)"; }}
    />
  );
}

// ── EmptyState ─────────────────────────────────────────────────
export function EmptyState({ icon, title, sub }) {
  return (
    <div style={{
      textAlign: "center",
      padding: "60px 20px",
      color: "#7a6a6a",
      gridColumn: "1 / -1",
    }}>
      <div style={{ fontSize: "3.5rem", marginBottom: 14 }}>{icon}</div>
      <p style={{ fontWeight: 700, fontSize: "1rem" }}>{title}</p>
      <small style={{ fontSize: "0.85rem" }}>{sub}</small>
    </div>
  );
}
