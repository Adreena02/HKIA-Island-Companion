# 📋 HKIA Island Companion — Changelog

All notable changes to this project, from the very beginning. Newest first.

---

## [2.3] — Code Quality, Full Test Suite & WIP Notices

### Added
- **`WipNotice` component** (`src/components/ui/WipNotice.jsx`) — a warm, dismissible amber banner that appears at the top of the Recipes and Catalogue tabs on first visit. Stores dismissal state per-tab in localStorage so it only shows once. Styled to match the island palette with a 🏝️ icon, title, message, and ✕ dismiss button
- **WIP banner on Recipes tab** — honest about current state: manual recipe entry works now, full island recipe data is coming
- **WIP banner on Catalogue tab** — explains manual entry is available now, pre-loaded catalogue data is on the way
- **Onboarding for new users** added to the roadmap
- **`Modal.test.jsx`** — covers open/closed state, title rendering, ✕ button, backdrop click, Escape key, and ARIA attributes
- **`useLocalStorage.test.js`** — covers seed values, stored values, updates, functional updates, arrays, objects, and corrupt JSON fallback
- **`events.test.js`** — covers all 19 events for data integrity: unique ids, valid types, valid month/day ranges, descriptions, the single flash event, the two calendar events, Lighttime Jubilee's New Year wrap-around, and Give and Gather spanning all of December
- **`filterLogic.test.js`** — tests all 5 resident filters in isolation, verifies correct counts and representative residents, confirms mutual exclusivity across all four groups, and covers search by name, partial name, and gift name

### Changed
- **`residents.test.js`** fully rewritten to reflect the current 22-resident roster:
  - All four unlock groups tested (immediate: 6, elsewhere: 7, quest: 7, dlc: 2) with mutual exclusivity checks
  - DLC-specific tests: Usahana → City Town, Cogimyun → Wheatflour Wonderland, `dlc` field presence
  - Kiki and Lala shared Meteorology ability test
  - Big Challenges null birthday, Usahana maxLevel 20, Cogimyun maxLevel 35 spot checks
- **`TagPill.test.jsx`** — emoji coverage expanded to include new tags (Flower 🌸, Mochi 🍡, Glass 🔮)
- **`Btn.test.jsx`**, **`QtyBtn.test.jsx`**, **`GiftTracker.test.jsx`**, **`TagInput.test.jsx`**, **`ResidentCard.test.jsx`**, **`materials.test.js`** — updated to reflect current component behavior

### Fixed
- **`immediate` filter bug** in `ResidentsTab.jsx` — a redundant `|| (!r.unlockType)` condition was causing Encountered Elsewhere residents to appear under the Immediately Available filter. Corrected to `!r.note && !r.unlockType`
- **Dead file removed** — `src/components/furniture/FurnitureTab.jsx` deleted (superseded by `CatalogueTab.jsx`, never imported)

---

## [2.2] — New Residents, DLC Support & Filter Expansion

### Added
- **9 new island residents** — the full resident roster is now 22 characters:
  - **Quest-unlocked:** Wish me mell, My Sweet Piano, Moppu, TOPHAT, Big Challenges, Kiki, Lala
  - **DLC:** Usahana (City Town), Cogimyun (Wheatflour Wonderland)
  - All 9 include full gift data, companion abilities, portraits, birthdays, liked tags, and return gifts sourced from in-game data
- **`unlockType` field** on residents — `"quest"` or `"dlc"`. DLC residents also carry a `dlc` field naming the pack
- **🔮 Quest Unlocked filter** (purple) and **💎 DLC filter** (amber) added to the Residents tab filter bar
- **Unlock badges on resident cards** — Quest residents show a purple `🔮 Quest Unlock` pill; DLC residents show a gold `💎 DLC — [Pack Name]` pill
- **17 new tags** added to `TAG_EMOJI`: Flower 🌸, Rare 💎, Cloud ☁️, Creative 🎨, Gaming 🎮, Digital 💻, Frozen 🧊, Stars ⭐, Resilience 💪, Volcanic 🌋, Imagination 🌈, Mochi 🍡, Rainbow 🌈, Cheese 🧀, Wheatflower 🌾, Wand 🪄, Glass 🔮
- **9 new character colour palettes** added to all three accent maps for each new resident

### Changed
- Ability pills on resident cards now stack vertically so every card is uniform regardless of ability count
- `null` birthday (Big Challenges) renders as `Unknown`
- `null` max level renders without a progress bar (Usahana's max level since confirmed as 20)

### Known Issues
- **Ability pill layout inconsistency for existing users** — the vertical stacking fix only applies to fresh installs. Running `localStorage.removeItem("hkia_residents")` in the browser console and refreshing will fix it, but clears friendship levels and gift logs. A proper migration patch is planned

---

## [2.1] — Dashboard Polish & Mobile Responsiveness

### Added
- **📱 Full mobile responsiveness** across every tab — grids collapse, filter buttons scale, modals adapt, all flex rows wrap gracefully on narrow screens
- **⏱️ Live countdown** in Daily Checklist ticking down to the next 7AM UTC reset
- **＋ Gift quick-log** on the Dashboard Daily Gifts widget
- **🍑 Warm Peach palette** for the Home tab

### Changed
- Dashboard is now a proper 2×2 grid with fixed row heights and internal scroll on each card
- Friendship Milestones — removed duplicate level label

### Fixed
- Duplicate `flexShrink` key warning in Daily Checklist toggle button

---

## [2.0] — Dashboard / Home Tab

### Added
- **🏠 Home tab** as the default landing page
- **✅ Daily Checklist** with built-in tasks, custom tasks, and 7AM UTC reset
- **🎀 Daily Gifts Summary** for all residents with dot indicators
- **🌟 Friendship Milestones** with progress bar, next unlock callout, and full timeline
- **📅 Seasonal Events** tracker with 19 known recurring events and live countdowns
- **`constants_events.js`** — seed data for all 19 events

### Fixed
- `giftReset.js` was a placeholder stub — now fully implemented
- Daily Checklist resets at 7AM UTC, not local midnight

---

## [1.3 Patch] — Resident Notes, Recipe Improvements & Accessibility

### Added
- **📝 Personal Notes** on residents, auto-saved with 2-line card preview
- Category filter bar and craftable-first sorting on Recipes
- **✨ Ready badge**, green border glow, and "X ready to craft" counter on Recipes

### Accessibility
- Global `:focus-visible` ring themed to active tab colour
- `aria-current`, `aria-label`, `role="dialog"`, `aria-modal`, `role="progressbar"`, `aria-pressed`, `htmlFor`/`id` pairs, `aria-hidden` on decorative emoji throughout

---

## [1.2 Patch] — Bug Fixes & Code Cleanup

### Fixed
- Critical crash in `InventoryTab` — `handleSave` had a missing closing brace
- Dead `isDark` check removed from `App.jsx`

### Removed
- Unused `Tag` component from `Display.jsx`
- Dead `FurnitureTab.jsx`

---

## [1.1 Patch] — Scrolling Ticker Banner & Extended Test Suite

### Added
- Scrolling ticker banner themed to the active tab colour
- 6 new test files covering components, data integrity, and edge cases

---

## [1.0 Patch] — Materials Seed Data & Inventory Improvements

### Added
- **`constants_materials.js`** — 52 Friendship Island materials with location data
- **📦 Import Materials** button in Inventory
- **📍 Location badge** on inventory cards
- Currency and Weather inventory categories

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
- Floating portrait visual bug (thin white line between portrait and card)
- Light palette border visibility

---

## [0.7 Patch] — Dreamy Animated Background

### Changed
- Replaced static background with a slow 28-second drifting pastel gradient

---

## [0.6 Patch] — Tag System & Gifting Cross-Reference

### Added
- Tag system with up to 4 tags per inventory and catalogue item
- `TagPill` and `TagInput` components with autocomplete
- Tag filter bars on Inventory and Catalogue
- 33-tag emoji map in `constants.js`
- 3 liked tags per resident
- 🎒 Giftable from Inventory cross-reference in the resident detail modal

---

## [0.5 Patch] — Portraits, Static Roster & Card Redesign

### Added
- In-game portrait URLs for all 13 original residents

### Changed
- Layered card design — character tint outer background, clean white inner card, floating portrait
- Roster made fully static (pre-loaded, read-only)

### Fixed
- Various dead exports, wrong tab IDs, ExportImport missing catalogue key

---

## [0.4 Patch] — Abilities Overhaul

### Added
- Tiered companion ability system with per-level unlock toggles
- Three pill states: ○ not started, ◑ partially unlocked, ✓ fully unlocked

### Removed
- Friendship Rewards system (replaced by ability tiers)

---

## [0.3 Patch] — Gift System & Static Game Data

### Added
- Loved Gift (❤️❤️❤️) and Liked Gifts with heart and friendship values
- Full gift data hardcoded for all 13 original residents

---

## [0.2 Patch] — 13 Residents, Availability Filter & Card Polish

### Added
- 13 pre-loaded residents with real in-game data
- Location hints for Encountered Elsewhere residents
- Availability filter bar (All / Immediately Available / Encountered Elsewhere)
- First README

---

## [0.1 Patch] — Initial Build

### Added
- React 18 + Vite project scaffold
- `useLocalStorage` hook
- 9 Sanrio colour palettes
- Animated background, tab bar, themed scrollbar
- Residents, Inventory, Recipes, Catalogue tabs
- Export & Import (JSON)
- 34 automated tests

---

*Built with 🌸 by a player, for players. Not affiliated with Sanrio or Hello Kitty Island Adventure.*