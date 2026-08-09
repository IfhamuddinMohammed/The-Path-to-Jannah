// The platform has no login, so there's no real identity to dedupe against — this is a
// best-effort guard against the common case (the same visitor refreshing the page and
// clicking again), not a hard anti-abuse measure. Clearing storage or switching browsers
// still bypasses it, which is an accepted tradeoff for keeping the app account-free.
const STORAGE_PREFIX = "ameen_said_";

export function hasAlreadySaidAmeen(key) {
  try {
    return localStorage.getItem(STORAGE_PREFIX + key) === "true";
  } catch {
    return false;
  }
}

export function setAlreadySaidAmeen(key, said) {
  try {
    if (said) localStorage.setItem(STORAGE_PREFIX + key, "true");
    else localStorage.removeItem(STORAGE_PREFIX + key);
  } catch {
    // Storage unavailable (private browsing, disabled) — button stays re-clickable every
    // reload, same as before this fix; not worth surfacing an error over.
  }
}
