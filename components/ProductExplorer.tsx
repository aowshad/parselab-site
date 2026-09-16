'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { products } from '@/content/products';
import ImageFrame from './ImageFrame';
import Placeholder from './Placeholder';
import { dur, ease } from '@/lib/motion';

/**
 * The product ecosystem as rows that open, not a row of cards. The open
 * product takes the visual space; the others stay as quiet type.
 * Desktop: pointer opens. Touch and keyboard: activation opens.
 */
export default function ProductExplorer({ dark = true }: { dark?: boolean }) {
  const [active, setActive] = useState<string | null>(products[0]?.id ?? null);
  const reduced = useReducedMotion();

  const ruleClass = dark ? 'border-rule-dark' : 'border-rule';
  const dimText = dark ? 'text-paper/50' : 'text-ink-muted';
  const liveText = dark ? 'text-paper' : 'text-ink';
  const bodyText = dark ? 'text-paper/80' : 'text-ink-soft';

  return (
    <ul className={`border-t ${ruleClass}`}>
      {products.map((p) => {
        const open = active === p.id;
        return (
          <li key={p.id} id={p.id} className={`border-b ${ruleClass} scroll-mt-24`}>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={`product-panel-${p.id}`}
              onClick={() => setActive(open ? null : p.id)}
              onMouseEnter={() => !reduced && setActive(p.id)}
              onFocus={() => setActive(p.id)}
              className="grid w-full grid-cols-4 items-baseline gap-4 py-7 text-left md:grid-cols-12 md:py-9"
            >
              <span className="col-span-3 md:col-span-5">
                <span
                  className={`block text-display transition-[font-stretch,color] duration-base ease-out ${
                    open ? `${liveText} wdth-wide` : `${dimText} wdth-tight`
                  }`}
                >
                  {p.name}
                </span>
              </span>

              <span className="col-span-1 hidden md:col-span-3 md:block">
                <span className="meta block">{p.category}</span>
              </span>

              <span className="col-span-1 hidden md:col-span-2 md:block">
                <span className="meta block">{p.platform}</span>
              </span>

              <span className="col-span-1 flex items-center justify-end gap-3 md:col-span-2">
                <span className="meta hidden sm:inline">{p.status}</span>
                <span
                  aria-hidden
                  className={`block h-1.5 w-1.5 transition-colors duration-fast ${
                    open ? 'bg-accent' : dark ? 'bg-paper/30' : 'bg-ink/20'
                  }`}
                />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={`product-panel-${p.id}`}
                  initial={reduced ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduced ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: dur.base, ease: ease.inOut }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-4 gap-x-4 gap-y-8 pb-12 md:grid-cols-12">
                    <div className="col-span-4 md:col-span-5">
                      <ImageFrame
                        slot={`${p.name} · product visual`}
                        src={p.visual}
                        alt={p.needsContent ? '' : `${p.name} in use`}
                        ratio="4 / 3"
                        hint="screenshot or output photo · 1600×1200"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                    </div>

                    <div className="col-span-4 md:col-span-6 md:col-start-7">
                      <p className={`max-w-measure-wide text-lead ${bodyText}`}>{p.body}</p>

                      <dl className="mt-8 space-y-2">
                        {p.facts.map((f) => (
                          <div key={f.k} className={`flex gap-4 border-t ${ruleClass} pt-2`}>
                            <dt className="meta w-28 shrink-0">{f.k}</dt>
                            <dd className={`meta ${liveText}`}>{f.v}</dd>
                          </div>
                        ))}
                      </dl>

                      {p.needsContent ? (
                        <Placeholder label="product details needed" className="mt-8" />
                      ) : (
                        <Link
                          href={p.href ?? `/products#${p.id}`}
                          className={`group mt-8 inline-flex items-baseline gap-2 border-b pb-1 text-[1.05rem] wdth-narrow transition-colors duration-fast ${
                            dark ? 'border-rule-dark text-paper' : 'border-rule text-ink'
                          } hover:border-accent`}
                        >
                          About {p.name}
                          <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-1">→</span>
                        </Link>
                      )}
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
