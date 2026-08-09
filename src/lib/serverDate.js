// Base44 timestamps (created_date/updated_date) come back as e.g. "2026-08-09T16:10:01.309000"
// — no trailing Z or UTC offset. Per the JS Date spec, an ISO date-time string with no timezone
// designator is parsed as browser-LOCAL time, not UTC. Since these timestamps are actually UTC,
// every relative-time display ("4 hours ago") was off by exactly the visitor's UTC offset —
// invisible in a UTC dev environment, but a multi-hour skew for anyone in e.g. GST (UTC+4).
export function parseServerDate(dateString) {
  if (!dateString) return null;
  const hasTimezone = /Z$|[+-]\d{2}:?\d{2}$/.test(dateString);
  return new Date(hasTimezone ? dateString : `${dateString}Z`);
}
