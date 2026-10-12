/**
 * English UI view registry for audit (injected with audit.js only).
 */
(function () {
  "use strict";
  function wb() {
    if (window.FieldnotesTestEntry) window.FieldnotesTestEntry.enterWorkbench();
  }

  window.I18nAuditViews = {
    registry: [
      { id: "home", name: "Landing page", covered: true, open: function (api) { api.click('[data-testid="goto-home"]'); } },
      { id: "step-1", name: "Workbook step 1", covered: true, open: function (api) { if (window.FieldnotesTestEntry) window.FieldnotesTestEntry.enterWorkbench(); api.click("#nav-step-1"); } },
      { id: "step-2", name: "Workbook step 2", covered: true, open: function (api) { wb(); api.click("#nav-step-2"); } },
      { id: "step-3", name: "Workbook step 3", covered: true, open: function (api) { wb(); api.click("#nav-step-3"); } },
      { id: "step-4", name: "Workbook step 4", covered: true, open: function (api) { wb(); api.click("#nav-step-4"); } },
      { id: "step-5", name: "Workbook step 5", covered: true, open: function (api) { wb(); api.click("#nav-step-5"); } },
      { id: "step-6", name: "Workbook step 6", covered: true, open: function (api) { wb(); api.click("#nav-step-6"); } },
      { id: "step-7-review", name: "Step 7 review workspace", covered: true, open: function (api) {
        wb();
        api.click("#nav-step-7");
        api.click('[data-review-action="part"][data-part="Q"]');
      } },
      { id: "step-8", name: "Workbook step 8", covered: true, open: function (api) { wb(); api.click("#nav-step-8"); } },
      { id: "step-9", name: "Workbook step 9", covered: true, open: function (api) { wb(); api.click("#nav-step-9"); } },
      { id: "step-10", name: "Workbook step 10", covered: true, open: function (api) { wb(); api.click("#nav-step-10"); } },
      { id: "summary", name: "Summary & report", covered: true, open: function (api) { wb(); api.click('[data-testid="goto-summary"]'); } },
      { id: "overview-class", name: "Reasoning overview (class scope)", covered: true, open: function (api) {
        wb();
        api.click('[data-testid="goto-summary"]');
        var btn = document.querySelector('[data-action="overview-scope"][data-scope="class"], [data-overview-scope="class"]');
        if (btn) btn.click();
      } },
      { id: "overview-full", name: "Reasoning overview (full scope)", covered: true, open: function (api) {
        wb();
        api.click('[data-testid="goto-summary"]');
        var btn = document.querySelector('[data-action="overview-scope"][data-scope="full"], [data-overview-scope="full"]');
        if (btn) btn.click();
      } },
      { id: "materials", name: "Materials library", covered: true, open: function (api) {
        wb();
        api.click("#nav-step-1");
        api.click('[data-action="materials"]');
      } },
      { id: "archive-menu", name: "Archive menu (expanded)", covered: true, open: function (api) {
        wb();
        api.click("#nav-step-1");
        api.click('[data-action="archive-menu"], [data-testid="archive-menu"]');
      } },
      { id: "method-dialog", name: "Method / help dialog", covered: true, open: function (api) {
        wb();
        api.click("#nav-step-1");
        api.click('[data-action="method"]');
      } },
      { id: "tools-dialog", name: "More tools dialog", covered: true, open: function (api) {
        wb();
        api.click("#nav-step-1");
        api.click('[data-action="tools"]');
      } },
      { id: "revision-compare", name: "Revision compare panel", covered: true, open: function (api) {
        wb();
        api.click("#nav-step-1");
        if (window.FIELDNOTES && window.FIELDNOTES.snapshotChanges) {
          try { api.click('[data-action="revision"]'); } catch (e) {}
        }
        api.click('[data-action="revision"], [data-testid="revision-entry"]');
      } },
      { id: "import-fail-toast", name: "Import version mismatch feedback", covered: true, open: function (api) {
        if (window.FIELDNOTES && window.FIELDNOTES.importProjectJson) {
          var snap = window.FIELDNOTES.getEngine ? JSON.stringify(window.FIELDNOTES.getEngine().getState()) : "";
          window.FIELDNOTES.importProjectJson('{"stateVersion":"9.9","caseId":"fukushima","items":{},"relations":[],"conflicts":[],"snapshots":[],"stepStatus":{},"idSeq":{}}');
          if (snap && window.FIELDNOTES.getEngine) window.FIELDNOTES.importProjectJson(snap);
        }
      } },
      { id: "chrome", name: "Top bar / sidebar chrome", covered: true, open: function (api) { wb(); api.click("#nav-step-1"); } },
      { id: "empty-workbook", name: "Empty workbook steps 1–10", covered: false, reason: "Requires isolated storage profile; covered by i18n pairs scan in node script" }
    ]
  };
})();
