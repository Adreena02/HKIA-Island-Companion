import { useState, useCallback } from "react";

// Like useState but persists to localStorage. Supports functional updates.
export function useLocalStorage(key, seed) {
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : seed;
    } catch {
      return seed;
    }
  });

  const set = useCallback((valOrFn) => {
    setState((prev) => {
      const next = typeof valOrFn === "function" ? valOrFn(prev) : valOrFn;
      try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
      return next;
    });
  }, [key]);

  return [state, set];
}