import { useTheme } from "../../contexts/ThemeContext";

export function Toast({ message, visible }) {
  const { th } = useTheme();
  return (
    <div style={{
      position: "fixed",
      bottom: 24,
      left: "50%",
      transform: `translateX(-50%) translateY(${visible ? 0 : 80}px)`,
      background: th.toastBg,
      color: th.toastText,
      padding: "10px 24px",
      borderRadius: 50,
      fontWeight: 700,
      fontSize: "0.9rem",
      zIndex: 9999,
      whiteSpace: "nowrap",
      transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
      fontFamily: "'Nunito', sans-serif",
      pointerEvents: "none",
    }}>
      {message}
    </div>
  );
}