export default function TrustBadgeBar({ reraNumber, dtcpNumber }: { reraNumber?: string; dtcpNumber?: string })
 {
  return (
    <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center space-x-4">
          <span className="bg-amber-500/20 text-amber-400 font-semibold px-2 py-0.5 rounded border border-amber-500/30">
            Verified Developer Brand
          </span>
          {reraNumber && <span>RERA: <strong>{reraNumber}</strong></span>}
          {dtcpNumber && <span className="hidden md:inline">DTCP: <strong>{dtcpNumber}</strong></span>}
        </div>
        <div className="text-slate-400">
          Approved by SBI, HDFC & ICICI for Instant Home Loans in Madurai
        </div>
      </div>
    </div>
  );
}

