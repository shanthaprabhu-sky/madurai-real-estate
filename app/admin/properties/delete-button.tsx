'use client';

import { useState, useTransition } from 'react';
import { Trash2, AlertTriangle, X, Loader2 } from 'lucide-react';
import { deleteProperty } from './action';

interface DeletePropertyButtonProps {
  propertyId: string;
  propertyTitle: string;
}

export function DeletePropertyButton({ propertyId, propertyTitle }: DeletePropertyButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleConfirmDelete = () => {
    const formData = new FormData();
    formData.append('id', propertyId);

    startTransition(async () => {
      await deleteProperty(formData);
      setIsOpen(false);
    });
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
        title="Delete Property"
      >
        <Trash2 className="h-4 w-4" />
      </button>

      {/* Custom Confirmation Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl text-center border border-slate-100 animate-in zoom-in-95 duration-150">
            {/* Close Button (X) */}
            <button
              type="button"
              onClick={() => !isPending && setIsOpen(false)}
              className="absolute right-5 top-5 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Warning Icon Badge */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-rose-500 mb-5">
              <AlertTriangle className="h-8 w-8 stroke-[2]" />
            </div>

            {/* Modal Heading & Text */}
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Delete Property Listing?
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              Are you sure you want to delete <span className="font-semibold text-slate-700">&ldquo;{propertyTitle}&rdquo;</span>? This record will be permanently deleted from the database.
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={isPending}
                onClick={() => setIsOpen(false)}
                className="w-1/2 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-colors disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isPending}
                onClick={handleConfirmDelete}
                className="w-1/2 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold shadow-md shadow-rose-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Yes, Delete</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}