import { getCurrentGiftCount, formatGiftTime, formatNextReset, isExpired } from "../../utils/giftReset";

const MAX_GIFTS = 3;

/**
 * GiftTracker
 * Displays and controls daily gift tracking for a resident.
 *
 * Props:
 *  - giftLog: { count, lastGiftedAt } | null
 *  - onLog:   () => void   — log one gift
 *  - onReset: () => void   — manually reset (in-game reset item used)
 *  - compact: boolean      — small card version vs full modal version
 *  - color:   string       — solid accent colour for theming
 */
export function GiftTracker({ giftLog, onLog, onReset, compact = false, color = "#e8003c" }) {
  const count     = getCurrentGiftCount(giftLog);
  const maxed     = count >= MAX_GIFTS;
  const lastTime  = !isExpired(giftLog?.lastGiftedAt) ? formatGiftTime(giftLog?.lastGiftedAt) : null;
  const nextReset = formatNextReset();

  if (compact) {
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#7a6a6a", marginBottom: 6 }}>
          🎀 Daily Gifts
        </div>
        <button
          onClick={onLog}
          disabled={maxed}
          title={maxed ? `Resets at ${nextReset}` : "Log a gift"}
          style={{
            fontFamily: "'Baloo 2', cursive", fontWeight: 700, fontSize: "0.9rem",
            padding: "4px 14px", borderRadius: 50, border: "none", cursor: maxed ? "not-allowed" : "pointer",
            background: maxed ? "#ece7e1" : `${color}18`,
            color: maxed ? "#b0a0a0" : color,
            transition: "all 0.2s ease",
          }}
        >
          {count}/{MAX_GIFTS} gifted
        </button>
        {maxed && (
          <div style={{ fontSize: "0.68rem", color: "#b0a0a0", marginTop: 4, fontStyle: "italic" }}>
            Resets at {nextReset}
          </div>
        )}
      </div>
    );
  }

  // Full modal version
  return (
    <div style={{ marginBottom: 20, background: "#faf7f4", borderRadius: 12, padding: "14px 16px", border: "1px solid #ede8e2" }}>
      <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#7a6a6a", marginBottom: 12 }}>
        🎀 Daily Gift Tracker
      </div>

      {/* Dot indicators */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 12 }}>
        {Array.from({ length: MAX_GIFTS }).map((_, i) => (
          <div key={i} style={{
            width: 28, height: 28, borderRadius: "50%",
            background: i < count ? color : "#ece7e1",
            border: `2px solid ${i < count ? color : "#d8d0c8"}`,
            transition: "all 0.2s ease",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "0.75rem", color: "#fff",
          }}>
            {i < count ? "✓" : ""}
          </div>
        ))}
      </div>

      {/* Count + Log button */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "#3a2e2e" }}>
          {count}/{MAX_GIFTS} gifts given today
        </span>
        <button
          onClick={onLog}
          disabled={maxed}
          style={{
            fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.82rem",
            padding: "5px 14px", borderRadius: 50, border: "none",
            cursor: maxed ? "not-allowed" : "pointer",
            background: maxed ? "#ece7e1" : color,
            color: maxed ? "#b0a0a0" : "#fff",
            transition: "all 0.2s ease",
          }}
        >
          {maxed ? "All done!" : "＋ Log Gift"}
        </button>
      </div>

      {/* Last gifted time */}
      {lastTime && (
        <div style={{ fontSize: "0.75rem", color: "#b0a0a0", marginTop: 8, fontStyle: "italic" }}>
          Last gifted at {lastTime}
        </div>
      )}

      {/* Reset info + manual reset */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10, paddingTop: 10, borderTop: "1px solid #ede8e2" }}>
        <span style={{ fontSize: "0.72rem", color: "#b0a0a0" }}>
          Resets daily at {nextReset}
        </span>
        <button
          onClick={onReset}
          title="Used an in-game reset item? Clear the counter."
          style={{
            fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.72rem",
            padding: "3px 10px", borderRadius: 50,
            border: "1px solid #d8d0c8", background: "none",
            cursor: "pointer", color: "#b0a0a0",
          }}
        >
          🔄 Reset
        </button>
      </div>
    </div>
  );
}
