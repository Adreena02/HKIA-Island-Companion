import { useState, useMemo } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { TagPill } from "./TagPill";

export function TagInput({ tags = [], allTags = [], onChange }) {
  const { th } = useTheme();
  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);

  const suggestions = useMemo(() => {
    const q = input.trim().toLowerCase();
    if (!q) return [];
    return allTags.filter((t) => t.toLowerCase().includes(q) && !tags.includes(t)).slice(0, 6);
  }, [input, allTags, tags]);

  const addTag = (tag) => {
    const clean = tag.trim();
    if (!clean || tags.includes(clean) || tags.length >= 4) return;
    onChange([...tags, clean]);
    setInput("");
  };

  const removeTag = (tag) => onChange(tags.filter((t) => t !== tag));

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim()) {
      e.preventDefault();
      addTag(input);
    } else if (e.key === "Backspace" && !input && tags.length) {
      removeTag(tags[tags.length - 1]);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <div style={{
        display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center",
        padding: "8px 12px", borderRadius: 12,
        border: `2px solid ${th.inputBorder}`,
        background: th.input,
        minHeight: 42,
      }}>
        {tags.map((tag) => <TagPill key={tag} tag={tag} onRemove={() => removeTag(tag)} />)}
        {tags.length < 4 && (
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            placeholder={tags.length === 0 ? "Type a tag, press Enter…" : "Add another…"}
            style={{
              border: "none", background: "none", outline: "none",
              fontFamily: "'Nunito', sans-serif", fontSize: "0.88rem",
              color: th.text, flex: 1, minWidth: 120,
            }}
          />
        )}
      </div>

      {focused && suggestions.length > 0 && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0,
          background: th.card, borderRadius: 10, zIndex: 100,
          boxShadow: "0 6px 24px rgba(0,0,0,0.2)",
          border: `1px solid ${th.border}`, overflow: "hidden",
        }}>
          {suggestions.map((s) => (
            <button key={s}
              onMouseDown={() => addTag(s)}
              style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "8px 14px", border: "none", background: "none",
                cursor: "pointer", fontSize: "0.88rem", color: th.text,
                fontFamily: "'Nunito', sans-serif",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = th.pillBg; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "none"; }}
            >{s}</button>
          ))}
        </div>
      )}
      <div style={{ fontSize: "0.72rem", color: th.textMuted, marginTop: 5 }}>
        Up to 4 tags · Press Enter or comma to add
      </div>
    </div>
  );
}