import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";

const STEPS = [
  {
    emoji: "🌺",
    title: "Welcome to HKIA Island Companion!",
    body: (
      <>
        <p>Your all-in-one tracker for Hello Kitty Island Adventure — built by a fan, for fans.</p>
        <p style={{ marginTop: 10 }}>
          Tired of juggling Notepad files and physical notebooks mid-session? Same.
          This app keeps everything in one place so you can focus on playing, not bookkeeping.
        </p>
      </>
    ),
  },
  {
    emoji: "🗂️",
    title: "Here's what's inside",
    body: (
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          ["🏠", "Home",      "Daily checklist, gift summary, friendship milestones, and seasonal events — all at a glance"],
          ["🐱", "Residents", "All 22 residents pre-loaded with real gift data, abilities, and friendship tracking"],
          ["🎒", "Inventory", "Track your materials and ingredients, with a quick cross-reference to what each resident likes"],
          ["📖", "Recipes",   "All station recipes pre-loaded with real in-game data — browse by station, filter by rarity, and see exactly what you can craft from your inventory right now"],
          ["🪑", "Catalogue", "Keep track of furniture you've collected"],
        ].map(([icon, name, desc]) => (
          <li key={name} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ fontSize: "1.2rem", flexShrink: 0, lineHeight: 1.4 }}>{icon}</span>
            <span>
              <strong style={{ fontFamily: "'Baloo 2', cursive" }}>{name}</strong>
              <span> — {desc}</span>
            </span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    emoji: "💾",
    title: "Your data stays on your device",
    body: (
      <>
        <p>Everything saves automatically to your browser's local storage — no account, no sign-in, no server.</p>
        <p style={{ marginTop: 10 }}>
          You can back up and restore your full island data anytime using the{" "}
          <strong>Export / Import</strong> button in the top right corner.
        </p>
      </>
    ),
  },
];

export function OnboardingModal({ open, onClose }) {
  const { th } = useTheme();
  const [step, setStep] = useState(0);

  if (!open) return null;

  const isLast = step === STEPS.length - 1;
  const { emoji, title, body } = STEPS[step];

  const handleClose = () => { setStep(0); onClose(); };

  return (
    <div
      onClick={handleClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: th.overlay,
        backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "16px",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog" aria-modal="true" aria-labelledby="onboarding-title"
        style={{
          background: th.modalBg,
          borderRadius: 24,
          padding: "clamp(24px, 5vw, 40px)",
          maxWidth: 520, width: "100%",
          boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
          animation: "popIn 0.25s ease",
          display: "flex", flexDirection: "column", gap: 20,
          border: `1px solid ${th.border}`,
        }}
      >
        <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
          {STEPS.map((_, i) => (
            <div key={i} style={{
              width: i === step ? 22 : 7, height: 7,
              borderRadius: 99,
              background: i === step ? "#e8003c" : th.border,
              transition: "all 0.3s ease",
            }} />
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "3rem", lineHeight: 1, marginBottom: 12 }}>{emoji}</div>
          <h2
            id="onboarding-title"
            style={{
              fontFamily: "'Baloo 2', cursive",
              fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
              fontWeight: 800, color: "#e8003c", marginBottom: 16,
            }}
          >
            {title}
          </h2>
          <div style={{ fontSize: "clamp(0.85rem, 2.5vw, 0.95rem)", color: th.text, lineHeight: 1.65, textAlign: "left" }}>
            {body}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", flexWrap: "wrap" }}>
          <button
            onClick={handleClose}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: th.textMuted, fontSize: "0.9rem", fontFamily: "'Nunito', sans-serif",
              padding: "8px 12px", borderRadius: 10, transition: "color 0.15s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = th.textSub}
            onMouseLeave={(e) => e.currentTarget.style.color = th.textMuted}
          >
            {isLast ? "Close" : "Skip"}
          </button>

          {!isLast && (
            <button
              onClick={() => setStep((s) => s + 1)}
              style={{
                background: "#e8003c", border: "none", borderRadius: 50, cursor: "pointer",
                color: "#fff", fontFamily: "'Baloo 2', cursive", fontWeight: 700,
                fontSize: "0.95rem", padding: "9px 24px",
                boxShadow: "0 4px 14px #e8003c55", transition: "background 0.15s, transform 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#c8002e"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#e8003c"; e.currentTarget.style.transform = "none"; }}
            >
              Next →
            </button>
          )}

          {isLast && (
            <button
              onClick={handleClose}
              style={{
                background: "#e8003c", border: "none", borderRadius: 50, cursor: "pointer",
                color: "#fff", fontFamily: "'Baloo 2', cursive", fontWeight: 700,
                fontSize: "0.95rem", padding: "9px 24px",
                boxShadow: "0 4px 14px #e8003c55", transition: "background 0.15s, transform 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#c8002e"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#e8003c"; e.currentTarget.style.transform = "none"; }}
            >
              Let's go! 🌸
            </button>
          )}
        </div>
      </div>
    </div>
  );
}