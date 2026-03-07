import { useTheme } from "../../contexts/ThemeContext";

export function FormGroup({ label, hint, children }) {
  const { th } = useTheme();
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{
        display: "block", fontSize: "0.82rem", fontWeight: 700,
        color: th.textSub, marginBottom: 5,
        textTransform: "uppercase", letterSpacing: "0.06em",
      }}>
        {label}
      </label>
      {children}
      {hint && <div style={{ fontSize: "0.77rem", color: th.textSub, marginTop: 3 }}>{hint}</div>}
    </div>
  );
}

export function Input({ value, onChange, placeholder, type = "text", min, style: extra }) {
  const { th } = useTheme();
  const base = {
    width: "100%", padding: "10px 14px",
    border: `2px solid ${th.inputBorder}`,
    borderRadius: 12, fontFamily: "'Nunito', sans-serif",
    fontSize: "0.95rem", color: th.text,
    background: th.input, outline: "none",
    boxSizing: "border-box", transition: "border-color 0.2s, background 0.2s",
  };
  return (
    <input
      type={type} value={value} onChange={onChange}
      placeholder={placeholder} min={min}
      style={{ ...base, ...extra }}
      onFocus={(e) => { e.target.style.borderColor = "#ff8fa3"; }}
      onBlur={(e)  => { e.target.style.borderColor = th.inputBorder; }}
    />
  );
}

export function Select({ value, onChange, options }) {
  const { th } = useTheme();
  const base = {
    width: "100%", padding: "10px 14px",
    border: `2px solid ${th.inputBorder}`,
    borderRadius: 12, fontFamily: "'Nunito', sans-serif",
    fontSize: "0.95rem", color: th.text,
    background: th.input, outline: "none",
    boxSizing: "border-box", cursor: "pointer",
    transition: "border-color 0.2s",
  };
  return (
    <select value={value} onChange={onChange} style={base}
      onFocus={(e) => { e.target.style.borderColor = "#ff8fa3"; }}
      onBlur={(e)  => { e.target.style.borderColor = th.inputBorder; }}
    >
      {options.map((o) => (
        <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
      ))}
    </select>
  );
}