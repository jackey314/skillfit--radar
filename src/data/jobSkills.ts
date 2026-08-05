export type SkillCategory = "hardSkill" | "domainExperience" | "softSkill";

export type EvidenceLayer =
  | "foundationSkill"
  | "roleSkill"
  | "verticalEvidence"
  | "transferableCapability";

export type RadarDimension =
  | "aiProductThinking"
  | "interactionDesign"
  | "domainVerticality"
  | "deliveryExecution"
  | "dataAndExperiment"
  | "collaboration";

export type MarketTrend = "highGrowth" | "stableGrowth" | "selectiveGrowth" | "uncertain";

export interface SalaryBenchmark {
  currency: "CNY" | "USD";
  region: string;
  annualRange: {
    low: number;
    median: number;
    high: number;
  };
  yearlyGrowthEstimate: string;
  note: string;
}

export interface MarketSignal {
  outlookYears: "2026-2030";
  trend: MarketTrend;
  verticalityScore: number;
  demandRationale: string;
  salaryBenchmarks: SalaryBenchmark[];
  sources: Array<{
    title: string;
    url: string;
  }>;
  jobPostingSignals: Array<{
    signal: string;
    interpretation: string;
  }>;
}

export interface JobSkill {
  id: string;
  name: string;
  category: SkillCategory;
  evidenceLayer: EvidenceLayer;
  description: string;
  weight: number;
  radarDimension: RadarDimension;
  keywordHints: string[];
  evidenceExamples: string[];
  evidenceQuestion: string;
}

export interface JobRole {
  id: string;
  name: string;
  aliases: string[];
  verticalField: string;
  description: string;
  whyVertical: string;
  evidenceGapDefinition: string;
  marketSignal: MarketSignal;
  skills: JobSkill[];
}

export interface SkillMatch {
  skillId: string;
  matched: boolean;
  evidenceText?: string;
  confidence?: number;
}

export interface RadarScore {
  dimension: RadarDimension;
  score: number;
  matchedWeight: number;
  totalWeight: number;
}

export const jobRoles: JobRole[] = [
  {
    id: "ai-agent-product-manager",
    name: "AI Agent 产品经理",
    aliases: ["AI 产品经理", "Agent PM", "大模型应用产品经理", "智能体产品经理"],
    verticalField: "AI Agent / 大模型应用落地",
    description:
      "连接业务场景、模型能力、工程实现和效果验证，负责把 Agent 能力转化为可上线、可评估、可迭代的产品方案。",
    whyVertical:
      "该岗位不是通用产品经理加 AI 工具使用，而是围绕 Agent 工作流、模型边界、评估体系、工具调用和业务落地的复合型岗位。",
    evidenceGapDefinition:
      "不是判断候选人会不会做产品，而是判断简历里是否出现过 Agent / LLM 产品从需求、模型边界、评估到上线迭代的真实证据。",
    marketSignal: {
      outlookYears: "2026-2030",
      trend: "highGrowth",
      verticalityScore: 92,
      demandRationale:
        "AI 岗位和 AI 产品经理需求在公开招聘报告中增长明显，企业正在从模型能力展示转向具体业务场景落地，因此需要懂产品、懂业务、懂 AI 边界的人。",
      salaryBenchmarks: [
        {
          currency: "CNY",
          region: "中国大陆",
          annualRange: { low: 430000, median: 550000, high: 700000 },
          yearlyGrowthEstimate: "普通产品经理基础上约 15%-25% AI 溢价，具体受城市、行业和级别影响。",
          note: "参考 Morgan McKinley 2026 中国大陆 AI 产品经理薪酬估算。",
        },
        {
          currency: "USD",
          region: "美国科技公司",
          annualRange: { low: 140000, median: 228000, high: 325000 },
          yearlyGrowthEstimate: "AI-native 公司总包弹性更大， equity 对总包影响显著。",
          note: "参考 2026 AI PM 薪酬公开汇总与 Levels.fyi 聚合口径。",
        },
      ],
      sources: [
        {
          title: "World Economic Forum Future of Jobs Report 2025",
          url: "https://www.weforum.org/press/2025/01/future-of-jobs-report-2025-78-million-new-job-opportunities-by-2030-but-urgent-upskilling-needed-to-prepare-workforces/",
        },
        {
          title: "中国日报：AI 产品经理岗位量增幅 369%",
          url: "https://cn.chinadaily.com.cn/a/202512/15/WS693fcfeca310942cc4996c1e.html",
        },
        {
          title: "Morgan McKinley 2026 中国大陆 AI 产品经理薪酬",
          url: "https://www.morganmckinley.com.cn/zh-hans/salary-guide/data/ai%E4%BA%A7%E5%93%81%E7%BB%8F%E7%90%86/%E4%B8%8A%E6%B5%B7",
        },
      ],
      jobPostingSignals: [
        {
          signal: "公开岗位中反复出现 Agent、RAG、Prompt、LLM、模型评估等要求",
          interpretation: "企业不是只要通用 PM，而是在找能把大模型能力产品化的人。",
        },
        {
          signal: "岗位职责同时要求产品设计、技术理解、业务落地和跨算法工程协作",
          interpretation: "该岗位具有明显复合性，招聘风险来自 AI 项目经验不足。",
        },
      ],
    },
    skills: [
      {
        id: "agent-workflow-design",
        name: "Agent 工作流设计",
        category: "hardSkill",
        evidenceLayer: "roleSkill",
        description: "能把用户任务拆成目标、步骤、工具调用、记忆、确认和异常处理流程。",
        weight: 10,
        radarDimension: "aiProductThinking",
        keywordHints: ["Agent", "工作流", "工具调用", "任务拆解", "自动化流程"],
        evidenceExamples: ["Agent 流程图", "工具调用设计文档", "任务拆解说明"],
        evidenceQuestion: "候选人是否实际设计过 Agent 工作流，而不是只使用过 AI 工具？",
      },
      {
        id: "llm-capability-boundary",
        name: "大模型能力边界判断",
        category: "hardSkill",
        evidenceLayer: "roleSkill",
        description: "理解模型擅长与不擅长的任务，并能设计兜底、人工确认和风险提示。",
        weight: 10,
        radarDimension: "aiProductThinking",
        keywordHints: ["大模型", "LLM", "模型边界", "幻觉", "兜底", "人工确认"],
        evidenceExamples: ["失败场景清单", "模型边界分析", "人工确认机制"],
        evidenceQuestion: "候选人是否处理过模型失败、幻觉或人工确认场景？",
      },
      {
        id: "prompt-evaluation",
        name: "Prompt 与效果评估",
        category: "hardSkill",
        evidenceLayer: "roleSkill",
        description: "能设计提示词、测试集、评价标准，并用结果反推产品迭代。",
        weight: 8,
        radarDimension: "dataAndExperiment",
        keywordHints: ["Prompt", "提示词", "测试集", "评估", "准确率", "召回率"],
        evidenceExamples: ["Prompt 迭代表", "评估指标", "测试集样例"],
        evidenceQuestion: "候选人是否做过 Prompt 实验和输出质量评估？",
      },
      {
        id: "rag-tool-use-basics",
        name: "RAG / 知识库 / 工具调用基础",
        category: "hardSkill",
        evidenceLayer: "roleSkill",
        description: "理解检索增强、知识库、插件和外部工具调用在产品中的适用边界。",
        weight: 8,
        radarDimension: "aiProductThinking",
        keywordHints: ["RAG", "知识库", "检索", "插件", "API", "工具调用"],
        evidenceExamples: ["RAG demo", "知识库问答原型", "接口字段说明"],
        evidenceQuestion: "候选人是否做过知识库、检索增强或工具调用相关项目？",
      },
      {
        id: "business-scenario-mapping",
        name: "业务场景映射",
        category: "domainExperience",
        evidenceLayer: "verticalEvidence",
        description: "能把行业流程、用户角色和业务指标映射到 AI 产品能力上。",
        weight: 10,
        radarDimension: "domainVerticality",
        keywordHints: ["业务场景", "用户角色", "行业流程", "业务指标", "降本增效"],
        evidenceExamples: ["业务流程图", "用户角色矩阵", "AI 介入点分析"],
        evidenceQuestion: "候选人是否在目标行业场景里找过 AI 介入点？",
      },
      {
        id: "vertical-data-awareness",
        name: "垂直数据意识",
        category: "domainExperience",
        evidenceLayer: "verticalEvidence",
        description: "理解目标领域的数据来源、数据质量、隐私边界和标注/反馈机制。",
        weight: 8,
        radarDimension: "domainVerticality",
        keywordHints: ["数据源", "数据质量", "标注", "隐私", "反馈闭环"],
        evidenceExamples: ["数据字段表", "反馈闭环设计", "数据风险说明"],
        evidenceQuestion: "候选人是否理解目标领域的数据结构、质量问题和反馈闭环？",
      },
      {
        id: "mvp-validation",
        name: "MVP 验证与迭代",
        category: "hardSkill",
        evidenceLayer: "foundationSkill",
        description: "能设计最小可行方案，用指标和用户反馈判断是否继续投入。",
        weight: 8,
        radarDimension: "deliveryExecution",
        keywordHints: ["MVP", "原型测试", "迭代", "验证", "用户反馈"],
        evidenceExamples: ["MVP 计划", "测试反馈记录", "迭代日志"],
        evidenceQuestion: "候选人是否用 MVP 或原型验证过产品假设？",
      },
      {
        id: "cross-functional-ai-collaboration",
        name: "跨算法 / 工程 / 业务协作",
        category: "softSkill",
        evidenceLayer: "transferableCapability",
        description: "能和算法、后端、前端、设计、业务方对齐边界、优先级和交付标准。",
        weight: 8,
        radarDimension: "collaboration",
        keywordHints: ["算法协作", "研发协作", "业务方", "对齐", "评审"],
        evidenceExamples: ["需求评审记录", "技术沟通纪要", "冲突取舍说明"],
        evidenceQuestion: "候选人是否证明过能推动算法、工程和业务达成可交付方案？",
      },
      {
        id: "product-requirement-writing",
        name: "AI 产品需求表达",
        category: "hardSkill",
        evidenceLayer: "foundationSkill",
        description: "能写清目标、用户故事、AI 能力边界、异常状态、验收标准和数据指标。",
        weight: 8,
        radarDimension: "deliveryExecution",
        keywordHints: ["PRD", "用户故事", "验收标准", "异常状态", "指标"],
        evidenceExamples: ["AI PRD", "验收清单", "用户故事地图"],
        evidenceQuestion: "候选人是否能把 AI 能力写成研发可执行的需求文档？",
      },
      {
        id: "uncertainty-judgement",
        name: "不确定性判断",
        category: "softSkill",
        evidenceLayer: "transferableCapability",
        description: "在模型效果、业务收益和实现成本不确定时，能做阶段性取舍。",
        weight: 6,
        radarDimension: "collaboration",
        keywordHints: ["取舍", "优先级", "风险", "成本", "收益"],
        evidenceExamples: ["方案取舍说明", "风险分级", "优先级矩阵"],
        evidenceQuestion: "候选人是否在不确定条件下做过明确的产品取舍？",
      },
    ],
  },
  {
    id: "ai-interaction-experience-designer",
    name: "AI 交互体验设计师",
    aliases: ["AI 产品体验设计师", "AI UX Designer", "大模型产品交互设计师"],
    verticalField: "AI Native 交互 / 大模型产品体验",
    description:
      "设计 AI 产品中的输入、生成、等待、确认、撤销、失败兜底和信任建立机制，让不确定的 AI 能力变成可理解、可控制的用户体验。",
    whyVertical:
      "该岗位的核心不再是传统页面和流程，而是 AI 输出的不确定性、信任感、可控性、生成过程和多轮交互体验。",
    evidenceGapDefinition:
      "不是判断候选人会不会画界面，而是判断作品集是否证明其设计过 AI 输出、失败、信任、确认和可控性体验。",
    marketSignal: {
      outlookYears: "2026-2030",
      trend: "highGrowth",
      verticalityScore: 88,
      demandRationale:
        "公开校招和岗位趋势中已出现 AI 产品线交互体验设计师，大模型产品需要交互、视觉、可用性测试和 AI 产品观察能力的组合。",
      salaryBenchmarks: [
        {
          currency: "CNY",
          region: "中国一线/新一线城市",
          annualRange: { low: 220000, median: 360000, high: 600000 },
          yearlyGrowthEstimate: "AI 产品经验可形成明显溢价，但低年限岗位竞争较强。",
          note: "综合 AI 设计岗位、UI/UX 岗位和产品设计岗位公开招聘区间估算。",
        },
        {
          currency: "USD",
          region: "美国 Web/Digital Interface Designer",
          annualRange: { low: 65000, median: 98090, high: 155000 },
          yearlyGrowthEstimate: "BLS 预计 web developers and digital designers 2024-2034 增长 7%。",
          note: "AI 体验方向可能高于普通数字界面设计，但公开统计尚未单列。",
        },
      ],
      sources: [
        {
          title: "牛客：2026 AI 产品线交互体验设计师岗位",
          url: "https://www.nowcoder.com/jobs/detail/429556",
        },
        {
          title: "BLS Web Developers and Digital Designers Outlook",
          url: "https://www.bls.gov/ooh/computer-and-information-technology/web-developers.htm",
        },
        {
          title: "2026 UI/UX 设计岗位技能趋势报告",
          url: "https://www.leapart.cn/resources/ui-ux-trend/",
        },
      ],
      jobPostingSignals: [
        {
          signal: "公开岗位开始出现 AI 产品线交互体验设计师、AI UX、生成式产品体验等名称",
          interpretation: "设计岗位正在从传统页面交互转向 AI Native 体验设计。",
        },
        {
          signal: "岗位要求包含 AI 产品观察、交互设计、视觉设计、可用性测试和研发协作",
          interpretation: "企业在控制 AI 产品体验不确定性带来的落地风险。",
        },
      ],
    },
    skills: [
      {
        id: "ai-interaction-patterns",
        name: "AI 交互模式设计",
        category: "hardSkill",
        evidenceLayer: "roleSkill",
        description: "掌握对话式、Copilot、Agent、多模态和生成式工作流的交互模式。",
        weight: 10,
        radarDimension: "interactionDesign",
        keywordHints: ["AI 交互", "Copilot", "对话式", "多模态", "生成式"],
        evidenceExamples: ["AI 交互流程", "多轮对话原型", "Copilot 设计方案"],
        evidenceQuestion: "候选人是否设计过 AI Native 交互，而不是传统页面流程？",
      },
      {
        id: "ai-state-design",
        name: "AI 状态与反馈设计",
        category: "hardSkill",
        evidenceLayer: "roleSkill",
        description: "能设计生成中、部分成功、失败、重试、撤销、人工确认等关键状态。",
        weight: 10,
        radarDimension: "interactionDesign",
        keywordHints: ["生成中", "失败", "重试", "撤销", "确认", "状态"],
        evidenceExamples: ["状态机", "异常态页面", "反馈机制说明"],
        evidenceQuestion: "候选人是否覆盖过 AI 生成过程中的失败、重试和确认状态？",
      },
      {
        id: "trust-and-control-design",
        name: "信任与可控性设计",
        category: "hardSkill",
        evidenceLayer: "roleSkill",
        description: "通过引用来源、置信度、解释、预览和编辑权设计，降低用户对 AI 输出的不信任。",
        weight: 9,
        radarDimension: "interactionDesign",
        keywordHints: ["信任", "置信度", "引用来源", "解释", "可控"],
        evidenceExamples: ["引用来源组件", "置信度展示", "人工编辑流程"],
        evidenceQuestion: "候选人是否证明过能设计 AI 输出的信任和可控机制？",
      },
      {
        id: "figma-prototyping",
        name: "Figma 高保真与可交互原型",
        category: "hardSkill",
        evidenceLayer: "foundationSkill",
        description: "能快速产出高保真界面、可交互原型和关键状态设计。",
        weight: 8,
        radarDimension: "deliveryExecution",
        keywordHints: ["Figma", "高保真", "原型", "组件", "交互"],
        evidenceExamples: ["Figma 原型链接", "组件库", "关键状态页面"],
        evidenceQuestion: "候选人是否有可交互原型和关键状态页面的作品证据？",
      },
      {
        id: "ai-design-system",
        name: "AI 组件与设计系统",
        category: "hardSkill",
        evidenceLayer: "roleSkill",
        description: "能沉淀 AI 输入框、生成结果、引用、确认、错误、反馈等复用组件。",
        weight: 8,
        radarDimension: "deliveryExecution",
        keywordHints: ["设计系统", "组件库", "AI 输入框", "反馈组件", "规范"],
        evidenceExamples: ["AI 组件规范", "状态组件", "设计 token"],
        evidenceQuestion: "候选人是否沉淀过 AI 产品专属组件，而不是普通 UI 组件库？",
      },
      {
        id: "ai-product-observation",
        name: "AI 产品观察与拆解",
        category: "domainExperience",
        evidenceLayer: "verticalEvidence",
        description: "持续拆解国内外 AI 产品，能判断不同交互方案背后的产品取舍。",
        weight: 7,
        radarDimension: "domainVerticality",
        keywordHints: ["竞品分析", "AI 产品", "产品拆解", "交互分析"],
        evidenceExamples: ["AI 产品拆解报告", "竞品矩阵", "体验改进建议"],
        evidenceQuestion: "候选人是否能从 AI 产品竞品里提炼交互模式和产品取舍？",
      },
      {
        id: "usability-testing-ai",
        name: "AI 可用性测试",
        category: "domainExperience",
        evidenceLayer: "verticalEvidence",
        description: "能测试用户是否理解、信任并正确使用 AI 输出，定位误解和失败点。",
        weight: 8,
        radarDimension: "dataAndExperiment",
        keywordHints: ["可用性测试", "用户测试", "信任", "误解", "反馈"],
        evidenceExamples: ["测试脚本", "用户反馈", "可用性问题清单"],
        evidenceQuestion: "候选人是否测试过用户对 AI 输出的理解、信任和误用问题？",
      },
      {
        id: "prompt-assisted-design",
        name: "Prompt 辅助设计探索",
        category: "hardSkill",
        evidenceLayer: "roleSkill",
        description: "能用 Prompt 和生成式工具快速探索方案，但保留设计判断和筛选依据。",
        weight: 6,
        radarDimension: "aiProductThinking",
        keywordHints: ["Prompt", "Midjourney", "ChatGPT", "AIGC", "方案探索"],
        evidenceExamples: ["Prompt 记录", "方案分支", "筛选依据"],
        evidenceQuestion: "候选人是否展示过 AI 辅助设计的判断过程，而不只是生成结果？",
      },
      {
        id: "design-dev-handoff",
        name: "设计到研发交付",
        category: "softSkill",
        evidenceLayer: "transferableCapability",
        description: "能把交互状态、字段、边界条件和验收标准清楚交付给研发。",
        weight: 8,
        radarDimension: "collaboration",
        keywordHints: ["研发交付", "标注", "验收", "字段", "边界条件"],
        evidenceExamples: ["交付文档", "验收清单", "研发沟通记录"],
        evidenceQuestion: "候选人是否能把复杂交互状态交付到研发可实现的粒度？",
      },
      {
        id: "complexity-reduction",
        name: "复杂能力降噪",
        category: "softSkill",
        evidenceLayer: "transferableCapability",
        description: "能把复杂模型能力包装成用户可理解、少干扰、可恢复的操作流程。",
        weight: 8,
        radarDimension: "interactionDesign",
        keywordHints: ["降噪", "复杂流程", "简化", "可恢复", "用户理解"],
        evidenceExamples: ["改版前后流程", "信息层级设计", "任务完成率对比"],
        evidenceQuestion: "候选人是否证明过能把复杂能力变成用户能理解的体验？",
      },
    ],
  },
  {
    id: "consumer-ai-ux-interaction-designer",
    name: "C端 AI Native UX / 交互设计师",
    aliases: ["C端 UX 设计师", "消费级 AI 体验设计师", "AI Native 产品设计师"],
    verticalField: "C端消费级 AI 产品体验",
    description:
      "面向消费级 AI 产品，设计用户增长、留存、创作、推荐、个性化和情感化体验，重点关注用户是否愿意持续使用。",
    whyVertical:
      "C端 AI 产品比传统 C端 UX 更依赖增长漏斗、留存、推荐、个性化、内容生态和 AI 输出质量感知，不是单纯页面体验。",
    evidenceGapDefinition:
      "不是判断候选人会不会做 C 端 UX，而是判断其是否证明过消费级 AI 产品里的激活、留存、个性化、创作和内容安全体验。",
    marketSignal: {
      outlookYears: "2026-2030",
      trend: "selectiveGrowth",
      verticalityScore: 82,
      demandRationale:
        "传统 UI/UX 岗位会被 AI 工具压缩，但消费级 AI 产品、AI Native 应用和高品质 C端体验仍需要懂增长、情绪价值和 AI 交互的人才。",
      salaryBenchmarks: [
        {
          currency: "CNY",
          region: "中国互联网 C端产品团队",
          annualRange: { low: 180000, median: 320000, high: 550000 },
          yearlyGrowthEstimate: "普通 C端 UX 增长不确定，具备 AI Native 与增长经验者更容易获得溢价。",
          note: "综合 UI/UX、产品设计、AI 产品体验岗位公开区间估算。",
        },
        {
          currency: "USD",
          region: "美国数字界面设计",
          annualRange: { low: 65000, median: 98090, high: 155000 },
          yearlyGrowthEstimate: "BLS 预计相关职业 2024-2034 增长 7%，AI 垂直方向尚无官方单列。",
          note: "使用 BLS web and digital interface designers 作为保守基线。",
        },
      ],
      sources: [
        {
          title: "BLS Web Developers and Digital Designers Outlook",
          url: "https://www.bls.gov/ooh/computer-and-information-technology/web-developers.htm",
        },
        {
          title: "World Economic Forum Future of Jobs Report 2025",
          url: "https://www.weforum.org/publications/the-future-of-jobs-report-2025/in-full/2-jobs-outlook/",
        },
        {
          title: "2026 UI/UX 设计岗位技能趋势报告",
          url: "https://www.leapart.cn/resources/ui-ux-trend/",
        },
      ],
      jobPostingSignals: [
        {
          signal: "消费级 AI 应用岗位强调 AI Native、用户增长、推荐、创作链路和个性化",
          interpretation: "C 端 UX 正在从页面可用性扩展为 AI 使用意愿和留存问题。",
        },
        {
          signal: "传统 UI/UX 岗位被工具提效压缩，但高品质 C 端体验和 AI 产品化岗位仍有需求",
          interpretation: "该方向是选择性增长，垂直证据比通用设计年限更关键。",
        },
      ],
    },
    skills: [
      {
        id: "consumer-user-journey",
        name: "C端用户旅程设计",
        category: "hardSkill",
        evidenceLayer: "foundationSkill",
        description: "能设计从首次进入、激活、核心任务、复访到付费/分享的完整用户旅程。",
        weight: 9,
        radarDimension: "interactionDesign",
        keywordHints: ["用户旅程", "激活", "留存", "分享", "付费"],
        evidenceExamples: ["用户旅程图", "核心路径原型", "增长漏斗分析"],
        evidenceQuestion: "候选人是否做过从激活到留存的完整 C 端用户旅程？",
      },
      {
        id: "ai-onboarding",
        name: "AI 产品新手引导",
        category: "hardSkill",
        evidenceLayer: "roleSkill",
        description: "能降低用户理解 AI 能力的门槛，让用户快速知道能做什么、怎么做、结果怎么看。",
        weight: 8,
        radarDimension: "interactionDesign",
        keywordHints: ["新手引导", "Onboarding", "AI 能力", "示例", "引导"],
        evidenceExamples: ["新手引导流程", "示例 prompt", "首日体验改版"],
        evidenceQuestion: "候选人是否设计过让普通用户理解 AI 能力的新手路径？",
      },
      {
        id: "personalization-experience",
        name: "个性化体验设计",
        category: "domainExperience",
        evidenceLayer: "verticalEvidence",
        description: "理解推荐、偏好、用户分层和内容反馈如何影响消费级 AI 产品体验。",
        weight: 9,
        radarDimension: "domainVerticality",
        keywordHints: ["个性化", "推荐", "偏好", "用户分层", "内容反馈"],
        evidenceExamples: ["推荐反馈机制", "用户分层策略", "个性化设置设计"],
        evidenceQuestion: "候选人是否处理过推荐、偏好或用户分层带来的体验问题？",
      },
      {
        id: "growth-metric-awareness",
        name: "增长与留存指标意识",
        category: "domainExperience",
        evidenceLayer: "verticalEvidence",
        description: "理解激活率、留存率、转化率、分享率、复访率等 C端指标。",
        weight: 9,
        radarDimension: "dataAndExperiment",
        keywordHints: ["激活率", "留存", "转化率", "复访", "分享率", "A/B"],
        evidenceExamples: ["指标看板", "A/B 测试方案", "转化漏斗分析"],
        evidenceQuestion: "候选人是否用 C 端增长或留存指标验证过设计结果？",
      },
      {
        id: "creative-ai-workflow",
        name: "创作型 AI 工作流",
        category: "hardSkill",
        evidenceLayer: "roleSkill",
        description: "能设计生成、编辑、再生成、保存、发布等创作链路。",
        weight: 8,
        radarDimension: "aiProductThinking",
        keywordHints: ["创作", "生成", "编辑", "再生成", "发布"],
        evidenceExamples: ["创作流程图", "生成结果编辑器", "发布链路原型"],
        evidenceQuestion: "候选人是否设计过 AI 生成内容从创作到编辑发布的完整链路？",
      },
      {
        id: "emotion-and-brand-experience",
        name: "情绪价值与品牌体验",
        category: "domainExperience",
        evidenceLayer: "verticalEvidence",
        description: "能通过语气、反馈、动效和视觉风格建立消费级产品的陪伴感与可信度。",
        weight: 7,
        radarDimension: "interactionDesign",
        keywordHints: ["情绪价值", "品牌", "语气", "动效", "陪伴感"],
        evidenceExamples: ["品牌体验规范", "语气指南", "动效反馈方案"],
        evidenceQuestion: "候选人是否能证明其设计过消费级产品的情绪价值和品牌体验？",
      },
      {
        id: "mobile-interaction-design",
        name: "移动端交互设计",
        category: "hardSkill",
        evidenceLayer: "foundationSkill",
        description: "熟悉移动端手势、布局、导航、输入和响应式体验。",
        weight: 7,
        radarDimension: "interactionDesign",
        keywordHints: ["移动端", "App", "手势", "导航", "响应式"],
        evidenceExamples: ["移动端原型", "关键路径走查", "响应式设计"],
        evidenceQuestion: "候选人是否有移动端核心路径和交互细节的作品证据？",
      },
      {
        id: "content-safety-awareness",
        name: "内容安全与体验边界",
        category: "domainExperience",
        evidenceLayer: "verticalEvidence",
        description: "理解消费级 AI 内容生成中的安全、版权、未成年人、敏感内容和用户反馈机制。",
        weight: 7,
        radarDimension: "domainVerticality",
        keywordHints: ["内容安全", "版权", "敏感内容", "举报", "审核"],
        evidenceExamples: ["内容安全流程", "举报反馈机制", "敏感状态设计"],
        evidenceQuestion: "候选人是否考虑过 AI 生成内容的安全、版权或审核体验？",
      },
      {
        id: "cross-team-growth-collaboration",
        name: "增长 / 运营 / 研发协作",
        category: "softSkill",
        evidenceLayer: "transferableCapability",
        description: "能与产品、运营、增长、算法和研发协作，围绕指标推进体验改版。",
        weight: 8,
        radarDimension: "collaboration",
        keywordHints: ["增长", "运营", "算法", "研发", "协作"],
        evidenceExamples: ["增长实验复盘", "协作流程", "需求评审记录"],
        evidenceQuestion: "候选人是否围绕增长指标推动过跨团队体验改版？",
      },
      {
        id: "rapid-prototyping",
        name: "快速原型与验证",
        category: "softSkill",
        evidenceLayer: "transferableCapability",
        description: "能在短周期内产出可测试方案，并根据用户反馈快速调整。",
        weight: 8,
        radarDimension: "deliveryExecution",
        keywordHints: ["快速原型", "测试", "迭代", "反馈", "验证"],
        evidenceExamples: ["原型测试记录", "迭代前后对比", "用户反馈摘要"],
        evidenceQuestion: "候选人是否能快速做出可测试方案并根据反馈迭代？",
      },
    ],
  },
];

export const alternativeVerticalRoleSuggestions = [
  {
    id: "ai-design-system-designer",
    name: "AI 设计系统设计师",
    reason: "适合从 UI/UX 转型，垂直点在 AI 输入、生成、确认、错误和反馈组件规范。",
  },
  {
    id: "industry-ai-solution-designer",
    name: "行业 AI 解决方案体验设计师",
    reason: "适合有 B端/行业项目经历的人，垂直点在医疗、教育、金融、制造等行业流程。",
  },
  {
    id: "ai-product-researcher",
    name: "AI 产品研究员 / 用户研究员",
    reason: "适合研究能力强的设计师，垂直点在 AI 信任、可解释性、采用率和用户心智。",
  },
];

export function getJobRoleById(roleId: string): JobRole | undefined {
  return jobRoles.find((role) => role.id === roleId);
}

export function getSkillsByRoleId(roleId: string): JobSkill[] {
  return getJobRoleById(roleId)?.skills ?? [];
}

export function getSkillsByCategory(roleId: string, category: SkillCategory): JobSkill[] {
  return getSkillsByRoleId(roleId).filter((skill) => skill.category === category);
}

export function getSkillsByEvidenceLayer(roleId: string, layer: EvidenceLayer): JobSkill[] {
  return getSkillsByRoleId(roleId).filter((skill) => skill.evidenceLayer === layer);
}

export function getTotalSkillWeight(roleId: string): number {
  return getSkillsByRoleId(roleId).reduce((total, skill) => total + skill.weight, 0);
}

export function getRadarDimensions(roleId: string): RadarDimension[] {
  return Array.from(new Set(getSkillsByRoleId(roleId).map((skill) => skill.radarDimension)));
}

export function getSkillsByRadarDimension(
  roleId: string,
  dimension: RadarDimension
): JobSkill[] {
  return getSkillsByRoleId(roleId).filter((skill) => skill.radarDimension === dimension);
}

export function calculateWeightedMatchScore(roleId: string, matches: SkillMatch[]): number {
  const skills = getSkillsByRoleId(roleId);
  const matchedSkillIds = new Set(matches.filter((match) => match.matched).map((match) => match.skillId));
  const totalWeight = skills.reduce((total, skill) => total + skill.weight, 0);
  const matchedWeight = skills
    .filter((skill) => matchedSkillIds.has(skill.id))
    .reduce((total, skill) => total + skill.weight, 0);

  if (totalWeight === 0) return 0;
  return Math.round((matchedWeight / totalWeight) * 100);
}

export function getMissingSkills(roleId: string, matches: SkillMatch[]): JobSkill[] {
  const matchedSkillIds = new Set(matches.filter((match) => match.matched).map((match) => match.skillId));
  return getSkillsByRoleId(roleId).filter((skill) => !matchedSkillIds.has(skill.id));
}

export function getMatchedSkills(roleId: string, matches: SkillMatch[]): JobSkill[] {
  const matchedSkillIds = new Set(matches.filter((match) => match.matched).map((match) => match.skillId));
  return getSkillsByRoleId(roleId).filter((skill) => matchedSkillIds.has(skill.id));
}

export function calculateRadarScores(roleId: string, matches: SkillMatch[]): RadarScore[] {
  const matchedSkillIds = new Set(matches.filter((match) => match.matched).map((match) => match.skillId));

  return getRadarDimensions(roleId).map((dimension) => {
    const skills = getSkillsByRadarDimension(roleId, dimension);
    const totalWeight = skills.reduce((total, skill) => total + skill.weight, 0);
    const matchedWeight = skills
      .filter((skill) => matchedSkillIds.has(skill.id))
      .reduce((total, skill) => total + skill.weight, 0);

    return {
      dimension,
      score: totalWeight === 0 ? 0 : Math.round((matchedWeight / totalWeight) * 100),
      matchedWeight,
      totalWeight,
    };
  });
}
