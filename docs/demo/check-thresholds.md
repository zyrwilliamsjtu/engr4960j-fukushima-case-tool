# Demo check threshold changes (custom sample)

| Assertion | Old | New | Reason |
|---|---|---|---|
| `demo-fact-why` | ≥ 2 | ≥ 9 | Nine linked pack facts (3×3 categories) each with `why` |
| `demo-step8-empty` | step 8 inputs empty | replaced by `demo-step8-placeholder` | Group sample now includes a marked placeholder resolution for demo chain |
| `demo-q-count` | ≥ 5 | ≥ 5 | Unchanged (1 member + 4 AI questions) |
| `demo-summary-n` | > 0 | > 0 | Unchanged |
| `demo-summary-brief` | replay closed, chars < 8000 | same | Unchanged |

New assertions: `demo-member-q1`, `demo-member-fact`, `demo-step9-content`, `demo-step10-content`, `demo-step8-placeholder`, `demo-no-top-banner` (sticky banner removed per product request).
