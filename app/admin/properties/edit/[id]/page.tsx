import { prisma } from '@/lib/db';
import { updatePropertyAction } from '@/app/action/property-action';
import { Button } from '@/components/ui/button';
import { Building2, Sliders, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const revalidate = 0;

export default async function EditPropertyPage({ params }: { params: { id: string } }) {
  const property = await prisma.property.findUnique({
    where: { id: params.id },
  });

  if (!property) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center space-y-3">
        <h1 className="text-xl font-bold text-slate-900">Property not found</h1>
        <Link href="/admin/properties" className="text-amber-600 underline text-xs font-semibold block">
          Back to Properties
        </Link>
      </div>
    );
  }

  async function handleUpdate(formData: FormData) {
    'use server';
    const res = await updatePropertyAction(params.id, formData);
    if (res.success) {
      redirect('/admin/properties');
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/admin/properties" className="text-xs font-semibold text-amber-600 flex items-center gap-1 hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to Listings
        </Link>
        <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
          Admin Portal - Edit Mode
        </span>
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-slate-900">Edit Property & Blueprint Metrics</h1>
        <p className="text-xs text-muted-foreground">
          Modify listing information, pricing, or boundary dimensions and save changes.
        </p>
      </div>

      <form action={handleUpdate} className="space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        {/* Basic Listing Info */}
        <div className="space-y-4">
          <h2 className="font-bold text-slate-900 flex items-center gap-2 text-sm border-b pb-2">
            <Building2 className="h-4 w-4 text-amber-600" /> General Listing Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Property Title</label>
              <input required name="title" defaultValue={property.title} className="w-full px-3 py-2 rounded-xl border text-xs" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Location / Area</label>
              <input required name="location" defaultValue={property.location} className="w-full px-3 py-2 rounded-xl border text-xs" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Price (₹)</label>
              <input required type="number" name="price" defaultValue={property.price} className="w-full px-3 py-2 rounded-xl border text-xs" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Description</label>
            <textarea name="description" rows={3} defaultValue={property.description} className="w-full px-3 py-2 rounded-xl border text-xs" />
          </div>
        </div>

        {/* Filter Categories */}
        <div className="space-y-4 pt-4 border-t">
          <h2 className="font-bold text-slate-900 flex items-center gap-2 text-sm border-b pb-2">
            <Sliders className="h-4 w-4 text-amber-600" /> Filter & Category Configurations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Property Type</label>
              <select name="propertyType" defaultValue={property.propertyType} className="w-full px-3 py-2 rounded-xl border text-xs bg-white">
                <option value="Residential Plot">Residential Plot</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Independent House">Independent House</option>
                <option value="Commercial Shop">Commercial Shop</option>
                <option value="Office Space">Office Space</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Listing Type</label>
              <select name="listingType" defaultValue={property.listingType} className="w-full px-3 py-2 rounded-xl border text-xs bg-white">
                <option value="sale">Buy / Sale</option>
                <option value="rent">Rent / Lease</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Bedrooms (BHK)</label>
              <select name="bedrooms" defaultValue={property.bedrooms} className="w-full px-3 py-2 rounded-xl border text-xs bg-white">
                <option value="0">Not Applicable (Plots/Commercial)</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4+ BHK</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Legal Approval</label>
              <select name="approval" defaultValue={property.approval} className="w-full px-3 py-2 rounded-xl border text-xs bg-white">
                <option value="RERA Registered">RERA Registered</option>
                <option value="DTCP Approved">DTCP Approved</option>
                <option value="CMDA Approved">CMDA Approved</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Total Area (sq.ft)</label>
              <input required type="number" name="areaSqft" defaultValue={Number(property.areaSqft)} className="w-full px-3 py-2 rounded-xl border text-xs" />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Furnishing Status</label>
              <select name="furnishing" defaultValue={property.furnishing} className="w-full px-3 py-2 rounded-xl border text-xs bg-white">
                <option value="Unfurnished">Unfurnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Fully Furnished">Fully Furnished</option>
              </select>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-xl shadow-lg">
          Save Changes
        </Button>
      </form>
    </div>
  );
}