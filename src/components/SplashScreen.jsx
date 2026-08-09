// Shown while the app checks auth/site settings on boot — right after the native OS splash
// hands off. Android's native splash (and iOS's) can only show an icon on a solid color, never
// text, so this picks up in the same visual register (same dark background, same logo) and adds
// the wordmark/tagline the native layer can't, before the real app renders underneath it.
export default function SplashScreen() {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5"
      style={{ backgroundColor: "#202226" }}
    >
      <img
        src="/logo.png"
        alt="SIRAT"
        className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl shadow-lg"
      />
      <div className="text-center">
        <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-wide text-[hsl(38_46%_58%)]">
          SIRAT
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[hsl(40_20%_75%)]">
          Your All-in-One Islamic Companion
        </p>
      </div>
      <div className="absolute bottom-16 w-6 h-6 border-2 border-[hsl(38_46%_58%/0.3)] border-t-[hsl(38_46%_58%)] rounded-full animate-spin" />
    </div>
  );
}
