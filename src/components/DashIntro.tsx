"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import type { Profile } from "@/lib/types";

// Posisi layar bulat (MID) di foto dashboard, dalam persen lebar/tinggi foto. Diukur dari public/img/dashboard.jpg.
const MID = { x: 50.1, y: 48.87, w: 14.84, h: 21.67 };
const MAX_SPEED = 220;

// Intro: foto dashboard satu layar, scroll men-zoom ke MID sampai warnanya memenuhi layar, lalu konten dimulai.
export default function DashIntro({ profile }: { profile: Profile }) {
  const ref = useRef<HTMLElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const speed = useRef<SVGTextElement>(null);
  const [first, ...rest] = profile.name.split(" ");

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from(".dash-copy > *", { opacity: 0, y: 24, duration: 1, ease: "power3.out", stagger: 0.12, delay: 0.2 });

        // Skala minimum supaya elips MID menutupi keempat sudut layar.
        const coverScale = () => {
          const stage = ref.current!.querySelector<HTMLElement>(".dash-stage")!;
          const sw = scene.current!.offsetWidth;
          const sh = scene.current!.offsetHeight;
          const cx = (stage.offsetWidth - sw) / 2 + (sw * MID.x) / 100;
          const cy = (stage.offsetHeight - sh) / 2 + (sh * MID.y) / 100;
          const a = (sw * MID.w) / 200;
          const b = (sh * MID.h) / 200;
          const corners = [[0, 0], [stage.offsetWidth, 0], [0, stage.offsetHeight], [stage.offsetWidth, stage.offsetHeight]];
          return Math.max(...corners.map(([x, y]) => Math.hypot((x - cx) / a, (y - cy) / b))) * 1.04;
        };

        const gauge = { v: 0 };
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: ref.current, start: "top top", end: "+=220%", pin: true, scrub: 1, invalidateOnRefresh: true },
        });
        tl.to(".dash-copy, .dash-hint", { opacity: 0, y: -40, duration: 0.15 }, 0)
          .to(".mid-screen", { opacity: 1, duration: 0.15 }, 0.02)
          .to(scene.current, { scale: coverScale, duration: 0.75, ease: "power2.in" }, 0.05)
          .to(gauge, {
            v: 1,
            duration: 0.75,
            ease: "power1.in",
            onUpdate: () => {
              gsap.set(".mid-needle", { rotation: gauge.v * 270, svgOrigin: "200 215" });
              if (speed.current) speed.current.textContent = String(Math.round(gauge.v * MAX_SPEED * 0.55));
            },
          }, 0.05)
          // Isi MID memudar ke warna latar halaman, supaya section berikutnya menyambung tanpa sambungan.
          .to(".mid-flat", { opacity: 1, duration: 0.15 }, 0.82);
      });
    },
    { scope: ref },
  );

  return (
    <section className="dash-intro" id="top" ref={ref} aria-label="Intro">
      <div className="dash-stage">
        <div className="dash-scene" ref={scene} style={{ transformOrigin: `${MID.x}% ${MID.y}%` }}>
          <Image src="/img/dashboard.jpg" alt="Car dashboard with a round centre display" fill preload sizes="max(100vw, 150svh)" />
          <div
            className="mid-screen"
            style={{ left: `${MID.x - MID.w / 2}%`, top: `${MID.y - MID.h / 2}%`, width: `${MID.w}%`, height: `${MID.h}%` }}
          >
            <MidGauge speedRef={speed} />
            <div className="mid-flat" />
          </div>
          {/* Di dalam foto supaya selalu jatuh di pita kaca depan, antara spion dan dashboard */}
          <div className="dash-copy">
            <h1>
              {first} <span className="grad">{rest.join(" ")}.</span>
            </h1>
            <p className="mono">Portfolio</p>
          </div>
        </div>

        <span className="dash-hint mono">Scroll to start the engine ↓</span>
      </div>
    </section>
  );
}

// Tampilan MID versi vektor: tetap tajam saat di-zoom, menggantikan bagian foto yang akan pecah.
function MidGauge({ speedRef }: { speedRef: React.Ref<SVGTextElement> }) {
  const ticks = Array.from({ length: 12 }, (_, i) => i * 20);
  const pt = (deg: number, r: number) => {
    const rad = ((135 + deg) * Math.PI) / 180;
    // Dibulatkan supaya hasil server dan browser identik (mencegah hydration mismatch).
    return [Math.round((200 + r * Math.cos(rad)) * 100) / 100, Math.round((215 + r * Math.sin(rad)) * 100) / 100];
  };

  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <radialGradient id="midbg" cx="50%" cy="45%" r="60%">
          <stop offset="0" stopColor="#e2d1b3" />
          <stop offset="1" stopColor="#d2bd9c" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="200" fill="url(#midbg)" />
      <path d={`M${pt(0, 128).join(" ")} A128 128 0 1 1 ${pt(270, 128).join(" ")}`} fill="none" stroke="#b49c78" strokeWidth="2" />
      <path d={`M${pt(0, 140).join(" ")} A140 140 0 1 1 ${pt(270, 140).join(" ")}`} fill="none" stroke="#c8b08c" strokeWidth="6" />
      {ticks.map(t => {
        const deg = (t / MAX_SPEED) * 270;
        const [x1, y1] = pt(deg, 128);
        const [x2, y2] = pt(deg, 118);
        const [lx, ly] = pt(deg, 102);
        return (
          <g key={t}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#8a7658" strokeWidth="2" />
            <text x={lx} y={ly + 4} textAnchor="middle" fontSize="13" fill="#8a7658" fontFamily="Georgia, serif">
              {t}
            </text>
          </g>
        );
      })}
      <g className="mid-needle">
        <line x1="200" y1="215" x2={pt(0, 116)[0]} y2={pt(0, 116)[1]} stroke="#2b3a8a" strokeWidth="4" strokeLinecap="round" />
      </g>
      <circle cx="200" cy="215" r="7" fill="#2b3a8a" />
      <text ref={speedRef} x="200" y="78" textAnchor="middle" fontSize="48" fill="#1f1b16" fontFamily="Georgia, serif">
        0
      </text>
      <text x="200" y="94" textAnchor="middle" fontSize="10" fill="#6b5c48" fontFamily="Georgia, serif">
        km/h
      </text>
      <circle cx="262" cy="60" r="14" fill="#f3eadb" />
      <text x="262" y="66" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1f1b16" fontFamily="Georgia, serif">
        D
      </text>
      <rect x="170" y="300" width="60" height="18" rx="3" fill="none" stroke="#8a7658" strokeWidth="1.5" />
      <text x="200" y="313" textAnchor="middle" fontSize="11" fill="#3b3226" fontFamily="ui-monospace, monospace" letterSpacing="1">
        00250
      </text>
      <path d="M48 300 L58 286 M342 286 L352 300" stroke="#d2433a" strokeWidth="3" strokeLinecap="round" />
      <path d="M62 330 L76 340 M324 340 L338 330" stroke="#3bb4d6" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
