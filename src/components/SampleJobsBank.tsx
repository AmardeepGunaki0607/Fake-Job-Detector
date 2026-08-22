import React from 'react';
import { FileText, ArrowRight, ShieldCheck, ShieldAlert, Sparkles, Building2, Banknote } from 'lucide-react';
import { SampleJob } from '../types';
import { SAMPLE_JOBS } from '../data/sampleJobs';

interface SampleJobsBankProps {
  onSelectSample: (sample: SampleJob) => void;
}

export const SampleJobsBank: React.FC<SampleJobsBankProps> = ({ onSelectSample }) => {
  return (
    <div className="space-y-6" id="sample-jobs-container">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl p-6 sm:p-8 space-y-3 shadow-xs">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/20 border border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-300 text-xs font-semibold uppercase tracking-wider">
          <FileText className="w-3.5 h-3.5" />
          <span>Preset Demonstration Bank</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Test Cases for Model Demonstration
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
          Select any verified sample below to load its full job details and test the AI/ML classification model in real time.
        </p>
      </div>

      {/* Grid of sample cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SAMPLE_JOBS.map((sample) => {
          const isFake = sample.type === 'FAKE';
          return (
            <div
              key={sample.id}
              className={`bg-white dark:bg-slate-900/90 rounded-2xl border shadow-xs p-6 space-y-4 flex flex-col justify-between transition-all hover:shadow-md ${
                isFake
                  ? 'border-rose-200 dark:border-rose-500/30 hover:border-rose-400 dark:hover:border-rose-500/60'
                  : 'border-emerald-200 dark:border-emerald-500/30 hover:border-emerald-400 dark:hover:border-emerald-500/60'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      isFake
                        ? 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/40'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/40'
                    }`}
                  >
                    {isFake ? <ShieldAlert className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                    <span>{sample.badgeLabel}</span>
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{sample.category}</span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug">{sample.data.jobTitle}</h3>
                  <div className="flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                    <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      {sample.data.companyName}
                    </span>
                    <span className="text-slate-300 dark:text-slate-600">•</span>
                    <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-300 font-medium">
                      <Banknote className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                      {sample.data.salary}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                  <span className="font-semibold text-indigo-700 dark:text-indigo-300 block">Why this sample was crafted:</span>
                  <p className="leading-relaxed text-slate-600 dark:text-slate-300">{sample.highlightReason}</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  id={`btn-load-sample-${sample.id}`}
                  onClick={() => onSelectSample(sample)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 border cursor-pointer ${
                    isFake
                      ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-600 hover:text-white dark:bg-rose-500/15 dark:text-rose-300 dark:border-rose-500/30 dark:hover:bg-rose-600 dark:hover:text-white'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-600 hover:text-white dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30 dark:hover:bg-emerald-600 dark:hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Load into Analyzer & Run Prediction</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
