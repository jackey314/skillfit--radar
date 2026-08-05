export type SkillCategory = "aiCore" | "productFundamental";

export type EvidenceLevel = 0 | 1 | 2 | 3 | 4;

export type VerticalContext =
  | "enterpriseAgent"
  | "b2bSaas"
  | "consumerAI"
  | "aigcCreative"
  | "aiCoding"
  | "multimodal"
  | "ecommerceGrowth"
  | "crmSalesService"
  | "workflowAutomation";

export interface EvidenceBasis {
  hasKnowledge: boolean;
  hasAppliedAction: boolean;
  hasDelivery: boolean;
  hasMeasuredOutcome: boolean;
  hasDecisionEvidence: boolean;
}

export interface SkillDefinition {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  weight: number;
  aliases: string[];
  evidenceSignals: string[];
  strongEvidenceSignals: string[];
  weakEvidenceSignals: string[];
}

export interface SkillEvidenceResult {
  skillId: string;
  evidenceLevel: EvidenceLevel;
  resumeEvidence: string[];
  evidenceBasis: EvidenceBasis;
  reason: string;
  missingEvidence: string[];
}

export interface RoleSkillModel {
  roleId: string;
  roleName: string;
  version: string;
  description: string;
  verticalContexts?: VerticalContext[];
  skills: SkillDefinition[];
}
