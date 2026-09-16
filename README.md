# ParseLab — site

Next.js 16 · React 19 · TypeScript · Tailwind · Motion.

Routes: `/` · `/products` · `/about` · `/teams` · `/events` + `/events/[slug]` ·
`/careers` + `/careers/[slug]` · `/insights` · `/contact`. All 15 pages prerender static.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # verified clean on Next 16.3.5; all three routes prerender static
npm audit          # 0 vulnerabilities
npm run typecheck
```

Note: `npm run build` fetches Archivo and IBM Plex Mono from Google Fonts at build
time. It needs network access on first build; after that they're cached locally
and self-hosted in the bundle.

## Where the content lives

Every word and image slot is in `/content`. Components read from it; nothing is
hardcoded in a page. Paste real content here and the site updates.

| File | Holds |
|---|---|
| `content/site.ts` | Company one-liner, nav, footer nav, contact email, social links |
| `content/products.ts` | The 5 products — name, category, platform, status, logo and visual slots |
| `content/signals.ts` | The five verified figures (15+, 5+, 10K+, 150+, 25+) |
| `content/capabilities.ts` | Design / Build / Run / Support — the "what we do" composition |
| `content/offices.ts` | BD · US · UAE. Coordinates, time zones, address placeholders |
| `content/brands.ts` | Customer logo slots |
| `content/testimonials.ts` | Customer quotes |
| `content/team.ts` | 7 departments and 25 people. `scale` drives editorial cell size, `featured` picks the homepage selection |
| `content/events.ts` | Events. The first entry is the featured one on home and `/events` |
| `content/careers.ts` | Why-join statements, benefits, hiring process, open roles |
| `content/about.ts` | About hero, founder story beats, beliefs, studio photo slots |
| `content/timeline.ts` | Company history, homepage principles, the working loop |
| `content/journal.ts` | Insights index. Empty array renders an honest empty state |

### Brand

The logo lives in `components/Logo.tsx` (full lockup) and `components/LogoMark.tsx`
(mark only), as inline SVG. The grey letterforms are `currentColor`, so the logo
takes the colour of whatever surface it sits on — there is no separate dark file
to keep in sync. Brand blue `#6CA9F3` and the orange core `#FF9933` stay fixed.
Your original files are in `/public/brand/` for decks and third parties.

The UI accent is taken from the logo's orange: `accent #FF9933` for graphics and
dark surfaces, `accent-ink #A65600` for text and focus rings on light surfaces
(full-saturation orange fails contrast against paper). Brand blue is deliberately
**not** a UI colour — it belongs to the logo, and using it in the interface would
make buttons compete with the wordmark.

### The placeholder rule

Nothing on this site invents facts. Any entry with `needsContent: true` renders a
dashed magenta marker in the UI. To find every outstanding gap:

```bash
npm run content:audit
```

It prints two kinds of gap:

- **BLANK** — a hard gap that renders a dashed marker on the site. Nothing was
  invented here: customer names and logos, testimonial quotes, the founder's
  biography facts, office addresses, real event names and dates, team names.
- **DRAFT** — copy written in ParseLab's voice for you to edit. It renders
  normally, so the site looks finished, but the words are not yours yet.

Currently: **41 blanks, 20 drafts**. Ship target is 0 blanks; drafts are
optional but worth rewriting before launch.

Dashed markers per page, from the last build:

| Page | Gaps |
|---|---|
| `/teams` | 58 |
| `/` | 38 |
| `/events` | 13 |
| `/careers`, `/contact` | 12 / 20 |
| `/about` | 10 |
| `/products` | 3 |
| `/insights`, each role page | 2 |

In the browser, every gap carries a `data-content-needed` attribute:

```js
document.querySelectorAll('[data-content-needed]').length
```

Ship target: that number is 0.

### Images

Drop files in `/public` and pass the path — `portrait: '/team/name.jpg'`,
or `src` on any `ImageFrame`. Until then each slot renders its name, ratio and
recommended pixel size. Portraits: 3:4, 900×1200 minimum. `next/image` handles
AVIF/WebP, sizing and lazy loading; only the hero is eager.

## Design system

Tokens live in `tailwind.config.ts` (colour, type scale, spacing, easing,
breakpoints) and `app/globals.css` (gutter, nav height, grid helpers). Change a
value once there.

- **Colour** — ink `#141414`, paper `#F0F0EE`, rule `#D5D5D0`, accent `#E0006D`
  with `accent-ink #B30057` for text on light surfaces (AA). One hue, two stops.
- **Type** — Archivo (variable, width axis 62–125) + IBM Plex Mono for metadata.
  `.wdth-tight` / `.wdth-narrow` / `.wdth-wide` set the width axis. Display type
  narrows as it grows; that's the identity.
- **Grid** — `.shell` for the container, `.grid-12` for the grid. 4 columns on
  mobile, 12 from `md`. Sections break the grid asymmetrically on purpose.
- **Motion** — `lib/motion.ts`. One signature move (a horizontal clip-path wipe)
  used for section reveals, the mobile menu and the footer wordmark. Route
  changes are a 220ms opacity settle only — no colour wash.
- **World map** — `components/GlobalPresence.tsx` renders a dotted land field
  generated from Natural Earth geometry by `npm run build:world`, which writes a
  ~4 KB packed bitmask to `content/world.ts`. Office pins are projected from
  their real latitude and longitude, so moving an office in `content/offices.ts`
  moves the pin. All 3,360 dots are one `<path>` element, built on the client to
  keep it out of the server HTML.
- **Hero headline** — `components/VariableHeadline.tsx`. Letters near the
  cursor thicken on Archivo's weight axis (400 → 780) with a squared distance
  falloff, lerped so the effect trails the pointer. One rect read and ~40 style
  writes per frame, no React state. Off entirely for reduced motion.
- **Hero field** — `components/LivingSystem.tsx`. A sparse lattice, one accent tracer
  routing through it, energy decaying behind it. ~90 SVG elements created once;
  a single rAF loop writes attributes directly, so React never re-renders during
  the animation. Scroll migrates the points onto the twelve column lines.

## Accessibility

Semantic landmarks, single `h1` per page, skip link, visible magenta focus ring
that is never removed, `aria-expanded`/`aria-controls` on every disclosure,
`aria-pressed` on filters, Escape closes the mobile menu with scroll locked.
`prefers-reduced-motion` removes parallax, the scroll-driven timeline (it becomes
a vertical list), hero drift and all transforms, while keeping state changes.

## Two things to decide before launch

1. **Team names.** The seven department names came from the brief, unverified.
   `content/team.ts` sets `departmentsNeedConfirmation = true`, which shows a
   marker above the department explorer. Confirm or rename, then set it false.
2. **ProductsModel.** Listed as a product with `needsContent: true`. If it is not
   a ParseLab product, delete the entry.

## Known gaps

- The contact form has no endpoint. Submitting opens a pre-filled mail draft.
  Set `ENDPOINT` in `components/ContactForm.tsx` to POST somewhere instead.
- No real photography, so every image is a marked slot.
- Insight entries link to `/insights`; there are no individual article routes yet.
