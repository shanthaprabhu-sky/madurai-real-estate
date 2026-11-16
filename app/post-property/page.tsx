'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { PROPERTY_TYPES, LISTING_TYPES, FURNISHING_TYPES, APPROVAL_TYPES, FACING_DIRECTIONS } from '@/lib/constants';

export default function PostPropertyPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const [listingType, setListingType] = useState('buy');
  const [propertyType, setPropertyType] = useState('apartment');
  const [furnishing, setFurnishing] = useState('unfurnished');
  const [facing, setFacing] = useState('East');
  const [approval, setApproval] = useState('dtcp');
  const [localityId, setLocalityId] = useState('');
  const [localities, setLocalities] = useState<{id: string; name: string}[]>([]);

  useState(() => {
    supabase.from('localities').select('id, name').order('name').then(({ data }) => {
      if (data) setLocalities(data);
    });
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    const title = formData.get('title') as string;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Date.now().toString(36);

    const { error } = await supabase.from('properties').insert({
      title,
      slug,
      description: formData.get('description') as string,
      listing_type: listingType,
      property_type: propertyType,
      locality_id: localityId || null,
      address: formData.get('address') as string,
      price: parseInt(formData.get('price') as string, 10) || 0,
      rent_amount: listingType === 'rent' ? parseInt(formData.get('rent_amount') as string, 10) || null : null,
      security_deposit: listingType === 'rent' ? parseInt(formData.get('security_deposit') as string, 10) || null : null,
      bedrooms: parseInt(formData.get('bedrooms') as string, 10) || null,
      bathrooms: parseInt(formData.get('bathrooms') as string, 10) || null,
      area_sqft: parseFloat(formData.get('area_sqft') as string) || null,
      area_cents: parseFloat(formData.get('area_cents') as string) || null,
      furnishing: furnishing,
      facing: facing,
      floor_number: formData.get('floor_number') as string || null,
      total_floors: parseInt(formData.get('total_floors') as string, 10) || null,
      age_years: parseInt(formData.get('age_years') as string, 10) || null,
      approval: approval,
      owner_name: formData.get('owner_name') as string,
      owner_phone: formData.get('owner_phone') as string,
      owner_email: formData.get('owner_email') as string,
      status: 'inactive',
    });

    if (error) {
      toast({ title: 'Error', description: 'Failed to submit property. Please try again.', variant: 'destructive' });
    } else {
      setSubmitted(true);
      toast({ title: 'Property Submitted!', description: 'Your listing will be reviewed and published within 24-48 hours.' });
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="container-page py-20">
        <div className="mx-auto max-w-md text-center">
          <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-600" />
          <h1 className="text-2xl font-bold">Property Submitted!</h1>
          <p className="mt-2 text-muted-foreground">
            Thank you for posting your property. Our team will review your listing and publish it within 24-48 hours.
          </p>
          <Button className="mt-6" onClick={() => setSubmitted(false)}>
            Post Another Property
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold">Post Your Property</h1>
        <p className="mt-2 text-muted-foreground">List your property for sale or rent. It's free!</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4 rounded-lg border p-6">
            <h2 className="text-lg font-semibold">Basic Information</h2>
            <div>
              <Label htmlFor="title">Property Title *</Label>
              <Input id="title" name="title" required placeholder="e.g. 3 BHK Apartment in Anna Nagar" className="mt-1.5" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Listing Type</Label>
                <Select value={listingType} onValueChange={setListingType}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {LISTING_TYPES.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Property Type</Label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {PROPERTY_TYPES.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" rows={4} placeholder="Describe your property..." className="mt-1.5" />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4 rounded-lg border p-6">
            <h2 className="text-lg font-semibold">Location</h2>
            <div>
              <Label>Locality</Label>
              <Select value={localityId} onValueChange={setLocalityId}>
                <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select locality" /></SelectTrigger>
                <SelectContent>
                  {localities.map((l) => <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="address">Full Address</Label>
              <Input id="address" name="address" placeholder="Door no, Street, Area, Madurai" className="mt-1.5" />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4 rounded-lg border p-6">
            <h2 className="text-lg font-semibold">Property Details</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input id="bedrooms" name="bedrooms" type="number" min="0" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input id="bathrooms" name="bathrooms" type="number" min="0" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="area_sqft">Area (sq.ft)</Label>
                <Input id="area_sqft" name="area_sqft" type="number" min="0" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="area_cents">Area (cents)</Label>
                <Input id="area_cents" name="area_cents" type="number" min="0" step="0.01" className="mt-1.5" />
              </div>
              <div>
                <Label>Furnishing</Label>
                <Select value={furnishing} onValueChange={setFurnishing}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {FURNISHING_TYPES.map((f) => <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Facing</Label>
                <Select value={facing} onValueChange={setFacing}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {FACING_DIRECTIONS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="floor_number">Floor</Label>
                <Input id="floor_number" name="floor_number" placeholder="e.g. Ground, 1, 2" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="total_floors">Total Floors</Label>
                <Input id="total_floors" name="total_floors" type="number" min="0" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="age_years">Age (years)</Label>
                <Input id="age_years" name="age_years" type="number" min="0" className="mt-1.5" />
              </div>
            </div>
            <div>
              <Label>Approval</Label>
              <Select value={approval} onValueChange={setApproval}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {APPROVAL_TYPES.map((a) => <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-4 rounded-lg border p-6">
            <h2 className="text-lg font-semibold">Pricing</h2>
            {listingType === 'buy' ? (
              <div>
                <Label htmlFor="price">Expected Price (₹) *</Label>
                <Input id="price" name="price" type="number" required min="0" placeholder="e.g. 5500000" className="mt-1.5" />
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="rent_amount">Monthly Rent (₹) *</Label>
                  <Input id="rent_amount" name="rent_amount" type="number" required min="0" placeholder="e.g. 18000" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="security_deposit">Security Deposit (₹)</Label>
                  <Input id="security_deposit" name="security_deposit" type="number" min="0" placeholder="e.g. 36000" className="mt-1.5" />
                </div>
              </div>
            )}
          </div>

          {/* Contact */}
          <div className="space-y-4 rounded-lg border p-6">
            <h2 className="text-lg font-semibold">Contact Details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="owner_name">Name *</Label>
                <Input id="owner_name" name="owner_name" required className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="owner_phone">Phone *</Label>
                <Input id="owner_phone" name="owner_phone" required type="tel" placeholder="98765 43210" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="owner_email">Email</Label>
                <Input id="owner_email" name="owner_email" type="email" className="mt-1.5" />
              </div>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Property
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Your listing will be reviewed by our team before going live. This usually takes 24-48 hours.
          </p>
        </form>
      </div>
    </div>
  );
}
