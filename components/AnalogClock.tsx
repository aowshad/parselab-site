'use client';

import { useEffect, useState } from 'react';

/**
 * One office in the footer: a live dial beside its name and local time.
 * Every office gets the same dial size — the head office is distinguished by
 * its accent tag, not by scale, since a larger clock would wrongly imply its
 * *time* matters more. No night dimming: a half-opacity clock reads as broken
 * data long before it reads as "it is night there".
 */
export default function AnalogClock({
  timeZone,
  name,
  utc,
  tag,
  size = 68,
}: {
  timeZone: string;
  name: string;
  utc: string;
  /** e.g. "Head office" — rendered in accent above the name. */
  tag?: string;
  size?: number;
}) {
  const [t, setT] = useState<{ h: number; m: number; s: number; text: string } | null>(null);

  useEffect(() => {
    const read = () => {
      const parts = new Intl.DateTimeFormat('en-GB', {
        hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false, timeZone,
      }).formatToParts(new Date());
      const g = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
      const h = g('hour'), m = g('minute'), s = g('second');
      setT({ h, m, s, text: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}` });
    };
    read();
    const id = setInterval(read, 1000);
    return () => clearInterval(id);
  }, [timeZone]);

  const r = 50;
  const sec = t ? t.s * 6 : 0;
  const min = t ? (t.m + t.s / 60) * 6 : 0;
  const hour = t ? ((t.h % 12) + t.m / 60) * 30 : 0;

  return (
    <div className="flex items-stretch gap-4">
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="shrink-0 self-center"
        role="img"
        aria-label={`${name}: ${t?.text ?? 'loading'} local time`}
      >
        <circle cx={r} cy={r} r={48} fill="none" stroke="currentColor" strokeWidth={1.5} className="text-rule" />
        {[0, 90, 180, 270].map((a) => (
          <line key={a} x1={r} y1={5} x2={r} y2={12} stroke="currentColor" strokeWidth={1.5}
                className="text-ink-muted" transform={`rotate(${a} ${r} ${r})`} />
        ))}
        <line x1={r} y1={r} x2={r} y2={29} stroke="currentColor" strokeWidth={3} strokeLinecap="square"
              className="text-ink" transform={`rotate(${hour} ${r} ${r})`} />
        <line x1={r} y1={r} x2={r} y2={16} stroke="currentColor" strokeWidth={1.75} strokeLinecap="square"
              className="text-ink-soft" transform={`rotate(${min} ${r} ${r})`} />
        <line x1={r} y1={57} x2={r} y2={12} stroke="currentColor" strokeWidth={1} strokeLinecap="square"
              className="text-accent" transform={`rotate(${sec} ${r} ${r})`} />
        <rect x={47.5} y={47.5} width={5} height={5} className="fill-ink" />
      </svg>

      <div className="flex flex-col justify-center">
        {tag && <span className="meta mb-1 block text-accent-ink">{tag}</span>}
        <span className="text-[1.125rem] wdth-narrow leading-[1.25]">{name}</span>
        <span className="meta tnum mt-1">
          {t?.text ?? '--:--'} · {utc}
        </span>
      </div>
    </div>
  );
}
