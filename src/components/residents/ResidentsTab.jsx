import { useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { SearchBar, EmptyState } from "../ui/Display";
import { ResidentCard } from "./ResidentCard";
import { ResidentDetailModal } from "./ResidentDetailModal";
import { SEED_RESIDENTS, migrateResident } from "../../constants";
import { getCurrentGiftCount } from "../../utils/giftReset";

export function ResidentsTab({ showToast }) {
  const [rawResidents, setResidents] = useLocalStorage("hkia_residents", SEED_RESIDENTS);
  const [inventory] = useLocalStorage("hkia_inventory", []);
  const residents = rawResidents.map(migrateResident);
  const [search, setSearch]                 = useState("");
  const [filterAvail, setFilterAvail]       = useState("all");
  const [detailResident, setDetailResident] = useState(null);

  const filtered = residents.filter((r) => {
    const matchSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.gifts?.some((g) => g.name?.toLowerCase().includes(search.toLowerCase()));
    const matchAvail =
      filterAvail === "all"       ? true :
      filterAvail === "immediate" ? !r.note :
      !!r.note;
    return matchSearch && matchAvail;
  });

  const handleLevelChange = (id, newLevel) => {
    setResidents((prev) => prev.map((r) => r.id === id ? { ...r, currentLevel: newLevel } : r));
  };

  const handleAbilityToggle = (id, abilityIndex, levelIndex) => {
    const toggle = (abilities) => abilities.map((a, ai) => {
      if (ai !== abilityIndex) return a;
      const levels = a.levels.map((lvl, li) =>
        li === levelIndex ? { ...lvl, unlocked: !lvl.unlocked } : lvl
      );
      return { ...a, levels };
    });
    setResidents((prev) => prev.map((r) => r.id === id ? { ...r, abilities: toggle(r.abilities) } : r));
    setDetailResident((prev) => prev?.id === id ? { ...prev, abilities: toggle(prev.abilities) } : prev);
  };

  const handleGiftLog = (id) => {
    const updater = (r) => {
      if (r.id !== id) return r;
      const count = getCurrentGiftCount(r.giftLog);
      if (count >= 3) return r;
      return { ...r, giftLog: { count: count + 1, lastGiftedAt: new Date().toISOString() } };
    };
    setResidents((prev) => prev.map(updater));
    setDetailResident((prev) => prev ? updater(prev) : prev);
  };

  const handleGiftReset = (id) => {
    const updater = (r) => r.id === id ? { ...r, giftLog: { count: 0, lastGiftedAt: null } } : r;
    setResidents((prev) => prev.map(updater));
    setDetailResident((prev) => prev ? updater(prev) : prev);
  };

  const handleNoteChange = (id, text) => {
    const updater = (r) => r.id === id ? { ...r, personalNote: text } : r;
    setResidents((prev) => prev.map(updater));
    setDetailResident((prev) => prev ? updater(prev) : prev);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
        <span style={{ fontFamily: "'Baloo 2', cursive", fontSize: "1.4rem", fontWeight: 700 }}>🐾 Island Residents</span>
      </div>

      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="🔍 Search residents or gifts..." />

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "12px 0 20px" }}>
        {[
          { val: "all",       label: "🌺 All" },
          { val: "immediate", label: "⭐ Immediately Available" },
          { val: "elsewhere", label: "🗺️ Encountered Elsewhere" },
        ].map(({ val, label }) => (
          <button key={val} onClick={() => setFilterAvail(val)} style={{
            fontFamily: "'Baloo 2', cursive", fontWeight: 700,
            fontSize: "clamp(0.75rem, 2.5vw, 0.85rem)",
            padding: "6px 14px", borderRadius: 50, border: "none", cursor: "pointer",
            background: filterAvail === val ? "#e8003c" : "rgba(255,255,255,0.6)",
            color: filterAvail === val ? "#fff" : "#7a6a6a",
            boxShadow: filterAvail === val ? "0 2px 10px #e8003c44" : "none",
            backdropFilter: "blur(8px)",
            transition: "all 0.2s ease",
            whiteSpace: "nowrap",
          }}>{label}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(320px, 100%), 1fr))", gap: 22 }}>
        {filtered.length ? filtered.map((r) => (
          <ResidentCard
            key={r.id} resident={r}
            onLevelChange={handleLevelChange}
            onViewDetails={setDetailResident}
            onGiftLog={handleGiftLog}
          />
        )) : (
          <EmptyState icon="🌴" title="No residents found" sub="Try a different search or filter!" />
        )}
      </div>

      <ResidentDetailModal
        resident={detailResident}
        open={!!detailResident}
        onClose={() => setDetailResident(null)}
        onAbilityToggle={handleAbilityToggle}
        onGiftLog={handleGiftLog}
        onGiftReset={handleGiftReset}
        onNoteChange={handleNoteChange}
        inventory={inventory}
      />
    </>
  );
}