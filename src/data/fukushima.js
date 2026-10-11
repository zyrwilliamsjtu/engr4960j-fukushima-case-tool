/**
 * 福岛案例静态数据（契约 v2，dataVersion 2.0）
 * 原则库已填入；事实与时间线仍为占位，由 PI 查证后替换。
 */
(function () {
  var principles = [
    {
      id: "p-basic-1",
      group: "basic",
      name: "公众安全",
      nameEn:
        "keep members of the public safe from serious negative consequences resulting from their development and implementation of technology",
      desc: "使公众免受技术开发与实施所致严重负面后果",
      sourceId: "src-textbook-appendix-I"
    },
    {
      id: "p-basic-2",
      group: "basic",
      name: "基本人权",
      nameEn:
        "ensure that fundamental human rights are not negatively impacted as a result of their work with technology",
      desc: "确保基本人权不因技术工作受负面影响",
      sourceId: "src-textbook-appendix-I"
    },
    {
      id: "p-basic-3",
      group: "basic",
      name: "环境保护",
      nameEn:
        "avoid damage to the environment and living beings that would result in serious negative consequences, including long-term ones, to human life",
      desc: "避免对环境与生物造成危及人类生命的严重损害",
      sourceId: "src-textbook-appendix-I"
    },
    {
      id: "p-basic-4",
      group: "basic",
      name: "胜任能力",
      nameEn: "engage only in engineering activities they are competent to carry out",
      desc: "只从事自己有能力胜任的工程活动",
      sourceId: "src-textbook-appendix-I"
    },
    {
      id: "p-basic-5",
      group: "basic",
      name: "决策依据",
      nameEn:
        "base their engineering decisions on scientific principles and mathematical analyses and seek to avoid the influence of extraneous factors",
      desc: "决策基于科学与数学分析，避免无关因素",
      sourceId: "src-textbook-appendix-I"
    },
    {
      id: "p-basic-6",
      group: "basic",
      name: "真实披露",
      nameEn:
        "keep the public informed of their decisions, which have the potential to seriously affect the public, and to be truthful and complete in their disclosures",
      desc: "告知可能严重影响公众的决策，披露真实完整",
      sourceId: "src-textbook-appendix-I"
    },
    {
      id: "p-basic-7",
      group: "basic",
      name: "尊重非道德文化价值",
      nameEn:
        "understand and respect the nonmoral cultural values of those they encounter in fulfilling their engineering duties",
      desc: "理解并尊重履职中遇到的非道德性文化价值",
      sourceId: "src-textbook-appendix-I"
    },
    {
      id: "p-basic-8",
      group: "basic",
      name: "拒绝违规文化实践",
      nameEn:
        "endeavor to refuse to participate in engineering activities that are claimed to reflect cultural practices but that violate basic ethical principles for global engineering",
      desc: "拒绝参与以文化为名却违反全球工程伦理的活动",
      sourceId: "src-textbook-appendix-I"
    },
    {
      id: "p-org-1",
      group: "organization",
      name: "避免不必要伤害",
      nameEn: "avoid producing unnecessary harms to those in and outside of their organizations",
      desc: "避免对组织内外造成不必要的伤害",
      sourceId: "src-textbook-appendix-I"
    },
    {
      id: "p-org-2",
      group: "organization",
      name: "公平对待利益相关方",
      nameEn: "ensure that all stakeholders of their organizations are treated fairly and justly",
      desc: "确保组织利益相关方受到公平公正对待",
      sourceId: "src-textbook-appendix-I"
    },
    {
      id: "p-org-3",
      group: "organization",
      name: "遵守法律法规",
      nameEn: "ensure that all relevant laws and regulations are followed within their organizations",
      desc: "确保组织内遵守相关法律法规",
      sourceId: "src-textbook-appendix-I"
    },
    {
      id: "p-org-4",
      group: "organization",
      name: "免受歧视与骚扰",
      nameEn: "protect members of their organizations against internal discrimination and harassment",
      desc: "保护组织成员免受内部歧视与骚扰",
      sourceId: "src-textbook-appendix-I"
    },
    {
      id: "p-org-5",
      group: "organization",
      name: "基于功绩的人事决定",
      nameEn: "make all hiring, compensation, promotion, and termination decisions based on merit",
      desc: "招聘薪酬晋升解聘均基于功绩",
      sourceId: "src-textbook-appendix-I"
    },
    {
      id: "p-org-6",
      group: "organization",
      name: "履行合同",
      nameEn: "ensure that all legitimate corporate contracts are upheld",
      desc: "确保合法公司合同得到履行",
      sourceId: "src-textbook-appendix-I"
    },
    {
      id: "p-emp-1",
      group: "employee",
      name: "服从合法指令",
      nameEn: "obey all legitimate, job-related directives",
      desc: "服从一切合法且与工作相关的指令",
      sourceId: "src-textbook-appendix-I"
    },
    {
      id: "p-emp-2",
      group: "employee",
      name: "达到行业水准",
      nameEn: "perform their contracted duties on at least an industry-standard level",
      desc: "以不低于行业标准履行合同职责",
      sourceId: "src-textbook-appendix-I"
    },
    {
      id: "p-emp-3",
      group: "employee",
      name: "保守机密",
      nameEn:
        "uphold the principle of confidentiality in relation to knowledge gained in present and past employment",
      desc: "对现职与前职所获知识保守机密",
      sourceId: "src-textbook-appendix-I"
    },
    {
      id: "p-emp-4",
      group: "employee",
      name: "不损害组织",
      nameEn: "avoid actions that harm the corporation in acting on behalf of the organization",
      desc: "代表组织行事时避免损害组织",
      sourceId: "src-textbook-appendix-I"
    },
    {
      id: "p-emp-5",
      group: "employee",
      name: "诚实",
      nameEn: "be honest in their business relationships with others",
      desc: "在商业关系中保持诚实",
      sourceId: "src-textbook-appendix-I"
    },
    {
      id: "p-emp-6",
      group: "employee",
      name: "执行伦理原则",
      nameEn: "enforce all organizational and employee ethical principles, when in positions of authority",
      desc: "身处权力岗位时执行组织与员工伦理原则",
      sourceId: "src-textbook-appendix-I"
    },
    {
      id: "p-inv-1",
      group: "involvement",
      name: "公共参与",
      nameEn:
        "Principle of public participation—Engineers should seriously consider participating in public policy discussions regarding future applications of technology.",
      desc: "认真考虑参与技术未来应用的公共政策讨论",
      sourceId: "src-textbook-appendix-I"
    },
    {
      id: "p-inv-2",
      group: "involvement",
      name: "公众教育",
      nameEn:
        "Principle of public education—Engineers should seriously consider helping the public to understand the applications of technologies in broader social, global contexts.",
      desc: "认真考虑帮助公众理解技术的社会全球语境",
      sourceId: "src-textbook-appendix-I"
    },
    {
      id: "p-inv-3",
      group: "involvement",
      name: "工程投入",
      nameEn:
        "Principle of engineering engagement—Engineers should seriously consider becoming involved in helping to improve the technological futures of those less fortunate than themselves, on a voluntary basis.",
      desc: "认真考虑自愿改善处境不如己者的技术未来",
      sourceId: "src-textbook-appendix-I"
    },
    {
      id: "p-right-1",
      group: "rights",
      name: "免受不必要伤害",
      nameEn: "be protected from unnecessary harm in their employment",
      desc: "在受雇中免受不必要的伤害",
      sourceId: "src-textbook-appendix-I"
    },
    {
      id: "p-right-2",
      group: "rights",
      name: "公平公正对待",
      nameEn: "fair and just treatment by employers",
      desc: "受雇主公平公正对待",
      sourceId: "src-textbook-appendix-I"
    },
    {
      id: "p-right-3",
      group: "rights",
      name: "不受歧视与骚扰",
      nameEn: "not be subjected to discrimination or harassment in their employment",
      desc: "在受雇中不受歧视或骚扰",
      sourceId: "src-textbook-appendix-I"
    },
    {
      id: "p-right-4",
      group: "rights",
      name: "基于功绩对待",
      nameEn: "be treated by their employers based on merit",
      desc: "受雇主基于功绩的对待",
      sourceId: "src-textbook-appendix-I"
    },
    {
      id: "p-right-5",
      group: "rights",
      name: "合同得到履行",
      nameEn: "have their contracts honored",
      desc: "合同得到履行",
      sourceId: "src-textbook-appendix-I"
    },
    {
      id: "p-right-6",
      group: "rights",
      name: "不服从非法指令",
      nameEn: "disobey illegitimate employment directives",
      desc: "不服从不合法的雇佣指令",
      sourceId: "src-textbook-appendix-I"
    },
    {
      id: "p-right-7",
      group: "rights",
      name: "举报权",
      nameEn:
        "blow the whistle (externally or internally) if, in their professional judgments, the physical safety of the public will be endangered as a result of their failures to act",
      desc: "专业判断公众安全将受威胁时有权举报",
      sourceId: "src-textbook-appendix-I"
    },
    {
      id: "p-right-8",
      group: "rights",
      name: "获得必要资源",
      nameEn: "obtain the resources necessary to perform their assigned tasks competently",
      desc: "获得胜任任务所需的资源",
      sourceId: "src-textbook-appendix-I"
    },
    {
      id: "p-right-9",
      group: "rights",
      name: "告知公众",
      nameEn:
        "inform the public of engineering decisions that have the potential to seriously harm the physical welfare of the public",
      desc: "就可能严重损害公众福祉的决策告知公众",
      sourceId: "src-textbook-appendix-I"
    },
    {
      id: "p-right-10",
      group: "rights",
      name: "公平报酬与知识产权",
      nameEn:
        "fair compensation for their work, including the right to share equitably in gains resulting from their contributions to intellectual property",
      desc: "获公平报酬并公平分享知识产权收益",
      sourceId: "src-textbook-appendix-I"
    }
  ];

  var steps = [
    {
      id: 1,
      key: "identify",
      name: "识别伦理问题",
      presentInClass: true,
      intro:
        "列出与本案例相关的伦理问题。教材建议以问句形式表述，便于后续聚焦与分析。",
      prompts: [
        {
          text: "你能否把每条伦理关切写成问句（含「是否/应该」或问号）？",
          source: "textbook"
        },
        {
          text: "TODO(PI): 补引导问题",
          source: "team"
        }
      ],
      fields: [
        {
          key: "issues",
          type: "list",
          label: "伦理问题",
          min: 5,
          minSource: "textbook",
          itemSchema: ["text:question", "actor:optional"],
          hint: "建议问句形式；涉及主体选填"
        }
      ],
      checks: [
        { id: "minItems", level: "suggest", refSource: "textbook" },
        { id: "mustBeQuestion", level: "suggest", refSource: "textbook" }
      ],
      referenceLevel1: ["timeline", "sources"],
      referenceLevel3: {
        type: "text",
        source: "textbook",
        body: "教材对「问句形式」的说明（正文待 PI 摘录）。"
      },
      state: "todo"
    },
    {
      id: 2,
      key: "focus",
      name: "聚焦",
      presentInClass: true,
      intro: "从第 1 步的问题中选出 2 条作为核心问题，并说明理由。",
      prompts: [
        {
          text: "选 2 条时，完整性是否优于广度？",
          source: "textbook"
        },
        { text: "TODO(PI): 补引导问题", source: "team" }
      ],
      fields: [
        {
          key: "chosen",
          type: "multiSelect",
          label: "选定的核心问题",
          min: 2,
          max: 2,
          from: "items.Q"
        },
        {
          key: "focusReasons",
          type: "list",
          label: "每条选定问题的理由",
          itemSchema: ["questionRef", "reason:textarea"]
        },
        {
          key: "rewriteNote",
          type: "textarea",
          label: "改写以涵盖子问题（选填）",
          rows: 3
        }
      ],
      checks: [
        { id: "exactSelect", level: "suggest", refSource: "textbook" },
        { id: "reasonNonEmpty", level: "suggest", refSource: "team" }
      ],
      referenceLevel1: [],
      referenceLevel3: {
        type: "text",
        source: "textbook",
        body: "教材对「完整性优于广度」的说明（正文待 PI 摘录）。"
      },
      state: "todo"
    },
    {
      id: 3,
      key: "facts",
      name: "相关事实",
      presentInClass: true,
      intro:
        "整理与核心问题相关的事实：物质/技术、个人、组织，并记录缺失事实。分类为启发式，可重叠多标签。",
      prompts: [
        {
          text: "三类分类是启发式的——同一条事实可否同时属于多个类别？",
          source: "textbook"
        },
        { text: "TODO(PI): 补引导问题", source: "team" }
      ],
      fields: [
        {
          key: "factEntries",
          type: "bucketedFacts",
          label: "相关事实与缺失",
          buckets: ["material", "individual", "organization", "missing"],
          allowMultiTag: true
        },
        {
          key: "evidenceLinks",
          type: "relation",
          label: "事实与问题的关联",
          targets: "Q",
          require: "why"
        }
      ],
      checks: [
        { id: "minPerBucket", level: "suggest", refSource: "team" },
        { id: "minMissing", level: "suggest", refSource: "team" }
      ],
      referenceLevel1: ["facts"],
      referenceLevel3: {
        type: "text",
        source: "textbook",
        body: "教材对「三类为启发式、可重叠」的说明（正文待 PI 摘录）。"
      },
      state: "todo"
    },
    {
      id: 4,
      key: "assumptions",
      name: "合理假设",
      presentInClass: true,
      intro: "在信息不完整处作出合理假设，并为每条假设记录依据。",
      prompts: [
        {
          text: "假设能否是「开放式」的？依据应指向哪些条目或来源？",
          source: "textbook"
        },
        { text: "TODO(PI): 补引导问题", source: "team" }
      ],
      fields: [
        {
          key: "assumptions",
          type: "assumption",
          label: "合理假设",
          require: "basis"
        },
        {
          key: "assumptionLinks",
          type: "relation",
          label: "假设与信息缺口",
          targets: "M",
          require: "why"
        }
      ],
      checks: [
        { id: "basisRequired", level: "suggest", refSource: "team" }
      ],
      referenceLevel1: ["facts"],
      referenceLevel3: {
        type: "text",
        source: "textbook",
        body: "教材对「假设不能开放式」的说明（正文待 PI 摘录）。"
      },
      state: "todo"
    },
    {
      id: 5,
      key: "clarify",
      name: "定义澄清",
      presentInClass: true,
      intro: "澄清价值含义词：他人可能如何理解，以及你打算如何在分析中使用。",
      prompts: [
        {
          text: "至少澄清 2 个词；可从候选词中选，也可自建。",
          source: "textbook"
        },
        { text: "TODO(PI): 补引导问题", source: "team" }
      ],
      fields: [
        {
          key: "clarifications",
          type: "clarify",
          label: "概念澄清",
          cols: ["others", "mine"],
          min: 2,
          minSource: "textbook",
          allowCustomWord: true
        }
      ],
      checks: [
        { id: "minItems", level: "suggest", refSource: "textbook" },
        { id: "bothColsNonEmpty", level: "suggest", refSource: "team" }
      ],
      referenceLevel1: ["glossary"],
      referenceLevel3: {
        type: "text",
        source: "textbook",
        body: "教材对「价值含义词」的说明（正文待 PI 摘录）。"
      },
      state: "todo"
    },
    {
      id: 6,
      key: "analysis",
      name: "伦理分析",
      presentInClass: false,
      intro:
        "选择适用原则，处理原则冲突（四问），排序并说明理由；可自建原则。",
      prompts: [
        {
          text: "选了 ≥2 条原则时，它们在本案某问题上是否冲突？",
          source: "textbook"
        },
        { text: "TODO(PI): 补引导问题", source: "team" }
      ],
      fields: [
        {
          key: "selectedPrinciples",
          type: "multiSelect",
          label: "适用原则",
          from: "principles",
          min: 3,
          minSource: "textbook"
        },
        {
          key: "principleConflicts",
          type: "conflict",
          label: "原则冲突",
          questions: 4
        },
        {
          key: "principleOrder",
          type: "rankList",
          label: "原则优先级",
          allowTie: true
        },
        {
          key: "orderReason",
          type: "textarea",
          label: "排序理由",
          rows: 4
        },
        {
          key: "principleGap",
          type: "textarea",
          label: "是否有原则不足",
          rows: 3
        },
        {
          key: "customPrinciples",
          type: "list",
          label: "自建原则（选填）",
          itemSchema: ["name", "desc"]
        }
      ],
      checks: [
        { id: "minPrinciples", level: "suggest", refSource: "textbook" },
        { id: "conflictReasonIfNeeded", level: "suggest", refSource: "team" }
      ],
      referenceLevel1: ["principles"],
      referenceLevel3: {
        type: "text",
        source: "textbook",
        body: "教材对「原则冲突与层级」的说明（正文待 PI 摘录）。"
      },
      state: "todo"
    },
    {
      id: 7,
      key: "review",
      name: "过程回顾",
      presentInClass: false,
      intro: "回显第 1–6 步内容，按复核提示检查，标记需修订项并记录修改原因。",
      prompts: [
        {
          text: "案例分析是迭代过程——哪些条目需要回到上游修改？",
          source: "textbook"
        },
        { text: "TODO(PI): 补引导问题", source: "team" }
      ],
      fields: [
        {
          key: "reviewPanel",
          type: "review",
          label: "前序步骤回显",
          source: "steps1to6"
        },
        {
          key: "biasReview",
          type: "checkList",
          label: "偏见自查",
          from: "biasChecks"
        },
        {
          key: "reviewPromptActions",
          type: "checkList",
          label: "复核提示",
          from: "reviewPrompts"
        }
      ],
      checks: [
        { id: "allReviewTouched", level: "suggest", refSource: "team" },
        { id: "revisionJumpAvailable", level: "suggest", refSource: "team" }
      ],
      referenceLevel1: ["biasChecks"],
      referenceLevel3: {
        type: "text",
        source: "textbook",
        body: "教材对「迭代过程」的说明（正文待 PI 摘录）。"
      },
      state: "todo"
    },
    {
      id: 8,
      key: "conclusion",
      name: "得出结论",
      presentInClass: false,
      intro:
        "针对第 2 步选定的每个核心问题，分别写出结论与理由。程序不提供措辞建议。",
      prompts: [
        {
          text: "每条核心问题是否都有对应的结论与理由？",
          source: "textbook"
        },
        { text: "TODO(PI): 补引导问题", source: "team" }
      ],
      fields: [
        {
          key: "resolutions",
          type: "list",
          label: "结论与理由",
          itemSchema: ["questionRef", "conclusion:textarea", "reason:textarea"]
        }
      ],
      checks: [
        { id: "conclusionAndReason", level: "suggest", refSource: "textbook" }
      ],
      referenceLevel1: [],
      referenceLevel3: null,
      state: "todo"
    },
    {
      id: 9,
      key: "constraints",
      name: "现实约束与责任判断",
      presentInClass: false,
      intro:
        "识别现实约束并做责任判断：约束是什么、当时有何选择、是否减轻责任及理由。可勾选预置提示词或声明本案无相关约束。",
      prompts: [
        {
          text: "约束存在是否必然意味着责任减轻？",
          source: "textbook"
        },
        { text: "TODO(PI): 补引导问题", source: "team" }
      ],
      fields: [
        {
          key: "constraintJudgments",
          type: "list",
          label: "约束条目（三问）",
          itemSchema: [
            "whatAndWho:textarea",
            "alternatives:textarea",
            "mitigationJudgment:textarea"
          ]
        },
        {
          key: "presetHints",
          type: "multiSelect",
          label: "预置约束提示（可多选可不选）",
          from: "constraints"
        },
        {
          key: "noRelevantConstraints",
          type: "checkList",
          label: "本案声明",
          options: [{ id: "none", label: "本案没有相关约束" }]
        }
      ],
      checks: [
        { id: "threeQuestionsComplete", level: "suggest", refSource: "team" },
        { id: "presetOrNone", level: "suggest", refSource: "team" }
      ],
      referenceLevel1: ["glossary"],
      referenceLevel3: {
        type: "text",
        source: "textbook",
        body: "教材对 excusing / mitigating conditions 与「约束的现实性」的说明（正文待 PI 摘录）。"
      },
      state: "todo"
    },
    {
      id: 10,
      key: "avoid",
      name: "避免问题",
      presentInClass: false,
      intro: "列出未来类似情境中应避免的问题或失误模式。",
      prompts: [
        { text: "至少列出 3 条可操作的「应避免」事项。", source: "textbook" },
        { text: "TODO(PI): 补引导问题", source: "team" }
      ],
      fields: [
        {
          key: "avoidItems",
          type: "list",
          label: "应避免的问题",
          min: 3,
          minSource: "textbook",
          itemSchema: ["text"]
        }
      ],
      checks: [{ id: "minItems", level: "suggest", refSource: "textbook" }],
      referenceLevel1: [],
      referenceLevel3: null,
      state: "todo"
    }
  ];

  window.CASE_DATA = {
    meta: {
      id: "fukushima",
      title: "福岛第一核电站事故",
      dataVersion: "2.0",
      builtAt: "2026-10-11"
    },
    sources: [
      {
        id: "src-textbook-appendix-I",
        title: "Global Engineering Ethics, Appendix I: Principles Reviewed",
        publisher: "Elsevier",
        year: 2017,
        url: "",
        accessedAt: ""
      }
    ],
    timeline: [
      {
        id: "tl-ph-1",
        date: "【占位】",
        event: "【占位】此处待补",
        sourceId: "TODO(PI)",
        infoKnownBy: [],
        infoKnownWhen: ""
      }
    ],
    facts: [
      {
        id: "f-ph-1",
        text: "【占位】此处待补",
        categories: ["material"],
        sourceId: "TODO(PI)",
        note: ""
      }
    ],
    valueWords: [
      {
        id: "vw-1",
        word: "责任",
        whyVague: "可指法律责任、道德责任或组织分工，需在本案中界定。",
        sourceId: "TODO(PI)"
      },
      {
        id: "vw-2",
        word: "安全",
        whyVague: "可指人身、环境或系统可靠性，标准因语境而异。",
        sourceId: "TODO(PI)"
      },
      {
        id: "vw-3",
        word: "合规",
        whyVague: "可指满足最低法规或更高行业规范，含义需澄清。",
        sourceId: "TODO(PI)"
      },
      {
        id: "vw-4",
        word: "透明",
        whyVague: "可指信息公开程度或决策过程可见性，需具体化。",
        sourceId: "TODO(PI)"
      }
    ],
    principles: principles,
    constraints: [
      {
        id: "c-hint-1",
        label: "深层文化规范",
        desc: "组织或行业长期形成的非成文规范，可能塑造决策默认选项。",
        sourceId: "TODO(PI)"
      },
      {
        id: "c-hint-2",
        label: "组织压力",
        desc: "来自上级、绩效或团队期望的压力，不预设必然减责。",
        sourceId: "TODO(PI)"
      },
      {
        id: "c-hint-3",
        label: "信息不对称",
        desc: "不同主体掌握信息范围与时机不同，需结合当时情境判断。",
        sourceId: "TODO(PI)"
      },
      {
        id: "c-hint-4",
        label: "时间压力",
        desc: "紧急决策窗口内可选方案受限，须说明当时还有哪些可行选择。",
        sourceId: "TODO(PI)"
      },
      {
        id: "c-hint-5",
        label: "职业风险",
        desc: "举报、抗命等可能带来职业后果，与责任判断是否减轻须分开论证。",
        sourceId: "TODO(PI)"
      }
    ],
    biasChecks: [
      { id: "bc-1", label: "是否遗漏了某类事实？（按三分类检查）", jumpTo: 3 },
      { id: "bc-2", label: "是否有概念仍然模糊？", jumpTo: 5 },
      { id: "bc-3", label: "假设是否都写了依据？", jumpTo: 4 },
      { id: "bc-4", label: "前后是否有矛盾？", jumpTo: 7 },
      { id: "bc-5", label: "是否只站在了一个主体的视角？", jumpTo: 1 }
    ],
    reviewPrompts: [
      {
        id: "rp-1",
        label: "是否遗漏了某类事实？",
        jumpTo: 3,
        kind: "missing-facts"
      },
      {
        id: "rp-2",
        label: "是否有概念仍然模糊？",
        jumpTo: 5,
        kind: "vague-concept"
      },
      {
        id: "rp-3",
        label: "假设是否都写了依据？",
        jumpTo: 4,
        kind: "assumption-basis"
      },
      {
        id: "rp-4",
        label: "前后是否有矛盾？",
        jumpTo: 7,
        kind: "contradiction"
      },
      {
        id: "rp-5",
        label: "是否只站在了一个主体的视角？",
        jumpTo: 1,
        kind: "single-perspective"
      }
    ],
    steps: steps
  };
})();
