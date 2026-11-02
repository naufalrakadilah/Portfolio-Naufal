"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import type { Job } from "@/lib/types";

export default function Journey({ jobs }: { jobs: Job[] }) {
  return (
    <section className="journey" id="journey">
      <div className="wrap">
        <h2 className="section-title fade-up">
          Where I&apos;ve <span className="grad">worked and learned.</span>
        </h2>
      </div>

      {jobs.map((j, i) => (
        <Chapter key={j.role + j.org} job={j} index={i} />
      ))}
    </section>
  );
}

// Satu pengalaman = satu bab yang di-pin; scroll menarik roll film ke samping.
function Chapter({ job, index }: { job: Job; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const strip = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        // Jarak geser = lebar roll dikurangi lebar layar, supaya frame terakhir berhenti di tepi kanan.
        const dist = () => Math.max(0, strip.current!.scrollWidth - document.documentElement.clientWidth);
        gsap.to(strip.current, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => "+=" + dist(),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <div className="chapter" ref={ref} style={{ "--tone": job.tone ?? "var(--accent)", "--tilt": index % 2 ? "1.5deg" : "-1.5deg" } as React.CSSProperties}>
      <div className="wrap chapter-head">
        <span className="chapter-no">{String(index + 1).padStart(2, "0")}</span>
        <div className="chapter-meta">
          <span className="mono">{job.date}</span>
          <h3>{job.role}</h3>
          <span className="org">{job.org}</span>
          <p className="desc">{job.description}</p>
        </div>
      </div>

      <div className="film-wrap">
        <div className="film" ref={strip}>
          {job.photos.map((p, i) => (
            <figure className="frame" key={p.src} style={{ "--ratio": p.ratio } as React.CSSProperties}>
              <button type="button" data-lb={p.src} data-cap={job.org}>
                <Image src={p.src} alt={`Photo from ${job.org}`} fill sizes="(max-width: 760px) 90vw, 900px" />
              </button>
              <figcaption className="frame-no" aria-hidden="true">
                <span>▸ {i * 2 + 1}</span>
                <span>{i * 2 + 1}A</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
