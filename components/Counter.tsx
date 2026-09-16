'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';

/* Mirrors tailwind.config.ts theme.extend.colors.{ink,accent} — the hover
   wave writes real CSS colour values via animate(), not utility classes.
   Keep these in sync if those tokens move. */
const INK = '#141414';
const ACCENT = '#FF9933';

/**
 * Count-up that animates the number only — the suffix is static text.
 *
 * Once the count-up settles, hovering the figure sends an ink→accent→ink
 * wave through its characters (numeral + suffix, one colour throughout —
 * see the `text-ink` below). Characters can only be split into spans once
 * the count-up stops re-rendering the number every frame; splitting mid
 * count-up would tear down the spans on every tick.
 */
export default function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const reduced = useReducedMotion();
  const [n, setN] = useState(reduced ? to : 0);
  const [settled, setSettled] = useState(reduced);
  const chars = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (!inView || reduced) return;
    let raf = 0;
    const start = performance.now();
    const ms = 1200;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / ms);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setSettled(true);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, reduced]);

  const canWave = settled && !reduced;

  const handleHoverStart = () => {
    if (!canWave || chars.current.length === 0) return;
    animate(
      chars.current,
      { color: [INK, ACCENT, INK] },
      { duration: 0.15, delay: (i) => Math.floor(i / 2) * 0.05 },
    );
  };

  const text = n.toLocaleString() + suffix;
  chars.current = [];

  return (
    <span ref={ref} onMouseEnter={handleHoverStart} className="tnum text-ink">
      {canWave
        ? text.split('').map((ch, i) => (
            <span
              key={i}
              ref={(node) => {
                if (node) chars.current[i] = node;
              }}
              className="inline-block"
            >
              {ch}
            </span>
          ))
        : text}
    </span>
  );
}
