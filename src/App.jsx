import { useState, useCallback, useEffect } from "react";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { ACCENT_SOLID } from "./constants";
import { Toast } from "./components/ui/Toast";
import { OnboardingModal } from "./components/ui/OnboardingModal";
import { DashboardTab } from "./components/dashboard/DashboardTab";
import { ResidentsTab } from "./components/residents/ResidentsTab";
import { InventoryTab } from "./components/inventory/InventoryTab";
import { RecipesTab } from "./components/recipes/RecipesTab";
import { CatalogueTab } from "./components/catalogue/CatalogueTab";
import { ExportImport } from "./components/ExportImport";

const TABS = [
  { id: "home",      label: "🏠 Home",      color: "home"        },
  { id: "residents", label: "🐱 Residents", color: "hellokitty"  },
  { id: "inventory", label: "🎒 Inventory", color: "cinnamoroll" },
  { id: "recipes",   label: "📖 Recipes",   color: "mymelody"    },
  { id: "catalogue", label: "🪑 Catalogue", color: "furniture"   },
];

function AppInner() {
  const { dark, setDark, th } = useTheme();
  const [activeTab, setActiveTab] = useState("home");
  const [toast, setToast] = useState({ message: "", visible: false });
  const [onboardingOpen, setOnboardingOpen] = useState(false);

  useEffect(() => {
    try { if (!localStorage.getItem("hkia_onboarded")) setOnboardingOpen(true); } catch {}
  }, []);

  const closeOnboarding = () => {
    try { localStorage.setItem("hkia_onboarded", "1"); } catch {}
    setOnboardingOpen(false);
  };

  const showToast = useCallback((msg) => {
    setToast({ message: msg, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2200);
  }, []);

  const solid = ACCENT_SOLID[TABS.find((t) => t.id === activeTab)?.color ?? "hellokitty"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&family=Nunito:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { min-height: 100%; }
        body {
          font-family: 'Nunito', sans-serif;
          min-height: 100vh; min-width: 100vw;
          overflow-x: hidden;
        }
        #root { min-height: 100vh; width: 100%; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popIn  { from { opacity: 0; transform: scale(0.88); } to { opacity: 1; transform: scale(1); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes dreamDrift {
          0%   { background-position: 0% 50%; }
          25%  { background-position: 50% 100%; }
          50%  { background-position: 100% 50%; }
          75%  { background-position: 50% 0%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        ::-webkit-scrollbar { width: 7px; }
        ::-webkit-scrollbar-track { background: rgba(128,80,100,0.15); border-radius: 10px; }
        ::-webkit-scrollbar-thumb { background: ${solid}; border-radius: 10px; }
        select { appearance: auto; }
        :focus-visible { outline: 3px solid ${solid}; outline-offset: 2px; border-radius: 4px; }
        button:focus-visible, a:focus-visible { outline: 3px solid ${solid}; outline-offset: 3px; }
      `}</style>

      {/* Background */}
      <div style={{
        position: "fixed", inset: 0, zIndex: -1,
        background: dark
          ? "linear-gradient(135deg, #1a1020 0%, #1e1428 25%, #181424 50%, #141820 75%, #1a1820 100%)"
          : "linear-gradient(-45deg, #ffd6e7, #e8d5f5, #ffddd2, #d5f5e8, #d5eef5, #f5d5f0, #ffefd5, #d5f5e3)",
        backgroundSize: dark ? "100% 100%" : "400% 400%",
        animation: dark ? "none" : "dreamDrift 28s ease infinite",
        transition: "background 0.5s ease",
      }} />

      {/* Ticker */}
      <div style={{
        width: "100%", overflow: "hidden",
        background: `linear-gradient(90deg, ${solid}cc, ${solid}99)`,
        backdropFilter: "blur(8px)",
        borderBottom: `2px solid ${solid}44`,
        padding: "7px 0",
        transition: "background 0.5s ease",
      }}>
        <div style={{ display: "flex", whiteSpace: "nowrap", animation: "ticker 22s linear infinite", willChange: "transform" }}>
          {[0, 1].map((i) => (
            <div key={i} aria-hidden={i === 1 ? "true" : undefined} style={{
              display: "inline-flex", alignItems: "center", flexShrink: 0,
              fontFamily: "'Baloo 2', cursive", fontSize: "0.85rem", fontWeight: 700,
              color: "rgba(255,255,255,0.95)", letterSpacing: "0.04em", textTransform: "uppercase",
            }}>
              {["🌺 Active development", "✨ More features coming soon", "🎀 Thanks for playing!", "🌸 Built with love for HKIA fans", "🍓 Feedback welcome"].map((msg, j) => (
                <span key={j} style={{ display: "inline-flex", alignItems: "center", paddingRight: 40 }}>
                  {msg}<span style={{ opacity: 0.4, paddingLeft: 40 }}>·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Header */}
      <header style={{ textAlign: "center", padding: "clamp(16px, 4vw, 28px) 16px 0", position: "relative" }}>
        <h1 style={{
          fontFamily: "'Baloo 2', cursive",
          fontSize: "clamp(1.5rem, 5vw, 2.8rem)",
          fontWeight: 800, color: solid,
          textShadow: dark ? `2px 2px 0 ${solid}33` : "3px 3px 0 rgba(255,255,255,0.8)",
          transition: "color 0.5s ease",
        }}>🌺 HKIA Island Companion</h1>
        <p style={{ fontSize: "clamp(0.8rem, 2.5vw, 0.95rem)", color: th.textSub, marginTop: 4, fontWeight: 600 }}>
          Hello Kitty Island Adventure · Tracker &amp; Guide
        </p>

        {/* Header buttons — dark toggle + help */}
        <div style={{ position: "absolute", top: 8, right: 12, display: "flex", gap: 8 }}>
          {/* Dark mode toggle */}
          <button
            onClick={() => setDark((d) => !d)}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            title={dark ? "Light mode" : "Dark mode"}
            style={{
              background: th.pillBg, border: `2px solid ${solid}44`,
              borderRadius: "50%", width: 36, height: 36,
              cursor: "pointer", fontSize: "1rem", color: solid,
              display: "flex", alignItems: "center", justifyContent: "center",
              backdropFilter: "blur(6px)", transition: "all 0.2s ease",
              boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = solid; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = th.pillBg; e.currentTarget.style.color = solid; }}
          >{dark ? "☀️" : "🌙"}</button>

          {/* Help / onboarding */}
          <button
            onClick={() => setOnboardingOpen(true)}
            aria-label="Open help and onboarding" title="Help"
            style={{
              background: th.pillBg, border: `2px solid ${solid}44`,
              borderRadius: "50%", width: 36, height: 36,
              cursor: "pointer", fontFamily: "'Baloo 2', cursive", fontWeight: 800,
              fontSize: "1rem", color: solid,
              display: "flex", alignItems: "center", justifyContent: "center",
              backdropFilter: "blur(6px)", transition: "all 0.2s ease",
              boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = solid; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = th.pillBg; e.currentTarget.style.color = solid; }}
          >?</button>
        </div>
      </header>

      {/* Tab Bar */}
      <nav aria-label="Main navigation" style={{ display: "flex", justifyContent: "center", gap: 8, padding: "clamp(12px, 3vw, 20px) 12px 0", flexWrap: "wrap" }}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const tabSolid = ACCENT_SOLID[tab.color];
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              aria-current={isActive ? "page" : undefined}
              style={{
                fontFamily: "'Baloo 2', cursive", fontSize: "clamp(0.8rem, 2.5vw, 1rem)", fontWeight: 700,
                padding: "clamp(7px, 2vw, 10px) clamp(14px, 3vw, 24px)",
                border: "none", borderRadius: 50, cursor: "pointer",
                background: isActive ? tabSolid : th.pillBg,
                color: isActive ? "#fff" : th.textSub,
                boxShadow: isActive ? `0 4px 18px ${tabSolid}66` : "none",
                transform: isActive ? "translateY(-2px)" : "none",
                backdropFilter: "blur(8px)", transition: "all 0.2s ease", whiteSpace: "nowrap",
              }}
            >{tab.label}</button>
          );
        })}
      </nav>

      {/* Export/Import */}
      <div style={{ display: "flex", justifyContent: "flex-end", maxWidth: 1100, margin: "12px auto 0", padding: "0 12px" }}>
        <ExportImport showToast={showToast} />
      </div>

      {/* Main Content */}
      <main aria-label="Tab content" style={{ maxWidth: 1100, margin: "16px auto 40px", padding: "0 clamp(10px, 3vw, 16px)" }}>
        <div style={{ animation: "fadeUp 0.35s ease" }}>
          {activeTab === "home"      && <DashboardTab showToast={showToast} />}
          {activeTab === "residents" && <ResidentsTab showToast={showToast} />}
          {activeTab === "inventory" && <InventoryTab showToast={showToast} />}
          {activeTab === "recipes"   && <RecipesTab   showToast={showToast} />}
          {activeTab === "catalogue" && <CatalogueTab showToast={showToast} />}
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: "center",
        padding: "24px 16px 32px",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
      }}>
        <div style={{
          height: 1,
          width: "min(320px, 80%)",
          background: `linear-gradient(90deg, transparent, ${solid}44, transparent)`,
          marginBottom: 6,
        }} />
        <p style={{
          fontFamily: "'Baloo 2', cursive",
          fontSize: "0.85rem",
          fontWeight: 700,
          color: th.textMuted,
          margin: 0,
        }}>
          made with 🌸 by{" "}
          <span style={{ color: solid }}>cutecelestial</span>
        </p>
        <a
          href="YOUR_KOFI_URL_HERE"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            fontFamily: "'Baloo 2', cursive", fontWeight: 700, fontSize: "0.85rem",
            padding: "6px 16px", borderRadius: 50,
            background: th.pillBg,
            color: th.textSub,
            border: `2px solid ${solid}33`,
            textDecoration: "none",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = solid;
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.borderColor = solid;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = th.pillBg;
            e.currentTarget.style.color = th.textSub;
            e.currentTarget.style.borderColor = `${solid}33`;
          }}
        >
          ☕ support on ko-fi
        </a>
        <p style={{
          fontSize: "0.72rem",
          color: th.textMuted,
          margin: 0,
          fontWeight: 600,
        }}>
          not affiliated with Sanrio or Hello Kitty Island Adventure
        </p>
      </footer>

      <Toast message={toast.message} visible={toast.visible} />
      <OnboardingModal open={onboardingOpen} onClose={closeOnboarding} />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}