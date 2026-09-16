'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { disciplines, people, departmentsNeedConfirmation } from '@/content/team';
import ImageFrame from './ImageFrame';
import Placeholder from './Placeholder';
import { dur, ease } from '@/lib/motion';

/**
 * The organisation as a living list. Selecting a team changes the
 * representative visual and the description, not the whole layout.
 */
export default function TeamsOverview() {
  const [active, setActive] = useState(disciplines[0].id);
  const reduced = useReducedMotion();
  const team = disciplines.find((d) => d.id === active)!;
  const count = people.filter((p) => p.discipline === active).length;

  return (
    <div>
      {departmentsNeedConfirmation && (
        <Placeholder label="confirm these team names against the real org chart" className="mb-8" />
      )}

      <div className="grid-12 gap-y-10">
        <ul className="col-span-4 md:col-span-6">
          {disciplines.map((d) => {
            const on = d.id === active;
            return (
              <li key={d.id} className="border-t border-rule last:border-b">
                <button
                  type="button"
                  onClick={() => setActive(d.id)}
                  onMouseEnter={() => !reduced && setActive(d.id)}
                  onFocus={() => setActive(d.id)}
                  aria-pressed={on}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left"
                >
                  <span
                    className={`text-title transition-[font-stretch,color] duration-base ease-out ${
                      on ? 'wdth-narrow text-ink' : 'wdth-tight text-ink-muted'
                    }`}
                  >
                    {d.name}
                  </span>
                  <span
                    aria-hidden
                    className={`h-1.5 w-1.5 shrink-0 transition-colors duration-fast ${on ? 'bg-accent' : 'bg-transparent'}`}
                  />
                </button>
              </li>
            );
          })}
        </ul>

        <div className="col-span-4 md:col-span-5 md:col-start-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={team.id}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: dur.fast, ease: ease.out }}
            >
              <ImageFrame
                slot={`${team.name} · team at work`}
                ratio="4 / 3"
                hint="candid team photo · 1600×1200"
                sizes="(max-width: 768px) 100vw, 38vw"
              />
              <p className="mt-6 max-w-measure text-lead text-ink-soft">{team.blurb}</p>
              <p className="meta mt-4 tnum">
                {team.count ?? count} {(team.count ?? count) === 1 ? 'person' : 'people'} listed
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
