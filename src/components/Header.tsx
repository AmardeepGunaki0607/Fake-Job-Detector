import React from 'react';
import { ShieldCheck, Cpu, Sparkles, BookOpen, AlertTriangle, FileText, Mail, History } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export type ActiveTabType = 'analyze' | 'verifier' | 'samples' | 'safety' | 'history' | 'about';

interface HeaderProps {
  activeTab: ActiveTabType;
  onTabChange: (tab: ActiveTabType) => void;
  historyCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, historyCount = 0 }) => {
  return (
    <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white sticky top-0 z-40 shadow-xs" id="app-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3.5 gap-4">
          {/* Logo & Main Title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-500 flex items-center justify-center shadow-md shadow-indigo-500/20 ring-1 ring-black/5 dark:ring-white/20">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    AI Fake Job Posting Detection
                  </h1>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
                    <Cpu className="w-3 h-3 mr-1" /> AIML Model
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-0.5">
                  Detect potentially fraudulent job postings using Artificial Intelligence and Machine Learning
                </p>
              </div>
            </div>

            {/* Mobile-only theme toggle */}
            <div className="md:hidden">
              <ThemeToggle />
            </div>
          </div>

          {/* Navigation Tabs & Theme Toggle for Desktop */}
          <div className="flex items-center space-x-3 self-start md:self-auto overflow-x-auto max-w-full pb-1 md:pb-0">
            <nav className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-950/80 p-1 rounded-xl border border-slate-200 dark:border-slate-800" aria-label="Main Navigation">
              <button
                id="nav-tab-analyze"
                onClick={() => onTabChange('analyze')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer whitespace-nowrap ${
                  activeTab === 'analyze'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/80 dark:hover:bg-slate-800/60'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Analyze Job</span>
              </button>

              <button
                id="nav-tab-verifier"
                onClick={() => onTabChange('verifier')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer whitespace-nowrap ${
                  activeTab === 'verifier'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/80 dark:hover:bg-slate-800/60'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Domain Verifier</span>
              </button>

              <button
                id="nav-tab-samples"
                onClick={() => onTabChange('samples')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer whitespace-nowrap ${
                  activeTab === 'samples'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/80 dark:hover:bg-slate-800/60'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Test Cases</span>
              </button>

              <button
                id="nav-tab-safety"
                onClick={() => onTabChange('safety')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer whitespace-nowrap ${
                  activeTab === 'safety'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/80 dark:hover:bg-slate-800/60'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Safety Guide</span>
              </button>

              <button
                id="nav-tab-history"
                onClick={() => onTabChange('history')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer whitespace-nowrap ${
                  activeTab === 'history'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/80 dark:hover:bg-slate-800/60'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>History</span>
                {historyCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {historyCount}
                  </span>
                )}
              </button>

              <button
                id="nav-tab-about"
                onClick={() => onTabChange('about')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer whitespace-nowrap ${
                  activeTab === 'about'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/80 dark:hover:bg-slate-800/60'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>About</span>
              </button>
            </nav>

            {/* Desktop Theme Switch */}
            <div className="hidden md:flex items-center pl-1">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
