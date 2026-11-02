"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import type { RollPhoto } from "@/lib/types";

const ORGS: Record<RollPhoto["org"], [string, string]> = {
  ahm: ["PT Astra Honda Motor", "Plant Sunter Division"],
  humic: ["CoE Humic Engineering", "Telkom University"],
  smartvest: ["SMARTVEST 2025", "GIBEI Telkom University"],
};
const INTERVAL_MS = 3500;
const SIDE_SLOTS = 8;

// Satu slot punya dua lapisan gambar: foto baru dimuat di lapisan yang tersembunyi,
// lalu keduanya bertukar dengan efek pudar.
function Slot({ photo, delay, sizes, className, alt }: {
  photo: RollPhoto;
  delay: number;
  sizes: string;
  className: string;
  alt: string;
}) {
  const [layers, setLayers] = useState<[RollPhoto, RollPhoto | null]>([photo, null]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (layers[active]?.src === photo.src) return;
    const t = setTimeout(() => {
      setLayers(prev => {
        const next = [...prev] as typeof prev;
        next[1 - active] = photo;
        return next;
      });
    }, delay);
    return () => clearTimeout(t);
  }, [photo, delay, active, layers]);

  return (
    <div className={`slot ${className}`}>
      {layers.map((p, i) =>
        p ? (
          <Image
            key={i}
            src={p.src}
            alt={i === active ? alt : ""}
            fill
            sizes={sizes}
            className={i === active ? "on" : ""}
            style={{ objectPosition: p.position }}
            onLoad={() => {
              if (i !== active && layers[i]?.src === photo.src) setActive(i);
            }}
          />
        ) : null,
      )}
    </div>
  );
}

export default function PhotoRoll({ photos }: { photos: RollPhoto[] }) {
  const ref = useRef<HTMLElement>(null);
  const [turn, setTurn] = useState(0);

  useEffect(() => {
    if (!matchMedia(MOTION_OK).matches) return;
    const id = setInterval(() => setTurn(t => (t + 1) % photos.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, [photos.length]);

  // Foto tengah mulai kecil lalu membesar penuh; foto samping terdorong keluar.
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: ref.current, start: "top top", end: "+=200%", pin: true, scrub: 1 } })
          .fromTo(
            ".feature",
            { scale: 0.5, yPercent: 12, borderRadius: 40 },
            { scale: 1, yPercent: 0, borderRadius: 0, duration: 1, ease: "power2.inOut" },
            0,
          )
          .fromTo(".feature img", { scale: 1.25 }, { scale: 1, duration: 1, ease: "power2.inOut" }, 0)
          .to(".side-grid.l .side", { x: "-30vw", opacity: 0, duration: 0.7, ease: "power2.in", stagger: 0.06 }, 0.05)
          .to(".side-grid.r .side", { x: "30vw", opacity: 0, duration: 0.7, ease: "power2.in", stagger: 0.06 }, 0.05)
          .to(".zoom-head", { opacity: 0, y: -50, duration: 0.35 }, 0.25)
          .from(".zoom-cap", { opacity: 0, y: 30, duration: 0.3 }, 0.8);
      });
    },
    { scope: ref },
  );

  const at = (j: number) => photos[(turn + j) % photos.length];
  const center = at(0);
  const [orgName, orgDetail] = ORGS[center.org];
  const side = (from: number) =>
    Array.from({ length: SIDE_SLOTS / 2 }, (_, k) => {
      const j = from + k;
      return <Slot key={j} photo={at(j)} delay={j * 70} sizes="12vw" className="side" alt="" />;
    });

  return (
    <section className="zoom" aria-label="Behind the work" ref={ref}>
      <div className="side-grid l">{side(1)}</div>
      <div className="side-grid r">{side(1 + SIDE_SLOTS / 2)}</div>
      <Slot photo={center} delay={0} sizes="100vw" className="feature" alt={`Photo from ${orgName}`} />
      <div className="zoom-head">
        <span className="mono">Astra Honda Motor · Humic · SMARTVEST</span>
        <h2>
          Where the work <span className="grad">happens.</span>
        </h2>
      </div>
      <p className="zoom-cap" aria-live="polite">
        <b>{orgName}</b> · {orgDetail}
      </p>
    </section>
  );
}
