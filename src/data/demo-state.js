/**
 * Demo user state (stateVersion 2.0) for dist/index.demo.html only.
 * Custom group sample — member text verbatim where marked; AI completion for gaps.
 */
(function () {
  "use strict";
  var MEMBER_FACT =
    "On 11 March 2011, the earthquake caused a loss of off-site power at Fukushima Daiichi. The subsequent tsunami flooded essential equipment, disabling much of the backup power supply and compromising reactor cooling.";
  window.DEMO_USER_STATE = {
    demoPackId: "engr4960j-fukushima-demo-pack-v1",
    stateVersion: "2.0",
    caseId: "fukushima",
    currentStep: 3,
    startedAt: "2026-03-15T08:00:00.000Z",
    updatedAt: "2026-03-15T11:00:00.000Z",
    authorship: {
      notes: [],
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
      8: "draft",
      9: "draft",
      10: "draft"
    },
    items: {
      "Q-1-01": {
        id: "Q-1-01",
        type: "Q",
        step: 1,
        text: "Should TEPCO have taken additional precautions to protect those systems and the people who depended on them?",
        actors: ["TEPCO", "Site workers", "Nearby public"],
        isCore: true,
        focusReason:
          "because protecting power and cooling systems was essential to workers' and public safety. It also allows us to examine specific decisions made before the accident.\nwhether TEPCO fulfilled its duty to take reasonable precautions against foreseeable harm. We must consider what it knew, what protective measures were feasible, and whether meeting regulations was enough to fulfill that duty.",
        createdAt: "2026-03-15T08:05:00.000Z",
        updatedAt: "2026-03-15T08:25:00.000Z"
      },
      "Q-1-02": {
        id: "Q-1-02",
        type: "Q",
        step: 1,
        text: "When reassessments showed tsunami and power-loss hazards above the original licensing basis, were proportionate protective upgrades implemented in time?",
        actors: ["TEPCO engineering", "Regulators"],
        isCore: true,
        focusReason:
          "This keeps the analysis on feasible safeguards rather than only on whether a formal rule was on the books.",
        createdAt: "2026-03-15T08:06:00.000Z",
        updatedAt: "2026-03-15T08:26:00.000Z"
      },
      "Q-1-03": {
        id: "Q-1-03",
        type: "Q",
        step: 1,
        text: "Did backup power and cooling dependencies receive protection consistent with what operators already knew about flooding risk?",
        actors: ["Plant designers", "Operators"],
        isCore: false,
        createdAt: "2026-03-15T08:07:00.000Z",
        updatedAt: "2026-03-15T08:07:00.000Z"
      },
      "Q-1-04": {
        id: "Q-1-04",
        type: "Q",
        step: 1,
        text: "Should compliance with existing regulations be treated as sufficient evidence that reasonable precautions were taken?",
        actors: ["TEPCO management", "NISA"],
        isCore: false,
        createdAt: "2026-03-15T08:08:00.000Z",
        updatedAt: "2026-03-15T08:08:00.000Z"
      },
      "Q-1-05": {
        id: "Q-1-05",
        type: "Q",
        step: 1,
        text: "How should short-term operational costs be weighed against long-term public safety when hazard estimates rise?",
        actors: ["Corporate planners", "Public"],
        isCore: false,
        createdAt: "2026-03-15T08:09:00.000Z",
        updatedAt: "2026-03-15T08:09:00.000Z"
      },
      "M-3-01": {
        id: "M-3-01",
        type: "M",
        step: 3,
        text: "LIMITED INFORMATION",
        createdAt: "2026-03-15T08:40:00.000Z",
        updatedAt: "2026-03-15T08:40:00.000Z"
      },
      "M-3-02": {
        id: "M-3-02",
        type: "M",
        step: 3,
        text: "Was there a consolidated record of which flood-protection measures were approved but not yet completed before 11 March 2011?",
        createdAt: "2026-03-15T08:41:00.000Z",
        updatedAt: "2026-03-15T08:41:00.000Z"
      },
      "A-4-01": {
        id: "A-4-01",
        type: "A",
        step: 4,
        text: "Operators may have made some emergency decisions with incomplete equipment information.",
        basisRefs: ["M-3-01", "f-ind-011"],
        createdAt: "2026-03-15T09:00:00.000Z",
        updatedAt: "2026-03-15T09:05:00.000Z"
      },
      "A-4-02": {
        id: "A-4-02",
        type: "A",
        step: 4,
        text: "We tentatively assume pre-accident hazard reviews were taken seriously internally even when external deadlines slipped.",
        basisRefs: ["M-3-02", "f-org-011"],
        createdAt: "2026-03-15T09:01:00.000Z",
        updatedAt: "2026-03-15T09:06:00.000Z"
      },
      "C-5-01": {
        id: "C-5-01",
        type: "C",
        step: 5,
        word: "REASONABLE PRECAUTION",
        others: "Others may treat this as any measure that appeared in a checklist.",
        mine: "Feasible safeguards proportionate to foreseeable risks—for example, protecting backup power from flooding.",
        createdAt: "2026-03-15T09:10:00.000Z",
        updatedAt: "2026-03-15T09:10:00.000Z"
      },
      "C-5-02": {
        id: "C-5-02",
        type: "C",
        step: 5,
        word: "Foreseeable harm",
        others: "Harm that was discussed in engineering studies but not yet codified in law.",
        mine: "Harm that credible studies placed within the plant lifetime, even if probability was debated.",
        createdAt: "2026-03-15T09:11:00.000Z",
        updatedAt: "2026-03-15T09:11:00.000Z"
      },
      "PA-6-01": {
        id: "PA-6-01",
        type: "PA",
        step: 6,
        principleId: "p-basic-1",
        appliesTo: ["Q-1-01"],
        text: "Public and worker safety points toward protecting power and cooling paths when studies already flagged severe external events.",
        order: 1,
        createdAt: "2026-03-15T09:30:00.000Z",
        updatedAt: "2026-03-15T09:30:00.000Z"
      },
      "PA-6-02": {
        id: "PA-6-02",
        type: "PA",
        step: 6,
        principleId: "p-basic-4",
        appliesTo: ["Q-1-02"],
        text: "Engineering decisions should rest on updated hazard evidence, not only on the original licensing picture.",
        order: 2,
        createdAt: "2026-03-15T09:31:00.000Z",
        updatedAt: "2026-03-15T09:31:00.000Z"
      },
      "PA-6-03": {
        id: "PA-6-03",
        type: "PA",
        step: 6,
        principleId: "p-basic-5",
        appliesTo: ["Q-1-04"],
        text: "Disclosure and internal escalation matter when reassessments outran the installed protection margin.",
        order: 3,
        createdAt: "2026-03-15T09:32:00.000Z",
        updatedAt: "2026-03-15T09:32:00.000Z"
      },
      "R-8-01": {
        id: "R-8-01",
        type: "R",
        step: 8,
        text: "Our working view is that meeting formal requirements alone did not settle whether reasonable, feasible precautions against known flooding and power-loss risks were in place; we still weigh how much TEPCO knew and what it could have done before March 2011.",
        reason:
          "We tie this to linked material facts and principle comparisons above as a tentative group stance for classroom discussion.",
        createdAt: "2026-03-15T10:00:00.000Z",
        updatedAt: "2026-03-15T10:05:00.000Z"
      },
      "RC-9-01": {
        id: "RC-9-01",
        type: "RC",
        step: 9,
        text: "Extreme earthquake and tsunami damage constrained what could be done after 11 March, but our question concerns decisions before the event.",
        alternatives:
          "We discuss whether earlier elevation of pumps, watertight routing, or staged investment could have been pursued without stopping operation.",
        mitigationJudgment:
          "Disaster severity explains response difficulty; it does not by itself answer whether pre-event precautions were reasonable.",
        createdAt: "2026-03-15T10:10:00.000Z",
        updatedAt: "2026-03-15T10:15:00.000Z"
      },
      "AV-10-01": {
        id: "AV-10-01",
        type: "AV",
        step: 10,
        text: "Require periodic reconciliation between hazard reassessments and installed protection for power and cooling dependencies.",
        createdAt: "2026-03-15T10:20:00.000Z",
        updatedAt: "2026-03-15T10:20:00.000Z"
      },
      "AV-10-02": {
        id: "AV-10-02",
        type: "AV",
        step: 10,
        text: "Document explicit sign-off when compensatory measures lag behind updated tsunami or blackout studies.",
        createdAt: "2026-03-15T10:21:00.000Z",
        updatedAt: "2026-03-15T10:21:00.000Z"
      },
      "AV-10-03": {
        id: "AV-10-03",
        type: "AV",
        step: 10,
        text: "Train operators and engineers on decision thresholds when equipment status is uncertain during external events.",
        createdAt: "2026-03-15T10:22:00.000Z",
        updatedAt: "2026-03-15T10:22:00.000Z"
      }
    },
    relations: [
      {
        id: "REL-D-001",
        kind: "fact-supports-question",
        from: "f-mat-003",
        to: "Q-1-01",
        why: MEMBER_FACT,
        createdAt: "2026-03-15T08:30:00.000Z"
      },
      {
        id: "REL-D-002",
        kind: "fact-supports-question",
        from: "f-mat-002",
        to: "Q-1-01",
        why: "Flooding of primary and backup power and heat sinks shows why protecting those systems mattered for cooling.",
        createdAt: "2026-03-15T08:31:00.000Z"
      },
      {
        id: "REL-D-003",
        kind: "fact-supports-question",
        from: "f-mat-007",
        to: "Q-1-02",
        why: "Recorded motions and wave heights above design assumptions bear on whether additional precautions were foreseeable.",
        createdAt: "2026-03-15T08:32:00.000Z"
      },
      {
        id: "REL-D-004",
        kind: "fact-supports-question",
        from: "f-mat-011",
        to: "Q-1-02",
        why: "Run-up heights versus barrier design illustrate a gap between studied risk and installed protection.",
        createdAt: "2026-03-15T08:33:00.000Z"
      },
      {
        id: "REL-D-005",
        kind: "fact-supports-question",
        from: "f-mat-013",
        to: "Q-1-03",
        why: "Pump elevation relative to reassessed tsunami levels speaks to feasible safeguards for cooling support.",
        createdAt: "2026-03-15T08:34:00.000Z"
      },
      {
        id: "REL-D-006",
        kind: "fact-supports-question",
        from: "f-ind-011",
        to: "Q-1-01",
        why: "Operator actions under uncertain valve and power status connect to decisions made with incomplete equipment information.",
        createdAt: "2026-03-15T08:35:00.000Z"
      },
      {
        id: "REL-D-007",
        kind: "fact-supports-question",
        from: "f-ind-009",
        to: "Q-1-03",
        why: "Manual stops and cooling limits show how operator choices interacted with available equipment knowledge.",
        createdAt: "2026-03-15T08:36:00.000Z"
      },
      {
        id: "REL-D-008",
        kind: "fact-supports-question",
        from: "f-ind-014",
        to: "Q-1-01",
        why: "On-site difficulty after the earthquake and tsunami underscores dependence on systems that might have been better protected.",
        createdAt: "2026-03-15T08:37:00.000Z"
      },
      {
        id: "REL-D-009",
        kind: "fact-supports-question",
        from: "f-org-011",
        to: "Q-1-02",
        why: "Incomplete tsunami backcheck before the accident relates to whether feasible upgrades kept pace with studies.",
        createdAt: "2026-03-15T08:38:00.000Z"
      },
      {
        id: "REL-D-010",
        kind: "fact-supports-question",
        from: "f-org-012",
        to: "Q-1-04",
        why: "Reassessment methods and partial countermeasures inform whether regulatory compliance equaled reasonable precaution.",
        createdAt: "2026-03-15T08:39:00.000Z"
      },
      {
        id: "REL-D-011",
        kind: "fact-supports-question",
        from: "f-org-016",
        to: "Q-1-04",
        why: "Operator understanding of site safety after mitigations bears on duty beyond minimum compliance.",
        createdAt: "2026-03-15T08:40:00.000Z"
      },
      {
        id: "REL-D-012",
        kind: "assumption-fills-gap",
        from: "A-4-01",
        to: "M-3-01",
        why: "We use this assumption to proceed while flagging equipment-status uncertainty for review.",
        createdAt: "2026-03-15T09:02:00.000Z"
      },
      {
        id: "REL-D-013",
        kind: "assumption-fills-gap",
        from: "A-4-02",
        to: "M-3-02",
        why: "Links tentative organizational intent to the missing completion record we still need.",
        createdAt: "2026-03-15T09:03:00.000Z"
      },
      {
        id: "REL-D-014",
        kind: "resolution-answers-question",
        from: "R-8-01",
        to: "Q-1-01",
        why: "",
        createdAt: "2026-03-15T10:01:00.000Z"
      }
    ],
    conflicts: [
      {
        id: "CF-D-01",
        questionId: "Q-1-04",
        principleA: "p-basic-1",
        principleB: "p-emp-1",
        supportsA: "Public safety pushes toward implementing feasible protections when studies show higher hazards.",
        supportsB: "Employee ethics also includes following lawful instructions within the organization.",
        priority: "We lean toward treating safety margins as requiring action beyond paperwork, but we have not closed debate.",
        scope: "case",
        reason: "The conflict matches our question of whether meeting regulations was enough."
      }
    ],
    snapshots: [],
    hasAcceptedL3: {},
    idSeq: {}
  };
})();
