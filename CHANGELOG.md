# 📋 HKIA Island Companion — Changelog

All notable changes to this project, from the very beginning. Newest first.

---

## [2.2] — New Residents, DLC Support & Filter Expansion

### Added
- **9 new island residents** — the full resident roster is now 22 characters:
  - **Quest-unlocked:** Wish me mell, My Sweet Piano, Moppu, TOPHAT, Big Challenges, Kiki, Lala
  - **DLC:** Usahana (City Town), Cogimyun (Wheatflour Wonderland)
  - All 9 include full gift data, companion abilities, portraits, birthdays, liked tags, and return gifts sourced from in-game data
- **`unlockType` field** on residents — values: `"immediate"`, `"elsewhere"`, `"quest"`, or `"dlc"`. DLC residents also carry a `dlc` field naming the pack
- **🔮 Quest Unlocked filter** (purple) and **💎 DLC filter** (amber) added to the Residents tab filter bar. All 5 filters now have their own accent colour when active
- **Unlock badges on resident cards** — Quest residents show a purple `🔮 Quest Unlock` pill; DLC residents show a gold `💎 DLC — [Pack Name]` pill below their name
- **17 new tags** added to `TAG_EMOJI`: Flower 🌸, Rare 💎, Cloud ☁️, Creative 🎨, Gaming 🎮, Digital 💻, Frozen 🧊, Stars ⭐, Resilience 💪, Volcanic 🌋, Imagination 🌈, Mochi 🍡, Rainbow 🌈, Cheese 🧀, Wheatflower 🌾, Wand 🪄, Glass 🔮
- **9 new character colour palettes** added to all three accent maps (`ACCENT_GRADIENTS`, `ACCENT_BG_GRADIENTS`, `ACCENT_SOLID`) for each new resident

### Changed
- **Ability pills on resident cards** now stack vertically (`flexDirection: "column"`) instead of wrapping horizontally, so every card is uniform regardless of how many abilities a resident has or how long their names are
- **`null` birthday** (Big Challenges) renders as `Unknown` rather than a blank dash
- **`null` max level** renders without a progress bar (Usahana's max level has since been confirmed as 20)

### Known Issues
- **Ability pill layout inconsistency for existing users** — the vertical stacking fix only applies to fresh installs. Users with existing localStorage data will still see the old horizontal wrapping on residents like Retsuko, Kuromi, and Keroppi. Running `localStorage.removeItem("hkia_residents")` in the browser console and refreshing will fix it, but clears friendship levels and gift logs. A proper migration patch is planned for the next session

---

## [2.1] — Dashboard Polish & Mobile Responsiveness

### Added
- **📱 Mobile responsiveness across the entire app** — every tab now adapts gracefully to phones and tablets:
  - Dashboard 2×2 grid collapses to a single column below 700px
  - Resident, Recipe, and Inventory card grids go single-column on narrow screens using `min()` in `minmax`
  - All filter buttons and tab nav use `clamp` for font size and scale down without wrapping awkwardly
  - Modals use `clamp` padding and font so they never overflow on small screens
  - All flex rows with name + actions get `flexWrap: wrap` so they stack rather than overflow
  - Header titles across all tabs use `clamp` for responsive font sizing
- **⏱️ Live countdown in Daily Checklist** — ticks down every second to the next 7AM UTC reset
- **＋ Gift quick-log button on Dashboard** — log gifts directly from the Daily Gifts widget without navigating away
- **🍑 Warm Peach palette for the Home tab**

### Changed
- Dashboard layout is now a proper 2×2 grid with fixed `340px` row heights
- All four dashboard cards are scrollable with a pinned header and fade gradient
- Section headers centred across all dashboard widgets
- Friendship Milestones — removed duplicate level label from milestone rows

### Fixed
- Duplicate `flexShrink` key warning in Daily Checklist toggle button

---

## [2.0] — Dashboard / Home Tab

### Added
- **🏠 Home tab** — new default landing page
- **✅ Daily Checklist** — built-in and custom tasks, resets at 7AM UTC
- **🎀 Daily Gifts Summary** — all residents with dot indicators and gift counts
- **🌟 Friendship Milestones** — per-resident progress, next unlock callout, full milestone timeline
- **📅 Seasonal Events tracker** — 19 known recurring events with live countdowns
- **`constants_events.js`** — seed data for all 19 events

### Fixed
- **`giftReset.js` was a placeholder** — fully implemented with all reset utilities
- Daily Checklist now resets at 7AM UTC instead of local midnight

---

## [1.3 Patch] — Resident Notes, Recipe Improvements & Accessibility

### Added
- **📝 Personal Notes** on residents — auto-saved, shown as 2-line preview on card
- **Category filter bar** on Recipes
- **Craftable-first sorting** on Recipes
- **✨ Ready badge** and green border glow on craftable recipe cards
- **"X ready to craft" counter** in Recipe header
- **Context-aware empty states** on Recipes

### Accessibility
- Global `:focus-visible` ring themed to active tab
- `aria-current`, `aria-label`, `role="dialog"`, `aria-modal`, `role="progressbar"`, `aria-pressed`, `htmlFor`/`id` pairing, `aria-hidden` on decorative emoji added throughout

---

## [1.2 Patch] — Bug Fixes & Code Cleanup

### Fixed
- Critical crash in `InventoryTab` — `handleSave` detached due to missing closing brace
- Dead `isDark` check removed from `App.jsx`

### Removed
- Unused `Tag` component from `Display.jsx`
- Dead `FurnitureTab.jsx`

---

## [1.1 Patch] — Scrolling Ticker Banner & Extended Test Suite

### Added
- Scrolling ticker banner themed to the active tab
- 6 new test files covering components, data integrity, and edge cases

---

## [1.0 Patch] — Materials Seed Data & Inventory Improvements

### Added
- **`constants_materials.js`** — 52 Friendship Island materials
- **📦 Import Materials button** in Inventory
- **📍 Location badge** on inventory cards
- **Currency** and **Weather** inventory categories

---

## [0.9 Patch] — Gift Tracking & Inventory Editing

### Added
- **🎀 Daily Gift Tracker** with automatic 7AM UTC reset
- **`giftReset.js`** utility and **`GiftTracker`** component
- **✏️ Edit inventory items**

### Changed
- "View Gifts" renamed to "View Details"

---

## [0.8 Patch] — Character Palettes & Visual Fixes

### Added
- 4 new palettes: Chococat, Retsuko, Pekkle, Hangyodon

### Fixed
- Floating portrait visual bug (thin white line)
- Light palette border visibility

---

## [0.7 Patch] — Dreamy Animated Background

### Changed
- Slow 28-second drifting pastel gradient background

---

## [0.6 Patch] — Tag System & Gifting Cross-Reference

### Added
- Tag system with up to 4 tags per item
- `TagPill`, `TagInput` components
- Tag autocomplete, tag filter bars
- 33-tag emoji map
- Resident liked tags (3 per resident)
- 🎒 Giftable from Inventory cross-reference in detail modal

---

## [0.5 Patch] — Portraits, Static Roster & Card Redesign

### Added
- Hardcoded in-game portraits for all 13 original residents

### Changed
- Layered card design (tint outer, white inner)
- Roster made fully static and read-only

### Fixed
- Various dead exports, wrong tab IDs, ExportImport catalogue inclusion

---

## [0.4 Patch] — Abilities Overhaul

### Added
- Tiered ability system with per-level toggles
- Three pill states: ○ not started, ◑ partial, ✓ fully unlocked

### Removed
- Friendship Rewards system

---

## [0.3 Patch] — Gift System & Static Game Data

### Added
- Loved Gift (❤️❤️❤️), Liked Gifts with heart/friendship values
- Full gift data hardcoded for all 13 original residents

---

## [0.2 Patch] — 13 Residents, Availability Filter & Card Polish

### Added
- 13 pre-loaded residents with real game data
- Location hints for encountered elsewhere residents
- Availability filter (All / Immediately Available / Encountered Elsewhere)
- README

---

## [0.1 Patch] — Initial Build

### Added
- React 18 + Vite scaffold
- `useLocalStorage` hook
- 9 Sanrio colour palettes
- Dynamic background, tab buttons, scrollbar
- Residents, Inventory, Recipes, Catalogue tabs
- Export & Import
- 34 automated tests

---

*Built with 🌸 by a player, for players. Not affiliated with Sanrio or Hello Kitty Island Adventure.*