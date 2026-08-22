import React, { useState } from 'react';
import { Mail, ShieldAlert, ShieldCheck, Search } from 'lucide-react';
import { DomainCheckResult } from '../types';

export const DomainEmailVerifier: React.FC = () => {
  const [inputQuery, setInputQuery] = useState('');
  const [claimedCompany, setClaimedCompany] = useState('');
  const [checkResult, setCheckResult] = useState<DomainCheckResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleVerify = async (queryToTest?: string, companyToTest?: string) => {
    const val = queryToTest !== undefined ? queryToTest : inputQuery;
    const comp = companyToTest !== undefined ? companyToTest : claimedCompany;

    if (!val.trim()) {
      setErrorMessage('Please enter an email address or website domain.');
      return;
    }

    setErrorMessage(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/verify-domain-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: val.trim(), claimedCompany: comp.trim() }),
      });

      if (!response.ok) {
        throw new Error('Failed to verify domain/email.');
      }

      const data: DomainCheckResult = await response.json();
      setCheckResult(data);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error communicating with verification service.');
    } finally {
      setIsLoading(false);
    }
  };

  const runQuickTest = (emailOrUrl: string, company: string) => {
    setInputQuery(emailOrUrl);
    setClaimedCompany(company);
    handleVerify(emailOrUrl, company);
  };

  return (
    <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-5 sm:p-7 space-y-6" id="domain-verifier-card">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-3">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs font-semibold mb-2">
            <Mail className="w-3.5 h-3.5" />
            <span>Recruiter Channel Security</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Recruiter Email & Domain Authenticity Checker</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Quickly test recruiter email addresses or domain links to detect free webmail scams, spoofed domains, and unverified chat portals.
          </p>
        </div>

        {/* Preset quick test badges */}
        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mr-1">Quick Test:</span>
          <button
            type="button"
            id="btn-test-fake-email"
            onClick={() => runQuickTest('hr_recruitment_team@gmail.com', 'Microsoft')}
            className="text-[11px] px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 dark:bg-rose-500/15 dark:text-rose-300 dark:border-rose-500/30 dark:hover:bg-rose-500/25 transition-colors cursor-pointer"
          >
            Spoofed Gmail
          </button>
          <button
            type="button"
            id="btn-test-telegram-link"
            onClick={() => runQuickTest('https://t.me/hr_daily_task_bot', 'Global Tasks')}
            className="text-[11px] px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30 dark:hover:bg-amber-500/25 transition-colors cursor-pointer"
          >
            Telegram Bot Link
          </button>
          <button
            type="button"
            id="btn-test-real-email"
            onClick={() => runQuickTest('talent-acquisition@microsoft.com', 'Microsoft')}
            className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30 dark:hover:bg-emerald-500/25 transition-colors cursor-pointer"
          >
            Official Enterprise
          </button>
        </div>
      </div>

      {/* Form Input Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-7 space-y-1">
          <label htmlFor="input-verify-channel" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Recruiter Email or URL <span className="text-rose-500">*</span>
          </label>
          <div className="relative rounded-xl shadow-xs">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="text"
              id="input-verify-channel"
              value={inputQuery}
              onChange={(e) => {
                setInputQuery(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="e.g. recruiter@company.com, hr-team@gmail.com, or https://careers.company.com"
              className="block w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-950 transition-all"
            />
          </div>
        </div>

        <div className="sm:col-span-3 space-y-1">
          <label htmlFor="input-claimed-company" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Claimed Company <span className="text-slate-400 dark:text-slate-500 font-normal">(Optional)</span>
          </label>
          <input
            type="text"
            id="input-claimed-company"
            value={claimedCompany}
            onChange={(e) => setClaimedCompany(e.target.value)}
            placeholder="e.g. Microsoft, Google"
            className="block w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-950 transition-all"
          />
        </div>

        <div className="sm:col-span-2 flex items-end">
          <button
            type="button"
            id="btn-verify-domain"
            onClick={() => handleVerify()}
            disabled={isLoading || !inputQuery.trim()}
            className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            {isLoading ? (
              <span>Checking...</span>
            ) : (
              <>
                <Search className="w-3.5 h-3.5" />
                <span>Verify</span>
              </>
            )}
          </button>
        </div>
      </div>

      {errorMessage && (
        <p className="text-xs text-rose-600 dark:text-rose-400">{errorMessage}</p>
      )}

      {/* Result Display Box */}
      {checkResult && (
        <div
          id="domain-check-verdict"
          className={`p-4 rounded-xl border animate-in fade-in duration-200 space-y-2.5 ${
            checkResult.isSuspicious
              ? 'bg-rose-50 border-rose-200 text-rose-900 dark:bg-rose-950/40 dark:border-rose-800/80 dark:text-rose-200'
              : 'bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-800/80 dark:text-emerald-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 font-bold text-sm">
              {checkResult.isSuspicious ? (
                <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              ) : (
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              )}
              <span className={checkResult.isSuspicious ? 'text-rose-700 dark:text-rose-300' : 'text-emerald-700 dark:text-emerald-300'}>
                {checkResult.statusText}
              </span>
            </div>
            <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              Query: {checkResult.input}
            </span>
          </div>

          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <strong className="text-slate-900 dark:text-white">Analysis:</strong> {checkResult.reason}
          </p>

          <div className="pt-1.5 border-t border-slate-200 dark:border-slate-800/60 flex items-start space-x-2 text-xs">
            <span className="font-semibold text-indigo-700 dark:text-indigo-300 shrink-0">Recommendation:</span>
            <span className="text-slate-600 dark:text-slate-300">{checkResult.recommendation}</span>
          </div>
        </div>
      )}
    </div>
  );
};
