# 🌺 HKIA Island Companion

> Your all-in-one tracker for Hello Kitty Island Adventure — no wiki spoilers, no scattered notebooks, no stress.

---

## 🍎 Why I Built This

Okay so real talk — I was keeping track of everything in the Notepad app on my PC and random physical notebooks. What residents liked, what I needed to craft, who I'd gifted... it was *a lot*. And every time I opened the wiki to look something up, I'd accidentally spoil mid-game content for myself which was so frustrating.

Eventually I found myself browsing the HKIA subreddit and seeing people putting together Google Spreadsheets and Notion pages just to keep up with the game. Someone even mentioned wanting what Animal Crossing: New Horizons has — a proper companion app. And honestly? Same. So I built one.

This is the better alternative to scouring the wiki for hours. Everything in one place, organized the way your brain actually works while you're playing. 🌸

---

## ✨ Features

### 🐱 Residents

All 13 residents are pre-loaded with their real in-game portraits. The 6 immediately available residents are ready from the start, and the 7 encountered elsewhere residents each have a location hint on their card.

**On the resident card:**
- Filter between ⭐ Immediately Available and 🗺️ Encountered Elsewhere, or view everyone at once
- Search by name or gift
- Each card uses a **layered design** — soft character colour tint on the outside, clean white inner card inside
- Each resident's **3 liked tags** displayed as emoji pills below their name — hover any pill to see the tag name
- **Friendship level tracker** with +/− buttons and a colour-matched progress bar
- **🎁 Return Gift** — the item the resident gives you the first time you gift them
- **Companion ability pills** showing progress at a glance — ○ not started, ◑ partially unlocked (X/Y), ✓ fully unlocked

**In the detail modal:**
- 💝 **Loved Gift** — shown with ❤️❤️❤️ and friendship value in a pink highlighted box
- 🎁 **Liked Gifts** — sorted by heart tier then friendship value, each showing ❤️ or ❤️❤️ and FV
- 🎒 **Giftable from Inventory** — automatically cross-references the resident's liked tags against your inventory and shows every item you currently have that they'd accept as a gift, with matching tags highlighted
- 🌟 **Companion Abilities** — every ability with its unlock friendship level and description, broken down by tier for multi-level abilities, togglable per level

> All gift and ability data is real game data — pre-filled for you, nothing to enter manually.

---

### 🎒 Inventory

- Add, edit, and delete items with an emoji, name, category, quantity, and **up to 4 tags**
- Tags are emoji pills — hover to see the tag name. They're user-defined and grow organically as you play
- **Tag autocomplete** — once you've tagged a few items, those tags appear as suggestions when tagging the next one
- **Tag filter bar** — click any tag to filter your inventory down to matching items. Click again to clear
- Tags are included in search — type a tag name to find matching items
- Quick +/− buttons to update quantities on the fly
- Colour-coded category badges

---

### 📖 Recipes

- Build out your recipe book with ingredients, categories, and crafting results
- **Ingredient autocomplete** pulls suggestions straight from your inventory
- Every recipe card has a **live progress bar** showing how many ingredients you already have
- Hit **🔍 Check Ingredients** for a full ✅/❌ breakdown — what you have, what you're missing, how many more you need
- 🎉 **Confetti celebration** in Hello Kitty colours when you have everything ready to craft!

---

### 🪑 Catalogue

- Log your furniture and catalogue items and track what you own vs still need
- Add **up to 4 tags** per item, with the same autocomplete and emoji pill system as inventory
- **Tag filter bar** to quickly find items by tag
- Items are **grouped by category** with a per-group owned count
- One-tap **Owned / Not Owned toggle** per item
- Filter down to just owned or just missing pieces
- Global owned counter in the header (e.g. `12/47 owned`)

---

### 🌐 App-wide

- **Everything saves automatically** — no accounts, no sign-in, fully browser-based
- **Export & Import** your full island data as a JSON file — residents, inventory, recipes, and catalogue all included
- **Dynamic tab backgrounds** — each tab fades into its own character colour palette
- **Toast notifications** for every save and delete
- All existing data **migrates automatically** from older versions

---

## 🏷️ Tag System

Tags are how the game determines what gifts a resident will accept. Each resident has 3 liked tags, and any item that matches at least one of those tags qualifies as a valid gift. The app uses this to power the **Giftable from Inventory** feature in each resident's detail modal.

Tags are displayed as emoji pills throughout the app — hover any pill to see the full tag name. The full emoji mapping is:

| Tag | Emoji | Tag | Emoji | Tag | Emoji |
|-----|-------|-----|-------|-----|-------|
| Pizza | 🍕 | Tropical | 🌺 | Joke | 🃏 |
| Chocolate | 🍫 | Device | 📱 | Book | 📖 |
| Spice | 🧂 | Cozy Beverage | ☕ | Cloth | 🧵 |
| Aquatic | 🌊 | Fish | 🐟 | Bakery | 🥐 |
| Fruit | 🍓 | Fancy | 👑 | Critters | 🐛 |
| Swampy | 🐸 | Wood | 🪵 | Spooky | 🕷️ |
| Fall | 🍂 | Soda | 🥤 | Sweet | 🍬 |
| Pink | 🌸 | Dreamy | ✨ | Rocky | 🪨 |
| Relax | 🛁 | Music | 🎵 | Healthy | 🥗 |
| Veggie | 🥦 | Sports | ⚽ | Dessert | 🍨 |
| Dairy | 🥛 | Fire | 🔥 | Metal | ⚙️ |

New tags you create will display as text until an emoji is added to the `TAG_EMOJI` map in `src/constants.js`.

---

## 🛠️ Tech Stack

- **React 18** with hooks
- **Vite** for the dev environment
- **Vitest + React Testing Library** for tests
- **canvas-confetti** for the celebration moment 🎉
- CSS-in-JS via inline styles — no external stylesheet needed

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev

# Run tests
npx vitest
```

> **First time running?** The app loads with all 13 residents pre-filled. If you're updating from an older version and things look off, open your browser console and run `localStorage.clear()` then refresh.

---

## 🎨 Adding New Sanrio Palettes

Open `src/constants.js` and add your character to these three objects:

```js
// 1. The card gradient bar (left → right)
ACCENT_GRADIENTS: { hangyodon: "linear-gradient(90deg, #4db8b0, #a8e6e2)" }

// 2. The full page background (colour → white, top to bottom)
ACCENT_BG_GRADIENTS: { hangyodon: "linear-gradient(180deg, #d4f0ee 0%, #eef8f7 50%, #ffffff 100%)" }

// 3. The solid colour for tab buttons and headers
ACCENT_SOLID: { hangyodon: "#4db8b0" }
```

---

## 🌸 A Note

This is a passion project built by a player, for players. Not affiliated with Sanrio or Hello Kitty Island Adventure. If you find it helpful, share it with your fellow islanders! 🐾
