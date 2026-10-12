#!/usr/bin/env node
"use strict";
var fs = require("fs");
var path = require("path");
var root = path.join(__dirname, "../..");
var dataPath = path.join(root, "src/data/fukushima.js");
var mt = fs.readFileSync(path.join(root, "src/ui/material-translations.js"), "utf8");
var copy = {};
var re = /^\s*"((?:\\.|[^"\\])*)"\s*:\s*"((?:\\.|[^"\\])*)"\s*,?\s*$/gm;
var m;
while ((m = re.exec(mt))) {
  copy[JSON.parse('"' + m[1].replace(/\\/g, "\\\\") + '"')] = JSON.parse(
    '"' + m[2].replace(/\\/g, "\\\\") + '"'
  );
}

global.window = {};
require(dataPath);
var d = window.CASE_DATA;
var patches = [];

function add(id, field, enKey, zhValue) {
  var en = copy[zhValue];
  if (!en) return;
  patches.push({ id: id, field: field, enKey: enKey, en: en });
}

["facts", "timeline"].forEach(function (kind) {
  (d[kind] || []).forEach(function (row) {
    if (row.locator && /[\u4e00-\u9fff]/.test(row.locator) && !row.locatorEn) {
      add(row.id, "locator", "locatorEn", row.locator);
    }
    if (row.note && /[\u4e00-\u9fff]/.test(row.note) && !row.noteEn) {
      add(row.id, "note", "noteEn", row.note);
    }
    if (row.date && /[\u4e00-\u9fff]/.test(row.date) && !row.dateEn) {
      add(row.id, "date", "dateEn", row.date);
    }
  });
});

var text = fs.readFileSync(dataPath, "utf8");
var n = 0;
patches.forEach(function (p) {
  var idRe = new RegExp('("id": "' + p.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + '"[\\s\\S]*?"' + p.field + '": )"((?:\\\\.|[^"\\\\])*)"');
  if (!idRe.test(text)) {
    console.warn("skip no match", p.id, p.field);
    return;
  }
  text = text.replace(idRe, function (full, prefix, inner) {
    if (text.indexOf('"id": "' + p.id + '"') < 0) return full;
    var blockStart = text.indexOf('"id": "' + p.id + '"');
    var block = text.slice(blockStart, blockStart + 2500);
    if (block.indexOf('"' + p.enKey + '"') >= 0) return full;
    n++;
    var esc = JSON.stringify(p.en);
    return prefix + '"' + inner + '",\n        "' + p.enKey + '": ' + esc;
  });
});
if (process.argv.includes("--write")) {
  fs.writeFileSync(dataPath, text, "utf8");
  console.log("Applied", n, "En field insertions to fukushima.js");
} else {
  console.log("Dry run:", patches.length, "candidates,", n, "would insert");
}
