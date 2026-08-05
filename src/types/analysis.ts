import type { EvidenceLevel, SkillDefinition, SkillEvidenceResult } from "./skill.ts";

export interface ScoreBreakdown {
  overall: number;
  aiCore: number;
  productFundamental: number;
}

export interface SkillEvidenceView {
  skill: SkillDefinition;
  evidenceLevel: EvidenceLevel;
  resumeEvidence: string[];
  reason: string;
  missingEvidence: string[];
}

export interface DomainDeltaItem extends SkillEvidenceView {
  gapPriority: number;
}

export interface EvidenceGapItem extends DomainDeltaItem {
  priorityRank: number;
}

export interface EvidenceBuildingAction {
  skillId: string;
  skillName: string;
  title: string;
  steps: string[];
  expectedArtifacts: string[];
  resumeBulletAfterCompletion: string;
}

export interface AnalysisResult {
  roleId: string;
  roleName: string;
  modelVersion: string;
  resumeText: string;
  scores: ScoreBreakdown;
  transferableStrengths: SkillEvidenceView[];
  domainDelta: DomainDeltaItem[];
  evidenceGaps: EvidenceGapItem[];
  topPriorityGaps: EvidenceGapItem[];
  skillEvidenceRows: SkillEvidenceView[];
  actions30Day: EvidenceBuildingAction[];
  evidenceResults: SkillEvidenceResult[];
}
