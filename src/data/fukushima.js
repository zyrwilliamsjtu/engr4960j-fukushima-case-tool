/**
 * 福岛案例静态数据（契约 v1）
 * TODO(PI): 补真实内容与来源；严禁在未查证前填写真实事实、日期、机构或文献。
 */
(function () {
  // TODO(PI): 补真实内容与来源
  var placeholderSteps = [
    {
      id: 1,
      key: "identify",
      name: "识别伦理问题",
      presentInClass: true,
      intro: "【占位】背景说明待补。",
      prompts: ["【占位】引导问题 1？", "【占位】引导问题 2？"],
      fields: [
        {
          key: "issues",
          type: "list",
          label: "伦理问题",
          min: 5,
          itemSchema: ["text:question", "actor:optional"],
          hint: "【占位】每条须为问句"
        }
      ],
      checks: ["minItems:5", "mustBeQuestion"],
      reference: { type: "timeline" }
    },
    {
      id: 2,
      key: "focus",
      name: "聚焦",
      presentInClass: true,
      intro: "【占位】背景说明待补。",
      prompts: ["【占位】引导问题 1？"],
      fields: [
        {
          key: "chosen",
          type: "multiSelect",
          label: "选定的问题",
          min: 2,
          max: 2,
          optionsFrom: "steps.1.fields.issues"
        },
        {
          key: "reason",
          type: "textarea",
          label: "聚焦理由"
        }
      ],
      checks: ["exactSelect:2", "nonEmpty"],
      reference: { type: "text" }
    },
    {
      id: 3,
      key: "facts",
      name: "相关事实",
      presentInClass: true,
      intro: "【占位】背景说明待补。",
      prompts: ["【占位】引导问题 1？"],
      fields: [
        {
          key: "relatedFacts",
          type: "bucketedFacts",
          label: "相关事实",
          buckets: ["material", "individual", "organization"]
        }
      ],
      checks: ["minItems:2"],
      reference: { type: "facts" }
    },
    {
      id: 4,
      key: "assumptions",
      name: "合理假设",
      presentInClass: true,
      intro: "【占位】背景说明待补。",
      prompts: ["【占位】引导问题 1？"],
      fields: [
        {
          key: "assumptions",
          type: "assumption",
          label: "合理假设",
          min: 2
        }
      ],
      checks: ["minItems:2"],
      reference: { type: "text" }
    },
    {
      id: 5,
      key: "clarify",
      name: "定义澄清",
      presentInClass: true,
      intro: "【占位】背景说明待补。",
      prompts: ["【占位】引导问题 1？"],
      fields: [
        {
          key: "clarifications",
          type: "clarify",
          label: "价值含义澄清",
          min: 2
        }
      ],
      checks: ["minItems:2"],
      reference: { type: "text" }
    },
    {
      id: 6,
      key: "analysis",
      name: "伦理分析",
      presentInClass: false,
      intro: "【占位】背景说明待补。",
      prompts: ["【占位】引导问题 1？"],
      fields: [
        {
          key: "selectedPrinciples",
          type: "multiSelect",
          label: "适用原则",
          min: 3
        },
        {
          key: "principleOrder",
          type: "rankList",
          label: "原则排序（冲突时）"
        },
        {
          key: "orderReason",
          type: "textarea",
          label: "排序理由"
        },
        {
          key: "principleGap",
          type: "textarea",
          label: "原则是否不足"
        }
      ],
      checks: ["minItems:3"],
      reference: { type: "text" }
    },
    {
      id: 7,
      key: "review",
      name: "过程回顾",
      presentInClass: false,
      intro: "【占位】背景说明待补。",
      prompts: ["【占位】引导问题 1？"],
      fields: [
        {
          key: "reviewItems",
          type: "review",
          label: "前序步骤回显"
        },
        {
          key: "biasChecked",
          type: "checkList",
          label: "偏见自查"
        }
      ],
      checks: ["allReviewed"],
      reference: { type: "text" }
    },
    {
      id: 8,
      key: "conclusion",
      name: "得出结论",
      presentInClass: false,
      intro: "【占位】背景说明待补。",
      prompts: ["【占位】引导问题 1？"],
      fields: [
        {
          key: "conclusion",
          type: "textarea",
          label: "结论"
        },
        {
          key: "conclusionReason",
          type: "textarea",
          label: "结论理由"
        }
      ],
      checks: ["nonEmpty"],
      reference: null
    },
    {
      id: 9,
      key: "constraints",
      name: "实践约束",
      presentInClass: false,
      intro: "【占位】背景说明待补。",
      prompts: ["【占位】引导问题 1？"],
      fields: [
        {
          key: "selectedConstraints",
          type: "checkList",
          label: "缓解/豁免条件"
        },
        {
          key: "constraintNote",
          type: "textarea",
          label: "说明"
        }
      ],
      checks: ["minItems:1"],
      reference: { type: "text" }
    },
    {
      id: 10,
      key: "avoid",
      name: "避免问题",
      presentInClass: false,
      intro: "【占位】背景说明待补。",
      prompts: ["【占位】引导问题 1？"],
      fields: [
        {
          key: "preventItems",
          type: "list",
          label: "应避免的问题",
          min: 3,
          itemSchema: ["text"]
        }
      ],
      checks: ["minItems:3"],
      reference: null
    }
  ];

  window.CASE_DATA = {
    meta: {
      id: "fukushima",
      title: "福岛第一核电站事故",
      dataVersion: "1.0"
    },
    // TODO(PI): 补真实内容与来源
    timeline: [
      {
        date: "【占位】",
        event: "【占位】此处待补",
        sourceId: "TODO"
      },
      {
        date: "【占位】",
        event: "【占位】此处待补",
        sourceId: "TODO"
      }
    ],
    // TODO(PI): 补真实内容与来源
    sources: [],
    facts: {
      // TODO(PI): 补真实内容与来源
      material: [
        { id: "fm-ph-1", text: "【占位】此处待补", sourceId: "TODO" },
        { id: "fm-ph-2", text: "【占位】此处待补", sourceId: "TODO" }
      ],
      // TODO(PI): 补真实内容与来源
      individual: [
        { id: "fi-ph-1", text: "【占位】此处待补", sourceId: "TODO" },
        { id: "fi-ph-2", text: "【占位】此处待补", sourceId: "TODO" }
      ],
      // TODO(PI): 补真实内容与来源
      organization: [
        { id: "fo-ph-1", text: "【占位】此处待补", sourceId: "TODO" },
        { id: "fo-ph-2", text: "【占位】此处待补", sourceId: "TODO" }
      ]
    },
    // TODO(PI): 补真实内容与来源
    valueWords: [],
    // TODO(PI): 补真实内容与来源
    principles: [
      {
        id: "p-ph-1",
        name: "【占位】",
        desc: "【占位】此处待补",
        sourceId: "TODO"
      },
      {
        id: "p-ph-2",
        name: "【占位】",
        desc: "【占位】此处待补",
        sourceId: "TODO"
      }
    ],
    // TODO(PI): 补真实内容与来源
    constraints: [],
    // TODO(PI): 补真实内容与来源
    biasChecks: [],
    steps: placeholderSteps
  };
})();
