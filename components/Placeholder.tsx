import type { ReactNode } from 'react';

/**
 * Nothing on this site invents facts. Where real content is missing,
 * this renders a visible, unmistakable gap instead.
 */
export default function Placeholder({
  label,
  children,
  className = '',
}: {
  label: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 border border-dashed border-accent/60 px-2 py-1 font-mono text-micro text-accent-ink ${className}`}
      data-content-needed
    >
      <span aria-hidden className="block h-1.5 w-1.5 bg-accent" />
      {label}
      {children}
    </span>
  );
}
