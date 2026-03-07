# 🌺 HKIA Island Companion

> Your all-in-one tracker for Hello Kitty Island Adventure — no wiki spoilers, no scattered notebooks, no stress.

---

## 🍎 Why I Built This

Real talk — I was keeping track of everything in the Notepad app on my PC and random physical notebooks. What residents liked, what I needed to craft, who I'd gifted that day... it was *a lot*. And every time I opened the wiki to look something up I'd accidentally spoil mid-game content, which was so frustrating.

Eventually I found myself on the HKIA subreddit seeing people building Google Spreadsheets and Notion pages just to keep up with the game. Someone mentioned wanting what Animal Crossing: New Horizons has — a proper companion app. Honestly? Same. So I built one.

Everything in one place, organised the way your brain actually works while you're playing. 🌸

---

## ✨ Features

### 🏠 Home

The default landing page. A 2×2 grid of widgets — Daily Checklist and Seasonal Events on top, Daily Gifts and Friendship Milestones below. Each card scrolls internally; on mobile the grid stacks to a single column.

- **✅ Daily Checklist** — built-in tasks for daily gifts, your daily reward, and daily quests. Add your own custom tasks too. A live countdown ticks to the next 7AM UTC reset. Custom tasks survive resets; checked state resets with them
- **🎀 Daily Gifts Summary** — all 22 residents at a glance with dot indicators. Quick-log a gift directly from the dashboard. Residents who still need gifts sort to the top
- **🌟 Friendship Milestones** — pick any resident to see their progress bar, the next ability unlock, and the full milestone timeline
- **📅 Seasonal Events** — all 19 known recurring events with live countdowns and Active / Upcoming / All filter

---

### 🐾 Residents

All 22 residents pre-loaded with real in-game data. No manual entry required.

- **⭐ Immediately Available** (6) — Hello Kitty, My Melody, Chococat, Tuxedosam, Badtz-Maru, Pochacco
- **🗺️ Encountered Elsewhere** (7) — Keroppi, Kuromi, Cinnamoroll, Pekkle, Pompompurin, Retsuko, Hangyodon
- **🔮 Quest Unlocked** (7) — Wish me mell, My Sweet Piano, Moppu, TOPHAT, Big Challenges, Kiki, Lala
- **💎 DLC** (2) — Usahana (City Town), Cogimyun (Wheatflour Wonderland)

Use the filter bar to browse by group, or search by resident name or gift name.

**On the card:**
- Character colour tint outer background with floating portrait
- Liked tags as emoji pills
- Friendship level tracker with progress bar
- 🎁 Return Gift — what they give you the first time you gift them
- 🎀 Daily Gift Tracker dot indicators
- Companion ability pills — ○ not started, ◑ partial, ✓ unlocked
- 📝 Personal Notes preview

**In the detail modal:**
- Full gift tracker with log, timestamp, and manual reset
- 💝 Loved Gift highlighted separately
- 🎁 All liked gifts sorted by heart tier
- 🎒 Giftable from Inventory — cross-references your liked tags against your inventory automatically
- 🌟 Full ability timeline with unlock levels, toggle each level individually
- 📝 My Notes — free-text, saves as you type

---

### 🎒 Inventory

- **📦 Import Materials** — one-click import of all 52 Friendship Island materials with locations
- Add, edit, and delete items with emoji, name, category, quantity, and tags
- Tag autocomplete, tag filter bar, tags included in search
- Quick +/− quantity buttons
- Colour-coded category badges

---

### 📖 Recipes *(station data in progress)*

All implemented station recipes pre-loaded. Select a station from the pill bar to browse.

> Image support is complete for Oven and Espresso Machine. Remaining stations are getting images filled in gradually. Candy Cloud Machine and Chef's Station (DLC) are still coming.

**Stations:**
- 🍞 **Oven** — Hello Kitty's, immediately available. 83 recipes including birthday cakes for every resident and seasonal specials
- 🧪 **Cauldron** — Kuromi's, Spooky Swamp. Potions with effects and durations. Upgraded potions require Wheatflour Wonderland DLC
- 🥤 **Soda Machine** — Pekkle's, Gemstone Town. 22 drinks
- 🍨 **Dessert Machine** — Pompompurin's, Dessert Boat. 38 frozen treats
- 🍳 **Egg Pan Station** — Pekkle & Pompompurin's, Gemstone Mountain. 31 egg dishes and crepes
- 🍕 **Pizza Oven** — Retsuko's, Mount Hothead. 28 pizzas. Technically immediate but tricky to reach early on
- ☕ **Espresso Machine** — two machines sharing the same 26 recipes. Hangyodon's at the Comedy Club and Hello Kitty's at the Hello Kitty Cafe

**Filters:** Rarity (All / Common / Uncommon / Rare / Legendary), 🎉 Seasonal, 💎 DLC, free-text search

**Recipe cards:** thumbnail, rarity badge, upgrade/seasonal/DLC indicators, ingredient preview, live progress bar against your inventory, ✨ Ready badge when you have everything — craftable recipes sort to the top automatically

**Detail modal:** full image, ingredient checklist with inventory quantities, effect and duration for potions, all tags, 🎉 confetti when you're ready to craft

---

### 🪑 Catalogue *(data in progress)*

Track furniture you've collected. A pre-loaded dataset with all base game and DLC items is on the way — for now, add items manually.

- One-tap Owned / Not Owned toggle
- Items grouped by category with per-group owned count
- Tag system and filter bar
- Global owned counter in the header

---

### 🌐 App-wide

- **🌙 Night mode** — dark navy-plum palette, toggled via the 🌙 / ☀️ button in the top right. Preference saved across sessions
- **Dreamy animated background** — slow drifting pastel gradient in light mode
- **Scrolling ticker banner** themed to the active tab colour
- **📱 Mobile responsive** throughout
- **Everything saves automatically** — no accounts, no server, no sign-in
- **Export & Import** your full island data as JSON — good for backups and moving between devices
- **Toast notifications** on every save and action
- **Keyboard accessible** with visible focus indicators throughout
- **? Help button** in the top right — reopens the welcome walkthrough at any time

---

## 🏷️ Tag System

Tags are how the game determines which gifts a resident will accept. Each resident has 3 liked tags — any inventory item matching at least one qualifies as a valid gift. This powers the **Giftable from Inventory** section in the detail modal, and it works automatically as long as your inventory items have tags set.

Recipe tags follow the same system and are useful for seeing what a station specialises in.

---

## 🎀 Gift Tracking

Each resident can receive up to 3 gifts per day. Resets at **7AM UTC** — the same time as the game.

Log gifts from the dashboard widget, the resident card, or the detail modal. Manual reset is available in the modal if needed. The live countdown in the Daily Checklist widget shows exactly how long until the next reset.

---

## 📅 Seasonal Events

19 known recurring events tracked with live countdowns. Categorised as Primary, Secondary, Calendar, or Flash. Dates are approximate — Sunblink adjusts them slightly year to year.

---

## ♿ Accessibility

- Keyboard navigable throughout with `:focus-visible` outlines themed to the active tab
- `role="dialog"` and `aria-modal` on all modals
- `role="progressbar"` with `aria-valuenow/min/max` on all progress bars
- Descriptive `aria-label` on every action button
- `htmlFor`/`id` pairing on all form fields
- Decorative emoji marked `aria-hidden`

---

## 🛠️ Tech Stack

- **React 18** with hooks
- **Vite** for the dev environment
- **Vitest + React Testing Library** for tests
- **canvas-confetti** for the recipe celebration 🎉
- CSS-in-JS via inline styles throughout — no CSS files, no Tailwind, no external UI library

---

## 🚀 Getting Started

```bash
npm install
npm run dev
npx vitest
```

> If something looks off after updating from an older version, open the browser console and run `localStorage.clear()` then refresh. This resets everything back to defaults — useful if a data migration didn't apply cleanly.

---

## 🎨 Adding New Sanrio Palettes

Open `src/constants.js` and add an entry to all three accent maps:

```js
ACCENT_GRADIENTS:    { mychar: "linear-gradient(90deg, #hex1, #hex2)" }
ACCENT_BG_GRADIENTS: { mychar: "linear-gradient(180deg, #hex1 0%, #hex2 50%, #ffffff 100%)" }
ACCENT_SOLID:        { mychar: "#hex" }
```

Then set `color: "mychar"` on the resident's entry in `SEED_RESIDENTS`.

If the solid colour is very dark (close to black or very deep brown), also add an override to `ACCENT_SOLID_DARK` in `ThemeContext.jsx` so it remains readable in dark mode.

---

## 🌸 A Note

This is a passion project built by a team of one — designed, developed, tested, and maintained by a single player who got tired of juggling Notepad files and physical notebooks mid-session. Every feature, every piece of game data, every late-night bug fix is the work of one person who just wanted a better way to play.

If something's broken, it's on the known issues list. If something's missing, it's probably on the roadmap. And if you find it useful — share it with your fellow islanders. That's the whole point. 🐾

*Not affiliated with Sanrio or Hello Kitty Island Adventure.*