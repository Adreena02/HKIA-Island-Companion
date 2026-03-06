import { describe, it, expect } from "vitest";
import { SEED_MATERIALS } from "../constants_materials";

const VALID_CATEGORIES = ["Ingredient", "Material", "Currency", "Weather"];
const VALID_LOCATIONS = [
  "Seaside Resort", "Spooky Swamp", "Rainbow Reef", "Gemstone Mountain",
  "Mount Hothead", "Merry Meadow", "Icy Peak", "Cloud Island", "The Moon",
  "Gift Return", "Various", "All Regions",
];

describe("SEED_MATERIALS structure", () => {
  it("exports a non-empty array", () => {
    expect(Array.isArray(SEED_MATERIALS)).toBe(true);
    expect(SEED_MATERIALS.length).toBeGreaterThan(0);
  });

  it("every item has an id", () => {
    SEED_MATERIALS.forEach((m) => {
      expect(m.id, `${m.name} missing id`).toBeTruthy();
    });
  });

  it("every item has a non-empty name", () => {
    SEED_MATERIALS.forEach((m) => {
      expect(typeof m.name).toBe("string");
      expect(m.name.trim().length, `item with id ${m.id} has empty name`).toBeGreaterThan(0);
    });
  });

  it("every item has an emoji", () => {
    SEED_MATERIALS.forEach((m) => {
      expect(m.emoji, `${m.name} missing emoji`).toBeTruthy();
    });
  });

  it("every item has a valid category", () => {
    SEED_MATERIALS.forEach((m) => {
      expect(VALID_CATEGORIES, `${m.name} has invalid category "${m.category}"`).toContain(m.category);
    });
  });

  it("every item has a valid location", () => {
    SEED_MATERIALS.forEach((m) => {
      expect(VALID_LOCATIONS, `${m.name} has invalid location "${m.location}"`).toContain(m.location);
    });
  });

  it("every item starts with qty of 0", () => {
    SEED_MATERIALS.forEach((m) => {
      expect(m.qty, `${m.name} should start at qty 0`).toBe(0);
    });
  });

  it("every item starts with an empty tags array", () => {
    SEED_MATERIALS.forEach((m) => {
      expect(Array.isArray(m.tags), `${m.name} tags should be an array`).toBe(true);
      expect(m.tags.length, `${m.name} should start with no tags`).toBe(0);
    });
  });

  it("all ids are unique", () => {
    const ids = SEED_MATERIALS.map((m) => m.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("all names are unique", () => {
    const names = SEED_MATERIALS.map((m) => m.name.toLowerCase());
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(names.length);
  });
});

describe("categories", () => {
  const byCategory = (cat) => SEED_MATERIALS.filter((m) => m.category === cat);

  it("has at least one Ingredient", () => {
    expect(byCategory("Ingredient").length).toBeGreaterThan(0);
  });

  it("has at least one Material", () => {
    expect(byCategory("Material").length).toBeGreaterThan(0);
  });

  it("has at least one Currency", () => {
    expect(byCategory("Currency").length).toBeGreaterThan(0);
  });

  it("has exactly 4 Weather items (Raindrop, Steamdrop, Stardrop, Snowdrop)", () => {
    const weather = byCategory("Weather").map((m) => m.name);
    expect(weather).toContain("Raindrop");
    expect(weather).toContain("Steamdrop");
    expect(weather).toContain("Stardrop");
    expect(weather).toContain("Snowdrop");
    expect(weather.length).toBe(4);
  });
});

describe("spot checks", () => {
  const find = (name) => SEED_MATERIALS.find((m) => m.name === name);

  it("Chocolate Coin is an Ingredient", () => {
    expect(find("Chocolate Coin")?.category).toBe("Ingredient");
  });

  it("Sand Dollar is Currency", () => {
    expect(find("Sand Dollar")?.category).toBe("Currency");
  });

  it("Seashell is Currency", () => {
    expect(find("Seashell")?.category).toBe("Currency");
  });

  it("Mushroom is Currency", () => {
    expect(find("Mushroom")?.category).toBe("Currency");
  });

  it("Obsidian Shard is Currency", () => {
    expect(find("Obsidian Shard")?.category).toBe("Currency");
  });

  it("Spinip is an Ingredient", () => {
    expect(find("Spinip")?.category).toBe("Ingredient");
  });

  it("Cinna Bloom is an Ingredient", () => {
    expect(find("Cinna Bloom")?.category).toBe("Ingredient");
  });

  it("Magma Bloom is an Ingredient", () => {
    expect(find("Magma Bloom")?.category).toBe("Ingredient");
  });

  it("Sakura is an Ingredient", () => {
    expect(find("Sakura")?.category).toBe("Ingredient");
  });

  it("Snowcicle is an Ingredient", () => {
    expect(find("Snowcicle")?.category).toBe("Ingredient");
  });

  it("Pollen Puff is Currency", () => {
    expect(find("Pollen Puff")?.category).toBe("Currency");
  });

  it("Sparkle is Currency and in All Regions", () => {
    const sparkle = find("Sparkle");
    expect(sparkle?.category).toBe("Currency");
    expect(sparkle?.location).toBe("All Regions");
  });

  it("Moonbeam is in The Moon", () => {
    expect(find("Moonbeam")?.location).toBe("The Moon");
  });

  it("Gift Return items include Paper, Gizmo, Tofu, Flour", () => {
    const giftReturns = SEED_MATERIALS.filter((m) => m.location === "Gift Return").map((m) => m.name);
    expect(giftReturns).toContain("Paper");
    expect(giftReturns).toContain("Gizmo");
    expect(giftReturns).toContain("Tofu");
    expect(giftReturns).toContain("Flour");
  });
});