export type EventItem = {
  slug: string;
  name: string;
  date: string;
  location: string;
  kind: 'Conference' | 'Community' | 'Internal' | 'Milestone';
  upcoming: boolean;
  summary: string;
  story?: string;
  hero?: string;
  gallery?: string[];
  people?: string[];
  products?: string[];
  draft?: boolean;
  needsContent?: boolean;
};

/**
 * Event names, dates and locations are hard facts and stay bracketed — an
 * invented conference is the fastest way to lose a reader's trust. The
 * surrounding copy is drafted so each entry is an edit, not a blank form.
 * The first entry is the featured one on the home page and /events.
 */
export const events: EventItem[] = [
  {
    slug: 'event-3',
    name: '[EVENT NAME]',
    date: '[Month YYYY]',
    location: 'Dhaka, Bangladesh',
    kind: 'Internal',
    upcoming: false,
    summary:
      'Draft: an event we ran ourselves, such as a release day, anniversary or team week.',
    story: 'Draft: the longer version.',
    draft: true,
    hero: '/life/team-day-pool.jpg',
    gallery: [
      '/life/team-day-hoodies.jpg',
      '/life/team-day-portrait.jpg',
      '/life/team-day-garden.jpg',
      '/life/team-day-bike.jpg',
    ],
    needsContent: true,
  },
  {
    slug: 'event-1',
    name: '[EVENT NAME]',
    date: '[Month YYYY]',
    location: '[City, Country]',
    kind: 'Conference',
    upcoming: true,
    summary:
      'Draft: why we went and who we wanted to meet. One or two sentences.',
    story:
      'Draft: the full story. What the event was, what our team did, one thing we learned, and what changed in our products afterwards. Write it like you are telling a colleague who could not come.',
    draft: true,
    needsContent: true,
  },
  {
    slug: 'event-2',
    name: '[EVENT NAME]',
    date: '[Month YYYY]',
    location: '[City, Country]',
    kind: 'Community',
    upcoming: false,
    summary:
      'Draft: a community or meetup event. Who organised it, what we did (a talk, workshop or table) and who we met.',
    story: 'Draft: the longer version.',
    draft: true,
    needsContent: true,
  },
];
