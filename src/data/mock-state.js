/**
 * 仅供界面开发调试的 mock 用户状态（stateVersion 2.0）。
 * 不代表任何真实福岛分析结论或事实；勿用于交付或演示正文。
 * 本文件 ID 规则与 docs/CONTRACT.md 的「静态数据 ID」一致。
 */
(function () {
  var itemsSnapshot1 = {
    "Q-1-01": {
      id: "Q-1-01",
      type: "Q",
      step: 1,
      text: "【示例】某主体在决策 X 时是否应当优先考虑公众安全？",
      actors: ["【示例】角色甲"],
      isCore: true,
      focusReason: "【示例】覆盖安全与决策主线",
      createdAt: "2026-01-01T00:10:00.000Z",
      updatedAt: "2026-01-01T00:20:00.000Z"
    },
    "Q-1-02": {
      id: "Q-1-02",
      type: "Q",
      step: 1,
      text: "【示例】某机构是否应该公开某类信息？",
      actors: [],
      isCore: true,
      focusReason: "【示例】覆盖信息披露维度",
      createdAt: "2026-01-01T00:11:00.000Z",
      updatedAt: "2026-01-01T00:21:00.000Z"
    },
    "M-3-01": {
      id: "M-3-01",
      type: "M",
      step: 3,
      text: "【示例】尚缺的关键事实 A",
      createdAt: "2026-01-01T00:30:00.000Z",
      updatedAt: "2026-01-01T00:30:00.000Z"
    },
    "M-3-02": {
      id: "M-3-02",
      type: "M",
      step: 3,
      text: "【示例】尚缺的关键事实 B",
      createdAt: "2026-01-01T00:31:00.000Z",
      updatedAt: "2026-01-01T00:31:00.000Z"
    },
    "A-4-01": {
      id: "A-4-01",
      type: "A",
      step: 4,
      text: "【示例】假设：当时某主体已掌握信息 Y",
      basisRefs: ["M-3-01"],
      createdAt: "2026-01-01T00:40:00.000Z",
      updatedAt: "2026-01-01T00:40:00.000Z"
    },
    "PA-6-01": {
      id: "PA-6-01",
      type: "PA",
      step: 6,
      principleId: "p-basic-1",
      appliesTo: ["Q-1-01"],
      createdAt: "2026-01-01T01:00:00.000Z"
    }
  };

  var relationsSnapshot1 = [
    {
      id: "REL-0001",
      kind: "fact-supports-question",
      from: "f-mat-001",
      to: "Q-1-01",
      why: "【示例】该占位事实若成立，会影响对决策 X 的讨论。",
      createdAt: "2026-01-01T00:35:00.000Z"
    },
    {
      id: "REL-0002",
      kind: "assumption-fills-gap",
      from: "A-4-01",
      to: "M-3-01",
      why: "【示例】用假设暂时填补信息缺口 Y。",
      createdAt: "2026-01-01T00:45:00.000Z"
    }
  ];

  var conflictsSnapshot1 = [
    {
      id: "CF-6-01",
      questionId: "Q-1-01",
      principleA: "p-basic-1",
      principleB: "p-emp-1",
      supportsA: "【示例】原则 A 支持采取更保守的公开与防护行动",
      supportsB: "【示例】原则 B 强调服从组织合法指令与流程",
      priority: "【示例】在本案中优先协调两者而非简单取舍",
      scope: "case",
      reason: "【示例】说明为何在本问题情境下这样排序"
    }
  ];

  window.MOCK_USER_STATE = {
    stateVersion: "2.0",
    caseId: "fukushima",
    currentStep: 3,
    startedAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T01:05:00.000Z",
    authorship: {
      notes: ["【示例】组员 A：第 1 步问句由 A 起草"],
      reservations: []
    },
    stepStatus: {
      1: "checked",
      2: "checked",
      3: "draft",
      4: "todo",
      5: "todo",
      6: "todo",
      7: "todo",
      8: "todo",
      9: "todo",
      10: "todo"
    },
    items: {
      "Q-1-01": itemsSnapshot1["Q-1-01"],
      "Q-1-02": itemsSnapshot1["Q-1-02"],
      "Q-1-03": {
        id: "Q-1-03",
        type: "Q",
        step: 1,
        text: "【示例】个人责任与组织责任在此情境下该如何划分？",
        actors: ["【示例】角色乙"],
        createdAt: "2026-01-01T00:12:00.000Z",
        updatedAt: "2026-01-01T00:12:00.000Z"
      },
      "Q-1-04": {
        id: "Q-1-04",
        type: "Q",
        step: 1,
        text: "【示例】在资源有限时，是否应当先执行措施 X？",
        actors: [],
        createdAt: "2026-01-01T00:13:00.000Z",
        updatedAt: "2026-01-01T00:13:00.000Z"
      },
      "Q-1-05": {
        id: "Q-1-05",
        type: "Q",
        step: 1,
        text: "【示例】合规是否等同于满足最低安全标准？",
        actors: ["【示例】角色丙"],
        createdAt: "2026-01-01T00:14:00.000Z",
        updatedAt: "2026-01-01T00:14:00.000Z"
      },
      "M-3-01": itemsSnapshot1["M-3-01"],
      "M-3-02": itemsSnapshot1["M-3-02"],
      "A-4-01": itemsSnapshot1["A-4-01"],
      "PA-6-01": itemsSnapshot1["PA-6-01"],
      "C-5-01": {
        id: "C-5-01",
        type: "C",
        step: 5,
        word: "【示例】责任",
        othersView: "【示例】他人可能理解为法律追责",
        myUsage: "【示例】我在此指角色分工意义上的责任",
        createdAt: "2026-01-01T00:50:00.000Z"
      },
      "RC-9-01": {
        id: "RC-9-01",
        type: "RC",
        step: 9,
        text: "【示例】约束条目占位",
        createdAt: "2026-01-01T01:02:00.000Z"
      },
      "R-8-01": {
        id: "R-8-01",
        type: "R",
        step: 8,
        text: "【示例】结论占位",
        createdAt: "2026-01-01T01:01:00.000Z"
      },
      "AV-10-01": {
        id: "AV-10-01",
        type: "AV",
        step: 10,
        text: "【示例】应避免的问题占位",
        createdAt: "2026-01-01T01:03:00.000Z"
      }
    },
    relations: relationsSnapshot1,
    conflicts: conflictsSnapshot1,
    snapshots: [
      {
        id: "SN-01",
        label: "初步",
        createdAt: "2026-01-01T00:55:00.000Z",
        payload: {
          items: itemsSnapshot1,
          relations: relationsSnapshot1,
          conflicts: []
        }
      },
      {
        id: "SN-02",
        label: "复核后",
        createdAt: "2026-01-01T01:05:00.000Z",
        payload: {
          items: itemsSnapshot1,
          relations: relationsSnapshot1,
          conflicts: conflictsSnapshot1
        }
      }
    ],
    hasAcceptedL3: {
      1: true,
      2: true,
      3: false
    }
  };
})();
