/* =============================================================
   CONTENT LAYER — edit this folder, never the components.
   needsContent: true  renders a visible placeholder in the UI,
   so unverified copy can never ship silently.
   ============================================================= */

export const company = {
  name: 'ParseLab',
  legal: 'ParseLab LLC',
  what: 'We build software products for commerce — the parts of a store where customers configure, choose and buy.',
  city: 'Dhaka',
  country: 'Bangladesh',
  timezone: 'UTC+6',
  email: 'hello@parselab.io', // TODO: confirm
  emailNeedsContent: true,
};

export const nav = [
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'Teams', href: '/teams' },
  { label: 'Events', href: '/events' },
  { label: 'Careers', href: '/careers' },
];

export const footerNav = [
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Teams', href: '/teams' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Work',
    links: [
      { label: 'Products', href: '/products' },
      { label: 'Events', href: '/events' },
      { label: 'Insights', href: '/insights' },
    ],
  },
];

/** Footer marquee. Plain descriptions of the work — no slogans. */
export const marquee = [
  'Product building',
  'SaaS',
  'Shopify apps',
  'Product customisation',
  'Commerce technology',
  'Product design',
];

export const legalNav = [
  { label: 'Terms & conditions', href: '/terms' },
  { label: 'Privacy policy', href: '/privacy' },
];

export const social = [
  { label: 'LinkedIn', href: '#', needsContent: true },
  { label: 'X', href: '#', needsContent: true },
  { label: 'GitHub', href: '#', needsContent: true },
  { label: 'Shopify App Store', href: '#', needsContent: true },
];
