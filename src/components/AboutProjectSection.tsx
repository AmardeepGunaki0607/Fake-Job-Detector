import React from 'react';
import {
  Cpu,
  BrainCircuit,
  Database,
  ArrowRight,
  ShieldCheck,
  Code2,
  FileCheck,
  BarChart3,
  CheckCircle,
  Search
} from 'lucide-react';

export const AboutProjectSection: React.FC = () => {
  return (
    <div className="space-y-8" id="about-project-container">
      {/* Project Overview Hero */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wider">
          <BrainCircuit className="w-3.5 h-3.5" />
          <span>Project Documentation</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          About the AI Fake Job Posting Detection System
        </h2>

        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
          An Artificial Intelligence and Machine Learning system designed to assist students, entry-level job seekers, and the general public in detecting fraudulent job advertisements, phishing scams, and advance-fee employment fraud before applying or sharing confidential information.
        </p>
      </div>

      {/* Problem vs Solution Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Problem */}
        <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-6 space-y-3.5">
          <div className="flex items-center space-x-3 text-rose-600 dark:text-rose-400">
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">The Problem</h3>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            Fraudulent job advertisements are increasingly used by cybercriminals to deceive job seekers. Scammers impersonate reputable brands or fabricate remote positions to extract application fees, steal personal identity information, or coerce unpaid task labor.
          </p>
        </div>

        {/* Solution */}
        <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-6 space-y-3.5">
          <div className="flex items-center space-x-3 text-emerald-600 dark:text-emerald-400">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">The AI/ML Solution</h3>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            The system applies Natural Language Processing (NLP) and Machine Learning classification algorithms to scrutinize job descriptions, salary-to-skill ratios, corporate legitimacy indicators, and urgency patterns to classify listings as <strong className="text-emerald-600 dark:text-emerald-400">Real Job</strong> or <strong className="text-rose-600 dark:text-rose-400">Fake Job</strong>.
          </p>
        </div>
      </div>

      {/* Machine Learning Pipeline Flow */}
      <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-6 sm:p-7 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Cpu className="w-4 h-4" />
            </div>
            <span>AI/ML Architecture & Classification Pipeline</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Standard workflow representation: Input Data → Text Processing → Feature Extraction → ML Classification → Prediction
          </p>
        </div>

        {/* 5-Step Pipeline visual */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 border border-slate-200 dark:border-slate-800 space-y-2 flex flex-col justify-between">
            <div>
              <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 text-indigo-700 dark:text-indigo-400 text-xs font-mono font-bold flex items-center justify-center mb-2">1</span>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">Input Data</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Job title, company, salary, description, and source URL.</p>
            </div>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium pt-2">Raw Text</span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 border border-slate-200 dark:border-slate-800 space-y-2 flex flex-col justify-between">
            <div>
              <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 text-indigo-700 dark:text-indigo-400 text-xs font-mono font-bold flex items-center justify-center mb-2">2</span>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">Text Processing</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Stopword removal, tokenization, lowercasing, and lemmatization.</p>
            </div>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium pt-2">Token Clean</span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 border border-slate-200 dark:border-slate-800 space-y-2 flex flex-col justify-between">
            <div>
              <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 text-indigo-700 dark:text-indigo-400 text-xs font-mono font-bold flex items-center justify-center mb-2">3</span>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">Feature Extraction</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">TF-IDF vectorization, n-gram extraction, and red-flag keyword triggers.</p>
            </div>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium pt-2">Vector Sparse Matrix</span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 border border-slate-200 dark:border-slate-800 space-y-2 flex flex-col justify-between">
            <div>
              <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 text-indigo-700 dark:text-indigo-400 text-xs font-mono font-bold flex items-center justify-center mb-2">4</span>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">ML Classifier</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Supervised learning (Logistic Regression / Random Forest / Naive Bayes / LLM).</p>
            </div>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium pt-2">Model Decision</span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 border border-slate-200 dark:border-slate-800 space-y-2 flex flex-col justify-between">
            <div>
              <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 text-indigo-700 dark:text-indigo-400 text-xs font-mono font-bold flex items-center justify-center mb-2">5</span>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">Prediction</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Real Job vs Fake Job verdict with contextual safety recommendations.</p>
            </div>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold pt-2">Final Output</span>
          </div>
        </div>
      </div>

      {/* Dataset & Tech Stack Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-3 shadow-xs">
          <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400">
            <Database className="w-4 h-4" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Dataset Context</h4>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Modeled on benchmarks like the EMSCAD (Employment Scam Aegean Dataset) containing ~18,000 annotated real and fraudulent job postings.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-3 shadow-xs">
          <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
            <Code2 className="w-4 h-4" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Technology Stack</h4>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            React, TypeScript, Tailwind CSS, Vite, Express, and modern NLP classification models.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-3 shadow-xs">
          <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
            <FileCheck className="w-4 h-4" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Classification Target</h4>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Binary Classification Output: <strong>0 = Real Job</strong> (Authentic), <strong>1 = Fake Job</strong> (Fraudulent / Phishing).
          </p>
        </div>
      </div>
    </div>
  );
};
