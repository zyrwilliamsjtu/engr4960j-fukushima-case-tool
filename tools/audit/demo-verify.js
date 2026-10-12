(function () {
  "use strict";
  var checks = [];
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
  function step8Empty() {
    var inputs = document.querySelectorAll("#workspace textarea, #workspace input[type=text]");
    var filled = 0;
    inputs.forEach(function (el) {
      if ((el.value || "").trim()) filled++;
    });
    return filled === 0;
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
    var nav3 = document.getElementById("nav-step-3");
    if (nav3) nav3.click();
    await wait(300);
    check("demo-fact-why", countStep3Why() >= 2, "why relations=" + countStep3Why());
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
    await wait(300);
    check("demo-step8-empty", step8Empty(), "step8 inputs filled check");
    check("demo-banner", !!document.querySelector("[data-demo-banner]") && /DEMO BUILD/i.test(document.body.innerText), "banner");
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
