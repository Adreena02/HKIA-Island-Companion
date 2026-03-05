import { useState } from "react";
import { Btn } from "../ui/Btn";
import { ACCENT_BG_GRADIENTS, ACCENT_GRADIENTS, ACCENT_SOLID, getSafeColor, normaliseAbility } from "../../constants";
import { TagPill } from "../ui/TagPill";
import { GiftTracker } from "./GiftTracker";

export function ResidentCard({ resident, onLevelChange, onViewDetails, onGiftLog }) {
  const [hov, setHov] = useState(false);
  const { name, birthday, maxLevel, currentLevel, firstGift, note, imageUrl } = resident;
  const unlockType = resident.unlockType;
  const dlcName    = resident.dlc;

  const safeColor      = getSafeColor(resident.color);
  const max            = parseInt(maxLevel) || null;
  const cur            = parseInt(currentLevel) || 0;
  const progress       = max ? Math.min(cur / max, 1) : 0;
  const solidColor     = ACCENT_SOLID[safeColor];
  const bgGradient     = ACCENT_BG_GRADIENTS[safeColor];
  const accentGradient = ACCENT_GRADIENTS[safeColor];
  const normAbilities  = (resident.abilities ?? []).map(normaliseAbility);
  const hasAbilities   = normAbilities.some((a) => a.name?.trim());

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderRadius: 16,
        background: bgGradient,
        padding: 16,
        boxShadow: hov ? "0 10px 30px rgba(0,0,0,0.15)" : "0 4px 16px rgba(0,0,0,0.08)",
        transform: hov ? "translateY(-4px)" : "none",
        transition: "all 0.22s ease",
        border: `2px solid ${solidColor}44`,
      }}
    >
      {/* Floating portrait — sits between outer tint and inner card */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: -30, position: "relative", zIndex: 1 }}>
        <div style={{
          width: 90, height: 90, borderRadius: "50%",
          border: `3px solid ${solidColor}66`,
          background: `${solidColor}18`,
          overflow: "hidden", display: "flex",
          alignItems: "center", justifyContent: "center",
          boxShadow: `0 4px 14px ${solidColor}44`,
        }}>
          {imageUrl
            ? <img src={imageUrl} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
            : null}
          <div style={{ display: imageUrl ? "none" : "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", fontSize: "2rem" }}>🐾</div>
        </div>
      </div>

      {/* Inner white card */}
      <div style={{
        background: "#ffffff",
        borderRadius: 12,
        padding: "40px 18px 20px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        border: `1.5px solid ${solidColor}33`,
        position: "relative", zIndex: 0,
      }}>

        {/* Name */}
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <span style={{
            fontFamily: "'Baloo 2', cursive",
            fontSize: "clamp(1.1rem, 4vw, 1.3rem)",
            fontWeight: 700, color: solidColor,
          }}>{name}</span>

          {/* Unlock type badge */}
          {unlockType === "dlc" && (
            <div style={{ marginTop: 4 }}>
              <span style={{
                display: "inline-block", fontSize: "0.68rem", fontWeight: 700,
                padding: "2px 10px", borderRadius: 50,
                background: "linear-gradient(90deg, #f59e0b, #fcd34d)",
                color: "#fff", letterSpacing: "0.04em",
              }}>💎 DLC{dlcName ? ` — ${dlcName}` : ""}</span>
            </div>
          )}
          {unlockType === "quest" && (
            <div style={{ marginTop: 4 }}>
              <span style={{
                display: "inline-block", fontSize: "0.68rem", fontWeight: 700,
                padding: "2px 10px", borderRadius: 50,
                background: "linear-gradient(90deg, #7c3aed, #a78bfa)",
                color: "#fff", letterSpacing: "0.04em",
              }}>🔮 Quest Unlock</span>
            </div>
          )}
        </div>

        {/* Liked tags */}
        {(resident.likedTags ?? []).length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, justifyContent: "center", marginBottom: 14 }}>
            {resident.likedTags.map((tag) => <TagPill key={tag} tag={tag} bg={`${solidColor}18`} color={solidColor} />)}
          </div>
        )}

        {/* Row 1 — Birthday + Friendship */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: 8, marginBottom: 12 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#7a6a6a", marginBottom: 4 }}>🎂 Birthday</div>
            <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#3a2e2e" }}>
              {birthday ?? <span style={{ color: "#bbb", fontStyle: "italic" }}>Unknown</span>}
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#7a6a6a", marginBottom: 6 }}>⭐ Friendship</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
              <button onClick={() => onLevelChange(resident.id, Math.max(0, cur - 1))} style={{ width: 20, height: 20, borderRadius: "50%", border: "none", background: "#e8d8d8", cursor: "pointer", fontSize: "0.75rem", fontWeight: 700, color: "#7a6a6a", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
              <span style={{ fontFamily: "'Baloo 2', cursive", fontSize: "1rem", fontWeight: 700, color: "#3a2e2e", minWidth: 36, textAlign: "center" }}>
                {cur}{max ? <span style={{ color: "#b0a0a0", fontWeight: 500 }}>/{max}</span> : ""}
              </span>
              <button onClick={() => onLevelChange(resident.id, max ? Math.min(max, cur + 1) : cur + 1)} style={{ width: 20, height: 20, borderRadius: "50%", border: "none", background: "#e8d8d8", cursor: "pointer", fontSize: "0.75rem", fontWeight: 700, color: "#7a6a6a", display: "flex", alignItems: "center", justifyContent: "center" }}>＋</button>
            </div>
            {max && (
              <div style={{ marginTop: 5, height: 5, borderRadius: 10, background: "#e8d8d8", overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 10, background: accentGradient, width: `${progress * 100}%`, transition: "width 0.3s ease" }} />
              </div>
            )}
          </div>
        </div>

        {/* Return Gift */}
        <div style={{ borderTop: "1px solid #f0ebe5", paddingTop: 12, marginBottom: 12, textAlign: "center" }}>
          <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#7a6a6a", marginBottom: 4 }}>🎁 Return Gift</div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#3a2e2e" }}>
            {firstGift || <span style={{ color: "#bbb", fontStyle: "italic" }}>—</span>}
          </div>
        </div>

        {/* Daily Gift Tracker */}
        <div style={{ borderTop: "1px solid #f0ebe5", paddingTop: 12, marginBottom: hasAbilities || note ? 12 : 0 }}>
          <GiftTracker
            giftLog={resident.giftLog}
            onLog={() => onGiftLog(resident.id)}
            onReset={null}
            compact
            color={solidColor}
          />
        </div>

        {/* Companion Abilities */}
        {hasAbilities && (
          <div style={{ borderTop: "1px solid #f0ebe5", paddingTop: 12, textAlign: "center", marginBottom: note ? 12 : 0 }}>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#7a6a6a", marginBottom: 8 }}>🌟 Companion Abilities</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
              {normAbilities.map((ability, i) => {
                if (!ability.name?.trim()) return null;
                const totalLevels    = ability.levels?.length ?? 0;
                const unlockedLevels = ability.levels?.filter((l) => l.unlocked).length ?? 0;
                const fullyUnlocked  = unlockedLevels === totalLevels && totalLevels > 0;
                const anyUnlocked    = unlockedLevels > 0;
                return (
                  <button key={i}
                    onClick={() => onViewDetails(resident)}
                    title="Open details to manage ability levels"
                    style={{
                      fontSize: "0.78rem", fontWeight: 700, padding: "4px 11px", borderRadius: 50,
                      border: `2px solid ${anyUnlocked ? "transparent" : "rgba(180,130,130,0.2)"}`,
                      cursor: "pointer",
                      background: fullyUnlocked ? accentGradient : anyUnlocked ? "#ffe8ee" : "#ece7e1",
                      color: fullyUnlocked ? "#fff" : anyUnlocked ? "#e8003c" : "#b0a0a0",
                      boxShadow: anyUnlocked ? "0 2px 6px rgba(180,130,130,0.25)" : "none",
                      transition: "all 0.2s ease",
                      display: "flex", alignItems: "center", gap: 4,
                      fontFamily: "'Nunito', sans-serif",
                    }}
                  >
                    <span>{fullyUnlocked ? "✓" : anyUnlocked ? "◑" : "○"}</span>
                    {ability.name}
                    {totalLevels > 1 && (
                      <span style={{ fontSize: "0.68rem", opacity: 0.8 }}>{unlockedLevels}/{totalLevels}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Location hint */}
        {note && (
          <div style={{ borderTop: "1px solid #f0ebe5", paddingTop: 10, textAlign: "center" }}>
            <div style={{ fontSize: "0.75rem", fontStyle: "italic", color: "#b09070", lineHeight: 1.4 }}>
              🗺️ {note}
            </div>
          </div>
        )}

        {/* Personal note */}
        {resident.personalNote?.trim() && (
          <div style={{ borderTop: "1px solid #f0ebe5", paddingTop: 10, textAlign: "center" }}>
            <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#7a6a6a", marginBottom: 4 }}>
              📝 My Notes
            </div>
            <div style={{
              fontSize: "0.78rem", color: "#5a4a4a", lineHeight: 1.5,
              display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
              overflow: "hidden", fontStyle: "italic",
            }}>
              {resident.personalNote}
            </div>
          </div>
        )}
      </div>

      {/* View Details button — sits outside inner card, inside tint bg */}
      <div style={{ textAlign: "center", marginTop: 12 }}>
        <Btn variant="ghost" small onClick={() => onViewDetails(resident)}
          aria-label={`View details for ${resident.name}`}>
          🌸 View Details
        </Btn>
      </div>
    </div>
  );
}