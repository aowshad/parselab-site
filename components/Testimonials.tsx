'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { testimonials } from '@/content/testimonials';
import ImageFrame from './ImageFrame';
import Placeholder from './Placeholder';
import { dur, ease } from '@/lib/motion';

/**
 * One quote at a time, at display size. Manual only — nothing rotates on
 * a timer, because a quote you can't finish reading is worse than none.
 */
export default function Testimonials() {
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();
  const t = testimonials[i];
  if (!t) return null;

  return (
    <div className="grid-12 gap-y-10">
      <div className="col-span-4 md:col-span-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={`v-${i}`}
            initial={reduced ? false : { opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: dur.base, ease: ease.out }}
          >
            <ImageFrame
              slot={`customer · ${t.needsContent ? 'unassigned' : t.org}`}
              src={t.visual}
              alt={t.needsContent ? '' : `${t.person}, ${t.org}`}
              ratio="4 / 5"
              hint="portrait or their product · 1200×1500"
              sizes="(max-width: 768px) 100vw, 32vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="col-span-4 flex flex-col justify-between md:col-span-7 md:col-start-6">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={`q-${i}`}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: dur.fast, ease: ease.out }}
          >
            <p className="wdth-tight text-title">
              {t.needsContent ? <Placeholder label="testimonial needed" /> : `“${t.quote}”`}
            </p>
            <footer className="mt-8 border-t border-rule pt-4">
              <p className="wdth-narrow text-[1.05rem]">{t.person}</p>
              <p className="meta mt-1">
                {t.role} · {t.org} · {t.product}
              </p>
            </footer>
          </motion.blockquote>
        </AnimatePresence>

        <div className="mt-10 flex items-center gap-5">
          <span className="meta tnum">
            {String(i + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setI((v) => (v - 1 + testimonials.length) % testimonials.length)}
              className="flex h-11 w-11 items-center justify-center border border-rule transition-colors duration-fast hover:border-accent hover:text-accent-ink"
            >
              <span className="sr-only">Previous testimonial</span>
              <span aria-hidden>←</span>
            </button>
            <button
              type="button"
              onClick={() => setI((v) => (v + 1) % testimonials.length)}
              className="flex h-11 w-11 items-center justify-center border border-rule transition-colors duration-fast hover:border-accent hover:text-accent-ink"
            >
              <span className="sr-only">Next testimonial</span>
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
