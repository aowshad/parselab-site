import type { Metadata } from 'next';
import AnimatedText from '@/components/AnimatedText';
import InsightsList from '@/components/InsightsList';
import SectionLabel from '@/components/SectionLabel';

export const metadata: Metadata = {
  title: 'Insights',
  description: 'Notes on building and running commerce software.',
};

export default function InsightsPage() {
  return (
    <>
      <section className="shell pb-16 pt-[calc(var(--nav-h)+7rem)]">
        <SectionLabel className="mb-10">Insights</SectionLabel>
        <AnimatedText as="h1" onMount lines={['Notes from', 'building.']} className="wdth-tight text-hero" />
        <div className="mt-12 grid-12">
          <p className="col-span-4 max-w-measure-wide text-lead text-ink-soft md:col-span-6 md:col-start-7">
            Product decisions, engineering write-ups and the occasional post-mortem. Mostly written
            after something broke.
          </p>
        </div>
      </section>

      <section className="shell pb-section pt-10">
        <InsightsList />
      </section>
    </>
  );
}
