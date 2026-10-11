/**
 * 导出/导入往返与校验（无依赖）
 */
var assert = require("assert");
var fs = require("fs");
var path = require("path");

var root = path.join(__dirname, "..");
global.window = globalThis;

require(path.join(root, "src/data/fukushima.js"));
require(path.join(root, "src/logic/ids.js"));
require(path.join(root, "src/logic/storage.js"));
require(path.join(root, "src/logic/validate.js"));
require(path.join(root, "src/logic/store.js"));
require(path.join(root, "src/logic/index.js"));
require(path.join(root, "src/ui/preview-runtime.js"));
require(path.join(root, "src/ui/applogic-runtime.js"));
require(path.join(root, "src/ui/i18n.js"));
require(path.join(root, "src/ui/case-workspaces.js"));

var pass = 0;
var fail = 0;

function ok(name, fn) {
  try {
    fn();
    console.log("PASS:", name);
    pass += 1;
  } catch (e) {
    console.log("FAIL:", name, "-", e.message);
    fail += 1;
  }
}

function freshEngine() {
  return global.AppLogicRuntime.create(global.CASE_DATA, {
    key: "engr4960j.export-import-test." + Math.random(),
    persistent: false
  });
}

function stateFingerprint(st) {
  return {
    stateVersion: st.stateVersion,
    caseId: st.caseId,
    itemCount: Object.keys(st.items).length,
    relationCount: st.relations.length,
    conflictCount: st.conflicts.length,
    snapshotCount: st.snapshots.length,
    idSeq: st.idSeq
  };
}

ok("1 export → import round-trip", function () {
  var a = freshEngine();
  a.dispatch({ type: "ADD_ITEM", payload: { type: "Q", step: 1, fields: { text: "测试问题？" } } });
  var before = a.getState();
  var json = a.exportProject();
  var parsed = JSON.parse(json);
  assert.strictEqual(parsed.stateVersion, "2.0");
  assert.strictEqual(parsed.caseId, "fukushima");
  assert.ok(parsed.items);
  assert.ok(Array.isArray(parsed.relations));
  assert.ok(Array.isArray(parsed.conflicts));
  assert.ok(Array.isArray(parsed.snapshots));
  assert.ok(parsed.stepStatus);
  assert.ok(parsed.idSeq !== undefined);

  var b = freshEngine();
  var result = b.importProject(json);
  assert.strictEqual(result.ok, true);
  var after = b.getState();
  assert.deepStrictEqual(stateFingerprint(before), stateFingerprint(after));
  assert.strictEqual(Object.keys(after.items).length, Object.keys(before.items).length);
});

ok("2 version mismatch rejected, state unchanged", function () {
  var eng = freshEngine();
  eng.dispatch({ type: "ADD_ITEM", payload: { type: "Q", step: 1, fields: { text: "x" } } });
  var snap = JSON.stringify(eng.getState());
  var bad = JSON.parse(eng.exportProject());
  bad.stateVersion = "9.9";
  var result = eng.importProject(JSON.stringify(bad));
  assert.strictEqual(result.ok, false);
  assert.strictEqual(JSON.stringify(eng.getState()), snap);
});

ok("3 caseId mismatch rejected", function () {
  var eng = freshEngine();
  var snap = JSON.stringify(eng.getState());
  var bad = JSON.parse(eng.exportProject());
  bad.caseId = "not-fukushima";
  var result = eng.importProject(JSON.stringify(bad));
  assert.strictEqual(result.ok, false);
  assert.strictEqual(JSON.stringify(eng.getState()), snap);
});

ok("4 relation integrity rejected via validateAnalysisPayload", function () {
  var pack = global.CASE_DATA;
  var good = JSON.parse(freshEngine().exportProject());
  good.relations.push({ id: "R-bad", from: "missing-from", to: "missing-to", kind: "x", why: "y" });
  var checked = global.FieldnotesCases.validateAnalysisPayload(good, pack);
  assert.strictEqual(checked.ok, false);
  assert.strictEqual(checked.code, "integrity");
  var casesSnap = JSON.stringify(global.FieldnotesCases.getRuntime().getState());
  var viaCases = global.FieldnotesCases.importProject(JSON.stringify(good));
  assert.strictEqual(viaCases.ok, false);
  assert.strictEqual(JSON.stringify(global.FieldnotesCases.getRuntime().getState()), casesSnap);
});

ok("5 markdown export contains disclaimer and 10 step sections", function () {
  var wb = fs.readFileSync(path.join(root, "src/ui/workbench.js"), "utf8");
  assert.ok(wb.includes("本文件为分析素材。案例分析正文与自我反思报告须由小组成员独立撰写，禁止 AI 代笔。"));
  assert.ok(/for\s*\(\s*var step=1;step<=10;step\+\+\)/.test(wb));
  var I = global.FieldnotesI18n;
  for (var step = 1; step <= 10; step++) {
    var title = I.titles[step - 1][0];
    assert.ok(title && title.length > 0, "step " + step + " title");
  }
});

ok("6 template export keeps user wording and marks missing chapters", function () {
  require(path.join(root, "src/ui/template-export.js"));
  var eng = freshEngine();
  var question = "逐字片段甲：运营商是否向公众及时说明了风险？";
  var assumption = "逐字片段乙：暂按公开时间晚于撤离命令来假设。";
  eng.dispatch({ type: "ADD_ITEM", payload: { type: "Q", step: 1, fields: { text: question } } });
  eng.dispatch({ type: "ADD_ITEM", payload: { type: "A", step: 4, fields: { text: assumption } } });
  var md = global.TemplateExport.exportReport(eng.getState(), global.CASE_DATA);
  assert.ok(md.indexOf(global.TemplateExport.DISCLAIMER) >= 0);
  global.TemplateExport.CHAPTERS.forEach(function (title) {
    assert.ok(md.indexOf("## " + title) >= 0, "missing chapter " + title);
  });
  assert.ok(md.indexOf(question) >= 0, "question rewritten or dropped");
  assert.ok(md.indexOf(assumption) >= 0, "assumption rewritten or dropped");
  assert.ok(md.indexOf("> ⚠️ 需人工补充（来自第 1 步：识别伦理问题）：") >= 0);
  assert.ok(md.indexOf("> 本节属报告正文，须由小组成员独立撰写。") >= 0);
  assert.strictEqual(md.indexOf("因此本组认为运营商应当立即公开全部信息。"), -1);
});

console.log("---");
console.log("SUMMARY: PASS=" + pass + " FAIL=" + fail);
process.exit(fail ? 1 : 0);
