(function () {
  "use strict";
  var checks = [];
  var MEMBER_Q =
    "Should TEPCO have taken additional precautions to protect those systems and the people who depended on them?";
  var MEMBER_FACT =
    "On 11 March 2011, the earthquake caused a loss of off-site power at Fukushima Daiichi. The subsequent tsunami flooded essential equipment, disabling much of the backup power supply and compromising reactor cooling.";
  function check(id, ok, detail) {
    checks.push({ id: id, ok: !!ok, detail: detail || "" });
  }
  function text(root) {
    return (root.innerText || root.textContent || "").replace(/\s+/g, " ");
  }
  function wait(ms) {
    return new Promise(function (r) {
      setTimeout(r, ms);
    });
  }
  function countStep1Questions() {
    return document.querySelectorAll("#workspace .entry-card").length;
  }
  function countStep3Why() {
    var ps = document.querySelectorAll("#workspace .relation p");
    var n = 0;
    ps.forEach(function (p) {
      var t = (p.textContent || "").trim();
      if (t && t !== "—" && t.length > 8) n++;
    });
    return n;
  }
  async function run() {
    for (var i = 0; i < 120; i++) {
      if (document.querySelector('[data-testid="home-demo-hint"]') && document.querySelector('[data-testid="home-continue"]')) break;
      await wait(100);
    }
    check("demo-home", !!document.querySelector('[data-testid="home-screen"]'), "home");
    check(
      "demo-home-hint",
      !!document.querySelector('[data-testid="home-demo-hint"]'),
      "hint"
    );
    var cont = document.querySelector('[data-testid="home-continue"]');
    if (cont) cont.click();
    else if (window.FieldnotesTestEntry) window.FieldnotesTestEntry.enterWorkbench();
    var nav1 = document.getElementById("nav-step-1");
    if (nav1) nav1.click();
    for (var j = 0; j < 40; j++) {
      if (countStep1Questions() >= 5) break;
      await wait(100);
    }
    check("demo-q-count", countStep1Questions() >= 5, "step1 cards=" + countStep1Questions());
    var q1 =
      window.FIELDNOTES &&
      window.FIELDNOTES.getEngine &&
      Object.values(window.FIELDNOTES.getEngine().getState().items).find(function (it) {
        return it.id === "Q-1-01";
      });
    check("demo-member-q1", !!(q1 && q1.text === MEMBER_Q), q1 ? q1.text.slice(0, 60) : "missing");
    var nav3 = document.getElementById("nav-step-3");
    if (nav3) nav3.click();
    await wait(400);
    check("demo-fact-why", countStep3Why() >= 9, "why relations=" + countStep3Why());
    check("demo-member-fact", text(document.body).indexOf(MEMBER_FACT) >= 0, "verbatim fact narrative");
    var navSum = document.getElementById("nav-summary");
    if (navSum) navSum.click();
    await wait(400);
    var comp = document.querySelector("[data-testid='summary-completeness'], .summary-completeness, #summary-completeness");
    var compText = comp ? text(comp) : text(document.getElementById("workspace") || document.body);
    var m = compText.match(/(\d+)/);
    var n = m ? parseInt(m[1], 10) : 0;
    if (!n && /filled|已填写|items/i.test(compText)) n = 1;
    check("demo-summary-n", n > 0, "completeness=" + compText.slice(0, 80));
    var replay = document.querySelector(".summary-full-replay");
    var briefLen = (document.querySelector(".summary-report") || document.body).innerText.length;
    check("demo-summary-brief", !!(replay && !replay.open) && briefLen < 8000, "chars=" + briefLen + " replayOpen=" + (replay && replay.open));
    var nav8 = document.getElementById("nav-step-8");
    if (nav8) nav8.click();
    for (var s8 = 0; s8 < 25; s8++) {
      if (document.querySelector('textarea[data-item="R-8-01"][data-field="text"]')) break;
      await wait(100);
    }
    var rTa = document.querySelector('textarea[data-item="R-8-01"][data-field="text"]');
    var rText = rTa ? rTa.value : "";
    if (!rText && window.FIELDNOTES && window.FIELDNOTES.getEngine) {
      rText = ((window.FIELDNOTES.getEngine().getState().items || {})["R-8-01"] || {}).text || "";
    }
    check(
      "demo-step8-placeholder",
      /AI DEMO PLACEHOLDER/i.test(rText) && rText.length > 40,
      rText ? rText.slice(0, 50) : "missing R-8-01"
    );
    var nav9 = document.getElementById("nav-step-9");
    if (nav9) nav9.click();
    await wait(300);
    check("demo-step9-content", text(document.getElementById("workspace") || document.body).length > 80, "step9");
    var nav10 = document.getElementById("nav-step-10");
    if (nav10) nav10.click();
    await wait(300);
    check("demo-step10-content", document.querySelectorAll("#workspace .entry-card").length >= 3, "step10 cards");
    check("demo-no-top-banner", !document.querySelector("[data-demo-banner]"), "no sticky banner");
    window.__DEMO_AUDIT__ = checks;
    var el = document.createElement("pre");
    el.id = "DEMO_AUDIT_JSON";
    el.textContent = JSON.stringify(checks);
    document.body.appendChild(el);
  }
  run().catch(function (err) {
    check("demo-crash", false, String(err));
    var el = document.createElement("pre");
    el.id = "DEMO_AUDIT_JSON";
    el.textContent = JSON.stringify(checks);
    document.body.appendChild(el);
  });
})();
