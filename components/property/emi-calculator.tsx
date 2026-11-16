'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

interface EMICalculatorProps {
  defaultPrice: number;
}

export function EMICalculator({ defaultPrice }: EMICalculatorProps) {
  const [loanAmount, setLoanAmount] = useState(Math.round(defaultPrice * 0.8));
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const { emi, totalInterest, totalPayable } = useMemo(() => {
    const principal = loanAmount;
    const rate = interestRate / 12 / 100;
    const months = tenure * 12;
    if (rate === 0) {
      const e = principal / months;
      return { emi: e, totalInterest: 0, totalPayable: principal };
    }
    const emiVal = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    const total = emiVal * months;
    return {
      emi: emiVal,
      totalInterest: total - principal,
      totalPayable: total,
    };
  }, [loanAmount, interestRate, tenure]);

  const formatINR = (n: number) => {
    if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
    if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
    return `₹${n.toLocaleString('en-IN')}`;
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="mb-1.5 block">Loan Amount</Label>
        <Input
          type="number"
          value={loanAmount}
          onChange={(e) => setLoanAmount(Math.max(0, parseInt(e.target.value) || 0))}
          className="text-base"
        />
        <Slider
          className="mt-2"
          min={100000}
          max={20000000}
          step={100000}
          value={[loanAmount]}
          onValueChange={(v) => setLoanAmount(v[0])}
        />
        <p className="mt-1 text-xs text-muted-foreground">{formatINR(loanAmount)}</p>
      </div>

      <div>
        <Label className="mb-1.5 block">Interest Rate (% per year)</Label>
        <Input
          type="number"
          step="0.1"
          value={interestRate}
          onChange={(e) => setInterestRate(Math.max(0, parseFloat(e.target.value) || 0))}
          className="text-base"
        />
        <Slider
          className="mt-2"
          min={6}
          max={15}
          step={0.1}
          value={[interestRate]}
          onValueChange={(v) => setInterestRate(v[0])}
        />
      </div>

      <div>
        <Label className="mb-1.5 block">Loan Tenure (years)</Label>
        <Input
          type="number"
          value={tenure}
          onChange={(e) => setTenure(Math.max(1, parseInt(e.target.value) || 1))}
          className="text-base"
        />
        <Slider
          className="mt-2"
          min={1}
          max={30}
          step={1}
          value={[tenure]}
          onValueChange={(v) => setTenure(v[0])}
        />
      </div>

      <div className="rounded-lg bg-muted/50 p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Monthly EMI</span>
          <span className="text-xl font-bold text-primary">{formatINR(emi)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Total Interest</span>
          <span className="font-semibold">{formatINR(totalInterest)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Total Payable</span>
          <span className="font-semibold">{formatINR(totalPayable)}</span>
        </div>
      </div>
    </div>
  );
}
