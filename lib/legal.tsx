import type { ReactNode } from 'react';
import AnimatedText from '@/components/AnimatedText';
import Placeholder from '@/components/Placeholder';
import SectionLabel from '@/components/SectionLabel';

/** Shared shell for the two legal pages so they stay on-system. */
export default function LegalPage({
  label,
  lines,
  intro,
  sections,
}: {
  label: string;
  lines: string[];
  intro: string;
  sections: { heading: string; body?: ReactNode }[];
}) {
  return (
    <>
      <section className="shell pb-16 pt-[calc(var(--nav-h)+7rem)]">
        <SectionLabel className="mb-10">{label}</SectionLabel>
        <AnimatedText as="h1" onMount lines={lines} className="wdth-tight text-display" />
        <div className="mt-10 grid-12">
          <p className="col-span-4 max-w-measure-wide text-lead text-ink-soft md:col-span-6 md:col-start-7">{intro}</p>
        </div>
      </section>

      <section className="shell pb-section">
        <ol className="border-t border-rule">
          {sections.map((s, i) => (
            <li key={s.heading} className="grid-12 gap-y-4 border-b border-rule py-10">
              <span className="meta tnum col-span-1 text-accent">{String(i + 1).padStart(2, '0')}</span>
              <h2 className="col-span-3 text-title wdth-tight md:col-span-4">{s.heading}</h2>
              <div className="col-span-4 max-w-measure-wide text-ink-soft md:col-span-6 md:col-start-6">
                {s.body ?? <Placeholder label="[ADD LEGAL COPY — have this reviewed by counsel]" />}
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
