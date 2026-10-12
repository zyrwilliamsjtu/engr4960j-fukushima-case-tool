#!/usr/bin/env node
"use strict";
var fs = require("fs");
var path = require("path");
var root = path.join(__dirname, "../..");
global.window = {};
require(path.join(root, "src/data/fukushima.js"));
var d = window.CASE_DATA;
var rows = [];
var withQuote = 0;
var withoutQuote = 0;

function push(path, zh, hasQuote, method) {
  rows.push({ path: path, zh: String(zh || "").slice(0, 20), hasQuote: hasQuote, method: method });
  if (hasQuote) withQuote++;
  else withoutQuote++;
}

d.timeline.forEach(function (t) {
  push("timeline[" + t.id + "].event", t.event, !!t.quote, t.quote ? "由 quote 重述" : "直接英译");
});
d.facts.forEach(function (f) {
  push("facts[" + f.id + "].text", f.text, !!f.quote, f.quote ? "由 quote 重述" : "直接英译");
});
(d.assessments || []).forEach(function (a) {
  push("assessments[" + a.id + "].text", a.text, !!a.quote, a.quote ? "由 quote 重述" : "直接英译");
});
d.principles.forEach(function (p) {
  push("principles[" + p.id + "].desc", p.desc, !!p.nameEn, "由 quote 重述");
});
d.valueWords.forEach(function (w, i) {
  push("valueWords[" + i + "].word", w.word, false, "直接英译");
  push("valueWords[" + i + "].whyVague", w.whyVague, false, "直接英译");
});
d.constraints.forEach(function (c, i) {
  push("constraints[" + i + "].label", c.label, false, "直接英译");
  if (c.desc) push("constraints[" + i + "].desc", c.desc, false, "直接英译");
});
d.biasChecks.forEach(function (b) {
  push("biasChecks[" + b.id + "].label", b.label, false, "直接英译");
});
d.reviewPrompts.forEach(function (r) {
  push("reviewPrompts[" + r.id + "].label", r.label, false, "直接英译");
});
d.steps.forEach(function (s) {
  push("steps[" + s.id + "].name", s.name, false, "直接英译");
  push("steps[" + s.id + "].intro", s.intro, false, "直接英译");
  (s.prompts || []).forEach(function (p, i) {
    push("steps[" + s.id + "].prompts[" + i + "].text", p.text, false, "直接英译");
  });
  (s.fields || []).forEach(function (f, i) {
    push("steps[" + s.id + "].fields[" + i + "].label", f.label, false, "直接英译");
    if (f.hint) push("steps[" + s.id + "].fields[" + i + "].hint", f.hint, false, "直接英译");
  });
  if (s.referenceLevel3 && s.referenceLevel3.body) {
    push("steps[" + s.id + "].referenceLevel3.body", s.referenceLevel3.body, false, "直接英译");
  }
});
d.sources.forEach(function (s) {
  if (/[\u4e00-\u9fff]/.test(s.title || "")) {
    push("sources[" + s.id + "].title", s.title, false, "专有名词保留罗马字");
  }
  if (s.note && /[\u4e00-\u9fff]/.test(s.note)) {
    push("sources[" + s.id + "].note", s.note, false, "直接英译");
  }
});
if (/[\u4e00-\u9fff]/.test(d.meta.title)) {
  push("meta.title", d.meta.title, false, "专有名词保留罗马字");
}

console.log("TOTAL", rows.length, "WITH_QUOTE", withQuote, "WITHOUT_QUOTE", withoutQuote);

var mdPath = path.join(root, "docs/audit/case-i18n-inventory.md");
var lines = [
  "# CASE_DATA 界面文案英译盘点",
  "",
  "统计：**" + rows.length + "** 条；有 `quote`：**" + withQuote + "**；无 `quote`：**" + withoutQuote + "**。",
  "",
  "| # | 路径 | 中文原文摘要（≤20 字） | 是否有 quote | 英文处理方式 |",
  "|---|---|---|---|---|",
];
rows.forEach(function (r, i) {
  var zh = r.zh.replace(/\|/g, "\\|").replace(/\n/g, " ");
  lines.push("| " + (i + 1) + " | `" + r.path + "` | " + zh + " | " + (r.hasQuote ? "是" : "否") + " | " + r.method + " |");
});
lines.push("");
fs.writeFileSync(mdPath, lines.join("\n"), "utf8");
console.log("Wrote", mdPath);
