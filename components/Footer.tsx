import Link from 'next/link';
import { company, footerNav, legalNav, social } from '@/content/site';
import { offices } from '@/content/offices';
import AnalogClock from './AnalogClock';
import Logo from './Logo';
import Placeholder from './Placeholder';
import Reveal from './Reveal';

export default function Footer() {
  return (
    <footer className="dark-section relative overflow-hidden bg-ink pt-section">
      <div className="shell">
        {/* Navigation */}
        <div className="grid-12 gap-y-12 border-t border-rule-dark pt-10">
          <div className="col-span-4 md:col-span-4">
            <p className="max-w-[28ch] text-lead text-paper/70">{company.what}</p>
          </div>

          {footerNav.map((group, i) => (
            <nav
              key={group.heading}
              className={`col-span-2 md:col-span-2 ${i === 0 ? 'md:col-start-6' : ''}`}
              aria-label={group.heading}
            >
              <p className="meta mb-4">{group.heading}</p>
              <ul className="space-y-2">
                {group.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-nav text-paper/80 transition-colors hover:text-accent">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 md:col-span-3">
            <p className="meta mb-4">Elsewhere</p>
            <ul className="space-y-2">
              {social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="text-nav text-paper/80 transition-colors hover:text-accent">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Three offices, three faces. The countries sit with the clocks rather
            than stranded in the legal line at the bottom. */}
        <div className="mt-16 border-t border-rule-dark pt-8 md:mt-24">
          <div className="grid-12 gap-y-10">
            <Link
              href="/contact#offices"
              className="group col-span-4 flex flex-wrap items-center gap-x-10 gap-y-6 md:col-span-7"
              aria-label="Our offices"
            >
              {offices.map((o) => (
                <AnalogClock key={o.id} timeZone={o.timeZone} code={o.code} label={o.country} />
              ))}
            </Link>

            <div className="col-span-4 self-center md:col-span-4 md:col-start-9">
              <p className="meta mb-3">Where we work</p>
              <ul className="space-y-1">
                {offices.map((o) => (
                  <li key={o.id}>
                    <Link
                      href="/contact#offices"
                      className="group flex items-baseline justify-between gap-4 border-b border-rule-dark py-1.5"
                    >
                      <span className="wdth-narrow text-[1.05rem] text-paper transition-colors group-hover:text-accent">
                        {o.country}
                      </span>
                      <span className="meta">{o.city ?? '—'}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div id="contact" className="mt-16 border-t border-rule-dark pt-10">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="meta mb-3">Start a conversation</p>
              {company.emailNeedsContent ? (
                <Placeholder label="confirm contact address" />
              ) : (
                <a href={`mailto:${company.email}`} className="text-title wdth-tight text-paper hover:text-accent">
                  {company.email}
                </a>
              )}
            </div>
            <Link
              href="/contact"
              className="group inline-flex items-baseline gap-2 border-b border-rule-dark pb-1 text-[1.05rem] wdth-narrow text-paper transition-colors hover:border-accent"
            >
              Contact the studio
              <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* Legal sits ABOVE the wordmark, so no rule ever crosses the letterforms. */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-rule-dark py-6">
          <p className="meta">© {new Date().getFullYear()} {company.legal}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="meta transition-colors hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* The wordmark closes the page and bleeds off the bottom edge.
          Full brand colour, held back by opacity so it stays a sign-off. */}
      <div className="shell overflow-hidden pb-0">
        <Reveal as="wipe">
          <Logo className="-mb-[2.2%] block w-full opacity-30" />
        </Reveal>
      </div>
    </footer>
  );
}
