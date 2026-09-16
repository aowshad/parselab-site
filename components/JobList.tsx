'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { roles, noOpenRoles } from '@/content/careers';
import Placeholder from './Placeholder';
import { dur, ease } from '@/lib/motion';

export default function JobList() {
  const [open, setOpen] = useState<string | null>(null);
  const reduced = useReducedMotion();

  if (noOpenRoles) {
    return (
      <div className="border-y border-rule py-12">
        <p className="max-w-measure-wide text-lead text-ink-soft">
          No open roles right now. We still read every note — tell us what you build and we will
          come back to you when something opens.
        </p>
        <Link
          href="/contact"
          className="group mt-8 inline-flex items-baseline gap-2 border-b border-rule pb-1 text-[1.05rem] wdth-narrow transition-colors hover:border-accent"
        >
          Write to us
          <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-1">→</span>
        </Link>
        <Placeholder label="set noOpenRoles to false in content/careers.ts once roles exist" className="mt-8" />
      </div>
    );
  }

  return (
    <ul className="border-t border-rule">
      {roles.map((r) => {
        const on = open === r.slug;
        return (
          <li key={r.slug} className="border-b border-rule">
            <button
              type="button"
              aria-expanded={on}
              aria-controls={`role-${r.slug}`}
              onClick={() => setOpen(on ? null : r.slug)}
              className="group grid w-full grid-cols-4 items-baseline gap-4 py-6 text-left md:grid-cols-12"
            >
              <span className="col-span-3 md:col-span-5">
                <span className="block text-title wdth-tight transition-transform duration-base ease-out group-hover:translate-x-2">
                  {r.needsContent ? <Placeholder label="[ADD ROLE]" /> : r.title}
                </span>
              </span>
              <span className="meta col-span-1 hidden md:col-span-3 md:block">{r.department}</span>
              <span className="meta col-span-2 hidden md:col-span-2 md:block">{r.location}</span>
              <span className="meta col-span-4 flex items-center justify-end gap-3 md:col-span-2">
                {r.type}
                <span aria-hidden className={`transition-transform duration-fast ${on ? 'rotate-90 text-accent' : ''}`}>→</span>
              </span>
            </button>

            <AnimatePresence initial={false}>
              {on && (
                <motion.div
                  id={`role-${r.slug}`}
                  initial={reduced ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduced ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: dur.base, ease: ease.inOut }}
                  className="overflow-hidden"
                >
                  <div className="grid-12 pb-10">
                    <div className="col-span-4 md:col-span-6 md:col-start-6">
                      <p className="text-ink-soft">{r.summary ?? 'Paste the role summary into content/careers.ts.'}</p>
                      <Link
                        href={`/careers/${r.slug}`}
                        className="group mt-6 inline-flex items-baseline gap-2 border-b border-rule pb-1 wdth-narrow transition-colors hover:border-accent"
                      >
                        Full description
                        <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-1">→</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
