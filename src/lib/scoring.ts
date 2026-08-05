import type {
  EvidenceBasis,
  EvidenceLevel,
  SkillCategory,
  SkillDefinition,
  SkillEvidenceResult,
} from "../types/skill.ts";

export interface SkillGap {
  skill: SkillDefinition;
  evidenceLevel: EvidenceLevel;
  gapPriority: number;
  resumeEvidence: string[];
  missingEvidence: string[];
}

export function calculateEvidenceLevel(basis: EvidenceBasis): EvidenceLevel {
  if (basis.hasDelivery && basis.hasMeasuredOutcome) return 4;
  if (basis.hasDelivery) return 3;
  if (basis.hasAppliedAction) return 2;
  if (basis.hasKnowledge) return 1;
  return 0;
}

export function calculateSkillScore(evidenceLevel: EvidenceLevel, weight: number): number {
  if (!Number.isFinite(weight) || weight <= 0) return 0;
  return (evidenceLevel / 4) * weight;
}

export function calculateWeightedScore(
  skills: SkillDefinition[],
  evidenceResults: SkillEvidenceResult[]
): number {
  const maximumScore = skills.reduce((total, skill) => total + getSafeWeight(skill.weight), 0);
  if (maximumScore === 0) return 0;

  const evidenceBySkillId = createEvidenceMap(evidenceResults);
  const actualScore = skills.reduce((total, skill) => {
    const evidenceLevel = evidenceBySkillId.get(skill.id)?.evidenceLevel ?? 0;
    return total + calculateSkillScore(evidenceLevel, skill.weight);
  }, 0);

  return clampPercentage(Math.round((actualScore / maximumScore) * 100));
}

export function calculateCategoryScore(
  category: SkillCategory,
  skills: SkillDefinition[],
  evidenceResults: SkillEvidenceResult[]
): number {
  const categorySkills = skills.filter((skill) => skill.category === category);
  return calculateWeightedScore(categorySkills, evidenceResults);
}

export function calculateGapPriority(evidenceLevel: EvidenceLevel, weight: number): number {
  return getSafeWeight(weight) * (4 - evidenceLevel);
}

export function getTopSkillGaps(
  skills: SkillDefinition[],
  evidenceResults: SkillEvidenceResult[],
  limit = 3
): SkillGap[] {
  const evidenceBySkillId = createEvidenceMap(evidenceResults);

  return skills
    .map((skill) => {
      const evidenceResult = evidenceBySkillId.get(skill.id);
      const evidenceLevel = evidenceResult?.evidenceLevel ?? 0;

      return {
        skill,
        evidenceLevel,
        gapPriority: calculateGapPriority(evidenceLevel, skill.weight),
        resumeEvidence: evidenceResult?.resumeEvidence ?? [],
        missingEvidence: evidenceResult?.missingEvidence ?? [],
      };
    })
    .sort((a, b) => b.gapPriority - a.gapPriority)
    .slice(0, Math.max(0, limit));
}

function createEvidenceMap(
  evidenceResults: SkillEvidenceResult[]
): Map<string, SkillEvidenceResult> {
  return new Map(evidenceResults.map((result) => [result.skillId, result]));
}

function getSafeWeight(weight: number): number {
  if (!Number.isFinite(weight) || weight <= 0) return 0;
  return weight;
}

function clampPercentage(score: number): number {
  if (score < 0) return 0;
  if (score > 100) return 100;
  return score;
}
