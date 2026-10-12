/**
 * 课堂演示用示例用户状态（stateVersion 2.0）。仅用于 dist/index.demo.html。
 * 语气为「本组示例分析」，非标准答案；第 8 步结论与自我反思正文不预填。
 */
(function () {
  "use strict";
  window.DEMO_USER_STATE = {
    demoPackId: "engr4960j-fukushima-demo-pack-v1",
    stateVersion: "2.0",
    caseId: "fukushima",
    currentStep: 6,
    startedAt: "2026-03-01T08:00:00.000Z",
    updatedAt: "2026-03-01T10:30:00.000Z",
    authorship: {
      notes: ["本组示例：以下记录仅供演示填写方式，不代表课程结论。"],
      reservations: []
    },
    stepStatus: {
      1: "checked",
      2: "checked",
      3: "checked",
      4: "draft",
      5: "draft",
      6: "discuss",
      7: "todo",
      8: "todo",
      9: "draft",
      10: "draft"
    },
    items: {
      "Q-1-01": {
        id: "Q-1-01",
        type: "Q",
        step: 1,
        text: "本组示例：在震后早期，TEPCO 是否应在信息仍不完整时，更主动地向周边居民说明厂址风险？",
        actors: ["周边居民", "TEPCO 现场与总部人员"],
        isCore: true,
        focusReason:
          "本组示例：这个问题同时涉及公众知情与组织披露节奏，且与后续应急决策直接相连。",
        createdAt: "2026-03-01T08:05:00.000Z",
        updatedAt: "2026-03-01T08:20:00.000Z"
      },
      "Q-1-02": {
        id: "Q-1-02",
        type: "Q",
        step: 1,
        text: "本组示例：当现场指令与工程师对安全的判断不一致时，个人应如何行动？",
        actors: ["现场工程师", "上级管理者"],
        isCore: true,
        focusReason:
          "本组示例：我们想比较组织压力与个人专业判断之间的张力，不预设哪一方必然正确。",
        createdAt: "2026-03-01T08:06:00.000Z",
        updatedAt: "2026-03-01T08:21:00.000Z"
      },
      "M-3-01": {
        id: "M-3-01",
        type: "M",
        step: 3,
        text: "本组示例：震后最初 72 小时内，各机组氢气风险是否已被同一信息渠道汇总给决策层？",
        createdAt: "2026-03-01T08:40:00.000Z",
        updatedAt: "2026-03-01T08:40:00.000Z"
      },
      "M-3-02": {
        id: "M-3-02",
        type: "M",
        step: 3,
        text: "本组示例：当时对外发布的信息，与内部工程判断之间是否存在可核实的时间差记录？",
        createdAt: "2026-03-01T08:41:00.000Z",
        updatedAt: "2026-03-01T08:41:00.000Z"
      },
      "A-4-01": {
        id: "A-4-01",
        type: "A",
        step: 4,
        text: "本组示例：我们暂时假设，早期部分对外表述反映的是「当时掌握的信息」，而非事后完整图景。",
        basisRefs: ["M-3-02", "f-org-001"],
        createdAt: "2026-03-01T09:00:00.000Z",
        updatedAt: "2026-03-01T09:05:00.000Z"
      },
      "A-4-02": {
        id: "A-4-02",
        type: "A",
        step: 4,
        text: "本组示例：我们暂时假设，现场人员在缺乏按培训场景准备的设备时，仍需要在有限信息下连续决策。",
        basisRefs: ["M-3-01", "f-mat-002"],
        createdAt: "2026-03-01T09:01:00.000Z",
        updatedAt: "2026-03-01T09:06:00.000Z"
      },
      "C-5-01": {
        id: "C-5-01",
        type: "C",
        step: 5,
        word: "责任",
        others: "本组示例：他人可能先想到法律追责或事后问责。",
        mine: "本组示例：我们在分析里用「责任」指角色在特定时刻应履行的信息与安全义务。",
        createdAt: "2026-03-01T09:10:00.000Z",
        updatedAt: "2026-03-01T09:10:00.000Z"
      },
      "C-5-02": {
        id: "C-5-02",
        type: "C",
        step: 5,
        word: "安全",
        others: "本组示例：公众讨论里「安全」有时指即时人身风险，有时指长期环境风险。",
        mine: "本组示例：我们在此步区分运行安全、辐射防护与信息透明带来的社会安全感。",
        createdAt: "2026-03-01T09:11:00.000Z",
        updatedAt: "2026-03-01T09:11:00.000Z"
      },
      "PA-6-01": {
        id: "PA-6-01",
        type: "PA",
        step: 6,
        principleId: "p-basic-1",
        appliesTo: ["Q-1-01"],
        text: "本组示例：公众安全原则提示我们，信息延迟本身可能构成对公众的风险暴露。",
        order: 1,
        createdAt: "2026-03-01T09:30:00.000Z",
        updatedAt: "2026-03-01T09:30:00.000Z"
      },
      "PA-6-02": {
        id: "PA-6-02",
        type: "PA",
        step: 6,
        principleId: "p-basic-6",
        appliesTo: ["Q-1-01"],
        text: "本组示例：真实披露原则要求区分「尚未确认」与「刻意隐瞒」，我们仍在讨论其边界。",
        order: 2,
        createdAt: "2026-03-01T09:31:00.000Z",
        updatedAt: "2026-03-01T09:31:00.000Z"
      },
      "PA-6-03": {
        id: "PA-6-03",
        type: "PA",
        step: 6,
        principleId: "p-emp-1",
        appliesTo: ["Q-1-02"],
        text: "本组示例：员工伦理原则提醒我们，服从合法指令与拒绝明显不当指令可能同时出现。",
        order: 3,
        createdAt: "2026-03-01T09:32:00.000Z",
        updatedAt: "2026-03-01T09:32:00.000Z"
      },
      "RC-9-01": {
        id: "RC-9-01",
        type: "RC",
        step: 9,
        text: "本组示例：极端灾害与通信中断压缩了决策窗口，但不自动免除说明义务。",
        alternatives:
          "本组示例：我们讨论的分支包括：更早分层发布已知信息、并行启动外部独立核实、以及限制措辞但保持更新频率。",
        mitigationJudgment:
          "本组示例：约束存在，但仍需逐条说明哪些行动在当时的知识与资源条件下仍属可行。",
        createdAt: "2026-03-01T10:00:00.000Z",
        updatedAt: "2026-03-01T10:05:00.000Z"
      },
      "AV-10-01": {
        id: "AV-10-01",
        type: "AV",
        step: 10,
        text: "本组示例：在设计阶段把极端外部事件与场内多重失效联动的演练制度化。",
        createdAt: "2026-03-01T10:10:00.000Z",
        updatedAt: "2026-03-01T10:10:00.000Z"
      },
      "AV-10-02": {
        id: "AV-10-02",
        type: "AV",
        step: 10,
        text: "本组示例：建立跨部门、可对外复述的信息确认流程，减少「口径不一致」带来的信任损失。",
        createdAt: "2026-03-01T10:11:00.000Z",
        updatedAt: "2026-03-01T10:11:00.000Z"
      },
      "AV-10-03": {
        id: "AV-10-03",
        type: "AV",
        step: 10,
        text: "本组示例：为工程师保留在紧急状态下上报专业异议的明确通道与保护预期。",
        createdAt: "2026-03-01T10:12:00.000Z",
        updatedAt: "2026-03-01T10:12:00.000Z"
      }
    },
    relations: [
      {
        id: "REL-D-001",
        kind: "fact-supports-question",
        from: "f-mat-001",
        to: "Q-1-01",
        why: "本组示例：六台机组同址事实帮助我们讨论风险是否在厂内多点累积。",
        createdAt: "2026-03-01T08:30:00.000Z"
      },
      {
        id: "REL-D-002",
        kind: "fact-supports-question",
        from: "f-mat-002",
        to: "Q-1-02",
        why: "本组示例：现场即兴应对与设备缺口，说明个人判断常发生在不完整信息下。",
        createdAt: "2026-03-01T08:31:00.000Z"
      },
      {
        id: "REL-D-003",
        kind: "fact-supports-question",
        from: "f-mat-003",
        to: "Q-1-01",
        why: "本组示例：我们用这条材料事实比较不同机组状态，避免把事故叙述成单点事件。",
        createdAt: "2026-03-01T08:32:00.000Z"
      },
      {
        id: "REL-D-004",
        kind: "fact-supports-question",
        from: "f-ind-001",
        to: "Q-1-02",
        why: "本组示例：个人层面的记录有助于讨论「谁当时知道什么」，而非只谈抽象组织。",
        createdAt: "2026-03-01T08:33:00.000Z"
      },
      {
        id: "REL-D-005",
        kind: "fact-supports-question",
        from: "f-ind-002",
        to: "Q-1-01",
        why: "本组示例：个人行动与信息接收顺序，可能影响公众是否被及时告知。",
        createdAt: "2026-03-01T08:34:00.000Z"
      },
      {
        id: "REL-D-006",
        kind: "fact-supports-question",
        from: "f-ind-003",
        to: "Q-1-02",
        why: "本组示例：我们用它比较不同角色在链式指令中的位置，尚未得出统一结论。",
        createdAt: "2026-03-01T08:35:00.000Z"
      },
      {
        id: "REL-D-007",
        kind: "fact-supports-question",
        from: "f-org-001",
        to: "Q-1-01",
        why: "本组示例：运营方身份事实为讨论披露主体与责任归属提供起点。",
        createdAt: "2026-03-01T08:36:00.000Z"
      },
      {
        id: "REL-D-008",
        kind: "fact-supports-question",
        from: "f-org-003",
        to: "Q-1-01",
        why: "本组示例：组织层信息协调问题，与「是否主动说明风险」直接相关。",
        createdAt: "2026-03-01T08:37:00.000Z"
      },
      {
        id: "REL-D-009",
        kind: "fact-supports-question",
        from: "f-org-008",
        to: "Q-1-02",
        why: "本组示例：组织响应结构影响现场个人能否暂停或升级某项操作。",
        createdAt: "2026-03-01T08:38:00.000Z"
      },
      {
        id: "REL-D-010",
        kind: "assumption-fills-gap",
        from: "A-4-01",
        to: "M-3-02",
        why: "本组示例：在缺少完整时间线时，我们暂用这一假设推进讨论，并标记需回看。",
        createdAt: "2026-03-01T09:02:00.000Z"
      },
      {
        id: "REL-D-011",
        kind: "assumption-fills-gap",
        from: "A-4-02",
        to: "M-3-01",
        why: "本组示例：假设依据来自已关联事实与缺口条目，仍待第 7 步复核。",
        createdAt: "2026-03-01T09:03:00.000Z"
      }
    ],
    conflicts: [
      {
        id: "CF-D-01",
        questionId: "Q-1-02",
        principleA: "p-basic-1",
        principleB: "p-emp-1",
        supportsA: "本组示例：公众安全视角要求尽快降低可预见伤害。",
        supportsB: "本组示例：员工伦理也涉及遵守指挥链与避免擅自行动带来的混乱。",
        priority: "本组示例：我们倾向先并列呈现冲突，再在结论步给出本组判断。",
        scope: "case",
        reason: "本组示例：说明冲突为何在本问题情境下无法被简单消去。"
      }
    ],
    snapshots: [],
    hasAcceptedL3: {},
    idSeq: {}
  };
})();
