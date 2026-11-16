import { supabase } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EnquiryForm } from '@/components/property/enquiry-form';
import { EMICalculator } from '@/components/property/emi-calculator';
import { PropertyCard } from '@/components/property/property-card';
import { BlueprintGeneratorStudio } from '@/components/tools/blueprint-generator-studio';
import { PropertyLandData } from '@/lib/blueprint/types';
import { COMPANY, formatPrice, formatArea, formatPricePerSqft } from '@/lib/constants';
import type { PropertyWithRelations, PropertyImage, Amenity, PropertyAmenity, Locality, Project, Builder } from '@/lib/types';
import {
  MapPin, BedDouble, Bath, Maximize, Compass, Building, Calendar, FileCheck,
  Phone, MessageCircle, Share2, ShieldCheck, Play, CheckCircle2, ArrowLeft,
  School, Cross, Bus, Ruler,
} from 'lucide-react';

export const revalidate = 0;

interface PageProps {
  params: { slug: string };
}

async function getProperty(slug: string) {
  // Support lookup by either database ID or slug string to prevent 404 errors
  const { data, error } = await supabase
    .from('properties')
    .select(`
      *,
      locality:localities(*),
      builder:builders(*),
      project:projects(*),
      images:property_images(*),
      amenities:property_amenities(amenity:amenities(*))
    `)
    .or(`id.eq.${slug},slug.eq.${slug}`)
    .maybeSingle();

  if (error || !data) return null;
  return data as unknown as PropertyWithRelations;
}

async function getSimilarProperties(property: PropertyWithRelations) {
  let query = supabase
    .from('properties')
    .select(`
      *,
      locality:localities(*),
      builder:builders(*),
      project:projects(*),
      images:property_images(*),
      amenities:property_amenities(amenity:amenities(*))
    `)
    .neq('id', property.id)
    .limit(3);

  if (property.locality_id) {
    query = query.eq('locality_id', property.locality_id);
  } else {
    query = query.eq('property_type', property.property_type);
  }

  const { data } = await query;
  return (data ?? []) as unknown as PropertyWithRelations[];
}

export async function generateMetadata({ params }: PageProps) {
  const property = await getProperty(params.slug);
  if (!property) return { title: 'Property Not Found' };
  return {
    title: property.title,
    description: property.description?.slice(0, 160) ?? `Property in ${property.locality?.name ?? 'Madurai'}`,
    openGraph: {
      title: property.title,
      description: property.description?.slice(0, 160) ?? '',
      images: property.images?.[0] ? [property.images[0].image_url] : [],
    },
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const property = await getProperty(params.slug);
  if (!property) notFound();

  const similarProperties = await getSimilarProperties(property);

  const displayPrice = property.listing_type === 'rent'
    ? (property.rent_amount ?? 0)
    : property.price;

  const images = property.images ?? [];
  const fallbackImageUrl = ((property as any).image_url as string | undefined) ?? images[0]?.image_url ?? null;
  const amenities = (property.amenities ?? []).map((a: PropertyAmenity) => a.amenity);

  // Map database property dimensions to Blueprint Studio interface if land metrics exist
  const rawProperty = property as any;
  const landData: PropertyLandData = {
    propertyId: property.id,
    front: rawProperty.front_length ?? 40,
    back: rawProperty.back_length ?? 40,
    left: rawProperty.left_length ?? 60,
    right: rawProperty.right_length ?? 60,
    diagonal: rawProperty.diagonal || undefined,
    roadSide: rawProperty.road_side ?? 'FRONT',
    roadWidth: rawProperty.road_width ?? 30,
    northDirection: rawProperty.north_direction ?? 'TOP',
  };

  const nearbyPlaces = [
    { icon: School, label: 'Schools', name: 'Within 2 km' },
    { icon: Cross, label: 'Hospitals', name: 'Within 3 km' },
    { icon: Bus, label: 'Bus Stop', name: 'Within 500 m' },
  ];

  return (
    <div className="container-page py-6 lg:py-8 max-w-7xl mx-auto px-4">
      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link href="/properties" className="hover:text-primary">Properties</Link>
        <span>/</span>
        <span className="text-foreground line-clamp-1">{property.title}</span>
      </div>

      <Link href="/properties" className="mb-4 inline-flex items-center gap-1 text-sm text-primary hover:underline">
        <ArrowLeft className="h-4 w-4" />
        Back to Properties
      </Link>

      {/* Photo Gallery */}
      {images.length > 0 && (
        <div className="mb-6 grid gap-2 sm:grid-cols-4">
          <div className="relative aspect-[16/10] sm:col-span-2 sm:row-span-2 overflow-hidden rounded-lg bg-muted">
            <Image
              src={images[0].image_url}
              alt={property.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
              priority
            />
          </div>
          {images.slice(1, 5).map((img: PropertyImage, idx: number) => (
            <div key={img.id} className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              <Image
                src={img.image_url}
                alt={img.caption ?? property.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              {idx === 3 && images.length > 5 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
                  <span className="text-sm font-medium">+{images.length - 5} more</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Fallback image if images array is empty */}
      {images.length === 0 && fallbackImageUrl && (
        <div className="mb-6 relative aspect-[16/6] overflow-hidden rounded-xl bg-muted">
          <Image src={fallbackImageUrl} alt={property.title} fill className="object-cover" priority />
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        {/* Main Content */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge variant="secondary">
                {property.listing_type === 'rent' ? 'For Rent' : 'For Sale'}
              </Badge>
              {property.verified && (
                <Badge className="bg-green-600">
                  <ShieldCheck className="mr-1 h-3 w-3" />
                  Verified
                </Badge>
              )}
              {property.approval && property.approval !== 'none' && (
                <Badge variant="outline">{property.approval.toUpperCase()}</Badge>
              )}
            </div>
            <h1 className="text-2xl font-bold sm:text-3xl">{property.title}</h1>
            <p className="mt-2 flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {property.address ?? property.locality?.name ?? 'Madurai'}
            </p>
            <p className="mt-3 text-3xl font-bold text-primary">
              {formatPrice(displayPrice, property.listing_type)}
            </p>
            {property.listing_type === 'buy' && property.area_sqft && (
              <p className="text-sm text-muted-foreground">{formatPricePerSqft(property.price, property.area_sqft)}</p>
            )}
          </div>

          {/* Action Buttons */}
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            {property.owner_phone && (
              <Button asChild>
                <a href={`tel:${property.owner_phone}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  Call Owner
                </a>
              </Button>
            )}
            <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50" asChild>
              <a href={`https://wa.me/${property.owner_phone?.replace(/\D/g, '') ?? COMPANY.whatsapp}?text=I'm interested in "${property.title}"`} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp
              </a>
            </Button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview">
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="blueprint" className="text-amber-600 font-bold">📐 Blueprint Studio</TabsTrigger>
              <TabsTrigger value="description">Description</TabsTrigger>
              {amenities.length > 0 && <TabsTrigger value="amenities">Amenities</TabsTrigger>}
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="emi">EMI Calculator</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {property.bedrooms != null && (
                  <div className="rounded-lg border p-4">
                    <BedDouble className="mb-2 h-5 w-5 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Bedrooms</p>
                    <p className="text-lg font-semibold">{property.bedrooms} BHK</p>
                  </div>
                )}
                {property.bathrooms != null && (
                  <div className="rounded-lg border p-4">
                    <Bath className="mb-2 h-5 w-5 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Bathrooms</p>
                    <p className="text-lg font-semibold">{property.bathrooms}</p>
                  </div>
                )}
                <div className="rounded-lg border p-4">
                  <Maximize className="mb-2 h-5 w-5 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Area</p>
                  <p className="text-lg font-semibold">{formatArea(property.area_sqft, property.area_cents)}</p>
                </div>
                {property.facing && (
                  <div className="rounded-lg border p-4">
                    <Compass className="mb-2 h-5 w-5 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Facing</p>
                    <p className="text-lg font-semibold">{property.facing}</p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Blueprint Generator Studio Tab */}
            <TabsContent value="blueprint" className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-amber-900 text-sm">Interactive Land & Blueprint Generator</h3>
                  <p className="text-xs text-amber-700">Pre-loaded with exact survey dimensions for this plot.</p>
                </div>
                <span className="bg-amber-600 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase">Live Studio</span>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <BlueprintGeneratorStudio property={landData} />
              </div>
            </TabsContent>

            {/* Description Tab */}
            <TabsContent value="description">
              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                  {property.description}
                </p>
              </div>
            </TabsContent>

            {/* Amenities Tab */}
            {amenities.length > 0 && (
              <TabsContent value="amenities">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {amenities.map((amenity: Amenity) => (
                    <div key={amenity.id} className="flex items-center gap-2 rounded-lg border p-3">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            )}

            {/* Location Tab */}
            <TabsContent value="location">
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 text-sm font-semibold">Property Address</h3>
                  <p className="text-sm text-muted-foreground">{property.address ?? property.locality?.name ?? 'Madurai'}</p>
                </div>
              </div>
            </TabsContent>

            {/* EMI Tab */}
            <TabsContent value="emi">
              <EMICalculator defaultPrice={property.price} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - Enquiry Form */}
        <div className="lg:sticky lg:top-20 lg:h-fit space-y-4">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Enquire About This Property</h3>
            <p className="mt-1 text-sm text-muted-foreground">Fill the form below to get in touch</p>
            <div className="mt-4">
              <EnquiryForm
                propertyId={property.id}
                propertyTitle={property.title}
                ownerPhone={property.owner_phone}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Similar Properties */}
      {similarProperties.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">Similar Properties</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similarProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}