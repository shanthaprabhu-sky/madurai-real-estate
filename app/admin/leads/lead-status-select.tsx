'use client';

import { useState } from 'react';
import { updateLeadStatusAction } from '@/app/action/lead-action';

const STATUS_COLOR_MAP: Record<string, string> = {
  NEW: 'bg-amber-50 text-amber-700 border-amber-200',
  CONTACTED: 'bg-blue-50 text-blue-700 border-blue-200',
  IN_PROGRESS: 'bg-purple-50 text-purple-700 border-purple-200',
  COMPLETED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  CLOSED: 'bg-slate-100 text-slate-600 border-slate-200',
};

export default function LeadStatusSelect({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: string;
}) {
  const [status, setStatus] = useState((currentStatus || 'NEW').toUpperCase());

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextStatus = e.target.value;
    // 1. Immediately reflect the change on the screen (Zero Lag)
    setStatus(nextStatus);

    // 2. Perform DB update asynchronously in background
    updateLeadStatusAction(id, nextStatus).catch((err) => {
      console.error('Failed to sync status:', err);
      // Revert if database update fails
      setStatus(currentStatus);
    });
  };

  const badgeStyle = STATUS_COLOR_MAP[status] || STATUS_COLOR_MAP.NEW;

  return (
    <select
      value={status}
      onChange={handleChange}
      className={`border text-[11px] font-bold rounded-lg px-2.5 py-1.5 cursor-pointer focus:outline-none transition-all shadow-sm ${badgeStyle}`}
    >
      <option value="NEW">🟡 NEW</option>
      <option value="CONTACTED">🔵 CONTACTED</option>
      <option value="IN_PROGRESS">🟣 IN PROGRESS</option>
      <option value="COMPLETED">🟢 COMPLETED</option>
      <option value="CLOSED">⚪ CLOSED</option>
    </select>
  );
}