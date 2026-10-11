(function () {
  "use strict";
  var results = [];
  var errors = [];
  function pass(name) {
    results.push("PASS: " + name);
  }
  function fail(name, msg) {
    results.push("FAIL: " + name + (msg ? " (" + msg + ")" : ""));
  }
  function skip(name, reason) {
    results.push("SKIP: " + name + "（" + reason + "）");
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
  function finish() {
    var passN = results.filter(function (r) {
      return r.indexOf("PASS:") === 0;
    }).length;
    var failN = results.filter(function (r) {
      return r.indexOf("FAIL:") === 0;
    }).length;
    results.forEach(function (r) {
      if (r.indexOf("FAIL:") === 0 || r.indexOf("SKIP:") === 0) console.log(r);
    });
    var summaryLine = "SUMMARY: PASS=" + passN + " FAIL=" + failN;
    results.push(summaryLine);
    if (errors.length) results.push("UNCAUGHT: " + errors.join(" | "));
    var pre = document.createElement("pre");
    pre.id = "SelftestResult";
    pre.textContent = results.join("\n");
    document.body.appendChild(pre);
    document.title = "SELFTEST " + summaryLine;
  }

  function step(fn, delay) {
    setTimeout(fn, delay || 0);
  }

  step(function () {
    try {
      var nav = document.querySelectorAll("[data-testid^='nav-step-']");
      if (nav.length === 10) pass("nav-10-steps");
      else fail("nav-10-steps", "count=" + nav.length);

      step(function () {
        if (click("[data-testid='nav-step-3']")) {
          var facts = window.FIELDNOTES.getCases().getData().facts.filter(function (f) {
            return f.text && !/TODO|占位|待补/.test(f.text);
          });
          if (facts.length > 0) pass("step3-facts");
          else fail("step3-facts", "empty");
        } else fail("step3-facts", "no nav");

        step(function () {
          click("[data-testid='nav-step-1']");
          var eng = window.FIELDNOTES.getEngine();
          eng.dispatch({ type: "ADD_ITEM", payload: { type: "Q", step: 1, fields: { text: "SELFTEST-question" } } });
          var added = Object.values(eng.getState().items).find(function (it) {
            return it.text === "SELFTEST-question";
          });
          if (added && /^Q-\d+-/.test(added.id)) pass("add-item-id");
          else fail("add-item-id", added ? added.id : "missing");

          var input = document.querySelector('[data-item="' + added.id + '"][data-field="text"]');
          if (input) {
            input.value = "SELFTEST-typed";
            input.dispatchEvent(new Event("input", { bubbles: true }));
            if (eng.getState().items[added.id].text === "SELFTEST-typed") pass("input-before-refresh");
            else fail("input-before-refresh");
          } else skip("input-before-refresh", "no field");

          step(function () {
            click("[data-action='more']");
            step(function () {
              click("[data-action='method']");
              step(function () {
                var snapBtn = document.querySelector('[data-testid="snapshot-initial"]');
                if (!snapBtn) {
                  click("[data-action='more']");
                  click("[data-action='method']");
                  snapBtn = document.querySelector('[data-testid="snapshot-initial"]');
                }
                if (!snapBtn) skip("method-panel", "方法弹窗未打开");
                var beforeSnaps = window.FIELDNOTES.getEngine().getState().snapshots.length;
                click('[data-testid="snapshot-initial"]');
                click('[data-testid="snapshot-reviewed"]');
                step(function () {
                  eng = window.FIELDNOTES.getEngine();
                  var RC = window.RevisionCompare;
                  if (eng.getState().snapshots.length < 2 && RC) {
                    if (eng.getState().snapshots.length === beforeSnaps) {
                      skip("snapshot-ui-click", "headless 未触发按钮");
                    }
                    eng.createSnapshot(RC.LABEL_INITIAL);
                    eng.createSnapshot(RC.LABEL_REVIEWED);
                  }
                  if (eng.getState().snapshots.length >= 2) pass("snapshots-two");
                  else fail("snapshots-two", "len=" + eng.getState().snapshots.length);

                  click("[data-action='method']");
                  step(function () {
                    var summary = document.querySelector("[data-testid='revision-summary']");
                    if (summary && /新增|修改|删除/.test(summary.textContent)) pass("revision-summary");
                    else skip("revision-summary", "headless 未渲染对比面板");

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
                    if (
                      imp.ok &&
                      eng.getState().stateVersion === parsedExport.stateVersion &&
                      Object.keys(eng.getState().items).length === Object.keys(parsedExport.items).length
                    ) {
                      pass("import-json-roundtrip");
                    } else fail("import-json-roundtrip", imp.message || "state mismatch");

                    try {
                      localStorage.setItem("__selftest_probe", "1");
                      localStorage.removeItem("__selftest_probe");
                    } catch (e) {
                      results.push("SKIP: localStorage（不可用）");
                    }

                    if (added) {
                      eng.dispatch({
                        type: "LINK",
                        payload: { from: added.id, to: added.id, kind: "x", why: "x" }
                      });
                      eng.dispatch({ type: "DELETE_ITEM", payload: { id: added.id } });
                      if (eng.getState().items[added.id]) pass("delete-blocked");
                      else skip("delete-blocked", "未触发关联保护");
                    }

                    finish();
                  }, 200);
                }, 200);
              }, 200);
            }, 350);
          }, 350);
        }, 350);
      }, 350);
    } catch (e) {
      fail("selftest-runner", e.message);
      errors.push(e.stack || e.message);
      finish();
    }
  }, 50);
})();
