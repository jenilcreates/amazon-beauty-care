import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle, ArrowRight, Lock } from 'lucide-react';
import { getAccessToken, initAuth } from '../services/googleAuth';
import { appendEmailToSheet } from '../services/googleSheets';

interface LeadCaptureSectionProps {
  onOpenAdmin?: () => void;
}

export const LeadCaptureSection: React.FC<LeadCaptureSectionProps> = ({ onOpenAdmin }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = initAuth(
      (_user, token) => {
        setAccessToken(token);
      },
      () => {
        setAccessToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setError('Please enter a valid email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    let synced = false;

    // 1. Silent background sync to Google Sheets if authenticated
    try {
      const token = accessToken || (await getAccessToken());
      if (token) {
        const sheetRes = await appendEmailToSheet(token, trimmed);
        if (sheetRes.success) {
          synced = true;
        }
      }
    } catch {
      // Silent catch - don't disrupt user's subscription experience
    }

    // 2. Also check if custom webhook URL is configured for Google Sheets
    try {
      const webhookUrl = localStorage.getItem('google_sheet_webhook_url');
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: trimmed, date: new Date().toISOString() }),
        });
        synced = true;
      }
    } catch {
      // Silent catch
    }

    // 3. Save to persistent leads storage
    try {
      const existing = JSON.parse(localStorage.getItem('captured_leads') || '[]');
      existing.push({
        email: trimmed,
        date: new Date().toISOString(),
        syncedToGoogleSheet: synced,
      });
      localStorage.setItem('captured_leads', JSON.stringify(existing));
    } catch (storageErr) {
      console.error(storageErr);
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section className="w-full max-w-[980px] mx-auto px-4 sm:px-6 pt-2 pb-8 sm:pb-10">
      {/* 3px Top Divider */}
      <div className="w-full h-[3px] bg-black mb-6" />

      <div className="relative bg-neutral-50 border border-neutral-200 p-6 sm:p-8 text-center max-w-[680px] mx-auto rounded-xs">
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-4 animate-in fade-in duration-300">
            <CheckCircle className="w-11 h-11 text-emerald-600 mb-2.5" />
            <h3 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
              You&apos;re subscribed!
            </h3>
            <p className="mt-1 text-sm text-neutral-600">
              Thank you for subscribing to our beauty insider list.
            </p>

            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setEmail('');
              }}
              className="mt-5 text-xs text-neutral-500 hover:text-black underline cursor-pointer"
            >
              Subscribe another email
            </button>
          </div>
        ) : (
          <div>
            <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-black text-white flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight uppercase">
              SUBSCRIBE NOW
            </h3>

            {/* Email-Only Lead Capture Form */}
            <form onSubmit={handleSubmit} className="mt-5 max-w-md mx-auto" noValidate>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter your email address"
                  className="flex-1 bg-white border border-neutral-300 px-4 py-3 text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors"
                  aria-label="Email address"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-black text-white hover:bg-neutral-800 disabled:opacity-50 active:scale-[0.99] transition-all px-7 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>{isSubmitting ? 'Saving...' : 'Subscribe'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {error && (
                <p className="mt-2 text-xs text-red-600 text-left font-medium">
                  {error}
                </p>
              )}
            </form>
          </div>
        )}

        {/* Discreet Owner / Admin Sheet Controls Trigger */}
        {onOpenAdmin && (
          <button
            type="button"
            onClick={onOpenAdmin}
            title="Owner Settings & Google Sheet Leads"
            className="absolute bottom-2 right-2 p-1.5 text-neutral-300 hover:text-neutral-600 transition-colors opacity-40 hover:opacity-100 cursor-pointer"
            aria-label="Open sheet settings"
          >
            <Lock className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </section>
  );
};
