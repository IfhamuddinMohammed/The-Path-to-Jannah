import { useEffect, useState } from "react";

const QURAN_COM_API = "https://api.quran.com/api/v4";

// Real Mushaf pages, fetched directly by page number (1-604) rather than by surah — a page
// carries page/juz/hizb/ruku/manzil/sajdah numbers per ayah straight from the API, so no
// separate boundary-lookup dataset is needed to render one accurately.
export function usePageVerses(pageNumber) {
  const [verses, setVerses] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    if (!pageNumber) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(`${QURAN_COM_API}/verses/by_page/${pageNumber}?words=false&fields=text_uthmani&per_page=50`)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        setVerses(data.verses ?? []);
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't load this page. Please try again.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [pageNumber, retryToken]);

  const retry = () => setRetryToken((t) => t + 1);
  return { verses, loading, error, retry };
}
