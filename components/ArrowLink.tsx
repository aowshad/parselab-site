'use client';

import Link from 'next/link';

type Props = {
  href: string;
  children: string;
  className?: string;
  /** Use on dark surfaces. */
  invert?: boolean;
};

/**
 * The link treatment for the whole site: rule draws in from the left,
 * arrow steps once. One idea, reused, instead of five link styles.
 */
export default function ArrowLink({ href, children, className = '', invert = false }: Props) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex items-baseline gap-2 pb-1 text-lead wdth-narrow ${
        invert ? 'text-paper' : 'text-ink'
      } ${className}`}
    >
      <span>{children}</span>
      <span aria-hidden className="translate-y-[-1px] transition-transform duration-fast ease-out group-hover:translate-x-1">
        ↗
      </span>
      <span
        aria-hidden
        className={`absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-base ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 ${
          invert ? 'bg-accent' : 'bg-accent'
        }`}
      />
      <span aria-hidden className={`absolute inset-x-0 bottom-0 h-px ${invert ? 'bg-rule-dark' : 'bg-rule'}`} />
    </Link>
  );
}
