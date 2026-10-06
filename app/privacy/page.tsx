import type { Metadata } from 'next';
import LegalPage from '@/lib/legal';

export const metadata: Metadata = { title: 'Privacy policy' };

export default function PrivacyPage() {
  return (
    <LegalPage
      label="Legal"
      lines={['Privacy', 'policy']}
      intro="What we collect, why we collect it, and what we do not do with it. This includes data our apps handle for merchants."
      sections={[
        { heading: 'What we collect' },
        { heading: 'Data our apps process for merchants' },
        { heading: 'Cookies and analytics' },
        { heading: 'Who we share data with' },
        { heading: 'How long we keep it' },
        { heading: 'Your rights' },
        { heading: 'Contacting us about data' },
      ]}
    />
  );
}
