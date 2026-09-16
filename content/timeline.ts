export type Milestone = {
  year: string;
  title: string;
  body: string;
  image?: string;
  /** Draft copy written in the company's voice — edit and delete this flag. */
  draft?: boolean;
  needsContent?: boolean;
};

/* Fifteen years of history. The narrative is drafted; every year and every
   specific claim is bracketed, because those are facts and we don't guess. */
export const timeline: Milestone[] = [
  {
    year: '[YEAR]',
    title: 'A small team, a large backlog',
    body:
      'ParseLab starts in Dhaka with [number] people and a simple observation: merchants selling made-to-order goods were running their businesses on spreadsheets and email attachments, because the software assumed every product sat finished on a shelf.',
    draft: true,
  },
  {
    year: '[YEAR]',
    title: 'The first app ships',
    body:
      '[Product name] goes live on the [App Store / marketplace]. It does less than we wanted and more than merchants expected, which turned out to be the correct order.',
    draft: true,
  },
  {
    year: '[YEAR]',
    title: 'InkyBay',
    body:
      'The customiser starts as a feature request and becomes a product. Once real print orders began running through it, the design problem changed: not how to offer more options, but how to stop a shopper from designing something a printer cannot produce.',
    draft: true,
  },
  {
    year: '[YEAR]',
    title: 'Past Bangladesh',
    body:
      'Offices open in [US city] and Dubai. Most of our merchants had always been elsewhere; this was the year the company arranged itself around that fact rather than around a time zone.',
    draft: true,
  },
  {
    year: '[YEAR]',
    title: 'Optionia',
    body:
      'A second app, deliberately narrower. Where InkyBay lets a shopper design something, Optionia handles the products that just need options Shopify’s variant model cannot express.',
    draft: true,
  },
  {
    year: '2026',
    title: 'Built for Shopify',
    body:
      'Working the whole product line through App Store review and Built for Shopify compliance — performance budgets, embedded admin standards, and a lot of small corrections to things that had been fine for years.',
    draft: true,
  },
];

export const principles = [
  { title: 'Useful before impressive.', body: 'A feature earns its place by removing a support ticket, not by demoing well.' },
  { title: 'The merchant is the user we never meet.', body: 'Their customers are the ones clicking. We design for both, and they want different things.' },
  { title: 'Configuration is a design problem.', body: 'Anything with options can be made incomprehensible. Most of our work is deciding what not to show.' },
  { title: 'Ship, watch, correct.', body: 'We would rather be wrong in public on Tuesday than right in private in April.' },
];

export const process = [
  { step: 'Listen', body: 'Support conversations, App Store reviews and merchant calls. We start from what is already breaking.' },
  { step: 'Frame', body: 'Turn the complaint into a decision: what the product should do, and what it should refuse to do.' },
  { step: 'Prototype', body: 'Working frontend early. Design files are for thinking; the browser is where we agree.' },
  { step: 'Ship', body: 'Small releases, behind the same review bar every time.' },
  { step: 'Watch', body: 'Tickets and reviews come back in. That is the start of the next loop, not the end of this one.' },
];
