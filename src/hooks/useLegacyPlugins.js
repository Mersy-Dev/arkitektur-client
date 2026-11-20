import { useEffect } from "react";

export function useLegacyPlugins() {
  useEffect(() => {
    if (window.WOW) {
      new window.WOW().init();
    }
  }, []);
}
