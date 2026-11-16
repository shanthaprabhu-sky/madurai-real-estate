'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { EmiCalculatorStudio } from '@/components/tools/emi-calculator-studio';
import { StampDutyStudio } from '@/components/tools/stamp-duty-studio';
import { AreaConverterStudio } from '@/components/tools/area-converter-studio';
import { LoanEligibilityStudio } from '@/components/tools/loan-eligibility-studio';

const TOOLS_LIST = [
  { id: 'emi-calculator', title: 'Home Loan EMI Calculator' },
  { id: 'stamp-duty', title: 'TN Stamp Duty & Registration Estimator' },
  { id: 'area-converter', title: 'Area Unit Converter' },
  { id: 'loan-eligibility', title: 'Home Loan Eligibility Calculator' },
];

function ToolsContent() {
  const searchParams = useSearchParams();
  const toolParam = searchParams.get('tool');
  const [activeTool, setActiveTool] = useState('land-calculator');

  useEffect(() => {
    if (toolParam && TOOLS_LIST.some(t => t.id === toolParam)) {
      setActiveTool(toolParam);
    }
  }, [toolParam]);

  const currentToolObj = TOOLS_LIST.find(t => t.id === activeTool) || TOOLS_LIST[0];

  return (
    <main className="container-page py-12 space-y-8">
      {/* Dynamic Tool Display Area (Controlled entirely by Header menu links) */}
      <div className="pt-2">
        {activeTool === 'emi-calculator' && <EmiCalculatorStudio />}
        {activeTool === 'stamp-duty' && <StampDutyStudio />}
        {activeTool === 'area-converter' && <AreaConverterStudio />}
        {activeTool === 'loan-eligibility' && <LoanEligibilityStudio />}
      </div>
    </main>
  );
}

export default function ToolsHubPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center">Loading tools...</div>}>
      <ToolsContent />
    </Suspense>
  );
}