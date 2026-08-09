// Keeps a Base44 entity's rows in sync with a static seed list across two axes: rows that don't
// exist yet (create), and rows that exist but need a field updated from the seed (update) — e.g.
// a Roman Urdu translation authored after the row was first seeded (`fillFields`, only applied
// when the existing value is empty — never clobbers something already there), or a content
// revision meant to replace what's already there outright (`overwriteFields`, e.g. expanding a
// short summary into a fuller account — the whole point is to replace the old value). A naive
// "seed only if the list is empty" check misses both of these for anyone who loaded the page
// before the seed grew or changed.
export async function backfillSeed(
  entity,
  keyField,
  seedList,
  existingList,
  fillFields,
  { overwriteFields = [], sortField = "order" } = {}
) {
  const missing = seedList.filter(
    (seed) => !existingList.some((existing) => existing[keyField] === seed[keyField])
  );
  if (missing.length > 0) {
    await entity.bulkCreate(missing);
  }

  const updates = existingList
    .map((existing) => {
      const seed = seedList.find((s) => s[keyField] === existing[keyField]);
      if (!seed) return null;
      const patch = {};
      for (const field of fillFields) {
        if (seed[field] && !existing[field]) patch[field] = seed[field];
      }
      for (const field of overwriteFields) {
        if (seed[field] !== undefined && JSON.stringify(seed[field]) !== JSON.stringify(existing[field])) {
          patch[field] = seed[field];
        }
      }
      return Object.keys(patch).length > 0 ? { id: existing.id, patch } : null;
    })
    .filter(Boolean);
  if (updates.length > 0) {
    await Promise.all(updates.map(({ id, patch }) => entity.update(id, patch)));
  }

  return missing.length > 0 || updates.length > 0 ? entity.list(sortField) : existingList;
}
