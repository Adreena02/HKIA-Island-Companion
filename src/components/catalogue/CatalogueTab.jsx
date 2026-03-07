import { useState, useMemo } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { WipNotice } from "../ui/WipNotice";
import { Btn } from "../ui/Btn";
import { Modal } from "../ui/Modal";
import { FormGroup, Input, Select } from "../ui/FormFields";
import { SearchBar, EmptyState } from "../ui/Display";
import { TagInput } from "../ui/TagInput";
import { TagPill } from "../ui/TagPill";
import { SEED_CATALOGUE, CATALOGUE_CATEGORIES, CATALOGUE_OBTAIN, uid } from "../../constants";

const TOFFEE  = "#c8956c";
const TOFFEE2 = "#e8c4a0";

const BLANK_ITEM = { name: "", category: "Seating", obtain: "Crafting", imageUrl: "", owned: false, tags: [] };
const CAT_OPTIONS = CATALOGUE_CATEGORIES.map((c) => ({ value: c, label: c }));
const OBT_OPTIONS = CATALOGUE_OBTAIN.map((o) => ({ value: o, label: o }));

function FurnitureForm({ initial, onSave, onCancel, allTags }) {
  const { th } = useTheme();
  const [form, setForm] = useState({ ...BLANK_ITEM, ...(initial ?? {}) });
  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSave = () => {
    if (!form.name.trim()) return;
    onSave({ id: initial?.id || uid(), name: form.name.trim(), category: form.category, obtain: form.obtain, imageUrl: form.imageUrl.trim(), owned: initial?.owned ?? false, tags: form.tags ?? [] });
  };

  return (
    <>
      <FormGroup label="Furniture Name *"><Input value={form.name} onChange={set("name")} placeholder="e.g. Ribbon Armchair" /></FormGroup>
      <FormGroup label="Image URL" hint="Paste a direct link to the item's image"><Input value={form.imageUrl} onChange={set("imageUrl")} placeholder="https://example.com/image.png" /></FormGroup>
      {form.imageUrl.trim() && (
        <div style={{ marginBottom: 14, textAlign: "center" }}>
          <img src={form.imageUrl} alt="Preview" onError={(e) => { e.target.style.display = "none"; }} style={{ width: 80, height: 80, borderRadius: 12, objectFit: "cover", border: `3px solid ${TOFFEE2}` }} />
        </div>
      )}
      <FormGroup label="Category"><Select value={form.category} onChange={set("category")} options={CAT_OPTIONS} /></FormGroup>
      <FormGroup label="Tags" hint="Tags help match items to resident preferences">
        <TagInput tags={form.tags ?? []} allTags={allTags} onChange={(tags) => setForm((f) => ({ ...f, tags }))} />
      </FormGroup>
      <FormGroup label="How to Obtain"><Select value={form.obtain} onChange={set("obtain")} options={OBT_OPTIONS} /></FormGroup>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20, flexWrap: "wrap" }}>
        <Btn variant="ghost" onClick={onCancel}>Cancel</Btn>
        <button onClick={handleSave} style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 700, fontSize: "0.95rem", padding: "10px 22px", borderRadius: 50, border: "none", cursor: "pointer", background: `linear-gradient(90deg, ${TOFFEE}, ${TOFFEE2})`, color: "#fff", boxShadow: `0 4px 14px ${TOFFEE}66` }}>💾 Save</button>
      </div>
    </>
  );
}

function FurnitureCard({ item, onEdit, onDelete, onToggleOwned }) {
  const { th } = useTheme();
  const [hov, setHov] = useState(false);
  const { id, name, category, obtain, imageUrl, owned, tags } = item;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: owned ? th.card : th.sectionBg,
        borderRadius: 18, padding: "16px 18px",
        position: "relative", overflow: "hidden",
        border: `2px solid ${owned ? TOFFEE + "55" : th.border}`,
        boxShadow: hov ? "0 6px 20px rgba(0,0,0,0.15)" : "0 2px 10px rgba(0,0,0,0.08)",
        transform: hov ? "translateY(-2px)" : "none",
        transition: "all 0.2s ease",
        opacity: owned ? 1 : 0.72,
        display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, borderRadius: "18px 18px 0 0", background: `linear-gradient(90deg, ${TOFFEE}, ${TOFFEE2})` }} />

      <div style={{ width: 56, height: 56, borderRadius: 12, flexShrink: 0, border: `3px solid ${owned ? TOFFEE2 : th.border}`, background: th.progressBg, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {imageUrl ? <img src={imageUrl} alt={name} onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : null}
        <div style={{ display: imageUrl ? "none" : "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", fontSize: "1.5rem" }}>🪑</div>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 700, fontSize: "1rem", color: th.text, marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.72rem", fontWeight: 700, padding: "2px 8px", borderRadius: 50, background: `${TOFFEE}22`, color: TOFFEE }}>{category}</span>
          <span style={{ fontSize: "0.72rem", fontWeight: 700, padding: "2px 8px", borderRadius: 50, background: th.progressBg, color: th.textSub }}>🛒 {obtain}</span>
        </div>
        {(tags ?? []).length > 0 && (
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 4 }}>
            {tags.map((tag) => <TagPill key={tag} tag={tag} />)}
          </div>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
        <button onClick={() => onToggleOwned(id)} title={owned ? "Mark as not owned" : "Mark as owned"} style={{ fontSize: "0.78rem", fontWeight: 700, padding: "4px 12px", borderRadius: 50, border: `2px solid ${owned ? "transparent" : th.border}`, cursor: "pointer", background: owned ? `linear-gradient(90deg, ${TOFFEE}, ${TOFFEE2})` : th.progressBg, color: owned ? "#fff" : th.textSub, transition: "all 0.2s ease", whiteSpace: "nowrap" }}>
          {owned ? "✓ Owned" : "○ Not Owned"}
        </button>
        <div style={{ display: "flex", gap: 4 }}>
          <Btn variant="ghost" small onClick={() => onEdit(item)}>✏️</Btn>
          <Btn variant="danger" small onClick={() => onDelete(id)}>🗑️</Btn>
        </div>
      </div>
    </div>
  );
}

function CategoryGroup({ category, items, onEdit, onDelete, onToggleOwned }) {
  const { th } = useTheme();
  const owned = items.filter((i) => i.owned).length;
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <h3 style={{ fontFamily: "'Baloo 2', cursive", fontSize: "1.1rem", fontWeight: 700, color: TOFFEE }}>{category}</h3>
        <div style={{ height: 1, flex: 1, background: `${TOFFEE}33` }} />
        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: th.textSub }}>{owned}/{items.length} owned</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((item) => <FurnitureCard key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} onToggleOwned={onToggleOwned} />)}
      </div>
    </div>
  );
}

export function CatalogueTab({ showToast }) {
  const { th } = useTheme();
  const [furniture, setFurniture] = useLocalStorage("hkia_catalogue", SEED_CATALOGUE);
  const [search, setSearch]           = useState("");
  const [modalOpen, setModalOpen]     = useState(false);
  const [editing, setEditing]         = useState(null);
  const [filterOwned, setFilterOwned] = useState("all");
  const [activeTag, setActiveTag]     = useState(null);

  const allTags = useMemo(() => {
    const set = new Set();
    furniture.forEach((item) => (item.tags ?? []).forEach((t) => set.add(t)));
    return [...set].sort();
  }, [furniture]);

  const filtered = furniture.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase()) || (item.tags ?? []).some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchOwned = filterOwned === "all" ? true : filterOwned === "owned" ? item.owned : !item.owned;
    const matchTag = activeTag ? (item.tags ?? []).includes(activeTag) : true;
    return matchSearch && matchOwned && matchTag;
  });

  const grouped = CATALOGUE_CATEGORIES.reduce((acc, cat) => {
    const items = filtered.filter((i) => i.category === cat);
    if (items.length) acc[cat] = items;
    return acc;
  }, {});

  const totalOwned = furniture.filter((i) => i.owned).length;
  const openAdd  = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (item) => { setEditing(item); setModalOpen(true); };

  const handleDelete = (id) => {
    if (!confirm("Remove this catalogue item?")) return;
    setFurniture((prev) => prev.filter((i) => i.id !== id));
    showToast("🗑️ Item removed");
  };

  const handleToggleOwned = (id) => setFurniture((prev) => prev.map((i) => i.id === id ? { ...i, owned: !i.owned } : i));

  const handleSave = (data) => {
    if (editing) { setFurniture((prev) => prev.map((i) => i.id === data.id ? data : i)); showToast("✅ Item updated!"); }
    else { setFurniture((prev) => [...prev, data]); showToast("🪑 Catalogue added!"); }
    setModalOpen(false);
  };

  const filterBtnStyle = (val) => ({
    fontFamily: "'Baloo 2', cursive", fontWeight: 700, fontSize: "clamp(0.75rem, 2.5vw, 0.85rem)",
    padding: "6px 14px", borderRadius: 50, border: "none", cursor: "pointer",
    background: filterOwned === val ? `linear-gradient(90deg, ${TOFFEE}, ${TOFFEE2})` : th.pillBg,
    color: filterOwned === val ? "#fff" : th.textSub,
    boxShadow: filterOwned === val ? `0 2px 10px ${TOFFEE}44` : "none",
    transition: "all 0.2s ease", whiteSpace: "nowrap",
  });

  return (
    <>
      <WipNotice tabId="catalogue" title="Catalogue is a work in progress 🪑" message="Track furniture you've collected right now by adding it manually! A full pre-loaded catalogue with all base game and DLC items is on the way." />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
        <div>
          <span style={{ fontFamily: "'Baloo 2', cursive", fontSize: "clamp(1.1rem, 4vw, 1.4rem)", fontWeight: 700, color: th.text }}>🪑 Catalogue</span>
          <span style={{ marginLeft: 10, fontSize: "0.85rem", color: th.textSub, fontWeight: 600 }}>{totalOwned}/{furniture.length} owned</span>
        </div>
        <button onClick={openAdd} style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 700, fontSize: "0.95rem", padding: "10px 22px", borderRadius: 50, border: "none", cursor: "pointer", background: `linear-gradient(90deg, ${TOFFEE}, ${TOFFEE2})`, color: "#fff", boxShadow: `0 4px 14px ${TOFFEE}66` }}>＋ Add Furniture</button>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12, alignItems: "center" }}>
        <div style={{ flex: 1, minWidth: "min(200px, 100%)" }}>
          <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="🔍 Search furniture or tags..." />
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <button style={filterBtnStyle("all")}      onClick={() => setFilterOwned("all")}>All</button>
          <button style={filterBtnStyle("owned")}    onClick={() => setFilterOwned("owned")}>✓ Owned</button>
          <button style={filterBtnStyle("notowned")} onClick={() => setFilterOwned("notowned")}>○ Not Owned</button>
        </div>
      </div>

      {allTags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
          {allTags.map((tag) => (
            <TagPill key={tag} tag={tag}
              bg={activeTag === tag ? "#c04060" : th.tagBg}
              color={activeTag === tag ? "#fff" : "#c04060"}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            />
          ))}
        </div>
      )}

      {Object.keys(grouped).length > 0
        ? Object.entries(grouped).map(([cat, items]) => (
            <CategoryGroup key={cat} category={cat} items={items} onEdit={openEdit} onDelete={handleDelete} onToggleOwned={handleToggleOwned} />
          ))
        : <EmptyState icon="🪑" title="No furniture found" sub="Try a different search, or add your first piece!" />
      }

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "✏️ Edit Item" : "🪑 Add Item"}>
        <FurnitureForm initial={editing} onSave={handleSave} onCancel={() => setModalOpen(false)} allTags={allTags} />
      </Modal>
    </>
  );
}