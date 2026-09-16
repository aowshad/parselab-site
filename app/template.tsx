'use client';

import { motion, useReducedMotion } from 'motion/react';
import { dur, ease } from '@/lib/motion';

/**
 * Page transition. No colour wash — a full-bleed accent panel on every
 * navigation reads as a loading screen, which is exactly what a fast static
 * site should never look like. This is a short opacity settle and nothing more.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: dur.fast, ease: ease.out }}
    >
      {children}
    </motion.div>
  );
}
