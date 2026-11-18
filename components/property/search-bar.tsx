'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PROPERTY_TYPES, BUDGET_RANGES } from '@/lib/constants';

interface SearchBarProps {
  localities: { id: string; name: string }[];
}

const MADURAI_COORDS: Record<string, { lat: number; lng: number }> = {
  'anna nagar': { lat: 9.9195, lng: 78.1460 },
  'kk nagar': { lat: 9.9324, lng: 78.1449 },
  'thiruparankundram': { lat: 9.8821, lng: 78.0706 },
  'othakadai': { lat: 9.9575, lng: 78.1873 },
  'thirunagar': { lat: 9.8851, lng: 78.0467 },
  'bypass road': { lat: 9.9142, lng: 78.0970 },
  'villapuram': { lat: 9.8938, lng: 78.1173 },
  'mattuthavani': { lat: 9.9442, lng: 78.1565 },
  'tallakulam': { lat: 9.9328, lng: 78.1322 },
  'simmakkal': { lat: 9.9261, lng: 78.1211 },
};

export function SearchBar({ localities }: SearchBarProps) {
  const router = useRouter();
  const [listingType, setListingType] = useState('buy');
  const [locality, setLocality] = useState('any');
  const [propertyType, setPropertyType] = useState('any');
  const [budget, setBudget] = useState('any');
  const [isLocating, setIsLocating] = useState(false);

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

  const handleSearchNearMe = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser. Please select a locality manually.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        let closestLocality: { id: string; name: string } | null = null;
        let minDistance = Infinity;

        for (const loc of localities) {
          const coords = MADURAI_COORDS[loc.name.trim().toLowerCase()];
          if (coords) {
            const dist = Math.hypot(latitude - coords.lat, longitude - coords.lng);
            if (dist < minDistance) {
              minDistance = dist;
              closestLocality = loc;
            }
          }
        }

        const params = new URLSearchParams();
        if (listingType !== 'any') params.set('listing_type', listingType);

        if (closestLocality) {
          setLocality(closestLocality.id);
          params.set('locality', closestLocality.id);
        }
        params.set('near_me', 'true');

        setIsLocating(false);
        router.push(`/properties?${params.toString()}`);
      },
      () => {
        setIsLocating(false);
        alert('Location access was denied. Please enable location permissions or choose a locality from the dropdown.');
      },
      { enableHighAccuracy: false, timeout: 8000 }
    );
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
        {isLocating ? (
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        ) : (
          <MapPin className="h-4 w-4 text-muted-foreground" />
        )}
        <button
          type="button"
          disabled={isLocating}
          onClick={handleSearchNearMe}
          className="text-sm text-primary hover:underline disabled:opacity-60"
        >
          {isLocating ? 'Detecting your location...' : 'Search near me'}
        </button>
      </div>
    </div>
  );
}