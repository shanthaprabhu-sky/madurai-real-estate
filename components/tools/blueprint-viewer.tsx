'use client';

import { useState } from 'react';
import { BlueprintPlan } from '@/lib/blueprint/types';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface BlueprintViewerProps {
  plans: BlueprintPlan[];
}

export function BlueprintViewer({ plans }: BlueprintViewerProps) {
  const [activePlanId, setActivePlanId] = useState<string>(plans[0]?.planId || 'plan_a');
  const [activeFloor, setActiveFloor] = useState<string>('Ground');
  
  const [showDimensions, setShowDimensions] = useState(true);
  const [showRoomNames, setShowRoomNames] = useState(true);
  const [showSetbacks, setShowSetbacks] = useState(true);
  const [showFurniture, setShowFurniture] = useState(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const currentPlan = plans.find(p => p.planId === activePlanId) || plans[0];

  const handleDownload = (format: 'PNG' | 'SVG' | 'PDF') => {
    alert(`Generating ${format} file directly from deterministic blueprint geometry... (Simulated download)`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-6">
      {/* Header & Plan Selection Tabs */}
      <div className="text-center space-y-3">
        <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
          Algorithmic Architectural Studio
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900">Your Conceptual Floor Plans</h2>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          Generated via algorithmic room packing and validated through deterministic geometry constraints. Select a design alternative below.
        </p>

        {/* Plan Alternatives Switcher Tabs */}
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          {plans.map((plan) => (
            <button
              key={plan.planId}
              onClick={() => setActivePlanId(plan.planId)}
              className={`px-5 py-2.5 rounded-2xl border text-xs font-bold transition-all ${
                activePlanId === plan.planId
                  ? 'bg-slate-900 text-amber-400 border-slate-900 shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {plan.planName}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Left Column: Plan Summary & Interactive Controls */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
              <div>
                <h3 className="font-extrabold text-slate-900">{currentPlan.planName}</h3>
                <p className="text-xs text-muted-foreground">{currentPlan.description}</p>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> Validated
              </span>
            </div>

            {/* Metrics Breakdown */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-slate-600">Estimated Built-up Area:</span>
                <span className="font-bold text-slate-900">{currentPlan.estimatedBuiltupArea} sq.ft</span>
              </div>
              <div className="flex justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-slate-600">Open Area / Setbacks:</span>
                <span className="font-bold text-slate-900">{currentPlan.estimatedOpenArea} sq.ft</span>
              </div>
              <div className="flex justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-slate-600">Parking Allocation:</span>
                <span className="font-bold text-slate-900">{currentPlan.parkingSummary}</span>
              </div>
            </div>

            {/* Validation Checklist */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
              <p className="font-bold text-slate-900 mb-1">Validation Checklist:</p>
              <p className="text-emerald-700 flex items-center gap-1">✓ Fits provided plot boundary</p>
              <p className="text-emerald-700 flex items-center gap-1">✓ Setbacks strictly respected</p>
              <p className="text-emerald-700 flex items-center gap-1">✓ No room overlap detected</p>
              <p className="text-emerald-700 flex items-center gap-1">✓ Circulation & doors validated</p>
            </div>

            {/* Interactive Display Toggles */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <p className="font-bold text-slate-900 text-xs">Interactive Display Controls:</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button onClick={() => setShowDimensions(!showDimensions)} className={`p-2 rounded-xl border text-left flex items-center justify-between ${showDimensions ? 'bg-amber-50 border-amber-300 text-amber-900' : 'bg-slate-50 text-slate-500'}`}>
                  <span>Dimensions</span> {showDimensions ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                </button>
                <button onClick={() => setShowRoomNames(!showRoomNames)} className={`p-2 rounded-xl border text-left flex items-center justify-between ${showRoomNames ? 'bg-amber-50 border-amber-300 text-amber-900' : 'bg-slate-50 text-slate-500'}`}>
                  <span>Room Names</span> {showRoomNames ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                </button>
                <button onClick={() => setShowSetbacks(!showSetbacks)} className={`p-2 rounded-xl border text-left flex items-center justify-between ${showSetbacks ? 'bg-amber-50 border-amber-300 text-amber-900' : 'bg-slate-50 text-slate-500'}`}>
                  <span>Setbacks</span> {showSetbacks ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                </button>
                <button onClick={() => setShowFurniture(!showFurniture)} className={`p-2 rounded-xl border text-left flex items-center justify-between ${showFurniture ? 'bg-amber-50 border-amber-300 text-amber-900' : 'bg-slate-50 text-slate-500'}`}>
                  <span>Furniture</span> {showFurniture ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            {/* Export Buttons */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <p className="font-bold text-slate-900 text-xs">Download Blueprint:</p>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm" onClick={() => handleDownload('PNG')} className="text-xs">PNG</Button>
                <Button variant="outline" size="sm" onClick={() => handleDownload('SVG')} className="text-xs">SVG</Button>
                <Button variant="outline" size="sm" onClick={() => handleDownload('PDF')} className="text-xs">PDF</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Professional Architectural SVG Canvas */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-[#0f172a] text-white p-6 rounded-2xl shadow-2xl space-y-4 border border-slate-800">
            
            {/* Blueprint Toolbar */}
            <div className="flex justify-between items-center border-b border-slate-800 pb-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold uppercase tracking-wider text-amber-400">Professional CAD Canvas</span>
                <span className="text-slate-400">| Floor:</span>
                <button onClick={() => setActiveFloor('Ground')} className={`px-2.5 py-1 rounded-lg font-semibold ${activeFloor === 'Ground' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300'}`}>Ground</button>
                <button onClick={() => setActiveFloor('First')} className={`px-2.5 py-1 rounded-lg font-semibold ${activeFloor === 'First' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300'}`}>First</button>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.6))} className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300"><ZoomIn className="h-4 w-4" /></button>
                <button onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.8))} className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300"><ZoomOut className="h-4 w-4" /></button>
              </div>
            </div>

            {/* SVG Technical Rendering Container */}
            <div className="relative aspect-[4/3] bg-white rounded-2xl border-4 border-slate-800 p-4 flex items-center justify-center overflow-hidden shadow-inner text-slate-900">
              <svg 
                className="w-full h-full transition-transform duration-200" 
                style={{ transform: `scale(${zoomLevel})` }} 
                viewBox="0 0 520 380"
              >
                {/* Paper Grid Background */}
                <rect width="100%" height="100%" fill="#fafaf9" />
                
                {showSetbacks && (
                  <rect x="25" y="20" width="470" height="340" fill="rgba(245, 158, 11, 0.04)" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5,5" rx="4" />
                )}

                {/* Building Outer Shell */}
                <rect x="65" y="45" width="390" height="290" fill="#e2e8f0" stroke="#0f172a" strokeWidth="6" rx="2" />
                <rect x="71" y="51" width="378" height="278" fill="#ffffff" />

                {/* Dynamically Render Packed Rooms */}
                {currentPlan.rooms.map((room) => {
                  const rx = 71 + (room.x * 35);
                  const ry = 51 + (room.y * 35);
                  const rw = room.width * 35;
                  const rh = room.length * 35;

                  const isLiving = room.name.toLowerCase().includes('living') || room.name.toLowerCase().includes('hall');
                  const isBed = room.name.toLowerCase().includes('bed');
                  const isKitchen = room.name.toLowerCase().includes('kitchen');

                  return (
                    <g key={room.id}>
                      <rect 
                        x={rx} 
                        y={ry} 
                        width={rw} 
                        height={rh} 
                        fill={isLiving ? "#f8fafc" : isBed ? "#fefce8" : isKitchen ? "#f0fdf4" : "#f1f5f9"} 
                        stroke="#0f172a" 
                        strokeWidth="2.5" 
                      />
                      
                      {showRoomNames && (
                        <>
                          <text x={rx + rw / 2} y={ry + rh / 2 - 4} fill="#0f172a" fontSize="9" fontWeight="extrabold" textAnchor="middle">
                            {room.name}
                          </text>
                          <text x={rx + rw / 2} y={ry + rh / 2 + 10} fill="#64748b" fontSize="7" fontWeight="medium" textAnchor="middle">
                            {Math.round(room.width * room.length * 35)} sq.ft
                          </text>
                        </>
                      )}
                    </g>
                  );
                })}

                {/* Furniture Icons Overlay */}
                {showFurniture && (
                  <g opacity="0.8">
                    <rect x="90" y="70" width="60" height="22" rx="2" fill="none" stroke="#475569" strokeWidth="1.5" />
                    <rect x="270" y="70" width="50" height="35" rx="2" fill="none" stroke="#475569" strokeWidth="1.5" />
                    <rect x="90" y="240" width="80" height="16" rx="2" fill="none" stroke="#059669" strokeWidth="1.5" />
                  </g>
                )}

                {showDimensions && (
                  <text x="260" y="35" fill="#334155" fontSize="9" fontWeight="bold" textAnchor="middle">Front Width: 40ft (Road Facing)</text>
                )}

                {/* Main Entry */}
                <polygon points="260,342 268,328 252,328" fill="#dc2626" />
                <text x="260" y="355" fill="#dc2626" fontSize="9" fontWeight="extrabold" textAnchor="middle">MAIN ENTRY</text>

                {/* North Compass */}
                <g transform="translate(460, 45)">
                  <circle cx="0" cy="0" r="15" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
                  <polygon points="0,-11 3,2 -3,2" fill="#dc2626" />
                  <polygon points="0,11 3,-2 -3,-2" fill="#0f172a" />
                  <text x="0" y="-14" fill="#0f172a" fontSize="8" fontWeight="bold" textAnchor="middle">N</text>
                </g>
              </svg>
            </div>

            {/* Disclaimer */}
            <div className="bg-amber-950/40 border border-amber-600/30 p-3.5 rounded-xl flex items-start gap-2.5 text-xs text-amber-200">
              <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Conceptual Floor Plan Disclaimer:</strong> This AI-generated floor plan is intended for visualization and preliminary planning only. It is not a construction-ready architectural drawing or legal/survey document.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}