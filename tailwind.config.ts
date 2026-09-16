import type { Config } from 'tailwindcss';

/**
 * ParseLab design tokens.
 * Single source of truth for colour, type, spacing, grid, motion.
 * Change values here — never in components.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#141414',
          soft: '#33332F',   // paragraph text — was #3A3A38, too low against headings
          muted: '#5E5E5A',  // was #7A7A76, which failed AA at small sizes
          ash: '#696969', // the logo's neutral — used solid, never as an alpha
        },
        paper: {
          DEFAULT: '#F0F0EE',
          deep: '#E4E4E0',
          dim: '#1C1C1C', // "paper" surface in dark sections
        },
        rule: {
          DEFAULT: '#D5D5D0',
          dark: '#2E2E2C',
        },
        /* Accent is taken from the logo's orange core. One hue, three stops. */
        accent: {
          DEFAULT: '#FF9933', // graphics, fills, indicators, dark surfaces
          ink: '#A65600',     // text and focus rings on light surfaces (AA)
          dim: '#5C3000',
        },
        /* Brand blue lives in the logo. Not a UI colour — do not reach for it. */
        brand: {
          blue: '#6CA9F3',
        },
      },
      fontFamily: {
        sans: ['var(--font-archivo)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        // Editorial scale. Display sizes tighten tracking as they grow.
        /* Line heights below 1.0 make consecutive line boxes physically
           overlap — fine until a descender meets an ascender. These sit just
           above 1.0 so the type still reads tight without colliding. */
        hero: ['clamp(3.25rem, 9.2vw, 9.5rem)', { lineHeight: '0.95', letterSpacing: '-0.035em' }],
        display: ['clamp(2.5rem, 6.2vw, 5.5rem)', { lineHeight: '1.02', letterSpacing: '-0.028em' }],
        title: ['clamp(1.75rem, 3.2vw, 3rem)', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
        lead: ['clamp(1.1875rem, 1.5vw, 1.375rem)', { lineHeight: '1.55', letterSpacing: '-0.011em' }],
        body: ['1.125rem', { lineHeight: '1.65' }],
        /** Section labels — these introduce a section, so they are not footnotes. */
        label: ['0.9375rem', { lineHeight: '1.3', letterSpacing: '0.01em' }],
        meta: ['0.875rem', { lineHeight: '1.35', letterSpacing: '0.01em' }],
      },
      maxWidth: {
        shell: '96rem',
        /* Reading measure. 46rem at the old body size ran to ~80 characters;
           comfortable reading tops out around 75. */
        measure: '30rem',
        'measure-wide': '36rem',
      },
      spacing: {
        gutter: 'var(--gutter)',
        section: 'clamp(6rem, 12vw, 12rem)',
      },
      borderRadius: {
        none: '0',
        xs: '2px',
        sm: '3px',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
        inout: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      transitionDuration: {
        fast: '220ms',
        base: '520ms',
        slow: '880ms',
      },
      screens: {
        xs: '420px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};

export default config;
