#!/usr/bin/env node
"use strict";
var fs = require("fs");
var path = require("path");
var root = path.join(__dirname, "../..");
global.window = {};
require(path.join(root, "src/data/fukushima.js"));
var d = window.CASE_DATA;

var mt = fs.readFileSync(path.join(root, "src/ui/material-translations.js"), "utf8");
var copy = {};
var re = /^\s*"((?:\\.|[^"\\])*)"\s*:\s*"((?:\\.|[^"\\])*)"\s*,?\s*$/gm;
var m;
while ((m = re.exec(mt))) {
  copy[JSON.parse('"' + m[1].replace(/\\/g, "\\\\") + '"')] = JSON.parse(
    '"' + m[2].replace(/\\/g, "\\\\") + '"'
  );
}

function rows() {
  var out = [];
  ["facts", "timeline", "sources", "principles", "valueWords"].forEach(function (k) {
    (d[k] || []).forEach(function (r) {
      out.push({ kind: k, row: r });
    });
  });
  return out;
}

var needMigrate = [];
var canDrop = [];
var mismatch = [];

Object.keys(copy).forEach(function (zh) {
  var en = copy[zh];
  var found = false;
  rows().forEach(function (x) {
    ["text", "event", "title", "note", "locator", "name", "desc", "word", "whyVague"].forEach(function (f) {
      if (x.row[f] !== zh) return;
      found = true;
      var enKey = f + "En";
      var fromData = x.row[enKey];
      if (f === "desc" && x.kind === "principles") fromData = x.row.descEn;
      if (fromData && fromData.trim()) {
        if (fromData.replace(/\s+/g, " ").trim() !== en.replace(/\s+/g, " ").trim()) {
          mismatch.push({ id: x.row.id, field: f, data: fromData.slice(0, 80), copy: en.slice(0, 80) });
        } else canDrop.push({ id: x.row.id, field: f, zh: zh.slice(0, 40) });
      } else {
        needMigrate.push({ id: x.row.id, kind: x.kind, field: f, zh: zh.slice(0, 60), en: en.slice(0, 80) });
      }
    });
  });
  if (!found) {
    needMigrate.push({ id: "(orphan)", kind: "-", field: "-", zh: zh.slice(0, 60), en: en.slice(0, 80) });
  }
});

console.log("canDrop", canDrop.length);
console.log("needMigrate", needMigrate.length);
console.log("mismatch", mismatch.length);
console.log("--- needMigrate sample ---");
needMigrate.slice(0, 15).forEach(function (r) {
  console.log(r.id, r.field, r.zh);
});
console.log("--- mismatch sample ---");
mismatch.slice(0, 10).forEach(function (r) {
  console.log(r.id, r.field);
});
fs.writeFileSync(
  path.join(__dirname, "material-unify-report.json"),
  JSON.stringify({ canDrop, needMigrate, mismatchCount: mismatch.length }, null, 2),
  "utf8"
);
