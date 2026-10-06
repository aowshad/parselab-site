'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { brands } from '@/content/brands';
import { dur, ease, viewportOnce } from '@/lib/motion';

/**
 * A quiet field of customer marks. Everything sits at low contrast until
 * pointed at; the hovered mark comes forward and names its product.
 * Not a logo wall — the field is sparse on purpose.
 */
export default function BrandField() {
  const [hover, setHover] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const active = brands.find((b) => b.id === hover);

  return (
    <div>
      <ul className="grid grid-cols-2 border-l border-t border-rule sm:grid-cols-3 lg:grid-cols-6">
        {brands.map((b, i) => (
          <motion.li
            key={b.id}
            className="border-b border-r border-rule"
            initial={reduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: dur.base, ease: ease.out, delay: reduced ? 0 : i * 0.03 }}
          >
            <div
              onMouseEnter={() => setHover(b.id)}
              onMouseLeave={() => setHover(null)}
              className="group flex aspect-[3/2] items-center justify-center p-5 transition-colors duration-fast hover:bg-paper-deep"
            >
              {b.logo ? (
                <Image
                  src={b.logo}
                  alt={b.name}
                  width={120}
                  height={40}
                  className="h-auto w-full max-w-[110px] opacity-40 transition-opacity duration-base ease-out group-hover:opacity-100"
                />
              ) : (
                <span
                  className="font-text text-meta text-ink-muted transition-colors duration-fast group-hover:text-accent-ink"
                  data-content-needed
                >
                  {b.name}
                </span>
              )}
            </div>
          </motion.li>
        ))}
      </ul>

      <p className="meta mt-5 min-h-[1.5rem]" aria-live="polite">
        {active && !active.needsContent
          ? `${active.name}${active.product ? ` · ${active.product}` : ''}`
          : 'Twelve slots. Add each customer’s logo and the product they use.'}
      </p>
    </div>
  );
}
