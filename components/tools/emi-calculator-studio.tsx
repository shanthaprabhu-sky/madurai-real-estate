'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calculator, IndianRupee, PieChart, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/constants';

export function EmiCalculatorStudio() {
  const [loanAmount, setLoanAmount] = useState<number>(3500000); // 35 Lakhs default
  const [interestRate, setInterestRate] = useState<number>(8.5);  // 8.5% default
  const [tenureYears, setTenureYears] = useState<number>(20);     // 20 Years default

  // EMI Math Logic: EMI = [P x r x (1 + r)^n] / [(1 + r)^n - 1]
  const principal = loanAmount;
  const monthlyRate = interestRate / 12 / 100;
  const months = tenureYears * 12;

  let monthlyEmi = 0;
  let totalPayment = 0;
  let totalInterest = 0;

  if (monthlyRate > 0 && months > 0) {
    monthlyEmi = 
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
      (Math.pow(1 + monthlyRate, months) - 1);
    totalPayment = monthlyEmi * months;
    totalInterest = totalPayment - principal;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-amber-500/30 p-6 md:p-10 shadow-xl space-y-8">
      <div className="text-center space-y-2">
        <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
          Banking Partner Integration (SBI, HDFC, ICICI)
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Home Loan EMI Calculator</h2>
        <p className="text-sm text-muted-foreground">
          Calculate your exact monthly housing loan installments, total interest payable, and repayment schedule instantly.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Input Sliders / Controls (7 cols) */}
        <div className="lg:col-span-6 space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
          {/* Loan Amount Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-900 uppercase">Home Loan Amount</label>
              <span className="text-sm font-extrabold text-amber-700">{formatPrice(loanAmount)}</span>
            </div>
            <input
              type="range"
              min="500000"
              max="20000000"
              step="100000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>₹5 Lakhs</span>
              <span>₹2 Crores</span>
            </div>
          </div>

          {/* Interest Rate Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-900 uppercase">Interest Rate (% P.A.)</label>
              <span className="text-sm font-extrabold text-amber-700">{interestRate}%</span>
            </div>
            <input
              type="range"
              min="6.5"
              max="15.0"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>6.5%</span>
              <span>15.0%</span>
            </div>
          </div>

          {/* Loan Tenure Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-900 uppercase">Loan Tenure (Years)</label>
              <span className="text-sm font-extrabold text-amber-700">{tenureYears} Years</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>1 Year</span>
              <span>30 Years</span>
            </div>
          </div>
        </div>

        {/* Live Calculation Output Display (6 cols -> adjusted to 6) */}
        <div className="lg:col-span-6 bg-slate-900 text-white p-6 rounded-2xl shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <span className="text-xs uppercase tracking-wider text-amber-400 font-mono">Monthly Repayment</span>
              <Calculator className="h-5 w-5 text-amber-400" />
            </div>

            <div>
              <p className="text-xs text-slate-400">Estimated Monthly EMI</p>
              <p className="text-3xl font-black text-amber-400 mt-1">
                {formatPrice(Math.round(monthlyEmi))} <span className="text-xs font-normal text-slate-300">/ month</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <p className="text-slate-400 uppercase text-[10px]">Principal Amount</p>
                <p className="font-bold text-white mt-1">{formatPrice(principal)}</p>
              </div>
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                <p className="text-slate-400 uppercase text-[10px]">Total Interest</p>
                <p className="font-bold text-amber-300 mt-1">{formatPrice(Math.round(totalInterest))}</p>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Total Payment (Principal + Interest)</span>
                <span className="font-bold text-white">{formatPrice(Math.round(totalPayment))}</span>
              </div>
            </div>
          </div>

          <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold" asChild>
            <a href="/contact" className="flex items-center justify-center gap-2">
              Apply For Pre-Approved Bank Loan <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}