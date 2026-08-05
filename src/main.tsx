import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { aiProductManagerModel } from "./data/aiProductManager.ts";
import { mockAnalysisResult } from "./data/mockAnalysisResult.ts";
import { mockResumeText } from "./data/mockResumeEvidence.ts";
import type {
  AnalysisResult,
  EvidenceBuildingAction,
  EvidenceGapItem,
  SkillEvidenceView,
} from "./types/analysis.ts";
import "./styles.css";

type AppState = "landing" | "input" | "analyzing" | "result" | "actions";
type CandidateGender = "male" | "female" | "unknown";
type JobFilterKey = "roleType" | "jobIntent" | "industry";

const diagnosisStorageKey = "skillfit-radar-last-diagnosis";

const englishTermGlossary: Array<[RegExp, string]> = [
  [/\bSkillFit Radar\b(?!（岗位证据雷达）)/g, "SkillFit Radar（岗位证据雷达）"],
  [/\bTransferable Strengths\b(?!（可迁移能力）)/g, "Transferable Strengths（可迁移能力）"],
  [/\bDomain Delta\b(?!（人工智能领域增量）)/g, "Domain Delta（人工智能领域增量）"],
  [/\bPriority Gaps\b(?!（优先补齐缺口）)/g, "Priority Gaps（优先补齐缺口）"],
  [/\bEvidence Level\b(?!（证据等级）)/g, "Evidence Level（证据等级）"],
  [/\bLevel\b(?!（证据等级）)/g, "Level（证据等级）"],
  [/\bMock Evidence\b(?!（模拟简历证据）)/g, "Mock Evidence（模拟简历证据）"],
  [/\bscoring engine\b(?!（评分引擎）)/g, "scoring engine（评分引擎）"],
  [/\bMVP\b(?!（最小可演示版本）)/g, "MVP（最小可演示版本）"],
  [/\bAccuracy\b(?!（准确性）)/g, "Accuracy（准确性）"],
  [/\bRelevance\b(?!（相关性）)/g, "Relevance（相关性）"],
  [/\bHallucination\b(?!（幻觉）)/g, "Hallucination（幻觉）"],
  [/\bChatGPT\b(?!（对话式 AI 工具）)/g, "ChatGPT（对话式 AI 工具）"],
  [/\bLangChain\b(?!（大模型应用开发框架）)/g, "LangChain（大模型应用开发框架）"],
  [/\bDify\b(?!（AI 应用搭建工具）)/g, "Dify（AI 应用搭建工具）"],
  [/\bCoze\b(?!（智能体搭建工具）)/g, "Coze（智能体搭建工具）"],
  [/\bAIGC\b(?!（人工智能生成内容）)/g, "AIGC（人工智能生成内容）"],
  [/\bCopilot\b(?!（智能辅助助手）)/g, "Copilot（智能辅助助手）"],
  [/\bAgent\b(?!（智能体）)/g, "Agent（智能体）"],
  [/\bPrompt Engineering\b(?!（提示词工程）)/g, "Prompt Engineering（提示词工程）"],
  [/\bPrompt\b(?!（提示词）)/g, "Prompt（提示词）"],
  [/\bRAG\b(?!（检索增强生成）)/g, "RAG（检索增强生成）"],
  [/\bLLM\b(?!（大语言模型）)/g, "LLM（大语言模型）"],
  [/\bPRD\b(?!（产品需求文档）)/g, "PRD（产品需求文档）"],
  [/\bSQL\b(?!（结构化查询语言）)/g, "SQL（结构化查询语言）"],
  [/\bBI\b(?!（商业智能）)/g, "BI（商业智能）"],
  [/\bDemo\b(?!（演示样例）)/g, "Demo（演示样例）"],
  [/\bAPI\b(?!（应用程序接口）)/g, "API（应用程序接口）"],
  [/\bBad Case\b(?!（问题案例）)/g, "Bad Case（问题案例）"],
  [/\bbad case\b(?!（问题案例）)/g, "bad case（问题案例）"],
  [/\bA\/B\b(?!（对照实验）)/g, "A/B（对照实验）"],
  [/\bAI\b(?!（人工智能）)/g, "AI（人工智能）"],
];

const analysisSteps = [
  "正在识别简历中的项目行为",
  "正在匹配能力证据",
  "正在评估证据成熟度",
  "正在区分可迁移能力与 AI（人工智能）领域增量",
  "正在生成能力补齐建议",
];

const flowSteps = [
  { label: "看清差距", text: "把目标岗位拆成可验证的证据" },
  { label: "决定方向", text: "判断该补项目，还是换一条赛道" },
  { label: "立刻行动", text: "把每个缺口变成 30 天任务" },
];

const workflowSteps: Array<{ state: Exclude<AppState, "landing">; label: string; icon: string }> = [
  { state: "input", label: "放入经历", icon: "01" },
  { state: "analyzing", label: "证据分析", icon: "02" },
  { state: "result", label: "诊断报告", icon: "03" },
  { state: "actions", label: "补证建议", icon: "04" },
];

const roleOptions = [
  {
    label: "生成式 AI 应用产品经理",
    score: "68%",
    state: "强关联",
    persona: "需求夹克",
    visual: "generative",
    images: {
      male: "/assets/role-image-15.png",
      female: "/assets/role-image-20.png",
      unknown: "/assets/role-image-15.png",
    },
    equipment: ["AI 机会定义", "真实评测集", "上线闭环"],
  },
  {
    label: "AI Agent 产品经理",
    score: "52%",
    state: "垂直缺口",
    persona: "工作流耳机",
    visual: "agent",
    images: {
      male: "/assets/role-image-17.png",
      female: "/assets/role-image-21.png",
      unknown: "/assets/role-image-17.png",
    },
    equipment: ["多步工作流", "工具调用编排", "人工接管"],
  },
  {
    label: "大模型应用产品经理",
    score: "61%",
    state: "部分相关",
    persona: "模型连帽衫",
    visual: "llm",
    images: {
      male: "/assets/role-image-18.png",
      female: "/assets/role-image-22.png",
      unknown: "/assets/role-image-18.png",
    },
    equipment: ["上下文编排", "版本对比", "Bad Case 归因"],
  },
  {
    label: "AI 数据分析师",
    score: "63%",
    state: "基础匹配",
    persona: "指标披风",
    visual: "analyst",
    images: {
      male: "/assets/role-image-19.png",
      female: "/assets/role-image-23.png",
      unknown: "/assets/role-image-19.png",
    },
    equipment: ["AI 指标体系", "采纳修改率", "实验归因"],
  },
];

const defaultJobFilters: Record<JobFilterKey, string> = {
  roleType: "",
  jobIntent: "",
  industry: "",
};

const jobFilterGroups: Array<{ key: JobFilterKey; label: string; options: string[] }> = [
  {
    key: "roleType",
    label: "岗位类型",
    options: ["AI 产品经理", "AI Agent 产品经理", "大模型应用产品经理", "AI 数据分析师", "AI 交互体验设计师"],
  },
  {
    key: "jobIntent",
    label: "求职类型",
    options: ["全职", "实习", "校招", "社招", "转岗/转行"],
  },
  {
    key: "industry",
    label: "行业",
    options: ["互联网 / AI", "电子商务", "企业服务", "医疗健康", "在线教育", "金融科技", "AIGC 创意"],
  },
];

const equipmentItems = [
  { code: "P02", label: "垂直岗位", state: "已穿上", tone: "green" },
  { code: "P03", label: "证据缺口", state: "已穿上", tone: "green" },
  { code: "P04", label: "本地评分", state: "可迁移", tone: "blue" },
  { code: "H01", label: "30 天补证", state: "半件", tone: "purple" },
  { code: "H03", label: "差距认清", state: "半件", tone: "purple" },
  { code: "H04", label: "岗位模型", state: "概念款", tone: "yellow" },
  { code: "H05", label: "优先级缺口", state: "缺失", tone: "pink" },
  { code: "H08", label: "招聘信任", state: "缺失", tone: "pink" },
];

function explainEnglishTerms(text: string): string {
  return englishTermGlossary.reduce(
    (currentText, [pattern, replacement]) => currentText.replace(pattern, replacement),
    text
  );
}

function inferCandidateGender(resume: string): CandidateGender {
  const normalizedResume = resume.replace(/\s/g, "");

  if (/性别[:：]?女|女同学|女生|女士/.test(normalizedResume)) {
    return "female";
  }

  if (/性别[:：]?男|男同学|男生|先生/.test(normalizedResume)) {
    return "male";
  }

  return "unknown";
}

function App() {
  const [state, setState] = useState<AppState>("landing");
  const [resumeText, setResumeText] = useState("");
  const [stepIndex, setStepIndex] = useState(0);
  const [hasDiagnosis, setHasDiagnosis] = useState(() =>
    window.localStorage.getItem(diagnosisStorageKey) === "saved"
  );
  const candidateGender = useMemo(() => inferCandidateGender(resumeText), [resumeText]);
  const result = useMemo<AnalysisResult>(() => mockAnalysisResult, []);

  useEffect(() => {
    if (state !== "analyzing") return;

    setStepIndex(0);
    const interval = window.setInterval(() => {
      setStepIndex((current) => Math.min(current + 1, analysisSteps.length - 1));
    }, 520);
    const timeout = window.setTimeout(() => {
      window.clearInterval(interval);
      setState("result");
    }, 3200);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [state]);

  useEffect(() => {
    if (state !== "result" && state !== "actions") return;

    window.localStorage.setItem(diagnosisStorageKey, "saved");
    setHasDiagnosis(true);
  }, [state]);

  function startAnalysis() {
    if (!resumeText.trim()) {
      setResumeText(mockResumeText);
    }
    setState("analyzing");
  }

  return (
    <main className="appShell">
      <TopNav
        currentState={state}
        hasDiagnosis={hasDiagnosis}
        onHome={() => setState("landing")}
        onMyDiagnosis={() => setState(hasDiagnosis ? "result" : "input")}
        onStart={() => setState("input")}
        onStepChange={setState}
      />

      {state === "landing" && <LandingPage onStart={() => setState("input")} />}

      {state === "input" && (
        <InputPage
          candidateGender={candidateGender}
          resumeText={resumeText}
          onResumeChange={setResumeText}
          onFillSample={() => setResumeText(mockResumeText)}
          onStart={startAnalysis}
        />
      )}

      {state === "analyzing" && <AnalyzingPage currentStep={stepIndex} />}

      {state === "result" && (
        <ResultPage
          result={result}
          onRestart={() => setState("input")}
          onViewActions={() => setState("actions")}
        />
      )}

      {state === "actions" && (
        <ActionPlanPage
          result={result}
          onBackToResult={() => setState("result")}
          onRestart={() => setState("input")}
        />
      )}
    </main>
  );
}

function TopNav({
  currentState,
  hasDiagnosis,
  onHome,
  onMyDiagnosis,
  onStart,
  onStepChange,
}: {
  currentState: AppState;
  hasDiagnosis: boolean;
  onHome: () => void;
  onMyDiagnosis: () => void;
  onStart: () => void;
  onStepChange: (state: AppState) => void;
}) {
  const activeWorkflowIndex = workflowSteps.findIndex((step) => step.state === currentState);

  return (
    <header className={`topNav ${currentState === "landing" ? "isLanding" : ""}`}>
      <button className="brandBlock" type="button" onClick={onHome}>
        <div className="logoMark" aria-hidden="true">🍗</div>
        <div className="reportHeroCopy">
          <strong>
            炸鸡腿诊断器
            <span className="brandSlogan">会炸土豆 ≠ 会炸鸡腿，企业需要的是垂直细分的经验证据</span>
          </strong>
          <span>SkillFit Radar（岗位证据雷达）</span>
        </div>
      </button>
      {currentState !== "landing" && (
        <nav className="navSteps" aria-label="演示流程">
          {workflowSteps.map((step, index) => (
            <button
              className={[
                "workflowStep",
                index === activeWorkflowIndex ? "active" : "",
                index < activeWorkflowIndex ? "complete" : "",
              ].join(" ")}
              key={step.state}
              type="button"
              onClick={() => onStepChange(step.state)}
            >
              <b>{step.icon}</b>
              {step.label}
            </button>
          ))}
        </nav>
      )}
      {currentState === "landing" && (
        <div className="topActions" aria-label="顶部操作">
          <button className="trialBadge" type="button" onClick={onStart}>
            开始诊断
          </button>
          <button
            className={`trialBadge diagnosisButton ${hasDiagnosis ? "hasRecord" : ""}`}
            type="button"
            onClick={onMyDiagnosis}
          >
            我的诊断
          </button>
        </div>
      )}
    </header>
  );
}

function LandingPage({ onStart }: { onStart: () => void }) {
  return (
    <section className="landingPage">
      <section className="landingHero">
        <div className="landingCopy">
          <p className="pillEyebrow">不评泛能力，只看岗位需要的证据</p>
          <h1>
            你离想要的垂直岗位
            <span>还差哪几步？</span>
          </h1>
          <p>
            上传简历，对照目标岗位，找出缺失的垂直经验证据。不是一句“你不匹配”，
            而是一条能执行的 30 天补强路线。
          </p>
        </div>
        <div className="landingMascot" aria-hidden="true">
          <img src="/assets/landing-role-collage.png" alt="" />
        </div>
      </section>

      <div className="landingFlow" aria-label="第一页产品流程">
        {flowSteps.map((step, index) => (
          <article className="landingFlowCard" key={step.label}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{step.label}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>

      <section className="landingClosers">
        <div className="miniEquipmentRail" aria-label="证据装备预览">
          {equipmentItems.slice(0, 5).map((item) => (
            <span className={`miniEquipment ${item.tone}`} key={item.code}>
              {item.label}
            </span>
          ))}
        </div>
        <button className="landingCta" type="button" onClick={onStart}>
          来看看你缺哪个鸡腿吧
          <span aria-hidden="true">→</span>
        </button>
      </section>

      <footer className="landingFootnote">
        <span>炸鸡腿诊断器 · SkillFit Radar（岗位证据雷达）</span>
        <span>诊断结果仅用于求职规划参考，不代表企业录用决定</span>
      </footer>
    </section>
  );
}

interface InputPageProps {
  candidateGender: CandidateGender;
  resumeText: string;
  onResumeChange: (value: string) => void;
  onFillSample: () => void;
  onStart: () => void;
}

function InputPage({ candidateGender, resumeText, onResumeChange, onFillSample, onStart }: InputPageProps) {
  const [selectedRoleIndex, setSelectedRoleIndex] = useState<number | null>(null);
  const [jobSearch, setJobSearch] = useState("AI 产品经理");
  const [selectedJobFilters, setSelectedJobFilters] = useState<Record<JobFilterKey, string>>(defaultJobFilters);
  const [openFilterKey, setOpenFilterKey] = useState<JobFilterKey | null>(null);
  const canStart = selectedRoleIndex === 0;
  const startButtonText =
    selectedRoleIndex === null
      ? "先选择已接入岗位"
      : canStart
        ? "开始诊断我的匹配度"
        : "该岗位暂未接入数据";

  return (
    <section className="inputPage">
      <section className="workbench">
        <div className="resumePane">
          <SectionLabel index="01" title="放入你的经历" caption="支持粘贴简历文本，当前 Demo（演示样例）不上传服务器" />
          <textarea
            id="resume"
            value={resumeText}
            onChange={(event) => onResumeChange(event.target.value)}
            placeholder="请粘贴简历文本，或点击下方按钮使用示例简历。"
          />
          <div className="buttonRow">
            <button className="ghostButton" type="button" onClick={onFillSample}>
              使用示例简历
            </button>
            <span>分析只读取当前页面文本</span>
          </div>
          <div className="jobContextPanel">
            <label className="jdLabel" htmlFor="job-context">
              补充岗位描述（选填）
            </label>
            <textarea
              className="jdBox"
              id="job-context"
              readOnly
              value="当前 MVP（最小可演示版本）固定使用「生成式 AI（人工智能）应用产品经理」岗位能力模型。"
            />
          </div>
        </div>

        <div className="targetPane">
          <SectionLabel
            index="02"
            title="选择目标岗位"
            caption="同一份经历，在不同岗位里的可信证据不同"
          />
          <div className="jobFilterBar" aria-label="岗位筛选条件">
            <label className="jobSearchBox">
              <span>搜索</span>
              <input
                aria-label="搜索岗位名称"
                onChange={(event) => {
                  setJobSearch(event.target.value);
                  setOpenFilterKey(null);
                }}
                onFocus={() => setOpenFilterKey(null)}
                placeholder="岗位名称"
                type="search"
                value={jobSearch}
              />
            </label>
            {jobFilterGroups.map((filter) => (
              <details className="jobFilterSelect" key={filter.key} open={openFilterKey === filter.key}>
                <summary
                  className={`jobFilterChip ${selectedJobFilters[filter.key] ? "selected" : ""}`}
                  onClick={(event) => {
                    event.preventDefault();
                    setOpenFilterKey((currentKey) => (currentKey === filter.key ? null : filter.key));
                  }}
                >
                  {selectedJobFilters[filter.key] || filter.label}
                  <span aria-hidden="true">⌄</span>
                </summary>
                <div className="jobFilterMenu">
                  {filter.options.map((option) => (
                    <button
                      className={selectedJobFilters[filter.key] === option ? "active" : ""}
                      key={option}
                      onClick={(event) => {
                        event.preventDefault();
                        setSelectedJobFilters((currentFilters) => ({
                          ...currentFilters,
                          [filter.key]: option,
                        }));
                        setOpenFilterKey(null);
                      }}
                      type="button"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </details>
            ))}
          </div>
          <div className="roleOptionGrid">
            {roleOptions.map((option, index) => (
              <button
                aria-pressed={selectedRoleIndex === index}
                className={[
                  "roleOption",
                  selectedRoleIndex === index ? "selected" : "",
                  index === 0 ? "ready" : "notReady",
                ].join(" ")}
                key={option.label}
                onClick={() => setSelectedRoleIndex(index)}
                type="button"
              >
                <div className="roleCardMain">
                  <RolePersona
                    imageSrc={option.images[candidateGender]}
                    label={option.label}
                    variant={option.visual}
                  />
                  <div className="roleCardCopy">
                    <span>{option.label}</span>
                    <em>{option.persona}</em>
                    <div className="roleOptionMeta">
                      <strong>{option.score}</strong>
                      <small>{option.state}</small>
                    </div>
                  </div>
                </div>
                <div className="roleEquipmentTags" aria-label={`${option.label} 形象装备`}>
                  {option.equipment.map((item) => (
                    <i key={item}>{item}</i>
                  ))}
                </div>
              </button>
            ))}
          </div>
          <button className="primaryButton" type="button" disabled={!canStart} onClick={onStart}>
            {startButtonText}
            <span aria-hidden="true">→</span>
          </button>
          <p className="microCopy">本地规则演示，不上传或保存你的简历内容。</p>
        </div>
      </section>
    </section>
  );
}

function MiniCharacter({ tone }: { tone: string }) {
  return (
    <div className={`miniCharacter ${tone}`}>
      <span className="hair" />
      <span className="head" />
      <span className="body" />
      <span className="legs" />
    </div>
  );
}

function RolePersona({
  imageSrc,
  label,
  variant,
}: {
  imageSrc: string;
  label: string;
  variant: string;
}) {
  return (
    <div className={`rolePersona ${variant}`}>
      <img alt={`${label} 岗位形象`} src={imageSrc} />
    </div>
  );
}

function SectionLabel({ index, title, caption }: { index: string; title: string; caption: string }) {
  return (
    <div className="sectionLabel">
      <span>{index}</span>
      <div>
        <h2>{title}</h2>
        <p>{caption}</p>
      </div>
    </div>
  );
}

function AnalyzingPage({ currentStep }: { currentStep: number }) {
  const progress = Math.round(((currentStep + 1) / analysisSteps.length) * 100);

  return (
    <section className="analysisPage">
      <div className="analysisOrb" aria-hidden="true" />
      <p className="eyebrow">Evidence Scoring Engine（证据评分引擎）</p>
      <h1>正在搜索你简历里的岗位证据</h1>
      <p>这一步只是演示动画，不接真实接口；总分依然来自本地 scoring engine（评分引擎）。</p>
      <div className="progressTrack" aria-label={`分析进度 ${progress}%`}>
        <span style={{ width: `${progress}%` }} />
      </div>
      <div className="stepList">
        {analysisSteps.map((step, index) => (
          <article className={`analysisStep ${index <= currentStep ? "active" : ""}`} key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{step}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ResultPage({
  result,
  onRestart,
  onViewActions,
}: {
  result: AnalysisResult;
  onRestart: () => void;
  onViewActions: () => void;
}) {
  const radarMetrics = [
    { label: "总体", value: result.scores.overall },
    { label: "基本功", value: result.scores.productFundamental },
    { label: "AI 增量", value: result.scores.aiCore },
    { label: "可迁移", value: averageEvidenceLevel(result.transferableStrengths) },
    { label: "缺口已补", value: averageEvidenceLevel(result.topPriorityGaps) },
  ];

  return (
    <section className="resultPage">
      <section className="reportHero">
        <div className="reportHeroCopy">
          <p className="resultChoicePill">已选择目标岗位：{explainEnglishTerms(result.roleName)}</p>
          <h1>你还差 {result.topPriorityGaps.length} 个关键岗位证据</h1>
          <p>产品基本功能迁移，但 AI（人工智能）评测、实验与交付证据仍不足。</p>
        </div>
        <RadarScoreCard metrics={radarMetrics} score={result.scores.overall} />
      </section>

      <section className="scoreGrid" aria-label="核心分数">
        <ScoreCard
          description="简历证据整体离目标岗位的招聘信任距离。"
          icon="SR"
          label="总体匹配度"
          score={result.scores.overall}
          tone="primary"
        />
        <ScoreCard
          description="需求分析、产品设计、协作推进等基础能力证据较强。"
          icon="PM"
          label="产品经理基本功"
          score={result.scores.productFundamental}
          tone="success"
        />
        <ScoreCard
          description="AI（人工智能）评测、实验和上线交付证据仍需补齐。"
          icon="AI"
          label="AI（人工智能）领域增量"
          score={result.scores.aiCore}
          tone="warning"
        />
      </section>

      <section className="reportSection">
        <SectionHeader
          title="Transferable Strengths（可迁移能力）"
          caption="这些是你已经穿上的基础装备，可以迁移到目标岗位里。"
        />
        <div className="cardGrid">
          {result.transferableStrengths.map((item) => (
            <EvidenceCard item={item} key={item.skill.id} />
          ))}
        </div>
      </section>

      <section className="reportSection">
        <SectionHeader
          title="Domain Delta（人工智能领域增量）"
          caption="这里不是说你不会，而是你的证据衣柜里还少这些垂直装备。"
        />
        <div className="deltaList">
          {result.domainDelta.map((item) => (
            <div className="deltaRow" key={item.skill.id}>
              <strong>{explainEnglishTerms(item.skill.name)}</strong>
              <span>{explainEnglishTerms("Level")} {item.evidenceLevel}</span>
              <meter min="0" max="4" value={item.evidenceLevel} />
            </div>
          ))}
        </div>
      </section>

      <section className="reportSection">
        <SectionHeader
          title="Top 3 Priority Gaps（前三个优先补齐缺口）"
          caption="先补这三件，最容易把学习变成招聘方认可的证据。"
        />
        <div className="gapGrid">
          {result.topPriorityGaps.map((gap) => (
            <GapCard gap={gap} key={gap.skill.id} />
          ))}
        </div>
      </section>

      <section className="reportSection">
        <SectionHeader
          title="Evidence Level（每项能力的证据等级）"
          caption="0 是没有证据，4 是交付并有量化结果。"
        />
        <div className="evidenceTable">
          {result.skillEvidenceRows.map((item) => (
            <EvidenceRow item={item} key={item.skill.id} />
          ))}
        </div>
      </section>

      <section className="actionEntryPanel">
        <div>
          <p className="eyebrow">Next Outfit（下一套装备）</p>
          <h2>诊断结束后，单独进入 30 天补证行动页</h2>
          <p>报告页负责讲清楚差距；行动页负责告诉你接下来 30 天怎么把差距补成简历证据。</p>
        </div>
        <button className="primaryButton" type="button" onClick={onViewActions}>
          查看 30 天补证行动建议
          <span aria-hidden="true">→</span>
        </button>
      </section>

      <button className="ghostButton restartButton" type="button" onClick={onRestart}>
        返回输入页
      </button>
    </section>
  );
}

function ActionPlanPage({
  result,
  onBackToResult,
  onRestart,
}: {
  result: AnalysisResult;
  onBackToResult: () => void;
  onRestart: () => void;
}) {
  return (
    <section className="actionPage">
      <section className="actionHero">
        <div className="actionHeroCopy">
          <p className="eyebrow">30-Day Evidence Wear（30 天证据穿搭计划）</p>
          <h1>先补这三件，别乱买装备</h1>
          <p>
            这里不再重复诊断分数，只把 Top 3 Priority Gaps（前三个优先补齐缺口）拆成可以执行的周计划。
            目标是 30 天后，你的简历里能多出招聘方愿意相信的项目证据。
          </p>
        </div>
        <div className="actionSummary">
          <span>30</span>
          <p>天补证窗口</p>
          <strong>{result.actions30Day.length} 件优先装备</strong>
        </div>
      </section>

      <section className="reportSection">
        <SectionHeader
          title="Action Plan（行动计划）"
          caption="每张卡都对应一个岗位证据缺口，产物可以直接反哺作品集和简历。"
        />
        <div className="actionGrid standalone">
          {result.actions30Day.map((action, index) => (
            <ActionCard action={action} index={index} key={action.skillId} />
          ))}
        </div>
      </section>

      <section className="reportSection">
        <SectionHeader
          title="Resume Rewrite（简历改写素材）"
          caption="完成行动后，可以把这些句子作为简历项目经历的骨架。"
        />
        <div className="rewriteList">
          {result.actions30Day.map((action) => (
            <article className="rewriteItem" key={action.skillId}>
              <span>{action.skillId}</span>
              <p>{explainEnglishTerms(action.resumeBulletAfterCompletion)}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="pageActions">
        <button className="ghostButton" type="button" onClick={onBackToResult}>
          返回诊断报告
        </button>
        <button className="ghostButton" type="button" onClick={onRestart}>
          重新放入经历
        </button>
      </div>
    </section>
  );
}

function ActionCard({ action, index }: { action: EvidenceBuildingAction; index: number }) {
  return (
    <article className="actionCard">
      <span>{String(index + 1).padStart(2, "0")} · {explainEnglishTerms(action.skillName)}</span>
      <h3>{explainEnglishTerms(action.title)}</h3>
      <ul>
        {action.steps.map((step) => (
          <li key={step}>{explainEnglishTerms(step)}</li>
        ))}
      </ul>
      <p className="artifact">
        产物：{action.expectedArtifacts.map(explainEnglishTerms).join(" / ")}
      </p>
      <p className="resumeLine">{explainEnglishTerms(action.resumeBulletAfterCompletion)}</p>
    </article>
  );
}

function ScoreCard({
  description,
  icon,
  label,
  score,
  tone,
}: {
  description: string;
  icon: string;
  label: string;
  score: number;
  tone: string;
}) {
  return (
    <article className={`scoreCard ${tone}`}>
      <span className="scoreIcon" aria-hidden="true">{icon}</span>
      <div className="scoreCardContent">
        <div className="scoreCardTop">
          <p>{label}</p>
          <strong className="scoreValue">{score}</strong>
        </div>
        <small>{description}</small>
        <meter min="0" max="100" value={score} />
      </div>
    </article>
  );
}

function RadarScoreCard({
  metrics,
  score,
}: {
  metrics: Array<{ label: string; value: number }>;
  score: number;
}) {
  const rings = [1, 0.75, 0.5, 0.25];
  const axisPoints = metrics.map((_, index) => radarPoint(index, metrics.length, 1));
  const dataPoints = metrics.map((metric, index) =>
    radarPoint(index, metrics.length, Math.max(0, Math.min(metric.value, 100)) / 100)
  );

  return (
    <div className="overallScore">
      <p className="scoreCaption">岗位证据雷达</p>
      <svg className="radarChart" viewBox="0 0 220 220" role="img" aria-label={`总体匹配度 ${score} 分`}>
        <defs>
          <radialGradient id="radarFill" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#22C55E" stopOpacity="0.86" />
            <stop offset="58%" stopColor="#8A7DFF" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#645BFF" stopOpacity="0.28" />
          </radialGradient>
        </defs>
        {rings.map((ring) => (
          <polygon
            className="radarRing"
            key={ring}
            points={metrics.map((_, index) => pointToString(radarPoint(index, metrics.length, ring))).join(" ")}
          />
        ))}
        {axisPoints.map((point, index) => (
          <line className="radarAxis" key={metrics[index].label} x1="110" x2={point.x} y1="110" y2={point.y} />
        ))}
        <polygon className="radarArea" points={dataPoints.map(pointToString).join(" ")} />
        {dataPoints.map((point, index) => (
          <circle className="radarDot" cx={point.x} cy={point.y} key={metrics[index].label} r="4.5" />
        ))}
        {metrics.map((metric, index) => {
          const labelPoint = radarPoint(index, metrics.length, 1.2);
          return (
            <g key={metric.label}>
              <text className="radarLabel" x={labelPoint.x} y={labelPoint.y}>
                {metric.label}
              </text>
              <text className="radarValueLabel" x={labelPoint.x} y={labelPoint.y + 14}>
                {Math.round(metric.value)}
              </text>
            </g>
          );
        })}
        <text className="radarScore" x="110" y="110">
          {score}
        </text>
        <text className="radarScoreUnit" x="134" y="110">
          %
        </text>
      </svg>
      <strong>总体匹配度</strong>
    </div>
  );
}

function averageEvidenceLevel(items: Array<{ evidenceLevel: number }>): number {
  if (items.length === 0) return 0;
  const total = items.reduce((sum, item) => sum + item.evidenceLevel, 0);
  return Math.round((total / items.length / 4) * 100);
}

function radarPoint(index: number, total: number, scale: number): { x: number; y: number } {
  const angle = -Math.PI / 2 + (Math.PI * 2 * index) / total;
  const radius = 70 * scale;
  return {
    x: 110 + Math.cos(angle) * radius,
    y: 110 + Math.sin(angle) * radius,
  };
}

function pointToString(point: { x: number; y: number }): string {
  return `${point.x.toFixed(2)},${point.y.toFixed(2)}`;
}

function SectionHeader({ title, caption }: { title: string; caption: string }) {
  return (
    <div className="sectionHeader">
      <h2>{title}</h2>
      <p>{caption}</p>
    </div>
  );
}

function EvidenceCard({ item }: { item: SkillEvidenceView }) {
  return (
    <article className="evidenceCard">
      <div className="cardTitleRow">
        <h3>{explainEnglishTerms(item.skill.name)}</h3>
        <span>{explainEnglishTerms("Level")} {item.evidenceLevel}</span>
      </div>
      <p>{explainEnglishTerms(item.reason)}</p>
      <blockquote>
        {explainEnglishTerms(item.resumeEvidence[0] ?? "简历中暂未出现足够证据。")}
      </blockquote>
    </article>
  );
}

function GapCard({ gap }: { gap: EvidenceGapItem }) {
  return (
    <article className="gapCard">
      <span className="rankBadge">#{gap.priorityRank}</span>
      <div className="stickerBadge" aria-hidden="true">
        <span>{gap.skill.id}</span>
      </div>
      <h3>{explainEnglishTerms(gap.skill.name)}</h3>
      <p>{explainEnglishTerms(gap.reason)}</p>
      <strong>缺失证据</strong>
      <ul>
        {gap.missingEvidence.slice(0, 4).map((item) => (
          <li key={item}>{explainEnglishTerms(item)}</li>
        ))}
      </ul>
    </article>
  );
}

function EvidenceRow({ item }: { item: SkillEvidenceView }) {
  return (
    <article className="tableRow">
      <div>
        <strong>{item.skill.id}</strong>
        <span>{explainEnglishTerms(item.skill.name)}</span>
      </div>
      <span className="levelPill">{explainEnglishTerms("Level")} {item.evidenceLevel}</span>
      <p>{explainEnglishTerms(item.resumeEvidence[0] ?? "暂无证据")}</p>
    </article>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
