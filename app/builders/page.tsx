import { prisma } from '@/lib/db';
import Link from 'next/link';
import { Building2, FileCheck } from 'lucide-react';

export const revalidate = 0; // Disable cache so newly posted builders show up instantly

export async function generateMetadata() {
  return {
    title: 'Builders & Developers in Madurai',
    description: 'Explore RERA-registered builders and their projects across Madurai, Tamil Nadu.',
  };
}

export default async function BuildersPage() {
  let builders: Awaited<ReturnType<typeof prisma.builder.findMany>> = [];
  try {
    builders = await prisma.builder.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching builders with Prisma:', error);
    builders = [];
  }

  return (
    <div className="container-page py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold sm:text-4xl text-slate-900">Builders & Developers</h1>
        <p className="mt-2 text-muted-foreground text-sm">RERA-registered developers building Madurai's future</p>
      </div>

      {builders.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border bg-card py-20 text-center shadow-sm">
          <Building2 className="mb-4 h-12 w-12 text-amber-600" />
          <h3 className="text-lg font-semibold text-slate-900">No builders listed yet.</h3>
          <p className="mt-1 text-sm text-muted-foreground max-w-sm">
            Add builders from your admin portal to see them displayed here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {builders.map((builder) => (
            <div key={builder.id} className="rounded-xl border bg-card p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-start gap-4">
                  {builder.imageUrl ? (
                    <img src={builder.imageUrl} alt={builder.name} className="h-14 w-14 shrink-0 rounded-lg object-cover bg-slate-100 border" />
                  ) : (
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600 border border-amber-200">
                      <Building2 className="h-7 w-7" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <h2 className="text-base font-bold text-slate-900 truncate">{builder.name}</h2>
                    {builder.reraNumber && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded w-fit font-medium">
                        <FileCheck className="h-3 w-3" />
                        RERA: {builder.reraNumber}
                      </p>
                    )}
                  </div>
                </div>
                {builder.description && (
                  <p className="mt-3 line-clamp-3 text-xs text-muted-foreground leading-relaxed">{builder.description}</p>
                )}
              </div>
              <div className="mt-6 pt-4 border-t flex justify-between items-center text-xs text-muted-foreground">
                <span>Flagship Projects</span>
                <span className="font-bold text-slate-900 text-sm bg-slate-100 px-2.5 py-1 rounded-md">{builder.projectsCount} Completed</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}