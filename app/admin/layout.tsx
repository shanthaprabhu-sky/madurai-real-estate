import Link from 'next/link';
import { LayoutDashboard, Building2, Users, FileText, Settings } from 'lucide-react';

const ADMIN_NAV = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Properties', href: '/admin/properties', icon: Building2 },
  { name: 'Leads & Inquiries', href: '/admin/leads', icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <aside className="hidden border-r bg-card lg:block">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-primary">
            <Building2 className="h-6 w-6" />
            <span>Madurai Realtors Admin</span>
          </Link>
        </div>
        <div className="space-y-1 p-4">
          {ADMIN_NAV.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex min-h-screen flex-col bg-muted/20">
        <header className="flex h-16 items-center justify-between border-b bg-card px-6">
          <h1 className="text-lg font-semibold">Admin Management Center</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground">Admin User</span>
          </div>
        </header>
        <div className="flex-1 p-6">{children}</div>
      </main>
    </div>
  );
}