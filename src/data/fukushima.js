/**
 * Fukushima case static data (contract v2.2, dataVersion 2.2).
 * Chinese fields are authoritative; English ...En fields are optional display overlays.
 */
(function () {
  'use strict';
  var principles = [
    {
      "id": "p-basic-1",
      "group": "basic",
      "name": "公众安全",
      "nameEn": "keep members of the public safe from serious negative consequences resulting from their development and implementation of technology",
      "desc": "使公众免受技术开发与实施所致严重负面后果",
      "sourceId": "src-textbook-appendix-I",
      "descEn": "Keep members of the public safe from serious negative consequences resulting from their development and implementation of technology."
    },
    {
      "id": "p-basic-2",
      "group": "basic",
      "name": "基本人权",
      "nameEn": "ensure that fundamental human rights are not negatively impacted as a result of their work with technology",
      "desc": "确保基本人权不因技术工作受负面影响",
      "sourceId": "src-textbook-appendix-I",
      "descEn": "Ensure that fundamental human rights are not negatively impacted as a result of their work with technology."
    },
    {
      "id": "p-basic-3",
      "group": "basic",
      "name": "环境保护",
      "nameEn": "avoid damage to the environment and living beings that would result in serious negative consequences, including long-term ones, to human life",
      "desc": "避免对环境与生物造成危及人类生命的严重损害",
      "sourceId": "src-textbook-appendix-I",
      "descEn": "Avoid damage to the environment and living beings that would result in serious negative consequences, including long-term ones, to human life."
    },
    {
      "id": "p-basic-4",
      "group": "basic",
      "name": "胜任能力",
      "nameEn": "engage only in engineering activities they are competent to carry out",
      "desc": "只从事自己有能力胜任的工程活动",
      "sourceId": "src-textbook-appendix-I",
      "descEn": "Engage only in engineering activities they are competent to carry out."
    },
    {
      "id": "p-basic-5",
      "group": "basic",
      "name": "决策依据",
      "nameEn": "base their engineering decisions on scientific principles and mathematical analyses and seek to avoid the influence of extraneous factors",
      "desc": "决策基于科学与数学分析，避免无关因素",
      "sourceId": "src-textbook-appendix-I",
      "descEn": "Base their engineering decisions on scientific principles and mathematical analyses and seek to avoid the influence of extraneous factors."
    },
    {
      "id": "p-basic-6",
      "group": "basic",
      "name": "真实披露",
      "nameEn": "keep the public informed of their decisions, which have the potential to seriously affect the public, and to be truthful and complete in their disclosures",
      "desc": "告知可能严重影响公众的决策，披露真实完整",
      "sourceId": "src-textbook-appendix-I",
      "descEn": "Keep the public informed of their decisions, which have the potential to seriously affect the public, and to be truthful and complete in their disclosures."
    },
    {
      "id": "p-basic-7",
      "group": "basic",
      "name": "尊重非道德文化价值",
      "nameEn": "understand and respect the nonmoral cultural values of those they encounter in fulfilling their engineering duties",
      "desc": "理解并尊重履职中遇到的非道德性文化价值",
      "sourceId": "src-textbook-appendix-I",
      "descEn": "Understand and respect the nonmoral cultural values of those they encounter in fulfilling their engineering duties."
    },
    {
      "id": "p-basic-8",
      "group": "basic",
      "name": "拒绝违规文化实践",
      "nameEn": "endeavor to refuse to participate in engineering activities that are claimed to reflect cultural practices but that violate basic ethical principles for global engineering",
      "desc": "拒绝参与以文化为名却违反全球工程伦理的活动",
      "sourceId": "src-textbook-appendix-I",
      "descEn": "Endeavor to refuse to participate in engineering activities that are claimed to reflect cultural practices but that violate basic ethical principles for global engineering."
    },
    {
      "id": "p-org-1",
      "group": "organization",
      "name": "避免不必要伤害",
      "nameEn": "avoid producing unnecessary harms to those in and outside of their organizations",
      "desc": "避免对组织内外造成不必要的伤害",
      "sourceId": "src-textbook-appendix-I",
      "descEn": "Avoid producing unnecessary harms to those in and outside of their organizations."
    },
    {
      "id": "p-org-2",
      "group": "organization",
      "name": "公平对待利益相关方",
      "nameEn": "ensure that all stakeholders of their organizations are treated fairly and justly",
      "desc": "确保组织利益相关方受到公平公正对待",
      "sourceId": "src-textbook-appendix-I",
      "descEn": "Ensure that all stakeholders of their organizations are treated fairly and justly."
    },
    {
      "id": "p-org-3",
      "group": "organization",
      "name": "遵守法律法规",
      "nameEn": "ensure that all relevant laws and regulations are followed within their organizations",
      "desc": "确保组织内遵守相关法律法规",
      "sourceId": "src-textbook-appendix-I",
      "descEn": "Ensure that all relevant laws and regulations are followed within their organizations."
    },
    {
      "id": "p-org-4",
      "group": "organization",
      "name": "免受歧视与骚扰",
      "nameEn": "protect members of their organizations against internal discrimination and harassment",
      "desc": "保护组织成员免受内部歧视与骚扰",
      "sourceId": "src-textbook-appendix-I",
      "descEn": "Protect members of their organizations against internal discrimination and harassment."
    },
    {
      "id": "p-org-5",
      "group": "organization",
      "name": "基于功绩的人事决定",
      "nameEn": "make all hiring, compensation, promotion, and termination decisions based on merit",
      "desc": "招聘薪酬晋升解聘均基于功绩",
      "sourceId": "src-textbook-appendix-I",
      "descEn": "Make all hiring, compensation, promotion, and termination decisions based on merit."
    },
    {
      "id": "p-org-6",
      "group": "organization",
      "name": "履行合同",
      "nameEn": "ensure that all legitimate corporate contracts are upheld",
      "desc": "确保合法公司合同得到履行",
      "sourceId": "src-textbook-appendix-I",
      "descEn": "Ensure that all legitimate corporate contracts are upheld."
    },
    {
      "id": "p-emp-1",
      "group": "employee",
      "name": "服从合法指令",
      "nameEn": "obey all legitimate, job-related directives",
      "desc": "服从一切合法且与工作相关的指令",
      "sourceId": "src-textbook-appendix-I",
      "descEn": "Obey all legitimate, job-related directives."
    },
    {
      "id": "p-emp-2",
      "group": "employee",
      "name": "达到行业水准",
      "nameEn": "perform their contracted duties on at least an industry-standard level",
      "desc": "以不低于行业标准履行合同职责",
      "sourceId": "src-textbook-appendix-I",
      "descEn": "Perform their contracted duties on at least an industry-standard level."
    },
    {
      "id": "p-emp-3",
      "group": "employee",
      "name": "保守机密",
      "nameEn": "uphold the principle of confidentiality in relation to knowledge gained in present and past employment",
      "desc": "对现职与前职所获知识保守机密",
      "sourceId": "src-textbook-appendix-I",
      "descEn": "Uphold the principle of confidentiality in relation to knowledge gained in present and past employment."
    },
    {
      "id": "p-emp-4",
      "group": "employee",
      "name": "不损害组织",
      "nameEn": "avoid actions that harm the corporation in acting on behalf of the organization",
      "desc": "代表组织行事时避免损害组织",
      "sourceId": "src-textbook-appendix-I",
      "descEn": "Avoid actions that harm the corporation in acting on behalf of the organization."
    },
    {
      "id": "p-emp-5",
      "group": "employee",
      "name": "诚实",
      "nameEn": "be honest in their business relationships with others",
      "desc": "在商业关系中保持诚实",
      "sourceId": "src-textbook-appendix-I",
      "descEn": "Be honest in their business relationships with others."
    },
    {
      "id": "p-emp-6",
      "group": "employee",
      "name": "执行伦理原则",
      "nameEn": "enforce all organizational and employee ethical principles, when in positions of authority",
      "desc": "身处权力岗位时执行组织与员工伦理原则",
      "sourceId": "src-textbook-appendix-I",
      "descEn": "Enforce all organizational and employee ethical principles, when in positions of authority."
    },
    {
      "id": "p-inv-1",
      "group": "involvement",
      "name": "公共参与",
      "nameEn": "Principle of public participation—Engineers should seriously consider participating in public policy discussions regarding future applications of technology.",
      "desc": "认真考虑参与技术未来应用的公共政策讨论",
      "sourceId": "src-textbook-appendix-I",
      "descEn": "Principle of public participation—Engineers should seriously consider participating in public policy discussions regarding future applications of technology.."
    },
    {
      "id": "p-inv-2",
      "group": "involvement",
      "name": "公众教育",
      "nameEn": "Principle of public education—Engineers should seriously consider helping the public to understand the applications of technologies in broader social, global contexts.",
      "desc": "认真考虑帮助公众理解技术的社会全球语境",
      "sourceId": "src-textbook-appendix-I",
      "descEn": "Principle of public education—Engineers should seriously consider helping the public to understand the applications of technologies in broader social, global contexts.."
    },
    {
      "id": "p-inv-3",
      "group": "involvement",
      "name": "工程投入",
      "nameEn": "Principle of engineering engagement—Engineers should seriously consider becoming involved in helping to improve the technological futures of those less fortunate than themselves, on a voluntary basis.",
      "desc": "认真考虑自愿改善处境不如己者的技术未来",
      "sourceId": "src-textbook-appendix-I",
      "descEn": "Principle of engineering engagement—Engineers should seriously consider becoming involved in helping to improve the technological futures of those less fortunate than themselves, on a voluntary basis.."
    },
    {
      "id": "p-right-1",
      "group": "rights",
      "name": "免受不必要伤害",
      "nameEn": "be protected from unnecessary harm in their employment",
      "desc": "在受雇中免受不必要的伤害",
      "sourceId": "src-textbook-appendix-I",
      "descEn": "Be protected from unnecessary harm in their employment."
    },
    {
      "id": "p-right-2",
      "group": "rights",
      "name": "公平公正对待",
      "nameEn": "fair and just treatment by employers",
      "desc": "受雇主公平公正对待",
      "sourceId": "src-textbook-appendix-I",
      "descEn": "Fair and just treatment by employers."
    },
    {
      "id": "p-right-3",
      "group": "rights",
      "name": "不受歧视与骚扰",
      "nameEn": "not be subjected to discrimination or harassment in their employment",
      "desc": "在受雇中不受歧视或骚扰",
      "sourceId": "src-textbook-appendix-I",
      "descEn": "Not be subjected to discrimination or harassment in their employment."
    },
    {
      "id": "p-right-4",
      "group": "rights",
      "name": "基于功绩对待",
      "nameEn": "be treated by their employers based on merit",
      "desc": "受雇主基于功绩的对待",
      "sourceId": "src-textbook-appendix-I",
      "descEn": "Be treated by their employers based on merit."
    },
    {
      "id": "p-right-5",
      "group": "rights",
      "name": "合同得到履行",
      "nameEn": "have their contracts honored",
      "desc": "合同得到履行",
      "sourceId": "src-textbook-appendix-I",
      "descEn": "Have their contracts honored."
    },
    {
      "id": "p-right-6",
      "group": "rights",
      "name": "不服从非法指令",
      "nameEn": "disobey illegitimate employment directives",
      "desc": "不服从不合法的雇佣指令",
      "sourceId": "src-textbook-appendix-I",
      "descEn": "Disobey illegitimate employment directives."
    },
    {
      "id": "p-right-7",
      "group": "rights",
      "name": "举报权",
      "nameEn": "blow the whistle (externally or internally) if, in their professional judgments, the physical safety of the public will be endangered as a result of their failures to act",
      "desc": "专业判断公众安全将受威胁时有权举报",
      "sourceId": "src-textbook-appendix-I",
      "descEn": "Blow the whistle (externally or internally) if, in their professional judgments, the physical safety of the public will be endangered as a result of their failures to act."
    },
    {
      "id": "p-right-8",
      "group": "rights",
      "name": "获得必要资源",
      "nameEn": "obtain the resources necessary to perform their assigned tasks competently",
      "desc": "获得胜任任务所需的资源",
      "sourceId": "src-textbook-appendix-I",
      "descEn": "Obtain the resources necessary to perform their assigned tasks competently."
    },
    {
      "id": "p-right-9",
      "group": "rights",
      "name": "告知公众",
      "nameEn": "inform the public of engineering decisions that have the potential to seriously harm the physical welfare of the public",
      "desc": "就可能严重损害公众福祉的决策告知公众",
      "sourceId": "src-textbook-appendix-I",
      "descEn": "Inform the public of engineering decisions that have the potential to seriously harm the physical welfare of the public."
    },
    {
      "id": "p-right-10",
      "group": "rights",
      "name": "公平报酬与知识产权",
      "nameEn": "fair compensation for their work, including the right to share equitably in gains resulting from their contributions to intellectual property",
      "desc": "获公平报酬并公平分享知识产权收益",
      "sourceId": "src-textbook-appendix-I",
      "descEn": "Fair compensation for their work, including the right to share equitably in gains resulting from their contributions to intellectual property."
    }
  ];

  var steps = [
    {
      "id": 1,
      "key": "identify",
      "name": "识别伦理问题",
      "presentInClass": true,
      "intro": "列出与本案例相关的伦理问题。教材建议以问句形式表述，便于后续聚焦与分析。",
      "prompts": [
        {
          "text": "你能否把每条伦理关切写成问句（含「是否/应该」或问号）？",
          "source": "textbook",
          "textEn": "Can you phrase each ethical concern as a question (using whether/should or a question mark)?"
        },
        {
          "text": "TODO(PI): 补引导问题",
          "source": "team",
          "textEn": "Instructor placeholder: guided question to be supplied.",
          "noteEnReview": "needs-manual-review"
        }
      ],
      "fields": [
        {
          "key": "issues",
          "type": "list",
          "label": "伦理问题",
          "min": 5,
          "minSource": "textbook",
          "itemSchema": [
            "text:question",
            "actor:optional"
          ],
          "hint": "建议问句形式；涉及主体选填",
          "labelEn": "Ethical issues",
          "hintEn": "See textbook for field guidance (English hint pending).",
          "noteEnReview": "needs-manual-review"
        }
      ],
      "checks": [
        {
          "id": "minItems",
          "level": "suggest",
          "refSource": "textbook"
        },
        {
          "id": "mustBeQuestion",
          "level": "suggest",
          "refSource": "textbook"
        }
      ],
      "referenceLevel1": [
        "timeline",
        "sources"
      ],
      "referenceLevel3": {
        "type": "text",
        "source": "textbook",
        "body": "教材对「问句形式」的说明（正文待 PI 摘录）。",
        "bodyEn": "Textbook explanation for this step (awaiting instructor excerpt in English).",
        "noteEnReview": "needs-manual-review"
      },
      "state": "todo",
      "nameEn": "Identify ethical issues",
      "introEn": "List ethical issues for this case. The textbook suggests phrasing them as questions for later focus and analysis."
    },
    {
      "id": 2,
      "key": "focus",
      "name": "聚焦",
      "presentInClass": true,
      "intro": "从第 1 步的问题中选出 2 条作为核心问题，并说明理由。",
      "prompts": [
        {
          "text": "选 2 条时，完整性是否优于广度？",
          "source": "textbook",
          "textEn": "When choosing two issues, is depth more important than breadth?"
        },
        {
          "text": "TODO(PI): 补引导问题",
          "source": "team",
          "textEn": "Instructor placeholder: guided question to be supplied.",
          "noteEnReview": "needs-manual-review"
        }
      ],
      "fields": [
        {
          "key": "chosen",
          "type": "multiSelect",
          "label": "选定的核心问题",
          "min": 2,
          "max": 2,
          "from": "items.Q",
          "labelEn": "Selected core questions"
        },
        {
          "key": "focusReasons",
          "type": "list",
          "label": "每条选定问题的理由",
          "itemSchema": [
            "questionRef",
            "reason:textarea"
          ],
          "labelEn": "Reason for each selected question"
        },
        {
          "key": "rewriteNote",
          "type": "textarea",
          "label": "改写以涵盖子问题（选填）",
          "rows": 3,
          "labelEn": "Rewrite to cover subquestions (optional)"
        }
      ],
      "checks": [
        {
          "id": "exactSelect",
          "level": "suggest",
          "refSource": "textbook"
        },
        {
          "id": "reasonNonEmpty",
          "level": "suggest",
          "refSource": "team"
        }
      ],
      "referenceLevel1": [],
      "referenceLevel3": {
        "type": "text",
        "source": "textbook",
        "body": "教材对「完整性优于广度」的说明（正文待 PI 摘录）。",
        "bodyEn": "Textbook explanation for this step (awaiting instructor excerpt in English).",
        "noteEnReview": "needs-manual-review"
      },
      "state": "todo",
      "nameEn": "Narrow the focus",
      "introEn": "Choose two issues from step 1 as core questions and explain why they matter."
    },
    {
      "id": 3,
      "key": "facts",
      "name": "相关事实",
      "presentInClass": true,
      "intro": "整理与核心问题相关的事实：物质/技术、个人、组织，并记录缺失事实。分类为启发式，可重叠多标签。",
      "prompts": [
        {
          "text": "三类分类是启发式的——同一条事实可否同时属于多个类别？",
          "source": "textbook",
          "textEn": "The three categories are heuristic—can one fact belong to more than one category?"
        },
        {
          "text": "TODO(PI): 补引导问题",
          "source": "team",
          "textEn": "Instructor placeholder: guided question to be supplied.",
          "noteEnReview": "needs-manual-review"
        }
      ],
      "fields": [
        {
          "key": "factEntries",
          "type": "bucketedFacts",
          "label": "相关事实与缺失",
          "buckets": [
            "material",
            "individual",
            "organization",
            "missing"
          ],
          "allowMultiTag": true,
          "labelEn": "Relevant facts and missing information"
        },
        {
          "key": "evidenceLinks",
          "type": "relation",
          "label": "事实与问题的关联",
          "targets": "Q",
          "require": "why",
          "labelEn": "Links between facts and questions"
        }
      ],
      "checks": [
        {
          "id": "minPerBucket",
          "level": "suggest",
          "refSource": "team"
        },
        {
          "id": "minMissing",
          "level": "suggest",
          "refSource": "team"
        }
      ],
      "referenceLevel1": [
        "facts"
      ],
      "referenceLevel3": {
        "type": "text",
        "source": "textbook",
        "body": "教材对「三类为启发式、可重叠」的说明（正文待 PI 摘录）。",
        "bodyEn": "Textbook explanation for this step (awaiting instructor excerpt in English).",
        "noteEnReview": "needs-manual-review"
      },
      "state": "todo",
      "nameEn": "Determine relevant and missing facts",
      "introEn": "Separate relevant facts (material, individual, organizational) from missing information."
    },
    {
      "id": 4,
      "key": "assumptions",
      "name": "合理假设",
      "presentInClass": true,
      "intro": "在信息不完整处作出合理假设，并为每条假设记录依据。",
      "prompts": [
        {
          "text": "假设能否是「开放式」的？依据应指向哪些条目或来源？",
          "source": "textbook",
          "textEn": "Can an assumption stay open-ended? What entries or sources should support it?"
        },
        {
          "text": "TODO(PI): 补引导问题",
          "source": "team",
          "textEn": "Instructor placeholder: guided question to be supplied.",
          "noteEnReview": "needs-manual-review"
        }
      ],
      "fields": [
        {
          "key": "assumptions",
          "type": "assumption",
          "label": "合理假设",
          "require": "basis",
          "labelEn": "Reasonable assumptions"
        },
        {
          "key": "assumptionLinks",
          "type": "relation",
          "label": "假设与信息缺口",
          "targets": "M",
          "require": "why",
          "labelEn": "Assumptions and information gaps"
        }
      ],
      "checks": [
        {
          "id": "basisRequired",
          "level": "suggest",
          "refSource": "team"
        }
      ],
      "referenceLevel1": [
        "facts"
      ],
      "referenceLevel3": {
        "type": "text",
        "source": "textbook",
        "body": "教材对「假设不能开放式」的说明（正文待 PI 摘录）。",
        "bodyEn": "Textbook explanation for this step (awaiting instructor excerpt in English).",
        "noteEnReview": "needs-manual-review"
      },
      "state": "todo",
      "nameEn": "Make reasonable assumptions",
      "introEn": "State reasonable assumptions where information is missing; link each to supporting material and inference reasons."
    },
    {
      "id": 5,
      "key": "clarify",
      "name": "定义澄清",
      "presentInClass": true,
      "intro": "澄清价值含义词：他人可能如何理解，以及你打算如何在分析中使用。",
      "prompts": [
        {
          "text": "至少澄清 2 个词；可从候选词中选，也可自建。",
          "source": "textbook",
          "textEn": "Clarify at least two terms; pick from candidates or add your own."
        },
        {
          "text": "TODO(PI): 补引导问题",
          "source": "team",
          "textEn": "Instructor placeholder: guided question to be supplied.",
          "noteEnReview": "needs-manual-review"
        }
      ],
      "fields": [
        {
          "key": "clarifications",
          "type": "clarify",
          "label": "概念澄清",
          "cols": [
            "others",
            "mine"
          ],
          "min": 2,
          "minSource": "textbook",
          "allowCustomWord": true,
          "labelEn": "Definitional clarification"
        }
      ],
      "checks": [
        {
          "id": "minItems",
          "level": "suggest",
          "refSource": "textbook"
        },
        {
          "id": "bothColsNonEmpty",
          "level": "suggest",
          "refSource": "team"
        }
      ],
      "referenceLevel1": [
        "glossary"
      ],
      "referenceLevel3": {
        "type": "text",
        "source": "textbook",
        "body": "教材对「价值含义词」的说明（正文待 PI 摘录）。",
        "bodyEn": "Textbook explanation for this step (awaiting instructor excerpt in English).",
        "noteEnReview": "needs-manual-review"
      },
      "state": "todo",
      "nameEn": "Undertake definitional clarification",
      "introEn": "Clarify value-laden terms: how others might read them and how your team uses them here."
    },
    {
      "id": 6,
      "key": "analysis",
      "name": "伦理分析",
      "presentInClass": false,
      "intro": "选择适用原则，处理原则冲突（四问），排序并说明理由；可自建原则。",
      "prompts": [
        {
          "text": "选了 ≥2 条原则时，它们在本案某问题上是否冲突？",
          "source": "textbook",
          "textEn": "If you selected two or more principles, do they conflict on a question in this case?"
        },
        {
          "text": "TODO(PI): 补引导问题",
          "source": "team",
          "textEn": "Instructor placeholder: guided question to be supplied.",
          "noteEnReview": "needs-manual-review"
        }
      ],
      "fields": [
        {
          "key": "selectedPrinciples",
          "type": "multiSelect",
          "label": "适用原则",
          "from": "principles",
          "min": 3,
          "minSource": "textbook",
          "labelEn": "Principles applied"
        },
        {
          "key": "principleConflicts",
          "type": "conflict",
          "label": "原则冲突",
          "questions": 4,
          "labelEn": "Principle conflicts"
        },
        {
          "key": "principleOrder",
          "type": "rankList",
          "label": "原则优先级",
          "allowTie": true,
          "labelEn": "Principle priorities"
        },
        {
          "key": "orderReason",
          "type": "textarea",
          "label": "排序理由",
          "rows": 4,
          "labelEn": "Ordering rationale"
        },
        {
          "key": "principleGap",
          "type": "textarea",
          "label": "是否有原则不足",
          "rows": 3,
          "labelEn": "Principles not yet covered"
        },
        {
          "key": "customPrinciples",
          "type": "list",
          "label": "自建原则（选填）",
          "itemSchema": [
            "name",
            "desc"
          ],
          "labelEn": "Custom principles (optional)"
        }
      ],
      "checks": [
        {
          "id": "minPrinciples",
          "level": "suggest",
          "refSource": "textbook"
        },
        {
          "id": "conflictReasonIfNeeded",
          "level": "suggest",
          "refSource": "team"
        }
      ],
      "referenceLevel1": [
        "principles"
      ],
      "referenceLevel3": {
        "type": "text",
        "source": "textbook",
        "body": "教材对「原则冲突与层级」的说明（正文待 PI 摘录）。",
        "bodyEn": "Textbook explanation for this step (awaiting instructor excerpt in English).",
        "noteEnReview": "needs-manual-review"
      },
      "state": "todo",
      "nameEn": "Conduct ethical analysis",
      "introEn": "Select applicable principles, explain relevance, and examine conflicts and priorities."
    },
    {
      "id": 7,
      "key": "review",
      "name": "过程回顾",
      "presentInClass": false,
      "intro": "回显第 1–6 步内容，按复核提示检查，标记需修订项并记录修改原因。",
      "prompts": [
        {
          "text": "案例分析是迭代过程——哪些条目需要回到上游修改？",
          "source": "textbook",
          "textEn": "Analysis is iterative—which entries should you revisit upstream?"
        },
        {
          "text": "TODO(PI): 补引导问题",
          "source": "team",
          "textEn": "Instructor placeholder: guided question to be supplied.",
          "noteEnReview": "needs-manual-review"
        }
      ],
      "fields": [
        {
          "key": "reviewPanel",
          "type": "review",
          "label": "前序步骤回显",
          "source": "steps1to6",
          "labelEn": "Earlier steps (read-only)"
        },
        {
          "key": "biasReview",
          "type": "checkList",
          "label": "偏见自查",
          "from": "biasChecks",
          "labelEn": "Bias self-check"
        },
        {
          "key": "reviewPromptActions",
          "type": "checkList",
          "label": "复核提示",
          "from": "reviewPrompts",
          "labelEn": "Review prompts"
        }
      ],
      "checks": [
        {
          "id": "allReviewTouched",
          "level": "suggest",
          "refSource": "team"
        },
        {
          "id": "revisionJumpAvailable",
          "level": "suggest",
          "refSource": "team"
        }
      ],
      "referenceLevel1": [
        "biasChecks"
      ],
      "referenceLevel3": {
        "type": "text",
        "source": "textbook",
        "body": "教材对「迭代过程」的说明（正文待 PI 摘录）。",
        "bodyEn": "Textbook explanation for this step (awaiting instructor excerpt in English).",
        "noteEnReview": "needs-manual-review"
      },
      "state": "todo",
      "nameEn": "Review the process",
      "introEn": "Review steps 1–6, mark items to revisit, and record why you changed or kept your entries."
    },
    {
      "id": 8,
      "key": "conclusion",
      "name": "得出结论",
      "presentInClass": false,
      "intro": "针对第 2 步选定的每个核心问题，分别写出结论与理由。程序不提供措辞建议。",
      "prompts": [
        {
          "text": "每条核心问题是否都有对应的结论与理由？",
          "source": "textbook",
          "textEn": "Does each core question have a matching conclusion and reason?"
        },
        {
          "text": "TODO(PI): 补引导问题",
          "source": "team",
          "textEn": "Instructor placeholder: guided question to be supplied.",
          "noteEnReview": "needs-manual-review"
        }
      ],
      "fields": [
        {
          "key": "resolutions",
          "type": "list",
          "label": "结论与理由",
          "itemSchema": [
            "questionRef",
            "conclusion:textarea",
            "reason:textarea"
          ],
          "labelEn": "Conclusion and justification"
        }
      ],
      "checks": [
        {
          "id": "conclusionAndReason",
          "level": "suggest",
          "refSource": "textbook"
        }
      ],
      "referenceLevel1": [],
      "referenceLevel3": null,
      "state": "todo",
      "nameEn": "Resolve the issue",
      "introEn": "For each core question from step 2, write your judgment and brief justification. The tool does not suggest wording."
    },
    {
      "id": 9,
      "key": "constraints",
      "name": "现实约束与责任判断",
      "presentInClass": false,
      "intro": "识别现实约束并做责任判断：约束是什么、当时有何选择、是否减轻责任及理由。可勾选预置提示词或声明本案无相关约束。",
      "prompts": [
        {
          "text": "约束存在是否必然意味着责任减轻？",
          "source": "textbook",
          "textEn": "Does a constraint automatically reduce responsibility?"
        },
        {
          "text": "TODO(PI): 补引导问题",
          "source": "team",
          "textEn": "Instructor placeholder: guided question to be supplied.",
          "noteEnReview": "needs-manual-review"
        }
      ],
      "fields": [
        {
          "key": "constraintJudgments",
          "type": "list",
          "label": "约束条目（三问）",
          "itemSchema": [
            "whatAndWho:textarea",
            "alternatives:textarea",
            "mitigationJudgment:textarea"
          ],
          "labelEn": "Constraint entry (three questions)"
        },
        {
          "key": "presetHints",
          "type": "multiSelect",
          "label": "预置约束提示（可多选可不选）",
          "from": "constraints",
          "labelEn": "Preset constraint prompts (optional)"
        },
        {
          "key": "noRelevantConstraints",
          "type": "checkList",
          "label": "本案声明",
          "options": [
            {
              "id": "none",
              "label": "本案没有相关约束"
            }
          ],
          "labelEn": "Statement for this case"
        }
      ],
      "checks": [
        {
          "id": "threeQuestionsComplete",
          "level": "suggest",
          "refSource": "team"
        },
        {
          "id": "presetOrNone",
          "level": "suggest",
          "refSource": "team"
        }
      ],
      "referenceLevel1": [
        "glossary"
      ],
      "referenceLevel3": {
        "type": "text",
        "source": "textbook",
        "body": "教材对 excusing / mitigating conditions 与「约束的现实性」的说明（正文待 PI 摘录）。",
        "bodyEn": "Textbook explanation for this step (awaiting instructor excerpt in English).",
        "noteEnReview": "needs-manual-review"
      },
      "state": "todo",
      "nameEn": "Identify practical constraints",
      "introEn": "Record practical constraints, feasible alternatives at the time, and whether they affect responsibility."
    },
    {
      "id": 10,
      "key": "avoid",
      "name": "避免问题",
      "presentInClass": false,
      "intro": "列出未来类似情境中应避免的问题或失误模式。",
      "prompts": [
        {
          "text": "至少列出 3 条可操作的「应避免」事项。",
          "source": "textbook",
          "textEn": "List at least three actionable items to avoid similar problems."
        },
        {
          "text": "TODO(PI): 补引导问题",
          "source": "team",
          "textEn": "Instructor placeholder: guided question to be supplied.",
          "noteEnReview": "needs-manual-review"
        }
      ],
      "fields": [
        {
          "key": "avoidItems",
          "type": "list",
          "label": "应避免的问题",
          "min": 3,
          "minSource": "textbook",
          "itemSchema": [
            "text"
          ],
          "labelEn": "Problems to avoid"
        }
      ],
      "checks": [
        {
          "id": "minItems",
          "level": "suggest",
          "refSource": "textbook"
        }
      ],
      "referenceLevel1": [],
      "referenceLevel3": null,
      "state": "todo",
      "nameEn": "Avoid ethical problems",
      "introEn": "Propose preventive actions that could reduce similar ethical risks in the future."
    }
  ];

  window.CASE_DATA = {
    "meta": {
      "id": "fukushima",
      "title": "福岛第一核电站事故",
      "dataVersion": "2.2",
      "dataUpdatedAt": "2026-10-12",
      "builtAt": "2026-10-11",
      "titleEn": "Fukushima Daiichi Nuclear Accident"
    },
    "sources": [
      {
        "id": "src-textbook-appendix-I",
        "title": "Global Engineering Ethics, Appendix I: Principles Reviewed",
        "publisher": "Elsevier",
        "year": 2017,
        "url": "",
        "accessedAt": "",
        "note": "",
        "titleEn": "Global Engineering Ethics, Appendix I: Principles Reviewed"
      },
      {
        "id": "src-001",
        "title": "THE FUKUSHIMA DAIICHI ACCIDENT — REPORT BY THE DIRECTOR GENERAL",
        "publisher": "International Atomic Energy Agency (IAEA)",
        "year": 2015,
        "url": "https://www-pub.iaea.org/MTCD/Publications/PDF/Pub1710-ReportByTheDG-Web.pdf",
        "accessedAt": "2026-10-11",
        "note": "",
        "titleEn": "THE FUKUSHIMA DAIICHI ACCIDENT — REPORT BY THE DIRECTOR GENERAL"
      },
      {
        "id": "src-002",
        "title": "The Fukushima Daiichi Accident — Technical Volume 1/5: Description and Context of the Accident",
        "publisher": "IAEA",
        "year": 2015,
        "url": "https://www-pub.iaea.org/MTCD/Publications/PDF/AdditionalVolumes/P1710/Pub1710-TV1-Web.pdf",
        "accessedAt": "2026-10-11",
        "note": "",
        "titleEn": "The Fukushima Daiichi Accident — Technical Volume 1/5: Description and Context of the Accident"
      },
      {
        "id": "src-003",
        "title": "The Fukushima Daiichi Accident（书目页 STI/PUB/1710）",
        "publisher": "IAEA",
        "year": 2015,
        "url": "https://www.iaea.org/publications/10962/the-fukushima-daiichi-accident",
        "accessedAt": "2026-10-11",
        "note": "仅书目元数据，未取正文——不得作为事实依据",
        "titleEn": "The Fukushima Daiichi Accident (catalog STI/PUB/1710)",
        "noteEn": "Bibliographic metadata only; not used as factual evidence."
      },
      {
        "id": "src-004",
        "title": "The Official Report of the Fukushima Nuclear Accident Independent Investigation Commission（NAIIC 英文摘要版）",
        "publisher": "National Diet of Japan / NAIIC",
        "year": 2012,
        "url": "",
        "accessedAt": "2026-10-11",
        "note": "PI 提供本地 PDF（PI 已存档）",
        "titleEn": "Official Report of the Fukushima Nuclear Accident Independent Investigation Commission (NAIIC summary, English)",
        "noteEn": "Local PDF provided by instructor (archived)."
      },
      {
        "id": "src-005",
        "title": "TEPCO 事故相关附件（120620e0106：地震动评价与历史安全评估档案等）",
        "publisher": "Tokyo Electric Power Company (TEPCO)",
        "year": 2012,
        "url": "",
        "accessedAt": "2026-10-11",
        "note": "PI 提供本地 PDF（PI 已存档）",
        "titleEn": "TEPCO accident-related attachments (120620e0106: seismic evaluation archives, etc.)",
        "noteEn": "Local PDF provided by instructor (archived)."
      }
    ],
    "timeline": [
      {
        "id": "tl-001",
        "date": "2011-03-11",
        "event": "东日本大震灾（Great East Japan Earthquake）发生。",
        "sourceId": "src-001",
        "locator": "Executive Summary",
        "quote": "The Great East Japan Earthquake occurred on 11 March 2011.",
        "confidence": "high",
        "note": "核验：✅",
        "noteEn": "Pack review: ✅",
        "infoKnownBy": [],
        "infoKnownWhen": "",
        "eventEn": "The Great East Japan Earthquake occurred on 11 March 2011."
      },
      {
        "id": "tl-002",
        "date": "2011-03-11",
        "event": "地震震级 9.0；海啸在包括东北海岸在内的沿岸造成多道浪，部分浪高超过十米。",
        "sourceId": "src-001",
        "locator": "Executive Summary",
        "quote": "causing a massive earthquake with a magnitude of 9.0 and a tsunami which struck a wide area of coastal Japan, including the north-eastern coast, where several waves reached heights of more than ten metres.",
        "confidence": "medium",
        "note": "核验：✅；核验⚠️：为全国/东北沿岸浪高表述，**非**厂址 run-up 测点（见 f-mat-011）",
        "noteEn": "Pack review: ✅; caution: wave heights refer to Japan or its northeastern coast, **not** to site-specific run-up measurements (see f-mat-011).",
        "infoKnownBy": [],
        "infoKnownWhen": "",
        "eventEn": "causing a massive earthquake with a magnitude of 9.0 and a tsunami which struck a wide area of coastal Japan, including the north-eastern coast, where several waves reached heights of more than ten metres."
      },
      {
        "id": "tl-003",
        "date": "2011-03-11 14:46 JST",
        "event": "主震发生于 JST 2011-03-11 14:46（星期五）。",
        "sourceId": "src-002",
        "locator": "§1.1.1 Main occurrences",
        "quote": "The Great East Japan Earthquake occurred at 14:46 Japan Standard Time (JST)3 on Friday 11 March 2011, off the eastern coast of Japan.",
        "confidence": "high",
        "note": "核验：✅",
        "noteEn": "Pack review: ✅",
        "infoKnownBy": [],
        "infoKnownWhen": "",
        "eventEn": "The Great East Japan Earthquake occurred at 14:46 Japan Standard Time (JST)3 on Friday 11 March 2011, off the eastern coast of Japan."
      },
      {
        "id": "tl-006",
        "date": "2011-03-11 及之后",
        "dateEn": "2011-03-11 and afterwards",
        "event": "1–3 号机组堆芯过热、燃料熔化，三个 containment vessels 被 breach。",
        "sourceId": "src-001",
        "locator": "Executive Summary",
        "quote": "the reactor cores in Units 1–3 overheated, the nuclear fuel melted and the three containment vessels were breached.",
        "confidence": "medium",
        "note": "核验：✅；具体时刻未获取（Executive Summary 未给出分机组时刻链）",
        "noteEn": "Pack review: ✅; specific times were not obtained. The Executive Summary does not provide a unit-by-unit sequence of times.",
        "infoKnownBy": [],
        "infoKnownWhen": "",
        "eventEn": "the reactor cores in Units 1–3 overheated, the nuclear fuel melted and the three containment vessels were breached."
      },
      {
        "id": "tl-007",
        "date": "2011-03-11 及之后",
        "dateEn": "2011-03-11 and afterwards",
        "event": "1、3、4 号机组 reactor buildings 内发生氢气相关爆炸并造成结构/设备损坏与人员受伤。",
        "sourceId": "src-001",
        "locator": "Executive Summary",
        "quote": "Hydrogen was released from the reactor pressure vessels, leading to explosions inside the reactor buildings in Units 1, 3 and 4 that damaged structures and equipment and injured personnel.",
        "confidence": "medium",
        "note": "核验：✅；Unit 1 氢爆时刻见 TV1 §1.3.2（2011-03-12 15:36）；3、4 号具体时刻未获取",
        "noteEn": "Pack review: ✅; see TV1 §1.3.2 for the Unit 1 hydrogen explosion at 15:36 on 2011-03-12. Specific times for Units 3 and 4 were not obtained.",
        "infoKnownBy": [],
        "infoKnownWhen": "",
        "eventEn": "Hydrogen was released from the reactor pressure vessels, leading to explosions inside the reactor buildings in Units 1, 3 and 4 that damaged structures and equipment and injured personnel."
      },
      {
        "id": "tl-008",
        "date": "2011-03-11 及之后",
        "dateEn": "2011-03-11 and afterwards",
        "event": "放射性物质释入大气并沉积于陆地与海洋，亦有直接向海释放。",
        "sourceId": "src-001",
        "locator": "Executive Summary",
        "quote": "Radionuclides were released from the plant to the atmosphere and were deposited on land and on the ocean. There were also direct releases into the sea.",
        "confidence": "medium",
        "note": "核验：✅；具体时刻未获取",
        "noteEn": "Pack review: ✅; specific times were not obtained.",
        "infoKnownBy": [],
        "infoKnownWhen": "",
        "eventEn": "Radionuclides were released from the plant to the atmosphere and were deposited on land and on the ocean. There were also direct releases into the sea."
      },
      {
        "id": "tl-009",
        "date": "2011-03-11 及之后",
        "dateEn": "2011-03-11 and afterwards",
        "event": "厂址半径 20 km 及部分指定区域人员被疏散；20–30 km 先 shelter 后建议自愿撤离。",
        "sourceId": "src-001",
        "locator": "Executive Summary",
        "quote": "People within a radius of 20 km of the site and in other designated areas were evacuated, and those within a radius of 20–30 km were instructed to shelter before later being advised to voluntarily evacuate.",
        "confidence": "high",
        "note": "核验：✅；分阶段扩展见 DG「Emergency preparedness」段（如 2 km→20 km）",
        "noteEn": "Pack review: ✅; see the DG “Emergency preparedness” paragraph for staged expansion, such as 2 km to 20 km.",
        "infoKnownBy": [],
        "infoKnownWhen": "",
        "eventEn": "People within a radius of 20 km of the site and in other designated areas were evacuated, and those within a radius of 20–30 km were instructed to shelter before later being advised to voluntarily evacuate."
      },
      {
        "id": "tl-011",
        "date": "2011-03-11 及之后",
        "dateEn": "2011-03-11 and afterwards",
        "event": "1–5 号机组经历长时间全厂断电（SBO）；1、2 号超过 9 天，3、4 号超过 14 天。",
        "sourceId": "src-002",
        "locator": "§1.1 Summary of the accident",
        "quote": "Units 1–5 of the Fukushima Daiichi NPP experienced extended station blackout (SBO) events, which exceeded nine days in Units 1 and 2, and 14 days in Units 3 and 4.",
        "confidence": "high",
        "note": "核验：✅；Unit 1：15:37 失 AC、15:42 宣布 SBO（§1.3.2）；结束日未在本表展开",
        "noteEn": "Pack review: ✅; Unit 1 lost AC power at 15:37 and station blackout was declared at 15:42 (§1.3.2). End dates are not detailed in this table.",
        "infoKnownBy": [],
        "infoKnownWhen": "",
        "eventEn": "Units 1–5 of the Fukushima Daiichi NPP experienced extended station blackout (SBO) events, which exceeded nine days in Units 1 and 2, and 14 days in Units 3 and 4."
      },
      {
        "id": "tl-012",
        "date": "2011-03-11 及之后",
        "dateEn": "2011-03-11 and afterwards",
        "event": "1–3 号机组 RPV 最终 breach，放射性物质经可控 vent 或 confinement 失效释出。",
        "sourceId": "src-002",
        "locator": "§1.1 Summary of the accident",
        "quote": "The reactor pressure vessels (RPVs) that enclose the reactor cores were eventually breached in those units, and radioactive material escaped from the reactors. The radioactive material confined in the primary containment vessels (PCVs) was further released directly to the environment either in a controlled manner, i.e. by venting of the reactors’ PCVs, or in an uncontrolled manner upon damage and failure of the confinement structures.",
        "confidence": "medium",
        "note": "核验：✅；具体时刻未获取",
        "noteEn": "Pack review: ✅; specific times were not obtained.",
        "infoKnownBy": [],
        "infoKnownWhen": "",
        "eventEn": "The reactor pressure vessels (RPVs) that enclose the reactor cores were eventually breached in those units, and radioactive material escaped from the reactors. The radioactive material confined in the primary containment vessels (PCVs) was further released directly to the environment either in a controlled manner, i.e. by venting of the reactors’ PCVs, or in an uncontrolled manner upon damage and failure of the confinement structures."
      },
      {
        "id": "tl-013",
        "date": "2011-03-11 及之后",
        "dateEn": "2011-03-11 and afterwards",
        "event": "为降低照射，20 km 内及周边指定区域疏散，食品与饮用水分销/消费受限。",
        "sourceId": "src-002",
        "locator": "§1.1 Summary of the accident",
        "quote": "In order to reduce radiation exposures, people within a radius of 20 km of the site, as well as other specified areas, were evacuated, and restrictions were placed on the distribution and consumption of food and drinking water.",
        "confidence": "medium",
        "note": "核验：✅；具体时刻未获取",
        "noteEn": "Pack review: ✅; specific times were not obtained.",
        "infoKnownBy": [],
        "infoKnownWhen": "",
        "eventEn": "In order to reduce radiation exposures, people within a radius of 20 km of the site, as well as other specified areas, were evacuated, and restrictions were placed on the distribution and consumption of food and drinking water."
      },
      {
        "id": "tl-016",
        "date": "2011-03-11 15:37",
        "event": "NAIIC 事故时间轴标注海啸（峰值）到达时刻。",
        "sourceId": "src-004",
        "locator": "事故时间轴（Conclusions 前时间轴图）",
        "locatorEn": "Accident timeline (figure before Conclusions)",
        "quote": "15:37 Tsunami (peak of waves)",
        "confidence": "medium",
        "note": "核验：未做（NAIIC/TEPCO 轮）；与 TV1 §1.1.2.5 第二波 15:36–15:37 一致口径",
        "noteEn": "Pack review: not performed (NAIIC/TEPCO round). Consistent with the second wave at 15:36–15:37 in TV1 §1.1.2.5.",
        "infoKnownBy": [],
        "infoKnownWhen": "",
        "eventEn": "15:37 Tsunami (peak of waves)"
      },
      {
        "id": "tl-017",
        "date": "2011-03-12 15:36",
        "event": "Unit 1 reactor building 发生爆炸（服务楼层）。",
        "sourceId": "src-002",
        "locator": "§1.3.2 Unit 1 sequence",
        "quote": "At 15:36 on 12 March 2011, an explosion occurred on the service floor of the Unit 1 RB",
        "confidence": "medium",
        "note": "核验：未做（NAIIC/TEPCO 轮）；补 tl-007 备注中 Unit 1 氢爆时刻",
        "noteEn": "Pack review: not performed (NAIIC/TEPCO round). Adds the Unit 1 hydrogen-explosion time noted in tl-007.",
        "infoKnownBy": [],
        "infoKnownWhen": "",
        "eventEn": "At 15:36 on 12 March 2011, an explosion occurred on the service floor of the Unit 1 RB"
      },
      {
        "id": "tl-018",
        "date": "2009-07-15",
        "event": "NISA 完成对代表电厂抗震 interim report 的 validity 审查。",
        "sourceId": "src-005",
        "locator": "Attachment 3-14 Main developments regarding the seismic back-check",
        "quote": "July 15, 2009 Review completed",
        "confidence": "medium",
        "note": "核验：未做（NAIIC/TEPCO 轮）；耐震回溯检查时间线",
        "noteEn": "Pack review: not performed (NAIIC/TEPCO round). Seismic backcheck timeline.",
        "infoKnownBy": [],
        "infoKnownWhen": "",
        "eventEn": "July 15, 2009 Review completed"
      },
      {
        "id": "tl-019",
        "date": "2008-10 ~ 2008-12",
        "event": "TEPCO 接收 Jogan 海啸研究并进行试算、协调修订海啸评估方法。",
        "sourceId": "src-005",
        "locator": "Attachment 3-15 Principle Chronology of Tsunami Safety Assessment",
        "quote": "Receive Jogan Tsunami research paper in progress from Dr. Satake",
        "confidence": "medium",
        "note": "核验：未做（NAIIC/TEPCO 轮）；同页含 Implement trial calculations on Jogan Tsunami（2008-12）",
        "infoKnownBy": [],
        "infoKnownWhen": "",
        "eventEn": "Receive Jogan Tsunami research paper in progress from Dr. Satake"
      },
      {
        "id": "tl-020",
        "date": "2011-03-11 21:23",
        "event": "下达 3 km 疏散令时，仅约 20% 厂址所在町居民知晓事故。",
        "sourceId": "src-004",
        "locator": "Conclusions — Evacuation issues",
        "quote": "only 20 percent of the residents of the town hosting the plant knew about the accident when evacuation from the 3km zone was ordered at 21:23 on the evening of March 11.",
        "confidence": "medium",
        "note": "核验：未做（NAIIC/TEPCO 轮）",
        "infoKnownBy": [],
        "infoKnownWhen": "",
        "eventEn": "only 20 percent of the residents of the town hosting the plant knew about the accident when evacuation from the 3km zone was ordered at 21:23 on the evening of March 11."
      }
    ],
    "facts": [
      {
        "id": "f-mat-001",
        "text": "福岛第一核电厂址共有六台核电机组（Units 1–6）。",
        "categories": [
          "material"
        ],
        "sourceId": "src-002",
        "locator": "§1.1.2.2 Plant status",
        "quote": "The Fukushima Daiichi NPP (Fig. 1.1–3), which comprises six units [12] with boiling water reactors (BWRs) (see Box 1.1–1), was located 180 km from the epicentre.",
        "confidence": "high",
        "note": "核验：✅",
        "textEn": "The Fukushima Daiichi NPP (Fig. 1.1–3), which comprises six units with boiling water reactors (BWRs) (see Box 1.1–1), was located 180 km from the epicentre.",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-mat-002",
        "text": "2011-03-11 海啸淹没厂内主、备电源与最终热阱等设备/结构，**六台机组**均受影响。",
        "categories": [
          "material"
        ],
        "sourceId": "src-002",
        "locator": "§1.1 Summary of the accident",
        "quote": "They flooded the primary and backup power systems and equipment, as well as the ultimate heat sink systems and structures, of all six units on the site.",
        "confidence": "high",
        "note": "核验：✅；并入原 tl-010 信息",
        "textEn": "They flooded the primary and backup power systems and equipment, as well as the ultimate heat sink systems and structures, of all six units on the site.",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-mat-003",
        "text": "地震在 tsunami 之前已造成场外输电系统损坏。",
        "categories": [
          "material"
        ],
        "sourceId": "src-002",
        "locator": "§1.1 Summary of the accident",
        "quote": "Compounding the off-site power loss that occurred before the tsunami due to the earthquake damage to the transmission system, the flooding caused the loss of on-site power sources (and/or on-site power distribution systems).",
        "confidence": "high",
        "note": "核验：✅",
        "textEn": "Compounding the off-site power loss that occurred before the tsunami due to the earthquake damage to the transmission system, the flooding caused the loss of on-site power sources (and/or on-site power distribution systems).",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-mat-004",
        "text": "1–3 号机组因长时间失去电力与排热，燃料过热并熔化，RPV 最终 breach。",
        "categories": [
          "material"
        ],
        "sourceId": "src-002",
        "locator": "§1.1 Summary of the accident",
        "quote": "The reactors of Units 1, 2 and 3 suffered damage as the fuel overheated and melted. The reactor pressure vessels (RPVs) that enclose the reactor cores were eventually breached in those units",
        "confidence": "high",
        "note": "核验：✅",
        "textEn": "The reactors of Units 1, 2 and 3 suffered damage as the fuel overheated and melted. The reactor pressure vessels (RPVs) that enclose the reactor cores were eventually breached in those units",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-mat-005",
        "text": "1、3、4 号机组 reactor buildings 内发生与氢气释放相关的爆炸。",
        "categories": [
          "material"
        ],
        "sourceId": "src-001",
        "locator": "Executive Summary",
        "quote": "leading to explosions inside the reactor buildings in Units 1, 3 and 4 that damaged structures and equipment and injured personnel.",
        "confidence": "medium",
        "note": "核验：✅；核验⚠️：引文为 Executive Summary **句中片段**（非独立完整句）",
        "textEn": "leading to explosions inside the reactor buildings in Units 1, 3 and 4 that damaged structures and equipment and injured personnel.",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-mat-006",
        "text": "设计中的地震/海啸 hazard 主要依据日本历史地震记录与近期海啸证据评估。",
        "categories": [
          "material"
        ],
        "sourceId": "src-001",
        "locator": "NUCLEAR SAFETY CONSIDERATIONS — Vulnerability",
        "quote": "The seismic hazard and tsunami waves considered in the original design were evaluated mainly on the basis of historical seismic records and evidence of recent tsunamis in Japan.",
        "confidence": "high",
        "note": "核验：✅；非 Executive Summary 小节标题",
        "textEn": "The seismic hazard and tsunami waves considered in the original design were evaluated mainly on the basis of historical seismic records and evidence of recent tsunamis in Japan.",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-mat-007",
        "text": "记录到的 ground motions 与 tsunami 波高均显著超过设计基准假设。",
        "categories": [
          "material"
        ],
        "sourceId": "src-001",
        "locator": "NUCLEAR SAFETY CONSIDERATIONS — Vulnerability",
        "quote": "Both the recorded ground motions and the heights of the tsunami waves significantly exceeded the assumptions of hazards that had been made when the plant was originally designed.",
        "confidence": "medium",
        "note": "核验：✅；核验⚠️：引文为定性表述，**未给出**具体 ground motion / 海啸数值",
        "textEn": "Both the recorded ground motions and the heights of the tsunami waves significantly exceeded the assumptions of hazards that had been made when the plant was originally designed.",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-mat-009",
        "text": "2 号机组 containment venting 未成功，containment 失效并造成放射性释放。",
        "categories": [
          "material"
        ],
        "sourceId": "src-001",
        "locator": "NUCLEAR SAFETY CONSIDERATIONS — Fundamental safety functions",
        "quote": "Containment venting for Unit 2 was not successful, and the containment failed, resulting in radioactive releases.",
        "confidence": "high",
        "note": "核验：✅",
        "textEn": "Containment venting for Unit 2 was not successful, and the containment failed, resulting in radioactive releases.",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-mat-010",
        "text": "原始 EP 设计基准最高潮位对应海啸高度为 OP +3.122 m。",
        "categories": [
          "material"
        ],
        "sourceId": "src-002",
        "locator": "§1.2.5.6 Oceanography；Table 1.2–3",
        "quote": "This gave a design basis tsunami height of 3.122 m above the OP level.",
        "confidence": "high",
        "note": "核验：✅；OP = Onahama Port 潮位基准",
        "textEn": "This gave a design basis tsunami height of 3.122 m above the OP level.",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-mat-011",
        "text": "防波堤/海堤按最大海啸 5.5 m 设计；第二波 run-up 14–15 m 淹没厂址。",
        "categories": [
          "material"
        ],
        "sourceId": "src-002",
        "locator": "§1.1.2.5 Tsunami and station blackout",
        "quote": "the tsunami barrier seawalls, the breakwater, that were designed to protect against a maximum tsunami height of 5.5 m [15]. However, about 10 minutes after the first wave (between 15:36 and 15:37), the second and largest tsunami wave, with a run-up height of 14–15 m, reached the plant.",
        "confidence": "medium",
        "note": "核验：⚠️ PDF 文本层在 “maximum” 与 “tsunami height of 5.5 m” 之间插入脚注 12，草稿引文作连续句；且 15:36–15:37 为 3/11 第二波海啸，非氢爆",
        "textEn": "the tsunami barrier seawalls, the breakwater, that were designed to protect against a maximum tsunami height of 5.5 m . However, about 10 minutes after the first wave (between 15:36 and 15:37), the second and largest tsunami wave, with a run-up height of 14–15 m, reached the plant.",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-mat-012",
        "text": "2002 年 JSCE 方法重评海啸高度为 OP +5.7 m，并采取抬高泵位等对策。",
        "categories": [
          "material"
        ],
        "sourceId": "src-002",
        "locator": "Table 1.2–4",
        "quote": "Japan Society of Civil Engineers (JSCE) assessment method OP +5.7 m Raise elevation of pumps",
        "confidence": "high",
        "note": "核验：✅；同表另有 Make buildings watertight",
        "textEn": "Japan Society of Civil Engineers (JSCE) assessment method OP +5.7 m Raise elevation of pumps",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-mat-013",
        "text": "1966 年许可基准引用的观测海啸来自 1960 年智利地震海啸。",
        "categories": [
          "material"
        ],
        "sourceId": "src-002",
        "locator": "Table 1.2–4",
        "quote": "Establishment Permit OP +3.122 m (observed height resulting from Chilean tsunami in 1960)",
        "confidence": "high",
        "note": "核验：✅；Table 1.2–3 Remarks 亦有 24 May 1960 表述",
        "textEn": "Establishment Permit OP +3.122 m (observed height resulting from Chilean tsunami in 1960)",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-mat-014",
        "text": "Unit 1：15:37 失全部 AC，15:42 宣布 station blackout；IC 在 tsunami 前被运行人员停止后堆芯冷却丧失。",
        "categories": [
          "material"
        ],
        "sourceId": "src-002",
        "locator": "§1.3.2；§1.1.3.3",
        "quote": "All AC power was lost at 15:37 … TEPCO declared a station blackout at 15:42. … core cooling at Unit 1 was lost when the IC was stopped by the operators just before the tsunami",
        "confidence": "medium",
        "note": "核验：⚠️ 草稿引文含 “…” 合并 §1.3.2 与 §1.1.3.3，非单一连续逐字段落；15:42 为 Unit 1 SBO 宣布（§1.3.2）",
        "textEn": "All AC power was lost at 15:37 … TEPCO declared a station blackout at 15:42. … core cooling at Unit 1 was lost when the IC was stopped by the operators just before the tsunami",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-mat-015",
        "text": "2009 年 bathymetric 重评给出 OP +6.1 m（对策含抬高泵位）。",
        "categories": [
          "material"
        ],
        "sourceId": "src-002",
        "locator": "Table 1.2–4",
        "quote": "Latest bathymetric and tidal data on the basis of the JSCE assessment method OP +6.1 m Raise elevation of pumps",
        "confidence": "high",
        "note": "核验：✅；与 f-mat-011 遭遇 run-up 14–15 m 对照；未写释放量",
        "textEn": "Latest bathymetric and tidal data on the basis of the JSCE assessment method OP +6.1 m Raise elevation of pumps",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-mat-016",
        "text": "TEPCO 档案：福岛第一 JSCE 评估最大海啸高度 5.7 m（后 6.1 m），应急海水泵安装高度 4 m。",
        "categories": [
          "material"
        ],
        "sourceId": "src-005",
        "locator": "Attachment 4-4 Status of TEPCO efforts",
        "quote": "the maximum tsunami height from the JSCE assessment was 5.7m (finally 6.1m), and the emergency seawater pump installation height was 4m.",
        "confidence": "medium",
        "note": "核验：未做（NAIIC/TEPCO 轮）；**TEPCO 口径**；与 IAEA run-up 14–15 m 不同指标",
        "textEn": "the maximum tsunami height from the JSCE assessment was 5.7m (finally 6.1m), and the emergency seawater pump installation height was 4m.",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-mat-017",
        "text": "TEPCO 时间线：2009 年 4 月安全评价给出福岛第一水位 O.P.+5.4~6.1 m。",
        "categories": [
          "material"
        ],
        "sourceId": "src-005",
        "locator": "Attachment 3-15 chronology",
        "quote": "Water level : O.P.+5.4~6.1m",
        "confidence": "medium",
        "note": "核验：未做（NAIIC/TEPCO 轮）",
        "textEn": "Water level : O.P.+5.4~6.1m",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-mat-018",
        "text": "1966–1972 建设许可基准引用智利地震，潮位 O.P.+3.122 m。",
        "categories": [
          "material"
        ],
        "sourceId": "src-005",
        "locator": "Attachment 3-15",
        "quote": "based on the Chilean earthquake, -- Water level: O.P. +3.122m",
        "confidence": "medium",
        "note": "核验：未做（NAIIC/TEPCO 轮）",
        "textEn": "based on the Chilean earthquake, -- Water level: O.P. +3.122m",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-mat-019",
        "text": "TEPCO 地震动评价结论：基岩面地震动与设计基准 Ss **约同量级**。",
        "categories": [
          "material"
        ],
        "sourceId": "src-005",
        "locator": "Attachment 3-3 (2/20) §3 Conclusion",
        "quote": "the free surface of the base stratum seismic motion and the design basis seismic ground motion Ss are approximately the same level.",
        "confidence": "medium",
        "note": "核验：未做（NAIIC/TEPCO 轮）；**TEPCO 2012 附件口径**",
        "textEn": "the free surface of the base stratum seismic motion and the design basis seismic ground motion Ss are approximately the same level.",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-mat-020",
        "text": "NAIIC：福岛第一记录地震动超过新指引假设，且未到位适当抗震加固。",
        "categories": [
          "material"
        ],
        "sourceId": "src-004",
        "locator": "Summary of Findings — The lack of tsunami countermeasures 前段",
        "locatorEn": "Summary of Findings — paragraph before The lack of tsunami countermeasures",
        "quote": "the recorded seismic motion at Fukushima Daiichi exceeded the assumption of the new guideline. It is clear that appropriate anti-seismic reinforcements were not in place at the time of the March 11 earthquake.",
        "confidence": "medium",
        "note": "核验：未做（NAIIC/TEPCO 轮）",
        "textEn": "the recorded seismic motion at Fukushima Daiichi exceeded the assumption of the new guideline. It is clear that appropriate anti-seismic reinforcements were not in place at the time of the March 11 earthquake.",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-ind-001",
        "text": "现场人员需在未按培训场景准备的情况下即兴应对，且常缺合适设备。",
        "categories": [
          "individual"
        ],
        "sourceId": "src-001",
        "locator": "Foreword",
        "quote": "They had to improvise a response in circumstances for which they had not been trained, often lacking appropriate equipment.",
        "confidence": "high",
        "note": "核验：✅",
        "textEn": "They had to improvise a response in circumstances for which they had not been trained, often lacking appropriate equipment.",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-ind-002",
        "text": "尽管运营商人员努力维持控制，1–3 号机组仍发生堆芯损伤。",
        "categories": [
          "individual"
        ],
        "sourceId": "src-001",
        "locator": "Executive Summary",
        "quote": "Despite the efforts of the operators at the Fukushima Daiichi nuclear power plant to maintain control, the reactor cores in Units 1–3 overheated, the nuclear fuel melted and the three containment vessels were breached.",
        "confidence": "high",
        "note": "核验：✅",
        "textEn": "Despite the efforts of the operators at the Fukushima Daiichi nuclear power plant to maintain control, the reactor cores in Units 1–3 overheated, the nuclear fuel melted and the three containment vessels were breached.",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-ind-003",
        "text": "氢气爆炸造成 structures and equipment 损坏并造成 personnel injured。",
        "categories": [
          "individual"
        ],
        "sourceId": "src-001",
        "locator": "Executive Summary",
        "quote": "leading to explosions inside the reactor buildings in Units 1, 3 and 4 that damaged structures and equipment and injured personnel.",
        "confidence": "medium",
        "note": "核验：✅；核验⚠️：句中片段引文；未给出具体人数",
        "textEn": "leading to explosions inside the reactor buildings in Units 1, 3 and 4 that damaged structures and equipment and injured personnel.",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-ind-004",
        "text": "地震、海啸后果及辐射水平升高使 on-site response 极其困难。",
        "categories": [
          "individual"
        ],
        "sourceId": "src-001",
        "locator": "EMERGENCY PREPAREDNESS AND RESPONSE",
        "quote": "The consequences of the earthquake and tsunami, and increased radiation levels, made the on-site response extremely difficult.",
        "confidence": "high",
        "note": "核验：✅",
        "textEn": "The consequences of the earthquake and tsunami, and increased radiation levels, made the on-site response extremely difficult.",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-ind-005",
        "text": "疏散因地震/tsunami 破坏及通信交通问题而存在困难。",
        "categories": [
          "individual"
        ],
        "sourceId": "src-001",
        "locator": "EMERGENCY PREPAREDNESS AND RESPONSE — Protecting the public",
        "quote": "There were difficulties in evacuation due to the damage caused by the earthquake and tsunami and the resulting communication and transportation problems.",
        "confidence": "high",
        "note": "核验：✅",
        "textEn": "There were difficulties in evacuation due to the damage caused by the earthquake and tsunami and the resulting communication and transportation problems.",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-ind-006",
        "text": "事故造成现场工作人员与周边公众受到辐射照射。",
        "categories": [
          "individual"
        ],
        "sourceId": "src-002",
        "locator": "§1.1 Summary of the accident",
        "quote": "The radioactive releases resulted in radiological exposure of the workers at the site and the general public residing in the surrounding communities",
        "confidence": "high",
        "note": "核验：✅",
        "textEn": "The radioactive releases resulted in radiological exposure of the workers at the site and the general public residing in the surrounding communities",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-ind-007",
        "text": "MCR 人员经厂内广播发布海啸预警；初报 3–4 m，低标高人员撤离。",
        "categories": [
          "individual"
        ],
        "sourceId": "src-002",
        "locator": "§1.2.6（人员响应段）",
        "locatorEn": "§1.2.6 (personnel response paragraph)",
        "quote": "Following the earthquake, a tsunami warning was communicated by the MCR staff via the plant internal announcement system. The initial prediction for the tsunami was 3–4 m in height76, thus evacuation and reassembly instructions were provided mainly for personnel who were working at lower elevations.",
        "confidence": "medium",
        "note": "核验：✅；核验⚠️：PDF 文本层为 `height76`（脚注号粘连）；§1.2.6 人员响应段",
        "textEn": "Following the earthquake, a tsunami warning was communicated by the MCR staff via the plant internal announcement system. The initial prediction for the tsunami was 3–4 m in height76, thus evacuation and reassembly instructions were provided mainly for personnel who were working at lower elevations.",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-ind-008",
        "text": "Unit 1 运行人员在 15:03 手动停止两套 IC，以避免超过 55°C/h 冷却限制。",
        "categories": [
          "individual"
        ],
        "sourceId": "src-002",
        "locator": "§1.3.2 Unit 1 sequence",
        "quote": "The operators manually stopped both loops of the IC systems at 15:03, in order to prevent the cool down limit of 55°C/h, set by the plant’s operational limits and conditions (OLCs), from being exceeded.",
        "confidence": "medium",
        "note": "核验：⚠️ 草稿以 “The operators manually…” 开头；PDF 连续文本为 “…that the operators manually…”（无句首 The operators）",
        "textEn": "The operators manually stopped both loops of the IC systems at 15:03, in order to prevent the cool down limit of 55°C/h, set by the plant’s operational limits and conditions (OLCs), from being exceeded.",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-ind-009",
        "text": "Site Superintendent 于 00:06 下令准备对 Unit 1（及 Unit 2）vent。",
        "categories": [
          "individual"
        ],
        "sourceId": "src-002",
        "locator": "§1.3.2（2011-03-12）",
        "quote": "At 00:06, the Site Superintendent ordered preparations for venting of Unit 1 (and Unit 2) and a notice was issued at 00:49 identifying an ‘abnormal rise in primary containment vessel pressure’",
        "confidence": "high",
        "note": "核验：✅；角色称谓保留英文",
        "textEn": "At 00:06, the Site Superintendent ordered preparations for venting of Unit 1 (and Unit 2) and a notice was issued at 00:49 identifying an ‘abnormal rise in primary containment vessel pressure’",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-ind-010",
        "text": "运行人员因各类电源丧失时序不明，无法确知 IC 隔离阀位置。",
        "categories": [
          "individual"
        ],
        "sourceId": "src-002",
        "locator": "§1.3.2 脚注 26",
        "locatorEn": "§1.3.2, footnote 26",
        "quote": "The valve positions were not clear to the operators owing to the uncertain timing and sequence of each type of power loss that would determine the operation of isolation condenser status of isolation valves.",
        "confidence": "high",
        "note": "核验：✅；信息不足的具体描述",
        "textEn": "The valve positions were not clear to the operators owing to the uncertain timing and sequence of each type of power loss that would determine the operation of isolation condenser status of isolation valves.",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-ind-011",
        "text": "失去电力后，现场须在缺少有效工具与手册的情况下当场决策。",
        "categories": [
          "individual"
        ],
        "sourceId": "src-004",
        "locator": "第 14 页事故应对叙述",
        "locatorEn": "Page 14, accident-response account",
        "quote": "The decisions and responses to the accident had to be made on the spot by operational staff at the site, absent valid tools and manuals.",
        "confidence": "medium",
        "note": "核验：未做（NAIIC/TEPCO 轮）",
        "textEn": "The decisions and responses to the accident had to be made on the spot by operational staff at the site, absent valid tools and manuals.",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-ind-012",
        "text": "首相（Prime Minister）亲赴现场指挥堆芯受损处置人员。",
        "categories": [
          "individual"
        ],
        "sourceId": "src-004",
        "locator": "Conclusions — crisis management",
        "quote": "The Prime Minister made his way to the site to direct the workers who were dealing with the damaged core.",
        "confidence": "medium",
        "note": "核验：未做（NAIIC/TEPCO 轮）；NAIIC 称此为 unprecedented direct intervention",
        "textEn": "The Prime Minister made his way to the site to direct the workers who were dealing with the damaged core.",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-ind-013",
        "text": "10 km 内多数居民直至 2011-03-12 05:44 发布撤离令时才得知事故。",
        "categories": [
          "individual"
        ],
        "sourceId": "src-004",
        "locator": "Conclusions — Evacuation issues",
        "quote": "Most residents within 10km of the plant learned about the accident when the evacuation order was issued at 5:44 on March 12",
        "confidence": "medium",
        "note": "核验：未做（NAIIC/TEPCO 轮）",
        "textEn": "Most residents within 10km of the plant learned about the accident when the evacuation order was issued at 5:44 on March 12",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-ind-014",
        "text": "NAIIC 时间轴：Unit 1 于 19:04 开始海水注入（图表标注）。",
        "categories": [
          "individual"
        ],
        "sourceId": "src-004",
        "locator": "事故时间轴（Unit 1 列）",
        "locatorEn": "Accident timeline (Unit 1 column)",
        "quote": "19:04 Start of seawater injection",
        "confidence": "medium",
        "note": "核验：未做（NAIIC/TEPCO 轮）；图表短语，非叙事句",
        "textEn": "19:04 Start of seawater injection",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-ind-015",
        "text": "vent 决策未确认传达至 METI 高层或官邸（Kantei）。",
        "categories": [
          "individual"
        ],
        "sourceId": "src-004",
        "locator": "Conclusions",
        "quote": "But there is no confirmation that the venting decision was conveyed to senior members of METI, or to the Kantei.",
        "confidence": "medium",
        "note": "核验：未做（NAIIC/TEPCO 轮）",
        "textEn": "But there is no confirmation that the venting decision was conveyed to senior members of METI, or to the Kantei.",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-org-001",
        "text": "福岛第一核电厂由 Tokyo Electric Power Company（TEPCO）运营。",
        "categories": [
          "organization"
        ],
        "sourceId": "src-001",
        "locator": "Executive Summary",
        "quote": "At the Fukushima Daiichi nuclear power plant, operated by the Tokyo Electric Power Company (TEPCO), the earthquake caused damage to the electric power supply lines to the site",
        "confidence": "high",
        "note": "核验：✅",
        "textEn": "At the Fukushima Daiichi nuclear power plant, operated by the Tokyo Electric Power Company (TEPCO), the earthquake caused damage to the electric power supply lines to the site",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-org-003",
        "text": "东北沿岸五处 NPP 场址：Higashidori、Onagawa、Fukushima Daiichi、Fukushima Daini、Tokai Daini。",
        "categories": [
          "organization"
        ],
        "sourceId": "src-002",
        "locator": "§1.1.1 Main occurrences",
        "quote": "including five NPP sites along Japan’s north-eastern coast: Higashidori, Onagawa, Fukushima Daiichi, Fukushima Daini and Tokai Daini.",
        "confidence": "high",
        "note": "核验：✅",
        "textEn": "including five NPP sites along Japan’s north-eastern coast: Higashidori, Onagawa, Fukushima Daiichi, Fukushima Daini and Tokai Daini.",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-org-004",
        "text": "除福岛第一外，其余受影响场址的运行机组均安全 shut down。",
        "categories": [
          "organization"
        ],
        "sourceId": "src-001",
        "locator": "Executive Summary",
        "quote": "The four other nuclear power plants3 along the coast were also affected to different degrees by the earthquake and tsunami. However, all operating reactor units at these plants were safely shut down.",
        "confidence": "high",
        "note": "核验：✅；脚注 3 列出场址名称",
        "textEn": "The four other nuclear power plants3 along the coast were also affected to different degrees by the earthquake and tsunami. However, all operating reactor units at these plants were safely shut down.",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-org-008",
        "text": "报告编写时（2015 Foreword）逾 10 万人因释放而撤离，许多人仍无法返家。",
        "categories": [
          "organization"
        ],
        "sourceId": "src-001",
        "locator": "Foreword",
        "quote": "More than 100 000 people were evacuated because of the release of radionuclides to the environment. At the time of writing, in 2015, many of them were still unable to return to their homes.",
        "confidence": "high",
        "note": "核验：✅",
        "textEn": "More than 100 000 people were evacuated because of the release of radionuclides to the environment. At the time of writing, in 2015, many of them were still unable to return to their homes.",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-org-009",
        "text": "运行方安全管理活动受 NISA 审查批准的安全管理 programme 约束；NISA 按 programme 做季度检查。",
        "categories": [
          "organization"
        ],
        "sourceId": "src-002",
        "locator": "§1.2.2.9 Inspections",
        "quote": "The operators’ safety management activities were governed by the operational safety programme that NISA reviewed and approved. NISA conducted quarterly operational safety inspections to check the operators’ compliance with the programme.",
        "confidence": "high",
        "note": "核验：✅；事故前监管—运营商关系",
        "textEn": "The operators’ safety management activities were governed by the operational safety programme that NISA reviewed and approved. NISA conducted quarterly operational safety inspections to check the operators’ compliance with the programme.",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-org-010",
        "text": "2006 指南修订后 NISA 要求 licensees 做 seismic/tsunami「backcheck」；TEPCO 启动重评但在事故前**未完成**。",
        "categories": [
          "organization"
        ],
        "sourceId": "src-002",
        "locator": "§1.2.2.8 Requirements for backfitting",
        "quote": "After the 2006 revision of this guide, NISA requested licensees to conduct a ‘backcheck’ of seismic and tsunami hazards. TEPCO started the re-evaluation but had not finished its ‘backcheck’ before the accident at the Fukushima Daiichi NPP.",
        "confidence": "high",
        "note": "核验：✅；内部评估采纳/完成度事实",
        "textEn": "After the 2006 revision of this guide, NISA requested licensees to conduct a ‘backcheck’ of seismic and tsunami hazards. TEPCO started the re-evaluation but had not finished its ‘backcheck’ before the accident at the Fukushima Daiichi NPP.",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-org-011",
        "text": "事故前运营商用 2002 共识方法重评海啸，数值高于原设计并采取部分补偿措施，但事故时仍不足。",
        "categories": [
          "organization"
        ],
        "sourceId": "src-001",
        "locator": "NUCLEAR SAFETY CONSIDERATIONS — Vulnerability",
        "quote": "Before the accident, the operator had conducted some reassessments of extreme tsunami flood levels, using a consensus based methodology developed in Japan in 2002, which had resulted in values higher than the original design basis estimates. Based on the results, some compensatory measures were taken, but they proved to be insufficient at the time of the accident.",
        "confidence": "high",
        "note": "核验：✅",
        "textEn": "Before the accident, the operator had conducted some reassessments of extreme tsunami flood levels, using a consensus based methodology developed in Japan in 2002, which had resulted in values higher than the original design basis estimates. Based on the results, some compensatory measures were taken, but they proved to be insufficient at the time of the accident.",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-org-012",
        "text": "NAIIC 结论：事故系政府、监管与 TEPCO **共谋（collusion）**及治理缺失所致。",
        "categories": [
          "organization"
        ],
        "sourceId": "src-004",
        "locator": "Conclusions — A “manmade” disaster",
        "quote": "The TEPCO Fukushima Nuclear Power Plant accident was the result of collusion between the government, the regulators and TEPCO, and the lack of governance by said parties.",
        "confidence": "medium",
        "note": "核验：未做（NAIIC/TEPCO 轮）",
        "textEn": "The TEPCO Fukushima Nuclear Power Plant accident was the result of collusion between the government, the regulators and TEPCO, and the lack of governance by said parties.",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-org-013",
        "text": "NISA 隶属 METI，而 METI 同时推动核电发展。",
        "categories": [
          "organization"
        ],
        "sourceId": "src-004",
        "locator": "Conclusions（Earthquake damage 段）",
        "locatorEn": "Conclusions (Earthquake damage paragraph)",
        "quote": "NISA was created as part of the Ministry of Economy, Trade & Industry (METI), an organization that has been actively promoting nuclear power.",
        "confidence": "medium",
        "note": "核验：未做（NAIIC/TEPCO 轮）",
        "textEn": "NISA was created as part of the Ministry of Economy, Trade & Industry (METI), an organization that has been actively promoting nuclear power.",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-org-014",
        "text": "NISA 曾告知运营商无需考虑 SBO，并要求其撰写“无需考虑”的理由报告。",
        "categories": [
          "organization"
        ],
        "sourceId": "src-004",
        "locator": "Conclusions",
        "quote": "NISA informed the operators that they did not need to consider a possible station blackout (SBO) because the probability was small and other measures were in place. It then asked the operators to write a report that would give the appropriate rationale for why this consideration was unnecessary.",
        "confidence": "medium",
        "note": "核验：未做（NAIIC/TEPCO 轮）",
        "textEn": "NISA informed the operators that they did not need to consider a possible station blackout (SBO) because the probability was small and other measures were in place. It then asked the operators to write a report that would give the appropriate rationale for why this consideration was unnecessary.",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-org-015",
        "text": "事故时 Unit 1–3 所需结构加固**均未实施**；NISA 对拖延给予 tacit consent。",
        "categories": [
          "organization"
        ],
        "sourceId": "src-004",
        "locator": "Conclusions",
        "quote": "no part of the required reinforcements had been implemented on Units 1 through 3 by the time of the accident. This was the result of tacit consent by NISA for a significant delay by the operators in completing the reinforcement.",
        "confidence": "medium",
        "note": "核验：未做（NAIIC/TEPCO 轮）",
        "textEn": "no part of the required reinforcements had been implemented on Units 1 through 3 by the time of the accident. This was the result of tacit consent by NISA for a significant delay by the operators in completing the reinforcement.",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-org-016",
        "text": "TEPCO 通过 FEPC 积极反对新安全法规并拖延与监管谈判。",
        "categories": [
          "organization"
        ],
        "sourceId": "src-004",
        "locator": "Conclusions（TEPCO perspective 段）",
        "locatorEn": "Conclusions (TEPCO perspective paragraph)",
        "quote": "enough motivation for TEPCO to aggressively oppose new safety regulations and draw out negotiations with regulators via the Federation of Electric Power Companies (FEPC).",
        "confidence": "medium",
        "note": "核验：未做（NAIIC/TEPCO 轮）；句中片段；含 enough motivation for 前缀",
        "textEn": "enough motivation for TEPCO to aggressively oppose new safety regulations and draw out negotiations with regulators via the Federation of Electric Power Companies (FEPC).",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-org-017",
        "text": "NISA 未向公众披露海啸评估或对运营商指示，亦未保留记录。",
        "categories": [
          "organization"
        ],
        "sourceId": "src-004",
        "locator": "The lack of tsunami countermeasures §1",
        "quote": "NISA did not disclose any information to the public on their evaluations or their instructions to reconsider the assumptions used in designing the plant’s tsunami defenses. Nor did NISA keep any records of the information.",
        "confidence": "medium",
        "note": "核验：未做（NAIIC/TEPCO 轮）",
        "textEn": "NISA did not disclose any information to the public on their evaluations or their instructions to reconsider the assumptions used in designing the plant’s tsunami defenses. Nor did NISA keep any records of the information.",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-org-018",
        "text": "TEPCO 2007 档案称已抬高电机等，**当时理解**厂站安全已获保证。",
        "categories": [
          "organization"
        ],
        "sourceId": "src-005",
        "locator": "Attachment 4-4",
        "quote": "actions were already taken to increase the elevation of the motors, thus safety had been ensured.",
        "confidence": "medium",
        "note": "核验：未做（NAIIC/TEPCO 轮）；**运营商自我评估表述**",
        "textEn": "actions were already taken to increase the elevation of the motors, thus safety had been ensured.",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-org-019",
        "text": "2006 年起监管方与 TEPCO 已知海啸致全厂断电及堆芯损伤风险，但未出台法规或防护。",
        "categories": [
          "organization"
        ],
        "sourceId": "src-004",
        "locator": "Conclusions",
        "quote": "Since 2006, the regulators and TEPCO were aware of the risk that a total outage of electricity at the Fukushima Daiichi plant might occur if a tsunami were to reach the level of the site.",
        "confidence": "medium",
        "note": "核验：未做（NAIIC/TEPCO 轮）",
        "textEn": "Since 2006, the regulators and TEPCO were aware of the risk that a total outage of electricity at the Fukushima Daiichi plant might occur if a tsunami were to reach the level of the site.",
        "noteEn": "Source cross-check recorded in the case pack."
      },
      {
        "id": "f-org-020",
        "text": "监管方、METI 与 TEPCO 未能建立评估损害概率、 collateral 损害与公众撤离计划等基本安全要求。",
        "categories": [
          "organization"
        ],
        "sourceId": "src-004",
        "locator": "Conclusions",
        "quote": "The operator (TEPCO), the regulatory bodies (NISA and NSC) and the government body promoting the nuclear power industry (METI), all failed to correctly develop the most basic safety requirements—such as assessing the probability of damage, preparing for containing collateral damage from such a disaster, and developing evacuation plans for the public in the case of a serious radiation release.",
        "confidence": "medium",
        "note": "核验：未做（NAIIC/TEPCO 轮）",
        "textEn": "The operator (TEPCO), the regulatory bodies (NISA and NSC) and the government body promoting the nuclear power industry (METI), all failed to correctly develop the most basic safety requirements—such as assessing the probability of damage, preparing for containing collateral damage from such a disaster, and developing evacuation plans for the public in the case of a serious radiation release.",
        "noteEn": "Source cross-check recorded in the case pack."
      }
    ],
    "assessments": [
      {
        "id": "ev-001",
        "text": "日本曾 widespread assumption 认为此类严重事故 unthinkable；监管与政府未挑战该假设。",
        "sourceId": "src-001",
        "locator": "Foreword",
        "confidence": "high",
        "quote": "A major factor that contributed to the accident was the widespread assumption in Japan that its nuclear power plants were so safe that an accident of this magnitude was simply unthinkable. This assumption was accepted by nuclear power plant operators and was not challenged by regulators or by the Government.",
        "appliesToSteps": [
          6,
          7
        ],
        "note": "IAEA（Yukiya Amano Foreword）；核验：✅",
        "textEn": "A major factor that contributed to the accident was the widespread assumption in Japan that its nuclear power plants were so safe that an accident of this magnitude was simply unthinkable. This assumption was accepted by nuclear power plant operators and was not challenged by regulators or by the Government."
      },
      {
        "id": "ev-002",
        "text": "报告旨在理解发生了什么及原因，以便各国政府、监管与运营商落实 lessons learned。",
        "sourceId": "src-001",
        "locator": "Foreword",
        "confidence": "high",
        "quote": "The report considers human, organizational and technical factors, and aims to provide an understanding of what happened, and why, so that the necessary lessons learned can be acted upon by governments, regulators and nuclear power plant operators throughout the world.",
        "appliesToSteps": [
          6,
          7
        ],
        "note": "IAEA；核验：✅",
        "textEn": "The report considers human, organizational and technical factors, and aims to provide an understanding of what happened, and why, so that the necessary lessons learned can be acted upon by governments, regulators and nuclear power plant operators throughout the world."
      },
      {
        "id": "ev-003",
        "text": "总干事称 IAEA 报告将为 authoritative, factual and balanced assessment，并涵盖 lessons learned。",
        "sourceId": "src-002",
        "locator": "TV1 前言",
        "confidence": "high",
        "quote": "“an authoritative, factual and balanced assessment, addressing the causes and consequences of the accident, as well as lessons learned”.",
        "appliesToSteps": [
          6,
          7
        ],
        "note": "IAEA；核验：✅",
        "textEn": "“an authoritative, factual and balanced assessment, addressing the causes and consequences of the accident, as well as lessons learned”."
      },
      {
        "id": "ev-004",
        "text": "事故暴露日本监管框架 certain weaknesses；职责分散且 authority 不清。",
        "sourceId": "src-001",
        "locator": "Foreword",
        "confidence": "high",
        "quote": "The Fukushima Daiichi accident exposed certain weaknesses in Japan’s regulatory framework. Responsibilities were divided among a number of bodies, and it was not always clear where authority lay.",
        "appliesToSteps": [
          6,
          7
        ],
        "note": "IAEA；核验：✅",
        "textEn": "The Fukushima Daiichi accident exposed certain weaknesses in Japan’s regulatory framework. Responsibilities were divided among a number of bodies, and it was not always clear where authority lay."
      },
      {
        "id": "ev-005",
        "text": "事故后日本改革监管体系以更符合国际标准（评估性结论，非第 5 节事实）。",
        "sourceId": "src-001",
        "locator": "Foreword",
        "confidence": "high",
        "quote": "Since the accident, Japan has reformed its regulatory system to better meet international standards. It gave regulators clearer responsibilities and greater authority.",
        "appliesToSteps": [
          6,
          7
        ],
        "note": "IAEA；核验：✅",
        "textEn": "Since the accident, Japan has reformed its regulatory system to better meet international standards. It gave regulators clearer responsibilities and greater authority."
      },
      {
        "id": "ev-006",
        "text": "NAIIC：事故**非**自然灾害，而是「profoundly manmade disaster」。",
        "sourceId": "src-004",
        "locator": "Message from the Chairman",
        "confidence": "medium",
        "quote": "It was a profoundly manmade disaster – that could and should have been foreseen and prevented.",
        "appliesToSteps": [
          6,
          7
        ],
        "note": "NAIIC（Chairman Message）；核验：未做（NAIIC/TEPCO 轮）",
        "textEn": "It was a profoundly manmade disaster – that could and should have been foreseen and prevented."
      },
      {
        "id": "ev-007",
        "text": "NAIIC：灾难「Made in Japan」，根因含服从权威、不愿质疑等文化因素。",
        "sourceId": "src-004",
        "locator": "Message from the Chairman",
        "confidence": "medium",
        "quote": "this was a disaster “Made in Japan.” Its fundamental causes are to be found in the ingrained conventions of Japanese culture: our reflexive obedience; our reluctance to question authority",
        "appliesToSteps": [
          6,
          7
        ],
        "note": "NAIIC；核验：未做（NAIIC/TEPCO 轮）",
        "textEn": "this was a disaster “Made in Japan.” Its fundamental causes are to be found in the ingrained conventions of Japanese culture: our reflexive obedience; our reluctance to question authority"
      },
      {
        "id": "ev-008",
        "text": "NAIIC：TEPCO 过快把原因归咎于海啸，可能为回避地震相关责任。",
        "sourceId": "src-004",
        "locator": "Conclusions — Earthquake damage",
        "confidence": "medium",
        "quote": "TEPCO was too quick to cite the tsunami as the cause of the nuclear accident and deny that the earthquake caused any damage.",
        "appliesToSteps": [
          6,
          7
        ],
        "note": "NAIIC；核验：未做（NAIIC/TEPCO 轮）",
        "textEn": "TEPCO was too quick to cite the tsunami as the cause of the nuclear accident and deny that the earthquake caused any damage."
      },
      {
        "id": "ev-009",
        "text": "TEPCO 档案：基于 JSCE 保守评估，**当时理解**厂站安全已获保证。",
        "sourceId": "src-005",
        "locator": "Attachment 4-4 (2/9)",
        "confidence": "medium",
        "quote": "Accordingly, TEPCO conducted conservative assessments based on the JSCE methodology and understood that the power station’s safety was ensured at that time.",
        "appliesToSteps": [
          6,
          7
        ],
        "note": "TEPCO；核验：未做（NAIIC/TEPCO 轮）",
        "textEn": "Accordingly, TEPCO conducted conservative assessments based on the JSCE methodology and understood that the power station’s safety was ensured at that time."
      }
    ],
    "valueWords": [
      {
        "id": "vw-001",
        "word": "责任",
        "whyVague": "可指法律责任、道德责任或组织分工，需在本案中界定。",
        "sourceId": "TODO(PI)",
        "wordEn": "Responsibility",
        "whyVagueEn": "Legal, moral, and organizational responsibilities may differ."
      },
      {
        "id": "vw-002",
        "word": "安全",
        "whyVague": "可指人身、环境或系统可靠性，标准因语境而异。",
        "sourceId": "TODO(PI)",
        "wordEn": "Safety",
        "whyVagueEn": "May refer to personal, environmental, or reliability standards depending on context."
      },
      {
        "id": "vw-003",
        "word": "合规",
        "whyVague": "可指满足最低法规或更高行业规范，含义需澄清。",
        "sourceId": "TODO(PI)",
        "wordEn": "Compliance",
        "whyVagueEn": "May mean minimum legal rules or higher professional standards."
      },
      {
        "id": "vw-004",
        "word": "透明",
        "whyVague": "可指信息公开程度或决策过程可见性，需具体化。",
        "sourceId": "TODO(PI)",
        "wordEn": "Transparency",
        "whyVagueEn": "May mean information disclosure or visibility of decision processes."
      }
    ],
    "constraints": [
      {
        "id": "rch-001",
        "label": "深层文化规范",
        "desc": "组织或行业长期形成的非成文规范，可能塑造决策默认选项。",
        "sourceId": "TODO(PI)",
        "labelEn": "Deep cultural norms",
        "descEn": "Long-standing informal norms may shape perceived options."
      },
      {
        "id": "rch-002",
        "label": "组织压力",
        "desc": "来自上级、绩效或团队期望的压力，不预设必然减责。",
        "sourceId": "TODO(PI)",
        "labelEn": "Organizational pressure",
        "descEn": "Pressure does not automatically reduce responsibility."
      },
      {
        "id": "rch-003",
        "label": "信息不对称",
        "desc": "不同主体掌握信息范围与时机不同，需结合当时情境判断。",
        "sourceId": "TODO(PI)",
        "labelEn": "Information asymmetry",
        "descEn": "Different actors knew different facts at different times."
      },
      {
        "id": "rch-004",
        "label": "时间压力",
        "desc": "紧急决策窗口内可选方案受限，须说明当时还有哪些可行选择。",
        "sourceId": "TODO(PI)",
        "labelEn": "Time pressure",
        "descEn": "Explain alternatives feasible within the decision window."
      },
      {
        "id": "rch-005",
        "label": "职业风险",
        "desc": "举报、抗命等可能带来职业后果，与责任判断是否减轻须分开论证。",
        "sourceId": "TODO(PI)",
        "labelEn": "Career risk",
        "descEn": "Career consequences and ethical duty require separate reasoning."
      }
    ],
    "biasChecks": [
      {
        "id": "bc-001",
        "label": "是否遗漏了某类事实？（按三分类检查）",
        "jumpTo": 3,
        "labelEn": "Have we overlooked a category of facts?"
      },
      {
        "id": "bc-002",
        "label": "是否有概念仍然模糊？",
        "jumpTo": 5,
        "labelEn": "Have we left a key term ambiguous?"
      },
      {
        "id": "bc-003",
        "label": "假设是否都写了依据？",
        "jumpTo": 4,
        "labelEn": "Are assumptions clearly distinguished from facts?"
      },
      {
        "id": "bc-004",
        "label": "前后是否有矛盾？",
        "jumpTo": 7,
        "labelEn": "Does the reasoning contain contradictions?"
      },
      {
        "id": "bc-005",
        "label": "是否只站在了一个主体的视角？",
        "jumpTo": 1,
        "labelEn": "Have we considered other perspectives?"
      }
    ],
    "reviewPrompts": [
      {
        "id": "rp-001",
        "label": "是否遗漏了某类事实？",
        "jumpTo": 3,
        "kind": "missing-facts",
        "labelEn": "Have we overlooked a category of facts?"
      },
      {
        "id": "rp-002",
        "label": "是否有概念仍然模糊？",
        "jumpTo": 5,
        "kind": "vague-concept",
        "labelEn": "Have we left a key term ambiguous?"
      },
      {
        "id": "rp-003",
        "label": "假设是否都写了依据？",
        "jumpTo": 4,
        "kind": "assumption-basis",
        "labelEn": "Are assumptions clearly distinguished from facts?"
      },
      {
        "id": "rp-004",
        "label": "前后是否有矛盾？",
        "jumpTo": 7,
        "kind": "contradiction",
        "labelEn": "Does the reasoning contain contradictions?"
      },
      {
        "id": "rp-005",
        "label": "是否只站在了一个主体的视角？",
        "jumpTo": 1,
        "kind": "single-perspective",
        "labelEn": "Have we considered other perspectives?"
      }
    ]
  };
  window.CASE_DATA.principles = principles;
  window.CASE_DATA.steps = steps;
})();
