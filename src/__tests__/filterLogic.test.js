import { describe, it, expect } from "vitest";
import { SEED_RESIDENTS } from "../constants";

// Mirrors the filter logic in ResidentsTab exactly
function applyFilter(residents, filter) {
  return residents.filter((r) => {
    if (filter === "all")       return true;
    if (filter === "immediate") return !r.note && !r.unlockType;
    if (filter === "elsewhere") return r.note && !r.unlockType;
    if (filter === "quest")     return r.unlockType === "quest";
    if (filter === "dlc")       return r.unlockType === "dlc";
    return true;
  });
}

function applySearch(residents, query) {
  const q = query.toLowerCase();
  return residents.filter((r) =>
    r.name.toLowerCase().includes(q) ||
    r.gifts?.some((g) => g.name?.toLowerCase().includes(q))
  );
}

describe("resident filter — all", () => {
  it("returns all 22 residents", () => {
    expect(applyFilter(SEED_RESIDENTS, "all").length).toBe(22);
  });
});

describe("resident filter — immediate", () => {
  const results = applyFilter(SEED_RESIDENTS, "immediate");

  it("returns 6 residents", () => {
    expect(results.length).toBe(6);
  });

  it("includes Hello Kitty", () => {
    expect(results.some((r) => r.name === "Hello Kitty")).toBe(true);
  });

  it("excludes residents with a location note", () => {
    results.forEach((r) => {
      expect(r.note, `${r.name} should not have a note`).toBeFalsy();
    });
  });

  it("excludes quest and DLC residents", () => {
    results.forEach((r) => {
      expect(r.unlockType, `${r.name} should not have unlockType`).toBeUndefined();
    });
  });
});

describe("resident filter — elsewhere", () => {
  const results = applyFilter(SEED_RESIDENTS, "elsewhere");

  it("returns 7 residents", () => {
    expect(results.length).toBe(7);
  });

  it("includes Keroppi and Kuromi", () => {
    expect(results.some((r) => r.name === "Keroppi")).toBe(true);
    expect(results.some((r) => r.name === "Kuromi")).toBe(true);
  });

  it("every result has a note", () => {
    results.forEach((r) => {
      expect(r.note, `${r.name} should have a note`).toBeTruthy();
    });
  });

  it("none have an unlockType", () => {
    results.forEach((r) => {
      expect(r.unlockType).toBeUndefined();
    });
  });
});

describe("resident filter — quest", () => {
  const results = applyFilter(SEED_RESIDENTS, "quest");

  it("returns 7 residents", () => {
    expect(results.length).toBe(7);
  });

  it("includes Kiki and Lala", () => {
    expect(results.some((r) => r.name === "Kiki")).toBe(true);
    expect(results.some((r) => r.name === "Lala")).toBe(true);
  });

  it("every result has unlockType of quest", () => {
    results.forEach((r) => {
      expect(r.unlockType).toBe("quest");
    });
  });

  it("does not include any DLC residents", () => {
    results.forEach((r) => {
      expect(r.unlockType).not.toBe("dlc");
    });
  });
});

describe("resident filter — dlc", () => {
  const results = applyFilter(SEED_RESIDENTS, "dlc");

  it("returns 2 residents", () => {
    expect(results.length).toBe(2);
  });

  it("includes Usahana and Cogimyun", () => {
    expect(results.some((r) => r.name === "Usahana")).toBe(true);
    expect(results.some((r) => r.name === "Cogimyun")).toBe(true);
  });

  it("every result has unlockType of dlc", () => {
    results.forEach((r) => {
      expect(r.unlockType).toBe("dlc");
    });
  });

  it("every result has a dlc pack name", () => {
    results.forEach((r) => {
      expect(r.dlc).toBeTruthy();
    });
  });
});

describe("all four groups are mutually exclusive", () => {
  const immediate = applyFilter(SEED_RESIDENTS, "immediate");
  const elsewhere = applyFilter(SEED_RESIDENTS, "elsewhere");
  const quest     = applyFilter(SEED_RESIDENTS, "quest");
  const dlc       = applyFilter(SEED_RESIDENTS, "dlc");

  it("no resident appears in more than one group", () => {
    const allIds = [
      ...immediate.map((r) => r.id),
      ...elsewhere.map((r) => r.id),
      ...quest.map((r) => r.id),
      ...dlc.map((r) => r.id),
    ];
    expect(new Set(allIds).size).toBe(allIds.length);
  });

  it("all four groups together cover all 22 residents", () => {
    const total = immediate.length + elsewhere.length + quest.length + dlc.length;
    expect(total).toBe(22);
  });
});

describe("search", () => {
  it("finds residents by name", () => {
    const results = applySearch(SEED_RESIDENTS, "kuromi");
    expect(results.some((r) => r.name === "Kuromi")).toBe(true);
  });

  it("is case-insensitive", () => {
    const results = applySearch(SEED_RESIDENTS, "HELLO");
    expect(results.some((r) => r.name === "Hello Kitty")).toBe(true);
  });

  it("finds residents by a liked gift name", () => {
    // Hello Kitty likes Apple Pie
    const results = applySearch(SEED_RESIDENTS, "apple pie");
    expect(results.some((r) => r.name === "Hello Kitty")).toBe(true);
  });

  it("returns empty for something that doesn't match anyone", () => {
    const results = applySearch(SEED_RESIDENTS, "xyzzy99999");
    expect(results.length).toBe(0);
  });

  it("partial name matches work", () => {
    const results = applySearch(SEED_RESIDENTS, "mel");
    expect(results.some((r) => r.name === "My Melody")).toBe(true);
    expect(results.some((r) => r.name === "Wish me mell")).toBe(true);
  });
});