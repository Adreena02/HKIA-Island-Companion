import { TAG_EMOJI } from "../../constants";

/**
 * TagPill
 * Displays a tag as an emoji pill with the tag name as a hover tooltip.
 * Falls back to the tag name text if no emoji mapping exists.
 *
 * Props:
 *  - tag: string
 *  - color: string  — text/border color (default pink)
 *  - bg: string     — background color (default light pink)
 *  - size: "sm" | "md" (default "sm")
 *  - onRemove: optional () => void — shows a ✕ button if provided
 */
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
