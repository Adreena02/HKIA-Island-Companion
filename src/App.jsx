import { useState, useCallback } from "react";
import { ACCENT_SOLID } from "./constants";
import { Toast } from "./components/ui/Toast";
import { ResidentsTab } from "./components/residents/ResidentsTab";
import { InventoryTab } from "./components/inventory/InventoryTab";
import { RecipesTab } from "./components/recipes/RecipesTab";
import { CatalogueTab } from "./components/catalogue/CatalogueTab";
import { ExportImport } from "./components/ExportImport";

const TABS = [
  { id: "residents", label: "🐱 Residents", color: "hellokitty"  },
  { id: "inventory", label: "🎒 Inventory", color: "cinnamoroll" },
  { id: "recipes",   label: "📖 Recipes",   color: "mymelody"    },
  { id: "catalogue", label: "🪑 Catalogue", color: "furniture"   },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("residents");
  const [toast, setToast] = useState({ message: "", visible: false });

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
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.3); border-radius: 10px; }
        ::-webkit-scrollbar-thumb { background: ${solid}; border-radius: 10px; }
        select { appearance: auto; }
      `}</style>

      {/* Dreamy animated pastel background */}
      <div style={{
        position: "fixed", inset: 0, zIndex: -1,
        background: "linear-gradient(-45deg, #ffd6e7, #e8d5f5, #ffddd2, #d5f5e8, #d5eef5, #f5d5f0, #ffefd5, #d5f5e3)",
        backgroundSize: "400% 400%",
        animation: "dreamDrift 28s ease infinite",
      }} />

      {/* Scrolling ticker banner */}
      <div style={{
        width: "100%", overflow: "hidden",
        background: `linear-gradient(90deg, ${solid}cc, ${solid}99)`,
        backdropFilter: "blur(8px)",
        borderBottom: `2px solid ${solid}44`,
        padding: "7px 0",
        transition: "background 0.5s ease",
      }}>
        <div style={{
          display: "flex", whiteSpace: "nowrap",
          animation: "ticker 22s linear infinite",
        }}>
          {[...Array(2)].map((_, i) => (
            <span key={i} style={{
              display: "inline-flex", alignItems: "center", gap: 28,
              paddingRight: 48,
              fontFamily: "'Baloo 2', cursive",
              fontSize: "0.85rem", fontWeight: 700,
              color: "rgba(255,255,255,0.95)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}>
              {[
                "🌺 Active development",
                "✨ More features coming soon",
                "🎀 Thanks for playing!",
                "🌸 Built with love for HKIA fans",
                "🍓 Feedback welcome",
              ].map((msg, j) => (
                <span key={j} style={{ display: "inline-flex", alignItems: "center", gap: 28 }}>
                  {msg}
                  <span style={{ opacity: 0.5 }}>·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Header */}
      <header style={{ textAlign: "center", padding: "28px 20px 0" }}>
        <h1 style={{
          fontFamily: "'Baloo 2', cursive",
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          fontWeight: 800, color: solid,
          textShadow: "3px 3px 0 rgba(255,255,255,0.8)",
          transition: "color 0.5s ease",
        }}>🌺 HKIA Island Companion</h1>
        <p style={{ fontSize: "0.95rem", color: "#7a6a6a", marginTop: 4, fontWeight: 600 }}>
          Hello Kitty Island Adventure · Tracker &amp; Guide
        </p>
      </header>

      {/* Tab Bar */}
      <nav style={{ display: "flex", justifyContent: "center", gap: 10, padding: "20px 20px 0", flexWrap: "wrap" }}>
        {TABS.map((tab) => {
          const isActive  = activeTab === tab.id;
          const tabSolid  = ACCENT_SOLID[tab.color];
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              fontFamily: "'Baloo 2', cursive", fontSize: "1rem", fontWeight: 700,
              padding: "10px 24px", border: "none", borderRadius: 50, cursor: "pointer",
              background: isActive ? tabSolid : "rgba(255,255,255,0.6)",
              color: isActive ? "#fff" : "#7a6a6a",
              boxShadow: isActive ? `0 4px 18px ${tabSolid}66` : "0 2px 10px rgba(180,130,130,0.15)",
              transform: isActive ? "translateY(-2px)" : "none",
              backdropFilter: "blur(8px)",
              transition: "all 0.2s ease",
            }}>{tab.label}</button>
          );
        })}
      </nav>

      {/* Export/Import */}
      <div style={{ display: "flex", justifyContent: "flex-end", maxWidth: 1100, margin: "12px auto 0", padding: "0 16px" }}>
        <ExportImport showToast={showToast} />
      </div>

      {/* Main Content */}
      <main style={{ maxWidth: 1100, margin: "16px auto 40px", padding: "0 16px" }}>
        <div style={{ animation: "fadeUp 0.35s ease" }}>
          {activeTab === "residents" && <ResidentsTab showToast={showToast} />}
          {activeTab === "inventory" && <InventoryTab showToast={showToast} />}
          {activeTab === "recipes"   && <RecipesTab   showToast={showToast} />}
          {activeTab === "catalogue" && <CatalogueTab showToast={showToast} />}
        </div>
      </main>

      <Toast message={toast.message} visible={toast.visible} />
    </>
  );
}
