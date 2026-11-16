'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/constants';

export function StampDutyStudio() {
  const [propertyValue, setPropertyValue] = useState<number>(4000000); // 40 Lakhs default
  const [isUrban, setIsUrban] = useState<boolean>(true); // Corporation / Municipality

  // TN Rules: Stamp Duty is typically 7%, Registration Fee is 2%
  const stampDutyRate = 0.07;
  const registrationRate = 0.02;

  const stampDuty = propertyValue * stampDutyRate;
  const registrationFee = propertyValue * registrationRate;
  const totalGovernmentCharges = stampDuty + registrationFee;
  const grandTotal = propertyValue + totalGovernmentCharges;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-amber-500/30 p-6 md:p-10 shadow-xl space-y-8">
      <div className="text-center space-y-2">
        <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
          Tamil Nadu Government Guidelines
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">TN Stamp Duty & Registration Estimator</h2>
        <p className="text-sm text-muted-foreground">
          Calculate legal stamp duty (7%) and registration fees (2%) for land, plots, and apartments across Tamil Nadu.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 items-start">
        <div className="lg:col-span-6 space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-900 uppercase">Property Market / Guideline Value</label>
              <span className="text-sm font-extrabold text-amber-700">{formatPrice(propertyValue)}</span>
            </div>
            <input
              type="range"
              min="500000"
              max="15000000"
              step="100000"
              value={propertyValue}
              onChange={(e) => setPropertyValue(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>₹5 Lakhs</span>
              <span>₹1.5 Crores</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-900 uppercase block">Location Zone Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setIsUrban(true)}
                className={`py-2.5 px-4 rounded-xl border text-xs font-bold transition-all ${
                  isUrban ? 'bg-amber-600 text-white border-amber-600 shadow-sm' : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                Urban / Corporation
              </button>
              <button
                onClick={() => setIsUrban(false)}
                className={`py-2.5 px-4 rounded-xl border text-xs font-bold transition-all ${
                  !isUrban ? 'bg-amber-600 text-white border-amber-600 shadow-sm' : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                Rural / Panchayat
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 bg-slate-900 text-white p-6 rounded-2xl shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <span className="text-xs uppercase tracking-wider text-amber-400 font-mono">Government Breakdown</span>
              <FileText className="h-5 w-5 text-amber-400" />
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <span className="text-slate-300">Stamp Duty (7%)</span>
                <span className="font-bold text-amber-400">{formatPrice(Math.round(stampDuty))}</span>
              </div>
              <div className="flex justify-between bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <span className="text-slate-300">Registration Fee (2%)</span>
                <span className="font-bold text-amber-400">{formatPrice(Math.round(registrationFee))}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-1">
              <p className="text-xs text-slate-400">Total Government Charges</p>
              <p className="text-2xl font-black text-white">{formatPrice(Math.round(totalGovernmentCharges))}</p>
            </div>

            <div className="pt-2">
              <p className="text-xs text-slate-400">Total Estimated Acquisition Cost</p>
              <p className="text-xl font-bold text-amber-400">{formatPrice(Math.round(grandTotal))}</p>
            </div>
          </div>

          <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold" asChild>
            <a href="/contact" className="flex items-center justify-center gap-2">
              Verify Legal Title & Guidelines <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}