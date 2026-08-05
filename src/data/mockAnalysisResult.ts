import { aiProductManagerModel } from "./aiProductManager.ts";
import { createAnalysisResult } from "../lib/analysis.ts";
import { mockResumeEvidenceResults, mockResumeText } from "./mockResumeEvidence.ts";

export const mockAnalysisResult = createAnalysisResult(
  aiProductManagerModel,
  mockResumeEvidenceResults,
  mockResumeText
);
