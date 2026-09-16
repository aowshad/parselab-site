import Link from 'next/link';
import { events } from '@/content/events';
import ImageFrame from './ImageFrame';
import Placeholder from './Placeholder';
import Reveal from './Reveal';

/**
 * One event given the room, two given a line each. Reads as a story
 * rather than three equal cards.
 */
export default function EventStory() {
  const [lead, ...rest] = events;
  if (!lead) return null;

  return (
    <div className="grid-12 gap-y-12">
      <div className="col-span-4 md:col-span-7">
        <Link href={`/events/${lead.slug}`} className="group block">
          <ImageFrame
            slot={`event · ${lead.needsContent ? 'featured slot' : lead.name}`}
            src={lead.hero}
            alt={lead.needsContent ? '' : lead.name}
            ratio="3 / 2"
            hint="real event photography · 1800×1200"
            sizes="(max-width: 768px) 100vw, 56vw"
            interactive
          />
          <div className="mt-5 flex items-baseline justify-between gap-4">
            <h3 className="text-title wdth-tight transition-transform duration-base ease-out group-hover:translate-x-1">
              {lead.needsContent ? <Placeholder label="[ADD EVENT]" /> : lead.name}
            </h3>
            <span aria-hidden className="meta text-accent opacity-0 transition-opacity duration-base group-hover:opacity-100">↗</span>
          </div>
          <p className="meta mt-2">
            {lead.date} · {lead.location} · {lead.kind}
          </p>
          <p className="mt-4 max-w-measure text-ink-soft">{lead.summary}</p>
        </Link>
      </div>

      <ul className="col-span-4 md:col-span-4 md:col-start-9 md:pt-6">
        {rest.map((e, i) => (
          <li key={e.slug} className="border-t border-rule last:border-b">
            <Reveal delay={i}>
              <Link href={`/events/${e.slug}`} className="group flex gap-5 py-6">
                <div className="w-24 shrink-0">
                  <ImageFrame
                    slot="event"
                    src={e.hero}
                    alt=""
                    ratio="1 / 1"
                    hint="600×600"
                    sizes="96px"
                    interactive
                  />
                </div>
                <div className="min-w-0">
                  <p className="wdth-narrow text-[1.05rem] transition-transform duration-base ease-out group-hover:translate-x-1">
                    {e.needsContent ? <Placeholder label="[ADD EVENT]" /> : e.name}
                  </p>
                  <p className="meta mt-2">{e.date}</p>
                  <p className="meta mt-1">{e.location}</p>
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}
