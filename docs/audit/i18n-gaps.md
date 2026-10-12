# English UI i18n gap audit (Phase A)

## How to switch to English

1. Open `dist/index.html` (or dev `index.html` with built scripts).
2. In the top bar, click **EN** (sets `localStorage['fieldnotes.ui.language'] = 'en'`).
3. The workbench re-renders; `document.documentElement.lang` becomes `en`.
4. User-written records are **not** translated (by design).

## Classification summary (this pass)

| Class | Count | Action |
|-------|------:|--------|
| **U1** UI copy | ~35 strings | Fixed via `src/ui/i18n.js` + callers |
| **U2** Case content (`CASE_DATA`) | all facts/timeline/sources | Report only; not changed |
| **U3** User input | audit / manual entries | Whitelist in `D8-i18n` |
| **U4** Other | 3 | See table |

## U1 items fixed (representative)

| String (zh) | Location | English |
|-------------|----------|---------|
| 存档 ▾ / 存为「初步」/ 对比修订 | `workbench.js` toolbar | Archive ▾ / Save snapshots / Revision compare |
| 导出报告素材 / Markdown / JSON | archive menu | Export report materials / notes / archive |
| 查找依据 / 搜索内容或来源 | basis dialog | Find a basis / Search wording or sources |
| 无法解析 JSON / 载入错误码 | import flow | `importErrorMessage()` + `invalidJsonMsg` |
| 推理总览分组标题与标签 | `reasoning-overview.js` | `overview*` keys |
| 修订对比摘要 | `revision-compare.js` | `revSummary`, added/deleted/modified |
| 语言切换「中文」按钮 | EN mode shows **ZH** | `langZh` / `langEn` |
| 跳过工作区 | `index.html` + `render()` | `skipLink` (locale-only) |

## U2 (not changed — PI decision)

All CJK in `window.CASE_DATA` (facts, timeline, principles descriptions, source notes, glossary prompts, etc.) remains Chinese in English UI mode. This matches the product rule: language switch changes UI, not case material or user records.

## U4

| Item | Decision |
|------|----------|
| Snapshot labels `初步` / `复核后` | Storage labels; UI shows English via `RevisionCompare` i18n |
| `index.html` `<noscript>` bilingual | Static fallback; not in `#app` DOM scan |
| Markdown export copy | Both exports now localize generated headings, disclaimers and template placeholders; original user/source text stays unchanged |

## Automation

`tools/audit/audit.js` check **D8-i18n**: switch EN, walk `#app` text nodes, collect CJK runs, whitelist only `CASE_DATA` + `getState()` strings, assert zero leaks (print up to 20).

## 2026-10-12 follow-up

English completion is also covered by `src/ui/tests/english-check.cjs`: all ten steps and hints; populated revision comparison; overview, summary/report, class presentation, help, archive and case dialogs; malformed imports; both material exports; library controls; mobile layout; demo banner; Chinese round-trip. Original user text is explicitly checked for preservation. The built-in case title is localized for display only.
