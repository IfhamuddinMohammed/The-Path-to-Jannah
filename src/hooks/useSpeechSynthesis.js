import { useCallback, useEffect, useState } from "react";

// Lightweight browser text-to-speech wrapper used as a placeholder "audio" source
// for Kids Corner (no real recorded pronunciation/narration files exist yet, and
// no open-licensed recordings could be safely sourced — see kidsNasheeds.js).
// Cross-browser speechSynthesis.pause()/resume() is unreliable (esp. Chrome), so
// "pause" here fully stops playback rather than truly pausing mid-utterance —
// tapping play again restarts the current text from the beginning.

function getVoicesAsync() {
  return new Promise((resolve) => {
    const synth = window.speechSynthesis;
    const existing = synth.getVoices();
    if (existing.length) {
      resolve(existing);
      return;
    }
    const handler = () => {
      const voices = synth.getVoices();
      if (voices.length) {
        synth.removeEventListener("voiceschanged", handler);
        resolve(voices);
      }
    };
    synth.addEventListener("voiceschanged", handler);
    // Some browsers never fire voiceschanged (or fire it before we listen) —
    // fall back to whatever getVoices() returns after a short wait.
    setTimeout(() => resolve(synth.getVoices()), 400);
  });
}

// Many devices ship both a low-quality offline "compact" voice and a much
// better network/cloud voice for the same language — the OS default isn't
// necessarily the best-sounding one. Prefer voices that are clearly
// higher-quality (network-backed, or named Google/Natural/Enhanced/Neural).
function pickBestVoice(voices, lang) {
  if (!voices.length) return null;
  const langPrefix = lang.slice(0, 2).toLowerCase();
  const matching = voices.filter((v) => v.lang?.toLowerCase().startsWith(langPrefix));
  const pool = matching.length ? matching : voices;

  const highQuality = pool.find(
    (v) => v.localService === false || /google|natural|enhanced|premium|neural/i.test(v.name)
  );
  return highQuality || pool[0];
}

export function useSpeechSynthesis() {
  const [speaking, setSpeaking] = useState(false);
  const [progress, setProgress] = useState(0);
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
    setProgress(0);
  }, [supported]);

  const speak = useCallback(
    async (text, { lang = "en-US", rate = 0.92 } = {}) => {
      if (!supported || !text) return;
      window.speechSynthesis.cancel();

      const voices = await getVoicesAsync();
      const bestVoice = pickBestVoice(voices, lang);

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = bestVoice?.lang || lang;
      utterance.rate = rate;
      utterance.pitch = 1;
      if (bestVoice) utterance.voice = bestVoice;

      const wordCount = text.trim().split(/\s+/).length || 1;
      let wordsSpoken = 0;

      utterance.onboundary = () => {
        wordsSpoken += 1;
        setProgress(Math.min(1, wordsSpoken / wordCount));
      };
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => {
        setSpeaking(false);
        setProgress(1);
      };
      utterance.onerror = () => setSpeaking(false);

      window.speechSynthesis.speak(utterance);
    },
    [supported]
  );

  useEffect(() => stop, [stop]);

  return { speak, stop, speaking, progress, supported };
}
