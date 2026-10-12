/**
 * Demo user state (stateVersion 2.0) for dist/index.demo.html only.
 * Sample group-style analysis in English — not a model answer. Step 8 conclusions empty.
 */
(function () {
  "use strict";
  window.DEMO_USER_STATE = {
    demoPackId: "engr4960j-fukushima-demo-pack-v1",
    stateVersion: "2.0",
    caseId: "fukushima",
    currentStep: 3,
    startedAt: "2026-03-01T08:00:00.000Z",
    updatedAt: "2026-03-01T10:30:00.000Z",
    authorship: {
      notes: ["Group sample: records below illustrate how we use the tool, not course conclusions."],
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
        text: "Should TEPCO have communicated site risks to nearby residents more proactively while information was still incomplete?",
        actors: ["Nearby residents", "TEPCO site and headquarters staff"],
        isCore: true,
        focusReason:
          "Our group prioritizes this because it links public disclosure timing to emergency decisions we track in later steps.",
        createdAt: "2026-03-01T08:05:00.000Z",
        updatedAt: "2026-03-01T08:20:00.000Z"
      },
      "Q-1-02": {
        id: "Q-1-02",
        type: "Q",
        step: 1,
        text: "When field instructions conflict with an engineer's safety judgment, how should the individual act?",
        actors: ["Field engineers", "Supervisors"],
        isCore: true,
        focusReason:
          "We want to compare organizational pressure with professional judgment without assuming either side is automatically right.",
        createdAt: "2026-03-01T08:06:00.000Z",
        updatedAt: "2026-03-01T08:21:00.000Z"
      },
      "Q-1-03": {
        id: "Q-1-03",
        type: "Q",
        step: 1,
        text: "Did regulatory arrangements before the accident adequately separate nuclear promotion from safety oversight?",
        actors: ["NISA", "METI", "Operators"],
        isCore: false,
        createdAt: "2026-03-01T08:07:00.000Z",
        updatedAt: "2026-03-01T08:07:00.000Z"
      },
      "Q-1-04": {
        id: "Q-1-04",
        type: "Q",
        step: 1,
        text: "Should tsunami and seismic design margins have been updated faster once post-2002 reassessments exceeded the original licensing basis?",
        actors: ["Design engineers", "Regulators"],
        isCore: false,
        createdAt: "2026-03-01T08:08:00.000Z",
        updatedAt: "2026-03-01T08:08:00.000Z"
      },
      "Q-1-05": {
        id: "Q-1-05",
        type: "Q",
        step: 1,
        text: "Were evacuation and public messaging feasible given earthquake and tsunami damage to communications?",
        actors: ["Local residents", "Government responders"],
        isCore: false,
        createdAt: "2026-03-01T08:09:00.000Z",
        updatedAt: "2026-03-01T08:09:00.000Z"
      },
      "M-3-01": {
        id: "M-3-01",
        type: "M",
        step: 3,
        text: "Within the first 72 hours, was hydrogen risk across units summarized through one decision channel?",
        createdAt: "2026-03-01T08:40:00.000Z",
        updatedAt: "2026-03-01T08:40:00.000Z"
      },
      "M-3-02": {
        id: "M-3-02",
        type: "M",
        step: 3,
        text: "Is there a verifiable timeline gap between public statements and internal engineering assessments?",
        createdAt: "2026-03-01T08:41:00.000Z",
        updatedAt: "2026-03-01T08:41:00.000Z"
      },
      "A-4-01": {
        id: "A-4-01",
        type: "A",
        step: 4,
        text: "We tentatively assume early external wording reflected what was known at the time, not the full later picture.",
        basisRefs: ["M-3-02", "f-org-001"],
        createdAt: "2026-03-01T09:00:00.000Z",
        updatedAt: "2026-03-01T09:05:00.000Z"
      },
      "A-4-02": {
        id: "A-4-02",
        type: "A",
        step: 4,
        text: "We tentatively assume personnel had to decide under incomplete information when equipment was not arranged for the actual scenario.",
        basisRefs: ["M-3-01", "f-mat-002"],
        createdAt: "2026-03-01T09:01:00.000Z",
        updatedAt: "2026-03-01T09:06:00.000Z"
      },
      "C-5-01": {
        id: "C-5-01",
        type: "C",
        step: 5,
        word: "Responsibility",
        others: "Others may mean legal liability or post hoc blame.",
        mine: "In our analysis, responsibility means information and safety duties at a specific decision moment.",
        createdAt: "2026-03-01T09:10:00.000Z",
        updatedAt: "2026-03-01T09:10:00.000Z"
      },
      "C-5-02": {
        id: "C-5-02",
        type: "C",
        step: 5,
        word: "Safety",
        others: "Public discussion sometimes mixes immediate health risk with long-term environmental risk.",
        mine: "We separate operational safety, radiological protection, and social trust from transparent updates.",
        createdAt: "2026-03-01T09:11:00.000Z",
        updatedAt: "2026-03-01T09:11:00.000Z"
      },
      "PA-6-01": {
        id: "PA-6-01",
        type: "PA",
        step: 6,
        principleId: "p-basic-1",
        appliesTo: ["Q-1-01"],
        text: "Public safety suggests delayed information can itself expose people to foreseeable harm.",
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
        text: "Truthful disclosure requires separating 'not yet confirmed' from deliberate withholding — we still debate the boundary.",
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
        text: "Employee ethics reminds us that following lawful orders and refusing clearly unsafe orders can both arise.",
        order: 3,
        createdAt: "2026-03-01T09:32:00.000Z",
        updatedAt: "2026-03-01T09:32:00.000Z"
      },
      "RC-9-01": {
        id: "RC-9-01",
        type: "RC",
        step: 9,
        text: "Extreme disaster and communication loss compressed the decision window but does not automatically remove disclosure duties.",
        alternatives:
          "Branches we discuss: earlier layered release of known facts, parallel independent verification, and frequent updates with careful wording.",
        mitigationJudgment:
          "Constraints exist, but we still need to say which actions were feasible with knowledge and resources available then.",
        createdAt: "2026-03-01T10:00:00.000Z",
        updatedAt: "2026-03-01T10:05:00.000Z"
      },
      "AV-10-01": {
        id: "AV-10-01",
        type: "AV",
        step: 10,
        text: "Institutionalize drills that combine extreme external events with multiple on-site failures.",
        createdAt: "2026-03-01T10:10:00.000Z",
        updatedAt: "2026-03-01T10:10:00.000Z"
      },
      "AV-10-02": {
        id: "AV-10-02",
        type: "AV",
        step: 10,
        text: "Use a cross-department confirmation path for public statements to reduce inconsistent messaging.",
        createdAt: "2026-03-01T10:11:00.000Z",
        updatedAt: "2026-03-01T10:11:00.000Z"
      },
      "AV-10-03": {
        id: "AV-10-03",
        type: "AV",
        step: 10,
        text: "Give engineers a clear channel to raise professional dissent during emergencies with explicit protection expectations.",
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
        why: "Six units on one site helps us discuss whether risk accumulated across multiple reactors.",
        createdAt: "2026-03-01T08:30:00.000Z"
      },
      {
        id: "REL-D-002",
        kind: "fact-supports-question",
        from: "f-mat-002",
        to: "Q-1-02",
        why: "Improvised response and equipment gaps show decisions made with incomplete information.",
        createdAt: "2026-03-01T08:31:00.000Z"
      },
      {
        id: "REL-D-003",
        kind: "fact-supports-question",
        from: "f-mat-003",
        to: "Q-1-01",
        why: "Unit-level conditions keep us from treating the accident as a single-point story.",
        createdAt: "2026-03-01T08:32:00.000Z"
      },
      {
        id: "REL-D-004",
        kind: "fact-supports-question",
        from: "f-ind-001",
        to: "Q-1-02",
        why: "Individual records help ask who knew what, not only abstract organization labels.",
        createdAt: "2026-03-01T08:33:00.000Z"
      },
      {
        id: "REL-D-005",
        kind: "fact-supports-question",
        from: "f-ind-002",
        to: "Q-1-01",
        why: "Order of information receipt may affect whether the public was told promptly.",
        createdAt: "2026-03-01T08:34:00.000Z"
      },
      {
        id: "REL-D-006",
        kind: "fact-supports-question",
        from: "f-ind-003",
        to: "Q-1-02",
        why: "We compare roles in command chains without settling on one correct action yet.",
        createdAt: "2026-03-01T08:35:00.000Z"
      },
      {
        id: "REL-D-007",
        kind: "fact-supports-question",
        from: "f-org-001",
        to: "Q-1-01",
        why: "Operator identity anchors who bears disclosure responsibilities.",
        createdAt: "2026-03-01T08:36:00.000Z"
      },
      {
        id: "REL-D-008",
        kind: "fact-supports-question",
        from: "f-org-003",
        to: "Q-1-01",
        why: "Coordination problems relate directly to whether risks were explained proactively.",
        createdAt: "2026-03-01T08:37:00.000Z"
      },
      {
        id: "REL-D-009",
        kind: "fact-supports-question",
        from: "f-org-008",
        to: "Q-1-02",
        why: "Response structure affects whether an individual can pause or escalate an action.",
        createdAt: "2026-03-01T08:38:00.000Z"
      },
      {
        id: "REL-D-010",
        kind: "assumption-fills-gap",
        from: "A-4-01",
        to: "M-3-02",
        why: "We use this assumption to move discussion forward and flag it for step 7 review.",
        createdAt: "2026-03-01T09:02:00.000Z"
      },
      {
        id: "REL-D-011",
        kind: "assumption-fills-gap",
        from: "A-4-02",
        to: "M-3-01",
        why: "Basis links to cited facts and gaps; still tentative.",
        createdAt: "2026-03-01T09:03:00.000Z"
      }
    ],
    conflicts: [
      {
        id: "CF-D-01",
        questionId: "Q-1-02",
        principleA: "p-basic-1",
        principleB: "p-emp-1",
        supportsA: "Public safety pushes toward reducing foreseeable harm quickly.",
        supportsB: "Employee ethics also involves command discipline and avoiding chaotic unilateral action.",
        priority: "We present the conflict side by side before giving our group judgment in step 8.",
        scope: "case",
        reason: "The tension is specific to this scenario and not easy to eliminate by wording alone."
      }
    ],
    snapshots: [],
    hasAcceptedL3: {},
    idSeq: {}
  };
})();
