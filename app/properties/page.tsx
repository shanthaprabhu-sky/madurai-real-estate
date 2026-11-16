import { prisma } from '@/lib/db'; // ✅ Use the shared singleton
import { PrismaClient } from '@prisma/client';
import { PropertyCard } from '@/components/property/property-card';
import { Filters } from '@/components/property/filters';
import { Pagination } from '@/components/property/pagination';
import { Button } from '@/components/ui/button';
import { Building } from 'lucide-react';
import Link from 'next/link';
import type { PropertyWithRelations, Locality } from '@/lib/types';


export const revalidate = 0;

const PAGE_SIZE = 9;

interface PageProps {
  searchParams: {
    type?: string;
    locality?: string;
    min_price?: string;
    max_price?: string;
    bedrooms?: string;
    approval?: string;
    sort?: string;
    page?: string;
  };
}

async function getDeveloperProperties(searchParams: PageProps['searchParams']) {
  const page = parseInt(searchParams.page ?? '1', 10);
  const skip = (page - 1) * PAGE_SIZE;

  const where: any = {};

  if (searchParams.type) {
    const types = searchParams.type.split(',').filter(Boolean);
    if (types.length > 0) where.propertyType = { in: types };
  }

  if (searchParams.locality) {
    const localities = searchParams.locality.split(',').filter(Boolean);
    if (localities.length > 0) where.localityId = { in: localities };
  }

  if (searchParams.min_price || searchParams.max_price) {
    where.price = {};
    if (searchParams.min_price) where.price.gte = parseFloat(searchParams.min_price);
    if (searchParams.max_price) where.price.lte = parseFloat(searchParams.max_price);
  }

  if (searchParams.bedrooms) {
    const bedrooms = searchParams.bedrooms.split(',').filter(Boolean).map((b) => {
      if (b === '4+') return 4;
      return parseInt(b, 10);
    });
    if (bedrooms.length > 0) {
      if (searchParams.bedrooms.includes('4+')) {
        where.bedrooms = { gte: 4 };
      } else {
        where.bedrooms = { in: bedrooms };
      }
    }
  }

  if (searchParams.approval) {
    const approvals = searchParams.approval.split(',').filter(Boolean);
    if (approvals.length > 0) where.approval = { in: approvals };
  }

  let orderBy: any = { createdAt: 'desc' };
  const sort = searchParams.sort ?? 'newest';
  switch (sort) {
    case 'price_low':
      orderBy = { price: 'asc' };
      break;
    case 'price_high':
      orderBy = { price: 'desc' };
      break;
    case 'area_large':
      orderBy = { areaSqft: 'desc' };
      break;
    case 'area_small':
      orderBy = { areaSqft: 'asc' };
      break;
    default:
      orderBy = { createdAt: 'desc' };
  }

  try {
    // Cast prisma to any to safely query with relations without schema strictness errors
    const client = prisma as any;

    const [properties, totalCount] = await Promise.all([
      client.property.findMany({
        where,
        include: {
          locality: true,
          builder: true,
          project: true,
          images: true,
          amenities: true,
        },
        orderBy,
        skip,
        take: PAGE_SIZE,
      }),
      client.property.count({ where }),
    ]);

    return {
      properties: properties as unknown as PropertyWithRelations[],
      totalCount,
      currentPage: page,
    };
  } catch (error) {
    console.error('Error fetching developer properties with Prisma:', error);
    return { properties: [], totalCount: 0, currentPage: page };
  }
}

export async function generateMetadata() {
  return {
    title: 'Flagship Projects & Residences in Madurai',
    description: 'Explore luxury RERA & DTCP approved 2 & 3 BHK apartments, villas, and plots by our brand in prime Madurai localities.',
  };
}

export default async function PropertiesPage({ searchParams }: PageProps) {
  const { properties, totalCount, currentPage } = await getDeveloperProperties(searchParams);
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  let localities: Locality[] = [];
  try {
    const localityModel = (prisma as any).locality ?? (prisma as any).Locality;
    localities = localityModel
      ? ((await localityModel.findMany({ orderBy: { name: 'asc' } })) as Locality[])
      : [];
  } catch (e) {
    localities = [];
  }

  const activeFilterCount = Object.keys(searchParams).filter(
    (k) => !['page', 'sort'].includes(k) && searchParams[k as keyof typeof searchParams]
  ).length;

  return (
    <div className="container-page py-8">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              Exclusive Developments
            </span>
          </div>
          <h1 className="text-2xl font-bold sm:text-3xl text-slate-900">Flagship Projects in Madurai</h1>
          <p className="mt-1 text-muted-foreground text-sm">
            {totalCount} Verified DTCP & RERA approved plots and lands across prime Madurai localities
            {activeFilterCount > 0 && ` · ${activeFilterCount} filter${activeFilterCount > 1 ? 's' : ''} applied`}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="lg:sticky lg:top-20 lg:h-fit">
          <div className="rounded-xl border bg-card p-4 shadow-sm">
            <Filters localities={localities} />
          </div>
        </aside>

        <div>
          {properties.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border bg-card py-20 text-center shadow-sm">
              <Building className="mb-4 h-12 w-12 text-amber-600" />
              <h3 className="text-lg font-semibold text-slate-900">No matching residences found</h3>
              <p className="mt-1 text-sm text-muted-foreground max-w-sm">
                Try adjusting your filters to explore alternative configurations or localities.
              </p>
              <Button className="mt-4 bg-amber-600 hover:bg-amber-700 text-white" variant="default" asChild>
                <Link href="/properties">Reset Filters</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-8">
                  <Pagination currentPage={currentPage} totalPages={totalPages} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}