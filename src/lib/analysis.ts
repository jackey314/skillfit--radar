import type {
  AnalysisResult,
  DomainDeltaItem,
  EvidenceBuildingAction,
  EvidenceGapItem,
  SkillEvidenceView,
} from "../types/analysis.ts";
import type { RoleSkillModel, SkillDefinition, SkillEvidenceResult } from "../types/skill.ts";
import {
  calculateCategoryScore,
  calculateGapPriority,
  calculateWeightedScore,
  getTopSkillGaps,
} from "./scoring.ts";

export function createAnalysisResult(
  roleModel: RoleSkillModel,
  evidenceResults: SkillEvidenceResult[],
  resumeText: string
): AnalysisResult {
  const evidenceBySkillId = new Map(evidenceResults.map((result) => [result.skillId, result]));
  const skillEvidenceRows = roleModel.skills.map((skill) =>
    createSkillEvidenceView(skill, evidenceBySkillId.get(skill.id))
  );
  const domainDelta = skillEvidenceRows
    .filter((item) => item.skill.category === "aiCore")
    .map((item) => ({
      ...item,
      gapPriority: calculateGapPriority(item.evidenceLevel, item.skill.weight),
    }))
    .sort(sortByGapPriority);
  const evidenceGaps = domainDelta
    .filter((item) => item.evidenceLevel < 3)
    .map((item, index) => ({ ...item, priorityRank: index + 1 }));
  const topPriorityGaps = getTopSkillGaps(roleModel.skills, evidenceResults, 3).map(
    (gap, index) => ({
      skill: gap.skill,
      evidenceLevel: gap.evidenceLevel,
      gapPriority: gap.gapPriority,
      resumeEvidence: gap.resumeEvidence,
      missingEvidence: gap.missingEvidence,
      reason: evidenceBySkillId.get(gap.skill.id)?.reason ?? "简历中暂未出现足够证据。",
      priorityRank: index + 1,
    })
  );

  return {
    roleId: roleModel.roleId,
    roleName: roleModel.roleName,
    modelVersion: roleModel.version,
    resumeText,
    scores: {
      overall: calculateWeightedScore(roleModel.skills, evidenceResults),
      aiCore: calculateCategoryScore("aiCore", roleModel.skills, evidenceResults),
      productFundamental: calculateCategoryScore(
        "productFundamental",
        roleModel.skills,
        evidenceResults
      ),
    },
    transferableStrengths: skillEvidenceRows
      .filter((item) => item.skill.category === "productFundamental" && item.evidenceLevel >= 3)
      .sort(sortByEvidenceLevelAndWeight),
    domainDelta,
    evidenceGaps,
    topPriorityGaps,
    skillEvidenceRows,
    actions30Day: createEvidenceBuildingActions(topPriorityGaps),
    evidenceResults,
  };
}

function createSkillEvidenceView(
  skill: SkillDefinition,
  evidenceResult: SkillEvidenceResult | undefined
): SkillEvidenceView {
  return {
    skill,
    evidenceLevel: evidenceResult?.evidenceLevel ?? 0,
    resumeEvidence: evidenceResult?.resumeEvidence ?? [],
    reason: evidenceResult?.reason ?? "简历中暂未出现足够证据。",
    missingEvidence: evidenceResult?.missingEvidence ?? skill.strongEvidenceSignals,
  };
}

function createEvidenceBuildingActions(gaps: EvidenceGapItem[]): EvidenceBuildingAction[] {
  return [...gaps].sort(sortByActionPlanOrder).map((gap) => {
    const action = actionBySkillId[gap.skill.id] ?? defaultAction(gap.skill);

    return {
      skillId: gap.skill.id,
      skillName: gap.skill.name,
      ...action,
    };
  });
}

function sortByActionPlanOrder(a: EvidenceGapItem, b: EvidenceGapItem): number {
  const actionPlanOrder = ["H08", "H05", "H07"];
  const aIndex = actionPlanOrder.indexOf(a.skill.id);
  const bIndex = actionPlanOrder.indexOf(b.skill.id);

  if (aIndex === -1 && bIndex === -1) return a.priorityRank - b.priorityRank;
  if (aIndex === -1) return 1;
  if (bIndex === -1) return -1;
  return aIndex - bIndex;
}

function sortByGapPriority(a: DomainDeltaItem, b: DomainDeltaItem): number {
  return b.gapPriority - a.gapPriority;
}

function sortByEvidenceLevelAndWeight(a: SkillEvidenceView, b: SkillEvidenceView): number {
  if (b.evidenceLevel !== a.evidenceLevel) return b.evidenceLevel - a.evidenceLevel;
  return b.skill.weight - a.skill.weight;
}

function defaultAction(skill: SkillDefinition): Omit<EvidenceBuildingAction, "skillId" | "skillName"> {
  return {
    title: `补齐「${skill.name}」的项目证据`,
    steps: [
      "选择一个真实业务任务，写清用户、场景、输入、输出和成功标准。",
      "做一个可演示原型，并记录关键方案取舍。",
      "用小规模测试验证效果，整理结果和下一版迭代方向。",
    ],
    expectedArtifacts: ["业务任务说明", "可演示原型", "测试记录", "复盘文档"],
    resumeBulletAfterCompletion: `围绕真实业务场景完成「${skill.name}」项目验证，并沉淀方案、测试和复盘证据。`,
  };
}

const actionBySkillId: Record<
  string,
  Omit<EvidenceBuildingAction, "skillId" | "skillName">
> = {
  H05: {
    title: "第 8-14 天：建立 AI Response Evaluation 表",
    steps: [
      "人为制作 50 条测试问题，覆盖正确回答、错误回答、幻觉和无法回答。",
      "为每条问题标注理想答案、判断标准、错误类型和是否需要人工接管。",
      "用同一批问题测试 Demo 输出，记录 Accuracy、Relevance、Hallucination 和无法回答比例。",
      "整理 Bad Case 分类，说明下一轮该改 Prompt、知识库内容还是产品流程。",
    ],
    expectedArtifacts: ["50 条测试问题", "AI Response Evaluation 表", "Bad Case 分类", "版本对比记录"],
    resumeBulletAfterCompletion:
      "为 AI 客服知识库 Demo 建立 50 条 Response Evaluation 测试集，覆盖正确、错误、幻觉与无法回答场景，并基于 Bad Case 推动 Prompt 与知识库迭代。",
  },
  H08: {
    title: "第 1-7 天：做一个 AI 客服知识库 Demo",
    steps: [
      "选一个具体客服场景，写清用户、问题来源、知识库范围和成功标准。",
      "完成一个可运行 Demo，必须包含 LLM API、Prompt 和 RAG 知识库检索。",
      "设计最小产品流程：用户提问、检索来源、模型回答、人工确认。",
      "记录技术选择和产品取舍，说明为什么不是只做一个聊天框。",
    ],
    expectedArtifacts: ["AI 客服知识库 Demo", "LLM API 接入说明", "Prompt 模板", "RAG 知识库说明"],
    resumeBulletAfterCompletion:
      "独立完成 AI 客服知识库 Demo，从客服场景定义、LLM API 接入、Prompt 设计到 RAG 知识库检索，形成可演示的 AI 产品经历。",
  },
  H07: {
    title: "第 15-30 天：补齐兜底机制并包装进简历",
    steps: [
      "第 15-21 天：设计 fallback、重新生成、引用来源和用户反馈入口。",
      "把无法回答、低置信度、来源缺失和用户差评分别接入不同兜底策略。",
      "第 22-30 天：把项目包装成需求背景、方案、Prompt 实验、模型选择、Evaluation、数据结果和迭代。",
      "把最终项目沉淀成作品集页面和一条能放进简历的项目经历。",
    ],
    expectedArtifacts: ["Fallback 流程", "引用来源设计", "用户反馈记录", "简历项目包装"],
    resumeBulletAfterCompletion:
      "为 AI 客服知识库 Demo 设计 fallback、重新生成、引用来源和用户反馈机制，并将 Prompt 实验、模型选择、Evaluation 与数据结果包装为完整简历项目。",
  },
};
