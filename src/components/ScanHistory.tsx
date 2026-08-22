import React from 'react';
import { History, ShieldAlert, ShieldCheck, Trash2, ArrowRight, Clock, Building2, Banknote } from 'lucide-react';
import { HistoryItem } from '../types';

interface ScanHistoryProps {
  history: HistoryItem[];
  onSelectHistory: (item: HistoryItem) => void;
  onClearHistory: () => void;
}

export const ScanHistory: React.FC<ScanHistoryProps> = ({
  history,
  onSelectHistory,
  onClearHistory,
}) => {
  if (history.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center space-y-3 shadow-xs" id="empty-history-container">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 mx-auto">
          <History className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white">No Scan History Yet</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          Every job posting you analyze during this session will be recorded here for instant review, safety comparisons, and audits.
        </p>
      </div>
    );
  }

  const fakeCount = history.filter((h) => h.result.classification === 'FAKE').length;
  const realCount = history.length - fakeCount;

  return (
    <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 space-y-6 shadow-xs" id="scan-history-card">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <History className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Session Analysis Log & Audits</h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Compare past analyzed postings, review detection explanations, or re-open full diagnostics.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30 font-medium">
              {realCount} Real
            </span>
            <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/30 font-medium">
              {fakeCount} Fake
            </span>
          </div>

          <button
            type="button"
            id="btn-clear-history"
            onClick={onClearHistory}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 border border-slate-200 text-slate-500 hover:text-rose-600 hover:border-rose-200 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-400 dark:hover:text-rose-400 dark:hover:border-rose-500/30 transition-colors cursor-pointer"
            title="Clear all session history"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {history.map((item) => {
          const isFake = item.result.classification === 'FAKE';
          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 transition-all ${
                isFake
                  ? 'bg-rose-50/40 border-rose-200 hover:border-rose-300 dark:bg-slate-950/90 dark:border-rose-500/30 dark:hover:border-rose-500/60'
                  : 'bg-emerald-50/40 border-emerald-200 hover:border-emerald-300 dark:bg-slate-950/90 dark:border-emerald-500/30 dark:hover:border-emerald-500/60'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                      isFake
                        ? 'bg-rose-100 text-rose-800 border border-rose-200 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/40'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/40'
                    }`}
                  >
                    {isFake ? <ShieldAlert className="w-3 h-3" /> : <ShieldCheck className="w-3 h-3" />}
                    <span>{isFake ? 'FAKE JOB' : 'REAL JOB'}</span>
                  </span>

                  <span className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" />
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                    {item.input.jobTitle || 'Untitled Position'}
                  </h4>
                  <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                      <Building2 className="w-3 h-3 text-slate-400" />
                      {item.input.companyName || 'Unspecified Company'}
                    </span>
                    {item.input.salary && (
                      <>
                        <span className="text-slate-300 dark:text-slate-700">•</span>
                        <span className="text-indigo-600 dark:text-indigo-300 flex items-center gap-1 font-medium">
                          <Banknote className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
                          {item.input.salary}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {item.result.explanation}
                </p>
              </div>

              <button
                type="button"
                id={`btn-reload-history-${item.id}`}
                onClick={() => onSelectHistory(item)}
                className="w-full py-2 px-3 rounded-lg bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold border border-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-200 dark:border-slate-800 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs"
              >
                <span>View Full Analysis & Breakdown</span>
                <ArrowRight className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
