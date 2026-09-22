'use client';

/* Homepage-only. The full studio on an infinite marquee, mirroring
   components/Marquee.tsx's loop mechanic. /teams uses TeamExplorer (the
   filterable, editorial grid) — do not consolidate the two later. */

import Link from 'next/link';
import { useReducedMotion } from 'motion/react';
import { people } from '@/content/team';
import ImageFrame from './ImageFrame';

function Card({ hidden = false }: { hidden?: boolean }) {
  return (
    <>
      {people.map((p) => (
        <li key={p.id} className="w-[210px] shrink-0">
          <Link
            href="/teams"
            className="group block"
            aria-hidden={hidden || undefined}
            tabIndex={hidden ? -1 : undefined}
          >
            <ImageFrame
              slot={`portrait · ${p.name}`}
              src={p.portrait}
              alt={`${p.name}, ${p.role}`}
              ratio="3 / 4"
              hint="3:4 · 900×1200 min"
              interactive
              hoverScale={1.02}
              sizes="210px"
            />
            <div className="mt-3 flex items-start gap-2.5 border-t border-rule pt-3">
              <span
                aria-hidden
                className="mt-2 block h-2 w-2 shrink-0 bg-rule transition-colors duration-fast group-hover:bg-accent"
              />
              <div>
                <p className="text-[1.0625rem] wdth-narrow leading-tight">{p.name}</p>
                <p className="mt-1 font-mono text-[0.8125rem] text-ink-muted">{p.role}</p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </>
  );
}

export default function PeopleStrip() {
  const reduced = useReducedMotion();

  return (
    <div className="relative left-1/2 right-1/2 w-screen -mx-[50vw]">
      {reduced ? (
        <ul className="flex gap-8 overflow-x-auto px-gutter pb-2 [scrollbar-width:none]">
          <Card />
        </ul>
      ) : (
        <div
          className="pl-band overflow-hidden"
          style={{
            WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
            maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
          }}
        >
          <ul className="pl-track flex w-max gap-8">
            <Card />
            <Card hidden />
          </ul>
          <style jsx>{`
            .pl-track { animation: plSlide 90s linear infinite; }
            .pl-band:hover .pl-track { animation-play-state: paused; }
            @keyframes plSlide {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
