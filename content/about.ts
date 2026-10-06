export const about = {
  heroLines: ['We build the kind', 'of software we', 'would want to use.'],
  intro:
    'Fifteen years, twenty-five people and three countries, spent on one narrow problem: the moment a customer decides exactly what they want, and the software has to keep up. We build and run our own products rather than other people’s roadmaps.',
};

/** Founder story. The narrative is drafted in the company's voice; every
 *  personal fact is bracketed. Fill the brackets, edit the prose, drop `draft`. */
export const founder = {
  name: '[ADD FOUNDER NAME]',
  role: 'Founder',
  portrait: undefined as string | undefined,
  pullQuote:
    'We were not trying to start a software company. We were trying to stop doing the same job by hand every week.',
  beats: [
    {
      label: 'Before',
      body:
        'Before ParseLab, [name] was [doing what, where] — close enough to merchants to see the same problem arrive again and again. Someone selling printed goods would take an order, then spend the rest of the afternoon in email working out what the customer actually meant by “medium, in navy, with the logo a bit higher”.',
    },
    {
      label: 'The decision',
      body:
        'The first version was built to solve exactly that, for [one merchant / a handful of merchants]. It was not a product yet. It became one when the second merchant asked for it, and the third asked for something slightly different, and it became obvious the variation was the point.',
    },
    {
      label: 'The turn',
      body:
        'The company changed shape around [YEAR], when [what happened — a platform, a product, a market, a mistake]. It forced a choice between taking client work that paid immediately and building products that paid later. We chose the products, and the next two years were harder than they needed to be.',
    },
    {
      label: 'Now',
      body:
        'Today [name] spends most of the week on [what], and the rest reading support threads. The thing still being worked out: how a company of twenty-five keeps shipping like a company of five without pretending it is one.',
    },
  ],
  philosophy:
    'Build the thing you would be willing to support for ten years. It rules out a surprising number of good ideas, and the ones left are usually right.',
  draft: true,
  needsContent: true,
};

export const beliefs = [
  {
    claim: 'Useful beats impressive.',
    body: 'A feature earns its place by removing a support ticket, not by demoing well. Some of our best releases are invisible.',
  },
  {
    claim: 'We design for two people who want different things.',
    body: 'The merchant wants control. Their customer wants to be finished. Nearly every decision we make is a trade between those two.',
  },
  {
    claim: 'Complexity has to live somewhere.',
    body: 'Configurable products are genuinely complicated. Our job is to hold that complexity in the admin so it never reaches the storefront.',
  },
  {
    claim: 'Ship, watch, correct.',
    body: 'We would rather be wrong in public on Tuesday than right in private in April. Small releases, watched closely.',
  },
];

export const collage: {
  slot: string;
  ratio: string;
  src?: string;
  alt?: string;
  caption: string;
  span: string;
  offset: string;
}[] = [
  { slot: 'studio · wide', ratio: '3 / 2', src: '/life/team-day-pool.jpg', alt: 'Team members posing together in a swimming pool', caption: 'Team day out.', span: 'md:col-span-7', offset: '' },
  { slot: 'detail · screen', ratio: '4 / 5', caption: 'A screen mid-work, not a staged shot.', span: 'md:col-span-4 md:col-start-9', offset: 'md:mt-24' },
  { slot: 'people · candid', ratio: '1 / 1', src: '/life/team-day-portrait.jpg', alt: 'A man holding a young girl in a garden', caption: 'Families are part of the day.', span: 'md:col-span-5 md:col-start-2', offset: 'md:-mt-16' },
  { slot: 'city · Dhaka', ratio: '16 / 9', caption: 'Where the work happens.', span: 'md:col-span-6 md:col-start-7', offset: 'md:mt-20' },
];
