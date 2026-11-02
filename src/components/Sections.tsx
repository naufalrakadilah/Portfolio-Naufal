import Image from "next/image";
import type { Certificate, Profile, Tool } from "@/lib/types";
import CopyEmail from "./CopyEmail";

export function Certificates({ certificates }: { certificates: Certificate[] }) {
  return (
    <section className="certs" id="certificates">
      <div className="wrap">
        <h2 className="section-title fade-up">Certificates.</h2>
        <div className="cert-grid">
          {certificates.map(c => (
            <figure className="cert fade-up" key={c.image}>
              <button type="button" data-lb={c.image} data-cap={`${c.title} · ${c.org}`}>
                <Image src={c.image} alt={`Certificate: ${c.title}`} fill sizes="(max-width: 860px) 50vw, 280px" />
              </button>
              <figcaption>
                <b>{c.title}</b>
                <span>{c.org} · {c.date}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Tools({ tools }: { tools: Tool[] }) {
  return (
    <section className="stack" id="stack">
      <div className="wrap">
        <h2 className="section-title fade-up">
          The tools I reach for <span className="grad">every day.</span>
        </h2>
        <div className="grid">
          {tools.map(t => (
            <div className="tile fade-up" key={t.name}>
              <span className="mono">{t.category}</span>
              <b>{t.name}</b>
              <span>{t.note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact({ profile }: { profile: Profile }) {
  return (
    <>
      <section className="contact" id="contact">
        <div className="wrap">
          <span className="mono fade-up">Contact</span>
          <h2 className="fade-up">
            Let&apos;s design <span className="grad">something.</span>
          </h2>
          <CopyEmail email={profile.email} />
          <div className="socials fade-up">
            {profile.socials.map(s => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>
      <footer>
        <div className="wrap">
          <span className="mono">© 2026 {profile.name}</span>
          <span className="mono">Built with Next.js</span>
        </div>
      </footer>
    </>
  );
}
