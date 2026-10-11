/**
 * AppLogicRuntime 适配器自检（无依赖）
 */
var assert = require("assert");
var vm = require("vm");
var fs = require("fs");
var path = require("path");
var child = require("child_process");

var root = path.join(__dirname, "..");
global.window = globalThis;

require(path.join(root, "src/data/fukushima.js"));
require(path.join(root, "src/logic/ids.js"));
require(path.join(root, "src/logic/storage.js"));
require(path.join(root, "src/logic/validate.js"));
require(path.join(root, "src/logic/store.js"));
require(path.join(root, "src/logic/index.js"));
require(path.join(root, "src/ui/applogic-runtime.js"));

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

var UI_METHODS = [
  "getState",
  "dispatch",
  "validateStep",
  "subscribe",
  "exportProject",
  "importProject",
  "createSnapshot",
  "restoreSnapshot",
  "flush",
  "getSaveStatus",
  "affected",
  "recoveryData"
];

var engine = global.AppLogicRuntime.create(global.CASE_DATA, {
  key: "engr4960j.adapter-test.v1",
  persistent: false
});

ok("1 adapter instantiates", function () {
  assert.ok(engine);
  assert.strictEqual(engine.runtimeId, "FIELDNOTES_AppLogic_RUNTIME_V1");
});

ok("1b all UI methods are functions", function () {
  UI_METHODS.forEach(function (name) {
    assert.strictEqual(typeof engine[name], "function", name);
  });
});

ok("2 minimal calls do not throw", function () {
  engine.getState();
  engine.validateStep(1);
  var unsub = engine.subscribe(function () {});
  assert.strictEqual(typeof unsub, "function");
  unsub();
  engine.dispatch({ type: "NAVIGATE", payload: { step: 2 } });
  engine.exportProject();
  engine.getSaveStatus();
  engine.flush();
  engine.affected("none");
  engine.createSnapshot("test");
  engine.recoveryData();
});

ok("3 recoveryData warns once and returns null", function () {
  assert.strictEqual(engine.recoveryData(), null);
  assert.strictEqual(engine.recoveryData(), null);
});

ok("4 add read delete blocked roundtrip", function () {
  var e = global.AppLogicRuntime.create(global.CASE_DATA, {
    key: "engr4960j.adapter-test.v2",
    persistent: false
  });
  e.dispatch({
    type: "ADD_ITEM",
    payload: { type: "Q", step: 1, fields: { text: "【测试】是否应当 X？" } }
  });
  e.dispatch({
    type: "ADD_ITEM",
    payload: { type: "M", step: 3, fields: { text: "【测试】缺口" } }
  });
  var qid = Object.keys(e.getState().items).find(function (id) {
    return e.getState().items[id].type === "Q";
  });
  var mid = Object.keys(e.getState().items).find(function (id) {
    return e.getState().items[id].type === "M";
  });
  assert.ok(qid && mid);
  e.dispatch({
    type: "LINK",
    payload: {
      from: mid,
      to: qid,
      kind: "fact-supports-question",
      why: "test"
    }
  });
  var before = Object.keys(e.getState().items).length;
  e.dispatch({ type: "DELETE_ITEM", payload: { id: mid } });
  assert.strictEqual(Object.keys(e.getState().items).length, before);
  assert.ok(e.getState().items[mid]);
});

ok("5 missing AppLogic does not crash factory", function () {
  var script =
    "global.window=globalThis;" +
    "require('./src/ui/applogic-runtime.js');" +
    "var r=global.AppLogicRuntime.create({},{});" +
    "process.exit(r===null?0:1);";
  var code = child.spawnSync(process.execPath, ["-e", script], {
    cwd: root,
    encoding: "utf8"
  });
  assert.strictEqual(code.status, 0, code.stderr || code.stdout);
});

ok("6 uses single storage key from options", function () {
  var key = "engr4960j.adapter-test.v3";
  var e = global.AppLogicRuntime.create(global.CASE_DATA, {
    key: key,
    persistent: false
  });
  assert.strictEqual(e.storageKey, key);
});

ok("7 three-way store isolation via createInstance", function () {
  var a = global.AppLogic.createInstance({
    key: "engr4960j.adapter-isolation-a",
    persistent: false
  });
  var b = global.AppLogic.createInstance({
    key: "engr4960j.adapter-isolation-b",
    persistent: false
  });
  var facadeBefore = Object.keys(global.AppLogic.getState().items).length;
  var bBefore = Object.keys(b.getState().items).length;
  a.dispatch({
    type: "ITEM_ADD",
    payload: { prefix: "Q", step: 1, item: { text: "isolation probe" } }
  });
  assert.ok(Object.keys(a.getState().items).length > bBefore);
  assert.strictEqual(Object.keys(b.getState().items).length, bBefore);
  assert.strictEqual(
    Object.keys(global.AppLogic.getState().items).length,
    facadeBefore
  );
});

console.log("---");
console.log("SUMMARY: PASS=" + pass + " FAIL=" + fail);
process.exit(fail ? 1 : 0);
