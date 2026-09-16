'use client';

import { marquee } from '@/content/site';

/**
 * A quiet band of what we do, on a loop. Deliberately set below heading scale
 * and in ink-soft — it is ambient, and should never outrank the navigation
 * beneath it. Two identical runs translating -50% make the loop seamless;
 * the edges are masked so it fades rather than cutting at the container.
 */
export default function Marquee() {
  const run = (key: string) => (
    <span key={key} className="flex shrink-0" aria-hidden>
      {marquee.map((word) => (
        <span
          key={word}
          className="flex shrink-0 items-center gap-6 whitespace-nowrap pr-6 text-[clamp(1.35rem,2.6vw,2.15rem)] wdth-narrow leading-[1.1] tracking-[-0.02em] text-ink-soft"
        >
          {word}
          <span className="block h-1.5 w-1.5 shrink-0 bg-accent" />
        </span>
      ))}
    </span>
  );

  return (
    <div
      className="pl-band overflow-hidden border-y border-rule py-[clamp(1.1rem,2.2vw,1.6rem)]"
      style={{
        WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
        maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
      }}
    >
      <div className="pl-track flex w-max">
        {run('a')}
        {run('b')}
      </div>
      <style jsx>{`
        .pl-track { animation: plSlide 52s linear infinite; }
        .pl-band:hover .pl-track { animation-play-state: paused; }
        @keyframes plSlide {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .pl-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
