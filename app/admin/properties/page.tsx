import { prisma } from '@/lib/db';
import Link from 'next/link';
import { Building2, Plus, Trash2, Edit3, MapPin, CheckCircle2 } from 'lucide-react';
import { deleteProperty } from './action';
import { DeletePropertyButton } from './delete-button';

export const revalidate = 0; // Disable cache for real-time admin management

export default async function AdminPropertiesPage() {
  const properties = await prisma.property.findMany({
    orderBy: { createdAt: 'desc' },
    include: { images: true },
  }).catch((error) => {
    console.error('Error fetching admin properties:', error);
    return [];
  });

  return (
    <div className="max-w-6xl mx-auto py-2 px-4 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">Properties &amp; Land Listings</h1>
          <p className="text-xs text-muted-foreground">
            Manage your real estate inventory, blueprint geometry, and active listings.
          </p>
        </div>
        <Link href="/admin/properties/new">
          <button className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md transition-all">
            <Plus className="h-4 w-4" /> Post New Property
          </button>
        </Link>
      </div>

      {properties.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-card py-20 text-center shadow-sm">
          <Building2 className="mb-4 h-12 w-12 text-amber-600" />
          <h3 className="text-lg font-semibold text-slate-900">No properties posted yet.</h3>
          <p className="mt-1 text-sm text-muted-foreground max-w-sm mb-6">
            Click the button below to post your first land listing with blueprint geometry.
          </p>
          <Link href="/admin/properties/new">
            <button className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow">
              Post First Property
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => {
            const thumbnail =
              property.imageUrl ||
              property.images?.[0]?.imageUrl ||
              'https://images.unsplash.com/photo-1560518883-ce09059eeffa';

            return (
              <div
                key={property.id}
                className="rounded-2xl border bg-card overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 w-full bg-slate-100">
                    <img src={thumbnail} alt={property.title} className="h-full w-full object-cover" />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      {property.listingType === 'rent' ? 'For Rent' : 'For Sale'}
                    </span>
                    <span className="absolute top-3 right-3 bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      {property.propertyType}
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-slate-900 text-sm line-clamp-1">{property.title}</h3>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" /> {property.location}
                    </p>
                    <div className="text-base font-extrabold text-amber-700">
                      ₹ {property.price.toLocaleString('en-IN')}
                    </div>
                    {property.approval && (
                      <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded w-fit">
                        <CheckCircle2 className="h-3 w-3" /> {property.approval}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 pt-0 border-t mt-4 flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground font-medium">
                    {property.bedrooms > 0 ? `${property.bedrooms} BHK` : 'Plot/Land'} • {Number(property.areaSqft)} sq.ft
                  </span>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/properties/edit/${property.id}`}
                      className="p-2 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors"
                      title="Edit Property"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Link>

                    <DeletePropertyButton 
                    propertyId={property.id} 
                    propertyTitle={property.title} 
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}