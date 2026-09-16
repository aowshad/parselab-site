export type Testimonial = {
  id: string;
  quote: string;
  person: string;
  role: string;
  org: string;
  product: string;
  /** Portrait or a photo of their product. */
  visual?: string;
  needsContent?: boolean;
};

/* Quotes are never written for customers. These are structured empties;
   paste real, attributed quotes with permission. */
export const testimonials: Testimonial[] = [
  { id: 't1', quote: '[ADD TESTIMONIAL]', person: '[Name]', role: '[Role]', org: '[Company]', product: 'InkyBay', needsContent: true },
  { id: 't2', quote: '[ADD TESTIMONIAL]', person: '[Name]', role: '[Role]', org: '[Company]', product: 'Optionia', needsContent: true },
  { id: 't3', quote: '[ADD TESTIMONIAL]', person: '[Name]', role: '[Role]', org: '[Company]', product: 'InkyBay', needsContent: true },
];
