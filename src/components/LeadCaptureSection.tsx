import React, { useState } from 'react';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';

export const LeadCaptureSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
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

    try {
      const existing = JSON.parse(localStorage.getItem('captured_leads') || '[]');
      existing.push({ email: trimmed, date: new Date().toISOString() });
      localStorage.setItem('captured_leads', JSON.stringify(existing));
    } catch {
      // Fallback
    }

    setError('');
    setSubmitted(true);
  };

  return (
    <section className="w-full max-w-[980px] mx-auto px-4 sm:px-6 pt-2 pb-8 sm:pb-10">
      {/* 3px Top Divider */}
      <div className="w-full h-[3px] bg-black mb-6" />

      <div className="bg-neutral-50 border border-neutral-200 p-6 sm:p-8 text-center max-w-[680px] mx-auto rounded-xs">
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-4 animate-in fade-in duration-300">
            <CheckCircle className="w-12 h-12 text-emerald-600 mb-3" />
            <h3 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
              You&apos;re on the insider list!
            </h3>
            <p className="mt-2 text-sm text-neutral-600 max-w-md">
              Thank you for subscribing. We&apos;ll send the best luxury beauty mini drops and exclusive flash sale alerts directly to <span className="font-semibold text-black">{email}</span>.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setEmail('');
              }}
              className="mt-6 text-xs text-neutral-500 hover:text-black underline cursor-pointer"
            >
              Subscribe another email
            </button>
          </div>
        ) : (
          <div>
            <div className="w-10 h-10 mx-auto mb-4 rounded-full bg-black text-white flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
              Get Rare Mini Beauty Drops
            </h3>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-neutral-600 max-w-lg mx-auto leading-relaxed">
              Never miss a cult-favorite mini restock, French pharmacy gem, or limited-time luxury skincare deal.
            </p>

            {/* Email-Only Lead Capture Form */}
            <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 max-w-md mx-auto" noValidate>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter your email address"
                  className="flex-1 bg-white border border-neutral-300 px-4 py-3.5 text-sm text-black placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors"
                  aria-label="Email address"
                  required
                />
                <button
                  type="submit"
                  className="bg-black text-white hover:bg-neutral-800 active:scale-[0.99] transition-all px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {error && (
                <p className="mt-2 text-xs text-red-600 text-left font-medium">
                  {error}
                </p>
              )}

              <p className="mt-3 text-[11px] text-neutral-400">
                Instant delivery. Zero spam. Unsubscribe anytime in one click.
              </p>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
