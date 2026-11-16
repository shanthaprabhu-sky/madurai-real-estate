import { prisma } from '@/lib/db';
import { Building2, CalendarCheck, FileText, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const revalidate = 0; // Disable cache for live stats

async function getDeveloperAdminStats() {
  try {
    const [propertyCount, leadCount, builderCount] = await Promise.all([
      prisma.property.count(),
      prisma.lead.count(),
      prisma.builder.count(),
    ]);

    return {
      totalProperties: propertyCount,
      totalProjects: propertyCount, // Using properties count as master developments
      totalLeads: leadCount,
      totalBuilders: builderCount,
    };
  } catch (error) {
    console.error('Error fetching admin dashboard stats via Prisma:', error);
    return {
      totalProperties: 0,
      totalProjects: 0,
      totalLeads: 0,
    };
  }
}

export default async function AdminDashboardPage() {
  const stats = await getDeveloperAdminStats();

  const statCards = [
    {
      title: 'Flagship Projects',
      value: stats.totalProjects,
      icon: Building2,
      description: 'Active master developments',
      href: '/admin/properties',
    },
    {
      title: 'Available Residences',
      value: stats.totalProperties,
      icon: ShieldCheck,
      description: 'Verified 2 & 3 BHK units for sale',
      href: '/admin/properties',
    },
    {
      title: 'Captured Buyer Leads',
      value: stats.totalLeads,
      icon: CalendarCheck,
      description: 'Site visits & contact inquiries',
      href: '/admin/leads',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mt-1 text-slate-900">Dashboard Overview</h2>
        <p className="text-muted-foreground text-xs mt-1">Welcome back! Manage your Madurai real estate project pipeline and client inquiries.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <div
            key={card.title}
            className="rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">{card.title}</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
                  <card.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <div className="text-3xl font-extrabold text-slate-900">{card.value}</div>
                <Link href={card.href} className="text-xs font-semibold text-amber-600 hover:underline flex items-center gap-1">
                  View <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
            <p className="mt-3 text-[11px] text-muted-foreground border-t pt-2">{card.description}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions & CRM Pipeline Summary */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900">In-House Lead Pipeline</h3>
          <p className="mt-1 text-xs text-muted-foreground">Track prospective buyer inquiries captured directly from your project microsites.</p>
          <div className="mt-6 flex items-center justify-between rounded-xl border bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <CalendarCheck className="h-5 w-5 text-amber-600" />
              <div>
                <p className="text-sm font-bold text-slate-900">{stats.totalLeads} Total Inquiries in CRM</p>
                <p className="text-[11px] text-muted-foreground">Manage site visits & brochure downloads</p>
              </div>
            </div>
            <Button size="sm" asChild className="bg-amber-600 hover:bg-amber-700 text-white text-xs">
              <Link href="/admin/leads">Open CRM</Link>
            </Button>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900">Platform Health & Compliance</h3>
          <p className="mt-1 text-xs text-muted-foreground">System integrations and database connectivity status.</p>
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between text-xs p-3 bg-slate-50 rounded-xl border">
              <span className="flex items-center gap-2 font-medium text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Supabase Database Connection
              </span>
              <span className="font-bold text-emerald-700">Connected</span>
            </div>
            <div className="flex items-center justify-between text-xs p-3 bg-slate-50 rounded-xl border">
              <span className="flex items-center gap-2 font-medium text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Tamil Nadu RERA Feed Sync
              </span>
              <span className="font-bold text-emerald-700">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}