import { prisma } from '@/lib/db';
import { MessageSquare, Phone } from 'lucide-react';
import LeadStatusSelect from './lead-status-select';
import DeleteLeadButton from './delete-lead-button';

export const revalidate = 0; // Real-time data without caching

export default async function AdminLeadsPage() {
  let leads: Awaited<ReturnType<typeof prisma.lead.findMany>> = [];

  try {
    leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
  }

  return (
    <div className="max-w-6xl mx-auto py-2 px-4 space-y-6">
      <div className="space-y-1 border-b pb-6">
        <h1 className="text-2xl font-extrabold text-slate-900 mt-2">Leads & Inquiries</h1>
        <p className="text-xs text-muted-foreground">
          View client inquiries, update progress status, or remove old submissions.
        </p>
      </div>

      {leads.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-card py-20 text-center shadow-sm">
          <MessageSquare className="mb-4 h-12 w-12 text-amber-600" />
          <h3 className="text-lg font-semibold text-slate-900">No inquiries received yet.</h3>
          <p className="mt-1 text-sm text-muted-foreground max-w-sm">
            Client messages submitted from the public contact page will appear here instantly.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b text-slate-700 font-bold">
                  <th className="p-4">Client Name</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Message</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Submitted At</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-bold text-slate-900">{lead.name}</td>
                    <td className="p-4 text-slate-700">
                      <a
                        href={`tel:${lead.phone}`}
                        className="flex items-center gap-1.5 hover:text-amber-600 font-medium"
                        title="Click to call"
                      >
                        <Phone className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                        <span>{lead.phone}</span>
                      </a>
                    </td>
                    <td className="p-4 text-muted-foreground">{lead.email || 'N/A'}</td>
                    <td className="p-4 text-slate-700 max-w-xs break-words" title={lead.message}>
                      {lead.message}
                    </td>

                    {/* Interactive Dropdown */}
                    <td className="p-4">
                      <LeadStatusSelect id={lead.id} currentStatus={lead.status || 'NEW'} />
                    </td>

                    <td className="p-4 text-muted-foreground whitespace-nowrap">
                      {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>

                    {/* Delete Button with Confirmation Check */}
                    <td className="p-4 text-center">
                      <DeleteLeadButton leadId={lead.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}