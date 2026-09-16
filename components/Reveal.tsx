'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
import { fadeUp, wipe, viewportOnce } from '@/lib/motion';

type Props = {
  children: ReactNode;
  /** 'wipe' is the signature clip-path move; 'rise' is the quiet default. */
  as?: 'wipe' | 'rise';
  delay?: number;
  className?: string;
};

/**
 * Single reveal primitive. Every scroll-in on the site goes through here,
 * which is what keeps the motion system coherent instead of ad hoc.
 */
export default function Reveal({ children, as = 'rise', delay = 0, className }: Props) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={as === 'wipe' ? wipe : fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  );
}
