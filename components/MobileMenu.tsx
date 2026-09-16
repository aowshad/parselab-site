'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { company, nav, social } from '@/content/site';
import { offices } from '@/content/offices';
import { dur, ease } from '@/lib/motion';

export default function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="site-menu"
          className="dark-section fixed inset-0 z-40 flex flex-col justify-between bg-ink px-gutter pb-10 pt-[calc(var(--nav-h)+2rem)] lg:hidden"
          initial={reduced ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
          animate={reduced ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
          exit={reduced ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: dur.base, ease: ease.inOut }}
        >
          <nav aria-label="Main">
            <ul>
              {nav.map((item, i) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href} className="border-b border-rule-dark">
                    <motion.div
                      className="overflow-hidden py-[0.16em] -my-[0.16em]"
                      initial={reduced ? false : { y: '110%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: dur.slow, ease: ease.out, delay: 0.1 + i * 0.07 }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="flex items-baseline justify-between py-5 text-display wdth-tight text-paper"
                      >
                        {item.label}
                        {active && <span aria-hidden className="h-2 w-2 shrink-0 bg-accent" />}
                      </Link>
                    </motion.div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <motion.div
            className="flex flex-wrap items-end justify-between gap-6"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: dur.base, delay: 0.35 }}
          >
            <div className="meta">
              <p>{offices.map((o) => o.code).join(' · ')}</p>
              <p className="tnum">{company.city} {company.timezone}</p>
            </div>
            <ul className="meta flex flex-wrap gap-x-5 gap-y-1">
              {social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="hover:text-accent">{s.label}</a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
