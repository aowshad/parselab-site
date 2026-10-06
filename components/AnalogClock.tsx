'use client';

import { useEffect, useState } from 'react';

/* The face is white in both themes, so these are fixed colours, not tokens. */
const FACE = '#F5F5F7';
const INK = '#1C1C1E';
const ORANGE = '#FF9933'; // accent

/* Rounded so the server and the browser print identical coordinates — raw
   Math.sin/cos differ in the last digit between engines and break hydration. */
const NUMERALS = Array.from({ length: 12 }, (_, i) => {
  const n = i + 1;
  const a = (n * 30 * Math.PI) / 180;
  return {
    n,
    x: Math.round((50 + 37.5 * Math.sin(a)) * 100) / 100,
    y: Math.round((50 - 37.5 * Math.cos(a)) * 100) / 100,
  };
});

/**
 * One office in the footer: a live dial beside its name and local time.
 * The dial follows the iOS clock face: a white disc, bold numerals, thick
 * rounded black hands and an orange second hand with a short tail. The colours
 * are fixed rather than theme tokens so the white face survives the dark footer.
 * Every office gets the same dial size — the head office is distinguished by
 * its accent tag, not by scale, since a larger clock would wrongly imply its
 * *time* matters more.
 */
export default function AnalogClock({
  timeZone,
  name,
  utc,
  tag,
  size = 84,
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
        <circle cx={50} cy={50} r={49} fill={FACE} />
        {NUMERALS.map(({ n, x, y }) => {
          return (
            <text
              key={n}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={11.5}
              fontWeight={600}
              fill={INK}
              style={{ fontFamily: 'var(--font-archivo), ui-sans-serif, system-ui, sans-serif' }}
            >
              {n}
            </text>
          );
        })}
        <line x1={50} y1={53.5} x2={50} y2={26} stroke={INK} strokeWidth={4.4} strokeLinecap="round"
              transform={`rotate(${hour} 50 50)`} />
        <line x1={50} y1={53.5} x2={50} y2={9} stroke={INK} strokeWidth={4.4} strokeLinecap="round"
              transform={`rotate(${min} 50 50)`} />
        <line x1={50} y1={56} x2={50} y2={5} stroke={ORANGE} strokeWidth={1.6} strokeLinecap="butt"
              transform={`rotate(${sec} 50 50)`} />
        <circle cx={50} cy={50} r={3.3} fill={ORANGE} />
        <circle cx={50} cy={50} r={1.2} fill={FACE} />
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
