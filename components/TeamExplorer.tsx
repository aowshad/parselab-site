'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react';
import { disciplines, people } from '@/content/team';
import ImageFrame from './ImageFrame';
import Placeholder from './Placeholder';
import { dur, ease } from '@/lib/motion';

const ratioFor = { lg: '3 / 4', md: '4 / 5', sm: '1 / 1' } as const;
const spanFor = { lg: 'md:col-span-5', md: 'md:col-span-4', sm: 'md:col-span-3' } as const;

export default function TeamExplorer() {
  const [filter, setFilter] = useState<string>('all');
  const reduced = useReducedMotion();

  const shown = useMemo(
    () => (filter === 'all' ? people : people.filter((p) => p.discipline === filter)),
    [filter],
  );

  const current = disciplines.find((d) => d.id === filter);

  return (
    <div>
      {/* Filter — a discipline switch, not a pill bar. */}
      <div role="group" aria-label="Filter by discipline" className="flex flex-wrap gap-x-7 gap-y-3 border-b border-rule pb-5">
        <LayoutGroup id="team-filter">
          {[{ id: 'all', name: 'Everyone' }, ...disciplines].map((d) => {
            const on = filter === d.id;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setFilter(d.id)}
                aria-pressed={on}
                className={`relative py-1 text-[1.05rem] wdth-narrow transition-colors duration-fast ${
                  on ? 'text-ink' : 'text-ink-muted hover:text-ink-soft'
                }`}
              >
                {d.name}
                {on && (
                  <motion.span
                    layoutId="team-filter-underline"
                    aria-hidden
                    className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-accent"
                    transition={{ duration: dur.base, ease: ease.out }}
                  />
                )}
              </button>
            );
          })}
        </LayoutGroup>
      </div>

      {/* Discipline description swaps with the filter. */}
      <div className="min-h-[5.5rem] pt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: dur.fast, ease: ease.out }}
            className="grid-12 gap-y-4"
          >
            <p className="col-span-4 max-w-measure-wide text-lead text-ink-soft md:col-span-7">
              {current ? current.blurb : 'Everyone in the studio, across every discipline.'}
            </p>
            <p className="meta tnum col-span-4 self-end md:col-span-2 md:col-start-11 md:text-right">
              {shown.length} {shown.length === 1 ? 'person' : 'people'}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Grid — sizes vary by editorial weight, alignment stays on the grid. */}
      <motion.ul layout className="mt-12 grid-12 gap-y-14">
        <AnimatePresence mode="popLayout">
          {shown.map((p, i) => {
            const scale = p.scale ?? 'md';
            return (
              <motion.li
                key={p.id}
                layout={!reduced}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: dur.base, ease: ease.out, delay: reduced ? 0 : i * 0.035 }}
                className={`group col-span-2 ${spanFor[scale]} ${i % 3 === 1 ? 'md:mt-16' : ''}`}
              >
                <ImageFrame
                  slot={p.needsContent ? 'portrait · unassigned' : `portrait · ${p.name}`}
                  src={p.portrait}
                  alt={p.needsContent ? '' : `${p.name}, ${p.role}`}
                  ratio={ratioFor[scale]}
                  hint="3:4 · 900×1200 min"
                  interactive
                  sizes="(max-width: 768px) 46vw, 30vw"
                />
                <div className="mt-3 border-t border-rule pt-3">
                  <p className="wdth-narrow text-[1.05rem]">
                    {p.needsContent ? <Placeholder label="name" /> : p.name}
                  </p>
                  <p className="meta mt-1">{p.needsContent ? 'role' : p.role}</p>
                  {p.note && (
                    <p className="mt-3 max-h-0 max-w-measure overflow-hidden text-[0.95rem] text-ink-soft opacity-0 transition-all duration-base ease-out group-hover:max-h-24 group-hover:opacity-100 group-focus-within:max-h-24 group-focus-within:opacity-100">
                      {p.note}
                    </p>
                  )}
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
