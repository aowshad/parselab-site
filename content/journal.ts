export type Entry = {
  id: string;
  title: string;
  kind: string;
  date: string;
  readingTime: string;
  href: string;
  /** /public/<path> — 3:2, 1600×1066 recommended. */
  thumbnail?: string;
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
    title: 'What breaks when a design tool runs inside someone else’s theme',
    kind: 'Engineering',
    date: '[Date]',
    readingTime: '[—] min',
    href: '/insights',
    draft: true,
  },
  {
    id: 'j2',
    title: 'Shopify’s variant limit is a design limit, not a bug',
    kind: 'Product',
    date: '[Date]',
    readingTime: '[—] min',
    href: '/insights',
    draft: true,
  },
  {
    id: 'j3',
    title: 'How support messages help us design',
    kind: 'Studio',
    date: '[Date]',
    readingTime: '[—] min',
    href: '/insights',
    draft: true,
  },
];
