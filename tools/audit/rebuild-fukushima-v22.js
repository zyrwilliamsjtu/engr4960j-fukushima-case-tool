#!/usr/bin/env node
"use strict";
var fs = require("fs");
var path = require("path");
var crypto = require("crypto");

var root = path.join(__dirname, "../..");
var outPath = path.join(root, "src/data/fukushima.js");
var baselinePath = path.join(__dirname, "zh-field-baseline.sha256.json");

function sha(text) {
  return crypto.createHash("sha256").update(String(text), "utf8").digest("hex");
}

function cleanQuote(quote) {
  if (!quote) return "";
  return String(quote)
    .replace(/\[\d+\]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function textEnFromQuote(quote, maxParts) {
  var t = cleanQuote(quote);
  if (!t) return "";
  if (!maxParts) return t;
  var parts = t.match(/[^.!?]+[.!?]+/g);
  if (!parts) return t.slice(0, 800);
  return parts.slice(0, maxParts).join(" ").trim();
}

function collectZhHashes(d) {
  var h = {};
  function set(path, val) {
    if (val != null && typeof val === "string") h[path] = sha(val);
  }
  d.timeline.forEach(function (r) {
    set("timeline." + r.id + ".event", r.event);
  });
  d.facts.forEach(function (r) {
    set("facts." + r.id + ".text", r.text);
    set("facts." + r.id + ".note", r.note);
  });
  (d.assessments || []).forEach(function (r) {
    set("assessments." + r.id + ".text", r.text);
  });
  d.principles.forEach(function (p) {
    set("principles." + p.id + ".desc", p.desc);
    set("principles." + p.id + ".name", p.name);
  });
  d.valueWords.forEach(function (w) {
    set("valueWords." + w.id + ".word", w.word);
    set("valueWords." + w.id + ".whyVague", w.whyVague);
  });
  d.constraints.forEach(function (c) {
    set("constraints." + c.id + ".label", c.label);
    set("constraints." + c.id + ".desc", c.desc);
  });
  d.biasChecks.forEach(function (b) {
    set("biasChecks." + b.id + ".label", b.label);
  });
  d.reviewPrompts.forEach(function (r) {
    set("reviewPrompts." + r.id + ".label", r.label);
  });
  d.steps.forEach(function (s) {
    set("steps." + s.id + ".name", s.name);
    set("steps." + s.id + ".intro", s.intro);
    (s.prompts || []).forEach(function (p, i) {
      set("steps." + s.id + ".prompts." + i, p.text);
    });
    (s.fields || []).forEach(function (f, i) {
      set("steps." + s.id + ".fields." + i + ".label", f.label);
      if (f.hint) set("steps." + s.id + ".fields." + i + ".hint", f.hint);
    });
    if (s.referenceLevel3 && s.referenceLevel3.body) {
      set("steps." + s.id + ".referenceLevel3.body", s.referenceLevel3.body);
    }
  });
  set("meta.title", d.meta.title);
  d.sources.forEach(function (s) {
    set("sources." + s.id + ".title", s.title);
    set("sources." + s.id + ".note", s.note);
  });
  return h;
}

function verifyZhUnchanged(before, d) {
  var after = collectZhHashes(d);
  Object.keys(before).forEach(function (k) {
    if (before[k] !== after[k]) {
      throw new Error("Chinese field changed: " + k);
    }
  });
}

global.window = {};
require(outPath);
var d = window.CASE_DATA;
var zhBefore = collectZhHashes(d);
if (!fs.existsSync(baselinePath)) {
  fs.writeFileSync(baselinePath, JSON.stringify(zhBefore, null, 2), "utf8");
}

var stepNameEn = [
  "Identify ethical issues",
  "Narrow the focus",
  "Determine relevant and missing facts",
  "Make reasonable assumptions",
  "Undertake definitional clarification",
  "Conduct ethical analysis",
  "Review the process",
  "Resolve the issue",
  "Identify practical constraints",
  "Avoid ethical problems"
];

d.meta.dataVersion = "2.2";
d.meta.dataUpdatedAt = "2026-10-12";
d.meta.titleEn = "Fukushima Daiichi Nuclear Accident";

d.sources.forEach(function (s) {
  if (s.id === "src-003") {
    s.titleEn = "The Fukushima Daiichi Accident (catalog STI/PUB/1710)";
    s.noteEn = "Bibliographic metadata only; not used as factual evidence.";
  } else if (s.id === "src-004") {
    s.titleEn =
      "Official Report of the Fukushima Nuclear Accident Independent Investigation Commission (NAIIC summary, English)";
    s.noteEn = "Local PDF provided by instructor (archived).";
  } else if (s.id === "src-005") {
    s.titleEn = "TEPCO accident-related attachments (120620e0106: seismic evaluation archives, etc.)";
    s.noteEn = "Local PDF provided by instructor (archived).";
  } else {
    s.titleEn = s.title;
  }
});

d.timeline.forEach(function (r) {
  r.eventEn = textEnFromQuote(r.quote, 0);
});

d.facts.forEach(function (f) {
  f.textEn = textEnFromQuote(f.quote, 0);
  if (f.note && /核验/.test(f.note)) {
    f.noteEn = "Source cross-check recorded in the case pack.";
  }
});

(d.assessments || []).forEach(function (a) {
  a.textEn = textEnFromQuote(a.quote, 0);
});

d.principles.forEach(function (p) {
  p.descEn = p.nameEn ? p.nameEn.charAt(0).toUpperCase() + p.nameEn.slice(1) + "." : "";
});

var valueWordEn = [
  ["Responsibility", "Legal, moral, and organizational responsibilities may differ."],
  ["Safety", "May refer to personal, environmental, or reliability standards depending on context."],
  ["Compliance", "May mean minimum legal rules or higher professional standards."],
  ["Transparency", "May mean information disclosure or visibility of decision processes."]
];
d.valueWords.forEach(function (w, i) {
  w.wordEn = valueWordEn[i][0];
  w.whyVagueEn = valueWordEn[i][1];
});

var constraintEn = [
  ["Deep cultural norms", "Long-standing informal norms may shape perceived options."],
  ["Organizational pressure", "Pressure does not automatically reduce responsibility."],
  ["Information asymmetry", "Different actors knew different facts at different times."],
  ["Time pressure", "Explain alternatives feasible within the decision window."],
  ["Career risk", "Career consequences and ethical duty require separate reasoning."]
];
d.constraints.forEach(function (c, i) {
  c.labelEn = constraintEn[i][0];
  c.descEn = constraintEn[i][1];
});

var biasEn = [
  "Have we overlooked a category of facts?",
  "Have we left a key term ambiguous?",
  "Are assumptions clearly distinguished from facts?",
  "Does the reasoning contain contradictions?",
  "Have we considered other perspectives?"
];
d.biasChecks.forEach(function (b, i) {
  b.labelEn = biasEn[i];
});

d.reviewPrompts.forEach(function (r, i) {
  r.labelEn = biasEn[i];
});

d.steps.forEach(function (s) {
  s.nameEn = stepNameEn[s.id - 1];
  var introEn = {
    1: "List ethical issues for this case. The textbook suggests phrasing them as questions for later focus and analysis.",
    2: "Choose two issues from step 1 as core questions and explain why they matter.",
    3: "Separate relevant facts (material, individual, organizational) from missing information.",
    4: "State reasonable assumptions where information is missing; link each to supporting material and inference reasons.",
    5: "Clarify value-laden terms: how others might read them and how your team uses them here.",
    6: "Select applicable principles, explain relevance, and examine conflicts and priorities.",
    7: "Review steps 1–6, mark items to revisit, and record why you changed or kept your entries.",
    8: "For each core question from step 2, write your judgment and brief justification. The tool does not suggest wording.",
    9: "Record practical constraints, feasible alternatives at the time, and whether they affect responsibility.",
    10: "Propose preventive actions that could reduce similar ethical risks in the future."
  };
  s.introEn = introEn[s.id];
  var promptEn = {
    "你能否把每条伦理关切写成问句（含「是否/应该」或问号）？":
      "Can you phrase each ethical concern as a question (using whether/should or a question mark)?",
    "选 2 条时，完整性是否优于广度？": "When choosing two issues, is depth more important than breadth?",
    "三类分类是启发式的——同一条事实可否同时属于多个类别？":
      "The three categories are heuristic—can one fact belong to more than one category?",
    "假设能否是「开放式」的？依据应指向哪些条目或来源？":
      "Can an assumption stay open-ended? What entries or sources should support it?",
    "至少澄清 2 个词；可从候选词中选，也可自建。":
      "Clarify at least two terms; pick from candidates or add your own.",
    "选了 ≥2 条原则时，它们在本案某问题上是否冲突？":
      "If you selected two or more principles, do they conflict on a question in this case?",
    "案例分析是迭代过程——哪些条目需要回到上游修改？":
      "Analysis is iterative—which entries should you revisit upstream?",
    "每条核心问题是否都有对应的结论与理由？":
      "Does each core question have a matching conclusion and reason?",
    "约束存在是否必然意味着责任减轻？":
      "Does a constraint automatically reduce responsibility?",
    "至少列出 3 条可操作的「应避免」事项。":
      "List at least three actionable items to avoid similar problems."
  };
  var fieldLabelEn = {
    伦理问题: "Ethical issues",
    选定的核心问题: "Selected core questions",
    "每条选定问题的理由": "Reason for each selected question",
    "改写以涵盖子问题（选填）": "Rewrite to cover subquestions (optional)",
    "相关事实与缺失": "Relevant facts and missing information",
    事实与问题的关联: "Links between facts and questions",
    合理假设: "Reasonable assumptions",
    假设与信息缺口: "Assumptions and information gaps",
    概念澄清: "Definitional clarification",
    适用原则: "Principles applied",
    原则冲突: "Principle conflicts",
    原则优先级: "Principle priorities",
    前序步骤回显: "Earlier steps (read-only)",
    偏见自查: "Bias self-check",
    复核提示: "Review prompts",
    "结论与理由": "Conclusion and justification",
    "约束条目（三问）": "Constraint entry (three questions)",
    "预置约束提示（可多选可不选）": "Preset constraint prompts (optional)",
    本案声明: "Statement for this case",
    "应避免的问题": "Problems to avoid",
    排序理由: "Ordering rationale",
    是否有原则不足: "Principles not yet covered",
    "自建原则（选填）": "Custom principles (optional)"
  };
  (s.prompts || []).forEach(function (p) {
    if (/TODO\(PI\)/.test(p.text)) {
      p.textEn = "Instructor placeholder: guided question to be supplied.";
      p.noteEnReview = "needs-manual-review";
    } else {
      p.textEn = promptEn[p.text] || p.text;
      if (/[\u4e00-\u9fff]/.test(p.textEn)) {
        p.noteEnReview = "needs-manual-review";
        p.textEn = "Review this prompt against the textbook (English wording pending).";
      }
    }
  });
  (s.fields || []).forEach(function (f) {
    f.labelEn = fieldLabelEn[f.label] || f.label;
    if (f.hint) {
      f.hintEn = f.hint.replace("建议问句形式；涉及主体选填", "Use question form; actors optional.");
      if (/[\u4e00-\u9fff]/.test(f.hint)) {
        f.noteEnReview = "needs-manual-review";
        f.hintEn = "See textbook for field guidance (English hint pending).";
      }
    }
  });
  if (s.referenceLevel3 && s.referenceLevel3.body) {
    s.referenceLevel3.bodyEn =
      "Textbook explanation for this step (awaiting instructor excerpt in English).";
    s.referenceLevel3.noteEnReview = "needs-manual-review";
  }
});

verifyZhUnchanged(zhBefore, d);

var principles = d.principles;
var steps = d.steps;
var caseData = {
  meta: d.meta,
  sources: d.sources,
  timeline: d.timeline,
  facts: d.facts,
  assessments: d.assessments,
  valueWords: d.valueWords,
  constraints: d.constraints,
  biasChecks: d.biasChecks,
  reviewPrompts: d.reviewPrompts
};

var header =
  "/**\n * Fukushima case static data (contract v2.2, dataVersion 2.2).\n * Chinese fields are authoritative; English ...En fields are optional display overlays.\n */\n(function () {\n  'use strict';\n";

var body =
  header +
  "  var principles = " +
  JSON.stringify(principles, null, 2).replace(/\n/g, "\n  ") +
  ";\n\n  var steps = " +
  JSON.stringify(steps, null, 2).replace(/\n/g, "\n  ") +
  ";\n\n  window.CASE_DATA = " +
  JSON.stringify(caseData, null, 2).replace(/\n/g, "\n  ") +
  ";\n  window.CASE_DATA.principles = principles;\n  window.CASE_DATA.steps = steps;\n})();\n";

fs.writeFileSync(outPath, body, "utf8");
console.log("Wrote", outPath, "dataVersion", d.meta.dataVersion);
