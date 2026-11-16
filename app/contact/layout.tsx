import type { Metadata } from 'next';
import { COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Get in touch with ${COMPANY.name} for any property-related queries in Madurai.`,
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
