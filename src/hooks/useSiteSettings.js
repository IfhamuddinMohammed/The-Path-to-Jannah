import { useState, useEffect } from "react";
import { SiteSettings } from "@/entities/all";
import { backfillSeed } from "@/lib/seedBackfill";
import { SEED_SITE_SETTINGS } from "@/data/siteSettingsSeed";

const SETTINGS_FIELDS = [
  "feedback_email",
  "instagram_url",
  "whatsapp_number",
  "broadcast_channel_label",
  "broadcast_channel_url",
];

// Read-only access to the single admin-configurable SiteSettings row (contact email, social
// links). Deliberately fill-only, never overwrite: an admin editing these values in the Base44
// admin platform must have them stick, so this only ever creates the row on a first-ever run and
// fills a field that's still blank — it never re-applies the seed default over something already
// set. Called independently wherever it's needed (Layout.jsx, About.jsx) rather than threaded
// through context, since this is small, read-only, single-row data with no write conflicts to
// guard against.
export function useSiteSettings() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        let rows = await SiteSettings.list("key");
        rows = await backfillSeed(SiteSettings, "key", SEED_SITE_SETTINGS, rows, SETTINGS_FIELDS, {
          sortField: "key",
        });
        if (!cancelled) setSettings(rows[0] || null);
      } catch (error) {
        console.error("Error loading site settings:", error);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return settings;
}
