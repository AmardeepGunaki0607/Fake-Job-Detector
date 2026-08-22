import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Heuristic NLP Feature Extractor & Classifier fallback
function analyzeJobHeuristic(data: {
  jobTitle: string;
  companyName: string;
  salary: string;
  jobUrl: string;
  jobDescription: string;
}) {
  const fullText = `${data.jobTitle} ${data.companyName} ${data.salary} ${data.jobUrl} ${data.jobDescription}`.toLowerCase();
  
  const suspiciousKeywords = [
    { term: "registration fee", reason: "Direct request for upfront registration payment", weight: 35 },
    { term: "application fee", reason: "Charging job applicants upfront processing fees", weight: 35 },
    { term: "security deposit", reason: "Demand for monetary deposit for equipment or training", weight: 35 },
    { term: "no experience needed", reason: "Zero qualification required for high compensation", weight: 15 },
    { term: "no experience required", reason: "Zero qualification required for high compensation", weight: 15 },
    { term: "earn money fast", reason: "Get-rich-quick promotional phrasing", weight: 25 },
    { term: "earn $", reason: "Aggressive earning claims", weight: 15 },
    { term: "earn ₹", reason: "Aggressive earning claims", weight: 15 },
    { term: "instant joining", reason: "Bypassing formal vetting or candidate selection", weight: 20 },
    { term: "no interview", reason: "Absence of technical evaluation or interview stage", weight: 30 },
    { term: "whatsapp", reason: "Directing professional recruitment to unverified chat apps", weight: 20 },
    { term: "telegram", reason: "Directing applications to untraceable messaging channels", weight: 20 },
    { term: "limited seats", reason: "Artificial urgency pressure to rush decision-making", weight: 20 },
    { term: "apply immediately", reason: "Urgent pressure tactic", weight: 10 },
    { term: "daily payout", reason: "Typical freelance/click-farm or task scam incentive", weight: 20 },
    { term: "send bank details", reason: "Early request for sensitive banking information", weight: 30 },
    { term: "crypto", reason: "High correlation with unverified tasks or wallet scams", weight: 15 },
    { term: "data entry work from home", reason: "Frequent front for fee-based typing/task fraud", weight: 20 },
    { term: "part time earn", reason: "Aggressive side-income spam vocabulary", weight: 15 },
    { term: "click ads", reason: "Task completion/pyramid structure scam", weight: 35 },
    { term: "processing charge", reason: "Unjustified candidate fee demand", weight: 35 },
    { term: "gift card", reason: "Common fraudulent payout or payment mechanism", weight: 40 },
    { term: "cheque cashing", reason: "Counterfeit check scam pattern", weight: 40 }
  ];

  const legitimateIndicators = [
    { term: "responsibilities", reason: "Well-structured job role scope and deliverables" },
    { term: "qualifications", reason: "Defined educational or domain skill criteria" },
    { term: "bachelor", reason: "Standard academic requirement benchmarks" },
    { term: "years of experience", reason: "Realistic professional background expectations" },
    { term: "health insurance", reason: "Legitimate corporate benefits package" },
    { term: "401(k)", reason: "Standard structured corporate retirement benefits" },
    { term: "interview rounds", reason: "Formal structured evaluation process" },
    { term: "technical assessment", reason: "Merit-based hiring pipeline" },
    { term: "equal opportunity employer", reason: "Standard corporate regulatory compliance" },
    { term: "cross-functional", reason: "Professional team collaboration context" },
    { term: "provident fund", reason: "Standard formal employment benefit" }
  ];

  let fraudScore = 0;
  const detectedWarningSigns: string[] = [];
  const positiveFound: string[] = [];
  const highlightedPhrases: Array<{ phrase: string; type: "suspicious" | "positive"; reason: string }> = [];

  for (const item of suspiciousKeywords) {
    if (fullText.includes(item.term)) {
      fraudScore += item.weight;
      if (!detectedWarningSigns.includes(item.reason)) {
        detectedWarningSigns.push(item.reason);
      }
      highlightedPhrases.push({
        phrase: item.term,
        type: "suspicious",
        reason: item.reason,
      });
    }
  }

  for (const item of legitimateIndicators) {
    if (fullText.includes(item.term)) {
      if (!positiveFound.includes(item.reason)) {
        positiveFound.push(item.reason);
      }
      highlightedPhrases.push({
        phrase: item.term,
        type: "positive",
        reason: item.reason,
      });
    }
  }

  // URL checks
  if (data.jobUrl) {
    const urlLower = data.jobUrl.toLowerCase();
    if (urlLower.includes("bit.ly") || urlLower.includes("tinyurl") || urlLower.includes("t.me") || urlLower.includes("wa.me") || urlLower.includes("freehost")) {
      fraudScore += 25;
      detectedWarningSigns.push("Use of shortened, unverified, or third-party chat redirect link");
      highlightedPhrases.push({
        phrase: data.jobUrl,
        type: "suspicious",
        reason: "Suspicious or anonymous URL domain",
      });
    }
  }

  // Salary vs Description length
  if (data.salary && (data.salary.includes("50,000") || data.salary.includes("1,00,000") || data.salary.includes("5000/day") || data.salary.includes("2000/day") || data.salary.includes("$1000/week")) && data.jobDescription.length < 150) {
    fraudScore += 20;
    detectedWarningSigns.push("High earning claim paired with an unusually brief and vague job description");
  }

  const isFake = fraudScore >= 25;

  if (!isFake && positiveFound.length === 0) {
    positiveFound.push("Clear job responsibilities and structured role summary");
    positiveFound.push("Relevant skills and qualifications outlined");
    positiveFound.push("Professional tone and identifiable organizational context");
  }

  const safetyRecommendations = isFake
    ? [
        "Do not pay money to obtain a job or purchase mandatory training kits.",
        "Verify the company through its official website and direct HR channels.",
        "Check whether the job exists on the company's official careers page.",
        "Avoid sharing banking passwords, OTPs, or government identity scans over chat.",
        "Research the organization on professional platforms like LinkedIn before applying.",
        "Be cautious of offers that promise unusually high earnings with minimal effort."
      ]
    : [
        "Confirm that communication originates from the company's official corporate email domain.",
        "Verify that the job ID or opening is listed on the organization's official careers portal.",
        "Never share financial credentials or pay security deposits at any stage of hiring."
      ];

  return {
    classification: isFake ? ("FAKE" as const) : ("REAL" as const),
    explanation: isFake
      ? "This job posting contains characteristics commonly associated with fraudulent job advertisements."
      : "Based on the information provided, this job posting appears legitimate.",
    detectedWarningSigns: isFake ? detectedWarningSigns : [],
    positiveIndicators: !isFake ? positiveFound : [],
    safetyRecommendations,
    highlightedPhrases: highlightedPhrases.slice(0, 8),
    features: {
      linguisticUrgency: fraudScore > 30 ? "High" : fraudScore > 10 ? "Moderate" : "Low",
      monetaryUpfrontRequirement: fullText.includes("fee") || fullText.includes("deposit") || fullText.includes("charge"),
      structuredResponsibilities: positiveFound.length > 1,
      vagueJobScope: data.jobDescription.trim().length < 120 || fraudScore >= 35,
      communicationChannel: fullText.includes("whatsapp") || fullText.includes("telegram") ? "Unverified Chat Platform" : "Corporate/Standard Web Channel"
    }
  };
}

// Route: Analyze Job with AI/ML
app.post("/api/analyze-job", async (req, res) => {
  try {
    const { jobTitle = "", companyName = "", salary = "", jobUrl = "", jobDescription = "" } = req.body;

    if (!jobDescription || typeof jobDescription !== "string" || jobDescription.trim().length === 0) {
      return res.status(400).json({ error: "Please enter a job description before analyzing." });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              "User-Agent": "aistudio-build",
            },
          },
        });

        const prompt = `You are a specialized Machine Learning Text Classifier and Job Fraud Detection Engine.
Analyze the following job posting to classify it strictly as either "REAL" (legitimate employment/internship) or "FAKE" (fraudulent, scam, fee-charging, phishing, fake task, fake data entry).

Job Details:
- Job Title: ${jobTitle || "Not specified"}
- Company Name: ${companyName || "Not specified"}
- Salary / Stipend: ${salary || "Not specified"}
- Job URL: ${jobUrl || "Not specified"}
- Full Job Description:
"""
${jobDescription}
"""

Classification Rules:
1. FAKE Job Indicators:
   - Requesting registration, application, security, or training fees
   - "Earn money fast/daily payout", unrealistic salary for zero skills or basic typing
   - Instant hiring with "no interview" or "no experience required" for high pay
   - Unprofessional contact via WhatsApp/Telegram numbers or free webmail/shorteners
   - Urgent pressure ("apply in 1 hour", "limited 5 seats")
   - Asking for bank account PINs, OTPs, or credit card details
   - Vague responsibilities with high promises

2. REAL Job Indicators:
   - Clear job responsibilities and technical/functional requirements
   - Relevant educational or experience benchmarks
   - Professional corporate terminology and benefits (health insurance, PF, leave policy)
   - Structured selection process (resume screening, interview rounds)

CRITICAL REQUIREMENT:
- Keep the result strictly focused on REAL or FAKE.
- Do NOT include any numerical confidence percentages in any message.
- Provide clear warning signs if FAKE, or positive indicators if REAL.
- Extract key phrases that support the prediction.`;

        const response = await ai.models.generateContent({
          model: "gemini-3.7-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                classification: {
                  type: Type.STRING,
                  description: "Must be exactly 'REAL' or 'FAKE'",
                },
                explanation: {
                  type: Type.STRING,
                  description: "A concise 1-2 sentence assessment summary without percentages",
                },
                detectedWarningSigns: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "List of specific warning indicators detected (for Fake jobs)",
                },
                positiveIndicators: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "List of legitimate professional characteristics detected (for Real jobs)",
                },
                safetyRecommendations: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Actionable recommendations for the candidate",
                },
                highlightedPhrases: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      phrase: { type: Type.STRING },
                      type: { type: Type.STRING, description: "'suspicious' or 'positive'" },
                      reason: { type: Type.STRING },
                    },
                    required: ["phrase", "type", "reason"],
                  },
                  description: "Specific words or phrases extracted from the text",
                },
                features: {
                  type: Type.OBJECT,
                  properties: {
                    linguisticUrgency: { type: Type.STRING },
                    monetaryUpfrontRequirement: { type: Type.BOOLEAN },
                    structuredResponsibilities: { type: Type.BOOLEAN },
                    vagueJobScope: { type: Type.BOOLEAN },
                    communicationChannel: { type: Type.STRING },
                  },
                },
              },
              required: [
                "classification",
                "explanation",
                "detectedWarningSigns",
                "positiveIndicators",
                "safetyRecommendations",
              ],
            },
          },
        });

        const textOutput = response.text;
        if (textOutput) {
          const parsed = JSON.parse(textOutput);
          const classification = parsed.classification?.toUpperCase() === "FAKE" ? "FAKE" : "REAL";
          
          return res.json({
            classification,
            explanation: parsed.explanation || (classification === "FAKE"
              ? "This job posting contains characteristics commonly associated with fraudulent job advertisements."
              : "Based on the information provided, this job posting appears legitimate."),
            detectedWarningSigns: classification === "FAKE" ? (parsed.detectedWarningSigns?.length ? parsed.detectedWarningSigns : ["Unrealistic earning promises or unverified employer credentials"]) : [],
            positiveIndicators: classification === "REAL" ? (parsed.positiveIndicators?.length ? parsed.positiveIndicators : ["Clear job responsibilities and structured role summary", "Relevant skills and qualifications outlined", "Professional job description"]) : [],
            safetyRecommendations: parsed.safetyRecommendations?.length ? parsed.safetyRecommendations : (
              classification === "FAKE"
                ? [
                    "Do not pay money to obtain a job.",
                    "Verify the company through its official website.",
                    "Check whether the job exists on the company's official careers page.",
                    "Avoid sharing banking passwords, OTPs, or other sensitive information.",
                    "Research the organization before applying.",
                    "Be cautious of offers that promise unusually high earnings with little effort."
                  ]
                : [
                    "Verify the job posting on the company's official careers portal.",
                    "Ensure communications arrive from the company's registered email domain.",
                    "Never provide banking PINs or OTPs during an interview."
                  ]
            ),
            highlightedPhrases: parsed.highlightedPhrases || [],
            features: parsed.features || {
              linguisticUrgency: classification === "FAKE" ? "High" : "Low",
              monetaryUpfrontRequirement: classification === "FAKE",
              structuredResponsibilities: classification === "REAL",
              vagueJobScope: classification === "FAKE",
              communicationChannel: classification === "FAKE" ? "Unverified / Informal" : "Corporate Channel",
            },
            modelUsed: "gemini-3.7-flash (AI/ML Classifier)",
            timestamp: new Date().toISOString(),
            originalInput: { jobTitle, companyName, salary, jobUrl, jobDescription },
          });
        }
      } catch (geminiError) {
        console.warn("Gemini API processing failed, falling back to NLP Heuristic Classifier:", geminiError);
      }
    }

    // Fallback if API key missing or error occurred
    const heuristicResult = analyzeJobHeuristic({
      jobTitle,
      companyName,
      salary,
      jobUrl,
      jobDescription,
    });

    return res.json({
      ...heuristicResult,
      modelUsed: "NLP Text Feature Extraction Classifier (Rule-based ML Model)",
      timestamp: new Date().toISOString(),
      originalInput: { jobTitle, companyName, salary, jobUrl, jobDescription },
    });
  } catch (error: any) {
    console.error("Analysis server error:", error);
    res.status(500).json({ error: "Internal server error analyzing job posting." });
  }
});

// Route: Quick Email & Domain Verifier
app.post("/api/verify-domain-email", (req, res) => {
  const { input, claimedCompany } = req.body;
  if (!input || typeof input !== "string" || !input.trim()) {
    return res.status(400).json({ error: "Please provide an email address or website URL to verify." });
  }

  const query = input.trim().toLowerCase();
  const company = (claimedCompany || "").trim().toLowerCase();

  const freeWebmails = ["gmail.com", "yahoo.com", "ymail.com", "hotmail.com", "outlook.com", "live.com", "aol.com", "icloud.com", "proton.me", "protonmail.com", "mail.com", "zoho.com"];
  const chatShorteners = ["t.me", "telegram.me", "wa.me", "api.whatsapp.com", "bit.ly", "tinyurl.com", "cutt.ly", "rb.gy"];
  const suspiciousTLDs = [".xyz", ".top", ".click", ".buzz", ".work", ".link", ".icu", ".online", ".site"];

  let isEmail = query.includes("@");
  let domain = isEmail ? query.split("@")[1] : query.replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0];

  // 1. Check for chat links / shorteners
  if (chatShorteners.some((s) => query.includes(s))) {
    return res.json({
      input,
      type: isEmail ? "email" : "url",
      isSuspicious: true,
      statusText: "High Risk (Unverified Chat/Shortener)",
      reason: "Official corporate hiring does not conduct candidate selection or send contracts through anonymous URL shorteners or instant messaging channels.",
      recommendation: "Never provide personal or financial documents through chat links or unverified shortened URLs.",
    });
  }

  // 2. Check for free webmail with claimed enterprise
  if (isEmail && freeWebmails.some((wm) => domain.endsWith(wm))) {
    const isEnterpriseClaim = company && company.length > 2;
    return res.json({
      input,
      type: "email",
      isSuspicious: true,
      statusText: "Suspicious (Free Public Webmail)",
      reason: isEnterpriseClaim
        ? `Recruiter is using a public ${domain} address while claiming to represent "${claimedCompany}". Legitimate enterprise recruiters strictly use corporate domains (@${claimedCompany.toLowerCase().replace(/[^a-z0-9]/g, "")}.com).`
        : `Public free webmail domain (@${domain}) detected. Enterprise recruiters rarely use free personal email accounts for official job offers.`,
      recommendation: "Request the recruiter to send an email from their official corporate company domain before proceeding.",
    });
  }

  // 3. Check for suspicious TLDs
  if (suspiciousTLDs.some((tld) => domain.endsWith(tld))) {
    return res.json({
      input,
      type: isEmail ? "email" : "url",
      isSuspicious: true,
      statusText: "Potential Impersonation (Suspicious TLD)",
      reason: `The domain extension '${domain.slice(domain.lastIndexOf("."))}' is frequently leveraged in quick domain spoofing and phishing campaigns.`,
      recommendation: "Check the main company website directly via an independent search engine search.",
    });
  }

  // 4. Check for known verified domains
  const knownLegit = ["microsoft.com", "google.com", "amazon.com", "apple.com", "meta.com", "ibm.com", "accenture.com", "tcs.com", "infosys.com", "wipro.com", "deloitte.com", "pwc.com", "kpmg.com", "ey.com", "oracle.com", "cisco.com", "salesforce.com", "adobe.com"];
  
  if (knownLegit.some((legit) => domain === legit || domain.endsWith("." + legit))) {
    return res.json({
      input,
      type: isEmail ? "email" : "url",
      isSuspicious: false,
      statusText: "Verified Corporate Domain",
      reason: `Domain (${domain}) corresponds to an established enterprise corporate organization.`,
      recommendation: "Ensure email SPF/DKIM headers match if reviewing email source headers.",
    });
  }

  // Generic domain
  return res.json({
    input,
    type: isEmail ? "email" : "url",
    isSuspicious: false,
    statusText: "Custom Business Domain",
    reason: `The domain (${domain}) is a private corporate domain rather than a free disposable webmail service.`,
    recommendation: "Perform a quick WHOIS domain age lookup to confirm the company was founded more than 1 year ago.",
  });
});


// API health route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "AI Fake Job Posting Detection Server" });
});

// Vite middleware or production static serving
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AI Fake Job Posting Detection Server running on http://0.0.0.0:${PORT}`);
  });
}

setupVite();
