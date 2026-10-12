/**
 * Demo build bootstrap (dist/index.demo.html only — not in deliverable).
 */
(function () {
  "use strict";
  var MARKER = "engr4960j-fukushima-demo-pack-v1";
  var BANNER_EN =
    "⚠️ DEMO BUILD — This page is pre-filled with AI-generated sample input for " +
    "demonstration only. It is NOT a real analysis and must NOT be used in the " +
    "group report.";
  var BANNER_ZH =
    "演示用途，含 AI 生成的示例内容，非真实分析结论，不得用于报告。";

  function showBanner() {
    if (document.querySelector("[data-demo-banner]")) return;
    var banner = document.createElement("div");
    banner.className = "demo-banner";
    banner.setAttribute("data-demo-banner", "1");
    banner.setAttribute("data-demo-build", "1");
    function updateBanner() {
      var en = document.documentElement.lang === "en" || document.documentElement.lang === "en-US";
      banner.textContent = (en ? BANNER_EN : BANNER_ZH) + " " + (en ? BANNER_ZH : BANNER_EN);
    }
    updateBanner();
    new MutationObserver(updateBanner).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"]
    });
    document.body.insertBefore(banner, document.body.firstChild);
  }

  function statePayload(demo) {
    var payload = {};
    Object.keys(demo).forEach(function (k) {
      if (k !== "demoPackId") payload[k] = demo[k];
    });
    return payload;
  }

  function afterImport() {
    showBanner();
    requestAnimationFrame(function () {
      var nav = document.getElementById("nav-step-1");
      if (nav) nav.click();
    });
  }

  function tryLoad(attempts) {
    var demo = window.DEMO_USER_STATE;
    if (!demo || demo.demoPackId !== MARKER) return;
    if (!window.FIELDNOTES || !window.FIELDNOTES.importProjectJson) {
      if (attempts < 80) setTimeout(function () { tryLoad(attempts + 1); }, 50);
      return;
    }
    var result = window.FIELDNOTES.importProjectJson(JSON.stringify(statePayload(demo)));
    if (result && result.ok) afterImport();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { tryLoad(0); });
  } else {
    tryLoad(0);
  }
})();
