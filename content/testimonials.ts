export type Testimonial = {
  id: string;
  quote: string;
  person: string;
  role: string;
  org: string;
  product: string;
  /** Optional portrait or product photo. The card shows no image without one. */
  visual?: string;
  needsContent?: boolean;
};

/* Quotes are never written for customers. These are structured empties;
   paste real, attributed quotes with permission. */
export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Inkybay makes product customization easy and hassle-free! The interface is smooth, the features are powerful, and my customers love the freedom to design exactly what they want. It’s reliable — no glitches, no confusion — just a flawless experience. Plus, their support team is always there when I need them. A must-have for any custom product business!',
    person: 'Al Aowshad Himel',
    role: 'Product Designer',
    org: 'ParseLab',
    product: 'InkyBay',
  },
  { id: 't2', quote: '[ADD TESTIMONIAL]', person: '[Name]', role: '[Role]', org: '[Company]', product: 'Optionia', needsContent: true },
  { id: 't3', quote: '[ADD TESTIMONIAL]', person: '[Name]', role: '[Role]', org: '[Company]', product: 'InkyBay', needsContent: true },
];
