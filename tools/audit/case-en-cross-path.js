#!/usr/bin/env node
"use strict";
var fs = require("fs");
var path = require("path");
var root = path.join(__dirname, "../..");

global.window = global;
require(path.join(root, "src/data/fukushima.js"));
require(path.join(root, "src/ui/case-text.js"));
require(path.join(root, "src/ui/material-translations.js"));

var d = global.CASE_DATA || window.CASE_DATA;
var CT = global.FieldnotesCaseText || window.FieldnotesCaseText;
var MT = global.FieldnotesMaterials || window.FieldnotesMaterials;
var fails = 0;

function norm(s) {
  return String(s || "")
    .replace(/\s+/g, " ")
    .trim();
}

function eq(a, b, label) {
  if (norm(a) !== norm(b)) {
    console.log("FAIL: cross-path " + label);
    console.log("  case-text: " + norm(a).slice(0, 120));
    console.log("  materials: " + norm(b).slice(0, 120));
    fails++;
  }
}

function sample(arr, n) {
  return arr.filter(function (_, i) {
    return i % Math.max(1, Math.floor(arr.length / n)) === 0;
  }).slice(0, n);
}

sample(d.facts, 5).forEach(function (f) {
  eq(CT.fact(f, "en"), MT.text(f, "text", "en"), "facts/" + f.id);
});
sample(d.principles, 5).forEach(function (p) {
  eq(CT.principleDesc(p, "en"), MT.text(p, "desc", "en"), "principles/" + p.id);
});
sample(d.timeline, 5).forEach(function (t) {
  eq(CT.timelineEvent(t, "en"), MT.text(t, "event", "en"), "timeline/" + t.id);
});

var mtSrc = fs.readFileSync(path.join(root, "src/ui/material-translations.js"), "utf8");
var stripped = mtSrc.replace(/\/\/[^\n]*/g, "").replace(/\/\*[\s\S]*?\*\//g, "");
if (/["'`][A-Za-z][^"'`]{35,}["'`]/.test(stripped)) {
  console.log("FAIL: material-translations.js still contains literal English sentences");
  fails++;
} else {
  console.log("PASS: material-translations.js delegates (no literal English content map)");
}

if (!fails) console.log("PASS: step workbook vs materials English text match (sampled)");
console.log("---");
console.log("SUMMARY: FAIL=" + fails);
process.exit(fails ? 1 : 0);
