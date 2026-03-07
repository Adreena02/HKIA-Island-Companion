import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";

const BTN_VARIANTS = {
  coral:  { bg: "#ff8fa3", color: "#fff",    shadow: "rgba(232,99,124,0.35)",  hover: "#e8637c" },
  mint:   { bg: "#6dcfaa", color: "#fff",    shadow: "rgba(109,207,170,0.35)", hover: "#4db88a" },
  lav:    { bg: "#d4b8f0", color: "#5a3e8a", shadow: "rgba(180,140,230,0.3)",  hover: "#c4a0e8" },
  ghost:  { bg: null, color: null, shadow: "transparent", hover: null },
  danger: { bg: "#ffb3b3", color: "#c0392b", shadow: "transparent", hover: "#ff9191" },
};

export function Btn({ variant = "coral", onClick, children, small, style: extra }) {
  const { th } = useTheme();
  const v = BTN_VARIANTS[variant];
  const [hov, setHov] = useState(false);

  const isGhost = variant === "ghost";
  const bg    = isGhost ? (hov ? th.pillBgHover : th.pillBg) : (hov ? v.hover : v.bg);
  const color = isGhost ? th.textSub : v.color;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "'Nunito', sans-serif",
        fontWeight: 700,
        fontSize: small ? "0.82rem" : "0.9rem",
        padding: small ? "5px 14px" : "9px 20px",
        border: isGhost ? `2px solid ${th.borderStrong}` : "none",
        borderRadius: 50,
        cursor: "pointer",
        background: bg,
        color,
        boxShadow: `0 3px 12px ${v.shadow}`,
        transform: hov ? "translateY(-2px)" : "none",
        transition: "all 0.18s ease",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        ...extra,
      }}
    >
      {children}
    </button>
  );
}