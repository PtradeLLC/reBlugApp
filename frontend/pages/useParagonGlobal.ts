// useParagonGlobal.ts
import { useCallback, useEffect, useRef, useState } from "react";

// Extend the Window interface to include the 'paragon' property
interface ExtendedWindow extends Window {
  paragon?: any; // Adjust 'any' to the actual type of paragon if possible
}

export default function useParagonGlobal() {
  const mountedParagon = useRef(false);
  const [paragonReady, setParagonReady] = useState(false);

  const initParagon = useCallback(async () => {
    if ((window as ExtendedWindow).paragon) {
      setParagonReady(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && !paragonReady && !mountedParagon.current) {
      if ((window as ExtendedWindow).paragon) {
        initParagon();
      } else {
        mountedParagon.current = true;
        const paragonSrc = document.createElement("script");
        paragonSrc.src = "https://cdn.useparagon.com/latest/sdk/index.js";
        paragonSrc.onload = initParagon;
        document.body.appendChild(paragonSrc);
      }
    }
  }, [paragonReady, initParagon]);

  if (paragonReady && (window as ExtendedWindow).paragon) {
    return (window as ExtendedWindow).paragon;
  }
  return undefined;
}

