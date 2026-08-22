import React, { useState, useRef, useEffect } from 'react';
import { Header, ActiveTabType } from './components/Header';
import { IntroductionBanner } from './components/IntroductionBanner';
import { JobAnalysisForm } from './components/JobAnalysisForm';
import { PredictionResult } from './components/PredictionResult';
import { AboutProjectSection } from './components/AboutProjectSection';
import { EducationalGuide } from './components/EducationalGuide';
import { SampleJobsBank } from './components/SampleJobsBank';
import { DomainEmailVerifier } from './components/DomainEmailVerifier';
import { ScanHistory } from './components/ScanHistory';
import { GlobalNetworkGlobeBackground } from './components/GlobalNetworkGlobeBackground';
import { JobInput, AnalysisResult, SampleJob, HistoryItem } from './types';
import { ShieldCheck, Cpu } from 'lucide-react';
import { ThemeProvider } from './context/ThemeContext';

const LOCAL_STORAGE_KEY = 'ai_job_detector_history';

function JobDetectorApp() {
  const [activeTab, setActiveTab] = useState<ActiveTabType>('analyze');
  const [formData, setFormData] = useState<JobInput>({
    jobTitle: '',
    companyName: '',
    salary: '',
    jobUrl: '',
    jobDescription: '',
  });
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(history));
    } catch {
      // ignore storage errors
    }
  }, [history]);

  const handleFieldChange = (field: keyof JobInput, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const handleReset = () => {
    setFormData({
      jobTitle: '',
      companyName: '',
      salary: '',
      jobUrl: '',
      jobDescription: '',
    });
    setAnalysisResult(null);
    setErrorMessage(null);
  };

  const handleLoadSample = (sample: SampleJob) => {
    setFormData(sample.data);
    setAnalysisResult(null);
    setErrorMessage(null);
    setActiveTab('analyze');
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setFormData(item.input);
    setAnalysisResult(item.result);
    setActiveTab('analyze');
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch {}
  };

  const handleAnalyze = async () => {
    // Validation
    if (!formData.jobDescription || formData.jobDescription.trim().length === 0) {
      setErrorMessage('Please enter a job description before analyzing.');
      return;
    }

    setErrorMessage(null);
    setIsLoading(true);
    setAnalysisResult(null);

    try {
      const response = await fetch('/api/analyze-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to analyze job posting. Please try again.');
      }

      const data: AnalysisResult = await response.json();
      setAnalysisResult(data);

      // Add to session history
      const newHistoryItem: HistoryItem = {
        id: 'scan-' + Date.now(),
        timestamp: new Date().toISOString(),
        input: { ...formData },
        result: data,
      };
      setHistory((prev) => [newHistoryItem, ...prev.slice(0, 19)]); // Keep last 20 scans

      // Smooth scroll to result
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setErrorMessage(err.message || 'An error occurred while analyzing the job posting.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-150 relative overflow-x-hidden" id="app-root">
      {/* 3D Global Network Connection & Employment Verification Globe */}
      <GlobalNetworkGlobeBackground />

      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        historyCount={history.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {activeTab === 'analyze' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Landing & Pipeline Banner */}
            <IntroductionBanner />

            {/* Input Form Card */}
            <JobAnalysisForm
              formData={formData}
              onChange={handleFieldChange}
              onAnalyze={handleAnalyze}
              onReset={handleReset}
              onLoadSample={handleLoadSample}
              isLoading={isLoading}
              errorMessage={errorMessage}
            />

            {/* Prediction Result Section */}
            <div ref={resultRef}>
              {analysisResult && (
                <PredictionResult
                  result={analysisResult}
                  onReset={handleReset}
                />
              )}
            </div>
          </div>
        )}

        {activeTab === 'verifier' && (
          <div className="animate-in fade-in duration-200 space-y-6">
            <DomainEmailVerifier />
          </div>
        )}

        {activeTab === 'samples' && (
          <div className="animate-in fade-in duration-200">
            <SampleJobsBank
              onSelectSample={(sample) => {
                handleLoadSample(sample);
              }}
            />
          </div>
        )}

        {activeTab === 'safety' && (
          <div className="animate-in fade-in duration-200">
            <EducationalGuide />
          </div>
        )}

        {activeTab === 'history' && (
          <div className="animate-in fade-in duration-200">
            <ScanHistory
              history={history}
              onSelectHistory={handleSelectHistoryItem}
              onClearHistory={handleClearHistory}
            />
          </div>
        )}

        {activeTab === 'about' && (
          <div className="animate-in fade-in duration-200">
            <AboutProjectSection />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xs text-slate-500 dark:text-slate-400 py-6 mt-12 text-xs relative z-10" id="app-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="font-semibold text-slate-800 dark:text-slate-300">AI Fake Job Posting Detection</span>
          </div>

          <div className="flex items-center space-x-4 text-slate-500 dark:text-slate-500">
            <span className="flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              NLP Feature Classification System
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <JobDetectorApp />
    </ThemeProvider>
  );
}
