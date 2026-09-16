import type { Metadata } from 'next';
import { Archivo, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/Footer';
import { company } from '@/content/site';

/* Archivo is variable on both weight and width. The width axis is the
   identity: display type narrows as it scales up. */
const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  axes: ['wdth'],
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://parselab.io'),
  title: {
    default: `${company.name} — Shopify apps for configurable products`,
    template: `%s — ${company.name}`,
  },
  description: company.what,
  openGraph: {
    title: company.name,
    description: company.what,
    locale: 'en',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#F0F0EE',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`}>
      <body>
        <SiteHeader />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
