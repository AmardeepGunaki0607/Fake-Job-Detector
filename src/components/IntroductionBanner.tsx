import React from 'react';
import { ArrowRight, FileSearch, Cpu, CheckCircle, AlertOctagon, ShieldCheck, Globe, Zap, Sparkles } from 'lucide-react';

export const IntroductionBanner: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50/80 via-white/90 to-indigo-50/60 dark:from-slate-900/90 dark:via-indigo-950/40 dark:to-slate-900/90 border border-indigo-100/80 dark:border-indigo-900/40 rounded-2xl p-6 sm:p-8 shadow-sm backdrop-blur-md text-slate-800 dark:text-slate-200 mb-8" id="intro-section">
      {/* Subtle top edge glow bar */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400"></div>

      <div className="max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wider shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>Global Employment Authenticity & Fraud Screening Engine</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Verify Job & Internship Authenticity Before Applying
        </h2>

        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
          Fraudulent job postings trick applicants into sharing sensitive data, paying advance fees, or accepting spoofed offers. Our system connects with global verification databases and applies machine learning heuristics to classify opportunities as <span className="font-semibold text-emerald-600 dark:text-emerald-400">Real</span> or <span className="font-semibold text-rose-600 dark:text-rose-400">Fake</span> in seconds.
        </p>

        {/* Visual Pipeline Representation */}
        <div className="pt-2">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3.5 bg-white/90 dark:bg-slate-950/80 p-3 sm:p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 text-xs sm:text-sm font-medium shadow-xs">
            <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 bg-slate-100/90 dark:bg-slate-800/90 px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700">
              <FileSearch className="w-4 h-4 text-blue-500 dark:text-blue-400" />
              <span>Job Details</span>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-500 hidden sm:inline" />
            <span className="text-slate-400 dark:text-slate-600 sm:hidden">→</span>

            <div className="flex items-center space-x-2 text-indigo-700 dark:text-indigo-200 bg-indigo-50/90 dark:bg-indigo-950/90 px-3.5 py-2 rounded-lg border border-indigo-200 dark:border-indigo-700/50">
              <Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-pulse" />
              <span>AI Classifier</span>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-500 hidden sm:inline" />
            <span className="text-slate-400 dark:text-slate-600 sm:hidden">→</span>

            <div className="flex items-center space-x-2 text-sky-700 dark:text-sky-300 bg-sky-50/90 dark:bg-sky-950/90 px-3.5 py-2 rounded-lg border border-sky-200 dark:border-sky-700/50">
              <Globe className="w-4 h-4 text-sky-500 dark:text-sky-400" />
              <span>Network Audit</span>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-500 hidden sm:inline" />
            <span className="text-slate-400 dark:text-slate-600 sm:hidden">→</span>

            <div className="flex items-center space-x-2 bg-slate-100/90 dark:bg-slate-900/90 px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-semibold mr-1">
                <CheckCircle className="w-3.5 h-3.5 mr-1" /> Real
              </span>
              <span className="text-slate-400 dark:text-slate-500">/</span>
              <span className="inline-flex items-center text-rose-600 dark:text-rose-400 font-semibold ml-1">
                <AlertOctagon className="w-3.5 h-3.5 mr-1" /> Fake
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
