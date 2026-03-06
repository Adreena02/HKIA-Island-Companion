import { useState, useEffect, useMemo } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { WipNotice } from "../ui/WipNotice";
import { Btn } from "../ui/Btn";
import { Modal } from "../ui/Modal";
import { FormGroup, Input, Select } from "../ui/FormFields";
import { SearchBar, EmptyState } from "../ui/Display";
import { SEED_RECIPES, SEED_INVENTORY, RECIPE_CATEGORIES, RECIPE_CAT_COLORS, uid } from "../../constants";
import confetti from "canvas-confetti";

const BLANK_FORM = { emoji: "", name: "", result: "", category: "Cooking" };

function checkIngredients(ingredients, inventory) {
  return ingredients.map((ing) => {
    const invItem = inventory.find(
      (i) => i.name.toLowerCase() === ing.name.toLowerCase()
    );
    const have = invItem?.qty ?? 0;
    const need = ing.qty;
    return { ...ing, have, need, satisfied: have >= need };
  });
}

function RecipeDetailModal({ recipe, inventory, open, onClose }) {
  const checked   = recipe ? checkIngredients(recipe.ingredients, inventory) : [];
  const satisfied = checked.filter((i) => i.satisfied).length;
  const total     = checked.length;
  const progress  = total > 0 ? satisfied / total : 0;
  const canCraft  = satisfied === total && total > 0;

  useEffect(() => {
    if (!open || !canCraft) return;
    const timer = setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.55 },
        colors: ["#e8003c", "#f5a0c8", "#f9c8dd", "#fff0f3", "#ffd6df", "#f472b6", "#ffffff"],
        scalar: 0.9,
      });
    }, 200);
    return () => clearTimeout(timer);
  }, [open, canCraft]);

  if (!recipe) return null;

  return (
    <Modal open={open} onClose={onClose} title={`${recipe.emoji || "🍽️"} ${recipe.name}`}>

      {/* Result */}
      {recipe.result && (
        <div style={{ marginBottom: 18, fontSize: "0.9rem", color: "#7a6a6a", fontWeight: 600 }}>
          → {recipe.result}
        </div>
      )}

      {/* Progress bar */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#7a6a6a" }}>
            Ingredients Ready
          </span>
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: canCraft ? "#22c55e" : "#e8637c" }}
                aria-label={`${satisfied} of ${total} ingredients ready`}>
            {satisfied}/{total}
          </span>
        </div>
        <div style={{ height: 10, borderRadius: 10, background: "#f2eee8", overflow: "hidden" }}
             role="progressbar" aria-valuenow={satisfied} aria-valuemin={0} aria-valuemax={total}>
          <div style={{
            height: "100%", borderRadius: 10,
            background: canCraft
              ? "linear-gradient(90deg, #22c55e, #86efac)"
              : "linear-gradient(90deg, #f5a0c8, #e8637c)",
            width: `${progress * 100}%`,
            transition: "width 0.4s ease",
          }} />
        </div>
        {canCraft && (
          <div style={{ marginTop: 8, textAlign: "center", fontSize: "0.85rem", fontWeight: 700, color: "#22c55e" }}>
            ✨ You have everything to craft this!
          </div>
        )}
      </div>

      {/* Ingredient list */}
      <div>
        <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#7a6a6a", marginBottom: 10 }}>
          Ingredient Checklist
        </div>
        {checked.length ? checked.map((ing, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "9px 12px", borderRadius: 10, marginBottom: 6,
            background: ing.satisfied ? "rgba(34,197,94,0.08)" : "rgba(232,99,124,0.08)",
            border: `1px solid ${ing.satisfied ? "rgba(34,197,94,0.2)" : "rgba(232,99,124,0.2)"}`,
          }}>
            <span style={{ fontSize: "1rem", flexShrink: 0 }} aria-hidden="true">
              {ing.satisfied ? "✅" : "❌"}
            </span>
            <span style={{ flex: 1, fontWeight: 600, fontSize: "0.9rem", color: "#3a2e2e" }}>
              {ing.name}
            </span>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: ing.satisfied ? "#22c55e" : "#e8637c" }}>
                {ing.have}
              </span>
              <span style={{ fontSize: "0.8rem", color: "#b0a0a0" }}>
                /{ing.need} needed
              </span>
            </div>
          </div>
        )) : (
          <div style={{ color: "#b0a0a0", fontSize: "0.85rem", fontStyle: "italic" }}>No ingredients listed for this recipe.</div>
        )}
      </div>

      {/* Still needed summary */}
      {!canCraft && checked.some((i) => !i.satisfied) && (
        <div style={{ marginTop: 18, padding: "12px 14px", borderRadius: 12, background: "#fff8f0", border: "1px solid #fde8d0" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#c8956c", marginBottom: 8 }}>
            Still needed
          </div>
          {checked.filter((i) => !i.satisfied).map((ing, i) => (
            <div key={i} style={{ fontSize: "0.88rem", color: "#7a6a6a", marginBottom: 4 }}>
              • <strong>{ing.need - ing.have}× {ing.name}</strong> more
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}

export function RecipesTab({ showToast }) {
  const [recipes, setRecipes]           = useLocalStorage("hkia_recipes", SEED_RECIPES);
  const [inventory]                     = useLocalStorage("hkia_inventory", SEED_INVENTORY);
  const [search, setSearch]             = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [modalOpen, setModalOpen]       = useState(false);
  const [detailRecipe, setDetailRecipe] = useState(null);
  const [editing, setEditing]           = useState(null);
  const [form, setForm]                 = useState(BLANK_FORM);
  const [ingredients, setIngredients]   = useState([{ id: uid(), name: "", qty: 1 }]);

  const inventoryNames = inventory.map((i) => i.name);

  // Enrich recipes with craftability
  const enriched = useMemo(() => recipes.map((r) => {
    const checked  = checkIngredients(r.ingredients, inventory);
    const ready    = checked.filter((i) => i.satisfied).length;
    const total    = checked.length;
    const canCraft = ready === total && total > 0;
    return { ...r, ready, total, canCraft };
  }), [recipes, inventory]);

  // Filter then sort: craftable first
  const filtered = useMemo(() => {
    return enriched
      .filter((r) => {
        const matchSearch =
          r.name.toLowerCase().includes(search.toLowerCase()) ||
          r.category.toLowerCase().includes(search.toLowerCase()) ||
          r.ingredients.some((i) => i.name.toLowerCase().includes(search.toLowerCase()));
        const matchCat = activeCategory === "All" || r.category === activeCategory;
        return matchSearch && matchCat;
      })
      .sort((a, b) => b.canCraft - a.canCraft || b.ready / (b.total || 1) - a.ready / (a.total || 1));
  }, [enriched, search, activeCategory]);

  const craftableCount = enriched.filter((r) => r.canCraft).length;

  const openAdd = () => {
    setEditing(null);
    setForm(BLANK_FORM);
    setIngredients([{ id: uid(), name: "", qty: 1 }]);
    setModalOpen(true);
  };

  const openEdit = (recipe) => {
    setEditing(recipe);
    setForm({ emoji: recipe.emoji, name: recipe.name, result: recipe.result, category: recipe.category });
    setIngredients(recipe.ingredients.map((i) => ({ ...i, id: uid() })));
    setModalOpen(true);
  };

  const addIngRow    = () => setIngredients((prev) => [...prev, { id: uid(), name: "", qty: 1 }]);
  const removeIngRow = (id) => setIngredients((prev) => prev.filter((i) => i.id !== id));
  const updateIng    = (id, field, val) =>
    setIngredients((prev) => prev.map((i) => i.id === id ? { ...i, [field]: val } : i));

  const handleSave = () => {
    if (!form.name.trim()) return;
    const data = {
      id:          editing?.id || uid(),
      emoji:       form.emoji.trim() || "🍽️",
      name:        form.name.trim(),
      result:      form.result.trim(),
      category:    form.category,
      ingredients: ingredients
        .filter((i) => i.name.trim())
        .map((i) => ({ name: i.name.trim(), qty: parseInt(i.qty) || 1 })),
    };
    if (editing) {
      setRecipes((prev) => prev.map((r) => r.id === data.id ? data : r));
      showToast("✅ Recipe updated!");
    } else {
      setRecipes((prev) => [...prev, data]);
      showToast("📖 Recipe added!");
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this recipe?")) return;
    setRecipes((prev) => prev.filter((r) => r.id !== id));
    showToast("🗑️ Recipe deleted");
  };

  const categories = ["All", ...RECIPE_CATEGORIES];

  return (
    <>
      <WipNotice
        tabId="recipes"
        title="Recipes are a work in progress 🍰"
        message="You can add and track your own recipes right now! Full recipe data — including all island craftables and their official ingredients — is coming in a future update."
      />

      {/* Tab header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
        <div>
          <span style={{ fontFamily: "'Baloo 2', cursive", fontSize: "1.4rem", fontWeight: 700 }}>
            📖 Recipe Book
          </span>
          {craftableCount > 0 && (
            <span style={{
              marginLeft: 10, fontSize: "0.8rem", fontWeight: 700,
              padding: "3px 10px", borderRadius: 50,
              background: "rgba(34,197,94,0.12)", color: "#16a34a",
            }}>
              ✨ {craftableCount} ready to craft
            </span>
          )}
        </div>
        <Btn variant="lav" onClick={openAdd} aria-label="Add new recipe">＋ Add Recipe</Btn>
      </div>

      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="🔍 Search recipes or ingredients..." />

      {/* Category filter */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }} role="group" aria-label="Filter by category">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            aria-pressed={activeCategory === cat}
            style={{
              fontFamily: "'Baloo 2', cursive", fontWeight: 700,
              fontSize: "clamp(0.75rem, 2.5vw, 0.85rem)",
              padding: "6px 14px", borderRadius: 50, border: "none", cursor: "pointer",
              background: activeCategory === cat
                ? (cat === "All" ? "#9333ea" : RECIPE_CAT_COLORS[cat] ?? "#f2eee8")
                : "rgba(255,255,255,0.6)",
              color: activeCategory === cat ? (cat === "All" ? "#fff" : "#3a2e2e") : "#7a6a6a",
              boxShadow: activeCategory === cat ? "0 2px 10px rgba(180,130,130,0.2)" : "none",
              backdropFilter: "blur(8px)",
              transition: "all 0.2s ease",
              outline: "none",
              whiteSpace: "nowrap",
            }}
          >{cat}</button>
        ))}
      </div>

      {/* Recipe cards grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))", gap: 18 }}>
        {filtered.length ? filtered.map((r) => (
          <div
            key={r.id}
            style={{
              background: "#fffdf9", borderRadius: 20, padding: 20,
              border: r.canCraft ? "2px solid rgba(34,197,94,0.35)" : "2px solid rgba(255,255,255,0.9)",
              boxShadow: r.canCraft ? "0 4px 18px rgba(34,197,94,0.15)" : "0 4px 18px rgba(180,130,130,0.15)",
              transition: "transform 0.2s",
              display: "flex", flexDirection: "column", gap: 12,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; }}
          >
            {/* Card header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: "1.6rem" }} aria-hidden="true">{r.emoji}</span>
                <div>
                  <div style={{ fontFamily: "'Baloo 2', cursive", fontSize: "1.1rem", fontWeight: 700 }}>{r.name}</div>
                  {r.result && <div style={{ fontSize: "0.85rem", color: "#7a6a6a" }}>→ {r.result}</div>}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                  {r.canCraft && (
                    <span style={{
                      fontSize: "0.68rem", fontWeight: 700, padding: "2px 8px", borderRadius: 50,
                      background: "rgba(34,197,94,0.15)", color: "#16a34a",
                    }} aria-label="Ready to craft">✨ Ready</span>
                  )}
                  <span style={{
                    fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em",
                    padding: "3px 10px", borderRadius: 50,
                    background: RECIPE_CAT_COLORS[r.category] || "#f2eee8", color: "#3a2e2e",
                  }}>{r.category}</span>
                </div>
                <div style={{ display: "flex", gap: 5 }}>
                  <Btn variant="ghost" small onClick={() => openEdit(r)} aria-label={`Edit ${r.name}`}>✏️</Btn>
                  <Btn variant="danger" small onClick={() => handleDelete(r.id)} aria-label={`Delete ${r.name}`}>🗑️</Btn>
                </div>
              </div>
            </div>

            {/* Mini progress bar */}
            {r.total > 0 && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: "0.72rem", color: "#7a6a6a", fontWeight: 600 }}>Ingredients</span>
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, color: r.canCraft ? "#22c55e" : "#e8637c" }}>
                    {r.ready}/{r.total} ready
                  </span>
                </div>
                <div style={{ height: 6, borderRadius: 6, background: "#f2eee8", overflow: "hidden" }}
                     role="progressbar" aria-valuenow={r.ready} aria-valuemin={0} aria-valuemax={r.total}
                     aria-label={`${r.ready} of ${r.total} ingredients ready`}>
                  <div style={{
                    height: "100%", borderRadius: 6,
                    background: r.canCraft ? "linear-gradient(90deg, #22c55e, #86efac)" : "linear-gradient(90deg, #f5a0c8, #e8637c)",
                    width: `${(r.ready / r.total) * 100}%`,
                    transition: "width 0.4s ease",
                  }} />
                </div>
              </div>
            )}

            {/* Check button */}
            <button
              onClick={() => setDetailRecipe(r)}
              aria-label={`Check ingredients for ${r.name}`}
              style={{
                fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: "0.85rem",
                padding: "7px 0", borderRadius: 50, border: "2px solid #f2eee8",
                background: "transparent", cursor: "pointer", color: "#7a6a6a",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#f9f5f0"; e.currentTarget.style.borderColor = "#e8d8d8"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "#f2eee8"; }}
            >
              🔍 Check Ingredients
            </button>
          </div>
        )) : (
          <EmptyState
            icon="📖"
            title={activeCategory !== "All" ? `No ${activeCategory} recipes yet!` : "No recipes yet!"}
            sub={activeCategory !== "All" ? `Try a different category, or add one above.` : "Add your first island recipe above."}
          />
        )}
      </div>

      {/* Add / Edit modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "✏️ Edit Recipe" : "📖 Add Recipe"}>
        <FormGroup label="Emoji Icon">
          <Input value={form.emoji} onChange={(e) => setForm((f) => ({ ...f, emoji: e.target.value }))} placeholder="e.g. 🍰" />
        </FormGroup>
        <FormGroup label="Recipe Name *">
          <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="e.g. Ribbon Cake" />
        </FormGroup>
        <FormGroup label="Result / Output">
          <Input value={form.result} onChange={(e) => setForm((f) => ({ ...f, result: e.target.value }))} placeholder="e.g. 1x Ribbon Cake" />
        </FormGroup>
        <FormGroup label="Category">
          <Select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} options={RECIPE_CATEGORIES} />
        </FormGroup>

        <FormGroup label="Ingredients" hint="Type freely or pick from your inventory">
          {ingredients.map((ing) => (
            <div key={ing.id} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 7 }}>
              <div style={{ flex: 1 }}>
                <Input
                  value={ing.name}
                  onChange={(e) => updateIng(ing.id, "name", e.target.value)}
                  placeholder="Ingredient name"
                  list={`inv-suggestions-${ing.id}`}
                />
                <datalist id={`inv-suggestions-${ing.id}`}>
                  {inventoryNames.map((name) => (
                    <option key={name} value={name} />
                  ))}
                </datalist>
              </div>
              <Input
                type="number"
                value={ing.qty}
                onChange={(e) => updateIng(ing.id, "qty", e.target.value)}
                min={1}
                style={{ width: 70 }}
              />
              <Btn variant="danger" small onClick={() => removeIngRow(ing.id)} aria-label="Remove ingredient">✕</Btn>
            </div>
          ))}
          <Btn variant="ghost" small onClick={addIngRow} style={{ marginTop: 4 }}>＋ Add Ingredient</Btn>
        </FormGroup>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20, flexWrap: "wrap" }}>
          <Btn variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Btn>
          <Btn variant="lav" onClick={handleSave}>💾 Save</Btn>
        </div>
      </Modal>

      <RecipeDetailModal
        recipe={detailRecipe}
        inventory={inventory}
        open={!!detailRecipe}
        onClose={() => setDetailRecipe(null)}
      />
    </>
  );
}