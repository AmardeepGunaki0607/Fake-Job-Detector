export interface JobInput {
  jobTitle: string;
  companyName: string;
  salary: string;
  jobUrl: string;
  jobDescription: string;
}

export interface HighlightedPhrase {
  phrase: string;
  type: 'suspicious' | 'positive';
  reason: string;
}

export interface AnalyzedFeatures {
  linguisticUrgency?: string;
  monetaryUpfrontRequirement?: boolean;
  structuredResponsibilities?: boolean;
  vagueJobScope?: boolean;
  communicationChannel?: string;
}

export interface AnalysisResult {
  classification: 'REAL' | 'FAKE';
  explanation: string;
  detectedWarningSigns: string[];
  positiveIndicators: string[];
  safetyRecommendations: string[];
  highlightedPhrases?: HighlightedPhrase[];
  features?: AnalyzedFeatures;
  modelUsed?: string;
  originalInput?: JobInput;
  timestamp?: string;
}

export interface HistoryItem {
  id: string;
  timestamp: string;
  input: JobInput;
  result: AnalysisResult;
}

export interface DomainCheckResult {
  input: string;
  type: 'email' | 'url' | 'unknown';
  isSuspicious: boolean;
  statusText: string;
  reason: string;
  recommendation: string;
}

export interface SampleJob {
  id: string;
  name: string;
  type: 'REAL' | 'FAKE';
  badgeLabel: string;
  category: string;
  data: JobInput;
  highlightReason: string;
}

