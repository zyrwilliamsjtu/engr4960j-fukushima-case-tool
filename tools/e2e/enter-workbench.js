/**
 * Shared test entry: home → workbook. No-op if the landing view is absent.
 */
(function (root) {
  "use strict";
  function enterWorkbench() {
    var chooser = document.querySelector('[data-intake="existing"]');
    if (chooser && !document.querySelector('[data-testid="home-start"],[data-testid="home-continue"]')) chooser.click();
    var cont = document.querySelector('[data-testid="home-continue"]');
    var start = document.querySelector('[data-testid="home-start"]');
    var btn = cont || start;
    if (btn) btn.click();
  }
  root.FieldnotesTestEntry = { enterWorkbench: enterWorkbench };
})(typeof globalThis !== "undefined" ? globalThis : window);
