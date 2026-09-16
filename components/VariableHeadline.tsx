'use client';

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { riseLine } from '@/lib/motion';

type Props = {
  /** One string per visual line — line breaks stay a design decision. */
  lines: string[];
  className?: string;
  /** Seconds before the first line moves. */
  lead?: number;
  /** Width axis to hold while weight animates (matches .wdth-tight). */
  width?: number;
  /** Resting and peak values on the weight axis. */
  weight?: [number, number];
  /** Falloff radius in px. */
  radius?: number;
};

/**
 * The hero headline responds to the cursor on Archivo's weight axis: letters
 * near the pointer thicken, the effect falls away smoothly with distance.
 *
 * Why this and not a CSS hover: hover is binary and per-element. A continuous
 * distance falloff across every glyph is what makes it read as the type
 * reacting to you rather than a button lighting up.
 *
 * Cost: one rect read and N style writes per frame, N being the character
 * count (~40). No React state, no re-renders. Off entirely for reduced motion.
 */
export default function VariableHeadline({
  lines,
  className = '',
  lead = 0,
  width = 84,
  weight = [400, 780],
  radius = 170,
}: Props) {
  const root = useRef<HTMLHeadingElement>(null);
  const chars = useRef<HTMLSpanElement[]>([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !root.current) return;
    const el = root.current;
    const [base, peak] = weight;

    /* Character centres, cached relative to the heading box. */
    let spots: { x: number; y: number; el: HTMLSpanElement; w: number }[] = [];
    const measure = () => {
      const r = el.getBoundingClientRect();
      spots = chars.current.filter(Boolean).map((c) => {
        const b = c.getBoundingClientRect();
        return { x: b.left - r.left + b.width / 2, y: b.top - r.top + b.height / 2, el: c, w: base };
      });
    };

    /* Measured after the line reveal settles, and on resize. */
    const t = window.setTimeout(measure, 1500);
    const ro = new ResizeObserver(measure);
    ro.observe(el);

    let mx = -9999;
    let my = -9999;
    let active = false;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
      active = true;
    };
    const onLeave = () => { active = false; };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);

    let raf = 0;
    const frame = () => {
      for (const s of spots) {
        let target = base;
        if (active) {
          const d = Math.hypot(s.x - mx, s.y - my);
          if (d < radius) {
            const f = 1 - d / radius;
            target = base + (peak - base) * f * f; // squared falloff — tighter pool of weight
          }
        }
        s.w += (target - s.w) * 0.16; // lerp, so the effect trails the cursor slightly
        s.el.style.fontVariationSettings = `"wght" ${s.w.toFixed(0)}, "wdth" ${width}`;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, [reduced, weight[0], weight[1], width, radius]);

  if (reduced) {
    return (
      <h1 className={className} style={{ fontStretch: `${width}%` }}>
        {lines.map((l, i) => (
          <span key={i} className="block">{l}</span>
        ))}
      </h1>
    );
  }

  chars.current = [];
  let n = 0;

  return (
    <h1 ref={root} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden py-[0.16em] -my-[0.16em]">
          <motion.span
            className="block"
            variants={riseLine}
            custom={i + lead / 0.065}
            initial="hidden"
            animate="show"
          >
            {/* Split per word so wrapping still breaks between words, then per
                character so each glyph can carry its own weight. */}
            {line.split(' ').map((word, wi, arr) => (
              <span key={wi} className="inline-block whitespace-nowrap">
                {word.split('').map((ch, ci) => (
                  <span
                    key={ci}
                    ref={(node) => { if (node) chars.current[n++] = node; }}
                    className="inline-block will-change-[font-variation-settings]"
                    style={{ fontVariationSettings: `"wght" ${weight[0]}, "wdth" ${width}` }}
                  >
                    {ch}
                  </span>
                ))}
                {wi < arr.length - 1 && '\u00A0'}
              </span>
            ))}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
