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
    body: 'Everything here is our own. There is no client in between and no handover at the end.',
  },
  {
    claim: 'Get feedback fast.',
    body: 'Merchants write in. You read it, make a change, and they notice.',
  },
  {
    claim: 'Small teams, real ownership.',
    body: 'Twenty-five people in three countries. You are always close to the people making the decisions.',
  },
];

/**
 * DRAFT — these describe what the company offers. Confirm each one, edit the
 * wording, delete any you do not provide, then remove the draft flag.
 */
export const benefits: { title: string; body: string; draft?: boolean; needsContent?: boolean }[] = [
  {
    title: 'Flexible hours',
    body: 'Teams share a few overlap hours. The rest of the day is yours. We care when you ship, not when you log in.',
    draft: true,
  },
  {
    title: 'Your own equipment',
    body: 'You choose your machine and tools.',
    draft: true,
  },
  {
    title: 'Time to learn',
    body: 'Courses, conferences and time to learn new skills, during work hours.',
    draft: true,
  },
  {
    title: 'Paid leave',
    body: 'Leave only helps if people use it. Managers go first.',
    draft: true,
  },
];

export const hiringProcess = [
  { step: 'Apply', body: 'A short note and examples of your work. No cover letter needed.' },
  { step: 'Conversation', body: 'A 30-minute talk about what you have built and what you want to build next.' },
  { step: 'Work session', body: 'We work through a real problem together. We pay you if it takes more than an afternoon.' },
  { step: 'Team', body: 'You meet the people you would work with.' },
  { step: 'Offer', body: 'A written offer with clear details. Ask us anything.' },
];

/**
 * DRAFT ROLES — so a real vacancy is a quick edit. These are NOT live.
 * `noOpenRoles` below keeps them off the site until you set it to false.
 */
export const roles: Role[] = [
  {
    slug: 'product-designer',
    title: 'Product Designer',
    department: 'Creative Interface',
    location: 'Dhaka, Bangladesh',
    type: 'Full-time',
    summary:
      'Design the admin and storefront screens of our apps. Merchants set up product options in the admin. Shoppers use the storefront to finish an order quickly.',
    responsibilities: [
      'Own the design of a product area, from first idea to release',
      'Build prototypes in the browser early, so the team reacts to something real',
      'Read support messages weekly and turn repeated confusion into design work',
      'Keep the design system consistent as products change',
    ],
    requirements: [
      'Work you can explain in detail: what you decided, what you cut, what you would change',
      'Experience designing detailed, configurable interfaces, not just marketing pages',
      'Enough front-end skill to prototype and read the code',
      'Clear written English for work across three time zones',
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
      'Build the storefront side of our apps. They run inside other people’s themes, on many devices and slow connections.',
    responsibilities: [
      'Ship storefront features that work across themes, browsers and slow networks',
      'Meet the performance limits that Built for Shopify requires',
      'Work directly with designers',
      'Fix merchant-reported bugs that are hard to reproduce',
    ],
    requirements: [
      'Strong JavaScript and CSS',
      'Experience with canvas or rendering-heavy interfaces is a plus',
      'You measure before you optimise',
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
      'Help merchants when they need it most, and help us make sure the same problem does not happen again.',
    responsibilities: [
      'Answer merchant questions across our products, in writing, clearly',
      'Reproduce and document the problems behind the questions',
      'Show product teams repeated problems, with evidence',
      'Keep help articles up to date',
    ],
    requirements: [
      'Excellent written English and patience',
      'Curiosity about technical problems, such as a theme or browser console',
      'Ecommerce or SaaS support experience is useful but not required',
    ],
    draft: true,
  },
];

/** Set to false once a role above is real and live. */
export const noOpenRoles = true;
