import type { Metadata } from 'next';
import AnimatedText from '@/components/AnimatedText';
import ContactForm from '@/components/ContactForm';
import GlobalPresence from '@/components/GlobalPresence';
import ImageFrame from '@/components/ImageFrame';
import LocalTime from '@/components/LocalTime';
import Placeholder from '@/components/Placeholder';
import SectionLabel from '@/components/SectionLabel';
import { offices } from '@/content/offices';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Talk to ParseLab about products, partnerships or working with us.',
};

const routes = [
  { label: 'General', body: 'Anything else.' },
  { label: 'Sales', body: 'Pricing, plans and questions before you install.' },
  { label: 'Partnerships', body: 'Agencies, platforms and integrations.' },
  { label: 'Careers', body: 'Job applications and general notes. We read both.' },
];

export default function ContactPage() {
  return (
    <>
      <section className="shell pb-16 pt-[calc(var(--nav-h)+7rem)]">
        <SectionLabel className="mb-10">Contact</SectionLabel>
        <AnimatedText as="h1" onMount lines={['Tell us what', 'you’re trying', 'to sell.']} className="wdth-tight text-hero" />
        <div className="mt-12 grid-12">
          <p className="col-span-4 max-w-measure-wide text-lead text-ink-soft md:col-span-6 md:col-start-7">
            A real person reads every message. If it is about a product, tell us which one so it
            reaches the right team faster.
          </p>
        </div>
      </section>

      <section className="shell pt-10">
        <div className="grid-12 gap-y-14 border-t border-rule pt-10">
          <div className="col-span-4 md:col-span-3">
            <SectionLabel className="mb-8">Where it goes</SectionLabel>
            <ul>
              {routes.map((r) => (
                <li key={r.label} className="border-t border-rule py-4 last:border-b">
                  <p className="wdth-narrow text-[1.05rem]">{r.label}</p>
                  <p className="meta mt-1 max-w-[24ch]">{r.body}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-4 md:col-span-8 md:col-start-5">
            <ContactForm />
          </div>
        </div>
      </section>

      <section id="offices" className="shell scroll-mt-24 pt-section">
        <div className="grid-12 gap-y-8 border-t border-rule pb-14 pt-10">
          <SectionLabel className="col-span-4 md:col-span-3">Offices</SectionLabel>
          <h2 className="col-span-4 max-w-[22ch] text-title wdth-tight md:col-span-7">
            Bangladesh, the United States and the UAE.
          </h2>
        </div>
        <GlobalPresence />
      </section>

      <section className="shell pt-section">
        <ul className="grid-12 gap-y-14">
          {offices.map((o) => (
            <li key={o.id} className="col-span-4">
              <ImageFrame slot={`office · ${o.code}`} ratio="4 / 3" hint="1600×1200" sizes="(max-width: 768px) 100vw, 30vw" />
              <div className="mt-5 border-t border-rule pt-4">
                <p className="text-title wdth-tight">{o.country}</p>
                <dl className="mt-4 space-y-2">
                  <div className="flex gap-4 border-t border-rule pt-2">
                    <dt className="meta w-20 shrink-0">City</dt>
                    <dd className="meta text-ink">{o.city ?? <Placeholder label="city needed" />}</dd>
                  </div>
                  <div className="flex gap-4 border-t border-rule pt-2">
                    <dt className="meta w-20 shrink-0">Address</dt>
                    <dd className="meta text-ink">{o.address ?? <Placeholder label="[ADD OFFICE ADDRESS]" />}</dd>
                  </div>
                  <div className="flex gap-4 border-t border-rule pt-2">
                    <dt className="meta w-20 shrink-0">Phone</dt>
                    <dd className="meta text-ink">{o.phone ?? <Placeholder label="[ADD PHONE]" />}</dd>
                  </div>
                  <div className="flex gap-4 border-t border-rule pt-2">
                    <dt className="meta w-20 shrink-0">Time</dt>
                    <dd className="meta text-ink"><LocalTime timeZone={o.timeZone} /> {o.utc}</dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="shell py-section">
        <AnimatedText lines={['We answer', 'every one.']} className="wdth-tight text-display" />
      </section>
    </>
  );
}
