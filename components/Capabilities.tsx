'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { capabilities } from '@/content/capabilities';
import { dur, ease } from '@/lib/motion';

/**
 * Four verbs, one connected composition. The active verb holds the full
 * width; the others stay as quiet type. No service cards.
 */
export default function Capabilities() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  return (
    <div className="grid-12 gap-y-10">
      <ul className="col-span-4 md:col-span-5">
        {capabilities.map((c, i) => {
          const on = active === i;
          return (
            <li key={c.verb} className="border-t border-rule last:border-b">
              <button
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => !reduced && setActive(i)}
                onFocus={() => setActive(i)}
                aria-pressed={on}
                className="group flex w-full items-center justify-between py-5 text-left"
              >
                <span
                  className={`block text-display transition-[font-stretch,color] duration-base ease-out ${
                    on ? 'wdth-wide text-ink' : 'wdth-tight text-ink-muted'
                  }`}
                >
                  {c.verb}
                </span>
                <span
                  aria-hidden
                  className={`block h-1.5 w-1.5 shrink-0 transition-colors duration-fast ${
                    on ? 'bg-accent' : 'bg-transparent'
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>

      <div className="col-span-4 md:col-span-6 md:col-start-7 md:pt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: dur.fast, ease: ease.out }}
          >
            <p className="max-w-measure-wide text-lead text-ink-soft">{capabilities[active].body}</p>
            <ul className="mt-8 space-y-2">
              {capabilities[active].detail.map((d) => (
                <li key={d} className="meta flex items-center gap-3 border-t border-rule pt-2">
                  <span aria-hidden className="block h-px w-4 bg-accent" />
                  {d}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
