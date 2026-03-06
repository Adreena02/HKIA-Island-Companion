# 🌺 HKIA Island Companion

> Your all-in-one tracker for Hello Kitty Island Adventure — no wiki spoilers, no scattered notebooks, no stress.

---

## 🍎 Why I Built This

Okay so real talk — I was keeping track of everything in the Notepad app on my PC and random physical notebooks. What residents liked, what I needed to craft, who I'd gifted... it was *a lot*. And every time I opened the wiki to look something up, I'd accidentally spoil mid-game content for myself which was so frustrating.

Eventually I found myself browsing the HKIA subreddit and seeing people putting together Google Spreadsheets and Notion pages just to keep up with the game. Someone even mentioned wanting what Animal Crossing: New Horizons has — a proper companion app. And honestly? Same. So I built one.

This is the better alternative to scouring the wiki for hours. Everything in one place, organized the way your brain actually works while you're playing. 🌸

---

## ⚠️ Known Issues

- **Ability pill layout inconsistency for existing users** — if you've used the app before, resident cards for characters like Retsuko, Kuromi, and Keroppi may still show companion ability pills side by side instead of stacked vertically. This is because your browser has the old resident data cached. Running `localStorage.removeItem("hkia_residents")` in the browser console and refreshing will fix it, but will reset friendship levels and gift logs. A migration fix is planned for a future update that will patch this automatically without any data loss.

---

## ✨ Features

### 🏠 Home (Dashboard)

The first thing you see when you open the app. A live overview of everything that matters today. The dashboard is a 2×2 grid of widgets — Daily Checklist and Seasonal Events on the top row, Daily Gifts and Friendship Milestones on the bottom. Each widget is a fixed height and scrolls internally. On mobile the grid stacks to a single column.

- **✅ Daily Checklist** — built-in tasks for daily gifts, collecting your daily reward, and completing daily quests. Add your own custom tasks too. A live countdown ticks down to the next 7AM UTC reset. Custom tasks survive resets; checked state does not
- **🎀 Daily Gifts Summary** — all 22 residents at a glance with dot indicators. Hit **＋ Gift** to log directly from the dashboard. Sorted with residents who still need gifts first
- **🌟 Friendship Milestones** — pick any resident to see their progress bar, next unlock callout, and full milestone timeline
- **📅 Seasonal Events** — all 19 known recurring events with live countdowns and Active / Upcoming / All filter

---

### 🐾 Residents

All 22 residents are pre-loaded with real in-game data. The roster is organised into four groups:

- **⭐ Immediately Available** (6) — Hello Kitty, My Melody, Chococat, Tuxedosam, Badtz-maru, Pochacco
- **🗺️ Encountered Elsewhere** (7) — Keroppi, Kuromi, Cinnamoroll, Pekkle, Pompompurin, Retsuko, Hangyodon
- **🔮 Quest Unlocked** (7) — Wish me mell, My Sweet Piano, Moppu, TOPHAT, Big Challenges, Kiki, Lala
- **💎 DLC** (2) — Usahana (City Town), Cogimyun (Wheatflour Wonderland)

Use the filter bar to browse by group, or search by resident name or gift name.

**On the resident card:**
- **Unlock badge** — Quest residents show a purple 🔮 pill; DLC residents show a gold 💎 pill with the pack name
- Soft character colour tint outer background with clean white inner card and floating portrait
- **3 liked tags** as emoji pills — hover to see the tag name
- **Friendship level tracker** with +/− buttons and colour-matched progress bar
- **🎁 Return Gift** — the item they give you the first time you gift them
- **🎀 Daily Gift Tracker** — log up to 3 gifts per day, resets at 7AM UTC
- **Companion ability pills** — ○ not started, ◑ partially unlocked, ✓ fully unlocked, stacked vertically
- **📝 Personal Notes** — 2-line preview of your notes

**In the detail modal:**
- Full **🎀 Daily Gift Tracker** with dot indicators, Log Gift, timestamp, and manual Reset
- 💝 **Loved Gift** highlighted in a pink box
- 🎁 **Liked Gifts** sorted by heart tier then friendship value
- 🎒 **Giftable from Inventory** — cross-references liked tags against your inventory automatically
- 🌟 **Companion Abilities** — every level with unlock requirement and description, togglable
- **📝 My Notes** — free-text, saves as you type

> All gift and ability data is real in-game data — nothing to enter manually.

---

### 🎒 Inventory

- **📦 Import Materials** — one-click import of all 52 Friendship Island materials
- Add, edit, and delete items with emoji, name, category, quantity, and up to 4 tags
- **📍 Location badge** showing where items are found
- Tag autocomplete, tag filter bar, tags included in search
- Quick +/− quantity buttons
- Colour-coded category badges — Ingredient, Material, Food, Gift, Tool, Decor, Currency, Weather

---

### 📖 Recipes *(work in progress)*

You can add and track your own recipes right now. Full recipe data for all island craftables is coming in a future update.

- Recipe book with ingredients, categories, and results
- Ingredient autocomplete from your inventory
- Category filter bar — Cooking, Crafting, Farming, Gifting, Other
- Craftable-first sorting with **✨ Ready badge** and green border glow
- **"X ready to craft"** counter in the header
- Live ingredient progress bar per card
- 🔍 Check Ingredients modal with full ✅/❌ checklist and "still needed" summary
- 🎉 Confetti when you have everything ready

---

### 🪑 Catalogue *(work in progress)*

Track furniture you've collected manually right now. A pre-loaded catalogue with all base game and DLC items is on the way.

- One-tap Owned / Not Owned toggle per item
- Up to 4 tags per item with autocomplete and emoji pills
- Items grouped by category with per-group owned count
- Filter by owned status
- Global owned counter in the header

---

### 🌐 App-wide

- **Dreamy animated background** — slow drifting pastel gradient
- **Scrolling ticker banner** themed to the active tab
- **📱 Mobile responsive** — adapts to phones and tablets throughout
- **Everything saves automatically** — no accounts, no sign-in, no server
- **Export & Import** your full island data as JSON
- **Toast notifications** for every save and delete
- **Keyboard accessible** with visible focus indicators throughout

---

## 🏷️ Tag System

Tags are how the game determines what gifts a resident will accept. Each resident has 3 liked tags, and any inventory item matching at least one qualifies as a valid gift. This powers the **Giftable from Inventory** feature in the detail modal.

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
| Flower | 🌸 | Rare | 💎 | Cloud | ☁️ |
| Creative | 🎨 | Gaming | 🎮 | Digital | 💻 |
| Frozen | 🧊 | Stars | ⭐ | Resilience | 💪 |
| Volcanic | 🌋 | Imagination | 🌈 | Mochi | 🍡 |
| Rainbow | 🌈 | Cheese | 🧀 | Wheatflower | 🌾 |
| Wand | 🪄 | Glass | 🔮 | | |

New tags you create yourself will display as text until added to `TAG_EMOJI` in `src/constants.js`.

---

## 🎀 Gift Tracking

Each resident can receive up to 3 gifts per day. Reset happens at **7AM UTC** daily — same timing as the game itself.

- Log gifts from the dashboard, the resident card, or the detail modal
- Manual reset available in the detail modal (for when you use an in-game reset item)
- Live countdown to the next reset in the Daily Checklist widget

---

## 📅 Seasonal Events

19 known recurring events with live countdowns. Categorised as Primary, Secondary, Calendar, or Flash. Dates are approximate — Sunblink adjusts them slightly each year.

---

## ♿ Accessibility

- Keyboard navigable throughout with `:focus-visible` outlines themed to the active tab
- `role="dialog"` and `aria-modal` on all modals
- `role="progressbar"` with proper `aria-valuenow/min/max` on all progress bars
- Descriptive `aria-label` on every action button
- Decorative emoji marked `aria-hidden`
- `htmlFor`/`id` pairing on all form labels

---

## 🛠️ Tech Stack

- **React 18** with hooks
- **Vite** for the dev environment
- **Vitest + React Testing Library** for tests
- **canvas-confetti** for the recipe celebration 🎉
- CSS-in-JS via inline styles throughout

---

## 🚀 Getting Started

```bash
npm install
npm run dev
npx vitest
```

> If things look off after updating from an older version, open the browser console and run `localStorage.clear()` then refresh. This resets all data to defaults.

---

## 🎨 Adding New Sanrio Palettes

Open `src/constants.js` and add your character to all three accent maps:

```js
ACCENT_GRADIENTS:    { mychar: "linear-gradient(90deg, #hex1, #hex2)" }
ACCENT_BG_GRADIENTS: { mychar: "linear-gradient(180deg, #hex1 0%, #hex2 50%, #ffffff 100%)" }
ACCENT_SOLID:        { mychar: "#hex" }
```

Then add `mychar` as the `color` value on the resident's data object in `SEED_RESIDENTS`.

---

## 🌸 A Note

This app is a passion project built by a team of one — designed, developed, tested, and maintained entirely by a single player who got tired of juggling Notepad files and physical notebooks mid-session. Every feature, every piece of game data, every late-night bug fix is the work of one person who just wanted a better way to play.

If something's broken, it's on the Known Issues list. If something's missing, it's probably on the roadmap. And if you find it helpful, share it with your fellow islanders — that's the whole point. 🐾

*Not affiliated with Sanrio or Hello Kitty Island Adventure.*