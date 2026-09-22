import Link from 'next/link';
import { journal } from '@/content/journal';
import ImageFrame from './ImageFrame';
import Placeholder from './Placeholder';

/**
 * Journal as a picture-led grid. The underline draw-in on the title uses
 * the same origin-left scale-x mechanic as ArrowLink — one idea, reused.
 */
export default function InsightsList() {
  if (journal.length === 0) {
    return <p className="text-lead text-ink-muted">Nothing published yet. The first note is being written.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-x-[clamp(1.75rem,3vw,2.5rem)] gap-y-[clamp(1.75rem,3vw,2.5rem)] sm:grid-cols-2 min-[960px]:grid-cols-3">
      {journal.map((e) => (
        <Link key={e.id} href={e.href} className="group block">
          <ImageFrame
            slot={`insight · ${e.title}`}
            src={e.thumbnail}
            alt={e.needsContent ? '' : e.title}
            ratio="3 / 2"
            hint="1600×1066"
            interactive
            sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 33vw"
          />
          <div className="relative mt-4 inline-block pb-1">
            <h3 className="text-[clamp(1.15rem,1.6vw,1.4rem)] wdth-narrow leading-[1.25]">
              {e.needsContent ? <Placeholder label="[ADD BLOG]" /> : e.title}
            </h3>
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-base ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
            />
          </div>
          <p className="meta mt-2">
            {e.kind} · {e.date}
          </p>
        </Link>
      ))}
    </div>
  );
}
