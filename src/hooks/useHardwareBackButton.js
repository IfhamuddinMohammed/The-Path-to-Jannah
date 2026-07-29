import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { App as CapacitorApp } from "@capacitor/app";

// On Android, Capacitor's WebView doesn't wire the OS hardware back button to
// in-app navigation by default — without this listener, the very first back
// press exits the app entirely instead of going to the previous page.
// `canGoBack` reflects whether the WebView's own navigation history has
// anywhere to go back to; only exit once that's exhausted, the same way a
// native app's back stack behaves. Untested on a real device/emulator.
export function useHardwareBackButton() {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const listenerPromise = CapacitorApp.addListener("backButton", ({ canGoBack }) => {
      if (canGoBack) {
        window.history.back();
      } else {
        CapacitorApp.exitApp();
      }
    });

    return () => {
      listenerPromise.then((listener) => listener.remove());
    };
  }, []);
}
