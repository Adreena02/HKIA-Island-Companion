import { useState } from "react";

export function QtyBtn({ onClick, children }) {
  const [hov, setHov] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 28, height: 28,
        borderRadius: "50%",
        border: "none",
        background: hov ? "#ff8fa3" : "#f2eee8",
        cursor: "pointer",
        fontSize: "1rem",
        fontWeight: 700,
        color: hov ? "#fff" : "#3a2e2e",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.15s, color 0.15s",
      }}
    >
      {children}
    </button>
  );
}