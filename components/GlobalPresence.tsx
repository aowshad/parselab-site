'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { offices } from '@/content/offices';
import { WORLD, project } from '@/content/world';
import LocalTime from './LocalTime';
import Placeholder from './Placeholder';
import { dur, ease } from '@/lib/motion';
import useMediaQuery from '@/lib/useMediaQuery';

const W = 1000;
const H = WORLD.height;
const CELL = W / WORLD.cols;
const DOT = CELL * 0.42;

/** Expands the packed land mask into grid coordinates, once. */
function decode(): [number, number][] {
  const pts: [number, number][] = [];
  WORLD.mask.forEach((hex, r) => {
    for (let i = 0; i < hex.length; i++) {
      const nibble = parseInt(hex[i], 16);
      for (let b = 0; b < 4; b++) {
        if (nibble & (1 << (3 - b))) {
          const c = i * 4 + b;
          if (c < WORLD.cols) pts.push([(c + 0.5) * CELL, (r + 0.5) * (H / WORLD.rows)]);
        }
      }
    }
  });
  return pts;
}

/** One path string covering many squares — a single DOM node for 3,000+ dots. */
const toPath = (pts: [number, number][], s = DOT) =>
  pts.map(([x, y]) => `M${(x - s / 2).toFixed(1)} ${(y - s / 2).toFixed(1)}h${s.toFixed(1)}v${s.toFixed(1)}h-${s.toFixed(1)}z`).join('');

export default function GlobalPresence() {
  const [active, setActive] = useState(offices[0].id);
  /* The land field is ~23 KB of path data. It is built on the client rather
     than shipped in the server HTML — this section sits well below the fold on
     every page that uses it, so nobody ever sees it arrive. */
  const [drawn, setDrawn] = useState(false);
  useEffect(() => setDrawn(true), []);
  const reduced = useReducedMotion();
  const office = offices.find((o) => o.id === active)!;
  const wide = useMediaQuery('(min-width: 768px)');

  /* Full world on desktop. On phones the whole globe at 320px leaves the three
     offices as a smudge, so we crop to the band that contains them. */
  const view = wide
    ? { x: 0, y: 0, w: W, h: H }
    : { x: 175, y: 55, w: 640, h: 270 };

  const points = useMemo(
    () => Object.fromEntries(offices.map((o) => [o.id, project(o.lat, o.lng)])),
    [],
  );

  /* The land field is drawn once and never changes. Selection is expressed by
     the pin alone — lighting a region as well was two signals for one state. */
  const basePath = useMemo(() => (drawn ? toPath(decode()) : ''), [drawn]);

  const activePt = points[active];

  return (
    <div className="grid-12 gap-y-12">
      {/* ── Map ─────────────────────────────────────────────── */}
      <div className="col-span-4 md:col-span-7">
        <div className="relative w-full" style={{ aspectRatio: `${view.w} / ${view.h}` }}>
          <svg
            viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            <path
              d={basePath}
              className="fill-ink/[0.16]"
              style={{ opacity: drawn ? 1 : 0, transition: reduced ? 'none' : 'opacity 500ms ease-out' }}
            />

            {/* Faint links from the selected office to the others. */}
            {offices
              .filter((o) => o.id !== active)
              .map((o) => {
                const a = activePt;
                const b = points[o.id];
                const mx = (a.x + b.x) / 2;
                const my = (a.y + b.y) / 2 - Math.abs(a.x - b.x) * 0.16;
                return (
                  <path
                    key={o.id}
                    d={`M${a.x} ${a.y}Q${mx} ${my} ${b.x} ${b.y}`}
                    fill="none"
                    className="stroke-ink/25"
                    strokeWidth={1}
                    strokeDasharray="3 6"
                  />
                );
              })}
          </svg>

          {/* Pins are real buttons layered over the map — 44px targets, keyboard
              reachable, driving exactly the same state as the tabs. */}
          {offices.map((o) => {
            const p = points[o.id];
            const on = o.id === active;
            return (
              <button
                key={o.id}
                type="button"
                onClick={() => setActive(o.id)}
                aria-pressed={on}
                className="group absolute flex h-12 w-12 -translate-x-1/2 -translate-y-full items-end justify-center"
                style={{
                  left: `${((p.x - view.x) / view.w) * 100}%`,
                  top: `${((p.y - view.y) / view.h) * 100}%`,
                  zIndex: on ? 2 : 1,
                }}
              >
                <span className="sr-only">
                  {o.country} office{o.approximate ? ' (approximate location)' : ''}
                </span>

                {/* Label lives outside the pin, and only when it is wanted. */}
                <span
                  aria-hidden
                  className={`pointer-events-none absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 transition-all duration-base ease-out ${
                    on
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100'
                  }`}
                >
                  <span className="block whitespace-nowrap rounded-sm border border-rule bg-white px-2 py-1 text-[0.75rem] leading-none text-ink shadow-[0_8px_20px_-8px_rgba(56,56,56,0.35)]">
                    {o.country}
                  </span>
                  <span
                    className="absolute left-1/2 top-full block h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-rule bg-white"
                  />
                </span>

                <span
                  aria-hidden
                  className={`block transition-transform duration-base ease-out ${
                    on ? '-translate-y-1.5 scale-110' : 'group-hover:-translate-y-1'
                  }`}
                >
                  <svg
                    viewBox="0 0 24 30"
                    className={`h-8 w-auto md:h-11 ${on ? 'text-accent' : 'text-ink-ash'}`}
                  >
                    <path
                      d="M12 0C5.373 0 0 5.373 0 12c0 8.4 12 18 12 18s12-9.6 12-18c0-6.627-5.373-12-12-12z"
                      fill="currentColor"
                    />
                    <circle cx="12" cy="12" r="5" className="fill-paper" />
                  </svg>
                </span>
              </button>
            );
          })}
        </div>

        <p className="meta mt-4 tnum">
          {office.lat.toFixed(2)}° {office.lat >= 0 ? 'N' : 'S'} · {Math.abs(office.lng).toFixed(2)}°{' '}
          {office.lng >= 0 ? 'E' : 'W'}
          {office.approximate && ' · approximate until the city is confirmed'}
        </p>
      </div>

      {/* ── Panel ───────────────────────────────────────────── */}
      <div className="col-span-4 md:col-span-4 md:col-start-9">
        {/* Each tab carries its own state marker. No absolutely-positioned
            indicator — that breaks the moment the row wraps, which is exactly
            what happened on mobile. The square is the site's own state
            language, and it stays legible as a selector even when inactive. */}
        <div
          role="group"
          aria-label="Offices"
          className="flex flex-wrap gap-x-7 gap-y-1 border-b border-rule pb-3"
        >
          {offices.map((o) => {
            const on = o.id === active;
            return (
              <button
                key={o.id}
                type="button"
                onClick={() => setActive(o.id)}
                aria-pressed={on}
                className={`group inline-flex min-h-[44px] items-center gap-2.5 text-[1.125rem] wdth-narrow transition-colors duration-fast ${
                  on ? 'text-ink' : 'text-ink-muted hover:text-ink-soft'
                }`}
              >
                <span
                  aria-hidden
                  className={`block h-2 w-2 shrink-0 transition-colors duration-fast ${
                    on ? 'bg-accent' : 'bg-rule group-hover:bg-ink-muted'
                  }`}
                />
                {o.country}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.dl
            key={office.id}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: dur.fast, ease: ease.out }}
            className="pt-6"
          >
            <dt className="sr-only">City</dt>
            <dd className="text-title wdth-tight">{office.city ?? <Placeholder label="city needed" />}</dd>
            <dt className="sr-only">Country</dt>
            <dd className="meta mt-2">{office.country}</dd>
            <dt className="sr-only">What happens here</dt>
            <dd className="mt-5 max-w-measure text-ink-soft">{office.role}</dd>

            <div className="mt-8 space-y-2">
              <div className="flex gap-4 border-t border-rule pt-2">
                <dt className="meta w-24 shrink-0">Local time</dt>
                <dd className="meta text-ink">
                  <LocalTime timeZone={office.timeZone} /> {office.utc}
                </dd>
              </div>
              <div className="flex gap-4 border-t border-rule pt-2">
                <dt className="meta w-24 shrink-0">Address</dt>
                <dd className="meta text-ink">{office.address ?? <Placeholder label="[ADD OFFICE ADDRESS]" />}</dd>
              </div>
              <div className="flex gap-4 border-t border-rule pt-2">
                <dt className="meta w-24 shrink-0">Phone</dt>
                <dd className="meta text-ink">
                  {office.phone ? (
                    <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="hover:text-accent-ink">
                      {office.phone}
                    </a>
                  ) : (
                    <Placeholder label="[ADD PHONE NUMBER]" />
                  )}
                </dd>
              </div>
            </div>
          </motion.dl>
        </AnimatePresence>
      </div>
    </div>
  );
}
