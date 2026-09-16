'use client';

import { useReducedMotion } from 'motion/react';

/* ---------------------------------------------------------------------------
   Four figures for Design / Build / Run / Support.

   Rules that keep them a system rather than four drawings:
   · same 400×300 box, same 1.25 stroke, same implied grid
   · ink hairlines carry the structure; accent marks exactly one thing per figure
   · they draw themselves on when their capability becomes active (pathLength=1,
     so no measuring), staggered in reading order
   · only "Run" has idle motion, because only "Run" is about something ongoing

   Not icons. Each one says something specific about the work:
   Design — one surface, many possible configurations
   Build  — separate parts resolving into a single product
   Run    — a closed loop that keeps going
   Support— a message comes in, something changes on the way out
--------------------------------------------------------------------------- */

type Props = { id: string; className?: string };

const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.25, pathLength: 1 } as const;

export default function CapabilityFigure({ id, className = '' }: Props) {
  const reduced = useReducedMotion();
  const draw = reduced ? '' : 'pl-draw';

  return (
    <div className={`relative w-full ${className}`} style={{ aspectRatio: '4 / 3' }}>
      <svg
        viewBox="0 0 400 300"
        className="absolute inset-0 h-full w-full text-ink/45"
        aria-hidden
      >
        {id === 'design' && (
          <g>
            {/* the alternate configuration, sitting behind */}
            <rect {...S} x={94} y={58} width={228} height={150} strokeDasharray="4 6" className={`text-ink/20 ${draw}`} style={{ animationDelay: '0ms' }} />
            {/* the surface */}
            <rect {...S} x={78} y={78} width={228} height={150} className={draw} style={{ animationDelay: '90ms' }} />
            {/* the decisions inside it */}
            <line {...S} x1={104} y1={120} x2={244} y2={120} className={draw} style={{ animationDelay: '220ms' }} />
            <line {...S} x1={104} y1={153} x2={196} y2={153} className={draw} style={{ animationDelay: '300ms' }} />
            <line {...S} x1={104} y1={186} x2={272} y2={186} className={draw} style={{ animationDelay: '380ms' }} />
            {/* handles — one of them is the choice being made */}
            <rect x={74} y={74} width={8} height={8} className="fill-ink/45" />
            <rect x={302} y={74} width={8} height={8} className="fill-ink/45" />
            <rect x={74} y={224} width={8} height={8} className="fill-ink/45" />
            <rect x={300} y={222} width={12} height={12} className="fill-accent" />
          </g>
        )}

        {id === 'build' && (
          <g>
            {[86, 140, 194].map((y, i) => (
              <rect key={y} {...S} x={64} y={y} width={72} height={40} className={draw} style={{ animationDelay: `${i * 90}ms` }} />
            ))}
            {[106, 160, 214].map((y, i) => (
              <path
                key={y}
                {...S}
                d={`M136 ${y} H182 V150 H222`}
                className={draw}
                style={{ animationDelay: `${300 + i * 80}ms` }}
              />
            ))}
            <rect {...S} x={226} y={104} width={104} height={92} className={draw} style={{ animationDelay: '560ms' }} />
            <rect x={218} y={144} width={12} height={12} className="fill-accent" />
          </g>
        )}

        {id === 'run' && (
          <g>
            <path
              {...S}
              id="pl-run-loop"
              d="M96 96 H304 V204 H96 Z"
              className={draw}
              style={{ animationDelay: '0ms' }}
            />
            {/* stubs — the loop is connected to things outside itself */}
            <line {...S} x1={96} y1={150} x2={56} y2={150} className={draw} style={{ animationDelay: '260ms' }} />
            <line {...S} x1={304} y1={150} x2={344} y2={150} className={draw} style={{ animationDelay: '320ms' }} />
            <rect x={50} y={144} width={11} height={11} className="fill-ink/45" />
            <rect x={339} y={144} width={11} height={11} className="fill-ink/45" />
            {/* the thing that keeps going */}
            <path
              d="M96 96 H304 V204 H96 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="square"
              pathLength={1}
              strokeDasharray="0.06 0.94"
              className={`text-accent ${reduced ? '' : 'pl-travel'}`}
            />
          </g>
        )}

        {id === 'support' && (
          <g>
            {/* what arrives */}
            <path {...S} d="M48 108 H120" className={draw} style={{ animationDelay: '0ms' }} />
            <path {...S} d="M48 132 H98" className={draw} style={{ animationDelay: '70ms' }} />
            <path {...S} d="M48 156 H112" className={draw} style={{ animationDelay: '140ms' }} />
            {/* where it lands */}
            <rect {...S} x={148} y={86} width={104} height={128} className={draw} style={{ animationDelay: '260ms' }} />
            <line {...S} x1={148} y1={132} x2={252} y2={132} className={draw} style={{ animationDelay: '380ms' }} />
            <line {...S} x1={148} y1={170} x2={252} y2={170} className={draw} style={{ animationDelay: '440ms' }} />
            {/* what changes because of it */}
            <path {...S} d="M252 196 H306 V240" className={draw} style={{ animationDelay: '560ms' }} />
            <rect x={300} y={240} width={12} height={12} className="fill-accent" />
          </g>
        )}
      </svg>

      <style jsx>{`
        :global(.pl-draw) {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: plDraw 900ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes plDraw {
          to { stroke-dashoffset: 0; }
        }
        :global(.pl-travel) {
          animation: plTravel 9s linear infinite;
        }
        @keyframes plTravel {
          from { stroke-dashoffset: 1; }
          to { stroke-dashoffset: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.pl-draw) { animation: none; stroke-dasharray: none; stroke-dashoffset: 0; }
          :global(.pl-travel) { animation: none; }
        }
      `}</style>
    </div>
  );
}
