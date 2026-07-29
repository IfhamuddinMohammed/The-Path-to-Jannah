// cdn.islamic.network (which hosts the Urdu/English translation-audio recitations)
// doesn't send Access-Control-Allow-Origin, so the browser can stream it fine via
// <audio src>, but can't fetch() it as a Blob for offline caching (CORS blocks that).
// This function re-fetches the file server-side (no CORS restriction between
// servers) and re-serves it with CORS enabled, so the frontend can download and
// cache it for offline listening, same as it already does for Arabic recitation.

const EDITIONS = {
  urdu: { id: "ur.khan", bitrate: 64 },
  english: { id: "en.walk", bitrate: 192 },
};

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

export default async function (req) {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  const url = new URL(req.url);
  const language = url.searchParams.get("language");
  const ayah = Number(url.searchParams.get("ayah"));

  const edition = EDITIONS[language];
  if (!edition || !Number.isInteger(ayah) || ayah < 1 || ayah > 6236) {
    return new Response("Invalid parameters", { status: 400, headers: CORS_HEADERS });
  }

  const upstreamUrl = `https://cdn.islamic.network/quran/audio/${edition.bitrate}/${edition.id}/${ayah}.mp3`;

  let upstreamRes;
  try {
    upstreamRes = await fetch(upstreamUrl);
  } catch {
    return new Response("Upstream fetch failed", { status: 502, headers: CORS_HEADERS });
  }
  if (!upstreamRes.ok) {
    return new Response("Upstream fetch failed", { status: 502, headers: CORS_HEADERS });
  }

  const audioBuffer = await upstreamRes.arrayBuffer();

  return new Response(audioBuffer, {
    status: 200,
    headers: {
      ...CORS_HEADERS,
      "Content-Type": "audio/mpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
