import React, { useState, useEffect } from 'react';
import { X, Sheet, Download, RefreshCw, ExternalLink, Check, AlertCircle } from 'lucide-react';
import { googleSignIn, getAccessToken, initAuth, logout } from '../services/googleAuth';
import { appendEmailToSheet, getStoredSpreadsheetId } from '../services/googleSheets';
import type { User } from 'firebase/auth';

interface StoredLead {
  email: string;
  date: string;
  syncedToGoogleSheet?: boolean;
}

interface AdminLeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLeadsModal: React.FC<AdminLeadsModalProps> = ({ isOpen, onClose }) => {
  const [leads, setLeads] = useState<StoredLead[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [sheetUrl, setSheetUrl] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<{ text: string; isError?: boolean } | null>(null);
  const [webhookUrl, setWebhookUrl] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    // Load stored leads
    try {
      const stored = JSON.parse(localStorage.getItem('captured_leads') || '[]');
      setLeads(stored);
    } catch {
      setLeads([]);
    }

    // Load sheet URL
    const storedId = getStoredSpreadsheetId();
    if (storedId) {
      setSheetUrl(`https://docs.google.com/spreadsheets/d/${storedId}`);
    }

    // Load webhook URL if any
    const storedWebhook = localStorage.getItem('google_sheet_webhook_url') || '';
    setWebhookUrl(storedWebhook);

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
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConnectGoogle = async () => {
    setIsConnecting(true);
    setStatusMsg(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setCurrentUser(res.user);
        setAccessToken(res.accessToken);
        setStatusMsg({ text: 'Google Account successfully connected.' });
      }
    } catch (err: any) {
      setStatusMsg({ text: 'Google Sign-in failed. Please try again.', isError: true });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSyncAll = async () => {
    const token = accessToken || (await getAccessToken());
    if (!token && !webhookUrl) {
      setStatusMsg({ text: 'Please connect Google Account or provide Webhook URL first.', isError: true });
      return;
    }

    setIsSyncing(true);
    setStatusMsg({ text: `Syncing ${leads.length} lead(s) to Google Sheets...` });

    let successCount = 0;
    const updated = [...leads];

    for (let i = 0; i < updated.length; i++) {
      const item = updated[i];
      try {
        if (token) {
          const res = await appendEmailToSheet(token, item.email);
          if (res.success) {
            item.syncedToGoogleSheet = true;
            successCount++;
            setSheetUrl(res.spreadsheetUrl);
          }
        }
        if (webhookUrl) {
          await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: item.email, date: item.date }),
          });
          item.syncedToGoogleSheet = true;
          successCount++;
        }
      } catch (e) {
        console.error(e);
      }
    }

    localStorage.setItem('captured_leads', JSON.stringify(updated));
    setLeads(updated);
    setIsSyncing(false);
    setStatusMsg({ text: `Successfully synced ${successCount} entries to Google Sheets!` });
  };

  const handleSaveWebhook = () => {
    localStorage.setItem('google_sheet_webhook_url', webhookUrl.trim());
    setStatusMsg({ text: 'Custom Google Sheet Webhook saved!' });
    setTimeout(() => setStatusMsg(null), 3000);
  };

  const handleExportCSV = () => {
    if (leads.length === 0) {
      setStatusMsg({ text: 'No leads to export yet.', isError: true });
      return;
    }
    const headers = 'Email,Date,Source\n';
    const rows = leads
      .map(
        (l) =>
          `"${l.email}","${new Date(l.date).toLocaleString()}","Beauty Minis Landing Page"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `beauty_minis_leads_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-black rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Sheet className="w-6 h-6 text-emerald-600" />
          <h2 className="text-xl font-bold text-black">
            Lead Collection & Google Sheets Manager
          </h2>
        </div>
        <p className="text-xs text-neutral-500 mb-6">
          Manage your subscriber database. Website visitors will never see this admin panel.
        </p>

        {/* Google Sheets Connection Status */}
        <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-xs mb-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Google Sheets Integration
              </p>
              <p className="text-sm font-medium text-black mt-0.5">
                {currentUser ? (
                  <span className="text-emerald-700">
                    Connected as {currentUser.email}
                  </span>
                ) : (
                  <span className="text-neutral-600">
                    Not connected to Google
                  </span>
                )}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {currentUser ? (
                <>
                  {sheetUrl && (
                    <a
                      href={sheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white text-xs font-medium rounded-xs hover:bg-emerald-700 transition-colors"
                    >
                      <span>Open Google Sheet</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => logout()}
                    className="px-3 py-1.5 border border-neutral-300 text-neutral-600 text-xs hover:bg-neutral-100 transition-colors cursor-pointer"
                  >
                    Disconnect
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleConnectGoogle}
                  disabled={isConnecting}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-all cursor-pointer"
                >
                  <Sheet className="w-4 h-4 text-emerald-400" />
                  <span>{isConnecting ? 'Connecting...' : 'Connect Google Account'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Optional Webhook for custom automation (Make / Apps Script) */}
          <div className="mt-4 pt-3 border-t border-neutral-200 flex flex-col sm:flex-row gap-2 items-center">
            <input
              type="url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="Optional: Google Apps Script or Sheet Webhook URL"
              className="flex-1 w-full bg-white border border-neutral-300 px-3 py-1.5 text-xs text-black placeholder:text-neutral-400 focus:outline-none focus:border-black"
            />
            <button
              type="button"
              onClick={handleSaveWebhook}
              className="px-3 py-1.5 bg-neutral-200 text-neutral-800 hover:bg-neutral-300 text-xs font-medium cursor-pointer shrink-0"
            >
              Save URL
            </button>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-black">
              Total Captured Emails: {leads.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSyncAll}
              disabled={isSyncing || leads.length === 0}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 text-white text-xs font-semibold hover:bg-black disabled:opacity-50 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>Sync All to Sheet</span>
            </button>

            <button
              type="button"
              onClick={handleExportCSV}
              disabled={leads.length === 0}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-neutral-300 hover:bg-neutral-50 text-neutral-800 text-xs font-semibold transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {statusMsg && (
          <div
            className={`p-3 text-xs mb-4 flex items-center gap-2 rounded-xs ${
              statusMsg.isError
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            }`}
          >
            {statusMsg.isError ? (
              <AlertCircle className="w-4 h-4 shrink-0" />
            ) : (
              <Check className="w-4 h-4 shrink-0" />
            )}
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* Leads Table */}
        <div className="border border-neutral-200 overflow-hidden rounded-xs max-h-60 overflow-y-auto">
          {leads.length === 0 ? (
            <div className="p-8 text-center text-xs text-neutral-400">
              No emails captured yet. Test the subscription form on the landing page!
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-100 text-neutral-700 uppercase tracking-wider font-semibold border-b border-neutral-200">
                <tr>
                  <th className="p-2.5">Email Address</th>
                  <th className="p-2.5">Date Captured</th>
                  <th className="p-2.5">Google Sheet Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {leads.map((item, index) => (
                  <tr key={index} className="hover:bg-neutral-50">
                    <td className="p-2.5 font-medium text-black">{item.email}</td>
                    <td className="p-2.5 text-neutral-500">
                      {new Date(item.date).toLocaleString()}
                    </td>
                    <td className="p-2.5">
                      {item.syncedToGoogleSheet ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                          <Check className="w-3.5 h-3.5" />
                          <span>Synced</span>
                        </span>
                      ) : (
                        <span className="text-amber-600">Pending sync</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
