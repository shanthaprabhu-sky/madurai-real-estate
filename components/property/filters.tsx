'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PROPERTY_TYPES, BUDGET_RANGES, BHK_OPTIONS, FURNISHING_TYPES, APPROVAL_TYPES, SORT_OPTIONS } from '@/lib/constants';
import type { Locality } from '@/lib/types';

interface FiltersProps {
  localities: Locality[];
}

export function Filters({ localities }: FiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === null || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      params.delete('page');
      router.push(`/properties?${params.toString()}`);
    },
    [router, searchParams]
  );

  const toggleArrayParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const current = params.get(key)?.split(',').filter(Boolean) ?? [];
      const exists = current.includes(value);
      const next = exists ? current.filter((v) => v !== value) : [...current, value];
      if (next.length === 0) params.delete(key);
      else params.set(key, next.join(','));
      params.delete('page');
      router.push(`/properties?${params.toString()}`);
    },
    [router, searchParams]
  );

  const isChecked = (key: string, value: string) => {
    const current = searchParams.get(key)?.split(',').filter(Boolean) ?? [];
    return current.includes(value);
  };

  const clearAll = () => {
    router.push('/properties');
  };

  const hasFilters = useMemo(() => {
    return Array.from(searchParams.keys()).some((k) => !['page', 'sort'].includes(k));
  }, [searchParams]);

  const sort = searchParams.get('sort') ?? 'newest';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <Filter className="h-4 w-4" />
          Filters
        </h3>
        {hasFilters && (
          <button onClick={clearAll} className="text-xs text-primary hover:underline">
            Clear All
          </button>
        )}
      </div>

      {/* Sort */}
      <div>
        <Label className="mb-1.5 block text-xs font-medium text-muted-foreground">Sort By</Label>
        <Select value={sort} onValueChange={(v) => updateParam('sort', v)}>
          <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Accordion type="multiple" defaultValue={['type', 'budget', 'bhk', 'locality', 'approval']}>

        {/* Property Type */}
        <AccordionItem value="type">
          <AccordionTrigger className="text-sm font-medium">Property Type</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            {PROPERTY_TYPES.map((t) => (
              <div key={t.value} className="flex items-center gap-2">
                <Checkbox
                  id={`pt-${t.value}`}
                  checked={isChecked('type', t.value)}
                  onCheckedChange={() => toggleArrayParam('type', t.value)}
                />
                <Label htmlFor={`pt-${t.value}`} className="text-sm font-normal cursor-pointer">{t.label}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Budget */}
        <AccordionItem value="budget">
          <AccordionTrigger className="text-sm font-medium">Budget</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            {BUDGET_RANGES.map((b) => (
              <div key={b.label} className="flex items-center gap-2">
                <Checkbox
                  id={`bg-${b.label}`}
                  checked={searchParams.get('min_price') === String(b.min) && searchParams.get('max_price') === String(b.max)}
                  onCheckedChange={() => {
                    if (searchParams.get('min_price') === String(b.min)) {
                      updateParam('min_price', null);
                      updateParam('max_price', null);
                    } else {
                      updateParam('min_price', String(b.min));
                      updateParam('max_price', String(b.max));
                    }
                  }}
                />
                <Label htmlFor={`bg-${b.label}`} className="text-sm font-normal cursor-pointer">{b.label}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* BHK */}
        <AccordionItem value="bhk">
          <AccordionTrigger className="text-sm font-medium">Bedrooms</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            {BHK_OPTIONS.map((b) => (
              <div key={b.value} className="flex items-center gap-2">
                <Checkbox
                  id={`bhk-${b.value}`}
                  checked={isChecked('bedrooms', b.value)}
                  onCheckedChange={() => toggleArrayParam('bedrooms', b.value)}
                />
                <Label htmlFor={`bhk-${b.value}`} className="text-sm font-normal cursor-pointer">{b.label}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Locality */}
        <AccordionItem value="locality">
          <AccordionTrigger className="text-sm font-medium">Locality</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2 max-h-48 overflow-y-auto">
            {localities.map((l) => (
              <div key={l.id} className="flex items-center gap-2">
                <Checkbox
                  id={`loc-${l.id}`}
                  checked={isChecked('locality', l.id)}
                  onCheckedChange={() => toggleArrayParam('locality', l.id)}
                />
                <Label htmlFor={`loc-${l.id}`} className="text-sm font-normal cursor-pointer">{l.name}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        {/* Approval */}
        <AccordionItem value="approval">
          <AccordionTrigger className="text-sm font-medium">Approval</AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2">
            {APPROVAL_TYPES.filter((a) => a.value !== 'none').map((a) => (
              <div key={a.value} className="flex items-center gap-2">
                <Checkbox
                  id={`ap-${a.value}`}
                  checked={isChecked('approval', a.value)}
                  onCheckedChange={() => toggleArrayParam('approval', a.value)}
                />
                <Label htmlFor={`ap-${a.value}`} className="text-sm font-normal cursor-pointer">{a.label}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Furnishing */}
      <div>
        <Label className="mb-1.5 block text-xs font-medium text-muted-foreground">Furnishing</Label>
        <Select
          value={searchParams.get('furnishing') ?? 'any'}
          onValueChange={(v) => updateParam('furnishing', v === 'any' ? null : v)}
        >
          <SelectTrigger className="h-10"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            {FURNISHING_TYPES.map((f) => (
              <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
