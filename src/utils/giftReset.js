/**
 * giftReset.js
 * All logic for the daily 7AM GMT reset used by gift tracking and the checklist.
 *
 * The game resets daily at 7:00 AM UTC (6:00 AM UTC during Daylight Saving Time).
 * We always use 7:00 AM UTC as the reset point — DST only affects how this
 * translates to the player's local clock display, not the underlying UTC value.
 */

const RESET_HOUR_UTC = 7;

/**
 * Returns the most recent 7AM UTC reset as a Date object.
 * If it's currently before 7AM UTC today, returns yesterday's 7AM UTC.
 */
export function getLastResetTime() {
  const now = new Date();
  const reset = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    RESET_HOUR_UTC, 0, 0, 0,
  ));
  if (now < reset) {
    reset.setUTCDate(reset.getUTCDate() - 1);
  }
  return reset;
}

/**
 * Returns the next 7AM UTC reset as a Date object.
 */
export function getNextResetTime() {
  const last = getLastResetTime();
  const next = new Date(last);
  next.setUTCDate(next.getUTCDate() + 1);
  return next;
}

/**
 * Returns true if the given ISO timestamp is before the last reset.
 */
export function isExpired(isoTimestamp) {
  if (!isoTimestamp) return true;
  return new Date(isoTimestamp) < getLastResetTime();
}

/**
 * Returns the current gift count for a resident, accounting for the daily reset.
 */
export function getCurrentGiftCount(giftLog) {
  if (!giftLog) return 0;
  if (isExpired(giftLog.lastGiftedAt)) return 0;
  return giftLog.count ?? 0;
}

/**
 * Formats the next reset time as a human-readable local time string.
 * e.g. "7:00 AM UTC" or "3:00 AM EDT" depending on the user's timezone.
 */
export function formatNextReset() {
  const next = getNextResetTime();
  return next.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

/**
 * Formats a gift timestamp as a short local time string.
 */
export function formatGiftTime(isoTimestamp) {
  if (!isoTimestamp) return null;
  return new Date(isoTimestamp).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

/**
 * Returns the last reset time as an ISO string.
 * Used by the checklist to store and compare reset boundaries.
 */
export function getLastResetISO() {
  return getLastResetTime().toISOString();
}
