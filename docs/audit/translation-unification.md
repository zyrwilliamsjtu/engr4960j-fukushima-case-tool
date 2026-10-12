# English source unification (Materials ↔ case data)

**Authority:** `src/data/fukushima.js` `...En` fields + `src/ui/case-text.js`.

## Inventory (`material-translations.js` legacy copy map)

| Category | Count | Action |
|---|---:|---|
| Duplicate of existing `...En` (wording differed) | 125 | **Retired** — UI now uses `...En` via `FieldnotesCaseText` |
| Already identical / redundant | 4 | **Retired** |
| Missing `...En` (locator / note / date) | 28 | **Migrated** into `fukushima.js` (`locatorEn`, `noteEn`, `dateEn`) |
| Orphan copy keys | 1 | **Migrated** as `dateEn` on timeline rows sharing `2011-03-11 及之后` |

## Implementation

- `src/ui/material-translations.js` → thin adapter (DEPRECATED header); delegates to `FieldnotesCaseText.materialField`.
- `index.html` loads `case-text.js` **before** `material-translations.js`.
- Automated migration: `tools/audit/apply-material-en-fields.js` (one-off; values taken from former copy map, now stored only in data).

## Semantic differences resolved

Principle **descriptions** in the old map used a parallel English list; Materials now shows **`descEn`** from the case pack (quote-aligned textbook wording).

Fact **body text** in the old map sometimes paraphrased; workbook and Materials both use **`textEn`** (quote subset checks unchanged).

## Verification

- `node tools/audit/case-en-cross-path.js` — sampled facts / principles / timeline: workbook path vs Materials path.
- `node tools/audit/case-en-verify.js` — Chinese baseline + En CJK scan unchanged.
