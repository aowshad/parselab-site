export type Brand = {
  id: string;
  name: string;
  /** /public/brands/<id>.svg — monochrome mark, transparent background. */
  logo?: string;
  /** Which product they use. */
  product?: string;
  needsContent?: boolean;
};

/* No invented customers. Twelve replaceable slots — drop a real logo and
   name into each as permission is granted. */
export const brands: Brand[] = Array.from({ length: 12 }, (_, i) => ({
  id: `brand-${i + 1}`,
  name: '[ADD CUSTOMER LOGO]',
  needsContent: true,
}));
