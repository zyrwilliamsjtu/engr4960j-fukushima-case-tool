#!/usr/bin/env node
"use strict";
var fs = require("fs");
var path = require("path");
var crypto = require("crypto");

var root = path.join(__dirname, "../..");
var baselinePath = path.join(__dirname, "zh-field-baseline.sha256.json");
var allowPath = path.join(__dirname, "number-allowlist.json");
var fails = 0;

function fail(msg) {
  console.log("FAIL: " + msg);
  fails++;
}
function pass(msg) {
  console.log("PASS: " + msg);
}

function sha(text) {
  return crypto.createHash("sha256").update(String(text), "utf8").digest("hex");
}

function nums(text) {
  var m = String(text || "").match(/\d+(?:\.\d+)?/g);
  return m ? m.slice().sort() : [];
}

function subset(a, b) {
  return a.every(function (n) {
    return b.indexOf(n) >= 0;
  });
}

global.window = {};
require(path.join(root, "src/data/fukushima.js"));
var d = window.CASE_DATA;

if (!fs.existsSync(baselinePath)) fail("missing zh-field-baseline.sha256.json");
else {
  var baseline = JSON.parse(fs.readFileSync(baselinePath, "utf8"));
  var current = {};
  function set(k, v) {
    if (v != null && typeof v === "string") current[k] = sha(v);
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
  var ok = true;
  Object.keys(baseline).forEach(function (k) {
    if (baseline[k] !== current[k]) {
      ok = false;
      fail("Chinese hash changed " + k);
    }
  });
  if (ok) pass("Chinese field hashes match baseline");
}

var cjk = /[\u4e00-\u9fff]/;
function walkEn(o, p) {
  if (!o || typeof o !== "object") return;
  if (Array.isArray(o)) return o.forEach(function (x, i) {
    walkEn(x, p + "[" + i + "]");
  });
  Object.keys(o).forEach(function (k) {
    if (k.endsWith("En") && typeof o[k] === "string" && cjk.test(o[k])) {
      fail("CJK in En field " + p + "." + k);
    }
    walkEn(o[k], p + "." + k);
  });
}
var cjkEnFails = fails;
walkEn(d, "CASE_DATA");
if (fails === cjkEnFails) pass("En fields contain no CJK (scan complete)");

var allow = fs.existsSync(allowPath) ? JSON.parse(fs.readFileSync(allowPath, "utf8")) : [];
var allowIds = {};
allow.forEach(function (row) {
  if (row && row.id) allowIds[row.id] = row.reason || "allowed";
});

var numFails = 0;
function checkPair(id, quote, en) {
  if (!quote || !en) return;
  var qn = nums(quote);
  var enN = nums(en);
  if (!subset(qn, enN)) {
    if (allowIds[id]) return;
    numFails++;
    fail("number mismatch " + id + " quote=" + qn.join(",") + " en=" + enN.join(","));
  }
}
d.facts.forEach(function (f) {
  checkPair(f.id, f.quote, f.textEn);
});
d.timeline.forEach(function (t) {
  checkPair(t.id, t.quote, t.eventEn);
});
(d.assessments || []).forEach(function (a) {
  checkPair(a.id, a.quote, a.textEn);
});
if (!numFails) pass("quote number tokens subset in En fields");

if (d.meta.dataVersion !== "2.2") fail("dataVersion " + d.meta.dataVersion);
else pass("dataVersion 2.2");

console.log("---");
console.log("SUMMARY: FAIL=" + fails);
process.exit(fails ? 1 : 0);
