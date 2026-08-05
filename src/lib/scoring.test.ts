import assert from "node:assert/strict";
import {
  calculateEvidenceLevel,
  calculateSkillScore,
  calculateWeightedScore,
  getTopSkillGaps,
} from "./scoring.ts";
import type { EvidenceBasis, SkillDefinition, SkillEvidenceResult } from "../types/skill.ts";

function basis(overrides: Partial<EvidenceBasis> = {}): EvidenceBasis {
  return {
    hasKnowledge: false,
    hasAppliedAction: false,
    hasDelivery: false,
    hasMeasuredOutcome: false,
    hasDecisionEvidence: false,
    ...overrides,
  };
}

function skill(id: string, weight: number): SkillDefinition {
  return {
    id,
    name: id,
    category: "aiCore",
    description: "",
    weight,
    aliases: [],
    evidenceSignals: [],
    strongEvidenceSignals: [],
    weakEvidenceSignals: [],
  };
}

function evidence(skillId: string, evidenceBasis: EvidenceBasis): SkillEvidenceResult {
  return {
    skillId,
    evidenceLevel: calculateEvidenceLevel(evidenceBasis),
    resumeEvidence: [`evidence for ${skillId}`],
    evidenceBasis,
    reason: "",
    missingEvidence: [`missing for ${skillId}`],
  };
}

assert.equal(calculateEvidenceLevel(basis()), 0);
assert.equal(calculateEvidenceLevel(basis({ hasKnowledge: true })), 1);
assert.equal(calculateEvidenceLevel(basis({ hasAppliedAction: true })), 2);
assert.equal(calculateEvidenceLevel(basis({ hasDelivery: true })), 3);
assert.equal(calculateEvidenceLevel(basis({ hasDelivery: true, hasMeasuredOutcome: true })), 4);

assert.equal(calculateSkillScore(2, 5), 2.5);

const weightedSkills = [skill("S01", 5)];
assert.equal(calculateWeightedScore(weightedSkills, []), 0);

const gapSkills = [skill("LOW_WEIGHT_LOW_LEVEL", 1), skill("HIGH_WEIGHT_LOW_LEVEL", 5), skill("HIGH_WEIGHT_HIGH_LEVEL", 5)];
const gapResults = [
  evidence("LOW_WEIGHT_LOW_LEVEL", basis()),
  evidence("HIGH_WEIGHT_LOW_LEVEL", basis()),
  evidence("HIGH_WEIGHT_HIGH_LEVEL", basis({ hasDelivery: true, hasMeasuredOutcome: true })),
];
const topGaps = getTopSkillGaps(gapSkills, gapResults, 2);

assert.equal(topGaps[0]?.skill.id, "HIGH_WEIGHT_LOW_LEVEL");
assert.equal(topGaps[0]?.gapPriority, 20);
assert.equal(topGaps[1]?.skill.id, "LOW_WEIGHT_LOW_LEVEL");

console.log("scoring tests passed");
