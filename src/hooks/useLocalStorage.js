import { useState, useCallback } from "react";

/**
 * useLocalStorage
 * A drop-in replacement for useState that also persists
 * the value to localStorage under the given key.
 *
 * Supports both direct values and functional updates:
 *   set(newVal)
 *   set(prev => newVal)
 */
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
