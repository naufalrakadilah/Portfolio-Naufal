"use client";

import { useEffect, useRef, useState } from "react";
import { MOTION_OK } from "@/lib/gsap";
import Image from "next/image";
import type { Project } from "@/lib/types";

// Lama tiap slide tampil sebelum otomatis pindah; samakan dengan durasi animasi .show-dot di CSS.
const AUTOPLAY_MS = 5000;

// Showroom ala Rivian: satu project di tengah, judul besar di belakang gambar, tetangganya mengintip di pinggir.

// note: keterangan kecil di bawah label, mis. alasan project tidak punya link publik.
type Props = { projects: Project[]; id: string; label: string; note?: string };

export default function Work({ projects, id, label, note }: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const section = useRef<HTMLElement>(null);
  const touchX = useRef<number | null>(null);
  const n = projects.length;

  // Hanya jalan saat section terlihat di layar.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.5 });
    io.observe(section.current!);
    return () => io.disconnect();
  }, []);

  // Timer diulang dari nol setiap slide berganti, termasuk saat pengunjung pindah manual.
  useEffect(() => {
    if (paused || !inView || !matchMedia(MOTION_OK).matches) return;
    const t = setTimeout(() => setActive(a => (a + 1) % n), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [active, paused, inView, n]);

  const go = (i: number) => setActive(((i % n) + n) % n);
  const current = projects[active];

  // Jarak melingkar dari slide aktif: -1 kiri, 0 tengah, 1 kanan, sisanya disembunyikan.
  const offset = (i: number) => {
    let d = (i - active + n) % n;
    if (d > n / 2) d -= n;
    return d;
  };

  return (
    <section
      className="show"
      id={id}
      aria-label={label}
      aria-roledescription="carousel"
      ref={section}
      data-playing={!paused && inView}
      // Jeda saat dibaca: hover mouse atau fokus keyboard. Tap di HP tidak menjeda.
      onPointerEnter={e => e.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={e => e.pointerType === "mouse" && setPaused(false)}
      onFocus={e => e.target.matches(":focus-visible") && setPaused(true)}
      onBlur={e => !e.currentTarget.contains(e.relatedTarget) && setPaused(false)}
      onKeyDown={e => {
        if (e.key === "ArrowRight") go(active + 1);
        if (e.key === "ArrowLeft") go(active - 1);
      }}
      onTouchStart={e => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={e => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      <div className="wrap show-head">
        <div className="show-label">
          <h2>{label}</h2>
          {note && (
            <p className="show-note">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <rect x="5" y="11" width="14" height="10" rx="2" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" />
              </svg>
              {note}
            </p>
          )}
        </div>
        <span className="show-count">
          {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </span>
      </div>

      <div className="show-stage">
        <div className="show-titles" aria-hidden="true">
          {projects.map((p, i) => (
            <span
              key={p.title}
              className="show-title"
              data-d={Math.sign(offset(i))}
              style={{ "--len": p.title.length } as React.CSSProperties}
            >
              {p.title}
            </span>
          ))}
        </div>

        <div className="show-slides">
          {projects.map((p, i) => {
            const d = offset(i);
            return (
              <button
                key={p.title}
                type="button"
                className="show-slide"
                data-d={Math.abs(d) > 1 ? "far" : d}
                style={{ "--d": d } as React.CSSProperties}
                tabIndex={d === 0 ? 0 : -1}
                aria-hidden={d !== 0}
                aria-label={d === 0 ? `Enlarge ${p.title}` : undefined}
                onClick={
                  d === 0
                    ? undefined
                    : e => {
                        // Jangan sampai Lightbox ikut terbuka setelah slide ini jadi aktif.
                        e.stopPropagation();
                        go(i);
                      }
                }
                {...(d === 0 && { "data-lb": p.image, "data-cap": p.title })}
              >
                <Image src={p.image} alt={`${p.title} design mockup`} fill sizes="(max-width: 760px) 84vw, 760px" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="wrap show-info" key={active} aria-live={paused ? "polite" : "off"}>
        <h3>{current.description}</h3>
        <p>
          {current.type} <span aria-hidden="true">|</span> {current.tags.join(" · ")}
        </p>
        <div className="show-cta">
          {current.link ? (
            <a className="pill dark" href={current.link} target="_blank" rel="noopener noreferrer">
              View prototype <span aria-hidden="true">↗</span>
            </a>
          ) : (
            // Tanpa link (mis. dashboard internal): buka gambarnya penuh di lightbox.
            <button className="pill dark" type="button" data-lb={current.image} data-cap={current.title}>
              View full screen
            </button>
          )}
          <button className="pill light" type="button" onClick={() => go(active + 1)}>
            Next project
          </button>
        </div>
      </div>

      <div className="show-dots">
        {projects.map((p, i) => (
          <button
            key={p.title}
            type="button"
            className="show-dot"
            aria-label={`Show ${p.title}`}
            aria-current={i === active}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </section>
  );
}
