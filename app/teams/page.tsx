import type { Metadata } from 'next';
import AnimatedText from '@/components/AnimatedText';
import ArrowLink from '@/components/ArrowLink';
import ImageFrame from '@/components/ImageFrame';
import MagneticButton from '@/components/MagneticButton';
import Placeholder from '@/components/Placeholder';
import Reveal from '@/components/Reveal';
import SectionLabel from '@/components/SectionLabel';
import TeamExplorer from '@/components/TeamExplorer';
import TeamsOverview from '@/components/TeamsOverview';
import { disciplines } from '@/content/team';

export const metadata: Metadata = {
  title: 'Teams',
  description: 'The people who design, build and support ParseLab’s products.',
};

export default function TeamsPage() {
  return (
    <>
      {/* Hero */}
      <section className="shell pb-20 pt-[calc(var(--nav-h)+7rem)]">
        <SectionLabel className="mb-10">Teams</SectionLabel>
        <AnimatedText as="h1" onMount lines={['People behind', 'the products.']} className="wdth-tight text-hero" />
        <div className="mt-12 grid-12">
          <p className="col-span-4 max-w-measure-wide text-lead text-ink-soft md:col-span-6 md:col-start-7">
            Twenty-five people in {disciplines.length} teams and three countries. Everyone is close
            to our merchants.
          </p>
        </div>
      </section>

      {/* Team philosophy */}
      <section className="shell pt-section">
        <div className="grid-12 gap-y-10 border-t border-rule pt-10">
          <SectionLabel className="col-span-4 md:col-span-3">How the teams fit together</SectionLabel>
          <div className="col-span-4 md:col-span-9">
            <p className="max-w-measure-wide text-lead text-ink-soft">
              We organise by responsibility, not seniority. Each team owns one area, such as the
              admin, storefront, support or writing. They own it from the first idea to the last
              support ticket.
            </p>
          </div>
        </div>
      </section>

      {/* Department explorer */}
      <section className="shell pt-section">
        <div className="grid-12 gap-y-8 border-t border-rule pb-14 pt-10">
          <SectionLabel className="col-span-4 md:col-span-3">Departments</SectionLabel>
        </div>
        <TeamsOverview />
      </section>

      {/* Everyone */}
      <section className="shell pt-section">
        <div className="grid-12 gap-y-8 border-t border-rule pb-12 pt-10">
          <SectionLabel className="col-span-4 md:col-span-3">Everyone</SectionLabel>
        </div>
        <TeamExplorer />
      </section>

      {/* Culture moment */}
      <section className="shell pt-section">
        <div className="grid-12 gap-y-10">
          <div className="col-span-4 md:col-span-6">
            <ImageFrame
              slot="studio · review session"
              src="/life/team-day-hoodies.jpg"
              alt="Colleagues in black hoodies laughing together in a garden"
              ratio="4 / 3"
              hint="candid, mid-conversation · 1600×1200"
              sizes="(max-width: 768px) 100vw, 48vw"
            />
          </div>
          <blockquote className="col-span-4 self-center md:col-span-5 md:col-start-8">
            <p className="text-title wdth-tight">
              <Placeholder label="[ADD TEAM QUOTE]" />
            </p>
            <footer className="meta mt-4">Attribution — name, role, team</footer>
          </blockquote>
        </div>
      </section>

      {/* Office moments */}
      <section className="shell pt-section">
        <div className="grid-12 gap-y-8 border-t border-rule pt-10">
          <SectionLabel className="col-span-4 md:col-span-3">Around the office</SectionLabel>
        </div>
        <ul className="mt-12 grid-12 gap-y-12">
          <li className="col-span-4 md:col-span-5">
            <ImageFrame slot="office · Dhaka" ratio="4 / 5" hint="1200×1500" sizes="(max-width: 768px) 100vw, 40vw" />
          </li>
          <li className="col-span-4 md:col-span-6 md:col-start-7 md:mt-20">
            <ImageFrame slot="office · desk detail" ratio="3 / 2" hint="1600×1066" sizes="(max-width: 768px) 100vw, 46vw" />
          </li>
        </ul>
      </section>

      {/* Closing */}
      <section className="shell py-section">
        <AnimatedText lines={['Different disciplines.', 'One direction.']} className="wdth-tight text-display" />
        <Reveal className="mt-12 flex flex-wrap items-center gap-8" delay={1}>
          <MagneticButton href="/careers">Join the team</MagneticButton>
          <ArrowLink href="/contact">Work with us</ArrowLink>
        </Reveal>
      </section>
    </>
  );
}
