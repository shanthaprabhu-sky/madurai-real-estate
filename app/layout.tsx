import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// @ts-expect-error Global CSS is handled by Next.js, not TypeScript.
import './globals.css';
import LayoutWrapper from '@/components/layout/layout-wrapper';
import { COMPANY } from '@/lib/constants';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: `${COMPANY.name} — ${COMPANY.tagline}`,
    template: `%s | ${COMPANY.name}`,
  },
  description:
    'Buy, rent, and invest in verified properties across Madurai. Apartments, villas, plots, and commercial spaces in Anna Nagar, KK Nagar, Thirunagar, Vilangudi, and more.',
  keywords: [
    'Madurai real estate',
    'property in Madurai',
    'buy property Madurai',
    'rent property Madurai',
    'plots in Madurai',
    'apartments in Madurai',
    'Anna Nagar property',
    'KK Nagar property',
  ],
  openGraph: {
    title: `${COMPANY.name} — ${COMPANY.tagline}`,
    description: 'Verified properties for sale and rent across Madurai, Tamil Nadu.',
    type: 'website',
    locale: 'en_IN',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}