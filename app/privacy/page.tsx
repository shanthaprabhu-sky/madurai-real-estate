import { COMPANY } from '@/lib/constants';

export const metadata = {
  title: 'Privacy Policy',
  description: `Privacy policy for ${COMPANY.name}.`,
};

export default function PrivacyPage() {
  return (
    <div className="container-page py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-IN')}</p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="text-lg font-semibold text-foreground">1. Introduction</h2>
            <p className="mt-2">{COMPANY.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a real estate platform serving Madurai, Tamil Nadu. We respect your privacy and are committed to protecting your personal data.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">2. Data We Collect</h2>
            <p className="mt-2">We collect the following types of data:</p>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li><strong>Contact information:</strong> Name, phone number, email address when you submit an enquiry or post a property.</li>
              <li><strong>Account information:</strong> Email, phone, and profile details when you create an account.</li>
              <li><strong>Usage data:</strong> Pages visited, properties viewed, searches saved, and IP address.</li>
              <li><li><strong>Property listings:</strong> Details and photos of properties you post.</li></li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">3. How We Use Your Data</h2>
            <ul className="mt-2 list-disc pl-6 space-y-1">
              <li>To display property listings and connect buyers with sellers.</li>
              <li>To respond to your enquiries and provide customer support.</li>
              <li>To send alerts about saved searches and new properties.</li>
              <li>To improve our services and user experience.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">4. Data Sharing</h2>
            <p className="mt-2">We do not sell your data. We share your contact information with property owners or agents only when you submit an enquiry on their listing. We may share data with service providers (SMS, email) who help us operate the platform.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">5. Data Security</h2>
            <p className="mt-2">We use industry-standard security measures including encryption, secure database storage, and access controls to protect your data.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">6. Your Rights</h2>
            <p className="mt-2">You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at {COMPANY.email}.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">7. Cookies</h2>
            <p className="mt-2">We use cookies to improve your browsing experience. You can accept or decline cookies through the cookie consent banner.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">8. Contact</h2>
            <p className="mt-2">For privacy-related questions, contact us at {COMPANY.email} or {COMPANY.address}.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
