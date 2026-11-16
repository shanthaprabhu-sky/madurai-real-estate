'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const UNITS = [
  { value: 'sqft', label: 'Square Feet (sq.ft)', factor: 1 },
  { value: 'sqm', label: 'Square Metres (sq.m)', factor: 10.7639 },
  { value: 'cents', label: 'Cents', factor: 435.6 },
  { value: 'acres', label: 'Acres', factor: 43560 },
  { value: 'grounds', label: 'Grounds', factor: 2400 },
  { value: 'hectares', label: 'Hectares', factor: 107639 },
];

export function AreaConverter() {
  const [value, setValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('cents');

  const conversions = useMemo(() => {
    const numValue = parseFloat(value) || 0;
    const fromFactor = UNITS.find((u) => u.value === fromUnit)?.factor ?? 1;
    const inSqft = numValue * fromFactor;
    return UNITS.map((unit) => ({
      ...unit,
      result: inSqft / unit.factor,
    }));
  }, [value, fromUnit]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Unit Converter</CardTitle>
        <CardDescription>Convert between sq.ft, cents, acres, sq.m, and grounds</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="area-value">Value</Label>
            <Input id="area-value" type="number" value={value} onChange={(e) => setValue(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label>From Unit</Label>
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                {UNITS.map((u) => (
                  <SelectItem key={u.value} value={u.value}>{u.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          {conversions.map((conv) => (
            <div key={conv.value} className="flex items-center justify-between rounded-md border px-3 py-2">
              <span className="text-sm text-muted-foreground">{conv.label}</span>
              <span className="text-sm font-semibold">
                {conv.result.toLocaleString('en-IN', { maximumFractionDigits: 4 })}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
