// Starting defaults for the single admin-configurable SiteSettings row. Seeded once, the first
// time the app runs with an empty SiteSettings list (see useSiteSettings.js) — every field after
// that is free to be changed at any time from the Base44 admin platform without this seed ever
// reverting it, since useSiteSettings only fills fields that are still genuinely empty, unlike
// the Prayer Academy/Seerah content seeds elsewhere in this app which deliberately overwrite on
// every load. Instagram and the broadcast channel are left blank rather than a placeholder "#"
// link — the sidebar footer hides an icon entirely until a real URL is set here or in admin.
export const SEED_SITE_SETTINGS = [
  {
    key: "site",
    feedback_email: "ifham4cs@gmail.com",
    instagram_url: "",
    whatsapp_number: "+918686850232",
    broadcast_channel_label: "Broadcast Channel",
    broadcast_channel_url: "",
  },
];
