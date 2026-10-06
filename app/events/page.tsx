import type { Metadata } from 'next';
import Link from 'next/link';
import AnimatedText from '@/components/AnimatedText';
import ImageFrame from '@/components/ImageFrame';
import Placeholder from '@/components/Placeholder';
import Reveal from '@/components/Reveal';
import SectionLabel from '@/components/SectionLabel';
import { events } from '@/content/events';

export const metadata: Metadata = {
  title: 'Events',
  description: 'Conferences, community events and the things we run ourselves.',
};

function EventRow({ slug, name, date, location, kind, needsContent }: (typeof events)[number]) {
  return (
    <li className="border-b border-rule">
      <Link href={`/events/${slug}`} className="group grid grid-cols-4 items-baseline gap-4 py-6 md:grid-cols-12">
        <span className="col-span-3 md:col-span-6">
          <span className="block text-title wdth-tight transition-transform duration-base ease-out group-hover:translate-x-2">
            {needsContent ? <Placeholder label="[ADD EVENT]" /> : name}
          </span>
        </span>
        <span className="meta col-span-1 hidden md:col-span-2 md:block">{kind}</span>
        <span className="meta col-span-2 hidden md:col-span-2 md:block">{location}</span>
        <span className="meta tnum col-span-4 md:col-span-2 md:text-right">{date}</span>
      </Link>
    </li>
  );
}

export default function EventsPage() {
  const photoStories = [
    { slot: 'crowd', src: '/life/team-day-hoodies.jpg', alt: 'Colleagues in black hoodies laughing together in a garden' },
    { slot: 'stage', src: '/life/team-day-portrait.jpg', alt: 'A man holding a young girl in a garden' },
    { slot: 'detail', src: '/life/team-day-garden.jpg', alt: 'Colleagues and families playing football on a lawn' },
    { slot: 'team', src: '/life/team-day-bike.jpg', alt: 'A boy pushing a toddler on a small red bicycle' },
  ];
  const [featured, ...others] = events;
  const upcoming = others.filter((e) => e.upcoming);
  const past = others.filter((e) => !e.upcoming);

  return (
    <>
      <section className="shell pb-16 pt-[calc(var(--nav-h)+7rem)]">
        <SectionLabel className="mb-10">Events</SectionLabel>
        <AnimatedText as="h1" onMount lines={['Out of the', 'office.']} className="wdth-tight text-hero" />
        <div className="mt-12 grid-12">
          <p className="col-span-4 max-w-measure-wide text-lead text-ink-soft md:col-span-6 md:col-start-7">
            Conferences we speak at, community events we turn up to, and the things we run
            ourselves. Photography from each one, not stock images of lanyards.
          </p>
        </div>
      </section>

      {featured && (
        <section className="shell pt-10">
          <div className="border-t border-rule pt-10">
            <SectionLabel className="mb-8">Featured</SectionLabel>
            <Link href={`/events/${featured.slug}`} className="group block">
              <ImageFrame
                slot={`event · ${featured.needsContent ? 'featured slot' : featured.name}`}
                src={featured.hero}
                alt={featured.needsContent ? '' : featured.name}
                ratio="21 / 9"
                hint="real event photography · 2400×1030"
                sizes="100vw"
                interactive
                priority
              />
              <div className="mt-8 grid-12 gap-y-4">
                <h2 className="col-span-4 text-display wdth-tight transition-transform duration-base ease-out group-hover:translate-x-2 md:col-span-7">
                  {featured.needsContent ? <Placeholder label="[ADD EVENT]" /> : featured.name}
                </h2>
                <p className="meta col-span-4 self-end md:col-span-4 md:col-start-9 md:text-right">
                  {featured.date} · {featured.location} · {featured.kind}
                </p>
              </div>
              <p className="mt-6 max-w-measure-wide text-lead text-ink-soft">{featured.summary}</p>
            </Link>
          </div>
        </section>
      )}

      <section className="shell pt-section">
        <div className="grid-12 gap-y-8 border-t border-rule pb-8 pt-10">
          <SectionLabel className="col-span-4 md:col-span-3">Upcoming</SectionLabel>
        </div>
        {upcoming.length ? (
          <ul className="border-t border-rule">{upcoming.map((e) => <EventRow key={e.slug} {...e} />)}</ul>
        ) : (
          <p className="border-y border-rule py-10 text-lead text-ink-muted">
            Nothing scheduled at the moment. Past events are below.
          </p>
        )}
      </section>

      <section className="shell pt-section">
        <div className="grid-12 gap-y-8 border-t border-rule pb-8 pt-10">
          <SectionLabel className="col-span-4 md:col-span-3">Archive</SectionLabel>
        </div>
        <ul className="border-t border-rule">{past.map((e) => <EventRow key={e.slug} {...e} />)}</ul>
      </section>

      <section className="shell py-section">
        <div className="grid-12 gap-y-8 border-t border-rule pt-10">
          <SectionLabel className="col-span-4 md:col-span-3">Photo stories</SectionLabel>
        </div>
        <ul className="mt-12 grid-12 gap-y-12">
          {photoStories.map((s, i) => (
            <li key={s.slot} className={`col-span-4 ${i % 2 ? 'md:col-span-5 md:col-start-8 md:mt-16' : 'md:col-span-6'}`}>
              <Reveal delay={i}>
                <ImageFrame
                  slot={`event photo · ${s.slot}`}
                  src={s.src}
                  alt={s.alt}
                  ratio={i % 2 ? '4 / 5' : '3 / 2'}
                  hint="1600×1066"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
