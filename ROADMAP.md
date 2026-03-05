# 🗺️ HKIA Island Companion — Roadmap

A living document outlining planned improvements, features, and long-term goals. Ordered roughly by priority within each section, but not a strict sprint plan — things shift as the game updates and new ideas surface.

---

## 🛠️ Stability & Quality

### 1. Migration Fix
Patch `migrateResident` in `constants.js` to silently fix the ability pill layout inconsistency for existing users — without wiping friendship levels, gift logs, or any other progress data. The fix should be transparent: users just open the app and everything looks correct.

> **Do this before the test suite** — tests should cover correct final behaviour, not a known-broken intermediate state.

### 2. Test Suite
Expand coverage to match the current state of the app. Priority areas:
- All 22 residents including all 4 unlock groups (Immediately Available, Encountered Elsewhere, Quest Unlocked, DLC)
- DLC badge rendering — gold 💎 pill with correct pack name
- Quest badge rendering — purple 🔮 pill
- All new tags added to `TAG_EMOJI` (17 added in v2.2)
- Filter logic across all 5 filter buttons in the Residents tab
- Gift tracking reset logic including DST edge cases
- Migration behaviour — specifically that `migrateResident` patches correctly without data loss

### 3. Accessibility Audit
Review remaining gaps now that the UI is stable post-dashboard and new residents work. Already covered: `role="dialog"`, `aria-modal`, `role="progressbar"`, `aria-label` on buttons, `aria-hidden` on decorative emoji. Audit for anything missed during the dashboard additions and new resident cards.

### 4. Night Mode
Implement a theme context/provider at the app root that passes a dark palette down to all components. Key challenges to plan for:
- The animated pastel gradient background needs its own dark variant
- Character colour tints on resident cards need to work against a dark surface
- The scrolling ticker banner needs theme-aware colours
- All tab filter buttons, modals, and card interiors need dark-surface equivalents

---

## 🌐 Global DLC Toggle

Move the DLC toggle from a per-tab concern to a **global app setting** — a settings panel in the header or a dedicated settings page with per-DLC checkboxes:

- ☑️ City Town (Usahana)
- ☑️ Wheatflour Wonderland (Cogimyun)

Apply the setting consistently everywhere the resident roster or DLC content appears:

| Surface | Behaviour when DLC unchecked |
|---|---|
| Residents tab | Already implemented — keep, but read from global setting |
| Dashboard → Daily Gifts Summary | Exclude DLC residents from the widget |
| Dashboard → Friendship Milestones | Exclude DLC residents from the picker |
| Dashboard → Daily Checklist | Exclude DLC residents from gift tasks |
| Recipes tab | Hide DLC-specific recipes |
| Catalogue tab | Exclude DLC furniture from counts and listings |

> **Built to extend** — adding a future DLC means adding one checkbox and one data flag, not updating logic across multiple files.

---

## 📦 Content & Data

### Catalogue Data
Flesh out the Catalogue tab with craftable and purchasable furniture. Even a solid starter set makes the tab feel complete. Add these fields now while building the dataset so future features don't require a second pass:

- `source`: `base_game` | `dlc_city_town` | `dlc_wheatflour_wonderland`
- `coming_soon`: boolean flag for Apple Arcade DLC items not yet released on other platforms
- `location`: where the item is found or purchased (feeds the future Island Map)
- Group display: Craftable / Purchasable / Event Reward

### More Inventory & Material Data
Expand beyond the 52 Friendship Island materials. Add ingredients, foods, and commonly gifted items so the **Giftable from Inventory** feature works out of the box for new users who haven't manually entered anything yet.

### Recipe → Catalogue Link
Once catalogue data exists, add a direct link from a recipe's result to its catalogue entry. Small lift, big payoff — ties two tabs together meaningfully and makes the app feel cohesive.

### Events Data Improvements
Flesh out the 19 known recurring events with better date approximations as Sunblink's scheduling patterns become clearer across years. Add event-specific tips and reward notes where known.

---

## ✨ Features

### Onboarding / Empty States
New users land on a dashboard full of empty widgets with no guidance. Add contextual empty state messages explaining what each widget does and how to get started — e.g. *"Head to the Residents tab to start tracking gifts"* — or a brief welcome flow on first load.

### Crafting Queue
A wishlist of recipes you're actively working toward. Shows **aggregate missing ingredients across all queued recipes at once**, so you know exactly what to farm in a single view. Complements the existing live ingredient progress bars on individual recipe cards and is the first feature that spans multiple tabs meaningfully.

### Island / World Map
Clickable zones that surface which materials, residents, and catalogue items are associated with each area. The data backbone already exists — materials have `location` fields and residents have `note` fields. A natural extension once catalogue location data is fleshed out.

### Gifting Planner
*"I want to reach friendship level X with resident Y — what gifts should I prioritise?"* Cross-references your inventory with friendship math and liked tags to suggest the most efficient gifting path to a target level.

### Notification / Reminder System
In-app banners or badges when a seasonal event is about to start or end — especially useful given how time-sensitive Flash and Calendar events are. Even a simple "⚠️ Event ending in 2 days" banner on the Home tab would add real value.

---

## 🗄️ Post-Supabase

These are longer-horizon goals that depend on a backend. Worth planning the schema now even if migration is months away — it makes the transition much smoother and the Export/Import JSON feature already functions as a backup/restore fallback.

### Supabase Migration
Move from localStorage to a proper backend. The existing `constants_materials.js` and similar files become seed scripts for database tables. localStorage keys map cleanly to tables already:

| localStorage key | Table |
|---|---|
| `hkia_residents` | `residents` |
| `hkia_inventory` | `inventory` |
| `hkia_recipes` | `recipes` |
| `hkia_catalogue` | `catalogue` |

### User Accounts & Cloud Sync
Supabase Auth with Row Level Security so users can only see and edit their own island data. Export/Import JSON remains as an offline fallback.

### User-Submitted Data Contributions
Once accounts exist, let users flag incorrect game data or suggest additions. Especially valuable for keeping up with game updates and new DLC content without requiring manual data entry for every patch.

---

## 📝 Notes

- This roadmap is a living document — update it as priorities shift and items are completed
- Move completed items to `CHANGELOG.md` rather than deleting them here
- Items within each section are roughly priority-ordered but not fixed — use judgment based on what's currently broken vs. what's most impactful for players

---

*Built with 🌸 by a player, for players. Not affiliated with Sanrio or Hello Kitty Island Adventure.*