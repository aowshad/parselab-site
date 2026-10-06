export const about = {
  heroLines: ['We build the kind', 'of software we', 'would want to use.'],
  intro:
    'For fifteen years we have worked on one problem: helping shoppers customise what they buy. We are twenty-five people in three countries. We build and run our own products.',
};

/** Founder story. Written in the company's voice; every personal fact is
 *  bracketed. Fill the brackets, edit the text, drop `draft`. */
export const founder = {
  name: '[ADD FOUNDER NAME]',
  role: 'Founder',
  portrait: undefined as string | undefined,
  pullQuote:
    'We did not set out to start a software company. We just wanted to stop repeating the same manual work.',
  beats: [
    {
      label: 'Before',
      body:
        'Before ParseLab, [name] was [doing what, where]. Merchants kept hitting the same problem. A seller would get an order, then spend hours by email working out what the customer wanted.',
    },
    {
      label: 'The decision',
      body:
        'We first built a tool to solve this for [one merchant / a few merchants]. It became a product when more merchants asked for it, each wanting something a little different.',
    },
    {
      label: 'The turn',
      body:
        'Around [YEAR], [what happened]. We had to choose between client work that paid now and products that paid later. We chose products. The next two years were hard.',
    },
    {
      label: 'Now',
      body:
        'Today [name] spends most of the week on [what], and the rest reading support messages. The open question: how can twenty-five people keep shipping like a team of five?',
    },
  ],
  philosophy:
    'Build something you would be happy to support for ten years. That rules out many good ideas. The ones left are usually right.',
  draft: true,
  needsContent: true,
};

export const beliefs = [
  {
    claim: 'Useful beats impressive.',
    body: 'A feature must solve a real problem. Looking good in a demo is not enough.',
  },
  {
    claim: 'We design for two people.',
    body: 'The merchant wants control. Their customer wants to finish quickly. We balance both.',
  },
  {
    claim: 'Keep it simple for the shopper.',
    body: 'Custom products are complicated. We handle that in the admin, so shoppers never see it.',
  },
  {
    claim: 'Ship, watch, correct.',
    body: 'We prefer small releases that we watch closely. Fixing a mistake quickly beats waiting for a perfect release.',
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
  { slot: 'detail · screen', ratio: '4 / 5', caption: 'Replace with a photo of a screen mid-work.', span: 'md:col-span-4 md:col-start-9', offset: 'md:mt-24' },
  { slot: 'people · candid', ratio: '1 / 1', src: '/life/team-day-portrait.jpg', alt: 'A man holding a young girl in a garden', caption: 'Families are part of the day.', span: 'md:col-span-5 md:col-start-2', offset: 'md:-mt-16' },
  { slot: 'city · Dhaka', ratio: '16 / 9', caption: 'Where the work happens.', span: 'md:col-span-6 md:col-start-7', offset: 'md:mt-20' },
];
