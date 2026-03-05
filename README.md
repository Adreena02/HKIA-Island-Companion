# 🌺 HKIA Island Companion

> Your all-in-one tracker for Hello Kitty Island Adventure — no wiki spoilers, no scattered notebooks, no stress.

---

## 🍎 Why I Built This

Okay so real talk — I was keeping track of everything in the Notepad app on my PC and random physical notebooks. What residents liked, what I needed to craft, who I'd gifted... it was *a lot*. And every time I opened the wiki to look something up, I'd accidentally spoil mid-game content for myself which was so frustrating.

Eventually I found myself browsing the HKIA subreddit and seeing people putting together Google Spreadsheets and Notion pages just to keep up with the game. Someone even mentioned wanting what Animal Crossing: New Horizons has — a proper companion app. And honestly? Same. So I built one.

This is the better alternative to scouring the wiki for hours. Everything in one place, organized the way your brain actually works while you're playing. 🌸

---

## ✨ Features

### 🏠 Home (Dashboard)

The first thing you see when you open the app. A live overview of everything that matters today. The dashboard is laid out as a 2×2 grid of widgets — Daily Checklist and Seasonal Events on the top row, Daily Gifts and Friendship Milestones on the bottom row. Each widget is a fixed height and scrolls internally so the layout stays clean. On mobile the grid stacks to a single column.

- **✅ Daily Checklist** — built-in tasks for daily gifts, collecting your daily reward, and completing daily quests. Add your own custom tasks too. A live countdown in the header ticks down second by second to the next 7AM UTC reset. Custom tasks are always preserved across resets; only the checked state clears
- **🎀 Daily Gifts Summary** — all 13 residents at a glance with dot indicators showing how many gifts you've given today. Hit **＋ Gift** to log a gift directly from the dashboard without navigating away. Sorted with residents who still need gifts first. Shows a celebration message when everyone's done
- **🌟 Friendship Milestones** — pick any resident from a dropdown to see their friendship progress bar, what ability unlocks next and how many levels away it is, and a full scrollable timeline of every milestone colour-coded by whether you've reached it
- **📅 Seasonal Events** — all 19 known recurring HKIA events with live countdowns. Active events show days remaining with a green badge; upcoming events show days away. Filter between Active, Upcoming, and All

---

### 🐱 Residents

All 13 residents are pre-loaded with their real in-game portraits. The 6 immediately available residents are ready from the start, and the 7 encountered elsewhere residents each have a location hint on their card.

**On the resident card:**
- Filter between ⭐ Immediately Available and 🗺️ Encountered Elsewhere, or view everyone at once
- Search by name or gift
- Each card uses a **layered design** — soft character colour tint on the outside, clean white inner card inside, with the portrait floating between the two layers
- Each resident's **3 liked tags** displayed as emoji pills below their name — hover any pill to see the tag name
- **Friendship level tracker** with +/− buttons and a colour-matched progress bar
- **🎁 Return Gift** — the item the resident gives you the first time you gift them
- **🎀 Daily Gift Tracker** — log up to 3 gifts per day per resident. Automatically resets at 7AM UTC every day
- **Companion ability pills** showing progress at a glance — ○ not started, ◑ partially unlocked (X/Y), ✓ fully unlocked
- **📝 Personal Notes** — a compact 2-line preview of any notes you've jotted down about this resident

**In the detail modal:**
- **🎀 Daily Gift Tracker** — full version with dot indicators, a Log Gift button, timestamp of your last gift, and a manual Reset button for when you use an in-game reset item
- 💝 **Loved Gift** — shown with ❤️❤️❤️ and friendship value in a pink highlighted box
- 🎁 **Liked Gifts** — sorted by heart tier then friendship value, each showing hearts and FV
- 🎒 **Giftable from Inventory** — automatically cross-references the resident's liked tags against your inventory and shows every item you currently have that qualifies as a gift, with matching tags highlighted
- 🌟 **Companion Abilities** — every ability with its unlock friendship level and description, broken down by tier for multi-level abilities, togglable per level
- **📝 My Notes** — a free-text field to jot down anything about this resident. Saves automatically as you type

> All gift and ability data is real game data — pre-filled for you, nothing to enter manually.

---

### 🎒 Inventory

- **📦 Import Materials** — one-click import of all 52 Friendship Island materials pre-loaded with name, emoji, category, and location. Skips anything already in your inventory by name
- Add, edit, and delete items with an emoji, name, category, quantity, and **up to 4 tags**
- **✏️ Edit button** on each card to update emoji, name, quantity, and tags
- **📍 Location badge** on each card showing where the item is found (e.g. Spooky Swamp, Gift Return)
- Tags are emoji pills — hover to see the tag name. They're user-defined and grow organically as you play
- **Tag autocomplete** — once you've tagged a few items, those tags appear as suggestions when tagging the next one
- **Tag filter bar** — click any tag to filter your inventory down to matching items. Click again to clear
- Tags are included in search — type a tag name to find matching items
- Quick +/− buttons to update quantities on the fly
- Colour-coded category badges — Ingredient, Material, Food, Gift, Tool, Decor, Currency, Weather

---

### 📖 Recipes

- Build out your recipe book with ingredients, categories, and crafting results
- **Ingredient autocomplete** pulls suggestions straight from your inventory
- **Category filter bar** — filter by Cooking, Crafting, Farming, Gifting, or Other
- **Craftable-first sorting** — recipes you can make right now automatically float to the top
- **✨ Ready badge** and green border glow on any recipe where you have all the ingredients
- **"X ready to craft" counter** in the header — see at a glance what you can make right now
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

- **Dreamy animated background** — a slow drifting pastel gradient blending pink, lavender, peach, mint, and sky blue
- **Scrolling ticker banner** at the top of the page with development updates, colour-themed to the active tab
- **📱 Mobile responsive** — works on phones and tablets. The dashboard stacks to a single column, card grids go single-column, modals resize with safe padding, and tab/filter buttons scale down or wrap cleanly
- **Everything saves automatically** — no accounts, no sign-in, fully browser-based
- **Export & Import** your full island data as a JSON file — residents, inventory, recipes, and catalogue all included
- **Toast notifications** for every save and delete
- All existing data **migrates automatically** from older versions
- **Keyboard accessible** — all interactive elements are reachable by keyboard with visible focus indicators

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

## 🎀 Gift Tracking

Each resident can receive up to 3 gifts per day. The daily reset happens at **7AM UTC** every day — the same time the game resets. The app tracks this automatically, no manual date management needed.

- **Log a gift** from the dashboard Daily Gifts widget, the counter on a resident card, or the Log Gift button in the detail modal
- **Manual reset** available in the detail modal for when you use an in-game reset item
- The counter resets itself automatically at the correct time each day, regardless of your timezone
- A **live countdown** in the Daily Checklist widget ticks down to the next reset in real time

---

## 📅 Seasonal Events

The app tracks all 19 known recurring HKIA events with live countdowns on the Home tab. Events are categorised as Primary (major ~6-week events), Secondary (shorter events), Calendar (log-in daily reward calendars), or Flash (a few days only).

Event dates are approximate — Sunblink adjusts them slightly each year. The app notes this wherever relevant. All events recur annually.

---

## ♿ Accessibility

The app is built with keyboard users and screen readers in mind:

- All buttons and interactive elements are keyboard navigable with clear `:focus-visible` outlines
- Focus ring colour follows the active tab's character theme
- All modals use `role="dialog"` and `aria-modal` so screen readers announce them correctly
- Progress bars use `role="progressbar"` with proper `aria-valuenow/min/max` attributes
- Every action button has a descriptive `aria-label`
- Decorative emoji are hidden from assistive technology with `aria-hidden`

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

> **Note:** If upgrading from an earlier version, you can safely delete `src/components/furniture/FurnitureTab.jsx` — it was replaced by `CatalogueTab.jsx` and is no longer used.

> If things look off after updating, open your browser console and run `localStorage.clear()` then refresh.

---

## 🎨 Adding New Sanrio Palettes

Open `src/constants.js` and add your character to these three objects:

```js
// 1. The card gradient bar (left → right)
ACCENT_GRADIENTS: { mychar: "linear-gradient(90deg, #hex1, #hex2)" }

// 2. The full page background (colour → white, top to bottom)
ACCENT_BG_GRADIENTS: { mychar: "linear-gradient(180deg, #hex1 0%, #hex2 50%, #ffffff 100%)" }

// 3. The solid colour for tab buttons and headers
ACCENT_SOLID: { mychar: "#hex" }
```

---

## 🌸 A Note

This is a passion project built by a player, for players. Not affiliated with Sanrio or Hello Kitty Island Adventure. If you find it helpful, share it with your fellow islanders! 🐾