export type Signal = {
  value: number;
  /** '+' or 'K+' — kept separate so the count-up animates the number only. */
  suffix: string;
  label: string;
  note?: string;
};

/* Verified figures only. */
export const signals: Signal[] = [
  { value: 15, suffix: '+', label: 'Years building software' },
  { value: 5, suffix: '+', label: 'Products shipped' },
  { value: 10, suffix: 'K+', label: 'People using our apps' },
  { value: 150, suffix: '+', label: 'Countries reached' },
  { value: 25, suffix: '+', label: 'People in the company' },
];
