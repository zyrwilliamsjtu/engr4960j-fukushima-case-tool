/**
 * Demo build bootstrap (dist/index.demo.html only — not in deliverable).
 */
(function () {
  "use strict";
  window.__FN_DEMO_PACK = true;
  var MARKER = "engr4960j-fukushima-demo-pack-v1";
  var BANNER_EN =
    "⚠️ DEMO BUILD — Sample input partly provided by a group member and partly AI-completed for " +
    "demonstration. NOT a real analysis; must not be used in the report.";
  function showBanner() {
    if (document.querySelector("[data-demo-banner]")) return;
    var banner = document.createElement("div");
    banner.className = "demo-banner";
    banner.setAttribute("data-demo-banner", "1");
    banner.setAttribute("data-demo-build", "1");
    banner.setAttribute("data-banner-en", BANNER_EN);
    banner.textContent = BANNER_EN;
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
