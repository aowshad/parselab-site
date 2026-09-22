'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { dur, ease, viewportOnce } from '@/lib/motion';

type Props = {
  /** Drop a real file in /public and pass its path. Placeholder shows until then. */
  src?: string;
  alt?: string;
  /** CSS aspect-ratio string, e.g. '3 / 4'. */
  ratio?: string;
  /** Named slot — appears in the placeholder so it's obvious what belongs here. */
  slot: string;
  /** Recommended intrinsic size, shown in the placeholder. */
  hint?: string;
  caption?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Scale image slightly on hover of a parent marked .group */
  interactive?: boolean;
  /** Hover scale factor when interactive. Defaults to the scale used everywhere else. */
  hoverScale?: 1.02 | 1.03;
};

export default function ImageFrame({
  src,
  alt = '',
  ratio = '4 / 5',
  slot,
  hint,
  caption,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 40vw',
  className = '',
  interactive = false,
  hoverScale = 1.03,
}: Props) {
  const reduced = useReducedMotion();

  return (
    <figure className={className}>
      <motion.div
        className="relative w-full overflow-hidden bg-paper-deep"
        style={{ aspectRatio: ratio }}
        initial={reduced ? undefined : { clipPath: 'inset(0 0 100% 0)' }}
        whileInView={reduced ? undefined : { clipPath: 'inset(0 0 0% 0)' }}
        viewport={viewportOnce}
        transition={{ duration: dur.slow, ease: ease.out }}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={`object-cover transition-transform duration-slow ease-out ${
              interactive ? (hoverScale === 1.02 ? 'group-hover:scale-[1.02]' : 'group-hover:scale-[1.03]') : ''
            }`}
          />
        ) : (
          <div
            className="absolute inset-0 flex flex-col justify-between p-3"
            style={{
              backgroundImage:
                'repeating-linear-gradient(135deg, rgba(20,20,20,0.045) 0 1px, transparent 1px 9px)',
            }}
            role="img"
            aria-label={`Image placeholder: ${slot}`}
            data-content-needed
          >
            <span className="font-text text-meta text-accent-ink">{slot}</span>
            <span className="meta">
              {hint ?? `image · ${ratio.replace(/\s/g, '')}`}
            </span>
          </div>
        )}
      </motion.div>
      {caption && <figcaption className="meta mt-3">{caption}</figcaption>}
    </figure>
  );
}
