#!/usr/bin/env node
"use strict";
var fs = require("fs");
var path = require("path");

var root = path.join(__dirname, "../..");
var ui = path.join(root, "src/ui");
var regText = fs.readFileSync(path.join(__dirname, "i18n-views.js"), "utf8");

var blocks = regText.split(/\{\s*id:/).slice(1);
var views = blocks.map(function (block) {
  var id = block.match(/"([^"]+)"/)[1];
  var name = (block.match(/name:\s*"([^"]*)"/) || [])[1] || id;
  var covered = /covered:\s*true/.test(block.split("open:")[0] || block);
  var reason = (block.match(/reason:\s*"([^"]*)"/) || [])[1] || "";
  return { id: id, name: name, covered: covered, reason: reason };
});

var coveredN = views.filter(function (v) { return v.covered; }).length;
var uncoveredN = views.length - coveredN;

var entries = [];
fs.readdirSync(ui).forEach(function (name) {
  if (!/\.js$/.test(name)) return;
  var rel = "src/ui/" + name;
  entries.push(rel);
});

var md = [
  "# English i18n view coverage",
  "",
  "Auto-generated. Registry: `tools/audit/i18n-views.js`.",
  "",
  "## View registry",
  "",
  "| View id | Name | Audit covered | Notes |",
  "|---|---|---|---|",
];
views.forEach(function (v) {
  md.push(
    "| `" +
      v.id +
      "` | " +
      v.name +
      " | " +
      (v.covered ? "yes" : "no") +
      " | " +
      (v.reason || "") +
      " |"
  );
});
md.push("", "## UI modules (`src/ui/*.js`)", "", entries.map(function (e) { return "- `" + e + "`"; }).join("\n"));
fs.writeFileSync(path.join(root, "docs/audit/i18n-coverage.md"), md.join("\n") + "\n", "utf8");

var viewsMd = [
  "# i18n audit view registry",
  "",
  "| # | View id | Name | Covered |",
  "|---|---|---|---|",
];
views.forEach(function (v, i) {
  viewsMd.push("| " + (i + 1) + " | `" + v.id + "` | " + v.name + " | " + (v.covered ? "yes" : "no") + " |");
});
fs.writeFileSync(path.join(root, "docs/audit/i18n-views.md"), viewsMd.join("\n") + "\n", "utf8");

console.log("I18N_COVERAGE: covered=" + coveredN + " uncovered=" + uncoveredN);
