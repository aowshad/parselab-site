'use client';

import Link from 'next/link';
import { people } from '@/content/team';
import ImageFrame from './ImageFrame';
import Placeholder from './Placeholder';

const ratioFor = { lg: '3 / 4', md: '4 / 5', sm: '1 / 1' } as const;

/**
 * Selected people, sized unequally on purpose. Scrolls horizontally on
 * small screens where a grid would shrink every face to nothing.
 */
export default function PeopleStrip() {
  const selected = people.filter((p) => p.featured).slice(0, 5);

  return (
    <div className="-mx-gutter overflow-x-auto px-gutter pb-2 [scrollbar-width:none] md:mx-0 md:overflow-visible md:px-0">
      <ul className="flex items-end gap-5 md:grid md:grid-cols-12 md:gap-x-6 md:gap-y-12">
        {selected.map((p, i) => {
          const scale = p.scale ?? 'md';
          const span =
            scale === 'lg' ? 'md:col-span-4' : scale === 'md' ? 'md:col-span-3' : 'md:col-span-2';
          const nudge = i % 2 === 1 ? 'md:mt-16' : '';
          return (
            <li
              key={p.id}
              className={`group w-[62vw] shrink-0 xs:w-[46vw] md:w-auto ${span} ${nudge}`}
            >
              <Link href="/teams" className="block">
                <ImageFrame
                  slot={`portrait · ${p.needsContent ? 'unassigned' : p.name}`}
                  src={p.portrait}
                  alt={p.needsContent ? '' : `${p.name}, ${p.role}`}
                  ratio={ratioFor[scale]}
                  hint="3:4 · 900×1200 min"
                  interactive
                  sizes="(max-width: 768px) 60vw, 25vw"
                />
                <div className="mt-3 flex items-baseline justify-between gap-3">
                  <p className="wdth-narrow text-[1.05rem]">
                    {p.needsContent ? <Placeholder label="name" /> : p.name}
                  </p>
                  <span
                    aria-hidden
                    className="meta translate-x-0 text-accent opacity-0 transition-all duration-base ease-out group-hover:translate-x-1 group-hover:opacity-100"
                  >
                    ↗
                  </span>
                </div>
                <p className="meta mt-1">{p.needsContent ? 'role' : p.role}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
