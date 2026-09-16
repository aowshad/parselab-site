import Link from 'next/link';
import { company, footerNav, legalNav, social } from '@/content/site';
import { offices, headOfficeId } from '@/content/offices';
import AnalogClock from './AnalogClock';
import CopyEmail from './CopyEmail';
import HiringBadge from './HiringBadge';
import Logo from './Logo';
import Marquee from './Marquee';
import Placeholder from './Placeholder';
import Reveal from './Reveal';

/**
 * The page ends on ink — the only surface change after the hero, which is what
 * makes it read as a full stop rather than the page running out.
 *
 * Structure: marquee band → navigation → one Offices block (all three
 * locations in a row, head office details beneath) → legal → wordmark
 * bleeding off the bottom edge.
 *
 * Spacing between blocks is a single value, --footer-step, so the vertical
 * rhythm can't drift the way it does when each block carries its own clamp.
 */
export default function Footer() {
  const hq = offices.find((o) => o.id === headOfficeId)!;

  const field = (label: string, value: React.ReactNode, span: string) => (
    <div className={span}>
      <dt className="meta mb-2 text-[0.8125rem]">{label}</dt>
      {/* Values are content, not metadata: sans, body size, full strength. */}
      <dd className="text-[1.0625rem] leading-[1.45] text-ink">{value}</dd>
    </div>
  );

  return (
    <footer
      className="dark-section relative overflow-hidden bg-ink pt-section"
      style={{ ['--footer-step' as string]: 'clamp(2rem, 4vw, 3rem)' }}
    >
      <div className="shell">
        <Marquee />

        {/* Navigation */}
        <div className="grid-12 gap-y-10 pt-[var(--footer-step)]">
          <div className="col-span-4 md:col-span-4">
            <p className="max-w-[28ch] text-lead text-ink-soft">{company.what}</p>
          </div>

          {footerNav.map((group, i) => (
            <nav
              key={group.heading}
              className={`col-span-2 md:col-span-2 ${i === 0 ? 'md:col-start-6' : ''}`}
              aria-label={group.heading}
            >
              <p className="meta mb-2">{group.heading}</p>
              <ul>
                {group.links.map((l) => (
                  <li key={l.href} className="flex min-h-[44px] items-center">
                    <Link href={l.href} className="text-[1.0625rem] text-ink-soft transition-colors hover:text-accent-ink">
                      {l.label}
                      {l.href === '/careers' && <HiringBadge />}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 md:col-span-3">
            <p className="meta mb-2">Elsewhere</p>
            <ul>
              {social.map((s) => (
                <li key={s.label} className="flex min-h-[44px] items-center">
                  <a href={s.href} className="text-[1.0625rem] text-ink-soft transition-colors hover:text-accent-ink">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* One Offices block — all three locations get identical treatment,
            then the head office's contact details. */}
        <div className="grid-12 mt-[var(--footer-step)] gap-y-8 border-t border-rule pt-[var(--footer-step)]">
          <div className="col-span-4 md:col-span-3">
            <p className="meta">Offices</p>
            <p className="meta mt-3 max-w-[22ch]">Merchants in 150+ countries</p>
          </div>

          <div className="col-span-4 md:col-span-9 md:col-start-4">
            <div className="mb-11 flex flex-wrap gap-x-[clamp(2rem,4.5vw,4rem)] gap-y-8">
              {offices.map((o) => (
                <AnalogClock
                  key={o.id}
                  timeZone={o.timeZone}
                  name={o.city ? `${o.city}, ${o.country}` : o.country}
                  utc={o.utc}
                  tag={o.id === headOfficeId ? 'Head office' : undefined}
                />
              ))}
            </div>

            <dl className="grid grid-cols-1 gap-x-[clamp(0.75rem,1.6vw,1.75rem)] gap-y-7 sm:grid-cols-2 xl:grid-cols-9">
              {field('Address', hq.address ?? <Placeholder label="[ADD OFFICE ADDRESS]" />, 'xl:col-span-3')}
              {field(
                'Email',
                hq.email ? (
                  <span className="inline-flex items-center">
                    <a href={`mailto:${hq.email}`} className="border-b border-transparent transition-colors hover:border-accent hover:text-accent-ink">
                      {hq.email}
                    </a>
                    <CopyEmail email={hq.email} />
                  </span>
                ) : (
                  <Placeholder label="[ADD EMAIL]" />
                ),
                'xl:col-span-2',
              )}
              {field(
                'Hotline',
                hq.phone ? (
                  <a href={`tel:${hq.phone.replace(/\s/g, '')}`} className="border-b border-transparent transition-colors hover:border-accent hover:text-accent-ink">
                    {hq.phone}
                  </a>
                ) : (
                  <Placeholder label="[ADD PHONE]" />
                ),
                'xl:col-span-2',
              )}
              {field('Office hours', hq.hours ?? <Placeholder label="[ADD HOURS]" />, 'xl:col-span-2')}
            </dl>
          </div>
        </div>

        {/* Legal sits above the wordmark so no rule crosses the letterforms. */}
        <div className="mt-[var(--footer-step)] flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-rule py-6">
          <p className="meta">© {new Date().getFullYear()} {company.legal}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="meta transition-colors hover:text-accent-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="shell overflow-hidden">
        <Reveal as="wipe">
          <Logo className="-mb-[2.2%] block w-full opacity-[0.16]" />
        </Reveal>
      </div>
    </footer>
  );
}
