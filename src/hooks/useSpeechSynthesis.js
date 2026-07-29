import { useCallback, useEffect, useRef, useState } from "react";

// Lightweight browser text-to-speech wrapper used as a placeholder "audio" source
// for Kids Corner (no real recorded pronunciation/narration files exist yet).
// Cross-browser speechSynthesis.pause()/resume() is unreliable (esp. Chrome), so
// "pause" here fully stops playback rather than truly pausing mid-utterance —
// tapping play again restarts the current text from the beginning.
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
    (text, { lang = "en-US", rate = 0.95 } = {}) => {
      if (!supported || !text) return;
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = rate;

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
