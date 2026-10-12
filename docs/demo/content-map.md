# Group custom demo — content map

**Analysis axis:** Whether TEPCO fulfilled a reasonable duty of precaution against foreseeable harm to power, cooling, and dependent people — not a verdict of guilt.

**Step 2 second paragraph:** Treated as **(b) continuation of `focusReason` for Q-1-01** (not a separate core-question rewrite). It elaborates the duty/feasibility/regulatory framing for the same core question the member named in Step 1.

| His original text | Step / field | Handling | Notes |
|---|---|---|---|
| Step 1 ethical problem (TEPCO precautions…) | Step 1 `Q-1-01.text` | 原文直用 | Core question #1 |
| Step 2 ¶1 (because protecting power…) | Step 1 `Q-1-01.focusReason` | 原文直用 | |
| Step 2 ¶2 (whether TEPCO fulfilled its duty…) | Step 1 `Q-1-01.focusReason` (continued) | 原文直用 | Same field, second paragraph |
| Step 3 Fact 1 narrative | Step 3 relation `why` on `f-mat-003` → `Q-1-01` | 原文直用 | Pack fact ids `f-mat-002`/`f-mat-003`/`src-002` |
| Step 3 category/source/year | Step 3 links only | 原文直用 | Via `CASE_DATA` + `sample-input.md` |
| LIMITED INFORMATION | Step 3 `M-3-01.text` | 原文直用 | Gap label |
| Operators… incomplete equipment information | Step 4 `A-4-01.text` | 原文直用 | |
| REASONABLE PRECAUTION + feasible safeguards… | Step 5 `C-5-01.word` + `C-5-01.mine` | 原文直用 | Label + definition sentence |
| (none) | Steps 1,2,3,6,8,9,10 extras | 新建（无原文） | AI completion, same axis |

## Gap checklist (provided / still needed)

| Step | Minimum | Member provided | AI added |
|---|---:|---:|---:|
| 1 Questions | 5 | 1 | 4 |
| 2 Core + focus | 2 core | 1 Q + 2 ¶ focus | 1 core Q |
| 3 Facts (linked, with why) | 9 (3×3) | 1 narrative | 8 links |
| 3 Missing (M) | 2 | 0 (+1 label reused) | 1 |
| 4 Assumptions | 2 | 1 premise | 1 |
| 5 Concepts | 2 | 1 | 1 |
| 6 Principles (PA) | 3 | 0 | 3 |
| 6 Conflict | 1 | 0 | 1 |
| 8 Resolution | 1 | 0 | 1 (placeholder) |
| 9 Constraints | 1 | 0 | 1 |
| 10 Prevention | 3 | 0 | 3 |

## Unmapped objective claims

| Claim in member text | CASE_DATA anchor |
|---|---|
| Loss of off-site power + tsunami flooded backup/cooling | `f-mat-003`, `f-mat-002` (`src-002`, 2015) |
| IAEA TV1 §1.1 citation | `src-002` title matches; section in `locator` on linked facts |

No member sentence required a **new** Fukushima fact outside the pack.
