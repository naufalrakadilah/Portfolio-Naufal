"use client";

import { useState } from "react";
import type { Profile } from "@/lib/types";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#journey", label: "Journey" },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact", label: "Contact" },
];

// Ikon garis tipis ala navbar Tesla, dipilih dari awal label sosial di data.ts.
const ICONS: Record<string, React.ReactNode> = {
  Email: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  LinkedIn: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10.5V17M8 7.5v.01M12 17v-6.5M12 13.5a2.5 2.5 0 0 1 5 0V17" />
    </>
  ),
  Instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5v.01" />
    </>
  ),
};

// Navbar ala Tesla: nama di kiri, section di tengah, ikon kontak di kanan.
export default function Nav({ profile }: { profile: Profile }) {
  const [open, setOpen] = useState(false);
  const firstName = profile.name.split(" ")[0];
  const contacts = [{ label: "Email", href: `mailto:${profile.email}` }, ...profile.socials];

  return (
    <nav className="nav" aria-label="Main">
      <a className="logo" href="#top" aria-label={profile.name} onClick={() => setOpen(false)}>
        {firstName}
      </a>

      <ul className="nav-links" data-open={open} id="nav-menu">
        {LINKS.map(l => (
          <li key={l.href}>
            <a href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="nav-icons">
        {contacts.map(c => {
          const key = Object.keys(ICONS).find(k => c.label.startsWith(k));
          if (!key) return null;
          return (
            <a key={c.href} href={c.href} aria-label={c.label} title={c.label} {...(key !== "Email" && { target: "_blank", rel: "noopener noreferrer" })}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {ICONS[key]}
              </svg>
            </a>
          );
        })}
        <button className="nav-menu" type="button" aria-expanded={open} aria-controls="nav-menu" onClick={() => setOpen(o => !o)}>
          {open ? "Close" : "Menu"}
        </button>
      </div>
    </nav>
  );
}
