export type Entry = {
  id: string;
  title: string;
  kind: string;
  date: string;
  readingTime: string;
  href: string;
  /** One line shown on the insights index. */
  standfirst?: string;
  featured?: boolean;
  draft?: boolean;
  needsContent?: boolean;
};

/**
 * DRAFT TITLES — three pieces this company is genuinely positioned to write,
 * based on work it already does. They are commissioning briefs, not published
 * articles. Replace the date and reading time when each one is written.
 */
export const journal: Entry[] = [
  {
    id: 'j1',
    title: 'What breaks when you put a design canvas inside someone else’s theme',
    kind: 'Engineering',
    date: '[Date]',
    readingTime: '[—] min',
    href: '/insights',
    standfirst:
      'Fonts, z-index, touch events and a checkout button you do not own. Notes from keeping InkyBay stable across thousands of Shopify themes.',
    featured: true,
    draft: true,
  },
  {
    id: 'j2',
    title: 'Shopify’s variant limit is a design constraint, not a bug',
    kind: 'Product',
    date: '[Date]',
    readingTime: '[—] min',
    href: '/insights',
    standfirst:
      'Why we built Optionia around the limit instead of against it, and what happens to a catalogue when you stop pretending every combination is a product.',
    draft: true,
  },
  {
    id: 'j3',
    title: 'Reading the support inbox as a design document',
    kind: 'Studio',
    date: '[Date]',
    readingTime: '[—] min',
    href: '/insights',
    standfirst:
      'How we turn a year of merchant conversations into a shortlist of things to change — and why the loudest complaint is rarely the most useful one.',
    draft: true,
  },
];
