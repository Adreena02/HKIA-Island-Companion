import { TAG_EMOJI } from "../../constants";

export function TagPill({ tag, color = "#c04060", bg = "#ffe8f0", size = "sm", onRemove, onClick }) {
  const emoji = TAG_EMOJI[tag];
  const fontSize = size === "md" ? "0.85rem" : "0.78rem";
  const padding  = size === "md" ? "3px 10px"  : "2px 8px";

  return (
    <span
      title={tag}
      onClick={onClick}
      style={{
        display: "inline-flex", alignItems: "center", gap: 3,
        fontSize, fontWeight: 700, padding, borderRadius: 50,
        background: bg, color,
        cursor: onClick ? "pointer" : "default",
        userSelect: "none",
        transition: onClick ? "all 0.15s ease" : undefined,
      }}
    >
      {emoji ?? tag}
      {onRemove && (
        <button
          onClick={onRemove}
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.75rem", color, padding: 0, lineHeight: 1 }}
        >✕</button>
      )}
    </span>
  );
}