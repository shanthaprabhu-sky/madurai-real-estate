'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function StampDutyEstimator() {
  const [propertyValue, setPropertyValue] = useState<number>(5000000); // ₹50 Lakhs default

  // Tamil Nadu statutory rates: 7% Stamp Duty + 4% Registration Fee = 11%
  const stampDuty = propertyValue * 0.07;
  const registrationFee = propertyValue * 0.04;
  const totalCost = stampDuty + registrationFee;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>TN Stamp Duty & Registration Estimator</CardTitle>
            <CardDescription>Calculated as per Tamil Nadu Registration Department norms</CardDescription>
          </div>
          <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-full">
            11% Statutory Outgo
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Property Value / Agreement Cost (₹)
          </label>
          <input
            type="number"
            value={propertyValue}
            onChange={(e) => setPropertyValue(Number(e.target.value))}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none text-slate-900"
          />
        </div>

        <div className="bg-slate-50 p-4 rounded-xl space-y-3 border border-slate-200">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Stamp Duty (7%):</span>
            <span className="font-semibold text-slate-900">₹ {stampDuty.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Registration Fee (4%):</span>
            <span className="font-semibold text-slate-900">₹ {registrationFee.toLocaleString('en-IN')}</span>
          </div>
          <div className="border-t border-slate-200 pt-3 flex justify-between text-base font-bold">
            <span className="text-slate-900">Total Government Charges:</span>
            <span className="text-amber-600">₹ {totalCost.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}