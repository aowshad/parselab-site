export type Capability = {
  verb: string;
  body: string;
  detail: string[];
};

/* What the company actually does, written as work rather than as services.
   Adjust the four verbs if they don't match how the company describes itself. */
export const capabilities: Capability[] = [
  {
    verb: 'Design',
    body:
      'Interface and product design for commerce surfaces, where the same screen has to satisfy a merchant configuring it and a shopper trying to finish.',
    detail: ['Product design', 'Interface systems', 'Prototyping'],
  },
  {
    verb: 'Build',
    body:
      'We ship our own products rather than staffing other people’s roadmaps. Everything on this site is something we own and maintain.',
    detail: ['SaaS products', 'Shopify apps', 'Commerce tooling'],
  },
  {
    verb: 'Run',
    body:
      'Apps in an app store are a commitment, not a launch. Review compliance, performance, upgrades and the long tail of merchant edge cases.',
    detail: ['App Store review', 'Built for Shopify', 'Performance'],
  },
  {
    verb: 'Support',
    body:
      'The support inbox is a product input. The people answering it sit next to the people who can fix what it describes.',
    detail: ['Merchant support', 'Onboarding', 'Documentation'],
  },
];
