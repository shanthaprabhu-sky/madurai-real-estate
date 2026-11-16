import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Verified, MapPin, BedDouble, Bath, Maximize, CheckCircle2 } from 'lucide-react';
import { formatPrice, formatArea, formatPricePerSqft } from '@/lib/constants';
import type { PropertyWithRelations } from '@/lib/types';

interface PropertyCardProps {
  property: PropertyWithRelations;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const propertyData = property as PropertyWithRelations & {
    listingType?: string | null;
    imageUrl?: string | null;
    image_url?: string | null;
    areaSqft?: number | string | null;
    area_sqft?: number | string | null;
    images?: Array<{ imageUrl?: string | null; image_url?: string | null } | null> | null;
    locality?: { name?: string | null } | null;
    location?: string | null;
    rent_amount?: number | null;
    price?: number | null;
    title?: string | null;
    slug?: string | null;
    id?: string | number;
    verified?: boolean | null;
    featured?: boolean | null;
    bedrooms?: number | null;
    bathrooms?: number | null;
    area_cents?: number | null;
    approval?: string | null;
    listing_type?: string | null;
  };

  const displayPrice = propertyData.listing_type === 'rent' || propertyData.listingType === 'rent'
    ? (propertyData.rent_amount ?? propertyData.price ?? 0)
    : propertyData.price ?? 0;

  // Fallback checks for both camelCase, snake_case, and image relations
  const primaryImage =
    propertyData.imageUrl ||
    propertyData.image_url ||
    propertyData.images?.[0]?.imageUrl ||
    propertyData.images?.[0]?.image_url;

  const listingTypeVal = propertyData.listing_type || propertyData.listingType || 'sale';
  const areaSqftVal = propertyData.area_sqft || propertyData.areaSqft || 1200;

  return (
    <Link href={`/properties/${propertyData.slug || propertyData.id}`} className="group block overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {primaryImage ? (
          <Image
            src={primaryImage}
            alt={propertyData.title || 'Property'}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground bg-slate-100">
            <Maximize className="h-12 w-12 text-slate-400" />
          </div>
        )}
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge variant="secondary" className="bg-white/90 text-foreground">
            {listingTypeVal === 'rent' ? 'For Rent' : 'For Sale'}
          </Badge>
          {propertyData.verified && (
            <Badge className="bg-green-600/90 text-white">
              <Verified className="mr-1 h-3 w-3" />
              Verified
            </Badge>
          )}
        </div>
        {propertyData.featured && (
          <div className="absolute right-3 top-3">
            <Badge className="bg-primary/90">Featured</Badge>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-1 flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug group-hover:text-primary">
            {propertyData.title}
          </h3>
        </div>

        <p className="mb-3 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          {propertyData.locality?.name ?? propertyData.location ?? 'Madurai'}
        </p>

        <div className="mb-3 flex items-baseline justify-between">
          <span className="text-lg font-bold text-primary">
            {formatPrice(displayPrice, listingTypeVal)}
          </span>
          {listingTypeVal === 'sale' && areaSqftVal && (
            <span className="text-xs text-muted-foreground">
              {formatPricePerSqft(propertyData.price ?? 0, Number(areaSqftVal))}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {propertyData.bedrooms != null && propertyData.bedrooms > 0 && (
            <span className="flex items-center gap-1">
              <BedDouble className="h-3.5 w-3.5" />
              {propertyData.bedrooms} BHK
            </span>
          )}
          {propertyData.bathrooms != null && propertyData.bathrooms > 0 && (
            <span className="flex items-center gap-1">
              <Bath className="h-3.5 w-3.5" />
              {propertyData.bathrooms}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Maximize className="h-3.5 w-3.5" />
            {formatArea(Number(areaSqftVal), propertyData.area_cents)}
          </span>
        </div>

        {propertyData.approval && propertyData.approval !== 'none' && (
          <div className="mt-3 flex items-center gap-1 text-xs text-green-600">
            <CheckCircle2 className="h-3 w-3" />
            {propertyData.approval.toUpperCase()} Approved
          </div>
        )}
      </div>
    </Link>
  );
}

