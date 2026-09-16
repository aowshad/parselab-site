'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { timeline } from '@/content/timeline';
import Placeholder from './Placeholder';
import useMediaQuery from '@/lib/useMediaQuery';

/**
 * Company history read left to right while the page scrolls down.
 * Falls back to a plain vertical sequence on small screens and for
 * reduced motion — the content is identical, only the axis changes.
 */
export default function Timeline() {
  const wrap = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const wide = useMediaQuery('(min-width: 768px)');
  const horizontal = wide && !reduced;

  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-72%']);

  const items = timeline.map((m, i) => (
    <li
      key={`${m.year}-${i}`}
      className={
        horizontal
          ? 'relative w-[34vw] max-w-[26rem] shrink-0 border-t border-rule pt-6'
          : 'relative border-t border-rule pt-6'
      }
    >
      <span
        aria-hidden
        className="absolute -top-[3px] left-0 block h-[5px] w-[5px] bg-accent"
      />
      <p className="meta tnum">{m.year}</p>
      <h3 className="mt-4 text-title wdth-tight">{m.title}</h3>
      <p className="mt-3 max-w-measure text-ink-soft">{m.body}</p>
      {m.needsContent && <Placeholder label="real milestone needed" className="mt-4" />}
    </li>
  ));

  if (!horizontal) {
    return <ol className="shell space-y-12">{items}</ol>;
  }

  return (
    <div ref={wrap} style={{ height: `${timeline.length * 46}vh` }}>
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <motion.ol style={{ x }} className="flex gap-10 pl-[var(--gutter)] will-change-transform">
          {items}
        </motion.ol>
      </div>
    </div>
  );
}
