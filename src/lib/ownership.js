// The community sections have no login, so there's no server-side notion of "your" post.
// This tracks, per browser, which record ids were created from THIS device — enough to show
// "You" instead of a generic name and to offer Edit/Delete only for content this browser
// created. It's the same tradeoff as ameenTracking.js: not a security boundary (clearing
// storage or switching browsers loses the association), just a best-effort, account-free
// convenience that matches how anonymous/guest posting works on most community platforms.
const STORAGE_PREFIX = "my_ids_";

function readSet(key) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function writeSet(key, set) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify([...set]));
  } catch {
    // Storage unavailable (private browsing, disabled) — Edit/Delete just won't show up
    // for this visitor's own content after a reload; not worth surfacing an error over.
  }
}

export function markAsMine(key, id) {
  const set = readSet(key);
  set.add(id);
  writeSet(key, set);
}

export function unmarkAsMine(key, id) {
  const set = readSet(key);
  set.delete(id);
  writeSet(key, set);
}

export function isMine(key, id) {
  return readSet(key).has(id);
}
