# 📋 HKIA Island Companion — Changelog

All notable changes to this project, from the very beginning. Newest first.

---

## [2.1] — Dashboard Polish & Mobile Responsiveness

### Added
- **📱 Mobile responsiveness across the entire app** — every tab now adapts gracefully to phones and tablets:
  - Dashboard 2×2 grid collapses to a single column below 700px
  - Resident, Recipe, and Inventory card grids go single-column on narrow screens using `min()` in `minmax`
  - All filter buttons and tab nav use `clamp` for font size and scale down without wrapping awkwardly
  - Modals use `clamp` padding and font so they never overflow on small screens; close button gets `flexShrink: 0`
  - All flex rows with name + actions (gift rows, inventory rows, ability rows, furniture cards) get `flexWrap: wrap` so they stack rather than overflow
  - Header titles across all tabs use `clamp` for responsive font sizing

- **⏱️ Live countdown in Daily Checklist** — the subtitle now shows `Resets in Xh XXm XXs` and ticks down every second via a `setInterval` that cleans up on unmount. Replaces the static "Resets at [time]" label

- **＋ Gift quick-log button on Dashboard** — each resident row in the Daily Gifts widget now has a character-coloured **＋ Gift** button. Tapping it logs a gift instantly, fires a toast, and updates the dot indicators in real time. Residents who've received all 3 gifts show a green **✓ Done** label instead. Writes to the same `hkia_residents` localStorage key so it stays in sync with the Residents tab

- **🍑 Warm Peach palette for the Home tab** — the Home tab now has its own distinct colour identity instead of sharing Hello Kitty red. Added `home` key to `ACCENT_GRADIENTS`, `ACCENT_BG_GRADIENTS`, and `ACCENT_SOLID` in `constants.js`

### Changed
- **Dashboard layout** — cards are now arranged as a proper 2×2 grid with fixed `340px` row heights so all four widgets are the same size. Top row: Daily Checklist + Seasonal Events. Bottom row: Daily Gifts + Friendship Milestones
- **All four dashboard cards are now scrollable** — each card has a fixed height and scrolls internally, with a soft fade-out gradient at the bottom to hint at more content. The `DashboardCard` wrapper component handles this via a pinned header slot and a `flex: 1` scroll area
- **Section headers centred** across all four dashboard widgets
- **Friendship Milestones** — removed the duplicate level label that appeared on the right side of each milestone row. Level is now only shown once, in the left badge

### Fixed
- **Duplicate `flexShrink` key** in the Daily Checklist toggle button style — removed the second `flexShrink: 0` that was causing a Vite warning

---

## [2.0] — Dashboard / Home Tab

### Added
- **🏠 Home tab** — new first tab, set as the default landing page on load
- **✅ Daily Checklist** — 3 built-in tasks (daily gifts, collect daily reward, complete daily quests) plus unlimited custom tasks you can add yourself. Resets at 7AM UTC globally. Custom tasks survive the reset; checked state does not
- **🎀 Daily Gifts Summary** — all 13 residents listed with dot indicators and remaining gift count. Sorted with residents who still need gifts first. Shows "All gifts given today!" when complete
- **🌟 Friendship Milestones** — resident dropdown with friendship progress bar, a "next unlock" callout showing the upcoming ability and how many levels away it is, and a full scrollable timeline of every ability milestone colour-coded by whether you've reached it
- **📅 Seasonal Events tracker** — all 19 known recurring HKIA events with live countdowns. Active events show days remaining with a green ACTIVE badge; upcoming events show days away. Filter between Active, Upcoming, and All. Dates are approximate and noted as such
- **`constants_events.js`** — seed data for all 19 known recurring events with names, emojis, types, approximate date ranges, descriptions, and notes

### Fixed
- **`giftReset.js` was a placeholder** — the file contained only the word "placeholder". Now fully implemented with `getLastResetTime`, `getNextResetTime`, `isExpired`, `getCurrentGiftCount`, `formatNextReset`, `formatGiftTime`, and `getLastResetISO`. This fixes gift tracking across the entire app
- **Daily Checklist resets at 7AM UTC** — previously used local calendar date (midnight) as the reset boundary; now uses `getLastResetISO` to match the game's exact reset time globally

---

## [1.3 Patch] — Resident Notes, Recipe Improvements & Accessibility

### Added
- **📝 Personal Notes on residents** — a free-text notes field in the detail modal, auto-saved as you type. Notes show as a compact 2-line preview on the resident card too
- **Category filter bar on Recipes** — filter your recipe book by Cooking, Crafting, Farming, Gifting, or Other with a single click
- **Craftable-first sorting** — recipes you can make right now float to the top of the list automatically
- **✨ Ready badge** on recipe cards — a green badge and green border glow appear when you have all ingredients for a recipe
- **"X ready to craft" counter** in the Recipe Book header — see at a glance how many recipes you can make right now
- **Context-aware empty states** on Recipes — message changes based on whether you've filtered by category or have no recipes at all

### Changed
- Recipe cards with all ingredients available now show a green border glow instead of the standard white border

### Accessibility
- **Global `:focus-visible` ring** — all interactive elements show a clear, themed focus outline when navigated by keyboard. The ring colour follows the active tab's accent colour
- **`aria-current="page"`** on the active tab button
- **`aria-label`** added to nav, main content region, all action buttons, and the ticker banner
- **`role="dialog"` + `aria-modal="true"`** on all modal dialogs, with `aria-label` set to the modal title
- **`role="progressbar"`** with `aria-valuenow/min/max` on all ingredient progress bars
- **`aria-pressed`** on category filter buttons in Recipes
- **`htmlFor` + `id` pairing** on the Personal Notes textarea
- Decorative emoji marked `aria-hidden="true"` throughout

---

## [1.2 Patch] — Bug Fixes & Code Cleanup

### Fixed
- **Critical bug in `InventoryTab`** — `handleSave` was detached from the component due to a missing closing brace on `handleImportMaterials`, causing a runtime crash on any attempt to add or edit inventory items
- **Dead `isDark` check removed from `App.jsx`** — a leftover `badtzmaru` colour check that referenced a tab colour that doesn't exist in the tab bar

### Removed
- **`Tag` component deleted from `Display.jsx`** — exported but never imported anywhere in the app
- **`src/components/furniture/FurnitureTab.jsx` deleted** — fully replaced by `CatalogueTab.jsx` and never imported anywhere; was dead code

---

## [1.1 Patch] — Scrolling Ticker Banner & Extended Test Suite

### Added
- **Scrolling ticker banner** — a marquee-style banner pinned to the top of the page. Colour transitions with the active tab's character theme
- **6 new test files** — `GiftTracker.test.jsx`, `TagInput.test.jsx`, `QtyBtn.test.jsx`, `Btn.test.jsx`, `materials.test.js`, `residents.test.js` covering component rendering, data integrity for all 13 residents and all 52 materials, and edge cases across the gift system and tag input

---

## [1.0 Patch] — Materials Seed Data & Inventory Improvements

### Added
- **`constants_materials.js`** — 52 Friendship Island materials pre-loaded with name, emoji, category, location, and qty 0, ready to import
- **📦 Import Materials button** in the Inventory tab — adds all materials in one click, skipping any already in your inventory by name
- **📍 Location badge** on inventory cards — shows where the item is found (e.g. Spooky Swamp, Rainbow Reef, Gift Return)
- **Currency** and **Weather** added as new inventory categories, with their own colour badges

### Changed
- `ITEM_CATEGORIES` updated to include `Currency` and `Weather`
- `INVENTORY_CAT_COLORS` updated with amber for Currency and sky blue for Weather

---

## [0.9 Patch] — Gift Tracking & Inventory Editing

### Added
- **🎀 Daily Gift Tracker** — each resident tracks up to 3 gifts per day with a compact counter on the card and full tracker in the modal
- **Automatic daily reset** — gift counts reset automatically at 7AM UTC every day
- **`giftReset.js` utility** — handles all reset logic, expiry checks, and time formatting
- **`GiftTracker` component** — reusable in both compact and full form
- **✏️ Edit inventory items** — edit emoji, name, quantity, and tags without deleting and re-adding

### Changed
- "View Gifts" button renamed to **"View Details"** — more accurate since the modal covers abilities, gift tracking, and gifting cross-reference

### Fixed
- Inventory quantity now always displays even for items added before the qty field existed, defaulting to 0
- Quantity text colour made explicit so it's always visible against the white card background

---

## [0.8 Patch] — Character Palettes & Visual Fixes

### Added
- **4 new character palettes** — Chococat (chocolate brown), Retsuko (red), Pekkle (sunny yellow), Hangyodon (ocean teal)

### Fixed
- Portrait now **floats between the outer tint and inner white card** — eliminates the thin white line visual bug at the top of resident cards
- Inner white card given a subtle coloured border so the edge is always visible on light palettes
- Light palette backgrounds made more saturated so the tint is clearly visible

---

## [0.7 Patch] — Dreamy Animated Background

### Changed
- **Dreamy animated background** — replaces the dynamic per-tab background with a slow 28-second drifting pastel gradient blending pink, lavender, peach, mint, and sky blue

---

## [0.6 Patch] — Tag System & Gifting Cross-Reference

### Added
- **Tag system** — items in Inventory and Catalogue can now have up to 4 tags each, matching the in-game tag mechanic
- **`TagPill` component** — tags display as emoji pills everywhere in the app
- **`TagInput` component** — multi-tag input with autocomplete, keyboard support, and a 4-tag maximum
- **Tag autocomplete** — suggestions are built from your existing tagged items as you play
- **Tag filter bars** — Inventory and Catalogue both have a tag filter bar
- **Tag emoji map** — 33 tags mapped to emojis in `constants.js`
- **Resident liked tags** — each of the 13 residents now has 3 hardcoded liked tags
- **🎒 Giftable from Inventory** — new section in the resident detail modal that cross-references liked tags against inventory

### Changed
- Tags are included in search across Inventory and Catalogue

---

## [0.5 Patch] — Portraits, Static Roster & Card Redesign

### Added
- **In-game portraits** — all 13 residents now have their official wiki portrait hardcoded
- **🐾 fallback** — shown if a portrait ever fails to load

### Changed
- **Layered card design** — soft character colour tint outer background, clean white inner card on top
- **Edit and Remove buttons removed** — the resident roster is now fully static and read-only
- **`ResidentForm` deleted** — no longer needed since residents are fully hardcoded

### Fixed
- `ResidentCard.test.jsx` fully rewritten to match the new read-only component API
- Dead exports removed from `constants.js`
- `ExportImport` now correctly includes `hkia_catalogue` in both export and import
- Tab ID corrected from `"furniture"` to `"catalogue"` in `App.jsx`

---

## [0.4 Patch] — Abilities Overhaul & Cleanup

### Added
- **Tiered ability system** — abilities now have multiple levels, each with its own unlock friendship level and description
- **Per-level toggle** — each ability level can be individually marked as unlocked
- **Ability pill states** — ○ not started, ◑ partially unlocked (X/Y count), ✓ fully unlocked

### Removed
- **Friendship Rewards** removed entirely — the section, form field, data, and all references

---

## [0.3 Patch] — Gift System & Static Game Data

### Added
- **Loved Gift** — each resident now has a single top-tier loved gift (❤️❤️❤️)
- **Liked Gifts with heart values** — gifts are objects with `heartValue` and `friendshipValue`, sorted highest to lowest
- **Full gift data hardcoded** for all 13 residents from game data

### Changed
- `gifts` field changed from `string[]` to `{ name, heartValue, friendshipValue }[]`
- "Item Received" renamed to **"Return Gift"** throughout the app

---

## [0.2 Patch] — 13 Residents, Availability Filter & Card Polish

### Added
- **13 pre-loaded residents** — 6 immediately available, 7 encountered elsewhere, all with real game data
- **Location hints** on encountered elsewhere residents
- **Availability filter** — All, ⭐ Immediately Available, 🗺️ Encountered Elsewhere
- **README** — friendly player-voice readme covering all features and tech stack

### Changed
- **"Furniture" tab renamed to "Catalogue"** throughout the app

---

## [0.1 Patch] — Initial Build

### Added
- **React 18 + Vite** project scaffolded
- **`useLocalStorage` hook** — drop-in useState replacement that persists to localStorage
- **9 Sanrio colour palettes** — Hello Kitty, My Melody, Kuromi, Cinnamoroll, Pompompurin, Keroppi, Pochacco, Badtz-Maru, Little Twin Stars
- **Dynamic page background**, **tab buttons**, and **scrollbar** that all respond to the active character theme

#### 🐱 Residents Tab
- Add, edit, and delete residents with Sanrio colour picker, portrait, birthday, max friendship level, return gift, and companion abilities
- Friendship level tracker with +/− buttons and progress bar
- Detail modal with liked gifts, friendship rewards, and abilities
- Search by name or gift

#### 🎒 Inventory Tab
- Add, edit, and delete items with emoji, name, category, and quantity
- +/− quantity controls and colour-coded category badges

#### 📖 Recipes Tab
- Add recipes with ingredients, category, and result
- Ingredient autocomplete from inventory
- Live progress bar per recipe card and 🔍 Check Ingredients modal
- 🎉 Confetti celebration when all ingredients are available

#### 🪑 Catalogue Tab
- Add furniture items and track owned/not owned
- Items grouped by category with per-group owned count
- Filter by owned status

#### 🌐 App-wide
- Export & Import full island data as JSON
- localStorage auto-save on every change
- Toast notifications for save and delete actions
- **34 automated tests** with Vitest + React Testing Library

---

*Built with 🌸 by a player, for players. Not affiliated with Sanrio or Hello Kitty Island Adventure.*