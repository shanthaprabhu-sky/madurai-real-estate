'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle2, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { COMPANY } from '@/lib/constants';

function ContactForm() {
  const searchParams = useSearchParams();
  const defaultMessage = searchParams.get('message') || '';

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name') as string,
          email: formData.get('email') as string,
          phone: formData.get('phone') as string,
          message: formData.get('message') as string,
        }),
      });

      if (!res.ok) throw new Error();

      setSubmitted(true);
      toast({ title: 'Message Sent!', description: 'We will get back to you soon.' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to send message.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle2 className="mb-3 h-12 w-12 text-green-600" />
        <h3 className="text-lg font-semibold text-green-700">Message Sent!</h3>
        <p className="mt-1 text-sm text-green-600">We will get back to you shortly.</p>
        <Button variant="outline" className="mt-4" onClick={() => setSubmitted(false)}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="font-semibold">Send a Message</h3>
      <div>
        <Label htmlFor="name">Name *</Label>
        <Input id="name" name="name" required className="mt-1.5" />
      </div>
      <div>
        <Label htmlFor="phone">Phone *</Label>
        <Input id="phone" name="phone" required type="tel" className="mt-1.5" />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" className="mt-1.5" />
      </div>
      <div>
        <Label htmlFor="message">Message *</Label>
        <Textarea 
          id="message" 
          name="message" 
          required 
          rows={4} 
          defaultValue={defaultMessage}
          placeholder="Enter your message or inquiry..." 
          className="mt-1.5" 
        />
      </div>
      <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Send Message
      </Button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <div className="container-page py-12">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">Contact Us</h1>
        <p className="mt-3 text-muted-foreground">
          Have questions about properties in Madurai? We're here to help.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-4 font-semibold">Get in Touch</h3>
            <div className="space-y-3">
              <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-3 text-sm hover:text-primary">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="font-medium">{COMPANY.phone}</p>
                </div>
              </a>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 text-sm hover:text-primary">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-medium">{COMPANY.email}</p>
                </div>
              </a>
              <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm hover:text-primary">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">WhatsApp</p>
                  <p className="font-medium">Chat with us</p>
                </div>
              </a>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Address</p>
                  <p className="font-medium">{COMPANY.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border">
            <iframe
              width="100%"
              height="250"
              loading="lazy"
              src="https://www.google.com/maps?q=Madurai,Tamil+Nadu&z=12&output=embed"
              title="Our Location"
            />
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <Suspense fallback={<div className="flex justify-center py-10"><Loader2 className="h-6 w-6 animate-spin text-amber-500" /></div>}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}