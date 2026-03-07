import { useTheme } from "../../contexts/ThemeContext";
import { getCurrentGiftCount, formatGiftTime, formatNextReset, isExpired } from "../../utils/giftReset";

const MAX_GIFTS = 3;

export function GiftTracker({ giftLog, onLog, onReset, compact = false, color = "#e8003c" }) {
  const { th } = useTheme();
  const count     = getCurrentGiftCount(giftLog);
  const maxed     = count >= MAX_GIFTS;
  const lastTime  = !isExpired(giftLog?.lastGiftedAt) ? formatGiftTime(giftLog?.lastGiftedAt) : null;
  const nextReset = formatNextReset();

  if (compact) {
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: th.textSub, marginBottom: 6 }}>
          🎀 Daily Gifts
        </div>
        <button
          onClick={onLog}
          disabled={maxed}
          title={maxed ? `Resets at ${nextReset}` : "Log a gift"}
          style={{
            fontFamily: "'Baloo 2', cursive", fontWeight: 700, fontSize: "0.9rem",
            padding: "4px 14px", borderRadius: 50, border: "none", cursor: maxed ? "not-allowed" : "pointer",
            background: maxed ? th.progressBg : `${color}18`,
            color: maxed ? th.textMuted : color,
            transition: "all 0.2s ease",
          }}
        >
          {count}/{MAX_GIFTS} gifted
        </button>
        {maxed && (
          <div style={{ fontSize: "0.68rem", color: th.textMuted, marginTop: 4, fontStyle: "italic" }}>
            Resets at {nextReset}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ marginBottom: 20, background: th.sectionBg, borderRadius: 12, padding: "14px 16px", border: `1px solid ${th.border}` }}>
      <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: th.textSub, marginBottom: 12 }}>
        🎀 Daily Gift Tracker
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 12 }}>
        {Array.from({ length: MAX_GIFTS }).map((_, i) => (
          <div key={i} style={{
            width: 28, height: 28, borderRadius: "50%",
            background: i < count ? color : th.progressBg,
            border: `2px solid ${i < count ? color : th.border}`,
            transition: "all 0.2s ease",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.75rem", color: "#fff",
          }}>
            {i < count ? "✓" : ""}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <span style={{ fontSize: "0.88rem", fontWeight: 700, color: th.text }}>
          {count}/{MAX_GIFTS} gifts given today
        </span>
        <button
          onClick={onLog}
          disabled={maxed}
          style={{
            fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.82rem",
            padding: "5px 14px", borderRadius: 50, border: "none",
            cursor: maxed ? "not-allowed" : "pointer",
            background: maxed ? th.progressBg : color,
            color: maxed ? th.textMuted : "#fff",
            transition: "all 0.2s ease",
          }}
        >
          {maxed ? "All done!" : "＋ Log Gift"}
        </button>
      </div>

      {lastTime && (
        <div style={{ fontSize: "0.75rem", color: th.textMuted, marginTop: 8, fontStyle: "italic" }}>
          Last gifted at {lastTime}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10, paddingTop: 10, borderTop: `1px solid ${th.border}` }}>
        <span style={{ fontSize: "0.72rem", color: th.textMuted }}>
          Resets daily at {nextReset}
        </span>
        <button
          onClick={onReset}
          title="Used an in-game reset item? Clear the counter."
          style={{
            fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.72rem",
            padding: "3px 10px", borderRadius: 50,
            border: `1px solid ${th.border}`, background: "none",
            cursor: "pointer", color: th.textMuted,
          }}
        >🔄 Reset</button>
      </div>
    </div>
  );
}