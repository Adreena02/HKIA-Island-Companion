import { useState, useMemo } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Btn } from "../ui/Btn";
import { Modal } from "../ui/Modal";
import { FormGroup, Input, Select } from "../ui/FormFields";
import { SearchBar, EmptyState } from "../ui/Display";
import { TagInput } from "../ui/TagInput";
import { TagPill } from "../ui/TagPill";
import { QtyBtn } from "./QtyBtn";
import { SEED_INVENTORY, ITEM_CATEGORIES, INVENTORY_CAT_COLORS, uid } from "../../constants";

const BLANK_FORM = { emoji: "", name: "", category: "Ingredient", qty: 1, tags: [] };

export function InventoryTab({ showToast }) {
  const [inventory, setInventory] = useLocalStorage("hkia_inventory", SEED_INVENTORY);
  const [search, setSearch]       = useState("");
  const [activeTag, setActiveTag] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing]     = useState(null); // null = adding, item = editing
  const [form, setForm]           = useState(BLANK_FORM);

  const setField = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const allTags = useMemo(() => {
    const set = new Set();
    inventory.forEach((item) => (item.tags ?? []).forEach((t) => set.add(t)));
    return [...set].sort();
  }, [inventory]);

  const filtered = inventory.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      (item.tags ?? []).some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchTag = activeTag ? (item.tags ?? []).includes(activeTag) : true;
    return matchSearch && matchTag;
  });

  const changeQty = (id, delta) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(0, (item.qty ?? 0) + delta) } : item
      )
    );
  };

  const handleDelete = (id) => {
    setInventory((prev) => prev.filter((item) => item.id !== id));
    showToast("🗑️ Item removed");
  };

  const openAdd = () => {
    setEditing(null);
    setForm(BLANK_FORM);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({
      emoji:    item.emoji,
      name:     item.name,
      category: item.category,
      qty:      item.qty,
      tags:     item.tags ?? [],
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editing) {
      setInventory((prev) => prev.map((item) =>
        item.id === editing.id ? {
          ...item,
          emoji: form.emoji.trim() || "📦",
          name:  form.name.trim(),
          qty:   parseInt(form.qty) || 0,
          tags:  form.tags,
        } : item
      ));
      showToast("✅ Item updated!");
    } else {
      setInventory((prev) => [...prev, {
        id:       uid(),
        emoji:    form.emoji.trim() || "📦",
        name:     form.name.trim(),
        category: form.category,
        qty:      parseInt(form.qty) || 1,
        tags:     form.tags,
      }]);
      showToast("🎒 Item added!");
    }
    setModalOpen(false);
    setForm(BLANK_FORM);
    setEditing(null);
  };

  return (
    <>
      {/* Tab header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
        <span style={{ fontFamily: "'Baloo 2', cursive", fontSize: "1.4rem", fontWeight: 700 }}>
          🎒 My Inventory
        </span>
        <Btn variant="mint" onClick={openAdd}>＋ Add Item</Btn>
      </div>

      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="🔍 Search items, categories, or tags..." />

      {/* Tag filter pills */}
      {allTags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
          {allTags.map((tag) => (
            <TagPill key={tag} tag={tag}
              bg={activeTag === tag ? "#c04060" : "#ffe8f0"}
              color={activeTag === tag ? "#fff" : "#c04060"}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            />
          ))}
        </div>
      )}

      {/* Inventory cards grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(168px, 1fr))", gap: 14 }}>
        {filtered.length
          ? filtered.map((item) => (
              <div key={item.id} style={{
                background: "#fffdf9", borderRadius: 14, padding: 16,
                border: "2px solid rgba(255,255,255,0.9)",
                boxShadow: "0 3px 14px rgba(180,130,130,0.15)",
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: 8, textAlign: "center", position: "relative", transition: "transform 0.2s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; }}
              >
                {/* Edit button */}
                <button onClick={() => openEdit(item)} aria-label={`Edit ${item.name}`}
                  style={{ position: "absolute", top: 8, left: 8, background: "none", border: "none", cursor: "pointer", fontSize: "0.85rem", opacity: 0.3, transition: "opacity 0.15s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.3"; }}
                >✏️</button>

                {/* Delete button */}
                <button onClick={() => handleDelete(item.id)} aria-label={`Remove ${item.name}`}
                  style={{ position: "absolute", top: 8, right: 8, background: "none", border: "none", cursor: "pointer", fontSize: "0.85rem", opacity: 0.3, transition: "opacity 0.15s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.3"; }}
                >✕</button>

                <div style={{ fontSize: "2rem" }}>{item.emoji}</div>
                <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#3a2e2e" }}>{item.name}</div>

                <span style={{
                  fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em",
                  padding: "2px 9px", borderRadius: 50,
                  background: INVENTORY_CAT_COLORS[item.category] || "#f2eee8", color: "#3a2e2e",
                }}>{item.category}</span>

                {(item.tags ?? []).length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center" }}>
                    {item.tags.map((tag) => <TagPill key={tag} tag={tag} />)}
                  </div>
                )}

                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <QtyBtn onClick={() => changeQty(item.id, -1)}>−</QtyBtn>
                  <span style={{ fontFamily: "'Baloo 2', cursive", fontSize: "1.1rem", fontWeight: 700, minWidth: 32, textAlign: "center", color: "#3a2e2e" }}>
                    {item.qty ?? 0}
                  </span>
                  <QtyBtn onClick={() => changeQty(item.id, 1)}>＋</QtyBtn>
                </div>
              </div>
            ))
          : <EmptyState icon="🎒" title="Nothing here yet!" sub="Add items you've collected on the island." />
        }
      </div>

      {/* Add / Edit modal */}
      <Modal open={modalOpen} onClose={() => { setModalOpen(false); setEditing(null); setForm(BLANK_FORM); }}
        title={editing ? "✏️ Edit Item" : "🎒 Add Inventory Item"}>
        <FormGroup label="Emoji Icon">
          <Input value={form.emoji} onChange={setField("emoji")} placeholder="e.g. 🍎" />
        </FormGroup>
        <FormGroup label="Item Name *">
          <Input value={form.name} onChange={setField("name")} placeholder="e.g. Apple" />
        </FormGroup>
        {!editing && (
          <FormGroup label="Category">
            <Select value={form.category} onChange={setField("category")} options={ITEM_CATEGORIES} />
          </FormGroup>
        )}
        <FormGroup label="Tags" hint="Tags help match items to resident preferences">
          <TagInput
            tags={form.tags}
            allTags={allTags}
            onChange={(tags) => setForm((prev) => ({ ...prev, tags }))}
          />
        </FormGroup>
        <FormGroup label="Quantity">
          <Input type="number" value={form.qty} onChange={setField("qty")} min={0} />
        </FormGroup>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 }}>
          <Btn variant="ghost" onClick={() => { setModalOpen(false); setEditing(null); setForm(BLANK_FORM); }}>Cancel</Btn>
          <Btn variant="mint" onClick={handleSave}>💾 {editing ? "Save Changes" : "Save"}</Btn>
        </div>
      </Modal>
    </>
  );
}
