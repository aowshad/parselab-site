export type Capability = {
  /** Selects the line figure in components/CapabilityFigure.tsx */
  id: 'design' | 'build' | 'run' | 'support';
  verb: string;
  body: string;
  detail: string[];
};

/* What the company actually does, written as work rather than as services.
   Adjust the four verbs if they don't match how the company describes itself. */
export const capabilities: Capability[] = [
  {
    id: 'design',
    verb: 'Design',
    body:
      'We design the screens merchants use to set up products, and the screens shoppers use to finish an order.',
    detail: ['Product design', 'Interface systems', 'Prototyping'],
  },
  {
    id: 'build',
    verb: 'Build',
    body:
      'We build and maintain our own products. Everything on this site is ours.',
    detail: ['SaaS products', 'Shopify apps', 'Commerce tooling'],
  },
  {
    id: 'run',
    verb: 'Run',
    body:
      'Apps need care after launch. We handle app store review, speed, updates and merchant questions.',
    detail: ['App Store review', 'Built for Shopify', 'Performance'],
  },
  {
    id: 'support',
    verb: 'Support',
    body:
      'Our support team sits next to the people who can fix problems. Every message helps us improve the product.',
    detail: ['Merchant support', 'Onboarding', 'Documentation'],
  },
];
