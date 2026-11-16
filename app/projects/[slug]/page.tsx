import { supabase } from '@/lib/supabase/client';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, FileCheck, Calendar, Download, MapPin, Building, CalendarCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PropertyCard } from '@/components/property/property-card';
import { formatPrice } from '@/lib/constants';
import type { Project, Builder, PropertyWithRelations, PropertyFloorPlan } from '@/lib/types';

export const revalidate = 3600;

interface PageProps {
  params: { slug: string };
}

async function getProject(slug: string) {
  const { data } = await supabase
    .from('projects')
    .select(`
      *,
      builder:builders(*),
      locality:localities(*)
    `)
    .eq('slug', slug)
    .maybeSingle();
  return data as (Project & { builder: Builder | null; locality: { name: string; latitude: number | null; longitude: number | null } | null }) | null;
}

async function getFloorPlans(projectId: string) {
  const { data } = await supabase
    .from('property_floor_plans')
    .select('*')
    .eq('project_id', projectId)
    .order('sort_order');
  return (data ?? []) as PropertyFloorPlan[];
}

async function getProjectProperties(projectId: string) {
  const { data } = await supabase
    .from('properties')
    .select(`
      *,
      locality:localities(*),
      builder:builders(*),
      project:projects(*),
      images:property_images(*),
      amenities:property_amenities(amenity:amenities(*))
    `)
    .eq('project_id', projectId)
    .eq('status', 'active')
    .limit(6);
  return (data ?? []) as unknown as PropertyWithRelations[];
}

export async function generateMetadata({ params }: PageProps) {
  const project = await getProject(params.slug);
  if (!project) return { title: 'Project Not Found' };
  return { title: `${project.name} — Flagship Project in Madurai`, description: project.description ?? '' };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const project = await getProject(params.slug);
  if (!project) notFound();

  const [floorPlans, properties] = await Promise.all([
    getFloorPlans(project.id),
    getProjectProperties(project.id),
  ]);

  return (
    <div className="container-page py-8">
      <Link href="/properties" className="mb-4 inline-flex items-center gap-1 text-sm text-amber-700 font-medium hover:underline">
        <ArrowLeft className="h-4 w-4" />
        Back to Flagship Projects
      </Link>

      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            Exclusive Development
          </span>
          {project.rera_registration && (
            <Badge className="bg-emerald-600 text-white">
              <FileCheck className="mr-1 h-3 w-3" />
              RERA: {project.rera_registration}
            </Badge>
          )}
        </div>
        <h1 className="text-3xl font-bold sm:text-4xl text-slate-900">{project.name}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          {project.locality?.name && (
            <p className="flex items-center gap-1 text-sm text-muted-foreground font-medium">
              <MapPin className="h-4 w-4 text-amber-600" />
              {project.locality.name}, Madurai
            </p>
          )}
          <Badge variant="outline" className="capitalize text-slate-700">{project.status}</Badge>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-8">
          {project.description && (
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <h2 className="mb-3 text-xl font-bold text-slate-900">About This Flagship Project</h2>
              <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{project.description}</p>
            </div>
          )}

          {floorPlans.length > 0 && (
            <div>
              <h2 className="mb-4 text-xl font-bold text-slate-900">Master Plans & Floor Configurations</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {floorPlans.map((plan) => (
                  <div key={plan.id} className="overflow-hidden rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative aspect-[4/3] bg-slate-100">
                      <Image src={plan.image_url} alt={plan.label ?? 'Floor plan'} fill className="object-contain p-2" sizes="50vw" />
                    </div>
                    {plan.label && <p className="p-4 text-sm font-semibold text-slate-900 border-t">{plan.label}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {properties.length > 0 && (
            <div>
              <h2 className="mb-4 text-xl font-bold text-slate-900">Available Units in this Project</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {properties.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky Conversion & Details Sidebar */}
        <div className="lg:sticky lg:top-20 lg:h-fit">
          <div className="rounded-xl border bg-card p-6 space-y-5 shadow-sm border-slate-200">
            <div>
              <h3 className="font-bold text-lg text-slate-900">Project Overview</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Verified developer specifications</p>
            </div>

            <div className="space-y-4 text-sm divide-y divide-slate-100">
              {project.builder && (
                <div className="pt-3 first:pt-0">
                  <p className="text-muted-foreground text-xs uppercase tracking-wider">Developer Brand</p>
                  <Link href={`/builders/${project.builder.slug}`} className="font-semibold text-amber-700 hover:underline">
                    {project.builder.name}
                  </Link>
                </div>
              )}
              {project.total_units != null && (
                <div className="pt-3">
                  <p className="text-muted-foreground text-xs uppercase tracking-wider">Total Units</p>
                  <p className="font-semibold text-slate-900">{project.total_units} Residences</p>
                </div>
              )}
              {project.price_range_min != null && project.price_range_max != null && (
                <div className="pt-3">
                  <p className="text-muted-foreground text-xs uppercase tracking-wider">Price Range</p>
                  <p className="font-bold text-amber-600 text-base">
                    {formatPrice(project.price_range_min)} - {formatPrice(project.price_range_max)}
                  </p>
                </div>
              )}
              {project.possession_date && (
                <div className="pt-3">
                  <p className="text-muted-foreground text-xs uppercase tracking-wider">Possession Timeline</p>
                  <p className="flex items-center gap-1 font-semibold text-slate-900 mt-0.5">
                    <Calendar className="h-4 w-4 text-amber-600" />
                    {new Date(project.possession_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-3 pt-2">
              {project.brochure_url && (
                <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium" asChild>
                  <a href={project.brochure_url} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    Download E-Brochure
                  </a>
                </Button>
              )}
              <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold" asChild>
                <Link href="/contact">
                  <CalendarCheck className="mr-2 h-4 w-4" />
                  Schedule Free Site Visit
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}