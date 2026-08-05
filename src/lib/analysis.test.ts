import assert from "node:assert/strict";
import { aiProductManagerModel } from "../data/aiProductManager.ts";
import { mockAnalysisResult } from "../data/mockAnalysisResult.ts";
import { mockResumeEvidenceResults } from "../data/mockResumeEvidence.ts";
import { calculateCategoryScore, calculateWeightedScore } from "./scoring.ts";

assert.equal(
  mockAnalysisResult.scores.overall,
  calculateWeightedScore(aiProductManagerModel.skills, mockResumeEvidenceResults)
);
assert.equal(
  mockAnalysisResult.scores.aiCore,
  calculateCategoryScore("aiCore", aiProductManagerModel.skills, mockResumeEvidenceResults)
);
assert.equal(
  mockAnalysisResult.scores.productFundamental,
  calculateCategoryScore(
    "productFundamental",
    aiProductManagerModel.skills,
    mockResumeEvidenceResults
  )
);

assert.equal(mockAnalysisResult.roleName, "生成式 AI 应用产品经理");
assert.equal(mockAnalysisResult.evidenceResults.length, 14);
assert.equal(mockAnalysisResult.skillEvidenceRows.length, 14);
assert.equal(mockAnalysisResult.topPriorityGaps.length, 3);
assert.deepEqual(
  mockAnalysisResult.topPriorityGaps.map((gap) => gap.skill.id),
  ["H05", "H08", "H07"]
);
assert.ok(mockAnalysisResult.scores.productFundamental > mockAnalysisResult.scores.aiCore);
assert.ok(mockAnalysisResult.transferableStrengths.length > 0);
assert.ok(mockAnalysisResult.actions30Day.length === 3);

console.log("analysis tests passed");
