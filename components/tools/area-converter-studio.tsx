'use client';

import { useState } from 'react';
import { Landmark, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AreaConverterStudio() {
  const [value, setValue] = useState<number>(1000);
  const [unit, setUnit] = useState<'sqft' | 'sqm' | 'cents' | 'grounds' | 'acres'>('sqft');

  // Convert everything to sq.ft first as base unit
  let sqft = value;
  if (unit === 'sqm') sqft = value * 10.7639;
  if (unit === 'cents') sqft = value * 435.6;
  if (unit === 'grounds') sqft = value * 2400;
  if (unit === 'acres') sqft = value * 43560;

  const resSqFt = sqft;
  const resSqM = sqft / 10.7639;
  const resCents = sqft / 435.6;
  const resGrounds = sqft / 2400;
  const resAcres = sqft / 43560;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-amber-500/30 p-6 md:p-10 shadow-xl space-y-8">
      <div className="text-center space-y-2">
        <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
          Tamil Nadu Real Estate Standards
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Area Unit Converter</h2>
        <p className="text-sm text-muted-foreground">
          Instantly convert land and plot dimensions across Square Feet, Square Metres, Cents, Grounds, and Acres.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 items-center">
        <div className="lg:col-span-5 space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <div>
            <label className="text-xs font-bold text-slate-900 uppercase block mb-1.5">Enter Value</label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-900 uppercase block mb-1.5">Select Input Unit</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as any)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
            >
              <option value="sqft">Square Feet (sq.ft)</option>
              <option value="sqm">Square Metres (m²)</option>
              <option value="cents">Cents</option>
              <option value="grounds">Grounds (2,400 sq.ft)</option>
              <option value="acres">Acres</option>
            </select>
          </div>
        </div>

        <div className="lg:col-span-7 bg-slate-900 text-white p-6 md:p-8 rounded-2xl shadow-xl space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <span className="text-xs uppercase tracking-wider text-amber-400 font-mono">Equivalent Conversions</span>
            <Landmark className="h-5 w-5 text-amber-400" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center text-xs">
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
              <p className="text-slate-400 uppercase text-[10px]">Square Feet</p>
              <p className="font-bold text-amber-400 text-sm mt-1">{resSqFt.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
              <p className="text-slate-400 uppercase text-[10px]">Square Metres</p>
              <p className="font-bold text-white text-sm mt-1">{resSqM.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</p>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
              <p className="text-slate-400 uppercase text-[10px]">Cents</p>
              <p className="font-bold text-white text-sm mt-1">{resCents.toFixed(2)}</p>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
              <p className="text-slate-400 uppercase text-[10px]">Grounds</p>
              <p className="font-bold text-white text-sm mt-1">{resGrounds.toFixed(2)}</p>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 col-span-2 sm:col-span-2">
              <p className="text-slate-400 uppercase text-[10px]">Acres</p>
              <p className="font-bold text-white text-sm mt-1">{resAcres.toFixed(4)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}