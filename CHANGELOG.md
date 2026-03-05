# 📋 HKIA Island Companion — Changelog

All notable changes to this project, from the very beginning. Newest first.

---

## [Current 0.9 Patch] - Gift Tracking & Inventory Editing

### Added
- **🎀 Daily Gift Tracker** - each resident tracks up to 3 gifts per day. A compact counter sits on the resident card; the full tracker in the detail modal includes dot indicators, a Log Gift button, timestamp of the last gift, and a manual Reset button for in-game reset items
- **Automatic daily reset** - gift counts reset automatically at 7AM GMT (6 AM during Daylight Savings Time). No manual action needed
- **`giftReset`.js utility** - handles all reset logic, expiry checks, and time formatting in one place
- **`GiftTracker` component** — reusable component used in both compact (card) and full (modal) form
- **✏️ Edit inventory items** — each inventory card now has an edit button to update emoji, name, quantity, and tags without deleting and re-adding

### Changed
- "View Gifts" button on resident cards renamed to **"View Details"** — more accurate since the modal covers abilities, gift tracking, and gifting cross-reference too

### Fixed
- Inventory quantity now always displays even for items added before the qty field existed, defaulting to 0
- Quantity text colour made explicit so it's always visible against the white card background

---

## [0.8 Patch] - Character Palettes & Visual Fixes

### Added
- **4 new character palettes** - Chococat (chocolate brown), Retsuko (red), Pekkle (sunny yellow), Hangyodon (ocean teal)

### Changed
- Chococat, Retsuko, Pekkle, and Hangyodon reassigned from borrowed palettes to their own

### Fixed
- Portrait now **floats between the outer tint and inner white card** - eliminates the thin white line visual bug at the top of resident cards
- Inner white card given a subtle coloured border so the edge is always visible on light palettes
- Light palette backgrounds (Cinnamoroll, Pochacco, Hangyodon, Pekkle) made more saturated so the tine is clearly visible

---
## [0.7 Patch] - Dreamy Animated Background

### Changed
- **Dreamy animated background** - replaces the dynamic per-tab background with a slow 28 second drifting pastel gradient blending pink, lavender, peach, mint, and sky blue

---

## [Current 0.6 Patch] — Tag System & Gifting Cross-Reference

### Added
- **Tag system** — items in Inventory and Catalogue can now have up to 4 tags each, matching the in-game tag mechanic
- **`TagPill` component** — tags display as emoji pills everywhere in the app. Hover any pill to see the full tag name as a tooltip
- **`TagInput` component** — multi-tag input with autocomplete, keyboard support (Enter or comma to add, Backspace to remove), and a 4-tag maximum enforced
- **Tag autocomplete** — suggestions are built from your existing tagged items as you play, so the tag list grows organically without needing to pre-load anything
- **Tag filter bars** — Inventory and Catalogue both have a tag filter bar that appears once you have tagged items. Click a tag to filter, click again to clear
- **Tag emoji map** — 33 tags mapped to emojis in `constants.js`. Unknown tags fall back to displaying as text
- **Resident liked tags** — each of the 13 residents now has 3 hardcoded liked tags displayed as character-coloured emoji pills on their card
- **🎒 Giftable from Inventory** — new section in the resident detail modal that automatically cross-references the resident's liked tags against your inventory and lists every item you currently have that qualifies as a gift, with the matching tags highlighted

### Changed
- Tags are included in search across Inventory and Catalogue

---

## [0.5 Patch] — Portraits, Static Roster & Card Redesign

### Added
- **In-game portraits** — all 13 residents now have their official wiki portrait hardcoded, displayed as a circular image at the top of each card
- **🐾 fallback** — shown if a portrait ever fails to load

### Changed
- **Layered card design** — resident cards now use a soft character colour tint as the outer background, with a clean white inner card on top. The old gradient bar at the top is gone
- **Resident name** now renders in the character's solid colour inside the white inner card
- **Resident liked tags** displayed as soft character-coloured pills below the name (added later in same session)
- **Edit and Remove buttons removed** — the resident roster is now fully static and read-only
- **Add Resident button removed** — the roster is fixed at 13 residents
- **`ResidentForm` deleted** — no longer needed since residents are fully hardcoded
- **Image URL field removed** from forms — portraits are hardcoded

### Fixed
- `ResidentCard.test.jsx` fully rewritten to match the new read-only component API
- `ResidentForm.test.jsx` deleted (component no longer exists)
- Dead exports (`normaliseAbilities`, `ACCENT_OPTIONS`) removed from `constants.js`
- `ExportImport` now correctly includes `hkia_catalogue` in both export and import (it was previously being silently dropped)
- Tab ID corrected from `"furniture"` to `"catalogue"` in `App.jsx`
- Orphaned `reward` tag style removed from `Display.jsx`

---

## [0.4 Patch] — Abilities Overhaul & Cleanup

### Added
- **Tiered ability system** — abilities now have multiple levels, each with its own unlock friendship level and description. All data hardcoded from game data across all 13 residents
- **Per-level toggle** — each ability level can be individually marked as unlocked in the detail modal
- **Ability pill states** — cards now show three states: ○ not started, ◑ partially unlocked (with X/Y count), ✓ fully unlocked

### Changed
- Ability input fields removed from `ResidentForm` — abilities are now static game data
- `handleAbilityToggle` updated to take `(id, abilityIndex, levelIndex)` instead of `(id, index)`
- `normaliseAbility` updated to handle the new tiered structure with backward compatibility

### Removed
- **Friendship Rewards** removed entirely from the app — the section, the form field, the data, and all references

---

## [0.3 Patch] — Gift System & Static Game Data

### Added
- **Loved Gift** — each resident now has a single top-tier loved gift (❤️❤️❤️) displayed in a pink highlighted box in the detail modal
- **Liked Gifts with heart values** — gifts are now objects with `heartValue` (1–3) and `friendshipValue` for tie-breaking, sorted highest to lowest
- **Heart display** — ❤️ emojis shown per gift, with friendship value shown for reference
- **Full gift data hardcoded** for all 13 residents from game data

### Changed
- `gifts` field changed from `string[]` to `{ name, heartValue, friendshipValue }[]`
- Liked Gifts input removed from `ResidentForm` — gifts are now static game data
- "Item Received" renamed to **"Return Gift"** throughout the app

---

## [0.2 Patch] — 13 Residents, Availability Filter & Card Polish

### Added
- **13 pre-loaded residents** — 6 immediately available, 7 encountered elsewhere, all with real game data (birthday, max level, return gift, color)
- **Location hints** — encountered elsewhere residents show a 🗺️ hint on their card indicating where to find them
- **Availability filter** — three filter buttons: 🌺 All, ⭐ Immediately Available, 🗺️ Encountered Elsewhere. Stacks with search
- **README** — friendly, player-voice readme written covering all features, tech stack, and how to add new Sanrio palettes

### Changed
- Gradient bar height increased from 6px to 18px
- Card border radius changed from 24px to 12px (slightly more boxy)
- **"Furniture" tab renamed to "Catalogue"** throughout the app. Internal tab ID kept as `"furniture"` for localStorage compatibility (later corrected to `"catalogue"`)

---

## [0.1 Patch] — Initial Build

### Added
- **React 18 + Vite** project scaffolded
- **`useLocalStorage` hook** — drop-in useState replacement that persists to localStorage, supports functional updates
- **9 Sanrio colour palettes** — Hello Kitty, My Melody, Kuromi, Cinnamoroll, Pompompurin, Keroppi, Pochacco, Badtz-Maru, Little Twin Stars
- **Dynamic page background** — full-page gradient that transitions to the active tab's character colour
- **Dynamic tab buttons** — each tab highlights in its own character's solid colour when active
- **Dynamic scrollbar** — colour matches the active tab

#### 🐱 Residents Tab
- Add, edit, and delete residents
- Sanrio character colour picker per resident
- Profile picture via image URL with 🐾 fallback
- Birthday, max friendship level, return gift fields
- Friendship level tracker with +/− buttons and colour-matched progress bar
- Companion abilities — up to 3 per resident, togglable as unlocked
- Detail modal showing liked gifts, friendship rewards, and abilities
- Search by name or gift
- Colour migration system — old colour keys (`coral`, `mint`, `lav`, `lemon`) auto-upgrade to Sanrio palette keys on load

#### 🎒 Inventory Tab
- Add, edit, and delete items with emoji, name, category, quantity
- +/− quantity controls
- Colour-coded category badges
- Search by name or category

#### 📖 Recipes Tab
- Add, edit, and delete recipes with ingredients, category, and result
- Ingredient autocomplete from inventory
- Live progress bar per recipe card showing ingredients ready
- 🔍 Check Ingredients modal with full ✅/❌ checklist and "still needed" summary
- 🎉 Confetti celebration in Hello Kitty colours when all ingredients are available

#### 🪑 Catalogue Tab
- Add, edit, and delete catalogue/furniture items
- Owned / Not Owned toggle per item with dimming for unowned
- Items grouped by category with per-group owned count
- Global owned counter in the header
- Filter by owned status
- Toffee Brown & Cream colour theme

#### 🌐 App-wide
- Export & Import — full island data as JSON (residents, inventory, recipes, catalogue)
- localStorage auto-save on every change
- Toast notifications for save and delete actions
- `uid()` helper for generating unique IDs
- Shared constants for categories, colours, and seed data
- **34 automated tests** with Vitest + React Testing Library covering helpers, rendering, interactions, and form validation

---

*Built with 🌸 by a player, for players. Not affiliated with Sanrio or Hello Kitty Island Adventure.*
