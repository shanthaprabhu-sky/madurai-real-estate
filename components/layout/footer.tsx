import Link from 'next/link';
import { Building2, MapPin, Phone, Mail, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { COMPANY } from '@/lib/constants';

const FOOTER_LINKS = {
  Quick: [
    { href: '/properties', label: 'Browse Properties' },
    { href: '/properties?type=plot', label: 'Plots for Sale' },
  ],
  Company: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/blog', label: 'Blog' },
    { href: '/faq', label: 'FAQ' },
    { href: '/tools', label: 'Tools' },
  ],
  Legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
};

export function Footer() {
  return (
    <footer className="relative bg-[#020617] text-white border-t border-slate-800 overflow-hidden">
      
      {/* 1. Dedicated Image Background Layer */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url('/realestate.png')`,
          backgroundPosition: 'center 75%', // Pulls the bottom houses UP into the visible footer area
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          opacity: 0.65, // Bright enough to clearly see the houses and blue light bars
        }}
      />

      {/* 2. Top-only gradient to ensure text readability */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none" 
        style={{
          background: 'linear-gradient(to bottom, #020617 0%, rgba(2, 6, 23, 0.6) 40%, transparent 100%)'
        }}
      />

      {/* 3. Footer Content (relative z-10 so it stays above the image) */}
      <div className="container-page relative z-10 pt-10 pb-2">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5 pb-12 border-b border-slate-800/80">
          
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 group-hover:bg-amber-400 transition-colors">
                <Building2 className="h-5 w-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 block leading-tight">
                  Temple City Living
                </span>
                <span className="text-lg font-bold text-white tracking-tight">
                  {COMPANY.name}
                </span>
              </div>
            </Link>

            <p className="max-w-sm text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {COMPANY.tagline}. Verified listings across Madurai, Tamil Nadu.
            </p>

            <div className="space-y-3 pt-2 text-sm text-slate-200">
              <p className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <span className="leading-relaxed">{COMPANY.address}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-amber-400" />
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="hover:text-amber-400 transition-colors"
                >
                  {COMPANY.phone}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-amber-400" />
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="hover:text-amber-400 transition-colors"
                >
                  {COMPANY.email}
                </a>
              </p>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading} className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400">
                {heading}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-sm text-white hover:text-white transition-colors"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:text-amber-400 transition-all -translate-y-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-300">
          <p>
            &copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-slate-300 font-mono text-[11px]">
            <ShieldCheck className="h-4 w-4 text-amber-400" />
            <span>RERA: {COMPANY.reraRegistration}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

