/**
 * Shared display components.
 * Tag        — coloured badge pill
 * SearchBar  — styled search input
 * EmptyState — centered placeholder when a list is empty
 */

// ── Tag ────────────────────────────────────────────────────────
const TAG_STYLES = {
  gift:    { bg: "#ffe8f0", color: "#c04060" },
  reward:  { bg: "#e8f8ef", color: "#2a7a5a" },
  ability: { bg: "#ede8ff", color: "#6040a0" },
  empty:   { bg: "#f2eee8", color: "#7a6a6a" },
};

export function Tag({ type = "empty", children }) {
  const s = TAG_STYLES[type];
  return (
    <span style={{
      fontSize: "0.8rem",
      fontWeight: 600,
      padding: "3px 10px",
      borderRadius: 50,
      background: s.bg,
      color: s.color,
      display: "inline-block",
      fontStyle: type === "empty" ? "italic" : "normal",
    }}>
      {children}
    </span>
  );
}

// ── SearchBar ──────────────────────────────────────────────────
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
