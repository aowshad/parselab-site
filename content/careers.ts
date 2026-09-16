export type Role = {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Internship';
  summary?: string;
  responsibilities?: string[];
  requirements?: string[];
  draft?: boolean;
  needsContent?: boolean;
};

export const whyJoin = [
  {
    claim: 'Build products people actually use.',
    body:
      'Everything here is our own. There is no client roadmap between you and the person using what you made, and no handover at the end.',
  },
  {
    claim: 'The feedback loop is short enough to feel.',
    body:
      'Merchants write in. You read it, you change something, they notice. Fifteen years of that is how the products got good.',
  },
  {
    claim: 'Small teams, real ownership.',
    body:
      'Twenty-five people across three countries. Nobody is more than one conversation away from the decision that affects their work.',
  },
];

/**
 * DRAFT — these are written as ParseLab would write them, but they are claims
 * about what the company offers. Confirm each one, edit the wording, delete
 * any you do not actually provide, then remove the draft flag.
 */
export const benefits: { title: string; body: string; draft?: boolean; needsContent?: boolean }[] = [
  {
    title: 'Hours that fit three time zones',
    body:
      'Core overlap hours so the teams can actually talk, and the rest of the day is yours to arrange. We care when you ship, not when you log in.',
    draft: true,
  },
  {
    title: 'Equipment you choose',
    body:
      'You pick the machine and the tools. Anything that makes the work faster is cheaper than the time it saves.',
    draft: true,
  },
  {
    title: 'Time to learn on the clock',
    body:
      'Courses, conferences and the occasional week spent going deep on something adjacent. Learning in your own evenings is not a benefit.',
    draft: true,
  },
  {
    title: 'Paid leave that people take',
    body:
      'Leave is only a benefit if using it is normal. Managers go first.',
    draft: true,
  },
];

export const hiringProcess = [
  { step: 'Apply', body: 'A short note and your work. No cover letter theatre.' },
  { step: 'Conversation', body: 'Thirty minutes about what you have built and what you want to build next.' },
  { step: 'Work session', body: 'A real problem from our backlog, discussed together. Paid if it takes longer than an afternoon.' },
  { step: 'Team', body: 'You meet the people you would work with, and they meet you.' },
  { step: 'Offer', body: 'Written, specific, and open to questions.' },
];

/**
 * DRAFT ROLES — written so a real vacancy is a five-minute edit rather than a
 * blank page. These are NOT live. `noOpenRoles` below keeps them off the site
 * until you set it to false.
 */
export const roles: Role[] = [
  {
    slug: 'product-designer',
    title: 'Product Designer',
    department: 'Creative Interface',
    location: 'Dhaka, Bangladesh',
    type: 'Full-time',
    summary:
      'Design the admin and storefront surfaces of our apps — the screens where a merchant sets up options nobody else can make sense of, and where their customer has to finish in under a minute.',
    responsibilities: [
      'Own the design of a product surface end to end, from the argument about scope to the release note',
      'Prototype in the browser early enough that the team can react to something real',
      'Read support threads weekly and turn recurring confusion into design work',
      'Keep the design system honest as the products change',
    ],
    requirements: [
      'Work you can talk through in detail — what you decided, what you cut, what you would change',
      'Comfort designing dense, configurable interfaces rather than marketing pages',
      'Enough front-end fluency to prototype and to read the code you are designing against',
      'Written English good enough for asynchronous work across three time zones',
    ],
    draft: true,
  },
  {
    slug: 'frontend-engineer',
    title: 'Frontend Engineer',
    department: 'Technology Development',
    location: 'Dhaka, Bangladesh · Remote considered',
    type: 'Full-time',
    summary:
      'Build the storefront side of apps that run inside somebody else’s theme, on somebody else’s device, on a connection you do not control.',
    responsibilities: [
      'Ship storefront features that hold up across themes, browsers and slow networks',
      'Hold the performance budget that Built for Shopify requires',
      'Work directly with design rather than receiving finished files',
      'Fix the merchant-reported bugs nobody else wants to reproduce',
    ],
    requirements: [
      'Strong JavaScript and CSS — the real kind, not framework-deep only',
      'Experience with a rendering-heavy or canvas-based interface is a bonus',
      'Instinct for measuring before optimising',
    ],
    draft: true,
  },
  {
    slug: 'merchant-support',
    title: 'Merchant Support Specialist',
    department: 'Operations Intelligence',
    location: 'Dhaka, Bangladesh',
    type: 'Full-time',
    summary:
      'Be the person a merchant reaches at the worst possible moment, and the person who makes sure the same moment does not happen to the next merchant.',
    responsibilities: [
      'Answer merchant questions across products, in writing, clearly',
      'Reproduce and document the problems behind the questions',
      'Bring recurring patterns to the product teams with evidence',
      'Keep help documentation current as the apps change',
    ],
    requirements: [
      'Excellent written English and patience in equal measure',
      'Enough technical curiosity to dig into a theme or a browser console',
      'Previous ecommerce or SaaS support experience is useful, not required',
    ],
    draft: true,
  },
];

/** Set to false once a role above is real and live. */
export const noOpenRoles = true;
