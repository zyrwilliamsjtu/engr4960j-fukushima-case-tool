/**
 * 静态数据自检（无依赖）
 */
var fs = require("fs");
var path = require("path");

var root = path.join(__dirname, "..");
global.window = {};
require(path.join(root, "src/data/fukushima.js"));

var d = window.CASE_DATA;
var fails = 0;

function pass(msg) {
  console.log("PASS: " + msg);
}
function fail(msg) {
  console.log("FAIL: " + msg);
  fails++;
}

var sourceIds = {};
d.sources.forEach(function (s) {
  sourceIds[s.id] = true;
});

function checkSourceRefs(arr, label) {
  arr.forEach(function (row) {
    if (!sourceIds[row.sourceId]) {
      fail(label + " " + row.id + " missing sourceId " + row.sourceId);
    }
  });
}

checkSourceRefs(d.timeline, "timeline");
checkSourceRefs(d.facts, "facts");
checkSourceRefs(d.assessments || [], "assessments");

function dupIds(arr, label) {
  var seen = {};
  arr.forEach(function (row) {
    if (seen[row.id]) fail("duplicate id " + row.id + " in " + label);
    seen[row.id] = true;
  });
}

dupIds(d.timeline, "timeline");
dupIds(d.facts, "facts");
dupIds(d.assessments || [], "assessments");

if (d.principles.length === 33) pass("principles.length === 33");
else fail("principles.length === " + d.principles.length + " (expected 33)");

if (d.steps.length === 10) pass("steps.length === 10");
else fail("steps.length === " + d.steps.length + " (expected 10)");

if (d.steps[7].referenceLevel3 === null) pass("steps[7].referenceLevel3 === null");
else fail("steps[7].referenceLevel3 should be null");

var mat = 0,
  ind = 0,
  org = 0;
d.facts.forEach(function (f) {
  if (f.categories.indexOf("material") >= 0) mat++;
  if (f.categories.indexOf("individual") >= 0) ind++;
  if (f.categories.indexOf("organization") >= 0) org++;
});

console.log(
  "COUNTS: timeline=" +
    d.timeline.length +
    " facts=" +
    d.facts.length +
    " (material=" +
    mat +
    " individual=" +
    ind +
    " organization=" +
    org +
    ") assessments=" +
    (d.assessments ? d.assessments.length : 0) +
    " sources=" +
    d.sources.length
);

var draft = fs.readFileSync(
  path.join(root, "docs/research/fukushima-facts-draft.md"),
  "utf8"
);
var draftIds = new Set();
draft.split("\n").forEach(function (line) {
  if (line.indexOf("|") !== 0) return;
  var parts = line.split("|");
  var id = parts[1] ? parts[1].trim() : "";
  if (/^(tl-\d+|f-mat-\d+|f-ind-\d+|f-org-\d+|ev-\d+)$/.test(id)) {
    draftIds.add(id);
  }
});

var dataIds = new Set();
d.timeline.forEach(function (r) {
  dataIds.add(r.id);
});
d.facts.forEach(function (r) {
  dataIds.add(r.id);
});
(d.assessments || []).forEach(function (r) {
  dataIds.add(r.id);
});

var missing = [];
draftIds.forEach(function (id) {
  if (!dataIds.has(id)) missing.push(id);
});
var extra = [];
dataIds.forEach(function (id) {
  if (!draftIds.has(id)) extra.push(id);
});

console.log(
  "DRAFT_COMPARE: 草稿有但数据缺失=" +
    missing.length +
    (missing.length ? " [" + missing.join(", ") + "]" : "")
);
console.log(
  "DRAFT_COMPARE: 数据有但草稿没有=" +
    extra.length +
    (extra.length ? " [" + extra.join(", ") + "]" : "")
);

if (missing.length === 0) pass("draft ids all present in CASE_DATA");
else fail("draft ids missing in CASE_DATA");

if (extra.length === 0) pass("no extra ids beyond draft");
else fail("extra ids not in draft");

if (d.meta.dataVersion === "2.1") pass("dataVersion 2.1");
else fail("dataVersion " + d.meta.dataVersion);

function normalizeText(s) {
  if (!s) return "";
  var t = s.trim().replace(/\s+/g, " ");
  t = t.replace(/\\\|/g, "|");
  var map = {
    ",": "，",
    ".": "。",
    ";": "；",
    ":": "：",
    "!": "！",
    "?": "？",
    "(": "（",
    ")": "）"
  };
  t = t.replace(/[,.;:!?()]/g, function (ch) {
    return map[ch] || ch;
  });
  return t.toLowerCase();
}

function extractDraftTexts(md) {
  var byId = {};
  var section = "";
  md.split("\n").forEach(function (line) {
    if (line.indexOf("## 2. 时间线") === 0) section = "timeline";
    else if (line.indexOf("## 3. 事实：物质") === 0) section = "facts";
    else if (line.indexOf("## 4. 事实：个人") === 0) section = "facts";
    else if (line.indexOf("## 5. 事实：组织") === 0) section = "facts";
    else if (line.indexOf("## 7. 评估性内容") === 0) section = "assessments";
    else if (line.indexOf("## 6.") === 0) section = "";

    if (line.indexOf("|") !== 0 || section === "") return;
    var parts = line.split("|");
    if (parts.length < 4) return;
    var id = parts[1] ? parts[1].trim() : "";
    if (!/^(tl-\d+|f-mat-\d+|f-ind-\d+|f-org-\d+|ev-\d+)$/.test(id)) return;
    var text = "";
    if (section === "timeline") text = (parts[3] || "").trim();
    else if (section === "facts") text = (parts[2] || "").trim();
    else if (section === "assessments") text = (parts[2] || "").trim();
    if (text && text.indexOf("---") !== 0 && text.indexOf("编号") !== 0) {
      byId[id] = text;
    }
  });
  return byId;
}

var draftTexts = extractDraftTexts(draft);
var diffs = [];

function dataTextForId(id) {
  var i;
  for (i = 0; i < d.timeline.length; i++) {
    if (d.timeline[i].id === id) return d.timeline[i].event;
  }
  for (i = 0; i < d.facts.length; i++) {
    if (d.facts[i].id === id) return d.facts[i].text;
  }
  for (i = 0; i < (d.assessments || []).length; i++) {
    if (d.assessments[i].id === id) return d.assessments[i].text;
  }
  return null;
}

Object.keys(draftTexts).forEach(function (id) {
  var draftT = normalizeText(draftTexts[id]);
  var dataT = normalizeText(dataTextForId(id) || "");
  if (draftT !== dataT) {
    diffs.push({ id: id, draft: draftTexts[id], data: dataTextForId(id) || "" });
  }
});

console.log("TEXT_DIFF: 不一致=" + diffs.length);
var show = diffs.slice(0, 20);
show.forEach(function (row) {
  console.log(row.id + " | 草稿：" + row.draft + " | 数据：" + row.data);
});
if (diffs.length > 20) {
  console.log("TEXT_DIFF: （另 " + (diffs.length - 20) + " 条未列出）");
}

console.log("---");
console.log("SUMMARY: FAIL=" + fails);
process.exit(fails ? 1 : 0);
