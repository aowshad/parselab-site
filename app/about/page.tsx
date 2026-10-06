import type { Metadata } from 'next';
import AnimatedText from '@/components/AnimatedText';
import ArrowLink from '@/components/ArrowLink';
import FounderStory from '@/components/FounderStory';
import GlobalPresence from '@/components/GlobalPresence';
import ImageFrame from '@/components/ImageFrame';
import ProcessLoop from '@/components/ProcessLoop';
import Reveal from '@/components/Reveal';
import SectionLabel from '@/components/SectionLabel';
import Signals from '@/components/Signals';
import Timeline from '@/components/Timeline';
import { about, beliefs, collage } from '@/content/about';

export const metadata: Metadata = {
  title: 'About',
  description: about.intro,
};

export default function AboutPage() {
  return (
    <>
      {/* 01 — Who we are */}
      <section className="shell pb-section pt-[calc(var(--nav-h)+7rem)]">
        <SectionLabel className="mb-10">About the company</SectionLabel>
        <AnimatedText as="h1" onMount lines={about.heroLines} className="wdth-tight text-hero" />
        <div className="mt-12 grid-12">
          <p className="col-span-4 max-w-measure-wide text-lead text-ink-soft md:col-span-6 md:col-start-7">
            {about.intro}
          </p>
        </div>
      </section>

      {/* 02 — Scale */}
      <section className="shell">
        <div className="border-t border-rule pb-14 pt-10">
          <Signals />
        </div>
      </section>

      {/* 03 — Founder */}
      <section className="shell pt-section">
        <div className="grid-12 gap-y-8 border-t border-rule pb-14 pt-10">
          <SectionLabel className="col-span-4 md:col-span-3">Where it started</SectionLabel>
          <h2 className="col-span-4 max-w-[20ch] text-title wdth-tight md:col-span-7">
            Every company starts when someone decides the existing options are not good enough.
          </h2>
        </div>
        <FounderStory />
      </section>

      {/* 04 — Milestones */}
      <section className="pt-section">
        <div className="shell">
          <div className="grid-12 gap-y-6 border-t border-rule pt-10">
            <SectionLabel className="col-span-4 md:col-span-3">How we got here</SectionLabel>
            <h2 className="col-span-4 max-w-[20ch] text-title wdth-tight md:col-span-6">
              Fifteen years, told honestly.
            </h2>
          </div>
        </div>
        <div className="mt-16 md:mt-4">
          <Timeline />
        </div>
      </section>

      {/* 05 — What we believe */}
      <section className="dark-section bg-ink py-section">
        <div className="shell">
          <SectionLabel className="mb-16">What we believe</SectionLabel>
          <ul>
            {beliefs.map((b) => (
              <li key={b.claim} className="border-t border-rule-dark py-12 md:py-20">
                <Reveal as="wipe">
                  <div className="grid-12 gap-y-6">
                    <h3 className="col-span-4 text-display wdth-tight md:col-span-7">{b.claim}</h3>
                    <p className="col-span-4 max-w-measure self-end text-lead text-paper/70 md:col-span-4 md:col-start-9">
                      {b.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 06 — How we work */}
      <section className="shell pt-section">
        <div className="grid-12 gap-y-10 border-t border-rule pt-10">
          <SectionLabel className="col-span-4 md:col-span-3">How we work</SectionLabel>
          <div className="col-span-4 md:col-span-9">
            <ProcessLoop />
          </div>
        </div>
      </section>

      {/* 07 — Global presence */}
      <section className="shell pt-section">
        <div className="grid-12 gap-y-8 border-t border-rule pb-14 pt-10">
          <SectionLabel className="col-span-4 md:col-span-3">Where we work</SectionLabel>
          <h2 className="col-span-4 max-w-[22ch] text-title wdth-tight md:col-span-7">
            Offices in Bangladesh, the United States and the UAE.
          </h2>
        </div>
        <GlobalPresence />
      </section>

      {/* 08 — Life inside */}
      <section className="shell pt-section">
        <div className="grid-12 gap-y-8 border-t border-rule pt-10">
          <SectionLabel className="col-span-4 md:col-span-3">Life inside</SectionLabel>
        </div>
        <ul className="mt-14 grid-12 gap-y-12">
          {collage.map((c) => (
            <li key={c.slot} className={`col-span-4 ${c.span} ${c.offset}`}>
              <ImageFrame slot={c.slot} src={c.src} alt={c.alt} ratio={c.ratio} caption={c.caption} sizes="(max-width: 768px) 100vw, 45vw" />
            </li>
          ))}
        </ul>
      </section>

      {/* 09 — Closing */}
      <section className="shell py-section">
        <AnimatedText
          lines={['The apps are what we make.', 'The people are the company.']}
          className="wdth-tight text-display"
        />
        <Reveal className="mt-12" delay={1}>
          <ArrowLink href="/teams">Meet our teams</ArrowLink>
        </Reveal>
      </section>
    </>
  );
}
