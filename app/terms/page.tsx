import { COMPANY } from '@/lib/constants';

export const metadata = {
  title: 'Terms of Service',
  description: `Terms and conditions for using ${COMPANY.name}.`,
};

export default function TermsPage() {
  return (
    <div className="container-page py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold">Terms of Service</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-IN')}</p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-lg font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p className="mt-2">By accessing or using {COMPANY.name}, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">2. Platform Description</h2>
            <p className="mt-2">{COMPANY.name} is an online platform that connects property buyers, tenants, sellers, and agents in Madurai, Tamil Nadu. We facilitate listings and enquiries but do not directly participate in transactions.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">3. User Responsibilities</h2>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>Provide accurate and truthful information when posting properties or making enquiries.</li>
              <li>Do not post false, misleading, or fraudulent listings.</li>
              <li>Respect intellectual property rights of others.</li>
              <li>Do not use the platform for any illegal activities.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">4. Property Listings</h2>
            <p className="mt-2">All listings are posted by users. While we verify listings marked with a &ldquo;Verified&rdquo; badge, we do not guarantee the accuracy of all information. Buyers should conduct their own due diligence before making any purchase.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">5. Limitation of Liability</h2>
            <p className="mt-2">{COMPANY.name} is not liable for any disputes, losses, or damages arising from transactions between users. We provide the platform as-is without warranties of any kind.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">6. RERA Compliance</h2>
            <p className="mt-2">Our RERA registration number is {COMPANY.reraRegistration}. We comply with all applicable real estate regulations in Tamil Nadu.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">7. Account Termination</h2>
            <p className="mt-2">We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activity.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">8. Contact</h2>
            <p className="mt-2">For questions about these terms, contact us at {COMPANY.email} or {COMPANY.address}.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
