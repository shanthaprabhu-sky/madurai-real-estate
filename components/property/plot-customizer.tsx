'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Compass, CheckCircle2, Home, Maximize2, Calculator } from 'lucide-react';
import { formatPrice } from '@/lib/constants';

const PLOT_SIZES = [
  { id: '1200', name: '1,200 sq.ft (30x40)', basePrice: 2400000 },
  { id: '1500', name: '1,500 sq.ft (30x50)', basePrice: 3000000 },
  { id: '2400', name: '2,400 sq.ft (40x60)', basePrice: 4800000 },
];

const CONFIGURATIONS = [
  { id: '1bhk', name: '1 BHK Cozy Villa', builtUp: '650 sq.ft', multiplier: 1.0, desc: 'Ideal for small families or retirement living.' },
  { id: '2bhk', name: '2 BHK Modern Villa', builtUp: '1,100 sq.ft', multiplier: 1.4, desc: 'Perfect balanced space with open courtyard & car parking.' },
  { id: '3bhk', name: '3 BHK Luxury Duplex', builtUp: '1,750 sq.ft', multiplier: 1.9, desc: 'Grand double-height living, pooja room, and terrace.' },
];

export function PlotAndHouseCustomizer() {
  const [selectedPlot, setSelectedPlot] = useState(PLOT_SIZES[1]);
  const [selectedConfig, setSelectedConfig] = useState(CONFIGURATIONS[1]);
  const [facing, setFacing] = useState('East Facing (Vastu Compliant)');

  const estimatedTotal = Math.round(selectedPlot.basePrice * selectedConfig.multiplier);

  return (
    <div className="rounded-2xl border border-amber-500/30 bg-card p-6 md:p-8 shadow-md space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
          Interactive AutoCAD & Blueprint Visualizer
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Design Your Land & Villa Layout</h2>
        <p className="text-sm text-muted-foreground">
          Select your plot dimensions and choose a 1, 2, or 3 BHK floor configuration to instantly visualize your future home blueprint.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Selection Controls */}
        <div className="space-y-6">
          {/* Step 1: Select Land Size */}
          <div>
            <label className="text-sm font-semibold text-slate-900 block mb-3">
              1. Select Land Space (Plot Area)
            </label>
            <div className="grid grid-cols-3 gap-3">
              {PLOT_SIZES.map((plot) => (
                <button
                  key={plot.id}
                  onClick={() => setSelectedPlot(plot)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedPlot.id === plot.id
                      ? 'border-amber-600 bg-amber-50/50 shadow-sm ring-1 ring-amber-600'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <p className="text-xs font-bold text-slate-900">{plot.name.split(' ')[0]} sq.ft</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{plot.name.split(' ')[1]}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Select BHK Configuration */}
          <div>
            <label className="text-sm font-semibold text-slate-900 block mb-3">
              2. Select House Floor Plan Configuration
            </label>
            <div className="space-y-3">
              {CONFIGURATIONS.map((config) => (
                <button
                  key={config.id}
                  onClick={() => setSelectedConfig(config)}
                  className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                    selectedConfig.id === config.id
                      ? 'border-amber-600 bg-amber-50/50 shadow-sm ring-1 ring-amber-600'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{config.name}</span>
                      <Badge variant="outline" className="text-xs text-amber-700 border-amber-300">
                        {config.builtUp}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{config.desc}</p>
                  </div>
                  {selectedConfig.id === config.id && (
                    <CheckCircle2 className="h-5 w-5 text-amber-600 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Vastu Orientation */}
          <div>
            <label className="text-sm font-semibold text-slate-900 block mb-3">
              3. Vastu Plot Orientation
            </label>
            <div className="flex gap-3">
              {['East Facing', 'North Facing', 'West Facing'].map((dir) => (
                <button
                  key={dir}
                  onClick={() => setFacing(`${dir} (Vastu Compliant)`)}
                  className={`px-4 py-2 rounded-lg border text-xs font-semibold transition-all ${
                    facing.includes(dir)
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {dir}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Blueprint & Calculation Preview */}
        <div className="rounded-2xl border border-slate-200 bg-slate-900 text-white p-6 flex flex-col justify-between shadow-xl">
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-amber-400 font-semibold">Live AutoCAD Blueprint Preview</p>
                <h3 className="text-xl font-bold mt-0.5">{selectedConfig.name} on {selectedPlot.name}</h3>
              </div>
              <Compass className="h-8 w-8 text-amber-400 animate-pulse" />
            </div>

            {/* Simulated Architectural Floor Plan Blueprint Box */}
            <div className="relative aspect-[4/3] rounded-xl border border-dashed border-slate-700 bg-slate-950 p-4 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="flex justify-between text-xs text-slate-400 z-10">
                <span>Plot: {selectedPlot.name}</span>
                <span>Orientation: {facing}</span>
              </div>

              {/* Visual Mock Blueprint Layout */}
              <div className="my-auto z-10 flex flex-col items-center justify-center space-y-2 border border-amber-500/40 rounded-lg p-6 bg-slate-900/80">
                <Home className="h-12 w-12 text-amber-400" />
                <p className="text-sm font-bold text-white">{selectedConfig.name} Built-up: {selectedConfig.builtUp}</p>
                <p className="text-xs text-slate-300 text-center">Includes setback yard, car parking space & Vastu entrance.</p>
              </div>

              <div className="flex justify-between text-[11px] text-slate-400 z-10">
                <span>Status: DTCP & RERA Approved</span>
                <span>Scale: 1:100 CAD Vector</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs text-slate-400">Estimated Total Package (Land + Construction)</p>
              <p className="text-2xl font-extrabold text-amber-400">{formatPrice(estimatedTotal)}</p>
            </div>
            <Button className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6" asChild>
              <a href="/contact">Book This Layout Blueprint</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}