'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { founder } from '@/content/about';
import ImageFrame from './ImageFrame';
import Placeholder from './Placeholder';
import { dur, ease } from '@/lib/motion';

/**
 * The founder story as four beats you move through, not a CEO profile.
 * The portrait stays; the story changes beside it.
 */
export default function FounderStory() {
  const [beat, setBeat] = useState(0);
  const reduced = useReducedMotion();

  return (
    <div className="grid-12 gap-y-12">
      <div className="col-span-4 md:col-span-5">
        <ImageFrame
          slot="founder · portrait"
          src={founder.portrait}
          alt={founder.needsContent ? '' : `${founder.name}, ${founder.role}`}
          ratio="3 / 4"
          hint="large portrait · 1400×1866"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
        <div className="mt-5 border-t border-rule pt-4">
          <p className="wdth-narrow text-[1.05rem]">
            {founder.needsContent ? <Placeholder label="[ADD FOUNDER NAME]" /> : founder.name}
          </p>
          <p className="meta mt-1">{founder.role}</p>
        </div>
      </div>

      <div className="col-span-4 md:col-span-6 md:col-start-7">
        <blockquote className="border-b border-rule pb-10">
          <p className="wdth-tight text-display">
            {founder.needsContent ? <Placeholder label="[ADD FOUNDER STATEMENT]" /> : `“${founder.pullQuote}”`}
          </p>
        </blockquote>

        <ol className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
          {founder.beats.map((b, i) => (
            <li key={b.label}>
              <button
                type="button"
                onClick={() => setBeat(i)}
                onMouseEnter={() => !reduced && setBeat(i)}
                onFocus={() => setBeat(i)}
                aria-pressed={beat === i}
                className={`relative py-1 text-[1.05rem] wdth-narrow transition-colors duration-fast ${
                  beat === i ? 'text-ink' : 'text-ink-muted hover:text-ink-soft'
                }`}
              >
                {b.label}
                {beat === i && (
                  <motion.span
                    layoutId="founder-beat"
                    aria-hidden
                    className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-accent"
                    transition={{ duration: dur.base, ease: ease.out }}
                  />
                )}
              </button>
            </li>
          ))}
        </ol>

        <div className="mt-8 min-h-[9rem]">
          <AnimatePresence mode="wait">
            <motion.p
              key={beat}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: dur.fast, ease: ease.out }}
              className="max-w-measure-wide text-lead text-ink-soft"
            >
              {founder.beats[beat].body}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="mt-10 border-t border-rule pt-6">
          <p className="meta mb-3">Philosophy</p>
          <p className="max-w-measure-wide text-ink-soft">{founder.philosophy}</p>
        </div>
      </div>
    </div>
  );
}
