'use client';

import { useState } from 'react';

/** Copy button beside the office address. Falls back silently — the mailto
 *  link next to it still works if the clipboard API is blocked. */
export default function CopyEmail({ email }: { email: string }) {
  const [done, setDone] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(email);
            setDone(true);
            setTimeout(() => setDone(false), 1600);
          } catch { /* clipboard unavailable */ }
        }}
        aria-label={`Copy ${email}`}
        className="ml-0.5 inline-flex h-11 w-11 -my-3 items-center justify-center align-middle text-ink-muted transition-colors duration-fast hover:text-accent-ink"
      >
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.25} aria-hidden>
          <rect x="5.5" y="5.5" width="8" height="8" />
          <path d="M10.5 5.5V2.5h-8v8h3" />
        </svg>
      </button>
      <span
        role="status"
        className={`meta ml-1 text-accent-ink transition-opacity duration-fast ${done ? 'opacity-100' : 'opacity-0'}`}
      >
        {done ? 'Copied' : ''}
      </span>
    </>
  );
}
