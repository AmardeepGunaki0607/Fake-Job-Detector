import React, { useState } from 'react';
import { Briefcase, Building2, Banknote, Link as LinkIcon, Sparkles, RefreshCw, AlertCircle, Zap } from 'lucide-react';
import { JobInput, SampleJob } from '../types';
import { SAMPLE_JOBS } from '../data/sampleJobs';

interface JobAnalysisFormProps {
  formData: JobInput;
  onChange: (field: keyof JobInput, value: string) => void;
  onAnalyze: () => void;
  onReset: () => void;
  onLoadSample: (sample: SampleJob) => void;
  isLoading: boolean;
  errorMessage: string | null;
}

export const JobAnalysisForm: React.FC<JobAnalysisFormProps> = ({
  formData,
  onChange,
  onAnalyze,
  onReset,
  onLoadSample,
  isLoading,
  errorMessage,
}) => {
  const [activeSampleId, setActiveSampleId] = useState<string | null>(null);

  const handleSelectSample = (sample: SampleJob) => {
    setActiveSampleId(sample.id);
    onLoadSample(sample);
  };

  const handleClear = () => {
    setActiveSampleId(null);
    onReset();
  };

  const wordCount = formData.jobDescription.trim() ? formData.jobDescription.trim().split(/\s+/).length : 0;
  const charCount = formData.jobDescription.length;

  return (
    <div className="bg-white/90 dark:bg-slate-900/85 backdrop-blur-md rounded-2xl border border-slate-200/90 dark:border-slate-800/90 shadow-md p-5 sm:p-7 space-y-6" id="job-input-card">
      {/* Header with Quick Presets */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>Job Information Input</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Fill in the job details or paste a complete advertisement to begin AI/ML classification.
          </p>
        </div>

        {/* Quick Demo Buttons */}
        <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mr-1 flex items-center">
            <Zap className="w-3.5 h-3.5 text-amber-500 mr-1" /> Quick Demo:
          </span>
          <button
            type="button"
            id="btn-sample-real-quick"
            onClick={() => handleSelectSample(SAMPLE_JOBS[0])}
            disabled={isLoading}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors border cursor-pointer ${
              activeSampleId === SAMPLE_JOBS[0].id
                ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/50 ring-1 ring-emerald-400/40'
                : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300 hover:border-emerald-300 dark:hover:border-emerald-500/30'
            }`}
          >
            Real Job (Microsoft)
          </button>
          <button
            type="button"
            id="btn-sample-fake-quick"
            onClick={() => handleSelectSample(SAMPLE_JOBS[1])}
            disabled={isLoading}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors border cursor-pointer ${
              activeSampleId === SAMPLE_JOBS[1].id
                ? 'bg-rose-50 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-500/50 ring-1 ring-rose-400/40'
                : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-rose-50 hover:text-rose-700 dark:hover:bg-rose-500/10 dark:hover:text-rose-300 hover:border-rose-300 dark:hover:border-rose-500/30'
            }`}
          >
            Fake Job (Data Entry)
          </button>
        </div>
      </div>

      {/* Validation Error Alert */}
      {errorMessage && (
        <div
          id="form-error-banner"
          className="flex items-start space-x-3 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-sm animate-in fade-in duration-200"
          role="alert"
        >
          <AlertCircle className="w-5 h-5 text-rose-500 dark:text-rose-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-medium text-rose-800 dark:text-rose-300">{errorMessage}</p>
            <p className="text-xs text-rose-600 dark:text-rose-400/80 mt-0.5">Please paste or type the job responsibilities and criteria below.</p>
          </div>
        </div>
      )}

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Job Title */}
        <div className="space-y-1.5">
          <label htmlFor="input-job-title" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Job Title <span className="text-slate-500 font-normal normal-case">(e.g., Software Development Intern)</span>
          </label>
          <div className="relative rounded-xl shadow-xs">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Briefcase className="w-4 h-4" />
            </div>
            <input
              type="text"
              id="input-job-title"
              value={formData.jobTitle}
              onChange={(e) => onChange('jobTitle', e.target.value)}
              placeholder="e.g. Software Development Intern"
              disabled={isLoading}
              className="block w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-950 transition-all"
            />
          </div>
        </div>

        {/* Company Name */}
        <div className="space-y-1.5">
          <label htmlFor="input-company-name" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Company Name <span className="text-slate-500 font-normal normal-case">(e.g., Microsoft)</span>
          </label>
          <div className="relative rounded-xl shadow-xs">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Building2 className="w-4 h-4" />
            </div>
            <input
              type="text"
              id="input-company-name"
              value={formData.companyName}
              onChange={(e) => onChange('companyName', e.target.value)}
              placeholder="e.g. Microsoft Corporation"
              disabled={isLoading}
              className="block w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-950 transition-all"
            />
          </div>
        </div>

        {/* Salary / Stipend */}
        <div className="space-y-1.5">
          <label htmlFor="input-salary" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Salary / Stipend <span className="text-slate-500 font-normal normal-case">(Optional: ₹15,000/mo, ₹8 LPA, $60,000/yr)</span>
          </label>
          <div className="relative rounded-xl shadow-xs">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Banknote className="w-4 h-4" />
            </div>
            <input
              type="text"
              id="input-salary"
              value={formData.salary}
              onChange={(e) => onChange('salary', e.target.value)}
              placeholder="e.g. ₹15,000 per month / $60,000 per year"
              disabled={isLoading}
              className="block w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-950 transition-all"
            />
          </div>
        </div>

        {/* Job URL */}
        <div className="space-y-1.5">
          <label htmlFor="input-job-url" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Job URL / Source Link <span className="text-slate-500 font-normal normal-case">(Optional: Careers page link)</span>
          </label>
          <div className="relative rounded-xl shadow-xs">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <LinkIcon className="w-4 h-4" />
            </div>
            <input
              type="text"
              id="input-job-url"
              value={formData.jobUrl}
              onChange={(e) => onChange('jobUrl', e.target.value)}
              placeholder="https://company.com/careers/job-id or application portal"
              disabled={isLoading}
              className="block w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-950 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Complete Job Description */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="input-job-description" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Job Description <span className="text-rose-500">*</span>
          </label>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            {wordCount} words • {charCount} chars
          </span>
        </div>

        <div className="relative rounded-xl shadow-xs">
          <textarea
            id="input-job-description"
            rows={7}
            value={formData.jobDescription}
            onChange={(e) => onChange('jobDescription', e.target.value)}
            placeholder="Paste the complete job description here, including responsibilities, required skills, qualifications, work arrangement, and instructions on how to apply..."
            disabled={isLoading}
            className="block w-full p-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-950 transition-all font-mono text-xs leading-relaxed"
          />
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between pt-1">
          <span>Include full requirements, contact channels, or fee mentions for thorough ML screening.</span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between pt-2 gap-3">
        <button
          type="button"
          id="btn-clear-form"
          onClick={handleClear}
          disabled={isLoading || (!formData.jobTitle && !formData.companyName && !formData.jobDescription)}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium transition-colors disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center space-x-2 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Clear Fields</span>
        </button>

        <button
          type="button"
          id="btn-analyze-job"
          onClick={onAnalyze}
          disabled={isLoading}
          className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold text-sm shadow-md shadow-indigo-600/30 hover:shadow-indigo-600/40 transition-all duration-150 flex items-center justify-center space-x-2 disabled:opacity-60 cursor-pointer"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-white" />
              <span>Analyzing Job Patterns...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-indigo-200" />
              <span>Analyze Job (Predict)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
