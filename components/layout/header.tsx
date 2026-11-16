'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, Building2, X, Phone, CalendarCheck, ChevronDown, Ruler, Calculator, FileText, Landmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { COMPANY } from '@/lib/constants';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/properties', label: 'Properties' },
  { href: '/builders', label: 'Builders' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

const TOOLS_SUBMENU = [
  { href: '/tools?tool=emi-calculator', label: 'Home Loan EMI Calculator', icon: Calculator },
  { href: '/tools?tool=stamp-duty', label: 'TN Stamp Duty & Registration', icon: FileText },
  { href: '/tools?tool=area-converter', label: 'Area Unit Converter', icon: Landmark },
  { href: '/tools?tool=loan-eligibility', label: 'Loan Eligibility Calculator', icon: Calculator },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Building2 className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight">{COMPANY.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="/"
            className={cn(
              'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent/10 hover:text-primary',
              pathname === '/' && 'text-primary'
            )}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={cn(
              'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent/10 hover:text-primary',
              pathname === '/about' && 'text-primary'
            )}
          >
            About
          </Link>
          <Link
            href="/properties"
            className={cn(
              'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent/10 hover:text-primary',
              pathname === '/properties' && 'text-primary'
            )}
          >
            Properties
          </Link>
          <Link
            href="/builders"
            className={cn(
              'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent/10 hover:text-primary',
              pathname === '/builders' && 'text-primary'
            )}
          >
            Builders
          </Link>

          {/* Tools Dropdown Menu Button (Non-navigating parent) */}
          <div 
            className="relative"
            onMouseEnter={() => setToolsOpen(true)}
            onMouseLeave={() => setToolsOpen(false)}
          >
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent/10 hover:text-primary flex items-center gap-1 cursor-pointer',
                pathname.startsWith('/tools') && 'text-primary'
              )}
            >
              Tools <ChevronDown className="h-3.5 w-3.5" />
            </button>

            {toolsOpen && (
              <div className="absolute top-full left-0 w-72 pt-1 z-50">
                <div className="rounded-2xl border border-amber-500/20 bg-card p-2 shadow-xl space-y-1">
                  {TOOLS_SUBMENU.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      onClick={() => setToolsOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition-all"
                    >
                      <tool.icon className="h-4 w-4 text-amber-600 shrink-0" />
                      <span>{tool.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {NAV_LINKS.slice(4).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent/10 hover:text-primary',
                pathname === link.href && 'text-primary'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm" asChild>
            <a href={`tel:${COMPANY.phone}`}>
              <Phone className="mr-1 h-4 w-4" />
              {COMPANY.phone}
            </a>
          </Button>
          <Button size="sm" asChild className="bg-amber-600 hover:bg-amber-700 text-white">
            <Link href="/contact">
              <CalendarCheck className="mr-1.5 h-4 w-4" />
              Schedule Site Visit
            </Link>
          </Button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t bg-background md:hidden">
          <nav className="container-page flex flex-col gap-1 py-4">
            <Link href="/" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium">Home</Link>
            <Link href="/about" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium">About</Link>
            <Link href="/properties" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium">Properties</Link>
            <Link href="/builders" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium">Builders</Link>

            {/* Mobile Tools Toggle */}
            <div>
              <button
                onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
                className="w-full flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent/10"
              >
                <span>Tools Suite</span>
                <ChevronDown className={cn("h-4 w-4 transition-transform", mobileToolsOpen && "rotate-180")} />
              </button>
              {mobileToolsOpen && (
                <div className="pl-4 flex flex-col gap-1 py-1">
                  {TOOLS_SUBMENU.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium text-slate-600 hover:text-amber-700 hover:bg-amber-50"
                    >
                      <tool.icon className="h-3.5 w-3.5 text-amber-600" />
                      <span>{tool.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/blog" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium">Blog</Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium">Contact</Link>

            <div className="mt-2 flex flex-col gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href={`tel:${COMPANY.phone}`}>Call {COMPANY.phone}</a>
              </Button>
              <Button size="sm" asChild className="bg-amber-600 hover:bg-amber-700 text-white">
                <Link href="/contact" onClick={() => setMobileOpen(false)}>
                  <CalendarCheck className="mr-1.5 h-4 w-4" />
                  Schedule Site Visit
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}