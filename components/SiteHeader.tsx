'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { company, nav } from '@/content/site';
import Logo from './Logo';
import MobileMenu from './MobileMenu';

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-base ease-out ${
          scrolled && !open ? 'bg-paper/85 backdrop-blur-[6px]' : 'bg-transparent'
        } ${open ? 'on-dark' : ''}`}
        style={{ height: 'var(--nav-h)' }}
      >
        <div className="shell flex h-full items-center justify-between">
          <Link
            href="/"
            className={`block transition-colors duration-base ${open ? 'text-paper' : 'text-ink'}`}
            aria-label={`${company.name} — home`}
          >
            <Logo className="h-[22px] w-auto md:h-[26px]" />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className="group relative inline-block py-2 text-nav wdth-narrow text-ink"
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={`absolute inset-x-0 -bottom-0.5 h-px bg-accent transition-transform duration-base ease-out ${
                          active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        } origin-left`}
                      />
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link
                  href="/#contact"
                  className="inline-flex min-h-[40px] items-center border border-rule px-4 text-nav wdth-narrow transition-colors duration-fast hover:border-accent hover:text-accent-ink"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            className={`-mr-2 flex h-11 w-11 items-center justify-center lg:hidden ${open ? 'text-paper' : 'text-ink'}`}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <span aria-hidden className="relative block h-3 w-6">
              <span
                className={`absolute left-0 block h-px w-6 bg-current transition-transform duration-base ease-out ${
                  open ? 'top-1.5 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-6 bg-current transition-transform duration-base ease-out ${
                  open ? 'top-1.5 -rotate-45' : 'top-3'
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} pathname={pathname} />
    </>
  );
}
