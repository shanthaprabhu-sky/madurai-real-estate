import { Building2, Target, Heart, ShieldCheck, Users, Award } from 'lucide-react';
import { COMPANY } from '@/lib/constants';

export const metadata = {
  title: 'About Us',
  description: `Learn about ${COMPANY.name}, Madurai's trusted real estate platform.`,
};

export default function AboutPage() {
  const values = [
    { icon: ShieldCheck, title: 'Trust & Transparency', desc: 'We verify every listing and maintain complete transparency in all dealings.' },
    { icon: Heart, title: 'Customer First', desc: 'Your needs come first. We go the extra mile to help you find the right property.' },
    { icon: Award, title: 'Excellence', desc: 'We strive for excellence in service quality, technology, and user experience.' },
    { icon: Users, title: 'Community', desc: 'We build lasting relationships with buyers, sellers, and agents in Madurai.' },
  ];

  return (
    <div className="container-page py-12">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <Building2 className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-3xl font-bold sm:text-4xl">About {COMPANY.name}</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We are Madurai's leading real estate platform, connecting buyers, tenants, and property owners across the Temple City. Since our founding, we have helped hundreds of families find their dream homes and investment properties.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value) => (
          <div key={value.title} className="rounded-lg border bg-card p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <value.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 font-semibold">{value.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{value.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl bg-muted/30 p-8">
        <h2 className="text-2xl font-bold">Our Mission</h2>
        <p className="mt-3 text-muted-foreground">
          To make property buying, selling, and renting in Madurai simple, transparent, and accessible to everyone. We leverage technology to provide verified listings, detailed property information, and easy-to-use tools that help you make informed decisions.
        </p>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        <div className="rounded-lg border bg-card p-6 text-center">
          <p className="text-3xl font-bold text-primary">500+</p>
          <p className="mt-1 text-sm text-muted-foreground">Properties Listed</p>
        </div>
        <div className="rounded-lg border bg-card p-6 text-center">
          <p className="text-3xl font-bold text-primary">1000+</p>
          <p className="mt-1 text-sm text-muted-foreground">Happy Customers</p>
        </div>
        <div className="rounded-lg border bg-card p-6 text-center">
          <p className="text-3xl font-bold text-primary">6+</p>
          <p className="mt-1 text-sm text-muted-foreground">Localities Covered</p>
        </div>
      </div>
    </div>
  );
}
