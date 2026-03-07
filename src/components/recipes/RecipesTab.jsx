import { useState, useMemo } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Modal } from "../ui/Modal";
import { SearchBar, EmptyState } from "../ui/Display";
import { SEED_INVENTORY, ACCENT_SOLID } from "../../constants";
import { STATIONS } from "../../constants_stations";
import { STATION_RECIPES_ENRICHED } from "../../constants_station_recipes";
import confetti from "canvas-confetti";

const RARITY_COLORS = {
  common:    { bg: "#f5f0e8", text: "#7a6a6a", border: "#e8d8c8" },
  uncommon:  { bg: "#e8f5e8", text: "#2d6a2d", border: "#b8ddb8" },
  rare:      { bg: "#e8eef8", text: "#2d4a8a", border: "#b8c8e8" },
  legendary: { bg: "#fdf0d8", text: "#8a5a00", border: "#e8cc88" },
};

const RARITY_LABEL = { common: "Common", uncommon: "Uncommon", rare: "Rare", legendary: "Legendary" };

function checkIngredients(ingredients, inventory) {
  return ingredients.map((ing) => {
    const found = inventory.find((i) => i.name.toLowerCase() === ing.toLowerCase());
    const have = found?.qty ?? 0;
    return { name: ing, have, satisfied: have >= 1 };
  });
}

function upgradeLabel(station) {
  const u = station.upgrade;
  if (!u) return null;
  if (u.type === "collection") return `Collect ${u.goal} ${u.collectible}, claim from ${u.claimFrom}`;
  if (u.type === "quest") return `Complete "${u.quest}" (requires ${u.resident} friendship level ${u.friendshipLevel}${u.dlc ? ` · ${u.dlc} DLC` : ""})`;
  return `${u.resident} friendship level ${u.friendshipLevel}`;
}

function RecipeDetailModal({ recipe, station, inventory, open, onClose }) {
  const { th } = useTheme();
  const allIngredients = useMemo(() => {
    if (!recipe) return [];
    const base = station?.baseIngredient ? [station.baseIngredient] : [];
    const fixed = station?.upgrade?.fixedIngredient && recipe.requiresUpgrade ? [station.upgrade.fixedIngredient] : [];
    return [...base, ...fixed, ...recipe.ingredients];
  }, [recipe, station]);

  const checked = useMemo(() => checkIngredients(allIngredients, inventory), [allIngredients, inventory]);
  const satisfied = checked.filter((i) => i.satisfied).length;
  const total = checked.length;
  const canCraft = satisfied === total && total > 0;

  const [fired, setFired] = useState(false);
  if (open && canCraft && !fired) {
    setFired(true);
    setTimeout(() => confetti({
      particleCount: 120, spread: 80, origin: { y: 0.55 },
      colors: ["#e8003c", "#f5a0c8", "#f9c8dd", "#fff0f3", "#ffd6df", "#f472b6", "#ffffff"],
      scalar: 0.9,
    }), 200);
  }
  if (!open && fired) setFired(false);
  if (!recipe) return null;

  const rarity = RARITY_COLORS[recipe.rarity] ?? RARITY_COLORS.common;

  return (
    <Modal open={open} onClose={onClose} title={`${station?.emoji ?? "🍽️"} ${recipe.name}`}>
      {recipe.image && (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <img src={recipe.image} alt={recipe.name} style={{ width: 80, height: 80, objectFit: "contain" }} />
        </div>
      )}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "3px 10px", borderRadius: 50, background: rarity.bg, color: rarity.text, border: `1px solid ${rarity.border}` }}>
          {RARITY_LABEL[recipe.rarity]}
        </span>
        {recipe.event && <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "3px 10px", borderRadius: 50, background: "#fdf0ff", color: "#7a2d8a", border: "1px solid #e8b8f0" }}>🎉 {recipe.event}</span>}
        {recipe.dlc && <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "3px 10px", borderRadius: 50, background: "#fff8e0", color: "#8a6a00", border: "1px solid #e8d888" }}>💎 {recipe.dlc}</span>}
        {recipe.requiresUpgrade && <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "3px 10px", borderRadius: 50, background: "#f0e8ff", color: "#5a2d8a", border: "1px solid #c8a8f0" }}>⬆️ Requires upgrade</span>}
      </div>

      {recipe.effect && (
        <div style={{ marginBottom: 16, padding: "10px 14px", borderRadius: 12, background: th.infoBox, border: `1px solid ${th.infoBoxBorder}`, fontSize: "0.88rem", color: th.infoBoxText }}>
          <span style={{ fontWeight: 700 }}>Effect: </span>{recipe.effect}
          {recipe.duration && <span style={{ marginLeft: 8, opacity: 0.7 }}>· {recipe.duration}</span>}
        </div>
      )}

      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: th.textSub }}>Ingredients Ready</span>
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: canCraft ? "#22c55e" : "#e8637c" }}>{satisfied}/{total}</span>
        </div>
        <div style={{ height: 10, borderRadius: 10, background: th.progressBg, overflow: "hidden" }} role="progressbar" aria-valuenow={satisfied} aria-valuemin={0} aria-valuemax={total}>
          <div style={{ height: "100%", borderRadius: 10, width: `${total > 0 ? (satisfied / total) * 100 : 0}%`, background: canCraft ? "linear-gradient(90deg, #22c55e, #86efac)" : "linear-gradient(90deg, #f5a0c8, #e8637c)", transition: "width 0.4s ease" }} />
        </div>
        {canCraft && <div style={{ marginTop: 8, textAlign: "center", fontSize: "0.85rem", fontWeight: 700, color: "#22c55e" }}>✨ You have everything to make this!</div>}
      </div>

      <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: th.textSub, marginBottom: 10 }}>Ingredient Checklist</div>
      {checked.map((ing, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, marginBottom: 6, background: ing.satisfied ? "rgba(34,197,94,0.08)" : "rgba(232,99,124,0.08)", border: `1px solid ${ing.satisfied ? "rgba(34,197,94,0.2)" : "rgba(232,99,124,0.2)"}` }}>
          <span style={{ fontSize: "1rem", flexShrink: 0 }} aria-hidden="true">{ing.satisfied ? "✅" : "❌"}</span>
          <span style={{ flex: 1, fontWeight: 600, fontSize: "0.9rem", color: th.text }}>{ing.name}</span>
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: ing.satisfied ? "#22c55e" : "#e8637c" }}>{ing.have} in inventory</span>
        </div>
      ))}

      {recipe.tags?.length > 0 && (
        <div style={{ marginTop: 16, display: "flex", gap: 6, flexWrap: "wrap" }}>
          {recipe.tags.map((tag) => (
            <span key={tag} style={{ fontSize: "0.72rem", fontWeight: 700, padding: "2px 8px", borderRadius: 50, background: th.tagBg, color: th.tagText, border: `1px solid ${th.tagBorder}` }}>{tag}</span>
          ))}
        </div>
      )}
    </Modal>
  );
}

const SELECTOR_STATIONS = [
  ...STATIONS.filter((s) => s.id !== "espresso_comedy" && s.id !== "espresso_cafe"),
  {
    id: "espresso", name: "Espresso Machine", emoji: "☕",
    owners: ["Hangyodon", "Hello Kitty"],
    location: "Comedy Club & Hello Kitty Cafe",
    baseIngredient: "Candlenut",
    upgrade: { friendshipLevel: 4, resident: "Hangyodon", slots: 3 },
    _ids: ["espresso_comedy", "espresso_cafe"],
  },
];

export function RecipesTab({ showToast }) {
  const { th } = useTheme();
  const [inventory] = useLocalStorage("hkia_inventory", SEED_INVENTORY);
  const [activeStation, setActiveStation] = useState(SELECTOR_STATIONS[0].id);
  const [search, setSearch] = useState("");
  const [rarityFilter, setRarityFilter] = useState("All");
  const [showEventOnly, setShowEventOnly] = useState(false);
  const [showDlcOnly, setShowDlcOnly] = useState(false);
  const [detailRecipe, setDetailRecipe] = useState(null);

  const station = SELECTOR_STATIONS.find((s) => s.id === activeStation);
  const solid = ACCENT_SOLID["hellokitty"];

  const stationRecipes = useMemo(() => {
    const ids = station?._ids ?? [activeStation];
    return STATION_RECIPES_ENRICHED.filter((r) => ids.some((id) => r.stations.includes(id)));
  }, [activeStation, station]);

  const enriched = useMemo(() => {
    return stationRecipes.map((r) => {
      const allIngs = [
        ...(station?.baseIngredient ? [station.baseIngredient] : []),
        ...(station?.upgrade?.fixedIngredient && r.requiresUpgrade ? [station.upgrade.fixedIngredient] : []),
        ...r.ingredients,
      ];
      const checked = checkIngredients(allIngs, inventory);
      const ready = checked.filter((i) => i.satisfied).length;
      const canCraft = ready === checked.length && checked.length > 0;
      return { ...r, checked, ready, total: checked.length, canCraft };
    });
  }, [stationRecipes, inventory, station]);

  const filtered = useMemo(() => {
    return enriched
      .filter((r) => {
        const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
          r.ingredients.some((i) => i.toLowerCase().includes(search.toLowerCase())) ||
          r.tags?.some((t) => t.toLowerCase().includes(search.toLowerCase()));
        const matchRarity = rarityFilter === "All" || r.rarity === rarityFilter.toLowerCase();
        const matchEvent = !showEventOnly || !!r.event;
        const matchDlc = !showDlcOnly || !!r.dlc;
        return matchSearch && matchRarity && matchEvent && matchDlc;
      })
      .sort((a, b) => b.canCraft - a.canCraft || b.ready / (b.total || 1) - a.ready / (a.total || 1));
  }, [enriched, search, rarityFilter, showEventOnly, showDlcOnly]);

  const readyCount = enriched.filter((r) => r.canCraft).length;
  const upgradeInfo = upgradeLabel(station);

  return (
    <>
      {/* Station selector */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {SELECTOR_STATIONS.map((s) => {
          const isActive = s.id === activeStation;
          return (
            <button key={s.id}
              onClick={() => { setActiveStation(s.id); setSearch(""); setRarityFilter("All"); setShowEventOnly(false); setShowDlcOnly(false); }}
              style={{
                fontFamily: "'Baloo 2', cursive", fontWeight: 700,
                fontSize: "clamp(0.8rem, 2.5vw, 0.95rem)",
                padding: "8px 18px", borderRadius: 50, border: "none", cursor: "pointer",
                background: isActive ? solid : th.pillBg,
                color: isActive ? "#fff" : th.textSub,
                boxShadow: isActive ? `0 4px 18px ${solid}55` : "none",
                transform: isActive ? "translateY(-2px)" : "none",
                transition: "all 0.2s ease", whiteSpace: "nowrap",
              }}
            >{s.emoji} {s.name}</button>
          );
        })}
      </div>

      {/* Station info panel */}
      {station && (
        <div style={{ background: th.cardAlt, borderRadius: 18, padding: "16px 20px", marginBottom: 20, backdropFilter: "blur(8px)", border: `1px solid ${th.border}`, display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-start" }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 800, fontSize: "1.1rem", color: solid, marginBottom: 4 }}>{station.emoji} {station.name}</div>
            <div style={{ fontSize: "0.85rem", color: th.textSub, display: "flex", flexWrap: "wrap", gap: 12 }}>
              {station.location && <span>📍 {station.location}</span>}
              <span>👤 {station.owners.join(" & ")}</span>
              <span>🧂 Base: <strong style={{ color: th.text }}>{station.baseIngredient}</strong></span>
            </div>
            {station.note && (
              <div style={{ marginTop: 8, fontSize: "0.8rem", color: th.warnText, background: th.warnBg, borderRadius: 8, padding: "6px 10px", border: `1px solid ${th.warnBorder}` }}>
                ⚠️ {station.note}
              </div>
            )}
          </div>
          {upgradeInfo && (
            <div style={{ fontSize: "0.82rem", color: "#9a78d8", background: th.tagBg, borderRadius: 10, padding: "8px 12px", border: `1px solid ${th.tagBorder}`, maxWidth: 280 }}>
              <span style={{ fontWeight: 700 }}>⬆️ Upgrade: </span>{upgradeInfo}
            </div>
          )}
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
        <div style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 800, fontSize: "clamp(1.1rem, 3vw, 1.4rem)", color: solid }}>
          {station?.emoji} {station?.name} Recipes
          {readyCount > 0 && (
            <span style={{ marginLeft: 10, fontSize: "0.8rem", fontWeight: 700, padding: "3px 10px", borderRadius: 50, background: "rgba(34,197,94,0.15)", color: "#16a34a" }}>
              ✨ {readyCount} ready
            </span>
          )}
        </div>
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search recipes or ingredients..." />
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20, alignItems: "center" }}>
        {["All", "Common", "Uncommon", "Rare", "Legendary"].map((r) => (
          <button key={r} onClick={() => setRarityFilter(r)} style={{
            fontFamily: "'Baloo 2', cursive", fontWeight: 700,
            fontSize: "clamp(0.72rem, 2vw, 0.82rem)",
            padding: "5px 14px", borderRadius: 50, border: "none", cursor: "pointer",
            background: rarityFilter === r ? (RARITY_COLORS[r.toLowerCase()]?.bg ?? solid) : th.pillBg,
            color: rarityFilter === r ? (RARITY_COLORS[r.toLowerCase()]?.text ?? "#fff") : th.textSub,
            boxShadow: rarityFilter === r ? "0 2px 10px rgba(180,130,130,0.2)" : "none",
            transition: "all 0.2s ease", whiteSpace: "nowrap",
          }}>{r}</button>
        ))}
        <button onClick={() => setShowEventOnly((v) => !v)} style={{
          fontFamily: "'Baloo 2', cursive", fontWeight: 700, fontSize: "clamp(0.72rem, 2vw, 0.82rem)",
          padding: "5px 14px", borderRadius: 50, border: "none", cursor: "pointer",
          background: showEventOnly ? "#f0e0ff" : th.pillBg,
          color: showEventOnly ? "#7a2d8a" : th.textSub,
          transition: "all 0.2s ease",
        }}>🎉 Seasonal</button>
        <button onClick={() => setShowDlcOnly((v) => !v)} style={{
          fontFamily: "'Baloo 2', cursive", fontWeight: 700, fontSize: "clamp(0.72rem, 2vw, 0.82rem)",
          padding: "5px 14px", borderRadius: 50, border: "none", cursor: "pointer",
          background: showDlcOnly ? "#fff8e0" : th.pillBg,
          color: showDlcOnly ? "#8a6a00" : th.textSub,
          transition: "all 0.2s ease",
        }}>💎 DLC</button>
      </div>

      {/* Recipe grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))", gap: 16 }}>
        {filtered.length ? filtered.map((r) => {
          const rarity = RARITY_COLORS[r.rarity] ?? RARITY_COLORS.common;
          return (
            <div key={r.id}
              onClick={() => setDetailRecipe(r)}
              role="button" tabIndex={0} aria-label={`View recipe for ${r.name}`}
              onKeyDown={(e) => e.key === "Enter" && setDetailRecipe(r)}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "none"}
              style={{
                background: th.card, borderRadius: 18, padding: 18, cursor: "pointer",
                border: r.canCraft ? "2px solid rgba(34,197,94,0.35)" : `2px solid ${th.border}`,
                boxShadow: r.canCraft ? "0 4px 18px rgba(34,197,94,0.15)" : "0 4px 18px rgba(0,0,0,0.08)",
                transition: "transform 0.2s ease",
                display: "flex", flexDirection: "column", gap: 10,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
                  {r.image && <img src={r.image} alt={r.name} style={{ width: 40, height: 40, objectFit: "contain", flexShrink: 0 }} />}
                  <div style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 700, fontSize: "1rem", color: th.text, lineHeight: 1.3 }}>{r.name}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
                  {r.canCraft && <span style={{ fontSize: "0.68rem", fontWeight: 700, padding: "2px 8px", borderRadius: 50, background: "rgba(34,197,94,0.15)", color: "#16a34a", whiteSpace: "nowrap" }}>✨ Ready</span>}
                  <span style={{ fontSize: "0.68rem", fontWeight: 700, padding: "2px 8px", borderRadius: 50, background: rarity.bg, color: rarity.text, border: `1px solid ${rarity.border}`, whiteSpace: "nowrap" }}>{RARITY_LABEL[r.rarity]}</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                {r.requiresUpgrade && <span style={{ fontSize: "0.65rem", fontWeight: 700, padding: "2px 7px", borderRadius: 50, background: th.tagBg, color: "#9a78d8", border: `1px solid ${th.tagBorder}` }}>⬆️ Upgrade</span>}
                {r.event && <span style={{ fontSize: "0.65rem", fontWeight: 700, padding: "2px 7px", borderRadius: 50, background: "#fdf0ff", color: "#7a2d8a", border: "1px solid #e8b8f0" }}>🎉 Seasonal</span>}
                {r.dlc && <span style={{ fontSize: "0.65rem", fontWeight: 700, padding: "2px 7px", borderRadius: 50, background: "#fff8e0", color: "#8a6a00", border: "1px solid #e8d888" }}>💎 DLC</span>}
              </div>

              <div style={{ fontSize: "0.8rem", color: th.textSub }}>
                <span style={{ fontWeight: 700, color: th.text }}>{station?.baseIngredient}</span>
                {r.requiresUpgrade && station?.upgrade?.fixedIngredient && <span> · <span style={{ fontWeight: 700, color: th.text }}>{station.upgrade.fixedIngredient}</span></span>}
                {r.ingredients.map((ing, i) => <span key={i}> · {ing}</span>)}
              </div>

              {r.total > 0 && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <span style={{ fontSize: "0.7rem", color: th.textSub, fontWeight: 600 }}>Ingredients</span>
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, color: r.canCraft ? "#22c55e" : "#e8637c" }}>{r.ready}/{r.total}</span>
                  </div>
                  <div style={{ height: 5, borderRadius: 5, background: th.progressBg, overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: 5, width: `${(r.ready / r.total) * 100}%`, background: r.canCraft ? "linear-gradient(90deg, #22c55e, #86efac)" : "linear-gradient(90deg, #f5a0c8, #e8637c)", transition: "width 0.4s ease" }} />
                  </div>
                </div>
              )}
            </div>
          );
        }) : (
          <EmptyState icon={station?.emoji ?? "📖"} title="No recipes found" sub="Try adjusting your filters or search term." />
        )}
      </div>

      <RecipeDetailModal recipe={detailRecipe} station={station} inventory={inventory} open={!!detailRecipe} onClose={() => setDetailRecipe(null)} />
    </>
  );
}