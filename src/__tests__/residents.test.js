import { describe, it, expect } from "vitest";
import { SEED_RESIDENTS, ACCENT_GRADIENTS, TAG_EMOJI } from "../constants";
import { normalizeAbility } from "../constants";

const VALID_COLORS = Object.keys(ACCENT_GRADIENTS);
const KNOWN_TAGS = Object.keys(TAG_EMOJI);

describe("roster", () => {
  it("has exactly 22 residents", () => {
    expect(SEED_RESIDENTS.length).toBe(22);
  });

  it("all ids are unique", () => {
    const ids = SEED_RESIDENTS.map((r) => r.id);
    expect(new Set(ids).size).toBe(22);
  });

  it("all names are unique", () => {
    const names = SEED_RESIDENTS.map((r) => r.name.toLowerCase());
    expect(new Set(names).size).toBe(22);
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

  it("every resident has a maxLevel above 0 or null (unknown)", () => {
    SEED_RESIDENTS.forEach((r) => {
      if (r.maxLevel !== null) {
        expect(Number(r.maxLevel), `${r.name} maxLevel should be > 0`).toBeGreaterThan(0);
      }
    });
  });

  it("every resident has an imageUrl", () => {
    SEED_RESIDENTS.forEach((r) => {
      expect(r.imageUrl, `${r.name} missing imageUrl`).toBeTruthy();
      expect(r.imageUrl).toMatch(/^https?:\/\//);
    });
  });

  it("every resident has a firstGift", () => {
    SEED_RESIDENTS.forEach((r) => {
      expect(r.firstGift, `${r.name} missing firstGift`).toBeTruthy();
    });
  });
});

describe("unlock groups", () => {
  const immediate = SEED_RESIDENTS.filter((r) => !r.note && !r.unlockType);
  const elsewhere = SEED_RESIDENTS.filter((r) => r.note && !r.unlockType);
  const quest     = SEED_RESIDENTS.filter((r) => r.unlockType === "quest");
  const dlc       = SEED_RESIDENTS.filter((r) => r.unlockType === "dlc");

  it("has 6 immediately available residents", () => {
    expect(immediate.length).toBe(6);
  });

  it("has 7 encountered elsewhere residents", () => {
    expect(elsewhere.length).toBe(7);
  });

  it("has 7 quest-unlocked residents", () => {
    expect(quest.length).toBe(7);
  });

  it("has 2 DLC residents", () => {
    expect(dlc.length).toBe(2);
  });

  it("all 22 residents belong to exactly one group", () => {
    expect(immediate.length + elsewhere.length + quest.length + dlc.length).toBe(22);
  });

  it("DLC residents have a dlc field naming their pack", () => {
    dlc.forEach((r) => {
      expect(r.dlc, `${r.name} missing dlc pack name`).toBeTruthy();
    });
  });

  it("Usahana belongs to City Town DLC", () => {
    const usahana = dlc.find((r) => r.name === "Usahana");
    expect(usahana?.dlc).toBe("City Town");
  });

  it("Cogimyun belongs to Wheatflour Wonderland DLC", () => {
    const cogimyun = dlc.find((r) => r.name === "Cogimyun");
    expect(cogimyun?.dlc).toBe("Wheatflour Wonderland");
  });

  it("encountered elsewhere residents all have a note", () => {
    elsewhere.forEach((r) => {
      expect(r.note, `${r.name} should have a note`).toBeTruthy();
    });
  });

  it("quest and DLC residents all have unlockType set", () => {
    [...quest, ...dlc].forEach((r) => {
      expect(r.unlockType, `${r.name} missing unlockType`).toBeTruthy();
    });
  });
});

describe("color palettes", () => {
  it("every resident has a valid color key", () => {
    SEED_RESIDENTS.forEach((r) => {
      expect(VALID_COLORS, `${r.name} has invalid color "${r.color}"`).toContain(r.color);
    });
  });

  it("no two residents share a color", () => {
    const colors = SEED_RESIDENTS.map((r) => r.color);
    expect(new Set(colors).size).toBe(colors.length);
  });

  it("Hello Kitty uses the hellokitty palette", () => {
    const hk = SEED_RESIDENTS.find((r) => r.name === "Hello Kitty");
    expect(hk?.color).toBe("hellokitty");
  });

  it("Usahana and Cogimyun have their own palettes", () => {
    const usahana  = SEED_RESIDENTS.find((r) => r.name === "Usahana");
    const cogimyun = SEED_RESIDENTS.find((r) => r.name === "Cogimyun");
    expect(VALID_COLORS).toContain(usahana?.color);
    expect(VALID_COLORS).toContain(cogimyun?.color);
  });
});

describe("liked tags", () => {
  it("every resident has exactly 3 liked tags", () => {
    SEED_RESIDENTS.forEach((r) => {
      expect(r.likedTags.length, `${r.name} should have 3 likedTags`).toBe(3);
    });
  });

  it("all liked tags exist in TAG_EMOJI", () => {
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

describe("gifts", () => {
  it("every resident has a lovedGift with heartValue 3", () => {
    SEED_RESIDENTS.forEach((r) => {
      expect(r.lovedGift, `${r.name} missing lovedGift`).toBeTruthy();
      expect(r.lovedGift.heartValue, `${r.name} lovedGift heartValue should be 3`).toBe(3);
      expect(r.lovedGift.name, `${r.name} lovedGift missing name`).toBeTruthy();
    });
  });

  it("every resident has at least one liked gift", () => {
    SEED_RESIDENTS.forEach((r) => {
      expect(r.gifts.length, `${r.name} should have at least 1 liked gift`).toBeGreaterThan(0);
    });
  });

  it("liked gift heartValues are between 1 and 2", () => {
    SEED_RESIDENTS.forEach((r) => {
      r.gifts.forEach((g) => {
        expect(g.heartValue, `${r.name}: "${g.name}" heartValue out of range`).toBeGreaterThanOrEqual(1);
        expect(g.heartValue, `${r.name}: "${g.name}" heartValue out of range`).toBeLessThanOrEqual(2);
      });
    });
  });

  it("all gifts have a positive friendshipValue", () => {
    SEED_RESIDENTS.forEach((r) => {
      [r.lovedGift, ...r.gifts].forEach((g) => {
        expect(g.friendshipValue, `${r.name}: "${g.name}" friendshipValue should be > 0`).toBeGreaterThan(0);
      });
    });
  });
});

describe("abilities", () => {
  it("every resident has at least one ability", () => {
    SEED_RESIDENTS.forEach((r) => {
      expect(r.abilities.length, `${r.name} should have at least 1 ability`).toBeGreaterThan(0);
    });
  });

  it("all abilities normalize correctly", () => {
    SEED_RESIDENTS.forEach((r) => {
      r.abilities.forEach((a) => {
        const norm = normalizeAbility(a);
        expect(norm.name, `${r.name}: normalized ability missing name`).toBeTruthy();
        expect(Array.isArray(norm.levels), `${r.name}: normalized ability missing levels`).toBe(true);
        expect(norm.levels.length).toBeGreaterThan(0);
      });
    });
  });

  it("all ability levels start unlocked: false", () => {
    SEED_RESIDENTS.forEach((r) => {
      r.abilities.forEach((a) => {
        a.levels.forEach((lv) => {
          expect(lv.unlocked, `${r.name} "${a.name}" level ${lv.level} should start locked`).toBe(false);
        });
      });
    });
  });

  it("multi-level abilities have ascending unlock requirements", () => {
    SEED_RESIDENTS.forEach((r) => {
      r.abilities.forEach((a) => {
        const levels = a.levels.filter((lv) => lv.unlocksAt !== null);
        for (let i = 1; i < levels.length; i++) {
          expect(levels[i].unlocksAt, `${r.name} "${a.name}" unlock levels not ascending`)
            .toBeGreaterThan(levels[i - 1].unlocksAt);
        }
      });
    });
  });

  it("all ability levels have a description", () => {
    SEED_RESIDENTS.forEach((r) => {
      r.abilities.forEach((a) => {
        a.levels.forEach((lv) => {
          expect(lv.description, `${r.name} "${a.name}" level ${lv.level} missing description`).toBeTruthy();
        });
      });
    });
  });

  it("Kiki and Lala share the Meteorology ability", () => {
    const kiki = SEED_RESIDENTS.find((r) => r.name === "Kiki");
    const lala = SEED_RESIDENTS.find((r) => r.name === "Lala");
    const kikiAbility = kiki?.abilities.find((a) => a.name === "Meteorology");
    const lalaAbility = lala?.abilities.find((a) => a.name === "Meteorology");
    expect(kikiAbility).toBeTruthy();
    expect(lalaAbility).toBeTruthy();
  });
});

describe("spot checks", () => {
  const find = (name) => SEED_RESIDENTS.find((r) => r.name === name);

  it("Hello Kitty's loved gift is Red Bow Apple Pie", () => {
    expect(find("Hello Kitty")?.lovedGift.name).toBe("Red Bow Apple Pie");
  });

  it("Hello Kitty has Bakery, Fruit, and Fancy as liked tags", () => {
    expect(find("Hello Kitty")?.likedTags).toEqual(["Bakery", "Fruit", "Fancy"]);
  });

  it("Kuromi's firstGift is Gizmo", () => {
    expect(find("Kuromi")?.firstGift).toBe("Gizmo");
  });

  it("Usahana's birthday is August 7th", () => {
    expect(find("Usahana")?.birthday).toBe("August 7th");
  });

  it("Usahana's maxLevel is 20", () => {
    expect(Number(find("Usahana")?.maxLevel)).toBe(20);
  });

  it("Big Challenges has a null birthday", () => {
    expect(find("Big Challenges")?.birthday).toBeNull();
  });

  it("Cogimyun's maxLevel is 35", () => {
    expect(Number(find("Cogimyun")?.maxLevel)).toBe(35);
  });
});