import { describe, it, expect } from "vitest";
import { SEED_EVENTS, EVENT_TYPES } from "../constants_events";

const VALID_TYPES = Object.keys(EVENT_TYPES);
const VALID_MONTHS = [1,2,3,4,5,6,7,8,9,10,11,12];

describe("SEED_EVENTS", () => {
  it("has exactly 19 events", () => {
    expect(SEED_EVENTS.length).toBe(19);
  });

  it("all ids are unique", () => {
    const ids = SEED_EVENTS.map((e) => e.id);
    expect(new Set(ids).size).toBe(19);
  });

  it("every event has a non-empty name", () => {
    SEED_EVENTS.forEach((e) => {
      expect(e.name.trim().length, `${e.id} has empty name`).toBeGreaterThan(0);
    });
  });

  it("every event has an emoji", () => {
    SEED_EVENTS.forEach((e) => {
      expect(e.emoji, `${e.id} missing emoji`).toBeTruthy();
    });
  });

  it("every event type is one of the four valid types", () => {
    SEED_EVENTS.forEach((e) => {
      expect(VALID_TYPES, `${e.name} has unknown type "${e.type}"`).toContain(e.type);
    });
  });

  it("all month values are valid (1-12)", () => {
    SEED_EVENTS.forEach((e) => {
      expect(VALID_MONTHS, `${e.name} has bad startMonth`).toContain(e.startMonth);
      expect(VALID_MONTHS, `${e.name} has bad endMonth`).toContain(e.endMonth);
    });
  });

  it("all day values are plausible (1-31)", () => {
    SEED_EVENTS.forEach((e) => {
      expect(e.startDay).toBeGreaterThanOrEqual(1);
      expect(e.startDay).toBeLessThanOrEqual(31);
      expect(e.endDay).toBeGreaterThanOrEqual(1);
      expect(e.endDay).toBeLessThanOrEqual(31);
    });
  });

  it("every event has a description", () => {
    SEED_EVENTS.forEach((e) => {
      expect(e.description, `${e.name} missing description`).toBeTruthy();
    });
  });

  it("there is exactly one flash event", () => {
    const flash = SEED_EVENTS.filter((e) => e.type === "flash");
    expect(flash.length).toBe(1);
    expect(flash[0].name).toBe("Happy Haven Days");
  });

  it("there are exactly two calendar events", () => {
    const cal = SEED_EVENTS.filter((e) => e.type === "calendar");
    expect(cal.length).toBe(2);
  });

  it("Lighttime Jubilee wraps around New Year", () => {
    const jubilee = SEED_EVENTS.find((e) => e.id === "lighttime-jubilee");
    expect(jubilee.startMonth).toBe(12);
    expect(jubilee.endMonth).toBe(1);
  });

  it("Give and Gather runs through all of December", () => {
    const event = SEED_EVENTS.find((e) => e.id === "give-and-gather");
    expect(event.startMonth).toBe(11);
    expect(event.endMonth).toBe(12);
    expect(event.endDay).toBe(31);
  });
});

describe("EVENT_TYPES", () => {
  it("has all four types", () => {
    expect(EVENT_TYPES).toHaveProperty("primary");
    expect(EVENT_TYPES).toHaveProperty("secondary");
    expect(EVENT_TYPES).toHaveProperty("calendar");
    expect(EVENT_TYPES).toHaveProperty("flash");
  });

  it("each type has a label, color, and bg", () => {
    Object.entries(EVENT_TYPES).forEach(([key, val]) => {
      expect(val.label, `${key} missing label`).toBeTruthy();
      expect(val.color, `${key} missing color`).toMatch(/^#/);
      expect(val.bg, `${key} missing bg`).toMatch(/^#/);
    });
  });
});
