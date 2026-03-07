import { useTheme } from "../../contexts/ThemeContext";

export function SearchBar({ value, onChange, placeholder }) {
  const { th } = useTheme();
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: "100%",
        padding: "10px 18px",
        border: `2px solid ${th.inputBorder}`,
        borderRadius: 50,
        fontFamily: "'Nunito', sans-serif",
        fontSize: "0.95rem",
        background: th.input,
        backdropFilter: "blur(8px)",
        color: th.text,
        outline: "none",
        marginBottom: 18,
        boxSizing: "border-box",
        transition: "border-color 0.2s, background 0.2s",
      }}
      onFocus={(e) => { e.target.style.borderColor = "#ff8fa3"; }}
      onBlur={(e)  => { e.target.style.borderColor = th.inputBorder; }}
    />
  );
}

export function EmptyState({ icon, title, sub }) {
  const { th } = useTheme();
  return (
    <div style={{ textAlign: "center", padding: "60px 20px", color: th.textSub, gridColumn: "1 / -1" }}>
      <div style={{ fontSize: "3.5rem", marginBottom: 14 }}>{icon}</div>
      <p style={{ fontWeight: 700, fontSize: "1rem" }}>{title}</p>
      <small style={{ fontSize: "0.85rem" }}>{sub}</small>
    </div>
  );
}