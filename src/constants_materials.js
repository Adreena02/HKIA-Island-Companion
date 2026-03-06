import { uid } from "./constants";

// ─── Friendship Island Materials ───────────────────────────────────────────
// Category guesses:
//   Ingredient  — food/cooking items
//   Material    — crafting components
//   Currency    — coins, tickets, special exchange items
//   Weather     — weather event drops
//   Gift Return — earned by gifting residents

export const SEED_MATERIALS = [

  // ── Seaside Resort ────────────────────────────────────────────────────────
  { id: uid(), emoji: "🥥", name: "Coconut",        category: "Ingredient", location: "Seaside Resort", qty: 0, tags: [] },
  { id: uid(), emoji: "🎟️", name: "Game Ticket",    category: "Currency",   location: "Seaside Resort", qty: 0, tags: [] },
  { id: uid(), emoji: "🌸", name: "Lotus Blossom",  category: "Material",   location: "Seaside Resort", qty: 0, tags: [] },
  { id: uid(), emoji: "🍍", name: "Pineapple",      category: "Ingredient", location: "Seaside Resort", qty: 0, tags: [] },
  { id: uid(), emoji: "🪨", name: "Rubber",         category: "Material",   location: "Seaside Resort", qty: 0, tags: [] },
  { id: uid(), emoji: "🐚", name: "Sand Dollar",    category: "Currency",   location: "Seaside Resort", qty: 0, tags: [] },
  { id: uid(), emoji: "🪵", name: "Stick",          category: "Material",   location: "Seaside Resort", qty: 0, tags: [] },

  // ── Spooky Swamp ─────────────────────────────────────────────────────────
  { id: uid(), emoji: "🍎", name: "Apple",          category: "Ingredient", location: "Spooky Swamp",   qty: 0, tags: [] },
  { id: uid(), emoji: "✨", name: "Glow Berry",     category: "Ingredient", location: "Spooky Swamp",   qty: 0, tags: [] },
  { id: uid(), emoji: "🍄", name: "Mushroom",       category: "Currency",   location: "Spooky Swamp",   qty: 0, tags: [] },
  { id: uid(), emoji: "🎃", name: "Pumpkin",        category: "Ingredient", location: "Spooky Swamp",   qty: 0, tags: [] },
  { id: uid(), emoji: "🌿", name: "Spinip",         category: "Ingredient",   location: "Spooky Swamp",   qty: 0, tags: [] },
  { id: uid(), emoji: "🌿", name: "Swampmallow",    category: "Ingredient", location: "Spooky Swamp",   qty: 0, tags: [] },

  // ── Rainbow Reef ─────────────────────────────────────────────────────────
  { id: uid(), emoji: "🐚", name: "Box Clam",       category: "Material",   location: "Rainbow Reef",   qty: 0, tags: [] },
  { id: uid(), emoji: "🍫", name: "Chocolate Coin", category: "Ingredient", location: "Rainbow Reef",   qty: 0, tags: [] },
  { id: uid(), emoji: "🥛", name: "Coral Milk",     category: "Ingredient", location: "Rainbow Reef",   qty: 0, tags: [] },
  { id: uid(), emoji: "🐚", name: "Seashell",       category: "Currency",   location: "Rainbow Reef",   qty: 0, tags: [] },
  { id: uid(), emoji: "⭐", name: "Starfish",       category: "Material",   location: "Rainbow Reef",   qty: 0, tags: [] },
  { id: uid(), emoji: "🗑️", name: "Trash",          category: "Material",   location: "Rainbow Reef",   qty: 0, tags: [] },

  // ── Gemstone Mountain ────────────────────────────────────────────────────
  { id: uid(), emoji: "🌵", name: "Cactus Cream",   category: "Ingredient", location: "Gemstone Mountain", qty: 0, tags: [] },
  { id: uid(), emoji: "💎", name: "Calming Crystal", category: "Material",  location: "Gemstone Mountain", qty: 0, tags: [] },
  { id: uid(), emoji: "⚙️", name: "Fizzy Ore",      category: "Material",   location: "Gemstone Mountain", qty: 0, tags: [] },
  { id: uid(), emoji: "🪨", name: "Iron",            category: "Material",   location: "Gemstone Mountain", qty: 0, tags: [] },
  { id: uid(), emoji: "✨", name: "Shiny",           category: "Currency",   location: "Gemstone Mountain", qty: 0, tags: [] },

  // ── Mount Hothead ─────────────────────────────────────────────────────────
  { id: uid(), emoji: "🌺", name: "Cinna Bloom",    category: "Ingredient",   location: "Mount Hothead",  qty: 0, tags: [] },
  { id: uid(), emoji: "🌋", name: "Magma Bloom",    category: "Ingredient",   location: "Mount Hothead",  qty: 0, tags: [] },
  { id: uid(), emoji: "🪨", name: "Obsidian Shard", category: "Currency",   location: "Mount Hothead",  qty: 0, tags: [] },
  { id: uid(), emoji: "🌰", name: "Toasted Almond", category: "Ingredient", location: "Mount Hothead",  qty: 0, tags: [] },

  // ── Merry Meadow ─────────────────────────────────────────────────────────
  { id: uid(), emoji: "🌼", name: "Pollen Puff",    category: "Currency",   location: "Merry Meadow",   qty: 0, tags: [] },
  { id: uid(), emoji: "🎀", name: "Ribbon",         category: "Material",   location: "Merry Meadow",   qty: 0, tags: [] },
  { id: uid(), emoji: "🌸", name: "Sakura",         category: "Ingredient",   location: "Merry Meadow",   qty: 0, tags: [] },
  { id: uid(), emoji: "🌱", name: "Seed",           category: "Material",   location: "Merry Meadow",   qty: 0, tags: [] },
  { id: uid(), emoji: "🪱", name: "Worm Tail",      category: "Material",   location: "Merry Meadow",   qty: 0, tags: [] },

  // ── Icy Peak ─────────────────────────────────────────────────────────────
  { id: uid(), emoji: "🧊", name: "Snowcicle",      category: "Ingredient",   location: "Icy Peak",       qty: 0, tags: [] },

  // ── Cloud Island ─────────────────────────────────────────────────────────
  { id: uid(), emoji: "🧀", name: "Moon Cheese",    category: "Ingredient", location: "Cloud Island",   qty: 0, tags: [] },
  { id: uid(), emoji: "⭐", name: "Starfruit",      category: "Ingredient", location: "Cloud Island",   qty: 0, tags: [] },

  // ── The Moon ─────────────────────────────────────────────────────────────
  { id: uid(), emoji: "🌙", name: "Moonbeam",       category: "Material",   location: "The Moon",       qty: 0, tags: [] },

  // ── Gift Returns (from residents) ─────────────────────────────────────────
  { id: uid(), emoji: "📄", name: "Paper",          category: "Material",   location: "Gift Return",    qty: 0, tags: [] },
  { id: uid(), emoji: "⚙️", name: "Gizmo",          category: "Material",   location: "Gift Return",    qty: 0, tags: [] },
  { id: uid(), emoji: "🍦", name: "Tofu",           category: "Ingredient", location: "Gift Return",    qty: 0, tags: [] },
  { id: uid(), emoji: "🌾", name: "Flour",          category: "Ingredient", location: "Gift Return",    qty: 0, tags: [] },
  { id: uid(), emoji: "🍓", name: "Strawberry",     category: "Ingredient", location: "Gift Return",    qty: 0, tags: [] },
  { id: uid(), emoji: "🧵", name: "Thread",         category: "Material",   location: "Gift Return",    qty: 0, tags: [] },
  { id: uid(), emoji: "🌿", name: "Sugarkelp",      category: "Ingredient", location: "Gift Return",    qty: 0, tags: [] },
  { id: uid(), emoji: "💎", name: "Light Stone",    category: "Material",   location: "Gift Return",    qty: 0, tags: [] },
  { id: uid(), emoji: "☁️", name: "Candy Cloud",    category: "Ingredient", location: "Gift Return",    qty: 0, tags: [] },
  { id: uid(), emoji: "🪶", name: "Feather",        category: "Material",   location: "Gift Return",    qty: 0, tags: [] },
  { id: uid(), emoji: "🍌", name: "Banana",         category: "Ingredient", location: "Gift Return",    qty: 0, tags: [] },
  { id: uid(), emoji: "🫓", name: "Dough",          category: "Ingredient", location: "Gift Return",    qty: 0, tags: [] },
  { id: uid(), emoji: "🌰", name: "Candlenut",      category: "Ingredient", location: "Gift Return",    qty: 0, tags: [] },

  // ── Weather Drops ─────────────────────────────────────────────────────────
  { id: uid(), emoji: "💧", name: "Raindrop",       category: "Weather",    location: "Various",        qty: 0, tags: [] },
  { id: uid(), emoji: "💨", name: "Steamdrop",      category: "Weather",    location: "Various",        qty: 0, tags: [] },
  { id: uid(), emoji: "⭐", name: "Stardrop",       category: "Weather",    location: "Various",        qty: 0, tags: [] },
  { id: uid(), emoji: "❄️", name: "Snowdrop",       category: "Weather",    location: "Various",        qty: 0, tags: [] },

  // ── All Regions ───────────────────────────────────────────────────────────
  { id: uid(), emoji: "✨", name: "Sparkle",        category: "Currency",   location: "All Regions",    qty: 0, tags: [] },
];