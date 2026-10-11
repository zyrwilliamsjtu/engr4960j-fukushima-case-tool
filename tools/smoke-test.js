global.window = globalThis;
require("../src/data/fukushima.js");
require("../src/data/mock-state.js");
require("../src/logic/ids.js");
require("../src/logic/storage.js");
require("../src/logic/validate.js");
require("../src/logic/store.js");
require("../src/logic/index.js");

var assert = require("assert");
var L = globalThis.AppLogic;

var pass = 0;
var fail = 0;

function test(name, fn) {
  try {
    fn();
    console.log("PASS:", name);
    pass += 1;
  } catch (e) {
    console.log("FAIL:", name, "-", e.message);
    fail += 1;
  }
}

test("1 mock init stateVersion 2.0", function () {
  L.dispatch({ type: "STATE_INIT", payload: { useMock: true } });
  assert.strictEqual(L.getState().stateVersion, "2.0");
});

var addedId;
test("2 add item id format and idSeq", function () {
  var before = JSON.stringify(L.getState().idSeq);
  var r = L.dispatch({
    type: "ITEM_ADD",
    payload: { prefix: "Q", step: 1, item: { text: "【测试】是否应当 X？" } }
  });
  assert.strictEqual(r.ok, true);
  addedId = r.id;
  assert.ok(/^Q-1-\d{2}$/.test(addedId));
  assert.notStrictEqual(JSON.stringify(L.getState().idSeq), before);
});

test("3 delete then add new id not reused", function () {
  var deleted = addedId;
  L.dispatch({ type: "ITEM_DELETE", payload: { id: deleted, force: true } });
  var r2 = L.dispatch({
    type: "ITEM_ADD",
    payload: { prefix: "Q", step: 1, item: { text: "【测试】是否应当 Y？" } }
  });
  assert.notStrictEqual(r2.id, deleted);
});

test("4 delete referenced item blocked", function () {
  L.dispatch({ type: "STATE_INIT", payload: { useMock: true } });
  var del = L.dispatch({ type: "ITEM_DELETE", payload: { id: "Q-1-01" } });
  assert.strictEqual(del.ok, false);
  assert.strictEqual(del.reason, "referenced");
  assert.ok(del.impact);
  assert.ok(del.impact.relations && del.impact.relations.length > 0);
});

test("5 force delete marks dependent needsReview without text change", function () {
  var depBefore = L.getState().items["A-4-01"].text;
  L.dispatch({ type: "ITEM_DELETE", payload: { id: "M-3-01", force: true } });
  var dep = L.getState().items["A-4-01"];
  assert.strictEqual(dep.text, depBefore);
  assert.strictEqual(dep.needsReview, true);
});

test("6 validateStep returns three arrays", function () {
  var v = L.validateStep(1);
  assert.ok(Array.isArray(v.errors));
  assert.ok(Array.isArray(v.suggestions));
  assert.ok(Array.isArray(v.anchors));
});

test("7 unknown check id skipped", function () {
  var v = L.validateStep(2);
  var skipped = v.anchors.some(function (a) {
    return a.message && a.message.indexOf("exactSelect") >= 0;
  });
  assert.ok(skipped);
});

test("8 snapshots create and restore", function () {
  L.dispatch({ type: "STATE_RESET" });
  L.dispatch({ type: "STATE_INIT", payload: { useMock: false } });
  L.createSnapshot("snap-a");
  L.createSnapshot("snap-b");
  assert.strictEqual(L.getState().snapshots.length, 2);
  var firstLabel = L.getState().snapshots[0].label;
  L.dispatch({
    type: "ITEM_SET_FIELD",
    payload: { id: "Q-1-01", field: "text", value: "【测试】临时修改" }
  });
  var snapId = L.getState().snapshots[0].id;
  L.restoreSnapshot(snapId);
  assert.ok(L.getState().items);
  assert.ok(firstLabel);
});

console.log("---");
console.log("SUMMARY: PASS=" + pass + " FAIL=" + fail);
if (fail > 0) process.exit(1);
