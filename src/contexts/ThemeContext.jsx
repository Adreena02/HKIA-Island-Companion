import { createContext, useContext, useState, useEffect } from "react";

const LIGHT = {
  bg:           "linear-gradient(135deg, #fff0f3 0%, #fce4ec 25%, #f8f0ff 50%, #e8f4ff 75%, #fff8e1 100%)",
  card:         "#fffdf9",
  cardAlt:      "rgba(255,255,255,0.7)",
  border:       "rgba(232,200,210,0.5)",
  borderStrong: "rgba(200,160,180,0.4)",
  text:         "#3a2e2e",
  textSub:      "#7a6a6a",
  textMuted:    "#a08080",
  input:        "#fff",
  inputBorder:  "#e8d0d8",
  overlay:      "rgba(80,40,60,0.35)",
  pillBg:       "rgba(255,255,255,0.6)",
  pillBgHover:  "rgba(255,255,255,0.9)",
  progressBg:   "#f2eee8",
  tagBg:        "#f5f0f8",
  tagText:      "#7a6a8a",
  tagBorder:    "#e8d8f0",
  wipBg:        "#fffbeb",
  wipBorder:    "#fde68a",
  wipText:      "#92400e",
  toastBg:      "#3a2e2e",
  toastText:    "#fff",
  modalBg:      "#fff",
  sectionBg:    "#fdf8ff",
  infoBox:      "#f0f8ff",
  infoBoxBorder:"#c8dff0",
  infoBoxText:  "#2a4a6a",
  warnBg:       "#fff8e8",
  warnBorder:   "#f0d8a8",
  warnText:     "#a07040",
};

const DARK = {
  bg:           "linear-gradient(135deg, #1a1020 0%, #1e1428 25%, #181424 50%, #141820 75%, #1a1820 100%)",
  card:         "#241830",
  cardAlt:      "rgba(36,24,48,0.85)",
  border:       "rgba(80,50,100,0.5)",
  borderStrong: "rgba(100,70,130,0.5)",
  text:         "#f0e8f4",
  textSub:      "#b09ab8",
  textMuted:    "#7a6a88",
  input:        "#2e1e3e",
  inputBorder:  "#4a3060",
  overlay:      "rgba(10,5,20,0.65)",
  pillBg:       "rgba(50,30,70,0.7)",
  pillBgHover:  "rgba(70,45,95,0.9)",
  progressBg:   "#2e1e3e",
  tagBg:        "#2e1e40",
  tagText:      "#c8a8e8",
  tagBorder:    "#4a2e68",
  wipBg:        "#2a1e10",
  wipBorder:    "#78500a",
  wipText:      "#fbbf24",
  toastBg:      "#f0e8f4",
  toastText:    "#1a1020",
  modalBg:      "#1e1430",
  sectionBg:    "#1e1630",
  infoBox:      "#1a2030",
  infoBoxBorder:"#2a4060",
  infoBoxText:  "#90b8d8",
  warnBg:       "#2a1e10",
  warnBorder:   "#5a3a10",
  warnText:     "#f0a040",
};

// Dark-mode overrides for accent colours that are too dark to read on a dark background
export const ACCENT_SOLID_DARK = {
  chococat:  "#c8956c", // warm caramel — readable on dark, still feels chocolatey
  badtzmaru: "#facc15", // Badtz's yellow — pulled from his bg gradient, punchy on dark
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem("hkia_dark") === "1"; } catch { return false; }
  });

  useEffect(() => {
    try { localStorage.setItem("hkia_dark", dark ? "1" : "0"); } catch {}
  }, [dark]);

  const th = dark ? DARK : LIGHT;

  return (
    <ThemeContext.Provider value={{ dark, setDark, th }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}