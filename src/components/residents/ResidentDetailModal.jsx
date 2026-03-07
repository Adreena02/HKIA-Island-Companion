import { useTheme } from "../../contexts/ThemeContext";
import { Modal } from "../ui/Modal";
import { ACCENT_GRADIENTS, ACCENT_SOLID, getSafeColor, normalizeAbility } from "../../constants";
import { ACCENT_SOLID_DARK } from "../../contexts/ThemeContext";
import { TagPill } from "../ui/TagPill";
import { GiftTracker } from "./GiftTracker";

function Hearts({ count }) {
  return <span style={{ letterSpacing: 1 }}>{"❤️".repeat(count)}</span>;
}

export function ResidentDetailModal({ resident, open, onClose, onAbilityToggle, onGiftLog, onGiftReset, inventory, onNoteChange }) {
  const { th } = useTheme();
  if (!resident) return null;
  const { name, color, imageUrl, lovedGift, gifts, abilities, likedTags } = resident;

  const safeColor     = getSafeColor(color);
  const accentStart   = ACCENT_GRADIENTS[safeColor].split(",")[0].replace("linear-gradient(90deg, ", "").trim();
  const { dark } = useTheme();
  const solidColor    = (dark && ACCENT_SOLID_DARK[safeColor]) ? ACCENT_SOLID_DARK[safeColor] : ACCENT_SOLID[safeColor];
  const normAbilities = (abilities ?? []).map(normalizeAbility);

  const sortedGifts = [...(gifts ?? [])].sort((a, b) =>
    b.heartValue - a.heartValue || b.friendshipValue - a.friendshipValue
  );

  const giftableItems = (inventory ?? []).filter((item) =>
    item.qty > 0 && (item.tags ?? []).some((tag) => (likedTags ?? []).includes(tag))
  );

  return (
    <Modal open={open} onClose={onClose} title={`${name} — Details`}>
      {/* Mini header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22, paddingBottom: 18, borderBottom: `2px solid ${th.border}`, flexWrap: "wrap" }}>
        <div style={{
          width: 60, height: 60, borderRadius: "50%", flexShrink: 0,
          border: `3px solid ${accentStart}`, background: th.progressBg, overflow: "hidden",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {imageUrl
            ? <img src={imageUrl} alt={name} onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : null}
          <div style={{ display: imageUrl ? "none" : "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", fontSize: "1.6rem" }}>🐾</div>
        </div>
        <span style={{ fontFamily: "'Baloo 2', cursive", fontSize: "clamp(1.1rem, 4vw, 1.3rem)", fontWeight: 700, color: th.text }}>{name}</span>
      </div>

      <GiftTracker giftLog={resident.giftLog} onLog={() => onGiftLog(resident.id)} onReset={() => onGiftReset(resident.id)} color={solidColor} />

      {/* Loved Gift */}
      {lovedGift && (
        <div style={{ marginBottom: 20, background: th.sectionBg, borderRadius: 12, padding: "14px 16px", border: `2px solid ${solidColor}44` }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#e8003c", marginBottom: 8 }}>💝 Loved Gift</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <span style={{ fontWeight: 700, fontSize: "0.95rem", color: th.text }}>{lovedGift.name}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Hearts count={lovedGift.heartValue} />
              <span style={{ fontSize: "0.72rem", color: th.textMuted, fontStyle: "italic" }}>FV {lovedGift.friendshipValue}</span>
            </div>
          </div>
        </div>
      )}

      {/* Liked Gifts */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: th.textSub, marginBottom: 10 }}>🎁 Liked Gifts</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {sortedGifts.length ? sortedGifts.map((g, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              flexWrap: "wrap", gap: 6,
              background: th.sectionBg, borderRadius: 8, padding: "8px 12px",
              border: `1px solid ${th.border}`,
            }}>
              <span style={{ fontSize: "0.88rem", color: th.text, fontWeight: 600 }}>{g.name}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                <Hearts count={g.heartValue} />
                <span style={{ fontSize: "0.72rem", color: th.textMuted, fontStyle: "italic" }}>FV {g.friendshipValue}</span>
              </div>
            </div>
          )) : <span style={{ fontSize: "0.85rem", color: th.textMuted, fontStyle: "italic" }}>No liked gifts on record</span>}
        </div>
      </div>

      {/* Giftable from Inventory */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: th.textSub, marginBottom: 10 }}>🎒 Giftable from Inventory</div>
        {(likedTags ?? []).length > 0 && (
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 10 }}>
            {likedTags.map((tag) => <TagPill key={tag} tag={tag} bg={`${solidColor}18`} color={solidColor} />)}
          </div>
        )}
        {giftableItems.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {giftableItems.map((item) => (
              <div key={item.id} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                flexWrap: "wrap", gap: 6,
                background: th.sectionBg, borderRadius: 8, padding: "7px 12px",
                border: `1px solid ${th.border}`,
              }}>
                <span style={{ fontSize: "0.88rem", color: th.text, fontWeight: 600 }}>{item.emoji} {item.name}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ display: "flex", gap: 4 }}>
                    {(item.tags ?? []).filter((t) => (likedTags ?? []).includes(t)).map((t) => <TagPill key={t} tag={t} bg={`${solidColor}18`} color={solidColor} />)}
                  </div>
                  <span style={{ fontSize: "0.78rem", color: th.textMuted, fontWeight: 600 }}>×{item.qty}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <span style={{ fontSize: "0.85rem", color: th.textMuted, fontStyle: "italic" }}>
            {(likedTags ?? []).length === 0 ? "No liked tags on record" : "No matching items in your inventory yet"}
          </span>
        )}
      </div>

      {/* Companion Abilities */}
      {normAbilities.length > 0 && (
        <div>
          <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: th.textSub, marginBottom: 12 }}>🌟 Companion Abilities</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {normAbilities.map((ability, ai) => (
              <div key={ai} style={{ background: th.sectionBg, borderRadius: 10, padding: "12px 14px", border: `1px solid ${th.border}` }}>
                <div style={{ fontWeight: 700, fontSize: "0.92rem", color: th.text, marginBottom: 10 }}>✨ {ability.name}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  {ability.levels.map((lvl, li) => (
                    <div key={li} style={{
                      display: "flex", alignItems: "flex-start", gap: 10, flexWrap: "wrap",
                      background: lvl.unlocked ? `${solidColor}15` : th.card,
                      borderRadius: 8, padding: "8px 10px",
                      border: `1px solid ${lvl.unlocked ? solidColor + "44" : th.border}`,
                      transition: "all 0.2s ease",
                    }}>
                      <button
                        onClick={() => onAbilityToggle(resident.id, ai, li)}
                        aria-label={`${lvl.unlocked ? "Lock" : "Unlock"} ${ability.name} level ${lvl.level}`}
                        style={{
                          flexShrink: 0, width: 24, height: 24, borderRadius: "50%",
                          border: `2px solid ${lvl.unlocked ? "#e8003c" : th.border}`,
                          background: lvl.unlocked ? "#e8003c" : "transparent",
                          color: lvl.unlocked ? "#fff" : th.textMuted,
                          cursor: "pointer", fontSize: "0.75rem", fontWeight: 700,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "all 0.2s ease", padding: 0,
                        }}
                      >{lvl.unlocked ? "✓" : "○"}</button>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                          {ability.levels.length > 1 && (
                            <span style={{
                              fontSize: "0.68rem", fontWeight: 700, padding: "1px 7px", borderRadius: 50,
                              background: lvl.unlocked ? "#e8003c" : th.progressBg,
                              color: lvl.unlocked ? "#fff" : th.textMuted,
                            }}>Lv {lvl.level}</span>
                          )}
                          <span style={{ fontSize: "0.72rem", color: th.textMuted, fontStyle: "italic" }}>
                            Unlocks at Friendship Lv {lvl.unlocksAt}
                          </span>
                        </div>
                        <div style={{ fontSize: "0.83rem", color: lvl.unlocked ? th.text : th.textMuted, lineHeight: 1.4 }}>
                          {lvl.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: "0.72rem", color: th.textMuted, fontStyle: "italic", marginTop: 8 }}>Click the circle to mark a level as unlocked</div>
        </div>
      )}

      {/* Personal Notes */}
      <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${th.border}` }}>
        <label
          htmlFor={`note-${resident.id}`}
          style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: th.textSub, display: "block", marginBottom: 8 }}
        >
          📝 My Notes
        </label>
        <textarea
          id={`note-${resident.id}`}
          value={resident.personalNote ?? ""}
          onChange={(e) => onNoteChange(resident.id, e.target.value)}
          placeholder={`Jot down anything about ${name}…`}
          rows={3}
          style={{
            width: "100%", padding: "10px 14px", borderRadius: 12,
            border: `2px solid ${th.inputBorder}`,
            fontFamily: "'Nunito', sans-serif", fontSize: "0.9rem",
            color: th.text, background: th.input,
            outline: "none", resize: "vertical", boxSizing: "border-box",
            transition: "border-color 0.2s, background 0.2s", lineHeight: 1.5,
          }}
          onFocus={(e) => { e.target.style.borderColor = "#ff8fa3"; }}
          onBlur={(e)  => { e.target.style.borderColor = th.inputBorder; }}
        />
      </div>
    </Modal>
  );
}