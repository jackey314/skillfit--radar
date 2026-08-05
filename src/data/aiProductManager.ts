import type { RoleSkillModel, SkillDefinition } from "../types/skill.ts";

export const aiProductManagerSkills: SkillDefinition[] = [
  {
    id: "H01",
    name: "AI 能力与边界理解",
    category: "aiCore",
    description:
      "理解生成式 AI、LLM、RAG、Agent 等能力适合解决什么问题，也能识别幻觉、上下文限制、响应不稳定和成本延迟等边界。",
    weight: 5,
    aliases: [
      "AI Capability Understanding",
      "LLM capability boundary",
      "模型能力理解",
      "大模型边界判断",
    ],
    evidenceSignals: [
      "分析过某个业务问题是否适合使用生成式 AI 解决",
      "在方案中明确说明模型可能失败、误答或无法回答的场景",
      "对比过规则、搜索、传统算法和 LLM 方案的适用边界",
    ],
    strongEvidenceSignals: [
      "在真实项目中基于业务场景判断 AI 是否值得做，并说明不做或降级的原因",
      "上线前识别模型幻觉、上下文长度、延迟、成本等风险，并设计兜底方案",
      "用用户反馈或测试结果修正过对 AI 能力边界的判断",
    ],
    weakEvidenceSignals: [
      "熟悉 ChatGPT、Dify、RAG、Agent 等工具名",
      "学习过大模型相关课程或文章",
      "在简历中笼统写了解 AI 产品或 AIGC",
    ],
  },
  {
    id: "H02",
    name: "AI 场景识别与任务定义",
    category: "aiCore",
    description:
      "能从真实业务流程中识别适合 AI 介入的任务，定义用户目标、输入输出、成功标准和人工介入边界。",
    weight: 5,
    aliases: [
      "AI Opportunity Discovery",
      "Task Framing",
      "AI 场景挖掘",
      "任务定义",
    ],
    evidenceSignals: [
      "拆解过用户工作流，并标注 AI 可以介入的具体任务节点",
      "定义过 AI 功能的目标用户、输入、输出和成功标准",
      "区分过自动完成、辅助建议、人工确认等不同任务形态",
    ],
    strongEvidenceSignals: [
      "基于访谈、数据或业务流程发现 AI 机会，并推动进入产品方案",
      "把模糊需求收敛成明确的 AI 任务定义、边界和验收标准",
      "证明某个 AI 场景能减少人工成本、缩短流程或提升任务成功率",
    ],
    weakEvidenceSignals: [
      "提出想做 AI 助手、AI Copilot、智能客服等概念",
      "只描述 AI 可以提升效率，但没有具体任务和场景",
      "把热门 AI 产品形态直接套到业务中",
    ],
  },
  {
    id: "H03",
    name: "AI 交互与工作流设计",
    category: "aiCore",
    description:
      "设计 AI 产品中的输入、生成、追问、确认、编辑、撤销、失败重试和人工接管流程，让用户可理解、可控制地完成任务。",
    weight: 5,
    aliases: [
      "AI Interaction Design",
      "AI Workflow Design",
      "Agent Workflow",
      "AI 产品交互",
    ],
    evidenceSignals: [
      "设计过 AI 功能的多轮交互流程或状态机",
      "覆盖过生成中、生成失败、重新生成、人工确认等状态",
      "将复杂业务流程改造成 AI 辅助或 Agent 工作流",
    ],
    strongEvidenceSignals: [
      "完成过 AI 功能从用户输入到结果确认的完整工作流设计",
      "基于测试反馈优化 AI 交互路径，降低误用或提升完成率",
      "设计过异常、失败、撤销、人工接管等关键体验，并进入交付或上线",
    ],
    weakEvidenceSignals: [
      "画过 AI 产品概念页或聊天框界面",
      "做过普通 B 端流程设计，但没有 AI 输出与异常处理",
      "使用过 AI 工具生成页面草图",
    ],
  },
  {
    id: "H04",
    name: "上下文、Prompt 与工具编排",
    category: "aiCore",
    description:
      "能围绕用户任务设计上下文来源、Prompt 策略、知识库、工具调用和多步骤执行逻辑，使 AI 输出更稳定、更贴近业务。",
    weight: 4,
    aliases: [
      "Context Orchestration",
      "Prompt Orchestration",
      "Tool Orchestration",
      "RAG 编排",
    ],
    evidenceSignals: [
      "设计过 Prompt 模板、变量或多轮上下文策略",
      "接入过知识库、文档检索、插件或外部工具",
      "定义过不同输入条件下 AI 应该调用哪些信息或工具",
    ],
    strongEvidenceSignals: [
      "在项目中通过 Prompt、知识库或工具调用提升输出稳定性",
      "根据 bad case 调整上下文、提示词或工具调用策略",
      "说明过上下文来源、调用顺序、失败兜底和验收方式",
    ],
    weakEvidenceSignals: [
      "会写提示词或使用 Prompt Engineering",
      "熟悉 Dify、Coze、LangChain 等工具",
      "做过知识库 demo，但没有说明业务任务和效果验证",
    ],
  },
  {
    id: "H05",
    name: "AI 评测与质量体系",
    category: "aiCore",
    description:
      "能建立 AI 输出质量的评测方法，包括测试集、指标、bad case 分类、版本对比和回归测试。",
    weight: 5,
    aliases: [
      "AI Evaluation",
      "AI Quality System",
      "模型输出评测",
      "大模型评估",
    ],
    evidenceSignals: [
      "制作过测试问题集或评测样本",
      "定义过准确性、相关性、幻觉率、任务成功率等指标",
      "根据 bad case 分析推动 Prompt、数据或流程迭代",
    ],
    strongEvidenceSignals: [
      "建立过 AI 功能评测集，并用于多个版本对比",
      "用量化指标证明 AI 输出质量提升或错误率下降",
      "把 bad case 分类结果转化为产品、Prompt 或知识库改进",
    ],
    weakEvidenceSignals: [
      "根据主观体验判断 AI 回答好不好",
      "简单测试过几个问题",
      "写过持续优化 Prompt，但没有评测标准或结果",
    ],
  },
  {
    id: "H06",
    name: "AI 稳定性、安全与可控性",
    category: "aiCore",
    description:
      "识别 AI 产品中的不稳定、误导、隐私、权限、内容安全和误操作风险，并设计控制、审核、兜底和人工确认机制。",
    weight: 3,
    aliases: [
      "AI Reliability",
      "AI Safety",
      "AI Control",
      "AI 风险控制",
    ],
    evidenceSignals: [
      "设计过 AI 失败兜底、人工确认或人工接管机制",
      "考虑过权限、隐私、敏感内容或错误输出风险",
      "为高风险 AI 输出设计过确认、撤销、审核或提示机制",
    ],
    strongEvidenceSignals: [
      "在真实业务中识别 AI 风险，并通过流程或交互机制降低风险",
      "为不同风险等级设计不同的人工确认或审核策略",
      "上线后通过监控、反馈或指标发现并修复稳定性问题",
    ],
    weakEvidenceSignals: [
      "知道 AI 会有幻觉",
      "笼统提到安全、合规、隐私",
      "只在概念方案中写风险提示，没有具体控制方式",
    ],
  },
  {
    id: "H07",
    name: "AI 实验与数据迭代",
    category: "aiCore",
    description:
      "能围绕 AI 功能设计实验、采集反馈、观察指标，并基于数据和用户行为持续迭代。",
    weight: 4,
    aliases: [
      "AI Experimentation",
      "AI Product Iteration",
      "AI 数据迭代",
      "AI A/B Test",
    ],
    evidenceSignals: [
      "设计过 AI 功能实验或灰度验证",
      "跟踪过采纳率、任务成功率、人工修改率、转人工率等指标",
      "根据数据和用户反馈迭代 AI 功能",
    ],
    strongEvidenceSignals: [
      "通过实验验证 AI 功能是否带来业务或体验提升",
      "用指标对比迭代前后效果，并据此调整产品策略",
      "建立过反馈采集机制，让用户行为反哺 AI 功能优化",
    ],
    weakEvidenceSignals: [
      "上线后持续优化功能",
      "看过用户反馈",
      "写过数据驱动，但没有说明 AI 指标或实验设计",
    ],
  },
  {
    id: "H08",
    name: "AI 产品落地与交付",
    category: "aiCore",
    description:
      "能推动 AI 产品从需求、方案、原型、技术协作、测试、上线到复盘的完整交付过程。",
    weight: 5,
    aliases: [
      "AI Product Delivery",
      "AI 产品上线",
      "AI 项目交付",
      "AI 产品落地",
    ],
    evidenceSignals: [
      "负责过 AI 功能从需求到上线的完整或关键环节",
      "与算法、工程、设计、运营协作推动 AI 功能交付",
      "上线后有业务结果、用户反馈或指标复盘",
    ],
    strongEvidenceSignals: [
      "独立或核心负责 AI 产品上线，并有明确交付范围和结果",
      "解决过模型、工程、体验或业务之间的落地冲突",
      "上线后产生可验证结果，例如效率提升、转人工下降、满意度提升",
    ],
    weakEvidenceSignals: [
      "参与过 AI 项目讨论",
      "做过 AI 概念 demo",
      "负责过普通产品上线，但没有 AI 相关交付证据",
    ],
  },
  {
    id: "P01",
    name: "用户研究",
    category: "productFundamental",
    description: "通过访谈、观察、问卷、数据反馈等方式理解用户目标、痛点和真实使用场景。",
    weight: 4,
    aliases: ["User Research", "用户访谈", "用户调研", "用研"],
    evidenceSignals: [
      "做过用户访谈、问卷、可用性测试或现场观察",
      "从用户反馈中提炼需求、痛点或机会点",
      "将研究结果转化为产品方案或优先级",
    ],
    strongEvidenceSignals: [
      "基于真实用户研究改变过产品方向、流程或功能优先级",
      "沉淀过用户画像、旅程图、研究报告，并推动方案落地",
      "通过用户研究发现关键问题并产生可验证改进结果",
    ],
    weakEvidenceSignals: [
      "了解用户需求",
      "参与用户沟通",
      "根据用户反馈优化产品，但没有说明方法和产出",
    ],
  },
  {
    id: "P02",
    name: "需求分析",
    category: "productFundamental",
    description: "将业务目标、用户问题和约束条件拆解成清晰的需求范围、优先级和验收标准。",
    weight: 4,
    aliases: ["Requirement Analysis", "需求拆解", "需求定义", "需求管理"],
    evidenceSignals: [
      "拆解过业务需求、用户需求和功能需求",
      "定义过需求优先级、范围、边界和验收标准",
      "处理过需求冲突或范围取舍",
    ],
    strongEvidenceSignals: [
      "将模糊业务诉求转化为可交付需求，并推动上线",
      "在约束条件下做过需求取舍，并说明判断依据",
      "需求分析直接影响产品指标、效率或用户体验结果",
    ],
    weakEvidenceSignals: [
      "负责需求整理",
      "参与需求评审",
      "写过需求文档，但没有体现分析和取舍",
    ],
  },
  {
    id: "P03",
    name: "产品设计",
    category: "productFundamental",
    description: "设计产品流程、信息结构、原型和关键交互，使需求转化为用户可使用的产品方案。",
    weight: 4,
    aliases: ["Product Design", "原型设计", "流程设计", "交互设计"],
    evidenceSignals: [
      "输出过流程图、信息架构、原型或产品方案",
      "设计过核心用户路径和关键页面状态",
      "根据评审或测试反馈迭代产品设计",
    ],
    strongEvidenceSignals: [
      "独立完成从需求到原型再到上线验收的产品设计",
      "产品设计解决了明确的业务或用户问题，并有结果证明",
      "在复杂约束下平衡体验、技术实现和业务目标",
    ],
    weakEvidenceSignals: [
      "会画原型",
      "熟悉 Figma、Axure 等工具",
      "负责页面设计，但没有说明产品问题和方案判断",
    ],
  },
  {
    id: "P04",
    name: "数据分析",
    category: "productFundamental",
    description: "使用数据理解问题、验证假设、评估功能效果，并指导产品迭代。",
    weight: 4,
    aliases: ["Data Analysis", "指标分析", "数据驱动", "SQL 分析"],
    evidenceSignals: [
      "使用数据定位问题或验证产品假设",
      "定义过产品指标、漏斗、转化或留存分析",
      "根据数据结果推动功能迭代或策略调整",
    ],
    strongEvidenceSignals: [
      "通过数据分析发现关键问题，并推动上线改进产生指标变化",
      "建立过产品指标体系或分析看板",
      "用实验或对比数据证明产品方案有效",
    ],
    weakEvidenceSignals: [
      "会 SQL、Excel、Python 或 BI 工具",
      "看过后台数据",
      "写过数据分析，但没有说明决策和结果",
    ],
  },
  {
    id: "P05",
    name: "项目推进",
    category: "productFundamental",
    description: "能管理节奏、拆解任务、对齐风险和资源，推动产品从方案进入交付。",
    weight: 3,
    aliases: ["Project Delivery", "项目管理", "项目推进", "落地推进"],
    evidenceSignals: [
      "推动过需求评审、排期、开发、测试和上线",
      "协调过资源、风险、进度或版本范围",
      "在项目延迟、资源冲突或需求变化时推动解决",
    ],
    strongEvidenceSignals: [
      "主导跨角色项目按期上线，并能说明关键风险和解决动作",
      "在复杂约束下推动项目交付并产生业务结果",
      "建立过协作流程或机制，提升交付质量或效率",
    ],
    weakEvidenceSignals: [
      "参与项目推进",
      "跟进研发进度",
      "协助上线，但没有说明责任范围和结果",
    ],
  },
  {
    id: "P06",
    name: "跨团队协作",
    category: "productFundamental",
    description: "能与研发、设计、算法、运营、销售、客户或业务方协作，推动目标一致和问题解决。",
    weight: 3,
    aliases: ["Cross-functional Collaboration", "跨部门协作", "沟通协调", "团队协作"],
    evidenceSignals: [
      "与多个角色协作完成产品交付",
      "组织过评审、对齐会、复盘或跨团队沟通",
      "处理过不同团队之间的目标冲突或方案分歧",
    ],
    strongEvidenceSignals: [
      "在跨团队冲突中推动形成可执行方案并完成交付",
      "对齐业务、技术、体验之间的取舍，并产生结果",
      "建立过跨团队协作机制，减少返工或提升效率",
    ],
    weakEvidenceSignals: [
      "沟通能力强",
      "具备团队合作精神",
      "日常与研发或设计沟通",
    ],
  },
];

export const aiProductManagerModel: RoleSkillModel = {
  roleId: "generative-ai-application-product-manager",
  roleName: "生成式 AI 应用产品经理",
  version: "0.1.0",
  description:
    "面向真实业务场景，将生成式 AI 能力转化为可验证、可交付、可迭代的产品方案。",
  verticalContexts: [
    "enterpriseAgent",
    "b2bSaas",
    "consumerAI",
    "aigcCreative",
    "aiCoding",
    "multimodal",
    "ecommerceGrowth",
    "crmSalesService",
    "workflowAutomation",
  ],
  skills: aiProductManagerSkills,
};

export const aiCoreSkills = aiProductManagerSkills.filter(
  (skill) => skill.category === "aiCore"
);

export const productFundamentalSkills = aiProductManagerSkills.filter(
  (skill) => skill.category === "productFundamental"
);

export function getAiProductManagerSkillById(skillId: string): SkillDefinition | undefined {
  return aiProductManagerSkills.find((skill) => skill.id === skillId);
}
