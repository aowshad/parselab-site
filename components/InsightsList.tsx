import Link from 'next/link';
import { journal } from '@/content/journal';
import Placeholder from './Placeholder';

/**
 * Journal as an index. Numbering is legitimate here — it is an ordered
 * index. The featured entry is set larger; the rest stay as rows.
 */
export default function InsightsList() {
  if (journal.length === 0) {
    return <p className="text-lead text-ink-muted">Nothing published yet. The first note is being written.</p>;
  }

  const featured = journal.find((e) => e.featured);
  const rest = journal.filter((e) => e !== featured);

  return (
    <div>
      {featured && (
        <Link href={featured.href} className="group block border-t border-rule py-10">
          <div className="grid-12 items-baseline gap-y-4">
            <span className="meta tnum col-span-1 text-accent">01</span>
            <h3 className="col-span-3 text-display wdth-tight transition-transform duration-base ease-out group-hover:translate-x-2 md:col-span-8">
              {featured.needsContent ? <Placeholder label="[ADD BLOG]" /> : featured.title}
            </h3>
            <p className="meta col-span-4 md:col-span-3 md:text-right">
              {featured.kind} · {featured.date} · {featured.readingTime}
            </p>
          </div>
          {featured.standfirst && (
            <p className="mt-6 max-w-measure-wide text-lead text-ink-soft">{featured.standfirst}</p>
          )}
        </Link>
      )}

      <ul>
        {rest.map((e, i) => (
          <li key={e.id} className="border-t border-rule last:border-b">
            <Link href={e.href} className="group grid grid-cols-4 items-baseline gap-4 py-6 md:grid-cols-12">
              <span className="meta tnum col-span-1 text-accent">{String(i + 2).padStart(2, '0')}</span>
              <span className="col-span-3 md:col-span-6">
                <span className="block text-title wdth-tight transition-transform duration-base ease-out group-hover:translate-x-2">
                  {e.needsContent ? <Placeholder label="[ADD BLOG]" /> : e.title}
                </span>
                {e.standfirst && <span className="meta mt-2 block max-w-measure">{e.standfirst}</span>}
              </span>
              <span className="meta col-span-2 hidden md:col-span-2 md:block">{e.kind}</span>
              <span className="meta tnum col-span-4 md:col-span-3 md:text-right">
                {e.date} · {e.readingTime}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
