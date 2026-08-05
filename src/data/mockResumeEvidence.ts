import type { SkillEvidenceResult } from "../types/skill.ts";

export const mockResumeText = `候选人：林澈，3 年 B 端 SaaS（面向企业的软件服务）产品经理，正在转向生成式 AI（人工智能）应用产品经理。

经历摘要：
- 负责企业 CRM（客户关系管理）线索管理模块，完成用户访谈、需求拆解、原型设计和上线推进。
- 通过销售团队访谈发现线索跟进记录分散、查询成本高，重构线索详情页和提醒流程。
- 独立输出 PRD（产品需求文档）、流程图、原型和验收标准，协同设计、前端、后端在 6 周内上线。
- 上线后线索跟进完成率从 64% 提升至 79%，销售查询客户历史记录的平均时间下降 32%。
- 使用 SQL（结构化查询语言）和 BI（商业智能）看板分析转化漏斗，定位高价值线索流失节点，并推动运营调整跟进策略。
- 近期做过一个 AI（人工智能）销售助手概念 Demo（演示样例）：整理销售常见问题，尝试用 ChatGPT（对话式 AI 工具）生成跟进话术，并设计了 AI（人工智能）建议卡片和人工确认入口。
- 在 Demo（演示样例）方案中说明 AI（人工智能）回答可能不准确，重要客户建议必须由销售确认后发送。
- 了解 RAG（检索增强生成）、Prompt（提示词）、Agent（智能体）、Dify（AI 应用搭建工具）等概念，但没有上线过真实 AI（人工智能）产品，也没有建立系统化评测集。`;

export const mockResumeEvidenceResults: SkillEvidenceResult[] = [
  {
    skillId: "H01",
    evidenceLevel: 2,
    resumeEvidence: [
      "在 Demo 方案中说明 AI 回答可能不准确，重要客户建议必须由销售确认后发送。",
    ],
    evidenceBasis: {
      hasKnowledge: true,
      hasAppliedAction: true,
      hasDelivery: false,
      hasMeasuredOutcome: false,
      hasDecisionEvidence: true,
    },
    reason: "有 AI 能力边界判断和人工确认设计，但仍停留在概念 Demo，未进入真实交付。",
    missingEvidence: ["真实业务上线前的模型风险清单", "延迟、成本、幻觉等边界验证", "上线后的反馈修正记录"],
  },
  {
    skillId: "H02",
    evidenceLevel: 2,
    resumeEvidence: [
      "近期做过一个 AI 销售助手概念 Demo：整理销售常见问题，尝试用 ChatGPT 生成跟进话术。",
    ],
    evidenceBasis: {
      hasKnowledge: true,
      hasAppliedAction: true,
      hasDelivery: false,
      hasMeasuredOutcome: false,
      hasDecisionEvidence: true,
    },
    reason: "能从销售场景识别 AI 介入点，但缺少完整任务定义、成功标准和真实业务验证。",
    missingEvidence: ["AI 任务输入输出定义", "成功标准", "人工介入边界", "业务收益验证"],
  },
  {
    skillId: "H03",
    evidenceLevel: 2,
    resumeEvidence: ["设计了 AI 建议卡片和人工确认入口。"],
    evidenceBasis: {
      hasKnowledge: true,
      hasAppliedAction: true,
      hasDelivery: false,
      hasMeasuredOutcome: false,
      hasDecisionEvidence: false,
    },
    reason: "有 AI 交互尝试，但没有覆盖生成失败、重试、撤销、人工接管等完整工作流。",
    missingEvidence: ["完整 AI 工作流", "失败重试状态", "人工接管流程", "用户测试反馈"],
  },
  {
    skillId: "H04",
    evidenceLevel: 1,
    resumeEvidence: ["了解 RAG、Prompt、Agent、Dify 等概念。"],
    evidenceBasis: {
      hasKnowledge: true,
      hasAppliedAction: false,
      hasDelivery: false,
      hasMeasuredOutcome: false,
      hasDecisionEvidence: false,
    },
    reason: "只有工具和概念层描述，未证明做过上下文来源、Prompt 策略或工具调用编排。",
    missingEvidence: ["Prompt 模板", "上下文来源设计", "知识库检索策略", "工具调用流程"],
  },
  {
    skillId: "H05",
    evidenceLevel: 0,
    resumeEvidence: [],
    evidenceBasis: {
      hasKnowledge: false,
      hasAppliedAction: false,
      hasDelivery: false,
      hasMeasuredOutcome: false,
      hasDecisionEvidence: false,
    },
    reason: "简历明确写到没有建立系统化评测集，暂未证明 AI 评测与质量体系能力。",
    missingEvidence: ["评测集", "评测指标", "Bad Case 分类", "版本对比", "回归测试"],
  },
  {
    skillId: "H06",
    evidenceLevel: 1,
    resumeEvidence: ["重要客户建议必须由销售确认后发送。"],
    evidenceBasis: {
      hasKnowledge: true,
      hasAppliedAction: false,
      hasDelivery: false,
      hasMeasuredOutcome: false,
      hasDecisionEvidence: true,
    },
    reason: "有安全和可控意识，但缺少真实产品中的权限、审核、降级和兜底机制设计。",
    missingEvidence: ["风险分级", "人工审核策略", "降级方案", "上线后稳定性监控"],
  },
  {
    skillId: "H07",
    evidenceLevel: 0,
    resumeEvidence: [],
    evidenceBasis: {
      hasKnowledge: false,
      hasAppliedAction: false,
      hasDelivery: false,
      hasMeasuredOutcome: false,
      hasDecisionEvidence: false,
    },
    reason: "简历没有 AI 功能实验、灰度验证或 AI 指标迭代证据。",
    missingEvidence: ["AI 采纳率", "任务成功率", "人工修改率", "A/B 或前后对比实验"],
  },
  {
    skillId: "H08",
    evidenceLevel: 0,
    resumeEvidence: [],
    evidenceBasis: {
      hasKnowledge: false,
      hasAppliedAction: false,
      hasDelivery: false,
      hasMeasuredOutcome: false,
      hasDecisionEvidence: false,
    },
    reason: "候选人做过 AI 概念 Demo，但没有真实 AI 产品上线或完整交付闭环。",
    missingEvidence: ["AI 产品上线", "技术协作交付", "验收清单", "上线后复盘结果"],
  },
  {
    skillId: "P01",
    evidenceLevel: 3,
    resumeEvidence: ["通过销售团队访谈发现线索跟进记录分散、查询成本高。"],
    evidenceBasis: {
      hasKnowledge: true,
      hasAppliedAction: true,
      hasDelivery: true,
      hasMeasuredOutcome: false,
      hasDecisionEvidence: true,
    },
    reason: "有真实用户访谈，并推动后续产品改版。",
    missingEvidence: ["更系统的研究报告", "访谈样本规模", "研究前后方案变化"],
  },
  {
    skillId: "P02",
    evidenceLevel: 4,
    resumeEvidence: [
      "通过销售团队访谈发现线索跟进记录分散、查询成本高，重构线索详情页和提醒流程。",
      "上线后线索跟进完成率从 64% 提升至 79%。",
    ],
    evidenceBasis: {
      hasKnowledge: true,
      hasAppliedAction: true,
      hasDelivery: true,
      hasMeasuredOutcome: true,
      hasDecisionEvidence: true,
    },
    reason: "需求分析来自真实问题，并通过上线结果验证。",
    missingEvidence: [],
  },
  {
    skillId: "P03",
    evidenceLevel: 4,
    resumeEvidence: [
      "独立输出 PRD、流程图、原型和验收标准，协同设计、前端、后端在 6 周内上线。",
      "销售查询客户历史记录的平均时间下降 32%。",
    ],
    evidenceBasis: {
      hasKnowledge: true,
      hasAppliedAction: true,
      hasDelivery: true,
      hasMeasuredOutcome: true,
      hasDecisionEvidence: true,
    },
    reason: "产品设计覆盖文档、原型、验收和上线结果。",
    missingEvidence: [],
  },
  {
    skillId: "P04",
    evidenceLevel: 3,
    resumeEvidence: ["使用 SQL 和 BI 看板分析转化漏斗，定位高价值线索流失节点。"],
    evidenceBasis: {
      hasKnowledge: true,
      hasAppliedAction: true,
      hasDelivery: true,
      hasMeasuredOutcome: false,
      hasDecisionEvidence: true,
    },
    reason: "有数据分析和业务决策证据，但该条没有直接量化分析动作自身带来的结果。",
    missingEvidence: ["实验设计", "指标对比", "分析动作带来的明确结果"],
  },
  {
    skillId: "P05",
    evidenceLevel: 3,
    resumeEvidence: ["协同设计、前端、后端在 6 周内上线。"],
    evidenceBasis: {
      hasKnowledge: true,
      hasAppliedAction: true,
      hasDelivery: true,
      hasMeasuredOutcome: false,
      hasDecisionEvidence: true,
    },
    reason: "有项目推进和上线交付证据。",
    missingEvidence: ["风险处理记录", "排期取舍", "交付效率指标"],
  },
  {
    skillId: "P06",
    evidenceLevel: 3,
    resumeEvidence: ["协同设计、前端、后端在 6 周内上线。"],
    evidenceBasis: {
      hasKnowledge: true,
      hasAppliedAction: true,
      hasDelivery: true,
      hasMeasuredOutcome: false,
      hasDecisionEvidence: false,
    },
    reason: "有跨团队协作并完成交付的证据。",
    missingEvidence: ["跨团队冲突处理", "协作机制沉淀", "减少返工或效率提升结果"],
  },
];
