/**
 * Demo build bootstrap (dist/index.demo.html only — not in deliverable).
 */
(function () {
  "use strict";
  window.__FN_DEMO_PACK = true;
  var MARKER = "engr4960j-fukushima-demo-pack-v1";

  function statePayload(demo) {
    var payload = {};
    Object.keys(demo).forEach(function (k) {
      if (k !== "demoPackId") payload[k] = demo[k];
    });
    return payload;
  }

  function tryLoad(attempts) {
    var demo = window.DEMO_USER_STATE;
    if (!demo || demo.demoPackId !== MARKER) return;
    if (!window.FIELDNOTES || !window.FIELDNOTES.importProjectJson) {
      if (attempts < 80) setTimeout(function () { tryLoad(attempts + 1); }, 50);
      return;
    }
    window.FIELDNOTES.importProjectJson(JSON.stringify(statePayload(demo)));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { tryLoad(0); });
  } else {
    tryLoad(0);
  }
})();
