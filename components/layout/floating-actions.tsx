'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X, Cookie } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { COMPANY } from '@/lib/constants';

export function FloatingActions() {
  const [showCookie, setShowCookie] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) setShowCookie(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowCookie(false);
  };

  return (
    <>
      <a
        href={`https://wa.me/${COMPANY.whatsapp}?text=Hi, I'm interested in properties in Madurai`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>

      {showCookie && (
        <div className="fixed bottom-6 left-6 z-50 max-w-sm rounded-lg border bg-background p-4 shadow-lg">
          <div className="flex items-start gap-3">
            <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">
                We use cookies to improve your experience. By continuing, you agree to our cookie policy.
              </p>
              <div className="mt-3 flex gap-2">
                <Button size="sm" onClick={acceptCookies}>Accept</Button>
                <Button size="sm" variant="outline" onClick={() => setShowCookie(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
