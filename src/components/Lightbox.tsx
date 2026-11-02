"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLenis } from "./SmoothScroll";

// Elemen apa pun dengan data-lb="/img/..." bisa diklik untuk diperbesar.
export default function Lightbox() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [item, setItem] = useState<{ src: string; cap: string } | null>(null);
  const lenis = useLenis();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-lb]");
      if (!t) return;
      setItem({ src: t.dataset.lb!, cap: t.dataset.cap ?? "" });
      dialog.current?.showModal();
      lenis?.current?.stop();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);

  return (
    <dialog
      className="lb"
      ref={dialog}
      aria-label="Image preview"
      onClose={() => lenis?.current?.start()}
      onClick={e => e.target === dialog.current && dialog.current?.close()}
    >
      <button className="lb-close" type="button" aria-label="Close preview" onClick={() => dialog.current?.close()}>
        ×
      </button>
      {item && (
        <figure>
          <div className="lb-img">
            <Image src={item.src} alt={item.cap} fill sizes="94vw" />
          </div>
          <figcaption>{item.cap}</figcaption>
        </figure>
      )}
    </dialog>
  );
}
