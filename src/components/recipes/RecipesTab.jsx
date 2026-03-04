import { useState, useEffect } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Btn } from "../ui/Btn";
import { Modal } from "../ui/Modal";
import { FormGroup, Input, Select } from "../ui/FormFields";
import { SearchBar, EmptyState } from "../ui/Display";
import { SEED_RECIPES, SEED_INVENTORY, RECIPE_CATEGORIES, RECIPE_CAT_COLORS, uid } from "../../constants";
import confetti from "canvas-confetti";

const BLANK_FORM = { emoji: "", name: "", result: "", category: "Cooking" };

// ─── Ingredient status helper ─────────────────────────────────────────────────

/**
 * Given a recipe's ingredient list and the player's inventory,
 * returns enriched ingredient objects with have/need status.
 */
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

// ─── Recipe Detail Modal ──────────────────────────────────────────────────────

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
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: canCraft ? "#22c55e" : "#e8637c" }}>
            {satisfied}/{total}
          </span>
        </div>
        <div style={{ height: 10, borderRadius: 10, background: "#f2eee8", overflow: "hidden" }}>
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
            {/* Status icon */}
            <span style={{ fontSize: "1rem", flexShrink: 0 }}>
              {ing.satisfied ? "✅" : "❌"}
            </span>

            {/* Name */}
            <span style={{ flex: 1, fontWeight: 600, fontSize: "0.9rem", color: "#3a2e2e" }}>
              {ing.name}
            </span>

            {/* Have / Need */}
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

// ─── Recipes Tab ──────────────────────────────────────────────────────────────

export function RecipesTab({ showToast }) {
  const [recipes, setRecipes]         = useLocalStorage("hkia_recipes", SEED_RECIPES);
  const [inventory]                   = useLocalStorage("hkia_inventory", SEED_INVENTORY);
  const [search, setSearch]           = useState("");
  const [modalOpen, setModalOpen]     = useState(false);
  const [detailRecipe, setDetailRecipe] = useState(null);
  const [editing, setEditing]         = useState(null);
  const [form, setForm]               = useState(BLANK_FORM);
  const [ingredients, setIngredients] = useState([{ id: uid(), name: "", qty: 1 }]);

  // Inventory names for autocomplete
  const inventoryNames = inventory.map((i) => i.name);

  const filtered = recipes.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.category.toLowerCase().includes(search.toLowerCase()) ||
    r.ingredients.some((i) => i.name.toLowerCase().includes(search.toLowerCase()))
  );

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

  return (
    <>
      {/* Tab header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
        <span style={{ fontFamily: "'Baloo 2', cursive", fontSize: "1.4rem", fontWeight: 700 }}>
          📖 Recipe Book
        </span>
        <Btn variant="lav" onClick={openAdd}>＋ Add Recipe</Btn>
      </div>

      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="🔍 Search recipes or ingredients..." />

      {/* Recipe cards grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 18 }}>
        {filtered.length ? filtered.map((r) => {
          const checked  = checkIngredients(r.ingredients, inventory);
          const ready    = checked.filter((i) => i.satisfied).length;
          const total    = checked.length;
          const canCraft = ready === total && total > 0;

          return (
            <div
              key={r.id}
              style={{
                background: "#fffdf9", borderRadius: 20, padding: 20,
                border: "2px solid rgba(255,255,255,0.9)",
                boxShadow: "0 4px 18px rgba(180,130,130,0.15)",
                transition: "transform 0.2s",
                display: "flex", flexDirection: "column", gap: 12,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; }}
            >
              {/* Card header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: "1.6rem" }}>{r.emoji}</span>
                  <div>
                    <div style={{ fontFamily: "'Baloo 2', cursive", fontSize: "1.1rem", fontWeight: 700 }}>{r.name}</div>
                    {r.result && <div style={{ fontSize: "0.85rem", color: "#7a6a6a" }}>→ {r.result}</div>}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                  <span style={{
                    fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em",
                    padding: "3px 10px", borderRadius: 50,
                    background: RECIPE_CAT_COLORS[r.category] || "#f2eee8", color: "#3a2e2e",
                  }}>{r.category}</span>
                  <div style={{ display: "flex", gap: 5 }}>
                    <Btn variant="ghost" small onClick={() => openEdit(r)}>✏️</Btn>
                    <Btn variant="danger" small onClick={() => handleDelete(r.id)}>🗑️</Btn>
                  </div>
                </div>
              </div>

              {/* Mini progress bar */}
              {total > 0 && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: "0.72rem", color: "#7a6a6a", fontWeight: 600 }}>Ingredients</span>
                    <span style={{ fontSize: "0.72rem", fontWeight: 700, color: canCraft ? "#22c55e" : "#e8637c" }}>
                      {ready}/{total} ready
                    </span>
                  </div>
                  <div style={{ height: 6, borderRadius: 6, background: "#f2eee8", overflow: "hidden" }}>
                    <div style={{
                      height: "100%", borderRadius: 6,
                      background: canCraft ? "linear-gradient(90deg, #22c55e, #86efac)" : "linear-gradient(90deg, #f5a0c8, #e8637c)",
                      width: `${(ready / total) * 100}%`,
                      transition: "width 0.4s ease",
                    }} />
                  </div>
                </div>
              )}

              {/* Check button */}
              <button
                onClick={() => setDetailRecipe(r)}
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
          );
        }) : <EmptyState icon="📖" title="No recipes yet!" sub="Add your first island recipe above." />}
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

        {/* Dynamic ingredient builder with autocomplete */}
        <FormGroup label="Ingredients" hint="Type freely or pick from your inventory">
          {ingredients.map((ing) => (
            <div key={ing.id} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 7, position: "relative" }}>
              <div style={{ flex: 1, position: "relative" }}>
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
              <Btn variant="danger" small onClick={() => removeIngRow(ing.id)}>✕</Btn>
            </div>
          ))}
          <Btn variant="ghost" small onClick={addIngRow} style={{ marginTop: 4 }}>＋ Add Ingredient</Btn>
        </FormGroup>

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20, flexWrap: "wrap" }}>
          <Btn variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Btn>
          <Btn variant="lav" onClick={handleSave}>💾 Save</Btn>
        </div>
      </Modal>

      {/* Recipe detail / ingredient check modal */}
      <RecipeDetailModal
        recipe={detailRecipe}
        inventory={inventory}
        open={!!detailRecipe}
        onClose={() => setDetailRecipe(null)}
      />
    </>
  );
}
