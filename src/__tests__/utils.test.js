import { describe, it, expect } from "vitest";
import { getSafeColor, normalizeAbility, migrateResident } from "../constants";
import { getCurrentGiftCount, isExpired, getLastResetTime } from "../utils/giftReset";

describe("getSafeColor", () => {
  it("returns the color key if it exists in ACCENT_GRADIENTS", () => {
    expect(getSafeColor("hellokitty")).toBe("hellokitty");
    expect(getSafeColor("kuromi")).toBe("kuromi");
    expect(getSafeColor("mymelody")).toBe("mymelody");
  });

  it("falls back to hellokitty for unknown keys", () => {
    expect(getSafeColor("coral")).toBe("hellokitty");
    expect(getSafeColor("mint")).toBe("hellokitty");
    expect(getSafeColor(undefined)).toBe("hellokitty");
    expect(getSafeColor("")).toBe("hellokitty");
  });

  it("recognises all new character palettes", () => {
    expect(getSafeColor("chococat")).toBe("chococat");
    expect(getSafeColor("retsuko")).toBe("retsuko");
    expect(getSafeColor("pekkle")).toBe("pekkle");
    expect(getSafeColor("hangyodon")).toBe("hangyodon");
  });
});

describe("normalizeAbility", () => {
  it("converts a string ability to a tiered object", () => {
    const result = normalizeAbility("Double Jump");
    expect(result.name).toBe("Double Jump");
    expect(result.levels).toHaveLength(1);
    expect(result.levels[0].unlocked).toBe(false);
  });

  it("passes through an already-tiered object unchanged", () => {
    const ability = {
      name: "Glide",
      levels: [{ level: 1, unlocksAt: 5, description: "Fly!", unlocked: true }],
    };
    expect(normalizeAbility(ability)).toEqual(ability);
  });

  it("wraps a flat ability object into the tiered structure", () => {
    const flat = { name: "Dash", description: "Go fast", unlocked: true };
    const result = normalizeAbility(flat);
    expect(result.name).toBe("Dash");
    expect(result.levels[0].unlocked).toBe(true);
    expect(result.levels[0].description).toBe("Go fast");
  });

  it("defaults unlocked to false on flat objects", () => {
    const result = normalizeAbility({ name: "Jump" });
    expect(result.levels[0].unlocked).toBe(false);
  });
});

describe("migrateResident", () => {
  it("migrates coral → hellokitty", () => {
    expect(migrateResident({ color: "coral" }).color).toBe("hellokitty");
  });

  it("migrates mint → cinnamoroll", () => {
    expect(migrateResident({ color: "mint" }).color).toBe("cinnamoroll");
  });

  it("migrates lav → mymelody", () => {
    expect(migrateResident({ color: "lav" }).color).toBe("mymelody");
  });

  it("migrates lemon → pompompurin", () => {
    expect(migrateResident({ color: "lemon" }).color).toBe("pompompurin");
  });

  it("leaves new Sanrio keys unchanged", () => {
    expect(migrateResident({ color: "kuromi" }).color).toBe("kuromi");
    expect(migrateResident({ color: "chococat" }).color).toBe("chococat");
    expect(migrateResident({ color: "retsuko" }).color).toBe("retsuko");
    expect(migrateResident({ color: "pekkle" }).color).toBe("pekkle");
    expect(migrateResident({ color: "hangyodon" }).color).toBe("hangyodon");
  });

  it("preserves all other resident fields", () => {
    const resident = { id: "abc", name: "Kuromi", color: "kuromi", birthday: "October 31st" };
    expect(migrateResident(resident)).toMatchObject({ id: "abc", name: "Kuromi", birthday: "October 31st" });
  });
});

describe("getLastResetTime", () => {
  it("returns a Date object", () => {
    expect(getLastResetTime()).toBeInstanceOf(Date);
  });

  it("returns a time at or before now", () => {
    expect(getLastResetTime().getTime()).toBeLessThanOrEqual(Date.now());
  });

  it("returns a time with UTC hours of 7", () => {
    expect(getLastResetTime().getUTCHours()).toBe(7);
    expect(getLastResetTime().getUTCMinutes()).toBe(0);
    expect(getLastResetTime().getUTCSeconds()).toBe(0);
  });
});

describe("isExpired", () => {
  it("returns true for null/undefined", () => {
    expect(isExpired(null)).toBe(true);
    expect(isExpired(undefined)).toBe(true);
  });

  it("returns true for a date before the last reset", () => {
    const old = new Date(Date.now() - 1000 * 60 * 60 * 48); // 2 days ago
    expect(isExpired(old.toISOString())).toBe(true);
  });

  it("returns false for a date after the last reset", () => {
    const recent = new Date(Date.now() - 1000 * 30); // 30 seconds ago
    const reset = getLastResetTime();
    // Only test this if the recent date is after the reset
    if (recent > reset) {
      expect(isExpired(recent.toISOString())).toBe(false);
    }
  });
});

describe("getCurrentGiftCount", () => {
  it("returns 0 for null giftLog", () => {
    expect(getCurrentGiftCount(null)).toBe(0);
  });

  it("returns 0 for undefined giftLog", () => {
    expect(getCurrentGiftCount(undefined)).toBe(0);
  });

  it("returns 0 if lastGiftedAt is expired", () => {
    const old = new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString();
    expect(getCurrentGiftCount({ count: 3, lastGiftedAt: old })).toBe(0);
  });

  it("returns the count if lastGiftedAt is recent", () => {
    const recent = new Date(Date.now() - 1000 * 30).toISOString(); // 30s ago
    const reset = getLastResetTime();
    if (new Date(recent) > reset) {
      expect(getCurrentGiftCount({ count: 2, lastGiftedAt: recent })).toBe(2);
    }
  });

  it("returns 0 if count is missing but date is recent", () => {
    const recent = new Date(Date.now() - 1000 * 30).toISOString();
    const reset = getLastResetTime();
    if (new Date(recent) > reset) {
      expect(getCurrentGiftCount({ lastGiftedAt: recent })).toBe(0);
    }
  });
});