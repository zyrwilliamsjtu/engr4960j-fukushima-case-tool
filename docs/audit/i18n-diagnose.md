# English UI diagnosis (pre–full-view audit)

Historical record: before `tools/audit/i18n-views.js`, check **`D8-i18n`** only clicked `#lang-en` and navigated **steps 1–10**. It did **not** open summary, Materials, step 7 review, revision compare, archive/tools/method dialogs, or reasoning-overview scope toggles.

| View | Old D8 covered? | CJK before fix (EN mode, excl. user input) |
|---|---|---|
| Steps 1–10 | yes | 0 (pack text via `...En`) |
| Summary & report | **no** | UI strings could leak if locale stuck on zh |
| Materials library | **no** | pack notes/locators via duplicate map |
| Step 7 review | **no** | bias checklist labels from zh data |
| Overview class/full | **no** | not opened |
| Revision / archive / dialogs | **no** | not opened |
| Chrome | partial | same pass as last step visited |

After the view registry audit (`D8-i18n-{view}`) and the step 7 `FieldnotesCaseText.biasLabel` fix, **all covered views report 0 non-whitelist CJK** in the latest audit run.
