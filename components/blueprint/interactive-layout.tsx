'use client';

import React, { useState } from 'react';
import { 
  Compass, 
  X, 
  RotateCcw,
  Home, 
  Car, 
  Utensils, 
  BedDouble, 
  Bath, 
  Layers,
  Sliders,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface PlotData {
  id: number;
  width: number;
  depth: number;
  areaSqft: number;
  facing: 'East' | 'West' | 'North' | 'South';
  bhk: string;
  price: string;
  status: 'Available' | 'Reserved' | 'Sold';
}

interface CustomRequirements {
  bedrooms: number;
  bathrooms: number;
  hallType: 'Standard Living' | 'Grand Double-Height Living';
  parking: 'Bike Only' | '1 Car + Bikes' | '2 Cars Parking';
  hasPooja: boolean;
}

const PLOTS_DATA: Record<number, PlotData> = {
  7: { id: 7, width: 40, depth: 35, areaSqft: 1400, facing: 'East', bhk: '3 BHK Villa', price: '₹68 Lakhs', status: 'Available' },
  8: { id: 8, width: 40, depth: 30, areaSqft: 1200, facing: 'East', bhk: '3 BHK Villa', price: '₹62 Lakhs', status: 'Available' },
  9: { id: 9, width: 40, depth: 30, areaSqft: 1200, facing: 'East', bhk: '3 BHK Villa', price: '₹62 Lakhs', status: 'Available' },
  10: { id: 10, width: 40, depth: 30, areaSqft: 1200, facing: 'East', bhk: '3 BHK Villa', price: '₹62 Lakhs', status: 'Reserved' },
  11: { id: 11, width: 40, depth: 30, areaSqft: 1200, facing: 'East', bhk: '3 BHK Villa', price: '₹62 Lakhs', status: 'Available' },
  12: { id: 12, width: 40, depth: 30, areaSqft: 1200, facing: 'East', bhk: '3 BHK Villa', price: '₹62 Lakhs', status: 'Available' },
  13: { id: 13, width: 40, depth: 30, areaSqft: 1200, facing: 'East', bhk: '3 BHK Villa', price: '₹62 Lakhs', status: 'Available' },
  14: { id: 14, width: 40, depth: 30, areaSqft: 1200, facing: 'East', bhk: '3 BHK Villa', price: '₹62 Lakhs', status: 'Available' },
  15: { id: 15, width: 40, depth: 60, areaSqft: 2400, facing: 'East', bhk: '4 BHK Luxury Villa', price: '₹1.15 Cr', status: 'Available' },
  16: { id: 16, width: 42, depth: 25.6, areaSqft: 1075, facing: 'East', bhk: '2 BHK Home', price: '₹54 Lakhs', status: 'Available' },
  17: { id: 17, width: 42, depth: 38.9, areaSqft: 1633, facing: 'West', bhk: '3 BHK Villa', price: '₹75 Lakhs', status: 'Available' },
  18: { id: 18, width: 40, depth: 30, areaSqft: 1200, facing: 'West', bhk: '3 BHK Villa', price: '₹62 Lakhs', status: 'Available' },
  19: { id: 19, width: 40, depth: 30, areaSqft: 1200, facing: 'West', bhk: '3 BHK Villa', price: '₹62 Lakhs', status: 'Reserved' },
  20: { id: 20, width: 40, depth: 30, areaSqft: 1200, facing: 'West', bhk: '3 BHK Villa', price: '₹62 Lakhs', status: 'Available' },
  21: { id: 21, width: 40, depth: 30, areaSqft: 1200, facing: 'West', bhk: '3 BHK Villa', price: '₹62 Lakhs', status: 'Available' },
  22: { id: 22, width: 40, depth: 30, areaSqft: 1200, facing: 'West', bhk: '3 BHK Villa', price: '₹62 Lakhs', status: 'Available' },
  23: { id: 23, width: 40, depth: 30, areaSqft: 1200, facing: 'West', bhk: '3 BHK Villa', price: '₹62 Lakhs', status: 'Available' },
  24: { id: 24, width: 40, depth: 30, areaSqft: 1200, facing: 'West', bhk: '3 BHK Villa', price: '₹62 Lakhs', status: 'Available' },
  25: { id: 25, width: 40, depth: 30, areaSqft: 1200, facing: 'West', bhk: '3 BHK Villa', price: '₹62 Lakhs', status: 'Available' },
  26: { id: 26, width: 40, depth: 30, areaSqft: 1200, facing: 'West', bhk: '3 BHK Villa', price: '₹62 Lakhs', status: 'Available' },
  27: { id: 27, width: 40, depth: 35, areaSqft: 1400, facing: 'West', bhk: '3 BHK Villa', price: '₹68 Lakhs', status: 'Available' },
};

function CADDoor({
  x,
  y,
  width = 24,
  orientation = 'horizontal',
  swing = 'positive',
  label = 'D',
}: {
  x: number;
  y: number;
  width?: number;
  orientation?: 'horizontal' | 'vertical';
  swing?: 'positive' | 'negative';
  label?: string;
}) {
  const isH = orientation === 'horizontal';
  const isPos = swing === 'positive';
  const r = width;

  return (
    <g className="pointer-events-none select-none">
      <rect
        x={isH ? x - 1 : x - 4}
        y={isH ? y - 4 : y - 1}
        width={isH ? width + 2 : 8}
        height={isH ? 8 : width + 2}
        fill="#0f172a"
      />
      <circle cx={x} cy={y} r="2.5" fill="#38bdf8" />
      {isH ? (
        <line
          x1={x}
          y1={y}
          x2={x}
          y2={isPos ? y + r : y - r}
          stroke="#f59e0b"
          strokeWidth="2"
        />
      ) : (
        <line
          x1={x}
          y1={y}
          x2={isPos ? x + r : x - r}
          y2={y}
          stroke="#f59e0b"
          strokeWidth="2"
        />
      )}
      {isH ? (
        <path
          d={`M ${x + r} ${y} A ${r} ${r} 0 0 ${isPos ? 1 : 0} ${x} ${isPos ? y + r : y - r}`}
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1"
          strokeDasharray="2 2"
          opacity="0.85"
        />
      ) : (
        <path
          d={`M ${x} ${y + r} A ${r} ${r} 0 0 ${isPos ? 0 : 1} ${isPos ? x + r : x - r} ${y}`}
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1"
          strokeDasharray="2 2"
          opacity="0.85"
        />
      )}
      <text
        x={isH ? x + width / 2 : isPos ? x + 10 : x - 10}
        y={isH ? (isPos ? y + 14 : y - 8) : y + width / 2}
        fill="#fbbf24"
        fontSize="7"
        fontWeight="bold"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {label}
      </text>
    </g>
  );
}

function OpenArchway({
  x,
  y,
  length = 32,
  orientation = 'horizontal',
  label = 'OPEN ARCH',
}: {
  x: number;
  y: number;
  length?: number;
  orientation?: 'horizontal' | 'vertical';
  label?: string;
}) {
  const isH = orientation === 'horizontal';
  return (
    <g className="pointer-events-none select-none">
      <rect
        x={isH ? x - length / 2 : x - 4}
        y={isH ? y - 4 : y - length / 2}
        width={isH ? length : 8}
        height={isH ? 8 : length}
        fill="#0f172a"
      />
      <line
        x1={isH ? x - length / 2 : x}
        y1={isH ? y : y - length / 2}
        x2={isH ? x + length / 2 : x}
        y2={isH ? y : y + length / 2}
        stroke="#38bdf8"
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
      <text
        x={isH ? x : x + 9}
        y={isH ? y - 5 : y}
        fill="#38bdf8"
        fontSize="7"
        fontWeight="bold"
        letterSpacing="0.5"
        textAnchor="middle"
        transform={!isH ? `rotate(90 ${x + 9} ${y})` : undefined}
      >
        {label}
      </text>
    </g>
  );
}

export default function InteractiveLayoutBlueprint() {
  const [selectedPlot, setSelectedPlot] = useState<PlotData | null>(null);
  const [modalStep, setModalStep] = useState<'requirements' | 'plan'>('requirements');
  const [isLandscape, setIsLandscape] = useState(false);
  const [activeFloor, setActiveFloor] = useState<'ground' | 'first'>('ground');

  const [requirements, setRequirements] = useState<CustomRequirements>({
    bedrooms: 3,
    bathrooms: 3,
    hallType: 'Standard Living',
    parking: '1 Car + Bikes',
    hasPooja: true,
  });

  const leftPlotIds = [27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17];
  const rightPlotIds = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return '#0284c7';
      case 'Reserved':
        return '#d97706';
      default:
        return '#475569';
    }
  };

  const handlePlotClick = (plot: PlotData) => {
    setSelectedPlot(plot);
    const defaultBhk = plot.areaSqft >= 2000 ? 4 : plot.areaSqft >= 1200 ? 3 : 2;
    setRequirements({
      bedrooms: defaultBhk,
      bathrooms: defaultBhk,
      hallType: 'Standard Living',
      parking: '1 Car + Bikes',
      hasPooja: true,
    });
    setActiveFloor('ground');
    setModalStep('requirements');
  };

  // Explicit calculation for floor room counts
  const groundBedsCount = requirements.bedrooms === 4 ? 2 : 1;
  const firstBedsCount = requirements.bedrooms === 4 ? 2 : 2; // For 3 BHK: 1 Ground + 2 First = 3 BHK Total!
  const groundBathsCount = Math.min(requirements.bathrooms, requirements.bathrooms >= 3 ? 2 : requirements.bathrooms);
  const firstBathsCount = Math.max(0, requirements.bathrooms - groundBathsCount);

  return (
    <div className="w-full bg-slate-950 text-slate-100 rounded-3xl p-4 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Interactive CAD Master Plan
          </span>
          <h2 className="text-2xl font-bold mt-2 text-white">Madurai Prime Township Layout</h2>
          <p className="text-xs text-slate-400 mt-1">
            Touch any numbered plot to customize your architectural plan and preview the CAD floor blueprint.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs font-medium">
          <button
            onClick={() => setIsLandscape(!isLandscape)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 transition-all font-semibold shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {isLandscape ? 'Switch to Portrait' : 'Rotate to Landscape'}
          </button>

          <div className="flex items-center gap-1.5 pl-2">
            <span className="w-3 h-3 rounded-full bg-sky-500 ring-2 ring-sky-500/30" /> Available
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500 ring-2 ring-amber-500/30" /> Reserved
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 pl-1">
            <Compass className="w-4 h-4 text-amber-400" /> North Facing
          </div>
        </div>
      </div>

      {/* SVG Layout Architecture Map */}
      <div className="relative my-8 flex justify-center overflow-x-auto py-4">
        <svg
          viewBox={isLandscape ? '0 0 940 680' : '0 0 680 940'}
          className={`h-auto select-none drop-shadow-2xl transition-all duration-300 ${
            isLandscape ? 'w-full max-w-[920px]' : 'w-full max-w-[560px]'
          }`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform={isLandscape ? 'translate(940, 0) rotate(90)' : undefined}>
            <defs>
              <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
              </pattern>
            </defs>

            <rect width="680" height="940" fill="#0b1120" />
            <rect width="680" height="940" fill="url(#gridPattern)" />

            {/* Left Road */}
            <g>
              <rect x="40" y="20" width="100" height="875" fill="#1e293b" rx="6" />
              <line x1="90" y1="30" x2="90" y2="880" stroke="#fbbf24" strokeWidth="3" strokeDasharray="14 10" />
              <text
                x="90"
                y="460"
                fill="#64748b"
                fontSize="11"
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="central"
                transform="rotate(-90 90 460)"
              >
                40 FT WIDE TAR ROAD
              </text>
            </g>

            {/* Right Road */}
            <g>
              <rect x="540" y="20" width="100" height="875" fill="#1e293b" rx="6" />
              <line x1="590" y1="30" x2="590" y2="880" stroke="#fbbf24" strokeWidth="3" strokeDasharray="14 10" />
              <text
                x="590"
                y="460"
                fill="#64748b"
                fontSize="11"
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="central"
                transform={isLandscape ? 'rotate(-90 590 460)' : 'rotate(90 590 460)'}
              >
                40 FT WIDE TAR ROAD
              </text>
            </g>

            {/* Central Boundary */}
            <rect
              x="175"
              y="25"
              width="330"
              height="865"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="3"
              rx="10"
            />

            {/* Left Side Plots Grid */}
            {leftPlotIds.map((plotId, index) => {
              const plot = PLOTS_DATA[plotId];
              const y = 35 + index * 75;
              const height = plotId === 17 ? 95 : 72;
              const isSelected = selectedPlot?.id === plotId;
              
              const centerX = 260;
              const centerY = y + height / 2 + 4;
              const textX = isLandscape ? 212 : 196;
              const textY = isLandscape ? y + height / 2 : y + 16;
              const dotX = isLandscape ? 306 : 318;
              const dotY = isLandscape ? y + height / 2 : y + 16;

              return (
                <g
                  key={plotId}
                  onClick={() => handlePlotClick(plot)}
                  className="cursor-pointer transition-all duration-200 group"
                >
                  <rect
                    x="185"
                    y={y}
                    width="150"
                    height={height}
                    fill={isSelected ? '#0369a1' : '#0f172a'}
                    stroke={isSelected ? '#38bdf8' : '#334155'}
                    strokeWidth={isSelected ? '2.5' : '1.5'}
                    rx="6"
                    className="group-hover:stroke-amber-400 group-hover:fill-sky-950/70"
                  />
                  <text
                    x={textX}
                    y={textY}
                    fill="#94a3b8"
                    fontSize="9"
                    fontWeight="600"
                    textAnchor={isLandscape ? 'middle' : 'start'}
                    dominantBaseline={isLandscape ? 'central' : 'auto'}
                    transform={isLandscape ? `rotate(-90 ${textX} ${textY})` : undefined}
                  >
                    {plot?.depth} x {plot?.width}
                  </text>
                  <circle cx={dotX} cy={dotY} r="4" fill={getStatusColor(plot?.status || 'Available')} />
                  <g transform={isLandscape ? `rotate(-90 ${centerX} ${centerY})` : undefined}>
                    <circle cx={centerX} cy={centerY} r="16" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text
                      x={centerX}
                      y={centerY}
                      fill="#f8fafc"
                      fontSize="13"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="central"
                    >
                      {plotId}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* Right Side Plots Grid */}
            {rightPlotIds.map((plotId, index) => {
              const plot = PLOTS_DATA[plotId];
              let y = 35 + index * 75;
              let height = 72;

              if (plotId === 15) {
                height = 147;
              } else if (plotId === 16) {
                y = 35 + 10 * 75;
                height = 95;
              }

              const isSelected = selectedPlot?.id === plotId;
              const centerX = 420;
              const centerY = y + height / 2 + 4;
              const textX = isLandscape ? 372 : 356;
              const textY = isLandscape ? y + height / 2 : y + 16;
              const dotX = isLandscape ? 466 : 478;
              const dotY = isLandscape ? y + height / 2 : y + 16;

              return (
                <g
                  key={plotId}
                  onClick={() => handlePlotClick(plot)}
                  className="cursor-pointer transition-all duration-200 group"
                >
                  <rect
                    x="345"
                    y={y}
                    width="150"
                    height={height}
                    fill={isSelected ? '#0369a1' : '#0f172a'}
                    stroke={isSelected ? '#38bdf8' : '#334155'}
                    strokeWidth={isSelected ? '2.5' : '1.5'}
                    rx="6"
                    className="group-hover:stroke-amber-400 group-hover:fill-sky-950/70"
                  />
                  <text
                    x={textX}
                    y={textY}
                    fill="#94a3b8"
                    fontSize="9"
                    fontWeight="600"
                    textAnchor={isLandscape ? 'middle' : 'start'}
                    dominantBaseline={isLandscape ? 'central' : 'auto'}
                    transform={isLandscape ? `rotate(-90 ${textX} ${textY})` : undefined}
                  >
                    {plot?.width} x {plot?.depth}
                  </text>
                  <circle cx={dotX} cy={dotY} r="4" fill={getStatusColor(plot?.status || 'Available')} />
                  <g transform={isLandscape ? `rotate(-90 ${centerX} ${centerY})` : undefined}>
                    <circle cx={centerX} cy={centerY} r="16" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                    <text
                      x={centerX}
                      y={centerY}
                      fill="#f8fafc"
                      fontSize="13"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="central"
                    >
                      {plotId < 10 ? `0${plotId}` : plotId}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Interactive Modal Workflow */}
      {selectedPlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-black text-lg">
                  #{selectedPlot.id}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    Plot #{selectedPlot.id} Architectural Customizer
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                      {selectedPlot.facing} Facing Vastu
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Dimensions: {selectedPlot.depth}ft x {selectedPlot.width}ft • Built-up Area: {selectedPlot.areaSqft} sq.ft
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPlot(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* STEP 1: Requirements Form */}
            {modalStep === 'requirements' ? (
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                <div className="border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                    <Sliders className="w-4 h-4" /> Step 1 of 2: Define Your Villa Configuration
                  </div>
                  <h4 className="text-xl font-bold text-white mt-1">Tell us your home architecture preferences</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Select your desired bedroom count, bathrooms, hall style, and vehicle parking. The system loads the builder-approved architectural layout tailored to this plot.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Bedrooms */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-200 flex items-center gap-2">
                      <BedDouble className="w-4 h-4 text-sky-400" /> Bedrooms Count (BHK)
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4].map((count) => (
                        <button
                          key={count}
                          type="button"
                          onClick={() => setRequirements({ 
                            ...requirements, 
                            bedrooms: count,
                            bathrooms: count === 1 ? 1 : count
                          })}
                          className={`py-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                            requirements.bedrooms === count
                              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                              : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <span>{count} BHK</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bathrooms */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-200 flex items-center gap-2">
                      <Bath className="w-4 h-4 text-indigo-400" /> Bathrooms
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4].map((count) => (
                        <button
                          key={count}
                          type="button"
                          onClick={() => setRequirements({ ...requirements, bathrooms: count })}
                          className={`py-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                            requirements.bathrooms === count
                              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                              : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <span>{count} Bath</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Living Hall Type */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-200 flex items-center gap-2">
                      <Home className="w-4 h-4 text-emerald-400" /> Living Hall Space
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['Standard Living', 'Grand Double-Height Living'] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setRequirements({ ...requirements, hallType: type })}
                          className={`p-3 rounded-xl border text-xs font-bold transition-all text-left ${
                            requirements.hallType === type
                              ? 'bg-amber-500 text-slate-950 border-amber-400'
                              : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Parking */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-200 flex items-center gap-2">
                      <Car className="w-4 h-4 text-purple-400" /> Vehicle Parking Requirement
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Bike Only', '1 Car + Bikes', '2 Cars Parking'] as const).map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setRequirements({ ...requirements, parking: option })}
                          className={`p-2.5 rounded-xl border text-[11px] font-bold transition-all text-center ${
                            requirements.parking === option
                              ? 'bg-amber-500 text-slate-950 border-amber-400'
                              : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Vastu Pooja Room */}
                <div className="p-4 bg-slate-800/40 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold text-slate-200">Include Dedicated Pooja Room (Vastu Compliant)</h5>
                    <p className="text-[11px] text-slate-400">Allocated in the North-East / Ishanya corner zone.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setRequirements({ ...requirements, hasPooja: !requirements.hasPooja })}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                      requirements.hasPooja
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {requirements.hasPooja ? 'Included ✓' : 'Excluded'}
                  </button>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-slate-800">
                  <div className="text-xs text-slate-400">
                    Configuration matches: <span className="text-white font-bold">{requirements.bedrooms} BHK Approved Matrix</span>
                  </div>
                  <button
                    onClick={() => setModalStep('plan')}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-all shadow-lg"
                  >
                    Generate Architectural Blueprint <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* STEP 2: The Architecturally Corrected CAD Floor Blueprint Matrix */
              <div className="p-6 overflow-y-auto space-y-6">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setModalStep('requirements')}
                    className="flex items-center gap-1.5 text-xs text-amber-400 hover:underline font-semibold"
                  >
                    <ArrowLeft className="w-4 h-4" /> Change Requirements
                  </button>
                  <span className="text-xs text-slate-400">
                    Configuration: <strong className="text-white">{requirements.bedrooms} BHK Approved Plan</strong> • <strong className="text-white">{requirements.bathrooms} Bath</strong> • <strong className="text-white">{requirements.parking}</strong>
                  </span>
                </div>

                {/* Duplex Floor Switcher */}
                {requirements.bedrooms >= 3 && (
                  <div className="flex items-center justify-center gap-2">
                    <div className="bg-slate-900 border border-slate-700 p-1 rounded-xl flex gap-1 shadow-inner">
                      <button
                        type="button"
                        onClick={() => setActiveFloor('ground')}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          activeFloor === 'ground'
                            ? 'bg-amber-500 text-slate-950 shadow-md'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Ground Floor Plan ({groundBedsCount} Bed{groundBedsCount > 1 ? 's' : ''} + {groundBathsCount} Bath{groundBathsCount > 1 ? 's' : ''})
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveFloor('first')}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          activeFloor === 'first'
                            ? 'bg-amber-500 text-slate-950 shadow-md'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        First Floor Plan ({firstBedsCount} Beds + {firstBathsCount} Bath{firstBathsCount > 1 ? 's' : ''} + Balcony)
                      </button>
                    </div>
                  </div>
                )}

                {/* CAD Drawing Rendering Container */}
                <div className="bg-slate-950 border border-sky-900/60 rounded-2xl p-6 relative">
                  <div className="flex items-center justify-between text-xs text-sky-400 font-mono mb-4 border-b border-sky-950 pb-2">
                    <span className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-sky-400" /> 
                      {requirements.bedrooms === 1 
                        ? '1 BHK Executive Suite Layout' 
                        : requirements.bedrooms === 2 
                        ? '2 BHK Comfort Living Layout'
                        : `${requirements.bedrooms} BHK Duplex Villa — ${activeFloor === 'ground' ? `Ground Floor (${groundBedsCount} Bed + ${groundBathsCount} Bath)` : `First Floor (${firstBedsCount} Beds + ${firstBathsCount} Bath)`}`} (1:100 Scale)
                    </span>
                    <span className="text-emerald-400 font-semibold">Madurai DTCP & RERA Sanctioned</span>
                  </div>

                  {/* 1 BHK LAYOUT */}
                  {requirements.bedrooms === 1 && (
                    <svg viewBox="0 0 600 400" className="w-full h-auto select-none font-sans">
                      <rect x="20" y="20" width="560" height="360" fill="#0f172a" stroke="#38bdf8" strokeWidth="4" rx="4" />
                      <g>
                        <rect x="20" y="220" width="160" height="160" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
                        <text x="100" y="295" fill="#e2e8f0" fontSize="12" fontWeight="bold" textAnchor="middle">{requirements.parking.toUpperCase()}</text>
                        <text x="100" y="315" fill="#38bdf8" fontSize="10" textAnchor="middle">12&apos;0&quot; x 16&apos;0&quot;</text>
                      </g>
                      <g>
                        <rect x="180" y="300" width="120" height="80" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                        <text x="240" y="340" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">SIT-OUT &amp; ENTRY</text>
                        <text x="240" y="358" fill="#38bdf8" fontSize="10" textAnchor="middle">10&apos;0&quot; x 6&apos;0&quot;</text>
                      </g>
                      <g>
                        <rect x="440" y="300" width="140" height="80" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                        <text x="510" y="342" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">COMMON BATH</text>
                        <text x="510" y="360" fill="#38bdf8" fontSize="10" textAnchor="middle">7&apos;0&quot; x 5&apos;0&quot;</text>
                      </g>
                      <g>
                        <rect x="180" y="140" width="400" height="160" fill="#111c44" stroke="#38bdf8" strokeWidth="2" />
                        <text x="380" y="210" fill="#ffffff" fontSize="14" fontWeight="extrabold" textAnchor="middle">{requirements.hallType.toUpperCase()} &amp; DINING</text>
                        <text x="380" y="235" fill="#38bdf8" fontSize="12" textAnchor="middle">24&apos;0&quot; x 14&apos;6&quot;</text>
                      </g>
                      <g>
                        <rect x="20" y="20" width="190" height="200" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                        <text x="115" y="110" fill="#e2e8f0" fontSize="13" fontWeight="bold" textAnchor="middle">MODULAR KITCHEN</text>
                        <text x="115" y="130" fill="#38bdf8" fontSize="11" textAnchor="middle">10&apos;0&quot; x 14&apos;0&quot;</text>
                      </g>
                      {requirements.hasPooja && (
                        <g>
                          <rect x="210" y="20" width="80" height="120" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                          <text x="250" y="75" fill="#facc15" fontSize="11" fontWeight="bold" textAnchor="middle">POOJA</text>
                          <text x="250" y="95" fill="#94a3b8" fontSize="9" textAnchor="middle">5&apos; x 7&apos;</text>
                        </g>
                      )}
                      <g>
                        <rect x="290" y="20" width="190" height="120" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                        <text x="385" y="70" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">MASTER BEDROOM</text>
                        <text x="385" y="90" fill="#38bdf8" fontSize="10" textAnchor="middle">14&apos;0&quot; x 12&apos;0&quot;</text>
                      </g>
                      <g>
                        <rect x="480" y="20" width="100" height="120" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                        <text x="530" y="70" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">ATTACHED</text>
                        <text x="530" y="88" fill="#38bdf8" fontSize="9" textAnchor="middle">BATHROOM</text>
                      </g>
                      <OpenArchway x={180} y={170} length={36} orientation="vertical" label="KITCHEN ARCH" />
                      {requirements.hasPooja && <OpenArchway x={250} y={140} length={32} orientation="horizontal" label="POOJA ARCH" />}
                      <CADDoor x={200} y={300} width={28} orientation="horizontal" swing="negative" label="MAIN D1" />
                      <CADDoor x={310} y={140} width={26} orientation="horizontal" swing="negative" label="D2" />
                      <CADDoor x={480} y={35} width={22} orientation="vertical" swing="positive" label="D3" />
                      <CADDoor x={460} y={300} width={24} orientation="horizontal" swing="positive" label="D4" />
                    </svg>
                  )}

                  {/* 2 BHK LAYOUT */}
                  {requirements.bedrooms === 2 && (
                    <svg viewBox="0 0 600 400" className="w-full h-auto select-none font-sans">
                      <rect x="20" y="20" width="560" height="360" fill="#0f172a" stroke="#38bdf8" strokeWidth="4" rx="4" />
                      <g>
                        <rect x="20" y="220" width="160" height="160" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
                        <text x="100" y="295" fill="#e2e8f0" fontSize="12" fontWeight="bold" textAnchor="middle">{requirements.parking.toUpperCase()}</text>
                        <text x="100" y="315" fill="#38bdf8" fontSize="10" textAnchor="middle">11&apos;0&quot; x 16&apos;0&quot;</text>
                      </g>
                      <g>
                        <rect x="180" y="300" width="100" height="80" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                        <text x="230" y="340" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">SIT-OUT</text>
                        <text x="230" y="358" fill="#38bdf8" fontSize="10" textAnchor="middle">8&apos;0&quot; x 5&apos;0&quot;</text>
                      </g>
                      <g>
                        <rect x="180" y="140" width="220" height="160" fill="#111c44" stroke="#38bdf8" strokeWidth="2" />
                        <text x="290" y="215" fill="#ffffff" fontSize="13" fontWeight="extrabold" textAnchor="middle">{requirements.hallType.toUpperCase()}</text>
                        <text x="290" y="235" fill="#38bdf8" fontSize="11" textAnchor="middle">16&apos;0&quot; x 14&apos;6&quot;</text>
                      </g>
                      <g>
                        <rect x="20" y="20" width="200" height="200" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                        <text x="120" y="110" fill="#e2e8f0" fontSize="12" fontWeight="bold" textAnchor="middle">MODULAR KITCHEN</text>
                        <text x="120" y="130" fill="#38bdf8" fontSize="10" textAnchor="middle">&amp; DINING (10&apos; x 14&apos;)</text>
                      </g>
                      {requirements.hasPooja && (
                        <g>
                          <rect x="220" y="20" width="80" height="120" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                          <text x="260" y="75" fill="#facc15" fontSize="11" fontWeight="bold" textAnchor="middle">POOJA</text>
                          <text x="260" y="95" fill="#94a3b8" fontSize="9" textAnchor="middle">5&apos; x 7&apos;</text>
                        </g>
                      )}
                      <g>
                        <rect x="400" y="20" width="180" height="180" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                        <text x="490" y="105" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">MASTER BEDROOM (1)</text>
                        <text x="490" y="125" fill="#38bdf8" fontSize="11" textAnchor="middle">13&apos;0&quot; x 14&apos;0&quot;</text>
                      </g>
                      {requirements.bathrooms >= 2 ? (
                        <g>
                          <rect x="480" y="20" width="100" height="65" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                          <text x="530" y="50" fill="#94a3b8" fontSize="9" textAnchor="middle">ATTACHED</text>
                          <text x="530" y="65" fill="#38bdf8" fontSize="9" textAnchor="middle">BATH 1</text>
                        </g>
                      ) : (
                        <g>
                          <rect x="480" y="20" width="100" height="65" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                          <text x="530" y="55" fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="middle">WARDROBE</text>
                        </g>
                      )}
                      <g>
                        <rect x="400" y="200" width="180" height="180" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                        <text x="490" y="285" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">BEDROOM 2</text>
                        <text x="490" y="305" fill="#38bdf8" fontSize="10" textAnchor="middle">12&apos;0&quot; x 12&apos;0&quot;</text>
                      </g>
                      <g>
                        <rect x="280" y="300" width="120" height="80" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                        <text x="340" y="335" fill="#e2e8f0" fontSize="10" fontWeight="bold" textAnchor="middle">COMMON BATH</text>
                        <text x="340" y="352" fill="#38bdf8" fontSize="9" textAnchor="middle">BATH 2 (6&apos;x5&apos;)</text>
                      </g>
                      <OpenArchway x={180} y={170} length={36} orientation="vertical" label="KITCHEN ARCH" />
                      {requirements.hasPooja && <OpenArchway x={260} y={140} length={32} orientation="horizontal" label="POOJA ARCH" />}
                      <CADDoor x={200} y={300} width={28} orientation="horizontal" swing="negative" label="MAIN D1" />
                      <CADDoor x={400} y={145} width={26} orientation="vertical" swing="positive" label="D2" />
                      <CADDoor x={480} y={30} width={22} orientation="vertical" swing="positive" label={requirements.bathrooms >= 2 ? 'D3' : 'DRESS'} />
                      <CADDoor x={400} y={225} width={26} orientation="vertical" swing="positive" label="D4" />
                      <CADDoor x={330} y={300} width={22} orientation="horizontal" swing="positive" label="D5" />
                    </svg>
                  )}

                  {/* =========================================================================
                      3 BHK & 4 BHK DUPLEX (STRICT ARCHITECTURAL MATH & LAYOUT EQUALITY)
                     ========================================================================= */}
                  {requirements.bedrooms >= 3 && (
                    activeFloor === 'ground' ? (
                      /* ---------------- GROUND FLOOR (LEVEL 0) ---------------- */
                      <svg viewBox="0 0 600 400" className="w-full h-auto select-none font-sans">
                        <rect x="20" y="20" width="560" height="360" fill="#0f172a" stroke="#38bdf8" strokeWidth="4" rx="4" />

                        {/* Parking Bay */}
                        <g>
                          <rect 
                            x="20" 
                            y="220" 
                            width={requirements.parking === '2 Cars Parking' ? 180 : requirements.parking === '1 Car + Bikes' ? 160 : 130} 
                            height="160" 
                            fill="#1e293b" 
                            stroke="#38bdf8" 
                            strokeWidth="2" 
                            strokeDasharray="4 2" 
                          />
                          <text 
                            x={requirements.parking === '2 Cars Parking' ? 110 : requirements.parking === '1 Car + Bikes' ? 100 : 85} 
                            y="295" 
                            fill="#e2e8f0" 
                            fontSize="11" 
                            fontWeight="bold" 
                            textAnchor="middle"
                          >
                            {requirements.parking.toUpperCase()}
                          </text>
                          <text 
                            x={requirements.parking === '2 Cars Parking' ? 110 : requirements.parking === '1 Car + Bikes' ? 100 : 85} 
                            y="315" 
                            fill="#38bdf8" 
                            fontSize="9" 
                            textAnchor="middle"
                          >
                            {requirements.parking === '2 Cars Parking' ? "18'0\" x 16'0\"" : requirements.parking === '1 Car + Bikes' ? "12'0\" x 16'0\"" : "9'0\" x 16'0\""}
                          </text>
                        </g>

                        {/* Sit-out & Entry */}
                        <g>
                          <rect 
                            x={requirements.parking === '2 Cars Parking' ? 200 : requirements.parking === '1 Car + Bikes' ? 180 : 150} 
                            y="320" 
                            width="80" 
                            height="60" 
                            fill="#0f172a" 
                            stroke="#38bdf8" 
                            strokeWidth="2" 
                          />
                          <text 
                            x={requirements.parking === '2 Cars Parking' ? 240 : requirements.parking === '1 Car + Bikes' ? 220 : 190} 
                            y="352" 
                            fill="#e2e8f0" 
                            fontSize="10" 
                            fontWeight="bold" 
                            textAnchor="middle"
                          >
                            SIT-OUT
                          </text>
                          <text 
                            x={requirements.parking === '2 Cars Parking' ? 240 : requirements.parking === '1 Car + Bikes' ? 220 : 190} 
                            y="367" 
                            fill="#38bdf8" 
                            fontSize="8" 
                            textAnchor="middle"
                          >
                            6&apos; x 5&apos;
                          </text>
                        </g>

                        {/* Kitchen & Dining */}
                        <g>
                          <rect x="20" y="20" width="160" height="200" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                          <text x="100" y="110" fill="#e2e8f0" fontSize="12" fontWeight="bold" textAnchor="middle">KITCHEN &amp; DINING</text>
                          <text x="100" y="130" fill="#38bdf8" fontSize="10" textAnchor="middle">10&apos;0&quot; x 13&apos;0&quot;</text>
                        </g>

                        {/* Living Hall */}
                        <g>
                          <rect x="180" y="150" width="150" height="170" fill="#111c44" stroke="#38bdf8" strokeWidth="2" />
                          <text x="255" y="225" fill="#ffffff" fontSize="12" fontWeight="extrabold" textAnchor="middle">
                            {requirements.hallType === 'Grand Double-Height Living' ? 'DOUBLE-HEIGHT' : 'GROUND'} LIVING
                          </text>
                          <text x="255" y="245" fill="#38bdf8" fontSize="10" textAnchor="middle">
                            {requirements.hallType === 'Grand Double-Height Living' ? 'GRAND FOYER' : "14'0\" x 15'0\""}
                          </text>
                        </g>

                        {/* Vastu Pooja Room */}
                        {requirements.hasPooja ? (
                          <g>
                            <rect x="180" y="20" width="70" height="130" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                            <text x="215" y="80" fill="#facc15" fontSize="11" fontWeight="bold" textAnchor="middle">POOJA</text>
                            <text x="215" y="100" fill="#94a3b8" fontSize="9" textAnchor="middle">5&apos; x 7&apos;</text>
                          </g>
                        ) : (
                          <g>
                            <rect x="180" y="20" width="70" height="130" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                            <text x="215" y="80" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">STORE</text>
                          </g>
                        )}

                        {/* Central Circulation Lobby Corridor */}
                        <g>
                          <rect x="250" y="20" width="60" height="130" fill="#09132e" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
                          <text x="280" y="85" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle" transform="rotate(-90 280 85)">
                            CENTRAL PASSAGE LOBBY
                          </text>
                        </g>

                        {/* Duplex Internal Staircase */}
                        <g>
                          <rect x="330" y="210" width="45" height="110" fill="#1e293b" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 2" />
                          <text x="352" y="265" fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="middle" transform="rotate(-90 352 265)">
                            STAIRS ▲
                          </text>
                        </g>

                        {/* Master Bedroom 1 (Always exists on Ground floor) */}
                        <g>
                          <rect x="310" y="20" width="160" height="130" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                          <text x="390" y="75" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">MASTER BEDROOM 1</text>
                          <text x="390" y="93" fill="#38bdf8" fontSize="9" textAnchor="middle">11&apos;0&quot; x 13&apos;0&quot;</text>
                        </g>

                        {/* Master Bed 1 Attached Bath (Exists if total baths >= 2) */}
                        {groundBathsCount >= 2 ? (
                          <g>
                            <rect x="470" y="20" width="110" height="65" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                            <text x="525" y="47" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">MASTER BATH 1</text>
                            <text x="525" y="62" fill="#38bdf8" fontSize="8" textAnchor="middle">(ATTACHED TO BED 1)</text>
                          </g>
                        ) : (
                          <g>
                            <rect x="470" y="20" width="110" height="65" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                            <text x="525" y="47" fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="middle">WALK-IN DRESSER</text>
                            <text x="525" y="62" fill="#94a3b8" fontSize="8" textAnchor="middle">(BED 1 WARDROBE)</text>
                          </g>
                        )}

                        {/* BEDROOM 2 on GROUND FLOOR: ONLY RENDERS IF 4 BHK! In 3 BHK this becomes a Grand Dining / Study */}
                        {requirements.bedrooms === 4 ? (
                          <g>
                            <rect x="430" y="85" width="150" height="135" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                            <text x="505" y="145" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                              BEDROOM 2 (GROUND)
                            </text>
                            <text x="505" y="165" fill="#38bdf8" fontSize="9" textAnchor="middle">11&apos;0&quot; x 12&apos;0&quot;</text>
                          </g>
                        ) : (
                          <g>
                            <rect x="430" y="85" width="150" height="135" fill="#111c44" stroke="#38bdf8" strokeWidth="2" />
                            <text x="505" y="145" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                              FORMAL DINING &amp; FOYER
                            </text>
                            <text x="505" y="165" fill="#38bdf8" fontSize="9" textAnchor="middle">11&apos;0&quot; x 12&apos;0&quot; (SPACIOUS 3 BHK)</text>
                          </g>
                        )}

                        {/* Bedroom 2 Attached Bath (Only in 4 BHK with 4 Baths) */}
                        {requirements.bedrooms === 4 && requirements.bathrooms >= 4 ? (
                          <g>
                            <rect x="470" y="220" width="110" height="65" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                            <text x="525" y="247" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">ATTACHED BATH 2</text>
                            <text x="525" y="262" fill="#38bdf8" fontSize="8" textAnchor="middle">(ATTACHED TO BED 2)</text>
                          </g>
                        ) : (
                          <g>
                            <rect x="470" y="220" width="110" height="65" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                            <text x="525" y="247" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">STORE / UTILITY</text>
                            <text x="525" y="262" fill="#94a3b8" fontSize="8" textAnchor="middle">(GROUND STORAGE)</text>
                          </g>
                        )}

                        {/* Dedicated Common Bath (Off Central Lobby) */}
                        <g>
                          <rect x="375" y="210" width="95" height="75" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                          <text x="422" y="242" fill="#e2e8f0" fontSize="9" fontWeight="bold" textAnchor="middle">
                            {groundBathsCount === 1 ? 'MAIN BATHROOM' : 'COMMON BATH'}
                          </text>
                          <text x="422" y="258" fill="#38bdf8" fontSize="8" textAnchor="middle">
                            BATH (6&apos;x5&apos;)
                          </text>
                        </g>

                        {/* Rear Utility Lawn */}
                        <g>
                          <rect x="330" y="285" width="250" height="95" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                          <text x="455" y="335" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">REAR LAWN &amp; WASH UTILITY</text>
                          <text x="455" y="352" fill="#38bdf8" fontSize="8" textAnchor="middle">14&apos;0&quot; x 7&apos;0&quot;</text>
                        </g>

                        {/* ARCHWAYS */}
                        <OpenArchway x={180} y={170} length={36} orientation="vertical" label="KITCHEN ARCH" />
                        {requirements.hasPooja && <OpenArchway x={215} y={150} length={32} orientation="horizontal" label="POOJA ARCH" />}
                        <OpenArchway x={250} y={190} length={36} orientation="vertical" label="LOBBY ARCH" />

                        {/* DOORS */}
                        <CADDoor 
                          x={requirements.parking === '2 Cars Parking' ? 210 : requirements.parking === '1 Car + Bikes' ? 190 : 160} 
                          y={320} 
                          width={26} 
                          orientation="horizontal" 
                          swing="negative" 
                          label="MAIN D1" 
                        />
                        <CADDoor x={310} y={45} width={26} orientation="vertical" swing="positive" label="D2" />
                        
                        {groundBathsCount >= 2 ? (
                          <CADDoor x={470} y={35} width={22} orientation="vertical" swing="positive" label="D3" />
                        ) : (
                          <OpenArchway x={470} y={50} length={24} orientation="vertical" label="ARCH" />
                        )}

                        {requirements.bedrooms === 4 ? (
                          <CADDoor x={430} y={160} width={26} orientation="vertical" swing="positive" label="D4" />
                        ) : (
                          <OpenArchway x={430} y={150} length={32} orientation="vertical" label="DINING ARCH" />
                        )}

                        {requirements.bedrooms === 4 && requirements.bathrooms >= 4 ? (
                          <CADDoor x={485} y={220} width={22} orientation="horizontal" swing="positive" label="D5" />
                        ) : (
                          <OpenArchway x={525} y={220} length={28} orientation="horizontal" label="ARCH" />
                        )}

                        <CADDoor x={375} y={220} width={22} orientation="vertical" swing="positive" label="D6" />
                        <CADDoor x={330} y={320} width={26} orientation="horizontal" swing="positive" label="WASH D" />
                      </svg>
                    ) : (
                      /* ---------------- FIRST FLOOR (LEVEL 1) ---------------- */
                      <svg viewBox="0 0 600 400" className="w-full h-auto select-none font-sans">
                        <rect x="20" y="20" width="560" height="360" fill="#0f172a" stroke="#38bdf8" strokeWidth="4" rx="4" />

                        {/* Front Open Terrace Balcony */}
                        <g>
                          <rect x="20" y="220" width="160" height="160" fill="#022c22" stroke="#10b981" strokeWidth="2" strokeDasharray="3 3" />
                          <text x="100" y="295" fill="#a7f3d0" fontSize="12" fontWeight="bold" textAnchor="middle">FRONT TERRACE BALCONY</text>
                          <text x="100" y="315" fill="#34d399" fontSize="10" textAnchor="middle">12&apos;0&quot; x 16&apos;0&quot;</text>
                        </g>

                        {/* Family Lounge & Stair Landing Lobby */}
                        <g>
                          <rect x="180" y="150" width="195" height="230" fill="#111c44" stroke="#38bdf8" strokeWidth="2" />
                          <text x="275" y="255" fill="#ffffff" fontSize="13" fontWeight="extrabold" textAnchor="middle">UPPER FAMILY LOUNGE</text>
                          <text x="275" y="275" fill="#38bdf8" fontSize="10" textAnchor="middle">&amp; STAIR LANDING LOBBY</text>
                        </g>

                        {/* Stairs from Ground Floor */}
                        <g>
                          <rect x="330" y="210" width="45" height="110" fill="#1e293b" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 2" />
                          <text x="352" y="265" fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="middle" transform="rotate(-90 352 265)">
                            STAIRS DOWN ▼
                          </text>
                        </g>

                        {/* Bedroom 2 (in 3 BHK) or Bedroom 3 (in 4 BHK) */}
                        <g>
                          <rect x="20" y="20" width="210" height="200" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                          <text x="125" y="110" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                            {requirements.bedrooms === 3 ? 'BEDROOM 2 (UPPER SUITE)' : 'BEDROOM 3 (UPPER SUITE)'}
                          </text>
                          <text x="125" y="130" fill="#38bdf8" fontSize="10" textAnchor="middle">14&apos;0&quot; x 14&apos;0&quot;</text>
                        </g>

                        {/* Attached Bath on First Floor (Exists if firstBathsCount >= 1) */}
                        {firstBathsCount >= 1 ? (
                          <g>
                            <rect x="230" y="20" width="90" height="130" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                            <text x="275" y="75" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                              {firstBathsCount === 1 ? 'UPPER BATH' : 'ATTACHED BATH'}
                            </text>
                            <text x="275" y="92" fill="#38bdf8" fontSize="9" textAnchor="middle">BATH (7&apos;x5&apos;)</text>
                          </g>
                        ) : (
                          <g>
                            <rect x="230" y="20" width="90" height="130" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                            <text x="275" y="75" fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="middle">STUDY</text>
                            <text x="275" y="92" fill="#94a3b8" fontSize="8" textAnchor="middle">LOUNGE</text>
                          </g>
                        )}

                        {/* Bedroom 3 (in 3 BHK) or Bedroom 4 (in 4 BHK) - GUARANTEED BEDROOM */}
                        <g>
                          <rect x="320" y="20" width="260" height="130" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                          <text x="450" y="75" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                            {requirements.bedrooms === 3 ? 'BEDROOM 3 (UPPER GUEST)' : 'BEDROOM 4 (UPPER GUEST)'}
                          </text>
                          <text x="450" y="95" fill="#38bdf8" fontSize="10" textAnchor="middle">16&apos;0&quot; x 11&apos;0&quot;</text>
                        </g>

                        {/* Second Bath on First Floor (Only if firstBathsCount >= 2) */}
                        {firstBathsCount >= 2 ? (
                          <g>
                            <rect x="470" y="150" width="110" height="75" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                            <text x="525" y="185" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">ATTACHED BATH 4</text>
                            <text x="525" y="202" fill="#38bdf8" fontSize="8" textAnchor="middle">(FOR BEDROOM 4)</text>
                          </g>
                        ) : (
                          <g>
                            <rect x="470" y="150" width="110" height="75" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                            <text x="525" y="185" fill="#94a3b8" fontSize="9" fontWeight="bold" textAnchor="middle">WALK-IN CLOSET</text>
                            <text x="525" y="202" fill="#64748b" fontSize="8" textAnchor="middle">(WARDROBE)</text>
                          </g>
                        )}

                        {/* Rear Balcony */}
                        <g>
                          <rect x="375" y="225" width="205" height="155" fill="#022c22" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
                          <text x="475" y="305" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">REAR SIT-OUT BALCONY</text>
                          <text x="475" y="325" fill="#34d399" fontSize="9" textAnchor="middle">14&apos;0&quot; x 11&apos;0&quot;</text>
                        </g>

                        {/* FIRST FLOOR DOORS */}
                        <CADDoor x={180} y={260} width={26} orientation="vertical" swing="negative" label="BALCONY D" />
                        <CADDoor x={190} y={220} width={26} orientation="horizontal" swing="negative" label="D1" />
                        
                        {firstBathsCount >= 1 ? (
                          <CADDoor x={230} y={40} width={22} orientation="vertical" swing="positive" label="D2" />
                        ) : (
                          <OpenArchway x={230} y={50} length={22} orientation="vertical" label="ARCH" />
                        )}

                        <CADDoor x={330} y={150} width={26} orientation="horizontal" swing="negative" label="D3" />

                        {firstBathsCount >= 2 ? (
                          <CADDoor x={485} y={150} width={22} orientation="horizontal" swing="positive" label="D4" />
                        ) : (
                          <OpenArchway x={515} y={150} length={24} orientation="horizontal" label="ARCH" />
                        )}

                        <CADDoor x={375} y={320} width={26} orientation="vertical" swing="positive" label="REAR D" />
                      </svg>
                    )
                  )}
                </div>

                {/* Real Estate Specifications Summary Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-center gap-2.5">
                    <Home className="w-4 h-4 text-amber-400" />
                    <div>
                      <p className="text-slate-400">Living Hall</p>
                      <p className="font-bold text-white">{requirements.hallType}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-center gap-2.5">
                    <Utensils className="w-4 h-4 text-emerald-400" />
                    <div>
                      <p className="text-slate-400">Kitchen & Dining</p>
                      <p className="font-bold text-white">Modular + Utility</p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-center gap-2.5">
                    <BedDouble className="w-4 h-4 text-sky-400" />
                    <div>
                      <p className="text-slate-400">Bedrooms</p>
                      <p className="font-bold text-white">{requirements.bedrooms} Dedicated BHK</p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-center gap-2.5">
                    <Car className="w-4 h-4 text-purple-400" />
                    <div>
                      <p className="text-slate-400">Parking Space</p>
                      <p className="font-bold text-white">{requirements.parking}</p>
                    </div>
                  </div>
                </div>

                {/* Booking Call to Action */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
                  <div>
                    <span className="text-xs text-slate-400">Estimated Villa Investment</span>
                    <div className="text-2xl font-extrabold text-amber-400">{selectedPlot.price}</div>
                  </div>

                  <div className="flex gap-2 w-full sm:w-auto">
                    {(() => {
                      const autoMessage = `Need to book the site visit for Plot ${selectedPlot.id}`;
                      return (
                        <a
                          href={`/contact?plot=${selectedPlot.id}&bhk=${requirements.bedrooms}&bath=${requirements.bathrooms}&parking=${encodeURIComponent(requirements.parking)}&message=${encodeURIComponent(autoMessage)}`}
                          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs text-center transition-all shadow-lg"
                        >
                          Book Site Visit for {requirements.bedrooms} BHK (Plot #{selectedPlot.id})
                        </a>
                      );
                    })()}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}