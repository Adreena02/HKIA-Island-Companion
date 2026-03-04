/**
 * Shared form primitive components.
 * FormGroup  — labelled wrapper with optional hint text
 * Input      — styled text / number input
 * Select     — styled dropdown
 */

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  border: "2px solid rgba(180,130,130,0.2)",
  borderRadius: 12,
  fontFamily: "'Nunito', sans-serif",
  fontSize: "0.95rem",
  color: "#3a2e2e",
  background: "#f2eee8",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s, background 0.2s",
};

const focusHandlers = {
  onFocus: (e) => { e.target.style.borderColor = "#ff8fa3"; e.target.style.background = "#fff"; },
  onBlur:  (e) => { e.target.style.borderColor = "rgba(180,130,130,0.2)"; e.target.style.background = "#f2eee8"; },
};

// ── FormGroup ──────────────────────────────────────────────────
export function FormGroup({ label, hint, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{
        display: "block",
        fontSize: "0.82rem",
        fontWeight: 700,
        color: "#7a6a6a",
        marginBottom: 5,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
      }}>
        {label}
      </label>
      {children}
      {hint && (
        <div style={{ fontSize: "0.77rem", color: "#7a6a6a", marginTop: 3 }}>{hint}</div>
      )}
    </div>
  );
}

// ── Input ──────────────────────────────────────────────────────
export function Input({ value, onChange, placeholder, type = "text", min, style: extra }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      style={{ ...inputStyle, ...extra }}
      {...focusHandlers}
    />
  );
}

// ── Select ─────────────────────────────────────────────────────
export function Select({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={onChange}
      style={{ ...inputStyle, cursor: "pointer" }}
      {...focusHandlers}
    >
      {options.map((o) => (
        <option key={o.value ?? o} value={o.value ?? o}>
          {o.label ?? o}
        </option>
      ))}
    </select>
  );
}
