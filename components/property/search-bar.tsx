'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PROPERTY_TYPES, BUDGET_RANGES } from '@/lib/constants';

interface SearchBarProps {
  localities: { id: string; name: string }[];
}

export function SearchBar({ localities }: SearchBarProps) {
  const router = useRouter();
  const [listingType, setListingType] = useState('buy');
  const [locality, setLocality] = useState('any');
  const [propertyType, setPropertyType] = useState('any');
  const [budget, setBudget] = useState('any');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (listingType !== 'any') params.set('listing_type', listingType);
    if (locality !== 'any') params.set('locality', locality);
    if (propertyType !== 'any') params.set('type', propertyType);
    if (budget !== 'any') {
      const range = BUDGET_RANGES.find((b) => b.label === budget);
      if (range) {
        params.set('min_price', String(range.min));
        params.set('max_price', String(range.max));
      }
    }
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="rounded-xl border bg-background/95 p-4 shadow-lg backdrop-blur sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Listing</label>
          <Select value={listingType} onValueChange={setListingType}>
            <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="buy">Buy</SelectItem>
              <SelectItem value="rent">Rent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Locality</label>
          <Select value={locality} onValueChange={setLocality}>
            <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="any">All Localities</SelectItem>
              {localities.map((l) => (
                <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Type</label>
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="any">All Types</SelectItem>
              {PROPERTY_TYPES.map((t) => (
                <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Budget</label>
          <Select value={budget} onValueChange={setBudget}>
            <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Budget</SelectItem>
              {BUDGET_RANGES.map((b) => (
                <SelectItem key={b.label} value={b.label}>{b.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button className="h-11 w-full" onClick={handleSearch}>
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        <button
          onClick={() => router.push('/properties?near_me=true')}
          className="text-sm text-primary hover:underline"
        >
          Search near me
        </button>
      </div>
    </div>
  );
}
