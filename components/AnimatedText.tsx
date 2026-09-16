'use client';

import { motion, useReducedMotion } from 'motion/react';
import { riseLine, viewportOnce } from '@/lib/motion';

type Props = {
  /** One string per visual line. Line breaks are a design decision, so they're explicit. */
  lines: string[];
  className?: string;
  /** Renders as h1 by default; pass a tag to keep heading order correct. */
  as?: 'h1' | 'h2' | 'p' | 'div';
  /** Animate on mount instead of on scroll — for the hero only. */
  onMount?: boolean;
  /** Seconds to wait before the first line moves. */
  lead?: number;
};

export default function AnimatedText({ lines, className = '', as = 'h2', onMount = false, lead = 0 }: Props) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  if (reduced) {
    const Plain = as;
    return (
      <Plain className={className}>
        {lines.map((l, i) => (
          <span key={i} className="block">{l}</span>
        ))}
      </Plain>
    );
  }

  return (
    <Tag
      className={className}
      initial="hidden"
      {...(onMount ? { animate: 'show' } : { whileInView: 'show', viewport: viewportOnce })}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden py-[0.16em] -my-[0.16em]">
          <motion.span className="block" variants={riseLine} custom={i + lead / 0.065}>
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
