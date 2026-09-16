'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

type Props = {
  href: string;
  children: string;
  variant?: 'solid' | 'ghost';
  className?: string;
};

/**
 * Tactile, not oversized. Magnetism is small (max 6px) and disabled
 * for reduced motion and for touch, where it does nothing useful.
 */
export default function MagneticButton({ href, children, variant = 'solid', className = '' }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setOffset({
      x: ((e.clientX - (r.left + r.width / 2)) / r.width) * 12,
      y: ((e.clientY - (r.top + r.height / 2)) / r.height) * 8,
    });
  };

  const base =
    'group relative inline-flex min-h-[48px] items-center gap-3 px-6 text-[0.95rem] wdth-narrow transition-colors duration-fast ease-out';
  const look =
    variant === 'solid'
      ? 'bg-ink text-paper hover:bg-accent'
      : 'border border-rule text-ink hover:border-accent hover:text-accent-ink';

  return (
    <Link
      ref={ref}
      href={href}
      className={`${base} ${look} ${className}`}
      onMouseMove={onMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: offset.x === 0 && offset.y === 0 ? 'transform 520ms cubic-bezier(0.16,1,0.3,1), background-color 220ms' : 'background-color 220ms',
      }}
    >
      {children}
      <span aria-hidden className="transition-transform duration-fast ease-out group-hover:translate-x-1">→</span>
    </Link>
  );
}
