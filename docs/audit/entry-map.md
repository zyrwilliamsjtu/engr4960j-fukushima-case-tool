# Workbench entry map

Before the landing page, every automated run opened the app and immediately queried workbook controls (`#nav-step-1`, archive menu, `#workspace`). There was **no shared helper** (`M = 0`).

| Location | How the workbench was entered | Shared helper |
|---|---|---|
| `tools/e2e/selftest.js` `run()` | Assumed toolbar DOM on first paint | no |
| `tools/browser-smoke.py` | Loads `_selftest.html` (same script) | no |
| `tools/audit/audit.js` `runMain()` | Clicks `#nav-step-*` after boot | no |
| `tools/audit/i18n-views.js` | Clicks nav / summary per view | no |
| `tools/demo-boot.js` `afterImport()` | Clicked `#nav-step-1` | no |
| `tools/audit/demo-verify.js` `run()` | Waited for `#workspace .entry-card` | no |
| `tools/check-demo.py` | Launches the demo-verify page | no |

**Count:** 7 entry sites, **0** via a shared helper.

## After extraction

Shared helper: `tools/e2e/enter-workbench.js` → `FieldnotesTestEntry.enterWorkbench()` (clicks `home-continue` or `home-start`).

| Location | Now |
|---|---|
| `selftest.js` | calls helper before assertions |
| `browser-smoke.py` | inlines the helper before `selftest.js` |
| `audit.js` | home checks, then helper |
| `i18n-views.js` | helper inside each workbook view `open()` |
| `demo-verify.js` | asserts home, then clicks continue (same testids) |
| `check-demo.py` | inlines the helper |
| `demo-boot.js` | stays on the landing page after import |

Entry sites that assume a visible workbook without going through the helper: **0**.
