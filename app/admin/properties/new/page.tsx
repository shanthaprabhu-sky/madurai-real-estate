'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { createPropertyAction } from '@/app/action/property-action';
import { Button } from '@/components/ui/button';
import { Building2, Ruler, Image as ImageIcon, CheckCircle, Loader2, Sliders, X } from 'lucide-react';

export default function NewPropertyAdminPage() {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setSuccessMsg(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const res = await createPropertyAction(formData);
    setLoading(false);
    if (res.success) {
      setSuccessMsg(res.message);
      form.reset();
    }
  }

  return (
    <div className="max-w-5xl mx-auto py-4 px-2 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-slate-900 mt-2">Post New Property & Land Geometry</h1>
      </div>

      {/* Centered Modal Teleported Directly to Document Body */}
      {mounted && successMsg && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 flex flex-col items-center text-center transform scale-100 animate-in zoom-in-95 duration-200 relative">
            
            {/* Cancel (X) Button */}
            <button
              type="button"
              onClick={() => setSuccessMsg(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Success Icon */}
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 ring-8 ring-emerald-50">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              Property Saved Successfully!
            </h3>

            {/* Modal Actions */}
            <div className="flex gap-3 w-full mt-6">
              <a
                href="/admin/properties"
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all text-center flex items-center justify-center"
              >
                View All Plots
              </a>
              <button
                type="button"
                onClick={() => setSuccessMsg(null)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-all shadow-md text-center"
              >
                Add Another
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        {/* Basic Listing Info */}
        <div className="space-y-4">
          <h2 className="font-bold text-slate-900 flex items-center gap-2 text-sm border-b pb-2">
            <Building2 className="h-4 w-4 text-amber-600" /> General Listing Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Property Title</label>
              <input required name="title" placeholder="e.g., Premium Residential Plot in Anna Nagar" className="w-full px-3 py-2 rounded-xl border text-xs" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Location / Area</label>
              <input required name="location" placeholder="e.g., Madurai" className="w-full px-3 py-2 rounded-xl border text-xs" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Price (₹)</label>
              <input required type="number" name="price" placeholder="4500000" className="w-full px-3 py-2 rounded-xl border text-xs" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <ImageIcon className="h-3.5 w-3.5 text-amber-600" /> Upload Property Photos (Multiple)
              </label>
              <input 
                type="file" 
                name="propertyImages" 
                multiple 
                accept="image/*" 
                className="w-full px-3 py-1.5 rounded-xl border text-xs file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 cursor-pointer bg-slate-50" 
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Description</label>
            <textarea name="description" rows={3} placeholder="Detailed property description..." className="w-full px-3 py-2 rounded-xl border text-xs" />
          </div>
        </div>

        {/* Filter Categories for Public Sidebar Matching */}
        <div className="space-y-4 pt-4 border-t">
          <h2 className="font-bold text-slate-900 flex items-center gap-2 text-sm border-b pb-2">
            <Sliders className="h-4 w-4 text-amber-600" /> Filter & Category Configurations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Property Type</label>
              <select name="propertyType" className="w-full px-3 py-2 rounded-xl border text-xs bg-white">
                <option value="Residential Plot">Residential Plot</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Independent House">Independent House</option>
                <option value="Commercial Shop">Commercial Shop</option>
                <option value="Office Space">Office Space</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Bedrooms (BHK)</label>
              <select name="bedrooms" className="w-full px-3 py-2 rounded-xl border text-xs bg-white">
                <option value="0">Not Applicable (Plots/Commercial)</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4+ BHK</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Legal Approval</label>
              <select name="approval" className="w-full px-3 py-2 rounded-xl border text-xs bg-white">
                <option value="RERA Registered">RERA Registered</option>
                <option value="DTCP Approved">DTCP Approved</option>
                <option value="CMDA Approved">CMDA Approved</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Total Area (sq.ft)</label>
              <input required type="number" name="areaSqft" defaultValue="1200" placeholder="1200" className="w-full px-3 py-2 rounded-xl border text-xs" />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Furnishing Status</label>
              <select name="furnishing" className="w-full px-3 py-2 rounded-xl border text-xs bg-white">
                <option value="Unfurnished">Unfurnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Fully Furnished">Fully Furnished</option>
              </select>
            </div>
          </div>
        </div>

        {/* Land Geometry for Blueprint Studio */}
        <div className="space-y-4 pt-4 border-t">
          <h2 className="font-bold text-slate-900 flex items-center gap-2 text-sm border-b pb-2">
            <Ruler className="h-4 w-4 text-amber-600" /> Land Geometry & Blueprint Parameters
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Front Length (m)</label>
              <input required type="number" step="0.1" name="frontLength" defaultValue="40" className="w-full px-3 py-1.5 rounded-xl border text-xs" />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Back Length (m)</label>
              <input required type="number" step="0.1" name="backLength" defaultValue="38" className="w-full px-3 py-1.5 rounded-xl border text-xs" />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Left Length (m)</label>
              <input required type="number" step="0.1" name="leftLength" defaultValue="30" className="w-full px-3 py-1.5 rounded-xl border text-xs" />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Right Length (m)</label>
              <input required type="number" step="0.1" name="rightLength" defaultValue="32" className="w-full px-3 py-1.5 rounded-xl border text-xs" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Diagonal (Optional, m)</label>
              <input type="number" step="0.1" name="diagonal" defaultValue="50" className="w-full px-3 py-1.5 rounded-xl border text-xs" />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Road Side</label>
              <select name="roadSide" className="w-full px-3 py-1.5 rounded-xl border text-xs bg-white">
                <option value="Front">Front</option>
                <option value="Back">Back</option>
                <option value="Left">Left</option>
                <option value="Right">Right</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">Road Width (m)</label>
              <input required type="number" step="0.1" name="roadWidth" defaultValue="9" className="w-full px-3 py-1.5 rounded-xl border text-xs" />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1">North Direction Orientation</label>
            <select name="northDirection" className="w-full md:w-1/3 px-3 py-1.5 rounded-xl border text-xs bg-white">
              <option value="Front">Facing Front</option>
              <option value="Back">Facing Back</option>
              <option value="Left">Facing Left</option>
              <option value="Right">Facing Right</option>
            </select>
          </div>
        </div>

        <Button disabled={loading} className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-xl shadow-lg">
          {loading ? <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Saving Property...</span> : 'Save Property & Enable Live Filters'}
        </Button>
      </form>
    </div>
  );
}