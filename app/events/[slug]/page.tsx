import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AnimatedText from '@/components/AnimatedText';
import ArrowLink from '@/components/ArrowLink';
import ImageFrame from '@/components/ImageFrame';
import Placeholder from '@/components/Placeholder';
import SectionLabel from '@/components/SectionLabel';
import { events } from '@/content/events';
import { people } from '@/content/team';
import { products } from '@/content/products';

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  return { title: event?.needsContent ? 'Event' : event?.name ?? 'Event' };
}

export default async function EventDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();

  const involved = people.filter((p) => event.people?.includes(p.id));
  const related = products.filter((p) => event.products?.includes(p.id));

  return (
    <>
      <section className="shell pb-12 pt-[calc(var(--nav-h)+7rem)]">
        <Link href="/events" className="meta group inline-flex items-center gap-2 text-accent-ink">
          <span aria-hidden className="transition-transform duration-fast group-hover:-translate-x-1">←</span>
          All events
        </Link>
        <div className="mt-10">
          {event.needsContent ? (
            <h1 className="text-hero wdth-tight">
              <Placeholder label="[ADD EVENT]" />
            </h1>
          ) : (
            <AnimatedText as="h1" onMount lines={[event.name]} className="wdth-tight text-hero" />
          )}
        </div>
        <dl className="mt-10 grid-12 gap-y-6 border-t border-rule pt-6">
          {[
            { k: 'Date', v: event.date },
            { k: 'Location', v: event.location },
            { k: 'Type', v: event.kind },
          ].map((f) => (
            <div key={f.k} className="col-span-2 md:col-span-3">
              <dt className="meta">{f.k}</dt>
              <dd className="mt-2 wdth-narrow text-[1.05rem]">{f.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="shell">
        <ImageFrame
          slot={`event hero · ${event.needsContent ? 'unassigned' : event.name}`}
          src={event.hero}
          alt={event.needsContent ? '' : event.name}
          ratio="21 / 9"
          hint="2400×1030"
          sizes="100vw"
          priority
        />
      </section>

      <section className="shell pt-section">
        <div className="grid-12 gap-y-8">
          <SectionLabel className="col-span-4 md:col-span-3">The story</SectionLabel>
          <div className="col-span-4 md:col-span-7">
            <p className="text-lead text-ink-soft">{event.summary}</p>
            {event.story ? (
              <p className="mt-6 text-ink-soft">{event.story}</p>
            ) : (
              <Placeholder label="[ADD EVENT STORY]" className="mt-8" />
            )}
          </div>
        </div>
      </section>

      <section className="shell pt-section">
        <div className="grid-12 gap-y-8 border-t border-rule pt-10">
          <SectionLabel className="col-span-4 md:col-span-3">Gallery</SectionLabel>
        </div>
        <ul className="mt-12 grid-12 gap-y-12">
          {(event.gallery?.length ? event.gallery : [undefined, undefined, undefined, undefined]).map((src, i) => (
            <li key={i} className={`col-span-4 ${i % 3 === 0 ? 'md:col-span-7' : 'md:col-span-5'} ${i % 2 ? 'md:mt-16' : ''}`}>
              <ImageFrame
                slot={`gallery · ${String(i + 1).padStart(2, '0')}`}
                src={src}
                alt=""
                ratio={i % 3 === 0 ? '3 / 2' : '4 / 5'}
                hint="1600×1066"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="shell pt-section">
        <div className="grid-12 gap-y-10 border-t border-rule pt-10">
          <SectionLabel className="col-span-4 md:col-span-3">Who went</SectionLabel>
          <div className="col-span-4 md:col-span-9">
            {involved.length ? (
              <ul className="flex flex-wrap gap-x-8 gap-y-3">
                {involved.map((p) => (
                  <li key={p.id} className="wdth-narrow text-[1.05rem]">
                    {p.name} <span className="meta">· {p.role}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <Placeholder label="link team members by id in content/events.ts" />
            )}
            {related.length > 0 && (
              <p className="meta mt-8">Related: {related.map((p) => p.name).join(', ')}</p>
            )}
          </div>
        </div>
      </section>

      <section className="shell py-section">
        <ArrowLink href="/events">Back to all events</ArrowLink>
      </section>
    </>
  );
}
