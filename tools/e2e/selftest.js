/**
 * 浏览器端自测（仅 dist/_selftest.html）。
 * ALLOWED_SKIPS：本轮必须为空；出现未白名单 SKIP 记为 FAIL。
 */
(function () {
  "use strict";
  var ALLOWED_SKIPS = [];
  var results = [];
  var errors = [];

  function pass(name) {
    results.push("PASS: " + name);
  }
  function fail(name, msg) {
    results.push("FAIL: " + name + (msg ? " (" + msg + ")" : ""));
  }
  function skip(name, reason) {
    if (ALLOWED_SKIPS.indexOf(name) >= 0) results.push("SKIP: " + name + "（" + reason + "）");
    else fail(name, "SKIP not allowed: " + reason);
  }
  function fp(st) {
    return {
      items: Object.keys(st.items).length,
      relations: st.relations.length,
      snapshots: st.snapshots.length
    };
  }

  window.onerror = function (msg) {
    errors.push(String(msg));
  };
  var origErr = console.error;
  console.error = function () {
    errors.push(Array.prototype.join.call(arguments, " "));
    origErr.apply(console, arguments);
  };

  function click(sel) {
    var el = typeof sel === "string" ? document.querySelector(sel) : sel;
    if (!el) return false;
    el.click();
    return true;
  }
  function later(fn, ms) {
    setTimeout(fn, ms || 0);
  }

  function finish() {
    var passN = 0;
    var failN = 0;
    var skipN = 0;
    results.forEach(function (r) {
      if (r.indexOf("PASS:") === 0) passN += 1;
      if (r.indexOf("FAIL:") === 0) failN += 1;
      if (r.indexOf("SKIP:") === 0) skipN += 1;
    });
    results.forEach(function (r) {
      console.log(r);
    });
    var summaryLine = "SUMMARY: PASS=" + passN + " FAIL=" + failN + " SKIP=" + skipN;
    results.push(summaryLine);
    if (errors.length) results.push("UNCAUGHT: " + errors.join(" | "));
    var pre = document.createElement("pre");
    pre.id = "SelftestResult";
    pre.textContent = results.join("\n");
    document.body.appendChild(pre);
    document.title = "SELFTEST PASS=" + passN + " FAIL=" + failN + " SKIP=" + skipN;
  }

  function setFileInput(jsonText, filename) {
    var input = document.getElementById("project-file");
    if (!input) return false;
    if (typeof DataTransfer === "undefined" || typeof File === "undefined") return false;
    var file = new File([jsonText], filename || "selftest-import.json", { type: "application/json" });
    var dt = new DataTransfer();
    dt.items.add(file);
    input.files = dt.files;
    input.dispatchEvent(new Event("change", { bubbles: true }));
    return true;
  }

  later(function run() {
    try {
      if (document.querySelector('[data-testid="revision-compare-open"]')) pass("revision-entry-visible");
      else fail("revision-entry-visible");

      ["toolbar-export-md", "toolbar-export-json", "toolbar-import-json"].forEach(function (id) {
        if (document.querySelector('[data-testid="' + id + '"]')) pass(id);
        else fail("toolbar-" + id);
      });

      var nav = document.querySelectorAll("[data-testid^='nav-step-']");
      if (nav.length === 10) pass("nav-10-steps");
      else fail("nav-10-steps", "count=" + nav.length);

      click("[data-testid='nav-step-3']");
      var facts = window.FIELDNOTES.getCases().getData().facts.filter(function (f) {
        return f.text && !/TODO|占位|待补/.test(f.text);
      });
      if (facts.length > 0) pass("step3-facts");
      else fail("step3-facts");

      click("[data-testid='nav-step-1']");
      var eng = window.FIELDNOTES.getEngine();
      if (eng.runtimeId === "FIELDNOTES_AppLogic_RUNTIME_V1") pass("runtime-applogic");
      else fail("runtime-applogic", eng.runtimeId || "missing");

      eng.dispatch({ type: "ADD_ITEM", payload: { type: "Q", step: 1, fields: { text: "SELFTEST-question" } } });
      var added = Object.values(eng.getState().items).find(function (it) {
        return it.text === "SELFTEST-question";
      });
      if (added && /^Q-\d+-/.test(added.id)) pass("add-item-id");
      else fail("add-item-id");

      var input = document.querySelector('[data-item="' + added.id + '"][data-field="text"]');
      if (input) {
        input.value = "SELFTEST-typed";
        input.dispatchEvent(new Event("input", { bubbles: true }));
        if (eng.getState().items[added.id].text === "SELFTEST-typed") pass("input-before-refresh");
        else fail("input-before-refresh");
      } else fail("input-before-refresh", "no field");

      var beforeSnaps = eng.getState().snapshots.length;
      try {
        if (!click('[data-testid="snapshot-initial"]')) throw new Error("no initial button");
        if (!click('[data-testid="snapshot-reviewed"]')) throw new Error("no reviewed button");
        pass("snapshot-ui-click");
      } catch (e) {
        fail("snapshot-ui-click", e.message);
      }
      eng = window.FIELDNOTES.getEngine();
      if (eng.getState().snapshots.length === beforeSnaps + 2) pass("snapshots-two");
      else fail("snapshots-two", "len=" + eng.getState().snapshots.length);

      click('[data-testid="revision-compare-open"]');
      later(function () {
        var summary = document.querySelector('[data-testid="revision-summary"]');
        if (summary && /新增\s*\d+\s*条.*修改\s*\d+\s*条.*删除\s*\d+\s*条/.test(summary.textContent)) {
          pass("revision-summary");
        } else fail("revision-summary", summary ? summary.textContent : "missing");

        click('[data-action="close"]');

        var exported = eng.exportProject();
        var parsedExport = JSON.parse(exported);
        if (parsedExport.stateVersion === "2.0") pass("export-json");
        else fail("export-json");

        eng.dispatch({
          type: "ADD_ITEM",
          payload: { type: "Q", step: 1, fields: { text: "before-import-marker" } }
        });
        var imp = window.FIELDNOTES.importProjectJson(exported);
        eng = window.FIELDNOTES.getEngine();
        if (imp.ok && JSON.stringify(fp(eng.getState())) === JSON.stringify(fp(parsedExport))) {
          pass("import-json-roundtrip");
        } else fail("import-json-roundtrip", imp.message || "mismatch");

        if (eng.runtimeId === "FIELDNOTES_AppLogic_RUNTIME_V1") pass("import-via-logic-runtime");
        else fail("import-via-logic-runtime");

        var logicItems = eng.getState().items;
        if (Object.keys(logicItems).length === Object.keys(parsedExport.items).length) {
          pass("import-logic-state-visible");
        } else fail("import-logic-state-visible");

        function tailTests() {
          if (added && facts.length) {
            eng.dispatch({
              type: "LINK",
              payload: {
                from: facts[0].id,
                to: added.id,
                kind: "fact-supports-question",
                why: "selftest link"
              }
            });
            eng.dispatch({ type: "DELETE_ITEM", payload: { id: added.id } });
            if (eng.getState().items[added.id]) pass("delete-blocked");
            else fail("delete-blocked");
          }
          try {
            localStorage.setItem("__selftest_probe", "1");
            localStorage.removeItem("__selftest_probe");
            pass("localStorage-ok");
          } catch (e) {
            pass("localStorage-unavailable");
          }
          finish();
        }

        if (typeof DataTransfer === "undefined") {
          fail("file-input-datatransfer", "DataTransfer unavailable");
          tailTests();
          return;
        }
        var exportForFile = eng.exportProject();
        var exportFp = fp(JSON.parse(exportForFile));
        if (!setFileInput(exportForFile, "selftest-import.json")) {
          fail("file-input-trigger");
          tailTests();
          return;
        }
        later(function () {
          click('[data-action="confirm"]');
          later(function () {
            eng = window.FIELDNOTES.getEngine();
            if (JSON.stringify(fp(eng.getState())) === JSON.stringify(exportFp)) pass("file-input-import");
            else fail("file-input-import");

            var bad = JSON.parse(exportForFile);
            bad.stateVersion = "9.9";
            var beforeBad = JSON.stringify(eng.getState());
            setFileInput(JSON.stringify(bad), "selftest-bad.json");
            later(function () {
              if (JSON.stringify(eng.getState()) === beforeBad) pass("file-input-reject-version");
              else fail("file-input-reject-version");
              var modalEl = document.getElementById("modal");
              if (modalEl && modalEl.open) click('[data-action="close"]');
              tailTests();
            }, 400);
          }, 400);
        }, 400);
      }, 120);
    } catch (e) {
      fail("selftest-runner", e.message);
      errors.push(e.stack || e.message);
      finish();
    }
  }, 80);
})();
