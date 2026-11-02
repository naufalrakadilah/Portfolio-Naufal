"use client";

import { createContext, useContext, useEffect, useRef, type RefObject } from "react";
import Lenis from "lenis";
import { gsap, MOTION_OK, ScrollTrigger } from "@/lib/gsap";

const LenisContext = createContext<RefObject<Lenis | null> | null>(null);
// Dipakai lightbox untuk menghentikan scroll halus saat foto diperbesar.
export const useLenis = () => useContext(LenisContext);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!matchMedia(MOTION_OK).matches) return;

    const instance = new Lenis({ lerp: 0.1, anchors: { offset: -56 } });
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    lenis.current = instance;

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      instance.destroy();
      lenis.current = null;
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
