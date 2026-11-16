'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Building2, FileCheck, Trash2, Loader2, Plus } from 'lucide-react';

export default function AdminBuildersPage() {
  const [builders, setBuilders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Fetch existing builders on mount
  useEffect(() => {
    fetchBuilders();
  }, []);

  async function fetchBuilders() {
    try {
      const res = await fetch('/api/builders');
      const data = await res.json();
      if (Array.isArray(data)) {
        setBuilders(data);
      }
    } catch (err) {
      console.error('Failed to load builders:', err);
    } finally {
      setFetching(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get('name'),
      reraNumber: formData.get('reraNumber'),
      projectsCount: parseInt(formData.get('projectsCount') as string) || 0,
      description: formData.get('description'),
      imageUrl: formData.get('imageUrl') || 'https://images.unsplash.com/photo-1541888946425-d0fbb18f7243',
    };

    try {
      const res = await fetch('/api/builders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        form.reset();
        fetchBuilders(); // Refresh the list
      } else {
        alert('Failed to save builder: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      console.error('Error submitting builder:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-8">
      <div className="space-y-1">
        <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
          Admin Portal
        </span>
        <h1 className="text-2xl font-extrabold text-slate-900 mt-2">Manage Builders & Developers</h1>
        <p className="text-xs text-muted-foreground">
          Add new RERA-registered builders and view the live directory instantly.
        </p>
      </div>

      {/* Add Builder Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="font-bold text-slate-900 flex items-center gap-2 text-sm border-b pb-2">
          <Plus className="h-4 w-4 text-amber-600" /> Add New Builder
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Builder Name</label>
            <input required name="name" placeholder="e.g., Megha Builders" className="w-full px-3 py-2 rounded-xl border text-xs" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">RERA Number</label>
            <input name="reraNumber" placeholder="e.g., TN/29/Building/0123/2024" className="w-full px-3 py-2 rounded-xl border text-xs" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Projects Completed</label>
            <input type="number" name="projectsCount" defaultValue="5" className="w-full px-3 py-2 rounded-xl border text-xs" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Logo / Image URL</label>
            <input name="imageUrl" placeholder="https://..." className="w-full px-3 py-2 rounded-xl border text-xs" />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">Description</label>
          <textarea name="description" rows={3} placeholder="Builder background and details..." className="w-full px-3 py-2 rounded-xl border text-xs" />
        </div>

        <Button disabled={loading} className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 rounded-xl shadow-md text-xs">
          {loading ? <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Saving...</span> : 'Save Builder'}
        </Button>
      </form>

      {/* Existing Builders List */}
      <div className="space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="font-bold text-slate-900 text-sm border-b pb-2">Existing Builders ({builders.length})</h2>

        {fetching ? (
          <p className="text-xs text-muted-foreground py-4">Loading builders...</p>
        ) : builders.length === 0 ? (
          <p className="text-xs text-muted-foreground py-4">No builders found in database.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {builders.map((builder) => (
              <div key={builder.id} className="p-4 rounded-xl border flex items-start gap-3 bg-slate-50">
                <img src={builder.imageUrl || 'https://images.unsplash.com/photo-1541888946425-d0fbb18f7243'} alt={builder.name} className="h-12 w-12 rounded-lg object-cover border bg-white" />
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-slate-900 truncate">{builder.name}</h3>
                  <p className="text-[11px] text-emerald-700 font-medium">RERA: {builder.reraNumber || 'N/A'}</p>
                  <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2">{builder.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
