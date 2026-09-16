'use client';

import { useEffect, useState } from 'react';

/**
 * A small analog face per office. Reads faster than a digital string at a
 * glance — you see "middle of their night" without parsing numbers — and it
 * gives the footer something quietly alive without adding motion noise.
 * The minute hand steps once a minute; nothing else animates.
 */
export default function AnalogClock({
  timeZone,
  code,
  label,
  size = 44,
}: {
  timeZone: string;
  code: string;
  label: string;
  size?: number;
}) {
  const [t, setT] = useState<{ h: number; m: number; text: string } | null>(null);

  useEffect(() => {
    const read = () => {
      const parts = new Intl.DateTimeFormat('en-GB', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        timeZone,
      }).formatToParts(new Date());
      const h = Number(parts.find((p) => p.type === 'hour')?.value ?? 0);
      const m = Number(parts.find((p) => p.type === 'minute')?.value ?? 0);
      setT({ h, m, text: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}` });
    };
    read();
    const id = setInterval(read, 20_000);
    return () => clearInterval(id);
  }, [timeZone]);

  const r = 50;
  const minuteAngle = t ? t.m * 6 : 0;
  const hourAngle = t ? ((t.h % 12) + (t.m / 60)) * 30 : 0;
  // Between 21:00 and 07:00 local, dim the face — it says "asleep" without a label.
  const night = t ? t.h >= 21 || t.h < 7 : false;

  return (
    <div className="flex items-center gap-3">
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className={`shrink-0 transition-opacity duration-base ${night ? 'opacity-45' : 'opacity-100'}`}
        role="img"
        aria-label={`${label}: ${t?.text ?? 'loading'} local time`}
      >
        <circle cx={r} cy={r} r={r - 1} fill="none" stroke="currentColor" strokeWidth={1.5} className="text-paper/25" />
        {/* 12, 3, 6, 9 ticks only — a full dial would be fussy at this size */}
        {[0, 90, 180, 270].map((a) => (
          <line
            key={a}
            x1={r} y1={6} x2={r} y2={12}
            stroke="currentColor" strokeWidth={1.5}
            className="text-paper/30"
            transform={`rotate(${a} ${r} ${r})`}
          />
        ))}
        <line
          x1={r} y1={r} x2={r} y2={26}
          stroke="currentColor" strokeWidth={3} strokeLinecap="square"
          className="text-paper"
          transform={`rotate(${hourAngle} ${r} ${r})`}
          style={{ transition: 'transform 600ms cubic-bezier(0.16,1,0.3,1)' }}
        />
        <line
          x1={r} y1={r} x2={r} y2={14}
          stroke="currentColor" strokeWidth={1.5} strokeLinecap="square"
          className="text-accent"
          transform={`rotate(${minuteAngle} ${r} ${r})`}
          style={{ transition: 'transform 600ms cubic-bezier(0.16,1,0.3,1)' }}
        />
        <circle cx={r} cy={r} r={2.5} className="fill-paper" />
      </svg>

      <div className="min-w-0">
        <p className="wdth-narrow text-nav leading-none text-paper">{code}</p>
        <p className="meta tnum mt-1.5 leading-none">{t?.text ?? '--:--'}</p>
      </div>
    </div>
  );
}
