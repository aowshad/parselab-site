'use client';

import { noOpenRoles } from '@/content/careers';

/**
 * Renders only when there are actually open roles. A footer badge saying
 * "Hiring" next to a careers page saying "no open roles" is worse than no
 * badge, so both read the same flag.
 *
 * A badge at the site's 3px radius rather than a full pill — every other
 * corner here is 0–3px, and one rounded element would be the odd thing out.
 */
export default function HiringBadge() {
  if (noOpenRoles) return null;

  return (
    <span className="pl-badge ml-2.5 inline-flex items-center gap-1.5 rounded-sm border border-accent/40 bg-accent/10 px-2 py-[3px] align-[2px] font-text text-[0.75rem] leading-none tracking-[0.03em] text-accent-ink">
      <span aria-hidden className="pl-dot relative block h-1.5 w-1.5 shrink-0 bg-accent" />
      <span className="pl-label">Hiring</span>
      <style jsx>{`
        .pl-dot::after {
          content: '';
          position: absolute;
          inset: 0;
          background: currentColor;
          color: theme('colors.accent.DEFAULT');
          animation: plRing 2s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
        @keyframes plRing {
          0% { transform: scale(1); opacity: 0.55; }
          70%, 100% { transform: scale(2.8); opacity: 0; }
        }
        .pl-label { animation: plBreathe 2s ease-in-out infinite; }
        @keyframes plBreathe {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.55; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pl-dot::after { animation: none; opacity: 0; }
          .pl-label { animation: none; }
        }
      `}</style>
    </span>
  );
}
