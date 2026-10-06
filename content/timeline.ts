export type Milestone = {
  year: string;
  title: string;
  body: string;
  image?: string;
  /** Draft copy written in the company's voice — edit and delete this flag. */
  draft?: boolean;
  needsContent?: boolean;
};

/* Fifteen years of history. The text is drafted; every year and every
   specific claim is bracketed, because those are facts and we don't guess. */
export const timeline: Milestone[] = [
  {
    year: '[YEAR]',
    title: 'A small team starts',
    body:
      'ParseLab starts in Dhaka with [number] people. Merchants selling made-to-order goods were using spreadsheets and email, because most software assumed products sit finished on a shelf.',
    draft: true,
  },
  {
    year: '[YEAR]',
    title: 'The first app ships',
    body:
      '[Product name] goes live on the [App Store / marketplace]. It did less than we wanted and more than merchants expected.',
    draft: true,
  },
  {
    year: '[YEAR]',
    title: 'InkyBay',
    body:
      'The customiser starts as a feature request and becomes a product. Once real print orders flowed through it, the main problem changed: stopping shoppers from designing something a printer cannot make.',
    draft: true,
  },
  {
    year: '[YEAR]',
    title: 'Beyond Bangladesh',
    body:
      'Offices open in [US city] and Dubai. Most merchants were already elsewhere, so we organised the company around them.',
    draft: true,
  },
  {
    year: '[YEAR]',
    title: 'Optionia',
    body:
      'A second, narrower app. InkyBay lets shoppers design a product. Optionia adds the extra options that Shopify variants cannot handle.',
    draft: true,
  },
  {
    year: '2026',
    title: 'Built for Shopify',
    body:
      'We are taking all our products through App Store review and Built for Shopify checks. That means speed targets, admin standards and many small fixes.',
    draft: true,
  },
];

export const principles = [
  { title: 'Useful before impressive.', body: 'A feature must solve a real problem. Looking good in a demo is not enough.' },
  { title: 'The merchant is the user we never meet.', body: 'Their customers do the clicking. We design for both, and they want different things.' },
  { title: 'Options are a design problem.', body: 'Anything with options can become confusing. Most of our work is deciding what not to show.' },
  { title: 'Ship, watch, correct.', body: 'We prefer small releases that we watch closely.' },
];

export const process = [
  { step: 'Listen', body: 'We read support messages, App Store reviews and merchant calls. We start with what is breaking.' },
  { step: 'Frame', body: 'We turn each complaint into a decision: what the product should do, and what it should not.' },
  { step: 'Prototype', body: 'We build a working front end early. Design files help us think; the browser is where we agree.' },
  { step: 'Ship', body: 'We release in small steps, with the same review every time.' },
  { step: 'Watch', body: 'New tickets and reviews come in. That starts the next loop.' },
];
