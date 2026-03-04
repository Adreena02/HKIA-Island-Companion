import { describe, it, expect } from "vitest";
import {
  getSafeColor,
  normaliseAbility,
  normaliseAbilities,
  migrateResident,
} from "../constants";

// ─── getSafeColor ─────────────────────────────────────────────────────────────

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
});

// ─── normaliseAbility ─────────────────────────────────────────────────────────

describe("normaliseAbility", () => {
  it("converts a string ability to an object", () => {
    expect(normaliseAbility("Double Jump")).toEqual({ name: "Double Jump", unlocked: false });
  });

  it("passes through an already-normalised object unchanged", () => {
    const ability = { name: "Glide", unlocked: true };
    expect(normaliseAbility(ability)).toEqual(ability);
  });

  it("preserves unlocked: false on objects", () => {
    expect(normaliseAbility({ name: "Dash", unlocked: false })).toEqual({ name: "Dash", unlocked: false });
  });
});

// ─── normaliseAbilities ───────────────────────────────────────────────────────

describe("normaliseAbilities", () => {
  it("pads an empty array to 3 slots", () => {
    const result = normaliseAbilities([]);
    expect(result).toHaveLength(3);
    expect(result.every((a) => a.name === "" && a.unlocked === false)).toBe(true);
  });

  it("pads a partial array to 3 slots", () => {
    const result = normaliseAbilities([{ name: "Jump", unlocked: false }]);
    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({ name: "Jump", unlocked: false });
    expect(result[1]).toEqual({ name: "", unlocked: false });
  });

  it("trims to 3 slots if more are provided", () => {
    const input = [
      { name: "A", unlocked: false },
      { name: "B", unlocked: false },
      { name: "C", unlocked: false },
      { name: "D", unlocked: false },
    ];
    expect(normaliseAbilities(input)).toHaveLength(3);
  });

  it("converts string entries to objects", () => {
    const result = normaliseAbilities(["Jump", "Glide"]);
    expect(result[0]).toEqual({ name: "Jump", unlocked: false });
    expect(result[1]).toEqual({ name: "Glide", unlocked: false });
  });

  it("handles null/undefined gracefully", () => {
    expect(normaliseAbilities(null)).toHaveLength(3);
    expect(normaliseAbilities(undefined)).toHaveLength(3);
  });
});

// ─── migrateResident ─────────────────────────────────────────────────────────

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
    expect(migrateResident({ color: "hellokitty" }).color).toBe("hellokitty");
  });

  it("preserves all other resident fields", () => {
    const resident = { id: "abc", name: "Kuromi", color: "kuromi", birthday: "October 31st" };
    expect(migrateResident(resident)).toMatchObject({ id: "abc", name: "Kuromi", birthday: "October 31st" });
  });
});
