import type { Metadata } from 'next';
import AnimatedText from '@/components/AnimatedText';
import ArrowLink from '@/components/ArrowLink';
import Capabilities from '@/components/Capabilities';
import ProductExplorer from '@/components/ProductExplorer';
import Reveal from '@/components/Reveal';
import SectionLabel from '@/components/SectionLabel';
import Signals from '@/components/Signals';
import { products } from '@/content/products';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Software products for commerce, built and run by ParseLab.',
};

export default function ProductsPage() {
  return (
    <>
      <section className="shell pb-20 pt-[calc(var(--nav-h)+7rem)]">
        <SectionLabel className="mb-10">Products</SectionLabel>
        <AnimatedText
          as="h1"
          onMount
          lines={['Everything here', 'is ours.']}
          className="wdth-tight text-hero"
        />
        <div className="mt-12 grid-12">
          <p className="col-span-4 max-w-measure-wide text-lead text-ink-soft md:col-span-6 md:col-start-7">
            {products.length} products, all ours. We do not build for clients and walk away. We run
            our software and keep improving it for years.
          </p>
        </div>
      </section>

      <section className="shell pt-10">
        <ProductExplorer dark={false} />
      </section>

      <section className="shell pt-section">
        <div className="grid-12 gap-y-8 border-t border-rule pb-14 pt-10">
          <SectionLabel className="col-span-4 md:col-span-3">Reach</SectionLabel>
        </div>
        <Signals />
      </section>

      <section className="shell pt-section">
        <div className="grid-12 gap-y-8 border-t border-rule pb-12 pt-10">
          <SectionLabel className="col-span-4 md:col-span-3">How they get built</SectionLabel>
        </div>
        <Capabilities />
      </section>

      <section className="shell py-section">
        <AnimatedText lines={['Built once.', 'Maintained for years.']} className="wdth-tight text-display" />
        <Reveal className="mt-12" delay={1}>
          <ArrowLink href="/contact">Talk to us about a product</ArrowLink>
        </Reveal>
      </section>
    </>
  );
}
