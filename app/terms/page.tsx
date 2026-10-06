import type { Metadata } from 'next';
import LegalPage from '@/lib/legal';

export const metadata: Metadata = { title: 'Terms & conditions' };

export default function TermsPage() {
  return (
    <LegalPage
      label="Legal"
      lines={['Terms &', 'conditions']}
      intro="The terms for using this site and ParseLab’s products, written in plain language."
      sections={[
        { heading: 'Who these terms are between' },
        { heading: 'Using our apps' },
        { heading: 'Your content and merchant data' },
        { heading: 'Billing and cancellation' },
        { heading: 'Support and availability' },
        { heading: 'Liability' },
        { heading: 'Changes to these terms' },
      ]}
    />
  );
}
