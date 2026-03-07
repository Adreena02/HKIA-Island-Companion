# 📋 HKIA Island Companion — Changelog

All notable changes to this project, from the very beginning. Newest first.

---

## [2.6] — Night Mode & Theme System

### Added
- **🌙 Night mode** — a full dark theme with a deep navy-plum palette. Toggled via a 🌙 / ☀️ button in the header, next to the existing `?` help button. Preference persists across sessions in localStorage
- **`ThemeContext.jsx`** (`src/contexts/ThemeContext.jsx`) — new context provider at the app root. Exports a `th` token map (`th.card`, `th.text`, `th.border`, `th.progressBg`, etc.) and a `dark` boolean, consumed by every component. Single source of truth for both themes
- **`ACCENT_SOLID_DARK`** — exported override map in `ThemeContext` for character accent colours that are too dark to read against a dark background. Currently overrides Chococat (`#3d1f0a` → warm caramel `#c8956c`) and Badtz-Maru (`#1c1917` → his signature yellow `#facc15`). Applied wherever `solidColor` is derived from a resident's palette: `ResidentCard`, `ResidentDetailModal`, and the Dashboard gift/milestone widgets
- **Dark background** — deep navy-plum static gradient replaces the animated pastel drift in dark mode. The animation is fully preserved in light mode

### Changed
- All 17 components updated to consume `useTheme()` — `Btn`, `Toast`, `WipNotice`, `Display`, `FormFields`, `Modal`, `TagPill`, `TagInput`, `OnboardingModal`, `GiftTracker`, `QtyBtn`, `ResidentCard`, `ResidentsTab`, `ResidentDetailModal`, `InventoryTab`, `CatalogueTab`, `RecipesTab`, `DashboardTab`
- **Resident cards in dark mode** — outer background is a subtle tint of the character's accent colour against the dark card surface, preserving per-character identity without harsh contrast
- **Header** — `?` and 🌙 buttons share a consistent pill style, both themed to the active tab colour
- **Ticker banner** — fixed the loop glitch. Both copies now use `flexShrink: 0` with consistent per-message padding so `translateX(-50%)` lands exactly at the start of copy two. Added `willChange: transform` for compositor-layer smoothness. Second copy marked `aria-hidden`

---

## [2.5] — Station Recipes, Image Support & Recipes Tab Rebuild

### Added
- **`constants_stations.js`** — station metadata for all currently implemented Create stations: Oven, Cauldron, Soda Machine, Dessert Machine, Egg Pan Station, Pizza Oven, and both Espresso Machines (Comedy Club + Hello Kitty Cafe). All stations use `owners: []` array
- **`constants_station_recipes.js`** — 232 recipes across all stations, with rarity, tags, ingredients, DLC flags, event flags, and image URLs where available
- **`image` field** on recipes — wiki image URLs filled in for Oven (83 recipes) and Espresso Machine (26 recipes)
- **`stations` array field** on all recipes — replaces `station: ""` string. Supports shared recipes across multiple machines (both Espresso Machines share the same 26 recipes)
- **Rebuilt `RecipesTab.jsx`** from scratch:
  - Station selector pill bar
  - Station info panel (location, owners, base ingredient, upgrade requirements, and contextual notes)
  - Rarity filter pills (All / Common / Uncommon / Rare / Legendary)
  - Seasonal and DLC toggle filters
  - Free-text search by name, ingredient, or tag
  - Recipe cards with thumbnail, rarity badge, upgrade/seasonal/DLC indicators, ingredient preview, live progress bar
  - Craftable recipes sort to the top with a ✨ Ready badge
  - Detail modal with large image, full ingredient checklist, effect/duration for potions, tags, and confetti when everything is ready
- **Espresso Machine UI consolidation** — both machines appear as a single ☕ Espresso Machine button in the station selector. Underlying data unchanged
- **`OnboardingModal.jsx`** — 3-step welcome modal shown automatically on first visit. `?` button in the header reopens it at any time

### Changed
- All recipes migrated from `station: ""` to `stations: []`
- Old manual recipe system removed from RecipesTab (`SEED_RECIPES`, `RECIPE_CATEGORIES`, `RECIPE_CAT_COLORS` no longer used in the tab)

### Data
| Station | Recipes | Images |
|---|---|---|
| Oven | 83 | ✅ Complete |
| Cauldron | 11 | ⬜ |
| Soda Machine | 22 | ⬜ |
| Dessert Machine | 38 | ⬜ |
| Egg Pan Station | 31 | ⬜ |
| Pizza Oven | 28 | ⬜ |
| Espresso Machine | 26 | ✅ Complete |

---

## [2.4] — Ability Pill Migration Fix

### Fixed
- `migrateResident` now silently patches stored ability data from flat (`{ name, description, unlocked }`) to tiered (`{ name, levels: [...] }`) on every load. Friendship levels, gift logs, notes, and unlocked states fully preserved

---

## [2.3] — Code Quality, Full Test Suite & WIP Notices

### Added
- **`WipNotice` component** — dismissible amber banner, per-tab dismissal state in localStorage
- WIP banners on Recipes and Catalogue tabs
- `Modal.test.jsx`, `useLocalStorage.test.js`, `events.test.js`, `filterLogic.test.js`

### Changed
- `residents.test.js` fully rewritten for the 22-resident roster with mutual exclusivity checks across all four groups
- Tag, Btn, QtyBtn, GiftTracker, TagInput, ResidentCard, materials tests updated

### Fixed
- `immediate` filter bug — Encountered Elsewhere residents were incorrectly appearing under Immediately Available
- Dead `FurnitureTab.jsx` removed

---

## [2.2] — New Residents, DLC Support & Filter Expansion

### Added
- **9 new residents** — full roster now 22. Quest-unlocked: Wish me mell, My Sweet Piano, Moppu, TOPHAT, Big Challenges, Kiki, Lala. DLC: Usahana (City Town), Cogimyun (Wheatflour Wonderland). All 9 include full gift data, abilities, portraits, birthdays, and liked tags
- `unlockType` field (`"quest"` | `"dlc"`) and `dlc` pack name field on residents
- 🔮 Quest Unlocked (purple) and 💎 DLC (amber) filter buttons in the Residents tab
- Unlock type badges on resident cards
- 17 new tags in `TAG_EMOJI`
- 9 new character colour palettes across all three accent maps

---

## [2.1] — Dashboard Polish & Mobile Responsiveness

### Added
- Full mobile responsiveness across every tab — grids collapse, filter buttons scale, modals adapt
- Live countdown in Daily Checklist ticking to the next 7AM UTC reset
- ＋ Gift quick-log button on the Dashboard gift widget

### Changed
- Dashboard 2×2 grid with fixed row heights and internal scroll on each card

### Fixed
- Duplicate `flexShrink` key warning in Daily Checklist toggle button

---

## [2.0] — Dashboard / Home Tab

### Added
- **🏠 Home tab** as the default landing page
- Daily Checklist (with 7AM UTC reset), Daily Gifts Summary, Friendship Milestones, and Seasonal Events widgets
- `constants_events.js` — seed data for 19 recurring seasonal events
- `giftReset.js` fully implemented (was a placeholder stub)

---

## [1.3 Patch] — Resident Notes, Recipe Improvements & Accessibility

### Added
- 📝 Personal Notes on residents — free-text, saves as you type, 2-line card preview
- ✨ Ready badge, green border glow, and craftable-first sort on Recipes tab
- Full accessibility pass: `:focus-visible` rings themed to active tab, `aria-current`, `role="dialog"`, `aria-modal`, `role="progressbar"`, `aria-pressed`, `aria-label`, `htmlFor`/`id` pairs, `aria-hidden` on decorative emoji

---

## [1.2 Patch] — Bug Fixes & Code Cleanup

### Fixed
- Critical crash in `InventoryTab` — `handleSave` had a missing closing brace
- Dead `isDark` check removed from `App.jsx`

### Removed
- Unused `Tag` component from `Display.jsx`

---

## [1.1 Patch] — Scrolling Ticker Banner & Tests

### Added
- Scrolling ticker banner in the header, themed to the active tab colour
- 6 new test files covering components, data integrity, and edge cases

---

## [1.0 Patch] — Materials Seed Data & Inventory Improvements

### Added
- `constants_materials.js` — 52 Friendship Island materials with location data
- 📦 Import Materials one-click button in Inventory
- Currency and Weather inventory categories

---

## [0.9 Patch] — Gift Tracking & Inventory Editing

### Added
- 🎀 Daily Gift Tracker with automatic 7AM UTC reset
- `giftReset.js` utility and `GiftTracker` component
- Inventory item editing

### Changed
- "View Gifts" renamed to "View Details"

---

## [0.8 Patch] — Character Palettes & Visual Fixes

### Added
- 4 new character palettes: Chococat, Retsuko, Pekkle, Hangyodon

### Fixed
- Floating portrait thin white line visual bug
- Light palette border visibility

---

## [0.7 Patch] — Dreamy Animated Background

### Changed
- Slow 28-second drifting pastel gradient replaces the static background

---

## [0.6 Patch] — Tag System & Gifting Cross-Reference

### Added
- Tag system — up to 4 tags per inventory and catalogue item, `TagPill` and `TagInput` with autocomplete, tag filter bars on Inventory and Catalogue
- 33-tag emoji map in `constants.js`
- 3 liked tags per resident
- 🎒 Giftable from Inventory cross-reference in the resident detail modal

---

## [0.5 Patch] — Portraits, Static Roster & Card Redesign

### Added
- In-game portrait URLs for all 13 original residents

### Changed
- Layered card design — character tint outer, clean white inner, floating portrait
- Roster made fully static and pre-loaded

### Fixed
- Various dead exports, wrong tab IDs, ExportImport missing catalogue key

---

## [0.4 Patch] — Abilities Overhaul

### Added
- Tiered companion ability system with per-level unlock toggles
- Three pill states: ○ not started, ◑ partially unlocked, ✓ fully unlocked

### Removed
- Flat Friendship Rewards system (replaced by ability tiers)

---

## [0.3 Patch] — Gift System & Static Game Data

### Added
- Loved Gift (❤️❤️❤️) and Liked Gifts with heart and friendship values hardcoded for all 13 original residents

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
- React 18 + Vite scaffold
- `useLocalStorage` hook
- 9 Sanrio colour palettes
- Animated background, tab bar, themed scrollbar
- Residents, Inventory, Recipes, Catalogue tabs
- Export & Import (JSON)
- 34 automated tests

---

*Built with 🌸 by a player, for players. Not affiliated with Sanrio or Hello Kitty Island Adventure.*