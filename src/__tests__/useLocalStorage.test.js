import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "../hooks/useLocalStorage";

beforeEach(() => {
  localStorage.clear();
});

describe("useLocalStorage", () => {
  it("returns the seed value when nothing is stored", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", "hello"));
    expect(result.current[0]).toBe("hello");
  });

  it("returns stored value if one already exists", () => {
    localStorage.setItem("test-key", JSON.stringify("stored"));
    const { result } = renderHook(() => useLocalStorage("test-key", "default"));
    expect(result.current[0]).toBe("stored");
  });

  it("updates state and persists to localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", 0));
    act(() => result.current[1](42));
    expect(result.current[0]).toBe(42);
    expect(JSON.parse(localStorage.getItem("test-key"))).toBe(42);
  });

  it("supports functional updates", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", 10));
    act(() => result.current[1]((prev) => prev + 5));
    expect(result.current[0]).toBe(15);
  });

  it("works with arrays", () => {
    const { result } = renderHook(() => useLocalStorage("test-arr", []));
    act(() => result.current[1](["a", "b"]));
    expect(result.current[0]).toEqual(["a", "b"]);
  });

  it("works with objects", () => {
    const { result } = renderHook(() => useLocalStorage("test-obj", {}));
    act(() => result.current[1]({ name: "Kuromi" }));
    expect(result.current[0]).toEqual({ name: "Kuromi" });
  });

  it("falls back to seed if localStorage has invalid JSON", () => {
    localStorage.setItem("bad-key", "not-json{{{{");
    const { result } = renderHook(() => useLocalStorage("bad-key", "fallback"));
    expect(result.current[0]).toBe("fallback");
  });
});