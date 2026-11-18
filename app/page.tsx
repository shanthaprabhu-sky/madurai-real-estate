import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase/server';
import { SearchBar } from '@/components/property/search-bar';
import { PropertyCard } from '@/components/property/property-card';
import { LocalityTicker } from '@/components/home/locality-ticker';
import { Button } from '@/components/ui/button';
import { 
  ShieldCheck,
  MapPin,
  TrendingUp,
  Headphones,
  FileCheck,
  Award,
  ArrowRight,
  CalendarCheck,
  Sparkles
} from 'lucide-react';
import type { PropertyWithRelations, Locality, Testimonial } from '@/lib/types';

export const revalidate = 3600;

async function getHomeData() {
  const [featuredRes, localitiesRes, testimonialsRes] = await Promise.all([
    supabase
      .from('properties')
      .select(`
        *,
        locality:localities(*),
        builder:builders(*),
        project:projects(*),
        images:property_images(*),
        amenities:property_amenities(amenity:amenities(*))
      `)
      .eq('status', 'active')
      .eq('listing_type', 'sale')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(6),
    supabase.from('localities').select('*').eq('popular', true).order('property_count', { ascending: false }),
    supabase.from('testimonials').select('*').eq('active', true).order('sort_order'),
  ]);

  return {
    featuredProperties: (featuredRes.data ?? []) as unknown as PropertyWithRelations[],
    localities: (localitiesRes.data ?? []) as Locality[],
    testimonials: (testimonialsRes.data ?? []) as Testimonial[],
  };
}

const WHY_CHOOSE_US = [
  { icon: Award, title: 'In-House Developer Excellence', desc: 'Directly from our brand to your family—uncompromised construction quality and design.' },
  { icon: MapPin, title: 'Prime Madurai Locations', desc: 'Flagship residential developments strategically positioned in Anna Nagar, KK Nagar, and Bypass Road.' },
  { icon: ShieldCheck, title: '100% RERA & DTCP Approved', desc: 'Absolute legal transparency with verified titles, clear documentation, and hassle-free bank approvals.' },
  { icon: TrendingUp, title: 'Vastu Compliant Layouts', desc: 'Meticulously crafted 2 & 3 BHK floor plans designed strictly according to traditional Vastu principles.' },
  { icon: FileCheck, title: 'Instant Home Loan Assistance', desc: 'Pre-approved tie-ups with nationalized banks like SBI, HDFC, and ICICI for seamless financing.' },
  { icon: Headphones, title: 'Dedicated Customer Concierge', desc: 'Personalized assistance, transparent pricing, and complimentary site-visit arrangements.' },
];

export default async function HomePage() {
  const { featuredProperties, localities, testimonials } = await getHomeData();
  const localitySearchList = localities.map((l) => ({ id: l.id, name: l.name }));

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Hero Section: Madurai Skyline + Modern Real Estate Aerial Background */}
      <section className="relative min-h-[640px] lg:min-h-[700px] flex items-center justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-madurai-skyline.jpg"
            alt="Madurai Real Estate & Temple City Skyline Aerial View"
            fill
            priority
            quality={20}
            className="object-cover object-center transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/90 backdrop-blur-[0.5px]" />
        </div>

        <div className="container-page relative z-10 flex min-h-[520px] lg:min-h-[580px] flex-col items-center justify-center py-20 text-center">
          <div className="max-w-4xl flex flex-col items-center">
            {/* Main Headline */}
            <h1 className="text-balance text-3xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl tracking-tight">
              Crafting Landmark{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
                Residences in the Temple City
              </span>
            </h1>

            {/* Subheading */}
            <p className="mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-white leading-relaxed drop-shadow-sm font-normal">
              Discover our exclusive portfolio of RERA-approved luxury 2 &amp; 3 BHK apartments, independent villas, and premium plots in prime localities.
            </p>
          </div>

          {/* Floating Search Bar */}
          <div className="mt-8 sm:mt-10 w-full max-w-5xl mx-auto flex justify-center">
            <SearchBar localities={localitySearchList} />
          </div>
        </div>
      </section>

      <LocalityTicker />

      {/* Why Discerning Buyers Choose Us (Reduced bottom padding to pull CTA up) */}
      <section className="relative pt-16 pb-8 sm:pt-20 sm:pb-10 overflow-hidden bg-slate-50/60 border-y border-slate-200/60">
        <div className="container-page">
          {/* Section Header */}
          <div className="mb-10 sm:mb-12 text-center max-w-3xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-3.5 py-1.5 rounded-full mb-3 border border-amber-300/60 shadow-xs">
              Uncompromising Standards
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Why Choose Us
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Madurai’s benchmark for architectural precision, verified legal clearances, and seamless homeownership.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {/* Full-width Centered Developer Spotlight Card */}
            <div className="col-span-full lg:col-span-4 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/70 rounded-3xl p-8 sm:p-12 text-white flex flex-col items-center text-center justify-between relative overflow-hidden shadow-2xl border border-slate-800 group">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

              <div className="max-w-3xl mx-auto items-center">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-snug tracking-tight text-balance">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
                      Direct from developers to zero broker friction.
                  </span>
                </h3>

                <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
                  Every residential layout and villa is master-planned in-house with uncompromising structural engineering, certified soil testing, and lifelong build warranties.
                </p>
              </div>

              {/* Metric Counters */}
              <div className="grid grid-cols-3 gap-6 sm:gap-12 pt-8 mt-8 border-t border-white/10 w-full max-w-2xl mx-auto text-center">
                <div className="flex flex-col items-center">
                  <p className="text-2xl sm:text-4xl font-black text-amber-400">100%</p>
                  <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">Clear Title Plots</p>
                </div>

                <div className="flex flex-col items-center">
                  <p className="text-2xl sm:text-4xl font-black text-amber-400">15+</p>
                  <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">Years Trust</p>
                </div>

                <div className="flex flex-col items-center">
                  <p className="text-2xl sm:text-4xl font-black text-amber-400">No</p>
                  <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">Hidden Charges</p>
                </div>
              </div>
            </div>

            {/* Card 2: 100% RERA & DTCP */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-7 border border-slate-200/80 shadow-md hover:shadow-xl hover:border-amber-500/50 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group">
              <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center ring-8 ring-amber-50/50 group-hover:bg-amber-500 group-hover:text-white transition-all">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="mt-6">
                <h4 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                  100% RERA &amp; DTCP Approved
                </h4>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                  Absolute legal transparency with verified parent documents, Patta clearance, and hassle-free registration.
                </p>
              </div>
            </div>

            {/* Card 3: Prime Madurai Corridors */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-7 border border-slate-200/80 shadow-md hover:shadow-xl hover:border-amber-500/50 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group">
              <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center ring-8 ring-amber-50/50 group-hover:bg-amber-500 group-hover:text-white transition-all">
                <MapPin className="h-6 w-6" />
              </div>
              <div className="mt-6">
                <h4 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                  High-Appreciation Corridors
                </h4>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                  Strategic sites in Anna Nagar, Othakadai, Thirunagar, and the Ring Road corridor positioned for maximum capital growth.
                </p>
              </div>
            </div>

            {/* Card 4: Vastu Compliant */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-7 border border-slate-200/80 shadow-md hover:shadow-xl hover:border-amber-500/50 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group">
              <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center ring-8 ring-amber-50/50 group-hover:bg-amber-500 group-hover:text-white transition-all">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="mt-6">
                <h4 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                  100% Vastu Architecture
                </h4>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                  East &amp; North-facing entry orientations, dedicated Pooja alignments, and scientifically cross-ventilated room layouts.
                </p>
              </div>
            </div>

            {/* Card 5: Pre-Approved Bank Loans */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-7 border border-slate-200/80 shadow-md hover:shadow-xl hover:border-amber-500/50 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group">
              <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center ring-8 ring-amber-50/50 group-hover:bg-amber-500 group-hover:text-white transition-all">
                <FileCheck className="h-6 w-6" />
              </div>
              <div className="mt-6">
                <h4 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                  Instant Loan Sanctions
                </h4>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                  Pre-approved legal clearance with nationalized banks (SBI, HDFC, ICICI) for up to 80% financing assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* High-Intent Developer CTA (Tightened top spacing) */}
      <section className="container-page pt-0 pb-10 sm:pb-14">
        <div className="rounded-3xl bg-slate-900 p-8 sm:p-12 text-center text-white shadow-xl border border-slate-800">
          <h2 className="text-2xl font-bold sm:text-3xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
                Ready to Experience Our Flagship Projects?
              </span>
            </h2>
          <p className="mt-2 text-slate-300 max-w-xl mx-auto text-sm sm:text-base">
            Book a complimentary site visit today and let our expert property consultants guide you through your future home.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row items-center">
            <Button size="lg" className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-md" asChild>
              <Link href="/contact">
                <CalendarCheck className="mr-2 h-5 w-5" /> Schedule Site Visit
              </Link>
            </Button>
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-md" asChild>
              <Link href="/properties">Explore All Properties</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

