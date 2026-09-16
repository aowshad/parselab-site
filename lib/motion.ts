import type { Variants, Transition } from 'motion/react';

/** Motion tokens. Cinematic, controlled — never bouncy. */
export const ease = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const;

export const dur = {
  fast: 0.22,
  base: 0.52,
  slow: 0.88,
} as const;

export const transition: Transition = { duration: dur.base, ease: ease.out };

/** The signature move: a horizontal wipe. Used for every major reveal
 *  so all three pages read as one environment. */
export const wipe: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  show: { clipPath: 'inset(0 0% 0 0)', transition: { duration: dur.slow, ease: ease.out } },
};

export const riseLine: Variants = {
  hidden: { y: '110%' },
  show: (i: number = 0) => ({
    y: '0%',
    transition: { duration: dur.slow, ease: ease.out, delay: i * 0.065 },
  }),
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: dur.base, ease: ease.out, delay: i * 0.06 },
  }),
};

export const viewportOnce = { once: true, margin: '-12% 0px -12% 0px' } as const;
