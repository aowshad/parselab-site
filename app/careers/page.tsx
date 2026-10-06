import type { Metadata } from 'next';
import AnimatedText from '@/components/AnimatedText';
import ArrowLink from '@/components/ArrowLink';
import ImageFrame from '@/components/ImageFrame';
import JobList from '@/components/JobList';
import Placeholder from '@/components/Placeholder';
import Reveal from '@/components/Reveal';
import SectionLabel from '@/components/SectionLabel';
import TeamsOverview from '@/components/TeamsOverview';
import { whyJoin, benefits, hiringProcess } from '@/content/careers';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Work on software products used in more than 150 countries.',
};

export default function CareersPage() {
  return (
    <>
      <section className="shell pb-16 pt-[calc(var(--nav-h)+7rem)]">
        <SectionLabel className="mb-10">Careers</SectionLabel>
        <AnimatedText
          as="h1"
          onMount
          lines={['Build products', 'people actually', 'use.']}
          className="wdth-tight text-hero"
        />
        <div className="mt-12 grid-12">
          <p className="col-span-4 max-w-measure-wide text-lead text-ink-soft md:col-span-6 md:col-start-7">
            Twenty-five people, four products and merchants in over 150 countries. Small enough
            that your work is seen. Established enough that it has to work.
          </p>
        </div>
      </section>

      {/* Why join */}
      <section className="shell pt-section">
        <div className="grid-12 gap-y-8 border-t border-rule pt-10">
          <SectionLabel className="col-span-4 md:col-span-3">Why join</SectionLabel>
        </div>
        <ul className="mt-12">
          {whyJoin.map((w, i) => (
            <li key={w.claim} className="border-t border-rule py-12 last:border-b md:py-16">
              <Reveal as="wipe" delay={i}>
                <div className="grid-12 gap-y-6">
                  <h2 className="col-span-4 text-display wdth-tight md:col-span-7">{w.claim}</h2>
                  <p className="col-span-4 max-w-measure self-end text-lead text-ink-soft md:col-span-4 md:col-start-9">
                    {w.body}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Culture */}
      <section className="shell pt-section">
        <div className="grid-12 gap-y-12">
          <div className="col-span-4 md:col-span-7">
            <ImageFrame
              slot="studio · working"
              src="/life/team-day-garden.jpg"
              alt="Colleagues and families playing football on a lawn"
              ratio="3 / 2"
              hint="1600×1066"
              sizes="(max-width: 768px) 100vw, 56vw"
            />
          </div>
          <div className="col-span-4 self-end md:col-span-4 md:col-start-9">
            <p className="text-lead text-ink-soft">
              Most of us work in Dhaka, with colleagues in the US and the UAE. We organise work by
              team, not by hours. Everyone reads support messages at least once a week.
            </p>
          </div>
        </div>
      </section>

      {/* Teams */}
      <section className="shell pt-section">
        <div className="grid-12 gap-y-8 border-t border-rule pb-14 pt-10">
          <SectionLabel className="col-span-4 md:col-span-3">Teams you could join</SectionLabel>
        </div>
        <TeamsOverview />
      </section>

      {/* Benefits */}
      <section className="shell pt-section">
        <div className="grid-12 gap-y-8 border-t border-rule pt-10">
          <SectionLabel className="col-span-4 md:col-span-3">What we offer</SectionLabel>
          <ul className="col-span-4 md:col-span-9">
            {benefits.map((b) => (
              <li key={b.title} className="border-t border-rule py-6 first:border-t-0 first:pt-0">
                <h3 className="text-title wdth-tight">
                  {b.needsContent ? <Placeholder label={b.title} /> : b.title}
                </h3>
                <p className="mt-2 max-w-measure text-ink-soft">{b.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Employee stories */}
      <section className="shell pt-section">
        <div className="grid-12 gap-y-8 border-t border-rule pt-10">
          <SectionLabel className="col-span-4 md:col-span-3">In their own words</SectionLabel>
        </div>
        <ul className="mt-12 grid-12 gap-y-14">
          {[0, 1].map((i) => (
            <li key={i} className={`col-span-4 ${i ? 'md:col-span-5 md:col-start-8 md:mt-16' : 'md:col-span-6'}`}>
              <ImageFrame slot={`employee story · ${i + 1}`} ratio="4 / 5" hint="1200×1500" sizes="(max-width: 768px) 100vw, 42vw" />
              <blockquote className="mt-6">
                <p className="text-lead">
                  <Placeholder label="[ADD EMPLOYEE STORY]" />
                </p>
                <footer className="meta mt-3">Name · Role · Team</footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </section>

      {/* Open positions */}
      <section className="shell pt-section">
        <div className="grid-12 gap-y-8 border-t border-rule pb-10 pt-10">
          <SectionLabel className="col-span-4 md:col-span-3">Open positions</SectionLabel>
        </div>
        <JobList />
      </section>

      {/* Hiring process */}
      <section className="shell pt-section">
        <div className="grid-12 gap-y-8 border-t border-rule pt-10">
          <SectionLabel className="col-span-4 md:col-span-3">How hiring works</SectionLabel>
          <ol className="col-span-4 md:col-span-9">
            {hiringProcess.map((s, i) => (
              <li key={s.step} className="flex gap-6 border-t border-rule py-6 first:border-t-0 first:pt-0">
                <span className="meta tnum pt-1 text-accent">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-title wdth-tight">{s.step}</h3>
                  <p className="mt-2 max-w-measure text-ink-soft">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="shell py-section">
        <AnimatedText lines={['Tell us what', 'you’ve built.']} className="wdth-tight text-display" />
        <Reveal className="mt-12" delay={1}>
          <ArrowLink href="/contact">Write to us</ArrowLink>
        </Reveal>
      </section>
    </>
  );
}
