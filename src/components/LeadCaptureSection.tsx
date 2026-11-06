import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle, ArrowRight, ExternalLink, Sheet, RefreshCw } from 'lucide-react';
import { googleSignIn, getAccessToken, initAuth, logout } from '../services/googleAuth';
import { appendEmailToSheet, getStoredSpreadsheetId } from '../services/googleSheets';
import type { User } from 'firebase/auth';

export const LeadCaptureSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Google Sheets Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isConnectingGoogle, setIsConnectingGoogle] = useState(false);
  const [sheetUrl, setSheetUrl] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  useEffect(() => {
    // Check if a spreadsheet ID was previously created
    const storedId = getStoredSpreadsheetId();
    if (storedId) {
      setSheetUrl(`https://docs.google.com/spreadsheets/d/${storedId}`);
    }

    const unsubscribe = initAuth(
      (user, token) => {
        setCurrentUser(user);
        setAccessToken(token);
      },
      () => {
        setCurrentUser(null);
        setAccessToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleConnectGoogle = async () => {
    setIsConnectingGoogle(true);
    setError('');
    try {
      const res = await googleSignIn();
      if (res) {
        setCurrentUser(res.user);
        setAccessToken(res.accessToken);

        // Sync any locally stored leads that haven't been sent yet
        const existingLeads = JSON.parse(localStorage.getItem('captured_leads') || '[]');
        if (existingLeads.length > 0) {
          setSyncStatus(`Syncing ${existingLeads.length} stored lead(s) to Google Sheets...`);
          let syncedCount = 0;
          for (const item of existingLeads) {
            const r = await appendEmailToSheet(res.accessToken, item.email);
            if (r.success) {
              syncedCount++;
              setSheetUrl(r.spreadsheetUrl);
            }
          }
          setSyncStatus(`Successfully synced ${syncedCount} lead(s) to Google Sheets!`);
          setTimeout(() => setSyncStatus(null), 4000);
        }
      }
    } catch (err: any) {
      console.error('Google connect error:', err);
      setError('Could not connect to Google Sheets. Please ensure popup is allowed.');
    } finally {
      setIsConnectingGoogle(false);
    }
  };

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

    // 1. Save locally so lead is never lost
    try {
      const existing = JSON.parse(localStorage.getItem('captured_leads') || '[]');
      existing.push({ email: trimmed, date: new Date().toISOString() });
      localStorage.setItem('captured_leads', JSON.stringify(existing));
    } catch (storageErr) {
      console.error(storageErr);
    }

    // 2. If Google access token is present, append to Google Sheet directly
    const token = accessToken || (await getAccessToken());
    if (token) {
      try {
        const sheetRes = await appendEmailToSheet(token, trimmed);
        if (sheetRes.success) {
          setSheetUrl(sheetRes.spreadsheetUrl);
        }
      } catch (sheetErr) {
        console.error('Error writing to Google Sheet:', sheetErr);
      }
    }

    setIsSubmitting(false);
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
              You&apos;re subscribed!
            </h3>
            <p className="mt-2 text-sm text-neutral-600">
              <span className="font-semibold text-black">{email}</span> has been successfully collected.
            </p>

            {sheetUrl && (
              <a
                href={sheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded border border-emerald-200 hover:bg-emerald-100 transition-colors"
              >
                <Sheet className="w-4 h-4" />
                <span>Saved to Google Sheet &quot;Beauty Minis Subscriber Leads&quot;</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

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

        {/* Google Sheets Sync Integration Bar for Owner / Admin */}
        <div className="mt-6 pt-4 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-neutral-600">
            <Sheet className="w-4 h-4 text-emerald-600" />
            {currentUser ? (
              <span className="text-neutral-700">
                Connected as <strong className="text-black">{currentUser.email}</strong>
              </span>
            ) : (
              <span className="text-neutral-500">
                Google Sheets integration ready
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {currentUser ? (
              <>
                {sheetUrl && (
                  <a
                    href={sheetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-emerald-700 hover:text-emerald-800 underline mr-2"
                  >
                    <span>Open Leads Sheet</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => logout()}
                  className="text-neutral-400 hover:text-neutral-700 underline text-[11px] cursor-pointer"
                >
                  Disconnect
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleConnectGoogle}
                disabled={isConnectingGoogle}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-neutral-300 hover:border-black text-black font-medium rounded-xs shadow-2xs hover:bg-neutral-50 transition-colors cursor-pointer text-xs"
              >
                <Sheet className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isConnectingGoogle ? 'Connecting...' : 'Connect Google Sheet'}</span>
              </button>
            )}
          </div>
        </div>

        {syncStatus && (
          <p className="mt-2 text-xs text-emerald-700 font-medium animate-in fade-in flex items-center justify-center gap-1">
            <RefreshCw className="w-3 h-3 animate-spin" />
            <span>{syncStatus}</span>
          </p>
        )}
      </div>
    </section>
  );
};
