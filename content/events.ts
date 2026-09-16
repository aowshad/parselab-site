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
 */
export const events: EventItem[] = [
  {
    slug: 'event-1',
    name: '[EVENT NAME]',
    date: '[Month YYYY]',
    location: '[City, Country]',
    kind: 'Conference',
    upcoming: true,
    summary:
      'Draft: what we went to do, and who we wanted to meet. One or two sentences — enough for someone deciding whether to read on.',
    story:
      'Draft: the longer version. What the event was, what our team did there, one specific thing we learned or argued about, and what changed in the products afterwards. Write it the way you would tell a colleague who could not come, not the way a press release would.',
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
      'Draft: a community or meetup entry. Who organised it, what we contributed — a talk, a workshop, a table — and who we met.',
    story: 'Draft: the longer version.',
    draft: true,
    needsContent: true,
  },
  {
    slug: 'event-3',
    name: '[EVENT NAME]',
    date: '[Month YYYY]',
    location: 'Dhaka, Bangladesh',
    kind: 'Internal',
    upcoming: false,
    summary:
      'Draft: something the company ran itself — a release day, an anniversary, a team week. The internal ones are worth publishing; they show the company has a life.',
    story: 'Draft: the longer version.',
    draft: true,
    needsContent: true,
  },
];
