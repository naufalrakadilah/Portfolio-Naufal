"use client";

import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

// Semua elemen ber-class "fade-up" naik pelan saat masuk layar.
// Dipasang paling akhir di halaman supaya posisinya dihitung setelah section yang di-pin.
export default function Reveal() {
  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      gsap.utils.toArray<HTMLElement>(".fade-up").forEach(el =>
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        }),
      );
    });
  });
  return null;
}
