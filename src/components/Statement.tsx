"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type Props = { text: string; highlights: string[] };

// Kata-kata menyala satu per satu mengikuti scroll, sementara section di-pin.
export default function Statement({ text, highlights }: Props) {
  const ref = useRef<HTMLElement>(null);
  const words = text.trim().split(/\s+/);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.fromTo(
          ".w",
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top top", end: "+=150%", pin: true, scrub: true },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <section className="statement" aria-label="About" ref={ref}>
      <div className="wrap">
        <p>
          {words.map((w, i) => (
            <span key={i}>
              <span className={highlights.includes(w) ? "w hl" : "w"}>{w}</span>{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
