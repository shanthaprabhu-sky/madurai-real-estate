'use client';

import { useState } from 'react';
import { createBuilderAction } from '@/app/action/builder-action';
import { Button } from '@/components/ui/button';
import { Building, CheckCircle, Loader2, Image as ImageIcon } from 'lucide-react';

export default function NewBuilderAdminPage() {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setSuccessMsg(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const res = await createBuilderAction(formData);
    setLoading(false);
    if (res.success) {
      setSuccessMsg(res.message);
      form.reset();
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-6">
      <div className="space-y-1">
        <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
          Admin Portal
        </span>
        <h1 className="text-2xl font-extrabold text-slate-900 mt-2">Add New Builder / Developer</h1>
        <p className="text-xs text-muted-foreground">
          Register RERA-approved developers and construction companies to display them on the public Builders directory.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="space-y-4">
          <h2 className="font-bold text-slate-900 flex items-center gap-2 text-sm border-b pb-2">
            <Building className="h-4 w-4 text-amber-600" /> Builder Profile Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Builder / Company Name</label>
              <input required name="name" placeholder="e.g., Temple City Constructions" className="w-full px-3 py-2 rounded-xl border text-xs" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">RERA Registration Number</label>
              <input name="reraNumber" placeholder="e.g., TN/29/Building/0123/2024" className="w-full px-3 py-2 rounded-xl border text-xs" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Total Completed / Ongoing Projects</label>
              <input type="number" name="projectsCount" defaultValue="5" className="w-full px-3 py-2 rounded-xl border text-xs" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <ImageIcon className="h-3.5 w-3.5 text-amber-600" /> Builder Logo / Image
              </label>
              <input 
                type="file" 
                name="builderImage" 
                accept="image/*" 
                className="w-full px-3 py-1.5 rounded-xl border text-xs file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 cursor-pointer bg-slate-50" 
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Company Description & Overview</label>
            <textarea name="description" rows={4} placeholder="Write a short bio about the builder's experience, quality standards, and footprint in Madurai..." className="w-full px-3 py-2 rounded-xl border text-xs" />
          </div>
        </div>

        <Button disabled={loading} className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-xl shadow-lg">
          {loading ? <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Saving Builder...</span> : 'Publish Builder Profile'}
        </Button>
      </form>
    </div>
  );
}