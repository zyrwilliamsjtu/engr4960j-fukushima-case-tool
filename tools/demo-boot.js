/**
 * 演示版引导：仅随 dist/index.demo.html 注入，不进入正式交付物。
 */
(function () {
  "use strict";
  var BANNER =
    "⚠️ 本页为演示用途，含预先填入的示例内容，非真实分析结论。";
  var MARKER = "engr4960j-fukushima-demo-pack-v1";

  function showBanner() {
    if (document.querySelector("[data-demo-banner]")) return;
    var banner = document.createElement("div");
    banner.className = "demo-banner";
    banner.setAttribute("data-demo-banner", "1");
    banner.textContent = BANNER;
    document.body.insertBefore(banner, document.body.firstChild);
  }

  function loadDemo() {
    var demo = window.DEMO_USER_STATE;
    if (!demo || demo.demoPackId !== MARKER || !window.FIELDNOTES) return;
    var payload = JSON.stringify({
      format: "fieldnotes-project-v1",
      state: demo,
      caseData: window.CASE_DATA
    });
    window.FIELDNOTES.importProjectJson(payload);
    showBanner();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadDemo);
  } else {
    loadDemo();
  }
})();
