'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { process } from '@/content/timeline';
import { dur, ease } from '@/lib/motion';

/**
 * The working loop. Deliberately a loop, not an arrow diagram — the last
 * step is the input to the first, and the layout says so.
 */
export default function ProcessLoop() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  return (
    <div>
      <ol className="relative flex flex-wrap gap-x-8 gap-y-4 border-t border-rule pt-6">
        {process.map((s, i) => (
          <li key={s.step}>
            <button
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => !reduced && setActive(i)}
              onFocus={() => setActive(i)}
              aria-pressed={active === i}
              className={`relative py-1 text-title wdth-tight transition-colors duration-fast ${
                active === i ? 'text-ink' : 'text-ink-muted hover:text-ink-soft'
              }`}
            >
              {s.step}
              {active === i && (
                <motion.span
                  layoutId="process-underline"
                  aria-hidden
                  className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-accent"
                  transition={{ duration: dur.base, ease: ease.out }}
                />
              )}
            </button>
          </li>
        ))}
        <li aria-hidden className="meta self-center text-accent">↺ back to listening</li>
      </ol>

      <div className="mt-10 min-h-[8rem] max-w-measure-wide">
        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: dur.fast, ease: ease.out }}
            className="text-lead text-ink-soft"
          >
            {process[active].body}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
