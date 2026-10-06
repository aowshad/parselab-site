export type Product = {
  id: string;
  name: string;
  category: string;
  line: string;
  body: string;
  platform: string;
  status: 'Live' | 'In review' | 'In build' | '—';
  facts: { k: string; v: string }[];
  /** /public/products/<id>-mark.svg — a wordmark or app icon. */
  logo?: string;
  /** Product screenshot or photograph of the output. */
  visual?: string;
  href?: string;
  needsContent?: boolean;
};

/* Four products. InkyBay and Optionia are verified; JewelsLab and Quotend
   carry only their name (and JewelsLab’s tagline from its logo) until the
   details are supplied. Nothing here is invented. */
export const products: Product[] = [
  {
    id: 'inkybay',
    name: 'InkyBay',
    category: 'Product customisation',
    line: 'Product customiser for print-on-demand and made-to-order stores.',
    body:
      'Shoppers design what they buy: text, artwork, colours and placement. The store gets a print-ready file with the order. Built for stores that sell one product with many choices.',
    platform: 'Shopify',
    status: 'Live',
    facts: [
      { k: 'Surface', v: 'Storefront + admin' },
      { k: 'Also known as', v: 'ProductsDesigner' },
    ],
    visual: '/products/inkybay-visual.webp',
  },
  {
    id: 'optionia',
    name: 'Optionia',
    category: 'Product options',
    line: 'Product options beyond Shopify’s variant limits.',
    body:
      'Adds option sets, conditional fields and per-option pricing to products that do not fit Shopify variants. Now in App Store review and Built for Shopify checks.',
    platform: 'Shopify',
    status: 'In review',
    facts: [
      { k: 'Surface', v: 'Storefront + admin' },
      { k: 'Track', v: 'Built for Shopify' },
    ],
    visual: '/products/optionia-visual.webp',
  },
  {
    id: 'jewelslab',
    name: 'JewelsLab',
    category: 'Custom jewelry personalizer',
    line: 'Custom jewelry personalizer.',
    body:
      '[ADD DESCRIPTION: two short sentences on what JewelsLab does.]',
    platform: '—',
    status: '—',
    facts: [{ k: 'Surface', v: '—' }],
    visual: '/products/jewelslab-visual.webp',
    needsContent: true,
  },
  {
    id: 'quotend',
    name: 'Quotend',
    category: '—',
    line: '[ADD ONE-LINE DESCRIPTION]',
    body:
      '[ADD DESCRIPTION: two short sentences on what Quotend does.]',
    platform: '—',
    status: '—',
    facts: [{ k: 'Surface', v: '—' }],
    visual: '/products/quotend-visual.webp',
    needsContent: true,
  },
];

export const flagshipId = 'inkybay';
