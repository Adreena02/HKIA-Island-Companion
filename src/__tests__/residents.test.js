import { describe, it, expect } from "vitest";
import { SEED_RESIDENTS, ACCENT_GRADIENTS, TAG_EMOJI } from "../constants";
import { normaliseAbility } from "../constants";

const VALID_COLORS = Object.keys(ACCENT_GRADIENTS);
const KNOWN_TAGS = Object.keys(TAG_EMOJI);

// ─── Roster structure ─────────────────────────────────────────────────────────

describe("SEED_RESIDENTS — roster", () => {
  it("has exactly 13 residents", () => {
    expect(SEED_RESIDENTS.length).toBe(13);
  });

  it("all ids are unique", () => {
    const ids = SEED_RESIDENTS.map((r) => r.id);
    expect(new Set(ids).size).toBe(13);
  });

  it("all names are unique", () => {
    const names = SEED_RESIDENTS.map((r) => r.name.toLowerCase());
    expect(new Set(names).size).toBe(13);
  });

  it("every resident has a non-empty name", () => {
    SEED_RESIDENTS.forEach((r) => {
      expect(r.name.trim().length, `resident id ${r.id} has empty name`).toBeGreaterThan(0);
    });
  });

  it("every resident starts at level 0", () => {
    SEED_RESIDENTS.forEach((r) => {
      expect(r.currentLevel, `${r.name} should start at level 0`).toBe(0);
    });
  });

  it("every resident has a maxLevel greater than 0", () => {
    SEED_RESIDENTS.forEach((r) => {
      expect(Number(r.maxLevel), `${r.name} maxLevel should be > 0`).toBeGreaterThan(0);
    });
  });

  it("every resident has an imageUrl", () => {
    SEED_RESIDENTS.forEach((r) => {
      expect(r.imageUrl, `${r.name} missing imageUrl`).toBeTruthy();
      expect(r.imageUrl).toMatch(/^https?:\/\//);
    });
  });

  it("every resident has a birthday", () => {
    SEED_RESIDENTS.forEach((r) => {
      expect(r.birthday, `${r.name} missing birthday`).toBeTruthy();
    });
  });

  it("every resident has a firstGift", () => {
    SEED_RESIDENTS.forEach((r) => {
      expect(r.firstGift, `${r.name} missing firstGift`).toBeTruthy();
    });
  });
});

// ─── Colors ───────────────────────────────────────────────────────────────────

describe("SEED_RESIDENTS — colors", () => {
  it("every resident has a valid color key", () => {
    SEED_RESIDENTS.forEach((r) => {
      expect(VALID_COLORS, `${r.name} has invalid color "${r.color}"`).toContain(r.color);
    });
  });

  it("no two residents share a color", () => {
    const colors = SEED_RESIDENTS.map((r) => r.color);
    expect(new Set(colors).size).toBe(colors.length);
  });

  it("Hello Kitty uses hellokitty palette", () => {
    const hk = SEED_RESIDENTS.find((r) => r.name === "Hello Kitty");
    expect(hk?.color).toBe("hellokitty");
  });

  it("Kuromi uses kuromi palette", () => {
    const k = SEED_RESIDENTS.find((r) => r.name === "Kuromi");
    expect(k?.color).toBe("kuromi");
  });
});

// ─── Tags ─────────────────────────────────────────────────────────────────────

describe("SEED_RESIDENTS — liked tags", () => {
  it("every resident has exactly 3 liked tags", () => {
    SEED_RESIDENTS.forEach((r) => {
      expect(r.likedTags.length, `${r.name} should have 3 likedTags`).toBe(3);
    });
  });

  it("all liked tags are known TAG_EMOJI keys", () => {
    SEED_RESIDENTS.forEach((r) => {
      r.likedTags.forEach((tag) => {
        expect(KNOWN_TAGS, `${r.name} has unknown tag "${tag}"`).toContain(tag);
      });
    });
  });

  it("no resident has duplicate liked tags", () => {
    SEED_RESIDENTS.forEach((r) => {
      expect(new Set(r.likedTags).size, `${r.name} has duplicate likedTags`).toBe(3);
    });
  });
});

// ─── Gifts ────────────────────────────────────────────────────────────────────

describe("SEED_RESIDENTS — gifts", () => {
  it("every resident has a lovedGift with heartValue 3", () => {
    SEED_RESIDENTS.forEach((r) => {
      expect(r.lovedGift, `${r.name} missing lovedGift`).toBeTruthy();
      expect(r.lovedGift.heartValue, `${r.name} lovedGift heartValue should be 3`).toBe(3);
      expect(r.lovedGift.name, `${r.name} lovedGift name should be non-empty`).toBeTruthy();
    });
  });

  it("every resident has at least one liked gift", () => {
    SEED_RESIDENTS.forEach((r) => {
      expect(r.gifts.length, `${r.name} should have at least 1 liked gift`).toBeGreaterThan(0);
    });
  });

  it("all liked gifts have a heartValue between 1 and 2", () => {
    SEED_RESIDENTS.forEach((r) => {
      r.gifts.forEach((g) => {
        expect(g.heartValue, `${r.name}: gift "${g.name}" heartValue out of range`).toBeGreaterThanOrEqual(1);
        expect(g.heartValue, `${r.name}: gift "${g.name}" heartValue out of range`).toBeLessThanOrEqual(2);
      });
    });
  });

  it("all gifts have a positive friendshipValue", () => {
    SEED_RESIDENTS.forEach((r) => {
      [r.lovedGift, ...r.gifts].forEach((g) => {
        expect(g.friendshipValue, `${r.name}: gift "${g.name}" friendshipValue should be > 0`).toBeGreaterThan(0);
      });
    });
  });
});

// ─── Abilities ────────────────────────────────────────────────────────────────

describe("SEED_RESIDENTS — abilities", () => {
  it("every resident has at least one ability", () => {
    SEED_RESIDENTS.forEach((r) => {
      expect(r.abilities.length, `${r.name} should have at least 1 ability`).toBeGreaterThan(0);
    });
  });

  it("all abilities normalise correctly", () => {
    SEED_RESIDENTS.forEach((r) => {
      r.abilities.forEach((a) => {
        const norm = normaliseAbility(a);
        expect(norm.name, `${r.name}: normalised ability missing name`).toBeTruthy();
        expect(Array.isArray(norm.levels), `${r.name}: normalised ability missing levels`).toBe(true);
        expect(norm.levels.length).toBeGreaterThan(0);
      });
    });
  });

  it("all ability levels start as unlocked: false", () => {
    SEED_RESIDENTS.forEach((r) => {
      r.abilities.forEach((a) => {
        a.levels.forEach((lv) => {
          expect(lv.unlocked, `${r.name} ability "${a.name}" level ${lv.level} should start unlocked: false`).toBe(false);
        });
      });
    });
  });

  it("ability unlock levels are in ascending order", () => {
    SEED_RESIDENTS.forEach((r) => {
      r.abilities.forEach((a) => {
        const unlockLevels = a.levels.map((lv) => lv.unlocksAt);
        for (let i = 1; i < unlockLevels.length; i++) {
          expect(unlockLevels[i], `${r.name} ability "${a.name}" unlock levels not ascending`).toBeGreaterThan(unlockLevels[i - 1]);
        }
      });
    });
  });

  it("all ability levels have a description", () => {
    SEED_RESIDENTS.forEach((r) => {
      r.abilities.forEach((a) => {
        a.levels.forEach((lv) => {
          expect(lv.description, `${r.name} ability "${a.name}" level ${lv.level} missing description`).toBeTruthy();
        });
      });
    });
  });
});

// ─── Spot checks ─────────────────────────────────────────────────────────────

describe("SEED_RESIDENTS — spot checks", () => {
  const find = (name) => SEED_RESIDENTS.find((r) => r.name === name);

  it("Hello Kitty's loved gift is Red Bow Apple Pie", () => {
    expect(find("Hello Kitty")?.lovedGift.name).toBe("Red Bow Apple Pie");
  });

  it("Hello Kitty has Bakery, Fruit, and Fancy as liked tags", () => {
    expect(find("Hello Kitty")?.likedTags).toEqual(["Bakery", "Fruit", "Fancy"]);
  });

  it("Hello Kitty maxLevel is 25", () => {
    expect(Number(find("Hello Kitty")?.maxLevel)).toBe(25);
  });

  it("Kuromi's firstGift is Gizmo", () => {
    expect(find("Kuromi")?.firstGift).toBe("Gizmo");
  });

  it("My Melody's lovedGift is Pink Clouds Ice Cream", () => {
    expect(find("My Melody")?.lovedGift.name).toBe("Pink Clouds Ice Cream");
  });
});
