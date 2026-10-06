import AnimatedText from '@/components/AnimatedText';
import ArrowLink from '@/components/ArrowLink';
import BrandField from '@/components/BrandField';
import Capabilities from '@/components/Capabilities';
import EventStory from '@/components/EventStory';
import GlobalPresence from '@/components/GlobalPresence';
import InsightsList from '@/components/InsightsList';
import MagneticButton from '@/components/MagneticButton';
import PeopleStrip from '@/components/PeopleStrip';
import ProductExplorer from '@/components/ProductExplorer';
import Reveal from '@/components/Reveal';
import SectionLabel from '@/components/SectionLabel';
import Signals from '@/components/Signals';
import TeamsOverview from '@/components/TeamsOverview';
import Testimonials from '@/components/Testimonials';
import LivingSystem from '@/components/LivingSystem';
import VariableHeadline from '@/components/VariableHeadline';
import ScrollCue from '@/components/ScrollCue';

export default function HomePage() {
  return (
    <>
      {/* 01 — Hero */}
      <section className="relative flex min-h-[92svh] flex-col justify-end overflow-hidden pb-16 pt-[calc(var(--nav-h)+4rem)]">
        {/* The field runs edge to edge and sits behind the type, not beside it. */}
        <div className="absolute inset-0">
          <LivingSystem />
        </div>

        <div className="shell relative">
          <VariableHeadline
            lead={0.35}
            lines={['We build the', 'software behind', 'better commerce.']}
            className="text-hero"
          />

          <div className="mt-10 grid-12 items-end gap-y-8">
            <p className="col-span-4 max-w-measure text-lead text-ink-soft md:col-span-5">
              Four products for stores that sell customisable products. We design, build and
              support them all.
            </p>
            <div className="col-span-4 flex flex-wrap items-center gap-x-8 gap-y-4 md:col-span-5 md:col-start-8 md:justify-end">
              <MagneticButton href="/products">Explore what we build</MagneticButton>
              <ArrowLink href="/teams">Meet the people</ArrowLink>
            </div>
          </div>

          <ScrollCue />
        </div>
      </section>

      {/* 02 — Who we are */}
      <section className="shell pt-section">
        <div className="grid-12 gap-y-10 border-t border-rule pt-10">
          <SectionLabel className="col-span-4 md:col-span-3">Who we are</SectionLabel>
          <div className="col-span-4 md:col-span-9">
            <AnimatedText
              lines={['We build the part', 'of the store where', 'shoppers decide.']}
              className="wdth-tight text-display"
            />
            <Reveal className="mt-10 max-w-measure-wide" delay={1}>
              <p className="text-lead text-ink-soft">
                We are a product company, not an agency. Most store software treats products as
                ready-made, but many are printed, engraved or personalised first. We have worked on
                that problem for fifteen years, and we own and run everything we make.
              </p>
            </Reveal>
            <Reveal className="mt-8" delay={2}>
              <ArrowLink href="/about">About us</ArrowLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 03 — What we do */}
      <section className="shell pt-section">
        <div className="grid-12 gap-y-8 border-t border-rule pb-12 pt-10">
          <SectionLabel className="col-span-4 md:col-span-3">What we do</SectionLabel>
          <h2 className="col-span-4 max-w-[22ch] text-title wdth-tight md:col-span-7">
            Four kinds of work, all for our own products.
          </h2>
        </div>
        <Capabilities />
      </section>

      {/* 04 — Signals */}
      <section className="shell pt-section">
        <div className="grid-12 gap-y-8 border-t border-rule pb-14 pt-10">
          <SectionLabel className="col-span-4 md:col-span-3">Where we are now</SectionLabel>
        </div>
        <Signals />
      </section>

      {/* 05 — Products */}
      <section id="products" className="dark-section mt-section bg-ink py-section">
        <div className="shell">
          <div className="grid-12 mb-14 gap-y-6 md:mb-20">
            <SectionLabel className="col-span-4 md:col-span-3">Products</SectionLabel>
            <h2 className="col-span-4 max-w-[20ch] text-title wdth-tight md:col-span-6">
              Four products, all built and run by us.
            </h2>
          </div>
          <ProductExplorer />
          <div className="mt-12 flex justify-end">
            <ArrowLink href="/products" invert>Explore all products</ArrowLink>
          </div>
        </div>
      </section>

      {/* 06 — Who uses it */}
      <section className="shell pt-section">
        <div className="grid-12 gap-y-8 border-t border-rule pb-12 pt-10">
          <SectionLabel className="col-span-4 md:col-span-3">Who uses it</SectionLabel>
          <h2 className="col-span-4 max-w-[24ch] text-title wdth-tight md:col-span-7">
            Merchants in more than 150 countries, from solo shops to big brands.
          </h2>
        </div>
        <BrandField />
      </section>

      {/* 07 — What people say */}
      <section className="shell pt-section">
        <div className="grid-12 gap-y-8 border-t border-rule pb-14 pt-10">
          <SectionLabel className="col-span-4 md:col-span-3">In their words</SectionLabel>
        </div>
        <Testimonials />
      </section>

      {/* 08 — Teams */}
      <section className="shell pt-section">
        <div className="grid-12 gap-y-8 border-t border-rule pb-14 pt-10">
          <SectionLabel className="col-span-4 md:col-span-3">The organisation</SectionLabel>
          <h2 className="col-span-4 max-w-[22ch] text-title wdth-tight md:col-span-7">
            Twenty-five people in teams, each with a clear job.
          </h2>
        </div>
        <TeamsOverview />
        <div className="mt-12 flex justify-end">
          <ArrowLink href="/teams">Meet our teams</ArrowLink>
        </div>
      </section>

      {/* 09 — Selected people */}
      <section className="shell pt-section">
        <div className="grid-12 gap-y-8 border-t border-rule pt-10">
          <SectionLabel className="col-span-4 md:col-span-3">The studio</SectionLabel>
          <div className="col-span-4 md:col-span-9">
            <AnimatedText lines={['Meet the artisans']} className="wdth-tight text-display" />
          </div>
        </div>
        <div className="mt-14 md:mt-20">
          <PeopleStrip />
        </div>
        <div className="mt-8 flex items-baseline justify-between gap-4">
          <p className="meta">Design, engineering, content, marketing and operations, working as one team.</p>
          <ArrowLink href="/teams">Meet everyone</ArrowLink>
        </div>
      </section>

      {/* 10 — Events */}
      <section className="shell pt-section">
        <div className="grid-12 gap-y-8 border-t border-rule pb-14 pt-10">
          <SectionLabel className="col-span-4 md:col-span-3">What we do together</SectionLabel>
          <h2 className="col-span-4 max-w-[22ch] text-title wdth-tight md:col-span-7">
            Conferences, meetups and events we run ourselves.
          </h2>
        </div>
        <EventStory />
        <div className="mt-12 flex justify-end">
          <ArrowLink href="/events">View all events</ArrowLink>
        </div>
      </section>

      {/* 11 — Where we are */}
      <section className="shell pt-section">
        <div className="grid-12 gap-y-8 border-t border-rule pb-14 pt-10">
          <SectionLabel className="col-span-4 md:col-span-3">Where we are</SectionLabel>
          <h2 className="col-span-4 max-w-[22ch] text-title wdth-tight md:col-span-7">
            Three offices that cover most of the working day.
          </h2>
        </div>
        <GlobalPresence />
      </section>

      {/* 12 — Insights */}
      <section className="shell pt-section">
        <div className="grid-12 gap-y-8 border-t border-rule pb-10 pt-10">
          <SectionLabel className="col-span-4 md:col-span-3">What we think about</SectionLabel>
          <h2 className="col-span-4 max-w-[22ch] text-title wdth-tight md:col-span-6">
            Notes on building software, often written after something broke.
          </h2>
        </div>
        <InsightsList />
        <div className="mt-12 flex justify-end">
          <ArrowLink href="/insights">Explore insights</ArrowLink>
        </div>
      </section>

      {/* 13 — Closing */}
      <section className="shell py-section">
        <AnimatedText
          lines={['Good products start', 'with people who use', 'what they build.']}
          className="wdth-tight text-display"
        />
        <Reveal className="mt-12 flex flex-wrap items-center gap-8" delay={1}>
          <MagneticButton href="/contact">Talk to us</MagneticButton>
          <ArrowLink href="/products">Explore our products</ArrowLink>
        </Reveal>
      </section>
    </>
  );
}
