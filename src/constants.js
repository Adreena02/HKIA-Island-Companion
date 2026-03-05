export const uid = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

// ─── Shared helpers ───────────────────────────────────────────────────────────

/** Returns a safe colour key, falling back to hellokitty if the key is unknown */
export const getSafeColor = (color) =>
  ACCENT_GRADIENTS?.[color] ? color : "hellokitty";

/** Normalises a single ability to { name, levels: [{ level, unlocksAt, description, unlocked }] } */
export const normaliseAbility = (a) => {
  if (typeof a === "string") return { name: a, levels: [{ level: 1, unlocksAt: 1, description: "", unlocked: false }] };
  if (!a.levels) return { ...a, levels: [{ level: 1, unlocksAt: 1, description: a.description ?? "", unlocked: a.unlocked ?? false }] };
  return a;
};


/** Migrates old colour keys (coral/mint/lav/lemon) to new Sanrio keys */
export const migrateResident = (r) => {
  const COLOR_MIGRATION = {
    coral: "hellokitty",
    mint:  "cinnamoroll",
    lav:   "mymelody",
    lemon: "pompompurin",
  };
  return { ...r, color: COLOR_MIGRATION[r.color] ?? r.color };
};


// Card accent bar gradients (horizontal, top bar of each card)
export const ACCENT_GRADIENTS = {
  home:        "linear-gradient(90deg, #f97316, #fdba74)",
  hellokitty:  "linear-gradient(90deg, #e8003c, #ff6b8a)",
  mymelody:    "linear-gradient(90deg, #f5a0c8, #f9c8dd)",
  kuromi:      "linear-gradient(90deg, #7c3aed, #c084fc)",
  cinnamoroll: "linear-gradient(90deg, #60b8f0, #a8d8f8)",
  pompompurin: "linear-gradient(90deg, #f5c842, #f9e4a0)",
  keroppi:     "linear-gradient(90deg, #22c55e, #86efac)",
  pochacco:    "linear-gradient(90deg, #93c5fd, #bfdbfe)",
  badtzmaru:   "linear-gradient(90deg, #1c1917, #854d0e)",
  littletwin:  "linear-gradient(90deg, #818cf8, #f472b6)",
  chococat:    "linear-gradient(90deg, #3d1f0a, #8b5e3c)",
  retsuko:     "linear-gradient(90deg, #e8003c, #ff6b6b)",
  pekkle:      "linear-gradient(90deg, #f5c842, #f9e4a0)",
  hangyodon:   "linear-gradient(90deg, #00a896, #7dd4cc)",
  furniture:   "linear-gradient(90deg, #c8956c, #e8c4a0)",
};

// Full-page background gradients (character color → white, top to bottom)
export const ACCENT_BG_GRADIENTS = {
  home:        "linear-gradient(180deg, #fed7aa 0%, #fff7ed 50%, #ffffff 100%)",
  hellokitty:  "linear-gradient(180deg, #ffd6df 0%, #fff0f3 50%, #ffffff 100%)",
  mymelody:    "linear-gradient(180deg, #fce4f0 0%, #fdf0f7 50%, #ffffff 100%)",
  kuromi:      "linear-gradient(180deg, #ede9fe 0%, #f5f3ff 50%, #ffffff 100%)",
  cinnamoroll: "linear-gradient(180deg, #93c5fd 0%, #dbeafe 50%, #eff6ff 100%)",
  pompompurin: "linear-gradient(180deg, #fef9c3 0%, #fefce8 50%, #ffffff 100%)",
  keroppi:     "linear-gradient(180deg, #dcfce7 0%, #f0fdf4 50%, #ffffff 100%)",
  pochacco:    "linear-gradient(180deg, #93c5fd 0%, #dbeafe 50%, #eff6ff 100%)",
  badtzmaru:   "linear-gradient(180deg, #fef08a 0%, #fefce8 50%, #ffffff 100%)",
  littletwin:  "linear-gradient(180deg, #e0e7ff 0%, #fdf4ff 50%, #ffffff 100%)",
  chococat:    "linear-gradient(180deg, #e8d5c4 0%, #f5ede4 50%, #ffffff 100%)",
  retsuko:     "linear-gradient(180deg, #ffd6d6 0%, #fff0f0 50%, #ffffff 100%)",
  pekkle:      "linear-gradient(180deg, #fdf08a 0%, #fef9c3 50%, #fefdf0 100%)",
  hangyodon:   "linear-gradient(180deg, #9de6df 0%, #c8f4f0 50%, #edfaf8 100%)",
  furniture:   "linear-gradient(180deg, #f5e6d8 0%, #fdf6f0 50%, #ffffff 100%)",
};

// Solid accent colours (tab buttons, scrollbar, header title)
export const ACCENT_SOLID = {
  home:        "#f97316",
  hellokitty:  "#e8003c",
  mymelody:    "#f472b6",
  kuromi:      "#7c3aed",
  cinnamoroll: "#60b8f0",
  pompompurin: "#f5c842",
  keroppi:     "#22c55e",
  pochacco:    "#93c5fd",
  badtzmaru:   "#1c1917",
  littletwin:  "#818cf8",
  chococat:    "#3d1f0a",
  retsuko:     "#e8003c",
  pekkle:      "#f5c842",
  hangyodon:   "#00a896",
  furniture:   "#c8956c",
};

export const ITEM_CATEGORIES = [
  "Ingredient", "Material", "Food", "Gift", "Tool", "Decor", "Currency", "Weather", "Other",
];

export const INVENTORY_CAT_COLORS = {
  Ingredient: "#fde8e8",
  Material:   "#e8f4fd",
  Food:       "#fef9c3",
  Gift:       "#fce4f0",
  Tool:       "#e8fde8",
  Decor:      "#ede9fe",
  Currency:   "#fef3c7",
  Weather:    "#e0f2fe",
  Other:      "#f2eee8",
};

export const RECIPE_CATEGORIES = [
  "Cooking", "Crafting", "Farming", "Gifting", "Other",
];

export const RECIPE_CAT_COLORS = {
  Cooking:  "#fef9c3",
  Crafting: "#e8f4fd",
  Farming:  "#dcfce7",
  Gifting:  "#fce4f0",
  Other:    "#f2eee8",
};


export const TAG_EMOJI = {
  "Pizza":         "🍕",
  "Tropical":      "🌺",
  "Joke":          "🃏",
  "Chocolate":     "🍫",
  "Device":        "📱",
  "Book":          "📖",
  "Spice":         "🧂",
  "Cozy Beverage": "☕",
  "Cloth":         "🧵",
  "Aquatic":       "🌊",
  "Fish":          "🐟",
  "Bakery":        "🥐",
  "Fruit":         "🍓",
  "Fancy":         "👑",
  "Critters":      "🐛",
  "Swampy":        "🐸",
  "Wood":          "🪵",
  "Spooky":        "🕷️",
  "Fall":          "🍂",
  "Soda":          "🥤",
  "Sweet":         "🍬",
  "Pink":          "🌸",
  "Dreamy":        "✨",
  "Rocky":         "🪨",
  "Relax":         "🛁",
  "Music":         "🎵",
  "Healthy":       "🥗",
  "Veggie":        "🥦",
  "Sports":        "⚽",
  "Dessert":       "🍨",
  "Dairy":         "🥛",
  "Fire":          "🔥",
  "Metal":         "⚙️",
};

export const SEED_RESIDENTS = [
  {
    id: uid(), name: "Hello Kitty", birthday: "November 1st", likedTags: ["Bakery", "Fruit", "Fancy"], imageUrl: "https://hellokittyislandadventure.wiki.gg/images/Icon_square_Hello_Kitty.png?a79c1d", color: "hellokitty",
    maxLevel: "25", currentLevel: 0, firstGift: "Tofu",
    lovedGift: { name: "Red Bow Apple Pie", heartValue: 3, friendshipValue: 10 },
    gifts: [
      { name: "Beignets with Pineapple Dip", heartValue: 2, friendshipValue: 9 },
      { name: "Candied Banana Coffee",       heartValue: 2, friendshipValue: 8 },
      { name: "Strawberry Shortcake",        heartValue: 2, friendshipValue: 7 },
      { name: "Mama's Apple Pie",            heartValue: 2, friendshipValue: 6 },
      { name: "Strawberry",                  heartValue: 1, friendshipValue: 3 },
      { name: "Pineapple",                   heartValue: 1, friendshipValue: 2 },
    ],
    abilities: [
      {
        name: "Sous Chef",
        levels: [
          { level: 1, unlocksAt: 2,  description: "25% Chance to create an additional food item when you are cooking!", unlocked: false },
          { level: 2, unlocksAt: 5,  description: "50% Chance to create an additional food item when you are cooking!", unlocked: false },
          { level: 3, unlocksAt: 13, description: "75% Chance to create an additional food item when you are cooking!", unlocked: false },
          { level: 4, unlocksAt: 21, description: "100% Chance to create an additional food item when you are cooking!", unlocked: false },
        ],
      },
      {
        name: "Everyone's Friend",
        levels: [
          { level: 1, unlocksAt: 12, description: "Take her with you when gifting the other Island Residents to increase friendship 10% faster!", unlocked: false },
        ],
      },
    ],
  },
  {
    id: uid(), name: "My Melody", birthday: "January 18th", likedTags: ["Sweet", "Pink", "Dreamy"], imageUrl: "https://hellokittyislandadventure.wiki.gg/images/Icon_square_My_Melody.png?b754c9", color: "mymelody",
    maxLevel: "20", currentLevel: 0, firstGift: "Flour",
    lovedGift: { name: "Pink Clouds Ice Cream", heartValue: 3, friendshipValue: 9 },
    gifts: [
      { name: "Pink Cloud",                heartValue: 2, friendshipValue: 7 },
      { name: "Strawberry Almond Galette", heartValue: 2, friendshipValue: 7 },
      { name: "Almond Pound Cake",         heartValue: 2, friendshipValue: 7 },
      { name: "Pink Latte",                heartValue: 2, friendshipValue: 6 },
      { name: "Strawberry Shortcake",      heartValue: 1, friendshipValue: 3 },
      { name: "Strawberry",                heartValue: 1, friendshipValue: 2 },
    ],
    abilities: [
      {
        name: "Big Smile",
        levels: [
          { level: 1, unlocksAt: 4,  description: "25% Chance to increase your chances of receiving one extra return gift back!", unlocked: false },
          { level: 2, unlocksAt: 7,  description: "50% Chance to increase your chances of receiving one extra return gift back!", unlocked: false },
          { level: 3, unlocksAt: 12, description: "75% Chance to increase your chances of receiving one extra return gift back!", unlocked: false },
          { level: 4, unlocksAt: 17, description: "100% Chance to increase your chances of receiving one extra return gift back!", unlocked: false },
        ],
      },
      {
        name: "Handy Helper",
        levels: [
          { level: 1, unlocksAt: 9, description: "Take her with you when repairing Visitor Cabins, and the cabins will cost 1 less Strawberry Crate to repair!", unlocked: false },
        ],
      },
    ],
  },
  {
    id: uid(), name: "Chococat", birthday: "May 10th", likedTags: ["Chocolate", "Device", "Book"], imageUrl: "https://hellokittyislandadventure.wiki.gg/images/Icon_square_Chococat.png?16c6f1", color: "chococat",
    maxLevel: "15", currentLevel: 0, firstGift: "Gizmo",
    lovedGift: { name: "Interactive History of Chocolate", heartValue: 3, friendshipValue: 10 },
    gifts: [
      { name: "Ancient Inventions",      heartValue: 2, friendshipValue: 7 },
      { name: "Glitchy Book",            heartValue: 1, friendshipValue: 4 },
      { name: "Meditations on Resilience", heartValue: 1, friendshipValue: 4 },
      { name: "Mocha",                   heartValue: 1, friendshipValue: 4 },
      { name: "Hot Cocoa",               heartValue: 1, friendshipValue: 4 },
      { name: "Boulder Bits Ice Cream",  heartValue: 1, friendshipValue: 4 },
      { name: "Volcano Cake",            heartValue: 1, friendshipValue: 4 },
      { name: "Blank Book",              heartValue: 1, friendshipValue: 3 },
    ],
    abilities: [
      {
        name: "Master Crafter",
        levels: [
          { level: 1, unlocksAt: 5, description: "Take him with you when you are crafting items, and he will make it so you'll have a chance of crafting an additional item 30% of the time!", unlocked: false },
        ],
      },
      {
        name: "Tour Guide",
        levels: [
          { level: 1, unlocksAt: 10, description: "Take him with you when you are completing puzzle rooms, and he will give you hints!", unlocked: false },
        ],
      },
    ],
  },
  {
    id: uid(), name: "Tuxedosam", birthday: "May 12th", likedTags: ["Cloth", "Tropical", "Fancy"], imageUrl: "https://hellokittyislandadventure.wiki.gg/images/Icon_square_Tuxedosam.png?3d8aca", color: "cinnamoroll",
    maxLevel: "15", currentLevel: 0, firstGift: "Thread",
    lovedGift: { name: "Designer Island Doll", heartValue: 3, friendshipValue: 10 },
    gifts: [
      { name: "Beignets with Pineapple Dip",  heartValue: 2, friendshipValue: 8 },
      { name: "Tropical Material",            heartValue: 2, friendshipValue: 7 },
      { name: "Tropical Gift",               heartValue: 2, friendshipValue: 6 },
      { name: "Candied Banana Coffee",        heartValue: 1, friendshipValue: 6 },
      { name: "Tropical Rare-Tagged Fish",    heartValue: 1, friendshipValue: 4 },
      { name: "Dragondarter",                heartValue: 1, friendshipValue: 4 },
      { name: "Pineapple Pizza",             heartValue: 1, friendshipValue: 4 },
      { name: "Pineapple Stack Cake",        heartValue: 1, friendshipValue: 3 },
      { name: "Fabric",                      heartValue: 1, friendshipValue: 3 },
      { name: "Coconut",                     heartValue: 1, friendshipValue: 2 },
    ],
    abilities: [
      {
        name: "Negotiator",
        levels: [
          { level: 1, unlocksAt: 13, description: "Take him with you when you are shopping, there will be a 25% chance to receive an extra item when trading in shops! This ability does work at event stands!", unlocked: false },
        ],
      },
      {
        name: "Fashionista",
        levels: [
          { level: 1, unlocksAt: 7,  description: "Take him with you for a 20% increase to outfit powers!", unlocked: false },
          { level: 2, unlocksAt: 9,  description: "Take him with you for a 30% increase to outfit powers!", unlocked: false },
          { level: 3, unlocksAt: 14, description: "Take him with you for a 50% increase to outfit powers!", unlocked: false },
        ],
      },
    ],
  },
  {
    id: uid(), name: "Badtz-Maru", birthday: "April 1st", likedTags: ["Pizza", "Tropical", "Joke"], imageUrl: "https://hellokittyislandadventure.wiki.gg/images/Icon_square_Badtzmaru.png?93267d", color: "badtzmaru",
    maxLevel: "20", currentLevel: 0, firstGift: "Paper",
    lovedGift: { name: "Ultimate Joke Pizza", heartValue: 3, friendshipValue: 10 },
    gifts: [
      { name: "Pineapple Pizza",          heartValue: 2, friendshipValue: 7 },
      { name: "Spinip Alfredo Pizza",     heartValue: 1, friendshipValue: 6 },
      { name: "Everything Pizza",         heartValue: 1, friendshipValue: 6 },
      { name: "Surprising Soda",          heartValue: 1, friendshipValue: 5 },
      { name: "Fruit Pizza/Dessert Pizza",heartValue: 1, friendshipValue: 4 },
      { name: "Tropical Rare Tagged Fish",heartValue: 1, friendshipValue: 4 },
      { name: "Pineapple Stack Cake",     heartValue: 1, friendshipValue: 3 },
      { name: "Water Balloon",            heartValue: 1, friendshipValue: 3 },
      { name: "Coconut",                  heartValue: 1, friendshipValue: 2 },
    ],
    abilities: [
      {
        name: "Gamer",
        levels: [
          { level: 1, unlocksAt: 9, description: "Take him with you to allow one free Ticket use per day!", unlocked: false },
        ],
      },
      {
        name: "Fish Whisperer",
        levels: [
          { level: 1, unlocksAt: 5,  description: "Take him with you to increase by 25% the rate at which fish bite the hook!", unlocked: false },
          { level: 2, unlocksAt: 7,  description: "Take him with you to increase by 50% the rate at which fish bite the hook!", unlocked: false },
          { level: 3, unlocksAt: 12, description: "Take him with you to increase by 75% the rate at which fish bite the hook!", unlocked: false },
          { level: 4, unlocksAt: 17, description: "Take him with you to increase by 100% the rate at which fish bite the hook!", unlocked: false },
        ],
      },
    ],
  },
  {
    id: uid(), name: "Pochacco", birthday: "February 29th", likedTags: ["Healthy", "Veggie", "Sports"], imageUrl: "https://hellokittyislandadventure.wiki.gg/images/Icon_square_Pochacco.png?3e1245", color: "pochacco",
    maxLevel: "20", currentLevel: 0, firstGift: "Strawberry",
    lovedGift: { name: "Pochacco Energy Pop", heartValue: 3, friendshipValue: 10 },
    gifts: [
      { name: "Everything Pizza",   heartValue: 2, friendshipValue: 7 },
      { name: "Veggie Crepe",       heartValue: 2, friendshipValue: 7 },
      { name: "Tofu Bread",         heartValue: 1, friendshipValue: 3 },
      { name: "Veggie Bread",       heartValue: 1, friendshipValue: 3 },
      { name: "Tofu Pizza",         heartValue: 1, friendshipValue: 3 },
      { name: "Veggie Pizza",       heartValue: 1, friendshipValue: 3 },
      { name: "Tofu Pudding",       heartValue: 1, friendshipValue: 3 },
      { name: "Purple Pudding",     heartValue: 1, friendshipValue: 3 },
      { name: "Purple Latte",       heartValue: 1, friendshipValue: 3 },
      { name: "Tofu",               heartValue: 1, friendshipValue: 2 },
    ],
    abilities: [
      {
        name: "Speed Walker",
        levels: [
          { level: 1, unlocksAt: 8,  description: "Take him with you in order to have a 10% faster walking speed!", unlocked: false },
          { level: 2, unlocksAt: 13, description: "Take him with you in order to have a 25% faster walking speed!", unlocked: false },
          { level: 3, unlocksAt: 18, description: "Take him with you in order to have a 50% faster walking speed!", unlocked: false },
        ],
      },
      {
        name: "Relay",
        levels: [
          { level: 1, unlocksAt: 14, description: "Take him with you while doing island challenges, and he'll help you complete it!", unlocked: false },
        ],
      },
    ],
  },
  {
    id: uid(), name: "Kuromi", birthday: "October 31st", likedTags: ["Spooky", "Fall", "Soda"], imageUrl: "https://hellokittyislandadventure.wiki.gg/images/Icon_square_Kuromi.png?792922", color: "kuromi",
    maxLevel: "20", currentLevel: 0, firstGift: "Light Stone",
    lovedGift: { name: "Pumpkin Spice Soda", heartValue: 3, friendshipValue: 10 },
    gifts: [
      { name: "Spicy Pumpkin Latte",    heartValue: 2, friendshipValue: 8 },
      { name: "Jack-O-Lantern",         heartValue: 2, friendshipValue: 7 },
      { name: "Pochacco Energy Pop",    heartValue: 1, friendshipValue: 6 },
      { name: "Sweet Soda/Joke Soda",   heartValue: 1, friendshipValue: 4 },
      { name: "Pumpkin Pudding",        heartValue: 1, friendshipValue: 3 },
      { name: "Pumpkin Pie",            heartValue: 1, friendshipValue: 3 },
      { name: "Pumpkin",                heartValue: 1, friendshipValue: 2 },
    ],
    abilities: [
      {
        name: "Super Balloon",
        levels: [
          { level: 1, unlocksAt: 16, description: "Take her with you for a small height boost when using balloons!", unlocked: false },
        ],
      },
      {
        name: "Witchcraft",
        levels: [
          { level: 1, unlocksAt: 13, description: "Take her with you in order to have potion's special powers last 50% longer!", unlocked: false },
          { level: 2, unlocksAt: 18, description: "Take her with you in order to have potion's special powers last 100% longer!", unlocked: false },
        ],
      },
    ],
    note: "Encountered elsewhere — found in Spooky Swamp",
  },
  {
    id: uid(), name: "Cinnamoroll", birthday: "March 6th", likedTags: ["Chocolate", "Spice", "Cozy Beverage"], imageUrl: "https://hellokittyislandadventure.wiki.gg/images/Icon_square_Cinnamoroll.png?773c3e", color: "cinnamoroll",
    maxLevel: "20", currentLevel: 0, firstGift: "Candy Cloud",
    lovedGift: { name: "Chocolate Chai", heartValue: 3, friendshipValue: 10 },
    gifts: [
      { name: "Spicy Pumpkin Latte",   heartValue: 2, friendshipValue: 9 },
      { name: "Espresso",              heartValue: 2, friendshipValue: 8 },
      { name: "Molten Frappe",         heartValue: 2, friendshipValue: 8 },
      { name: "Chai",                  heartValue: 2, friendshipValue: 7 },
      { name: "Mocha",                 heartValue: 2, friendshipValue: 7 },
      { name: "Pink Latte",            heartValue: 1, friendshipValue: 6 },
      { name: "Candied Banana Coffee", heartValue: 1, friendshipValue: 6 },
      { name: "Cinnamon Bread",        heartValue: 1, friendshipValue: 4 },
      { name: "Spicy Pizza",           heartValue: 1, friendshipValue: 4 },
    ],
    abilities: [
      {
        name: "Soar",
        levels: [
          { level: 1, unlocksAt: 18, description: "Take him with you in order to float 50% farther with balloons!", unlocked: false },
          { level: 2, unlocksAt: 19, description: "Take him with you in order to float 100% farther with balloons!", unlocked: false },
        ],
      },
    ],
    note: "Encountered elsewhere — roams around Friendship Island",
  },
  {
    id: uid(), name: "Keroppi", birthday: "July 10th", likedTags: ["Critters", "Swampy", "Wood"], imageUrl: "https://hellokittyislandadventure.wiki.gg/images/Icon_square_Keroppi.png?7a1d24", color: "keroppi",
    maxLevel: "15", currentLevel: 0, firstGift: "Sugarkelp",
    lovedGift: { name: "Critter Totem", heartValue: 3, friendshipValue: 7 },
    gifts: [
      { name: "Swampy Lamb Plush",        heartValue: 2, friendshipValue: 7 },
      { name: "Bush Friend",              heartValue: 2, friendshipValue: 5 },
      { name: "Swampy-Tagged Critters",   heartValue: 2, friendshipValue: 4 },
      { name: "Swampy Rare-Tagged Fish",  heartValue: 1, friendshipValue: 4 },
      { name: "Lotus Blossom",            heartValue: 1, friendshipValue: 2 },
    ],
    abilities: [
      {
        name: "Critter Friend",
        levels: [
          { level: 1, unlocksAt: 9, description: "Take him with you while you are catching critters, there's a 25% chance that critters won't become startled or run away!", unlocked: false },
        ],
      },
      {
        name: "Critter Calmer",
        levels: [
          { level: 1, unlocksAt: 6,  description: "Take him with you if you are catching critters, and he will make the critters 10% slower, so you can catch them easier!", unlocked: false },
          { level: 2, unlocksAt: 11, description: "Take him with you if you are catching critters, and he will make the critters 10% slower, so you can catch them easier!", unlocked: false },
          { level: 3, unlocksAt: 13, description: "Take him with you if you are catching critters, and he will make the critters 50% slower, so you can catch them easier!", unlocked: false },
        ],
      },
    ],
    note: "Encountered elsewhere — found in Spooky Swamp",
  },
  {
    id: uid(), name: "Pekkle", birthday: "July 27th", likedTags: ["Rocky", "Relax", "Music"], imageUrl: "https://hellokittyislandadventure.wiki.gg/images/Icon_square_Pekkle.png?d123e5", color: "pekkle",
    maxLevel: "15", currentLevel: 0, firstGift: "Feather",
    lovedGift: { name: "Mountain Soundtrack", heartValue: 3, friendshipValue: 10 },
    gifts: [
      { name: "Rocky Music Box",   heartValue: 2, friendshipValue: 7 },
      { name: "Stacked Stones",    heartValue: 2, friendshipValue: 7 },
      { name: "Hot Cocoa",         heartValue: 1, friendshipValue: 5 },
      { name: "Cavern Clamfish",   heartValue: 1, friendshipValue: 4 },
      { name: "Twinklebug",        heartValue: 1, friendshipValue: 4 },
      { name: "Calming Crystal",   heartValue: 1, friendshipValue: 3 },
    ],
    abilities: [
      {
        name: "Dance All Night",
        levels: [
          { level: 1, unlocksAt: 13, description: "He will allow you to change the time of day when you talk to him while having him as a companion!", unlocked: false },
        ],
      },
      {
        name: "Speed Climber",
        levels: [
          { level: 1, unlocksAt: 7,  description: "Take him with you in order to have a 50% faster climbing speed!", unlocked: false },
          { level: 2, unlocksAt: 11, description: "Take him with you in order to have a 100% faster climbing speed!", unlocked: false },
        ],
      },
    ],
    note: "Encountered elsewhere — found in Gemstone Mountain",
  },
  {
    id: uid(), name: "Pompompurin", birthday: "April 16th", likedTags: ["Dessert", "Dairy", "Relax"], imageUrl: "https://hellokittyislandadventure.wiki.gg/images/Icon_square_Pompompurin.png?2e9240", color: "pompompurin",
    maxLevel: "20", currentLevel: 0, firstGift: "Banana",
    lovedGift: { name: "Mama's Pudding", heartValue: 3, friendshipValue: 10 },
    gifts: [
      { name: "Pudding",                              heartValue: 2, friendshipValue: 7 },
      { name: "Cheese Ice Cream",                     heartValue: 2, friendshipValue: 7 },
      { name: "Candied Banana Coffee",                heartValue: 1, friendshipValue: 6 },
      { name: "Dessert Pizza",                        heartValue: 1, friendshipValue: 4 },
      { name: "Purple Pudding/Strawberry Ice Cream",  heartValue: 1, friendshipValue: 4 },
      { name: "Calming Crystal",                      heartValue: 1, friendshipValue: 3 },
    ],
    abilities: [
      {
        name: "Pudding Pants",
        levels: [
          { level: 1, unlocksAt: 5,  description: "Take him with you in order to jump 25% higher!", unlocked: false },
          { level: 2, unlocksAt: 9,  description: "Take him with you in order to jump 50% higher!", unlocked: false },
          { level: 3, unlocksAt: 16, description: "Take him with you in order to jump 75% higher!", unlocked: false },
          { level: 4, unlocksAt: 18, description: "Take him with you in order to jump 100% higher!", unlocked: false },
        ],
      },
      {
        name: "Slow & Steady",
        levels: [
          { level: 1, unlocksAt: 12, description: "Take him with you while doing island challenges, you'll be given an additional 5 seconds to complete them!", unlocked: false },
        ],
      },
    ],
    note: "Encountered elsewhere — found in Gemstone Mountain",
  },
  {
    id: uid(), name: "Retsuko", birthday: "November 6th", likedTags: ["Fire", "Metal", "Music"], imageUrl: "https://hellokittyislandadventure.wiki.gg/images/Icon_square_Retsuko.png?5a75c5", color: "retsuko",
    maxLevel: "20", currentLevel: 0, firstGift: "Dough",
    lovedGift: { name: "Volcanic Guitar", heartValue: 3, friendshipValue: 10 },
    gifts: [
      { name: "Sounds of Steel",           heartValue: 2, friendshipValue: 8 },
      { name: "Volcano Soundtrack",        heartValue: 2, friendshipValue: 7 },
      { name: "Microphone",               heartValue: 2, friendshipValue: 7 },
      { name: "Regional Music Boxes",      heartValue: 1, friendshipValue: 5 },
      { name: "Pineapple Lava Soda",       heartValue: 1, friendshipValue: 4 },
      { name: "Toasted Marshmallow Cloud", heartValue: 1, friendshipValue: 4 },
      { name: "Ingot",                     heartValue: 1, friendshipValue: 3 },
      { name: "Toasty Pizza",              heartValue: 1, friendshipValue: 2 },
      { name: "Toasted Almond",            heartValue: 1, friendshipValue: 1 },
    ],
    abilities: [
      {
        name: "Hot Stuff",
        levels: [
          { level: 1, unlocksAt: 19, description: "Take her with you to swim in molten rock!", unlocked: false },
        ],
      },
      {
        name: "Adrenaline",
        levels: [
          { level: 1, unlocksAt: 16, description: "Take her with you for a 20% increase of your stamina!", unlocked: false },
          { level: 2, unlocksAt: 18, description: "Take her with you for a 50% increase of your stamina!", unlocked: false },
        ],
      },
    ],
    note: "Encountered elsewhere — found in Mount Hothead",
  },
  {
    id: uid(), name: "Hangyodon", birthday: "March 14th", likedTags: ["Cloth", "Aquatic", "Fish"], imageUrl: "https://hellokittyislandadventure.wiki.gg/images/Icon_square_Hangyodon.png?7a8be7", color: "hangyodon",
    maxLevel: "15", currentLevel: 0, firstGift: "Candlenut",
    lovedGift: { name: "Mermaid Figure", heartValue: 3, friendshipValue: 8 },
    gifts: [
      { name: "Aquatic Material",        heartValue: 2, friendshipValue: 6 },
      { name: "Aquatic Rare-Tagged Fish", heartValue: 2, friendshipValue: 5 },
      { name: "Fabric",                  heartValue: 1, friendshipValue: 3 },
      { name: "Starfish",                heartValue: 1, friendshipValue: 2 },
    ],
    abilities: [
      {
        name: "Fish Friend",
        levels: [
          { level: 1, unlocksAt: 10, description: "Take him with you while fishing, he will increase the chances of a rare fish appearing by 25%!", unlocked: false },
        ],
      },
      {
        name: "Speed Swimmer",
        levels: [
          { level: 1, unlocksAt: 5,  description: "Take him with you in order to have a 25% increase to your swimming and diving speed!", unlocked: false },
          { level: 2, unlocksAt: 9,  description: "Take him with you in order to have a 50% increase to your swimming and diving speed!", unlocked: false },
          { level: 3, unlocksAt: 13, description: "Take him with you in order to have a 100% increase to your swimming and diving speed!", unlocked: false },
        ],
      },
    ],
    note: "Encountered elsewhere — found in Rainbow Reef (needs Snorkel!)",
  },
];

export const CATALOGUE_CATEGORIES = [
  "Seating", "Tables", "Storage", "Lighting", "Decor", "Rugs", "Beds", "Other",
];

export const CATALOGUE_OBTAIN = [
  "Crafting", "Shop", "Event", "Gift", "Achievement", "Other",
];

export const SEED_CATALOGUE = [
  { id: uid(), name: "Ribbon Armchair", category: "Seating",  obtain: "Crafting", imageUrl: "", owned: false },
  { id: uid(), name: "Star Lamp",       category: "Lighting", obtain: "Shop",     imageUrl: "", owned: false },
  { id: uid(), name: "Floral Rug",      category: "Rugs",     obtain: "Event",    imageUrl: "", owned: true  },
];

export const SEED_INVENTORY = [
  { id: uid(), emoji: "🍎", name: "Apple",      category: "Ingredient", qty: 1 },
  { id: uid(), emoji: "🍓", name: "Strawberry", category: "Ingredient", qty: 1 },
  { id: uid(), emoji: "🪵", name: "Wood Plank", category: "Material",   qty: 1 },
];

export const SEED_RECIPES = [
  {
    id: uid(), emoji: "🍰", name: "Example Cake", category: "Cooking",
    result: "1x Example Cake",
    ingredients: [{ name: "Ingredient A", qty: 2 }, { name: "Ingredient B", qty: 1 }],
  },
];