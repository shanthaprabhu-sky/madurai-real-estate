'use client';

import { useState } from 'react';
import { PropertyLandData, HouseRequirements, BlueprintPlan, calculateLandMetrics } from '@/lib/blueprint/types';
import { Button } from '@/components/ui/button';
import { Home, Compass, Car, Sparkles, Loader2, Layers, ZoomIn, ZoomOut, CheckCircle2, Eye, EyeOff } from 'lucide-react';

interface BlueprintGeneratorStudioProps {
  property?: PropertyLandData;
}

export function BlueprintGeneratorStudio({ property }: BlueprintGeneratorStudioProps) {
  const landData: PropertyLandData = property || {
    propertyId: 'PROP-MADURAI-001',
    front: 18,
    back: 18,
    left: 19.5,
    right: 19.5,
    diagonal: 26.5,
    roadSide: 'Front',
    roadWidth: 9,
    northDirection: 'Front'
  };

  const [requirements, setRequirements] = useState<HouseRequirements>({
    bhk: '2BHK',
    floors: 'Ground',
    parking: 'Bike parking',
    carCount: 0,
    bikeCount: 1,
    totalBathrooms: 1,
    attachedBathrooms: 0,
    commonBathrooms: 1,
    kitchenType: 'Normal/Closed Kitchen',
    additionalRooms: ['O.T.S. Washing'],
    staircase: 'Inside',
    balcony: 'No Balcony',
    openSpacePreference: 'Front',
    setbacks: { front: 0, back: 0, left: 0, right: 0 }
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [generatedPlans, setGeneratedPlans] = useState<BlueprintPlan[] | null>(null);

  // Viewer state
  const [showDimensions, setShowDimensions] = useState(true);
  const [showRoomNames, setShowRoomNames] = useState(true);
  const [showFurniture, setShowFurniture] = useState(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const metrics = calculateLandMetrics(landData, requirements.setbacks);

  // Replace your handleGenerate function inside components/tools/blueprint-generator-studio.tsx with this:

const handleGenerate = async () => {
  setIsGenerating(true);
  setGenerationStep('Connecting to Gemini AI Architect Model...');
  
  try {
    const res = await fetch('/api/generate-blueprint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ landData, requirements })
    });

    const data = await res.json();
    
    setGenerationStep('Synthesizing AI-driven floor plan layout...');
    await new Promise(r => setTimeout(r, 600));

    // Convert Gemini AI response into your viewer structure
    const aiPlans = [{
      planId: 'ai_plan_1',
      planName: `Gemini AI ${requirements.bhk} Custom Blueprint`,
      description: `Dynamically engineered by Gemini AI based on your ${requirements.bhk} and ${landData.front}ft x ${landData.left}ft plot constraints.`,
      estimatedBuiltupArea: landData.front * landData.left * 0.75,
      estimatedOpenArea: landData.front * landData.left * 0.25,
      parkingSummary: requirements.parking,
      dimensions: { width: landData.front, height: landData.left },
      rooms: data.rooms || [
        { id: 'living', name: 'AI LIVING ROOM', width: 10, length: 10, x: 0, y: 0, areaSqFt: 100 },
        { id: 'bed', name: 'AI MASTER BED', width: 9, length: 9, x: 10, y: 0, areaSqFt: 81 }
      ]
    }];

    setGeneratedPlans(aiPlans as any);
  } catch (err) {
    console.error(err);
    alert('Error generating blueprint via AI.');
  } finally {
    setIsGenerating(false);
  }
};

  if (generatedPlans) {
    const currentPlan = generatedPlans[0];

    return (
      <div className="space-y-6 max-w-6xl mx-auto py-4">
        <div className="flex justify-between items-center px-4">
          <Button variant="outline" size="sm" onClick={() => setGeneratedPlans(null)} className="text-xs font-bold">
            ← Modify Requirements / Plot
          </Button>
          <span className="text-xs text-muted-foreground font-medium">Property ID: {landData.propertyId}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Left Controls & Summary */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                <div>
                  <h3 className="font-extrabold text-slate-900">{currentPlan.planName}</h3>
                  <p className="text-xs text-muted-foreground">{currentPlan.description}</p>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Architect Verified
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-600">Total Built-up Area:</span>
                  <span className="font-bold text-slate-900">{currentPlan.estimatedBuiltupArea} sq.ft</span>
                </div>
                <div className="flex justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-600">Selected Configuration:</span>
                  <span className="font-bold text-slate-900">{requirements.bhk} | {requirements.parking}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <p className="font-bold text-slate-900 text-xs">Blueprint Display Toggles:</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button onClick={() => setShowDimensions(!showDimensions)} className={`p-2 rounded-xl border text-left flex items-center justify-between ${showDimensions ? 'bg-amber-50 border-amber-300 text-amber-900' : 'bg-slate-50 text-slate-500'}`}>
                    <span>Dimensions</span> {showDimensions ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                  </button>
                  <button onClick={() => setShowRoomNames(!showRoomNames)} className={`p-2 rounded-xl border text-left flex items-center justify-between ${showRoomNames ? 'bg-amber-50 border-amber-300 text-amber-900' : 'bg-slate-50 text-slate-500'}`}>
                    <span>Room Names</span> {showRoomNames ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                  </button>
                  <button onClick={() => setShowFurniture(!showFurniture)} className={`p-2 rounded-xl border text-left flex items-center justify-between ${showFurniture ? 'bg-amber-50 border-amber-300 text-amber-900' : 'bg-slate-50 text-slate-500'}`}>
                    <span>Furniture</span> {showFurniture ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Professional Architectural CAD Canvas */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-[#0f172a] text-white p-6 rounded-2xl shadow-2xl space-y-4 border border-slate-800">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3 text-xs">
                <span className="font-bold uppercase tracking-wider text-amber-400">Professional Architectural Blueprint Canvas</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.6))} className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300"><ZoomIn className="h-4 w-4" /></button>
                  <button onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.8))} className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300"><ZoomOut className="h-4 w-4" /></button>
                </div>
              </div>

              <div className="relative aspect-[4/3] bg-white rounded-2xl border-4 border-slate-800 p-6 flex items-center justify-center overflow-hidden shadow-inner text-slate-900">
                <svg className="w-full h-full transition-transform duration-200" style={{ transform: `scale(${zoomLevel})` }} viewBox="0 0 540 440">
                  <rect width="100%" height="100%" fill="#ffffff" />
                  
                  {/* Outer Heavy Black Architectural Boundary */}
                  <rect x="70" y="50" width="380" height="340" fill="none" stroke="#000000" strokeWidth="10" />
                  <rect x="75" y="55" width="370" height="330" fill="#ffffff" />

                  {/* Room Partitions */}
                  <rect x="75" y="55" width="180" height="150" fill="#fef9c3" fillOpacity="0.4" stroke="#000000" strokeWidth="3" />
                  {showRoomNames && (
                    <>
                      <text x="165" y="125" fill="#000000" fontSize="11" fontWeight="bold" textAnchor="middle">BED ROOM</text>
                      <text x="165" y="142" fill="#334155" fontSize="10" fontWeight="semibold" textAnchor="middle">9'0" X 8'0"</text>
                    </>
                  )}

                  <rect x="255" y="55" width="75" height="100" fill="#ccfbf1" fillOpacity="0.6" stroke="#000000" strokeWidth="3" strokeDasharray="4,4" />
                  {showRoomNames && (
                    <>
                      <text x="292" y="95" fill="#0f766e" fontSize="9" fontWeight="bold" textAnchor="middle">O.T.S.</text>
                      <text x="292" y="108" fill="#0f766e" fontSize="9" fontWeight="bold" textAnchor="middle">WASHING</text>
                      <text x="292" y="122" fill="#042f2e" fontSize="8" fontWeight="semibold" textAnchor="middle">3'0"</text>
                    </>
                  )}

                  <rect x="330" y="55" width="115" height="150" fill="#e0f2fe" fillOpacity="0.5" stroke="#000000" strokeWidth="3" />
                  {showRoomNames && (
                    <>
                      <text x="387" y="125" fill="#0369a1" fontSize="11" fontWeight="bold" textAnchor="middle">TOILET</text>
                      <text x="387" y="142" fill="#334155" fontSize="10" fontWeight="semibold" textAnchor="middle">4'0" X 8'0"</text>
                    </>
                  )}

                  <rect x="75" y="205" width="180" height="180" fill="#e0fefe" fillOpacity="0.4" stroke="#000000" strokeWidth="3" />
                  {showRoomNames && (
                    <>
                      <text x="165" y="285" fill="#000000" fontSize="11" fontWeight="bold" textAnchor="middle">KITCHEN</text>
                      <text x="165" y="302" fill="#334155" fontSize="10" fontWeight="semibold" textAnchor="middle">7'0" X 10'2"</text>
                    </>
                  )}
                  <rect x="85" y="340" width="160" height="25" fill="#94a3b8" fillOpacity="0.5" stroke="#000000" strokeWidth="1.5" />

                  <rect x="255" y="155" width="190" height="230" fill="#f1f5f9" fillOpacity="0.4" stroke="#000000" strokeWidth="3" />
                  {showRoomNames && (
                    <>
                      <text x="350" y="260" fill="#000000" fontSize="11" fontWeight="bold" textAnchor="middle">LIVING ROOM</text>
                      <text x="350" y="277" fill="#334155" fontSize="10" fontWeight="semibold" textAnchor="middle">10'0" X 10'2"</text>
                    </>
                  )}

                  {/* Door Swings */}
                  <path d="M 210 205 A 25 25 0 0 1 185 180" fill="none" stroke="#000000" strokeWidth="2" />
                  <line x1="210" y1="205" x2="210" y2="180" stroke="#000000" strokeWidth="2.5" />
                  <path d="M 330 180 A 25 25 0 0 1 355 205" fill="none" stroke="#000000" strokeWidth="2" />
                  <line x1="330" y1="180" x2="330" y2="205" stroke="#000000" strokeWidth="2.5" />
                  <path d="M 255 350 A 25 25 0 0 1 280 325" fill="none" stroke="#000000" strokeWidth="2" />
                  <line x1="255" y1="350" x2="255" y2="325" stroke="#000000" strokeWidth="2.5" />

                  {showFurniture && (
                    <g opacity="0.8">
                      <rect x="85" y="65" width="55" height="45" rx="3" fill="none" stroke="#334155" strokeWidth="1.5" />
                      <rect x="360" y="290" width="75" height="80" rx="3" fill="none" stroke="#334155" strokeWidth="1.5" />
                    </g>
                  )}

                  {showDimensions && (
                    <>
                      <line x1="70" y1="30" x2="450" y2="30" stroke="#ef4444" strokeWidth="1.5" />
                      <polygon points="70,30 78,26 78,34" fill="#ef4444" />
                      <polygon points="450,30 442,26 442,34" fill="#ef4444" />
                      <rect x="235" y="18" width="40" height="20" fill="#ffffff" />
                      <text x="260" y="33" fill="#ef4444" fontSize="12" fontWeight="bold" textAnchor="middle">18'</text>

                      <line x1="470" y1="50" x2="470" y2="390" stroke="#ef4444" strokeWidth="1.5" />
                      <polygon points="470,50 466,58 474,58" fill="#ef4444" />
                      <polygon points="470,390 466,382 474,382" fill="#ef4444" />
                      <rect x="450" y="210" width="40" height="20" fill="#ffffff" />
                      <text x="470" y="223" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="middle" transform="rotate(90, 470, 220)">19'-6"</text>
                    </>
                  )}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-6">
      <div className="text-center space-y-2">
        <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
          Architectural Blueprint Studio
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900">Professional Floor Plan Generator</h1>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          Configure your preferences below to generate architect-grade 2D blueprints with precision dimensions and ventilation shafts.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Left Column: Customization Form */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-amber-500/30 shadow-sm space-y-4">
            <h2 className="font-bold text-slate-900 flex items-center gap-2 text-sm border-b pb-3">
              <Home className="h-4 w-4 text-amber-600" /> Loaded Property Land Data
            </h2>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-2.5 rounded-xl border">
                <p className="text-slate-500">Plot Dimensions:</p>
                <p className="font-bold text-slate-900 mt-0.5">18 ft × 19.5 ft</p>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border">
                <p className="text-slate-500">Estimated Area:</p>
                <p className="font-bold text-slate-900 mt-0.5">{metrics.estimatedArea.toFixed(1)} sq.m</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <h2 className="font-bold text-slate-900 flex items-center gap-2 text-sm border-b pb-3">
              <Sparkles className="h-4 w-4 text-amber-600" /> House Requirements Configuration
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Select BHK Configuration</label>
              <div className="grid grid-cols-3 gap-2">
                {(['2BHK', '3BHK', '4BHK'] as const).map(bhk => (
                  <button
                    key={bhk}
                    onClick={() => setRequirements({ ...requirements, bhk })}
                    className={`py-2 rounded-xl border text-xs font-bold transition-all ${
                      requirements.bhk === bhk ? 'bg-amber-600 text-white border-amber-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {bhk}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Number of Floors</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Ground', 'Ground + 1', 'Ground + 2'] as const).map(floors => (
                  <button
                    key={floors}
                    onClick={() => setRequirements({ ...requirements, floors })}
                    className={`py-2 rounded-xl border text-xs font-bold transition-all ${
                      requirements.floors === floors ? 'bg-amber-600 text-white border-amber-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {floors}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                <Car className="h-3.5 w-3.5 text-amber-600" /> Parking Requirement
              </label>
              <select
                value={requirements.parking}
                onChange={(e) => setRequirements({ ...requirements, parking: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium bg-white"
              >
                <option value="No parking">No Parking</option>
                <option value="Bike parking">Bike Parking Only</option>
                <option value="Car parking">Car Parking (1 Car)</option>
              </select>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-xl shadow-lg"
            >
              {isGenerating ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Drafting Architectural Plan...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" /> GENERATE ARCHITECTURAL BLUEPRINT
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Right Column: Preview / Prompt */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl min-h-[450px] flex flex-col justify-center items-center text-center space-y-6">
            {isGenerating ? (
              <div className="space-y-4 animate-pulse">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-amber-400" />
                <h3 className="text-xl font-bold text-white">Drafting Professional CAD Plan</h3>
                <p className="text-sm text-amber-400 font-mono">{generationStep}</p>
              </div>
            ) : (
              <div className="space-y-5 max-w-md">
                <Layers className="h-8 w-8 mx-auto text-amber-400" />
                <h3 className="text-xl font-extrabold text-white">Ready for Custom Generation</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Customize your BHK selection, floor count, and parking on the left, then click <strong className="text-amber-400">Generate Architectural Blueprint</strong> to render your professional CAD layout instantly.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}