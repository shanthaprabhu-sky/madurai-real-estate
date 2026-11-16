'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle2 } from 'lucide-react';

interface EnquiryFormProps {
  propertyId: string;
  propertyTitle: string;
  ownerPhone?: string | null;
}

export function EnquiryForm({ propertyId, propertyTitle, ownerPhone }: EnquiryFormProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;
    const preferredDate = formData.get('preferred_date') as string;
    const preferredTime = formData.get('preferred_time') as string;

    const { error } = await supabase.from('enquiries').insert({
      property_id: propertyId,
      name,
      email: email || null,
      phone,
      message: message || null,
      enquiry_type: preferredDate ? 'site_visit' : 'property',
      preferred_date: preferredDate || null,
      preferred_time: preferredTime || null,
    });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit enquiry. Please try again.',
        variant: 'destructive',
      });
    } else {
      setSubmitted(true);
      toast({
        title: 'Enquiry Sent!',
        description: 'The property owner will get back to you soon.',
      });
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border bg-green-50 p-8 text-center">
        <CheckCircle2 className="mb-3 h-12 w-12 text-green-600" />
        <h3 className="text-lg font-semibold text-green-700">Enquiry Sent!</h3>
        <p className="mt-1 text-sm text-green-600">
          Thank you for your interest. We will contact you shortly.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => setSubmitted(false)}
        >
          Send Another Enquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Full Name *</Label>
        <Input id="name" name="name" required placeholder="Your name" className="mt-1.5" />
      </div>
      <div>
        <Label htmlFor="phone">Phone Number *</Label>
        <Input id="phone" name="phone" required type="tel" placeholder="98765 43210" className="mt-1.5" />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="your@email.com" className="mt-1.5" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="preferred_date">Preferred Date</Label>
          <Input id="preferred_date" name="preferred_date" type="date" className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="preferred_time">Preferred Time</Label>
          <Input id="preferred_time" name="preferred_time" type="time" className="mt-1.5" />
        </div>
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder={`I'm interested in "${propertyTitle}". Please contact me.`}
          className="mt-1.5"
          rows={3}
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Send Enquiry
      </Button>
      {ownerPhone && (
        <p className="text-center text-xs text-muted-foreground">
          Or contact the owner directly at {ownerPhone}
        </p>
      )}
    </form>
  );
}
