'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calculator, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/constants';

export function LoanEligibilityStudio() {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(75000); // ₹75,000 default
  const [existingEmi, setExistingEmi] = useState<number>(5000);       // ₹5,000 default
  const [tenureYears, setTenureYears] = useState<number>(20);         // 20 Years default
  const [interestRate, setInterestRate] = useState<number>(8.5);      // 8.5% default

  // Banks typically allow up to 50% of net monthly income for EMI
  const maxAllowedEmi = (monthlyIncome * 0.5) - existingEmi;
  const effectiveEmi = maxAllowedEmi > 0 ? maxAllowedEmi : 0;

  const monthlyRate = interestRate / 12 / 100;
  const months = tenureYears * 12;

  let eligibleLoanAmount = 0;
  if (monthlyRate > 0 && months > 0 && effectiveEmi > 0) {
    eligibleLoanAmount = 
      (effectiveEmi * (Math.pow(1 + monthlyRate, months) - 1)) / 
      (monthlyRate * Math.pow(1 + monthlyRate, months));
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-amber-500/30 p-6 md:p-10 shadow-xl space-y-8">
      <div className="text-center space-y-2">
        <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
          Borrowing Capacity Estimator
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Home Loan Eligibility Calculator</h2>
        <p className="text-sm text-muted-foreground">
          Find out the maximum housing loan amount you can qualify for based on your income and ongoing monthly liabilities.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 items-start">
        <div className="lg:col-span-6 space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-900 uppercase">Net Monthly Income (Salary)</label>
              <span className="text-sm font-extrabold text-amber-700">{formatPrice(monthlyIncome)}</span>
            </div>
            <input
              type="range"
              min="20000"
              max="500000"
              step="5000"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-900 uppercase">Existing Monthly EMIs (if any)</label>
              <span className="text-sm font-extrabold text-amber-700">{formatPrice(existingEmi)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100000"
              step="2000"
              value={existingEmi}
              onChange={(e) => setExistingEmi(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-900 uppercase">Loan Tenure (Years)</label>
              <span className="text-sm font-extrabold text-amber-700">{tenureYears} Years</span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>
        </div>

        <div className="lg:col-span-6 bg-slate-900 text-white p-6 rounded-2xl shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <span className="text-xs uppercase tracking-wider text-amber-400 font-mono">Eligibility Summary</span>
              <Calculator className="h-5 w-5 text-amber-400" />
            </div>

            <div>
              <p className="text-xs text-slate-400">Max Eligible Loan Amount</p>
              <p className="text-3xl font-black text-amber-400 mt-1">{formatPrice(Math.round(eligibleLoanAmount))}</p>
            </div>

            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Max Recommended EMI:</span>
                <span className="font-bold text-white">{formatPrice(Math.round(effectiveEmi))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Interest Rate Assumed:</span>
                <span className="font-bold text-white">{interestRate}% P.A.</span>
              </div>
            </div>
          </div>

          <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold" asChild>
            <a href="/contact" className="flex items-center justify-center gap-2">
              Connect With Loan Officers <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}