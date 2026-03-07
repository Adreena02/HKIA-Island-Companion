import { useState, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";

export function WipNotice({ tabId, title, message }) {
  const { th } = useTheme();
  const storageKey = `hkia_wip_dismissed_${tabId}`;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(storageKey);
      if (!dismissed) setVisible(true);
    } catch { setVisible(true); }
  }, [storageKey]);

  const dismiss = () => {
    try { localStorage.setItem(storageKey, "1"); } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 14,
      background: th.wipBg,
      border: `2px solid ${th.wipBorder}`,
      borderRadius: 16, padding: "14px 18px",
      marginBottom: 24,
      boxShadow: "0 4px 16px rgba(245,158,11,0.12)",
      animation: "fadeUp 0.3s ease",
      flexWrap: "wrap",
    }}>
      <span style={{ fontSize: "1.6rem", lineHeight: 1, flexShrink: 0 }}>🏝️</span>
      <div style={{ flex: 1, minWidth: 200 }}>
        <div style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 700, fontSize: "1rem", color: th.wipText, marginBottom: 3 }}>
          {title}
        </div>
        <div style={{ fontSize: "0.85rem", color: th.wipText, opacity: 0.85, lineHeight: 1.5 }}>
          {message}
        </div>
      </div>
      <button
        onClick={dismiss}
        aria-label="Dismiss notice"
        style={{
          background: "none", border: "none", cursor: "pointer",
          fontSize: "1rem", color: th.wipText, opacity: 0.6,
          padding: "0 2px", flexShrink: 0, lineHeight: 1,
          transition: "opacity 0.15s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.6"; }}
      >✕</button>
    </div>
  );
}