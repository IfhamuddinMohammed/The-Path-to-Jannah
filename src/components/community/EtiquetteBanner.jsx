import { useState, useEffect } from "react";
import { Info, X } from "lucide-react";

const STORAGE_KEY = "community_etiquette_dismissed";

export default function EtiquetteBanner() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    setDismissed(localStorage.getItem(STORAGE_KEY) === "true");
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/10 border border-accent/20 mb-6">
      <Info className="w-5 h-5 text-accent shrink-0 mt-0.5" />
      <div className="flex-1 text-sm text-foreground/90">
        <p className="font-medium text-primary mb-1">A gentle reminder</p>
        <p>
          Please observe good Islamic manners (Adab) in your speech here — speak with kindness,
          avoid arguments, and assume good intentions of others. This community is for support
          and reflection, not for issuing religious rulings — for official guidance, please
          consult a qualified scholar or see our Fiqh Rulings and FAQ sections.
        </p>
      </div>
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        className="p-2 -m-2 text-muted-foreground hover:text-foreground shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
