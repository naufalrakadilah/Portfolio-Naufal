"use client";

import { useRef, useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const code = useRef<HTMLElement>(null);

  const selectEmail = () => {
    const range = document.createRange();
    range.selectNodeContents(code.current!);
    const sel = getSelection()!;
    sel.removeAllRanges();
    sel.addRange(range);
  };

  const copy = () => {
    if (!navigator.clipboard) return selectEmail();
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }, selectEmail);
  };

  return (
    <div className="mail fade-up">
      <code ref={code}>{email}</code>
      <button className="btn" type="button" onClick={copy}>
        {copied ? "Copied" : "Copy email"}
      </button>
    </div>
  );
}
