import { supabase } from '@/lib/supabase/client';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, FileCheck, Calendar, Download, MapPin, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PropertyCard } from '@/components/property/property-card';
import type { Builder, Project, PropertyWithRelations } from '@/lib/types';

export const revalidate = 3600;

interface PageProps {
  params: { slug: string };
}

async function getBuilder(slug: string) {
  const { data } = await supabase
    .from('builders')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  return data as Builder | null;
}

async function getProjects(builderId: string) {
  const { data } = await supabase
    .from('projects')
    .select(`
      *,
      locality:localities(*)
    `)
    .eq('builder_id', builderId)
    .order('created_at', { ascending: false });
  return (data ?? []) as (Project & { locality: { name: string } | null })[];
}

async function getPropertiesByBuilder(builderId: string) {
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
    .eq('builder_id', builderId)
    .eq('status', 'active')
    .limit(6);
  return (data ?? []) as unknown as PropertyWithRelations[];
}

export async function generateMetadata({ params }: PageProps) {
  const builder = await getBuilder(params.slug);
  if (!builder) return { title: 'Builder Not Found' };
  return { title: `${builder.name} — Projects in Madurai`, description: builder.description ?? '' };
}

export default async function BuilderDetailPage({ params }: PageProps) {
  const builder = await getBuilder(params.slug);
  if (!builder) notFound();

  const [projects, properties] = await Promise.all([
    getProjects(builder.id),
    getPropertiesByBuilder(builder.id),
  ]);

  return (
    <div className="container-page py-8">
      <Link href="/builders" className="mb-4 inline-flex items-center gap-1 text-sm text-primary hover:underline">
        <ArrowLeft className="h-4 w-4" />
        All Builders
      </Link>

      <div className="flex items-start gap-6">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Building2 className="h-10 w-10" />
        </div>
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">{builder.name}</h1>
          {builder.rera_registration && (
            <Badge className="mt-2 bg-green-600">
              <FileCheck className="mr-1 h-3 w-3" />
              RERA: {builder.rera_registration}
            </Badge>
          )}
          {builder.description && (
            <p className="mt-3 max-w-2xl text-muted-foreground">{builder.description}</p>
          )}
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
            {builder.phone && <span>{builder.phone}</span>}
            {builder.email && <span>{builder.email}</span>}
            {builder.address && <span>{builder.address}</span>}
          </div>
        </div>
      </div>

      {projects.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">Projects</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group rounded-lg border bg-card p-6 transition-all hover:shadow-md"
              >
                <h3 className="text-lg font-semibold group-hover:text-primary">{project.name}</h3>
                {project.locality?.name && (
                  <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {project.locality.name}
                  </p>
                )}
                {project.description && (
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{project.description}</p>
                )}
                <div className="mt-3 flex flex-wrap gap-3 text-xs">
                  <Badge variant="outline" className="capitalize">{project.status}</Badge>
                  {project.total_units && <span className="text-muted-foreground">{project.total_units} units</span>}
                  {project.possession_date && (
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(project.possession_date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {properties.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">Available Properties</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
