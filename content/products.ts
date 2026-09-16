export type Product = {
  id: string;
  name: string;
  category: string;
  line: string;
  body: string;
  platform: string;
  status: 'Live' | 'In review' | 'In build';
  facts: { k: string; v: string }[];
  /** /public/products/<id>-mark.svg — a wordmark or app icon. */
  logo?: string;
  /** Product screenshot or photograph of the output. */
  visual?: string;
  href?: string;
  needsContent?: boolean;
};

/* 5+ products confirmed. Two are named and verified; the rest are
   editable slots. Nothing here is invented. */
export const products: Product[] = [
  {
    id: 'inkybay',
    name: 'InkyBay',
    category: 'Product customisation',
    line: 'Product customiser for print-on-demand and made-to-order stores.',
    body:
      'Shoppers design the thing they are buying — text, artwork, colours, placement — and the store receives a print-ready file with the order. Built for merchants whose catalogue is really one product and a very large number of decisions.',
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
    line: 'Product options and conditional logic beyond Shopify’s variant limits.',
    body:
      'Adds option sets, conditional fields and per-option pricing to products that do not fit a variant matrix. Currently going through App Store review and Built for Shopify compliance.',
    platform: 'Shopify',
    status: 'In review',
    facts: [
      { k: 'Surface', v: 'Storefront + admin' },
      { k: 'Track', v: 'Built for Shopify' },
    ],
    visual: '/products/optionia-visual.webp',
  },
  {
    id: 'productsmodel',
    name: 'ProductsModel',
    category: 'Marketplace',
    line: 'Verified, simulation-ready 3D models of industrial and engineering hardware.',
    body:
      'CONFIRM BEFORE PUBLISHING: include this entry only if ProductsModel is a ParseLab product. Rewrite this description in the company’s own words, or delete the entry.',
    platform: 'Web',
    status: 'In build',
    facts: [{ k: 'Surface', v: 'Web' }],
    needsContent: true,
  },
  {
    id: 'product-4',
    name: '[ADD PRODUCT]',
    category: '—',
    line: 'Replace with a real product.',
    body:
      'Empty slot. Paste the product name, category, platform, status and a two-sentence description. The layout re-flows for any number of products.',
    platform: '—',
    status: 'In build',
    facts: [{ k: 'Surface', v: '—' }],
    needsContent: true,
  },
  {
    id: 'product-5',
    name: '[ADD PRODUCT]',
    category: '—',
    line: 'Replace with a real product.',
    body: 'Empty slot.',
    platform: '—',
    status: 'In build',
    facts: [{ k: 'Surface', v: '—' }],
    needsContent: true,
  },
];

export const flagshipId = 'inkybay';
