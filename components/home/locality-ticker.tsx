import Link from 'next/link';
import { MapPin, Compass } from 'lucide-react';

const LOCALITIES = [
  'Thiruparankundram',
  'Thirumangalam',
  'Kalavasal',
  'Arapalayam',
  'Periyar',
  'Ellis Nagar',
  'Anna Nagar',
  'KK Nagar',
  'Othakadai',
];

export function LocalityTicker() {
  const duplicatedLocalities = [...LOCALITIES, ...LOCALITIES];

  return (
    <section className="relative w-full overflow-hidden border-y border-amber-500/20 bg-slate-950 py-6 sm:py-8 shadow-2xl">
      {/* Title & Badge Header */}
      <div className="container-page mb-5 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-white text-[11px] sm:text-xs font-semibold tracking-wider uppercase mb-2">
          <Compass className="w-3.5 h-3.5 text-amber-300" />
          <span>Madurai's Prime Real Estate Hubs</span>
        </div>
        <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white tracking-tight">
          {' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
           Explore Properties Across Madurai’s Key Corridors
          </span>
        </h3>
      </div>

      {/* Side gradient masks for smooth fade in/out */}
      <div className="pointer-events-none absolute left-0 bottom-0 top-16 z-10 w-28 bg-gradient-to-r from-slate-950 to-transparent" />
      <div className="pointer-events-none absolute right-0 bottom-0 top-16 z-10 w-28 bg-gradient-to-l from-slate-950 to-transparent" />

      {/* Marquee Track */}
      <div className="flex w-max animate-marquee items-center gap-5 hover:[animation-play-state:paused]">
        {duplicatedLocalities.map((locality, index) => (
          <Link
            key={`${locality}-${index}`}
            href={`/properties?search=${encodeURIComponent(locality)}`}
            className="group inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-6 py-2.5 shadow-md transition-all duration-300 hover:border-amber-400 hover:bg-amber-50 hover:shadow-xl hover:-translate-y-0.5"
          >
            {/* Location Icon Badge */}
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-all duration-200">
              <MapPin className="h-4 w-4 stroke-[2.5]" />
            </div>

            {/* Place Name */}
            <span className="text-sm sm:text-base font-extrabold tracking-tight text-slate-800 group-hover:text-amber-800 transition-colors">
              {locality}
            </span>

            {/* Subtle Tag */}
            <span className="text-xs font-semibold text-slate-400 group-hover:text-amber-600 transition-colors">
              • Explore
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}