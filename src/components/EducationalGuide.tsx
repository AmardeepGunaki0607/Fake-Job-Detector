import React from 'react';
import {
  AlertTriangle,
  DollarSign,
  UserX,
  Globe,
  Clock,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  FileQuestion
} from 'lucide-react';

export const EducationalGuide: React.FC = () => {
  const commonSigns = [
    {
      number: '01',
      title: 'Requests for Money Before Employment',
      desc: 'Legitimate employers will never ask candidates to pay for registration, application processing, background checks, training materials, or software licenses.',
      icon: DollarSign,
      color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/30',
      tag: 'Advance-Fee Scam',
    },
    {
      number: '02',
      title: 'Extremely High Salary for Minimal Qualifications',
      desc: 'Offers promising $500/day or ₹50,000/month for basic copy-paste, data entry, or typing with zero experience required are classic recruitment traps.',
      icon: DollarSign,
      color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30',
      tag: 'Unrealistic Pay',
    },
    {
      number: '03',
      title: 'No Proper Interview or Selection Process',
      desc: 'Receiving an immediate job offer or "instant joining confirmation" without any resume review, technical round, or video/face-to-face interview is a major red flag.',
      icon: UserX,
      color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/30',
      tag: 'Zero Vetting',
    },
    {
      number: '04',
      title: 'Suspicious Communication & Free Webmail',
      desc: 'Recruiters conducting all interactions via WhatsApp, Telegram, or personal email addresses (e.g. hr_recruiter@gmail.com) instead of verified corporate domains.',
      icon: Globe,
      color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30',
      tag: 'Informal Channels',
    },
    {
      number: '05',
      title: 'Poorly Written or Overly Vague Job Descriptions',
      desc: 'Listings packed with excessive exclamation marks, generic buzzwords, grammatical errors, and no defined day-to-day responsibilities or deliverables.',
      icon: FileQuestion,
      color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/30',
      tag: 'Vague Scope',
    },
    {
      number: '06',
      title: 'Urgent Pressure to Accept or Apply Immediately',
      desc: 'Manipulative tactics creating false scarcity such as "Only 3 seats remaining", "Offer expires in 2 hours", or demanding an instant deposit.',
      icon: Clock,
      color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30',
      tag: 'False Urgency',
    },
    {
      number: '07',
      title: 'Requests for Banking, OTPs, or Sensitive Documents',
      desc: 'Demanding bank login credentials, OTP verifications, credit card numbers, or full national ID scans prior to issuing a verified formal contract.',
      icon: KeyRound,
      color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/30',
      tag: 'Data / Identity Theft',
    },
  ];

  return (
    <div className="space-y-8" id="educational-guide-container">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl p-6 sm:p-8 space-y-3 shadow-xs">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-500/20 border border-amber-200 dark:border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Job Seeker Safety Manual</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          How to Identify Suspicious Job Postings
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
          Learn the 7 most common indicators of fraudulent recruitment and follow proven verification practices before submitting your personal information or making any payments.
        </p>
      </div>

      {/* 7 Common Signs Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-500/20 border border-rose-200 dark:border-rose-500/30 flex items-center justify-center text-rose-600 dark:text-rose-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <span>Common Signs of a Fake Job</span>
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">7 Core Red Flags</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {commonSigns.map((sign) => {
            const Icon = sign.icon;
            return (
              <div
                key={sign.number}
                className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-5 space-y-3.5 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-bold flex items-center justify-center shadow-xs">
                      {sign.number}
                    </span>
                    <span className="text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                      {sign.tag}
                    </span>
                  </div>

                  <div className="flex items-start space-x-3 pt-1">
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${sign.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">{sign.title}</h4>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-0.5">{sign.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Real vs Fake Quick Comparison Table */}
      <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-6 sm:p-7 space-y-4">
        <div className="flex items-center space-x-2.5 text-slate-900 dark:text-white">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Legitimate vs Fraudulent Job Comparison</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Side-by-side behavioral comparison between genuine companies and scam postings</p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                <th className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Feature</th>
                <th className="py-3 px-4 font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50/70 dark:bg-emerald-950/40 border-l border-r border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Legitimate Job (Real)</span>
                  </div>
                </th>
                <th className="py-3 px-4 font-semibold text-rose-700 dark:text-rose-400 bg-rose-50/70 dark:bg-rose-950/40">
                  <div className="flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                    <span>Fraudulent Posting (Fake)</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80 text-slate-700 dark:text-slate-300">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">Application Fees</td>
                <td className="py-3 px-4 text-emerald-800 dark:text-emerald-300 bg-emerald-50/30 dark:bg-emerald-950/20 border-l border-r border-slate-200 dark:border-slate-800">100% Free. No fees ever charged.</td>
                <td className="py-3 px-4 text-rose-800 dark:text-rose-300 bg-rose-50/30 dark:bg-rose-950/20">Charges for ID registration, kit, or security deposit.</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">Selection Method</td>
                <td className="py-3 px-4 text-emerald-800 dark:text-emerald-300 bg-emerald-50/30 dark:bg-emerald-950/20 border-l border-r border-slate-200 dark:border-slate-800">Resume screening, interview rounds, assessments.</td>
                <td className="py-3 px-4 text-rose-800 dark:text-rose-300 bg-rose-50/30 dark:bg-rose-950/20">Instant hiring without technical interview.</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">Communication</td>
                <td className="py-3 px-4 text-emerald-800 dark:text-emerald-300 bg-emerald-50/30 dark:bg-emerald-950/20 border-l border-r border-slate-200 dark:border-slate-800">Official corporate emails (@company.com).</td>
                <td className="py-3 px-4 text-rose-800 dark:text-rose-300 bg-rose-50/30 dark:bg-rose-950/20">Telegram bots, WhatsApp chats, generic webmails.</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">Compensation</td>
                <td className="py-3 px-4 text-emerald-800 dark:text-emerald-300 bg-emerald-50/30 dark:bg-emerald-950/20 border-l border-r border-slate-200 dark:border-slate-800">Aligned with industry benchmarks.</td>
                <td className="py-3 px-4 text-rose-800 dark:text-rose-300 bg-rose-50/30 dark:bg-rose-950/20">Astronomical daily pay for unskilled tasks.</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">Domain / Portal</td>
                <td className="py-3 px-4 text-emerald-800 dark:text-emerald-300 bg-emerald-50/30 dark:bg-emerald-950/20 border-l border-r border-slate-200 dark:border-slate-800">Listed on company careers website or LinkedIn.</td>
                <td className="py-3 px-4 text-rose-800 dark:text-rose-300 bg-rose-50/30 dark:bg-rose-950/20">Shortened links (bit.ly) or suspicious subdomains.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
