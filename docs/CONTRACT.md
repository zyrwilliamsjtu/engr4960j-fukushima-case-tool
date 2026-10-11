# 数据契约 v2.0

## 契约冻结规则

`window.CASE_DATA` 与用户 `localStorage` 结构一旦组员开始开发，任何字段增删改、语义变更或校验键变更，必须先升级 `meta.dataVersion` 和/或 `stateVersion`，更新本文档，经 PR review 并在小组群内通知；**禁止静默改字段后再改代码**。

### 版本历史

| 版本 | 说明 |
|------|------|
| v1.0 | 脚手架阶段，无正式契约文档 |
| v2.0 | 对齐 PRODUCT v1.0 第九～十一节；`dataVersion` / `stateVersion` 均为 `2.0` |
| v2.0 冻结前修订 | 补 `nameEn`、统一 ID 规则、收编 `isCore`/`focusReason`、新增字段→存储映射表 |

---

## 1. 稳定 ID 规则

### 用户创建的条目

所有用户创建的条目**必须**有稳定 ID，格式 `类型前缀-步骤号-序号`：

| 前缀 | 类型 | 示例 |
|------|------|------|
| `Q` | 伦理问题 | `Q-1-03` |
| `M` | 缺失事实 | `M-3-02` |
| `A` | 假设 | `A-4-01` |
| `C` | 概念/术语澄清 | `C-5-02` |
| `PA` | 原则应用 | `PA-6-01` |
| `CF` | 原则冲突 | `CF-6-01` |
| `RC` | 现实约束（用户条目） | `RC-9-01` |
| `R` | 结论 | `R-8-01` |
| `AV` | 避免措施 | `AV-10-01` |
| `REL` | 关联记录 | `REL-0007` |
| `SN` | 快照 | `SN-01` |

ID 一旦生成不得复用，不得因删除而回收。删除仅标记影响范围，不重用旧 ID。

### 静态数据 ID（由 PI 撰写，不得由界面层生成）

| 前缀 | 对象 | 示例 |
|---|---|---|
| `src-` | 来源 | `src-textbook-appendix-I` |
| `tl-` | 时间线事件 | `tl-001` |
| `f-mat-` | 物质 / 技术类事实 | `f-mat-001` |
| `f-ind-` | 个人类事实 | `f-ind-001` |
| `f-org-` | 组织类事实 | `f-org-001` |
| `p-basic-` / `p-org-` / `p-emp-` / `p-inv-` / `p-right-` | 原则（5 组） | `p-basic-1` |
| `vw-` | 价值含义候选词 | `vw-001` |
| `rc-` | 现实约束提示词 | `rc-001` |
| `bc-` | 偏见自查项 | `bc-001` |
| `rp-` | 复核提示项 | `rp-001` |

**引用规则**：`relations[]` 的 `from` / `to`、各条目的 `basisRefs` /
`appliesTo` 等字段，**一律直接写目标条目的 id 原文**，不另起命名空间、
不加前缀转换。例如事实引用写 `f-mat-001`，不写 `XR-001`。

---

## 2. 静态数据 `window.CASE_DATA`

挂载：`src/data/fukushima.js` 内 `window.CASE_DATA = { … }`（非 ES Module）。

### 2.1 根级字段

| 字段名 | 类型 | 必填 | 含义 | 示例值 |
|--------|------|------|------|--------|
| `meta` | `object` | 是 | 案例元信息 | 见 2.2 |
| `sources` | `array` | 是 | 文献/来源目录 | 见 2.3 |
| `timeline` | `array` | 是 | 事件时间线（L1） | 见 2.4 |
| `facts` | `array` | 是 | 事实库（L1，可多标签） | 见 2.5 |
| `valueWords` | `array` | 是 | 第 5 步候选词 | 见 2.6 |
| `principles` | `array` | 是 | 附录 I 原则库 | 见 2.7 |
| `constraints` | `array` | 是 | 第 9 步预置提示词 | 见 2.8 |
| `biasChecks` | `array` | 是 | 第 7 步偏见自查 | 见 2.9 |
| `reviewPrompts` | `array` | 是 | 第 7 步复核提示 | 见 2.10 |
| `steps` | `array` | 是 | 10 步定义 | 见第 3 节 |

### 2.2 `meta`

| 字段名 | 类型 | 必填 | 含义 | 示例值 |
|--------|------|------|------|--------|
| `id` | `string` | 是 | 案例 id | `"fukushima"` |
| `title` | `string` | 是 | 界面标题 | `"福岛第一核电站事故"` |
| `dataVersion` | `string` | 是 | 静态契约版本 | `"2.0"` |
| `builtAt` | `string` | 是 | 数据构建日期 | `"2026-10-11"` |

### 2.3 `sources[]`

| 字段名 | 类型 | 必填 | 含义 | 示例值 |
|--------|------|------|------|--------|
| `id` | `string` | 是 | 来源 id | `"src-001"` |
| `title` | `string` | 是 | 标题 | `"Global Engineering Ethics, Appendix I: Principles Reviewed"` |
| `publisher` | `string` | 是 | 出版方 | `"Elsevier"` |
| `year` | `number` | 是 | 年份 | `2017` |
| `url` | `string` | 否 | 链接 | `""` |
| `accessedAt` | `string` | 否 | 访问日期 | `""` |

### 2.4 `timeline[]`

| 字段名 | 类型 | 必填 | 含义 | 示例值 |
|--------|------|------|------|--------|
| `id` | `string` | 是 | 时间线条目 id | `"tl-001"` |
| `date` | `string` | 是 | 日期或阶段 | `"【占位】"` |
| `event` | `string` | 是 | 事件描述 | `"【占位】此处待补"` |
| `sourceId` | `string` | 是 | 来源 id | `"TODO(PI)"` |
| `infoKnownBy` | `array` | 否 | P2「站在当时」：当时知情主体 | `[]` |
| `infoKnownWhen` | `string` | 否 | P2：信息何时被掌握 | `""` |

### 2.5 `facts[]`

| 字段名 | 类型 | 必填 | 含义 | 示例值 |
|--------|------|------|------|--------|
| `id` | `string` | 是 | 事实 id | `"f-mat-001"` |
| `text` | `string` | 是 | 事实正文 | `"【占位】此处待补"` |
| `categories` | `string[]` | 是 | 多标签分类 | `["material","individual"]` |
| `sourceId` | `string` | 是 | 来源 id | `"TODO(PI)"` |
| `note` | `string` | 否 | 编辑备注 | `""` |

### 2.6 `valueWords[]`

| 字段名 | 类型 | 必填 | 含义 | 示例值 |
|--------|------|------|------|--------|
| `id` | `string` | 是 | 词条 id | `"vw-001"` |
| `word` | `string` | 是 | 词 | `"责任"` |
| `whyVague` | `string` | 是 | 为何需澄清 | `"可指法律责任或道德责任…"` |
| `sourceId` | `string` | 是 | 来源 | `"TODO(PI)"` |

### 2.7 `principles[]`

| 字段名 | 类型 | 必填 | 含义 | 示例值 |
|--------|------|------|------|--------|
| `id` | `string` | 是 | 原则 id | `"p-basic-1"` |
| `group` | `string` | 是 | 分组 | `"basic"` / `"organization"` / `"employee"` / `"involvement"` / `"rights"` |
| `name` | `string` | 是 | 中文短名 | `"公众安全"` |
| `nameEn` | `string` | 是 | 原则的英文原文，便于对照教材 | `"keep members of the public safe ..."` |
| `desc` | `string` | 是 | 中文简述 | `"使公众免受…"` |
| `sourceId` | `string` | 是 | 来源 | `"src-textbook-appendix-I"` |

### 2.8 `constraints[]`

| 字段名 | 类型 | 必填 | 含义 | 示例值 |
|--------|------|------|------|--------|
| `id` | `string` | 是 | 提示项 id | `"rc-001"` |
| `label` | `string` | 是 | 短标签 | `"深层文化规范"` |
| `desc` | `string` | 是 | 说明（非结论） | `"…不预设必然减责。"` |
| `sourceId` | `string` | 是 | 来源 | `"TODO(PI)"` |

### 2.9 `biasChecks[]`

| 字段名 | 类型 | 必填 | 含义 | 示例值 |
|--------|------|------|------|--------|
| `id` | `string` | 是 | 项 id | `"bc-001"` |
| `label` | `string` | 是 | 文案 | `"是否遗漏了某类事实？…"` |
| `jumpTo` | `number` | 是 | 跳转步骤号 | `3` |

### 2.10 `reviewPrompts[]`

| 字段名 | 类型 | 必填 | 含义 | 示例值 |
|--------|------|------|------|--------|
| `id` | `string` | 是 | 项 id | `"rp-001"` |
| `label` | `string` | 是 | 文案 | `"是否遗漏了某类事实？"` |
| `jumpTo` | `number` | 是 | 跳转步骤 | `3` |
| `kind` | `string` | 是 | 类型 | `"missing-facts"` 等 |

---

## 3. 单步结构 `steps[]`

| 字段名 | 类型 | 必填 | 含义 | 示例值 |
|--------|------|------|------|--------|
| `id` | `number` | 是 | 1–10 | `1` |
| `key` | `string` | 是 | 机器键 | `"identify"` |
| `name` | `string` | 是 | 中文名 | `"识别伦理问题"` |
| `presentInClass` | `boolean` | 是 | 课堂展示 | `true`（前 5 步） |
| `intro` | `string` | 是 | 步骤说明 | `"…"` |
| `prompts` | `object[]` | 是 | 引导问题 | `{ text, source }` |
| `fields` | `object[]` | 是 | 输入区 | 见第 4 节 |
| `checks` | `object[]` | 是 | 形式检查 | `{ id, level, refSource }` |
| `referenceLevel1` | `string[]` | 是 | L1 侧栏键 | `["timeline","sources"]` |
| `referenceLevel3` | `object \| null` | 是 | L3 参考 | `{ type, source, body }` 或 `null` |
| `state` | `string` | 是 | 配置态占位 | `"todo"` |

`prompts[].source` ∈ `"textbook"` | `"team"` | `"instructor"`。

`checks[].level` ∈ `"error"` | `"suggest"`（**绝大多数为 `suggest`**）。

`checks[].refSource` ∈ `"textbook"` | `"team"` | `"instructor"`。

`referenceLevel1` 取值示例：`"timeline"`、`"sources"`、`"facts"`、`"principles"`、`"glossary"`、`"biasChecks"`、`[]`。

**第 1 步完整示例**（与 `fukushima.js` 一致）：

```json
{
  "id": 1,
  "key": "identify",
  "name": "识别伦理问题",
  "presentInClass": true,
  "intro": "列出与本案例相关的伦理问题。教材建议以问句形式表述，便于后续聚焦与分析。",
  "prompts": [
    { "text": "你能否把每条伦理关切写成问句（含「是否/应该」或问号）？", "source": "textbook" },
    { "text": "TODO(PI): 补引导问题", "source": "team" }
  ],
  "fields": [
    {
      "key": "issues",
      "type": "list",
      "label": "伦理问题",
      "min": 5,
      "minSource": "textbook",
      "itemSchema": ["text:question", "actor:optional"],
      "hint": "建议问句形式；涉及主体选填"
    }
  ],
  "checks": [
    { "id": "minItems", "level": "suggest", "refSource": "textbook" },
    { "id": "mustBeQuestion", "level": "suggest", "refSource": "textbook" }
  ],
  "referenceLevel1": ["timeline", "sources"],
  "referenceLevel3": {
    "type": "text",
    "source": "textbook",
    "body": "教材对「问句形式」的说明（正文待 PI 摘录）。"
  },
  "state": "todo"
}
```

---

## 4. 字段类型清单（13 种）

### 4.1 `text`

单行文本。

```json
{ "key": "shortNote", "type": "text", "label": "备注" }
```

**注意**：空值可在导出汇总中列为格式缺项，但不阻断跳步。

### 4.2 `textarea`

多行文本。

```json
{ "key": "reason", "type": "textarea", "label": "理由说明", "rows": 4 }
```

**注意**：第 8 步结论/理由仅用此类型，逻辑层禁止自动填充。

### 4.3 `list`

带 min/max、可增删的条目列表，每条分配稳定 ID。

```json
{ "key": "issues", "type": "list", "min": 5, "minSource": "textbook", "itemSchema": ["text:question"] }
```

**注意**：条数不足仅 🟡 建议，不拦截保存（PRODUCT 4.2）。

### 4.4 `question`

问句输入，附「建议写成问句」提示。

```json
{ "key": "focusQuestion", "type": "question", "label": "核心问句" }
```

**注意**：兼容英文 `should / ought to / ?`（PRODUCT 第六节第 1 步）。

### 4.5 `bucketedFacts`

四栏：物质/技术、个人、组织、缺失；支持**多标签**。

```json
{
  "key": "factEntries",
  "type": "bucketedFacts",
  "buckets": ["material", "individual", "organization", "missing"],
  "allowMultiTag": true
}
```

**注意**：与 `CASE_DATA.facts[].categories` 一致，同条可属多类。

### 4.6 `assumption`

假设内容 + 依据；依据为空标 🟡，**不阻断**。

```json
{ "key": "assumptions", "type": "assumption", "require": "basis" }
```

**注意**：提示语用「这条假设还没有记录依据」（PRODUCT 十六）。

### 4.7 `clarify`

双栏：他人理解 / 我的用法；可自建词。

```json
{ "key": "clarifications", "type": "clarify", "cols": ["others", "mine"], "min": 2 }
```

**注意**：📘 建议 ≥2 词；两栏均须非空才消除 🟡。

### 4.8 `multiSelect`

多选（原则、约束提示、聚焦问题等）。

```json
{ "key": "selectedPrinciples", "type": "multiSelect", "from": "principles", "min": 3 }
```

**注意**：第 2 步恰好 2 条为核心问题（📘 采用 2 条，见附录 12）。

### 4.9 `rankList`

原则排序；**必须同时提供拖拽与上下移动按钮**。

```json
{ "key": "principleOrder", "type": "rankList", "allowTie": true }
```

**注意**：投影环境拖拽不可靠，按钮为必需降级（PRODUCT 第 6 步）。

### 4.10 `checkList`

勾选式自查或清单。

```json
{ "key": "biasReview", "type": "checkList", "from": "biasChecks" }
```

**注意**：勾选状态写入用户状态，不表示「分析正确」。

### 4.11 `review`

只读回显前序答案 + 三态（需修订/无需修订/未看）+ 跳转。

```json
{ "key": "reviewPanel", "type": "review", "source": "steps1to6" }
```

**注意**：勾「需修订」须可跳转到对应条目；修改时记录一句原因（可跳过）。

### 4.12 `conflict`

原则冲突**四问**专用结构。

```json
{ "key": "principleConflicts", "type": "conflict", "questions": 4 }
```

**注意**：≥2 条原则时启用；允许并列、按问题分别比较、自建原则（PRODUCT 第 6 步）。

### 4.13 `relation`

条目挂到问题（或其它目标），**必须**填写「为什么相关」。

```json
{ "key": "evidenceLinks", "type": "relation", "targets": "Q", "require": "why" }
```

**注意**：引用事实须回答「这条事实为什么和当前问题有关」（PRODUCT 第五节）。

---

## 字段类型 → 存储位置映射

`CASE_DATA.steps[].fields` **只描述输入界面长什么样**，不描述数据怎么存。
存储一律以上文「用户状态」为准。二者对应关系如下：

| field.type | 写入位置 | 说明 |
|---|---|---|
| `text` / `textarea` / `question` | `items[id]` 的对应字段 | 无独立条目的单值字段 |
| `list` | `items[]` 多条 | 每个条目一个稳定 ID |
| `bucketedFacts` | `items[]` 多条，带 `categories: []` | 支持多标签；缺失事实用 `M` 前缀 |
| `assumption` | `items[]`（`A` 前缀），带 `basisRefs: []` | `basisRefs` 为空 → 标 🟡，不阻断 |
| `clarify` | `items[]`（`C` 前缀），带 `others` / `mine` 两字段 | — |
| `multiSelect` | `items[]`（`PA` 前缀）或 `items[id].selectedIds` | 原则选择用 `PA` |
| `rankList` | `items[]`（`PA` 前缀）的 `order` 字段 | 允许并列 |
| `checkList` | `items[id].checkedIds` | 不产生新条目 |
| `review` | `items[id].review` 对象 | 含 `status` / `note` |
| `conflict` | `conflicts[]` | 一条记录装四问 |
| `relation` | `relations[]` | 必填 `why` 字段 |

**第 2 步特例**：其 `fields` 描述的是「从第 1 步列表里勾选 2 条 + 写理由」这一交互，
存储按下文 `isCore` / `focusReason` 处理。

---

## 5. 用户状态（localStorage）

建议存储键：`engr4960j.fukushima.v2`（实现时在 `src/logic/` 定稿；变更须升 `stateVersion`）。

### 5.1 根对象

| 字段名 | 类型 | 必填 | 含义 | 示例值 |
|--------|------|------|------|--------|
| `stateVersion` | `string` | 是 | 状态 schema 版本 | `"2.0"` |
| `caseId` | `string` | 是 | 案例 id | `"fukushima"` |
| `currentStep` | `number` | 是 | 当前步骤 1–10 | `3` |
| `startedAt` | `string` | 是 | ISO 8601 开始时间 | `"2026-01-01T00:00:00.000Z"` |
| `updatedAt` | `string` | 是 | ISO 8601 更新时间 | `"2026-01-01T01:05:00.000Z"` |
| `authorship` | `object` | 是 | 本机署名与保留意见 | `{ notes:[], reservations:[] }` |
| `stepStatus` | `object` | 是 | 键为步骤号，值为五种状态 | `{ 1:"checked", 2:"draft" }` |
| `items` | `object` | 是 | 稳定 ID → 条目 | 见 5.2 |
| `relations` | `array` | 是 | 关联记录 | 见 5.3 |
| `conflicts` | `array` | 是 | 原则冲突四问答案 | 见 5.4 |
| `snapshots` | `array` | 是 | 修订快照 | 见 5.5 |
| `hasAcceptedL3` | `object` | 是 | 各步是否已展开 L3 | `{ 1:true, 2:false }` |

`stepStatus` 取值：`todo` | `draft` | `discuss` | `checked` | `stale`（对应 PRODUCT 4.1 未开始/草稿/待讨论/已复核/需回看）。

### 5.2 `items[id]`

| 字段名 | 类型 | 必填 | 含义 | 示例值 |
|--------|------|------|------|--------|
| `id` | `string` | 是 | 稳定 ID | `"Q-1-01"` |
| `type` | `string` | 是 | 前缀类型 | `"Q"` |
| `step` | `number` | 是 | 创建步骤 | `1` |
| `text` | `string` | 视类型 | 主文本 | `"【示例】…是否应当…？"` |
| `actors` | `array` | 否 | 涉及主体 | `["【示例】角色甲"]` |
| `basisRefs` | `array` | 否 | 假设依据 id | `["M-3-02"]` |
| `principleId` | `string` | 否 | PA 条目 | `"p-basic-1"` |
| `appliesTo` | `array` | 否 | PA 适用问题 | `["Q-1-01"]` |
| `createdAt` | `string` | 是 | ISO 8601 | `"…"` |
| `updatedAt` | `string` | 否 | ISO 8601 | `"…"` |

#### item 的可选扩展字段

第 2 步「聚焦」不另开顶层数组，而是在已有的 `Q` 类条目上打标：

| 字段 | 类型 | 适用 | 含义 |
|---|---|---|---|
| `isCore` | boolean | `Q` | 是否被选为本次分析的核心问题（建议 2 条） |
| `focusReason` | string | `Q` | 选它的理由 |

规则：

- 取消选中时，将 `isCore` 置为 `false`，**保留** `focusReason` 原文，不删除用户写过的字。
- 第 8 步逐个核心问题写结论时，按 `items` 中 `isCore === true` 的顺序取。

### 5.3 `relations[]`

| 字段名 | 类型 | 必填 | 含义 | 示例值 |
|--------|------|------|------|--------|
| `id` | `string` | 是 | `REL-` 前缀 | `"REL-0001"` |
| `kind` | `string` | 是 | 关系类型 | `"fact-supports-question"` |
| `from` | `string` | 是 | 源条目 id | `"f-mat-001"` |
| `to` | `string` | 是 | 目标条目 id | `"Q-1-01"` |
| `why` | `string` | 是 | 为什么相关 | `"…"` |
| `createdAt` | `string` | 是 | ISO 8601 | `"…"` |

### 5.4 `conflicts[]`

| 字段名 | 类型 | 必填 | 含义 | 示例值 |
|--------|------|------|------|--------|
| `id` | `string` | 是 | `CF-` 前缀 | `"CF-6-01"` |
| `questionId` | `string` | 是 | 关联问题 | `"Q-1-01"` |
| `principleA` | `string` | 是 | 原则 A id | `"p-basic-1"` |
| `principleB` | `string` | 是 | 原则 B id | `"p-emp-1"` |
| `supportsA` | `string` | 是 | A 支持/限制什么 | `"…"` |
| `supportsB` | `string` | 是 | B 支持/限制什么 | `"…"` |
| `priority` | `string` | 是 | 优先或协调说明 | `"…"` |
| `scope` | `string` | 是 | `"case"` 或 `"general"` | `"case"` |
| `reason` | `string` | 是 | 理由 | `"…"` |

### 5.5 `snapshots[]`

| 字段名 | 类型 | 必填 | 含义 | 示例值 |
|--------|------|------|------|--------|
| `id` | `string` | 是 | `SN-` 前缀 | `"SN-01"` |
| `label` | `string` | 是 | 标签 | `"初步"` |
| `createdAt` | `string` | 是 | ISO 8601 | `"…"` |
| `payload` | `object` | 是 | `items`/`relations`/`conflicts` 深拷贝 | `{ … }` |

### 5.6 `authorship`

| 字段名 | 类型 | 必填 | 含义 | 示例值 |
|--------|------|------|------|--------|
| `notes` | `string[]` | 是 | 讨论笔记 | `[]` |
| `reservations` | `string[]` | 是 | 保留意见 | `[]` |

---

## 6. 关联规则

| 关系 kind | 说明 |
|-----------|------|
| `fact-supports-question` | 事实 / 缺失事实 → 问题 |
| `assumption-fills-gap` | 假设 → 信息缺口；假设须注明依据 |
| `principle-applies-to` | 原则应用 → 问题与相关条目 |
| `resolution-answers-question` | 结论 → 问题 |
| `review-targets-item` | 复核记录 → 条目 |

**硬规则 1（删除保护）**：删除被引用的条目时，**提示影响范围**，不静默丢失关联。

**硬规则 2（依据变更）**：修改某条依据后，依赖它的条目标「需回看」，**但不自动改写用户判断文字**。

---

## 7. 运行时接口

由 `src/logic/` 统一实现；UI **只**通过下列接口读写状态。

| 接口 | 签名 | 参数 | 返回值 | 用途 |
|------|------|------|--------|------|
| `getState` | `getState()` | 无 | 当前用户状态对象 | 供界面渲染 |
| `dispatch` | `dispatch(action)` | `action`: `{ type, payload }` | 更新后的状态或 void | 统一提交增删改、关联、步骤状态 |
| `validateStep` | `validateStep(stepId)` | `stepId`: number | `{ errors[], suggestions[], locators[] }` | 形式检查；区分 error 与 suggest |
| `subscribe` | `subscribe(listener)` | `listener(state)` | 取消订阅函数 | 状态变更通知 UI |
| `exportProject` | `exportProject()` | 无 | JSON 字符串或 Blob | 导出可继续编辑的工程 |
| `importProject` | `importProject(json)` | JSON 字符串/对象 | `{ ok, state?, errors? }` | 恢复工程；失败不覆盖现有草稿 |
| `createSnapshot` | `createSnapshot(label)` | `label`: string | 快照 id | 保存修订版本 |
| `restoreSnapshot` | `restoreSnapshot(id)` | `id`: string | void | 恢复快照到当前工作区 |

---

## 8. 版本与兼容

- 升级 `dataVersion` / `stateVersion` **只标记变化，不自动解决兼容**。
- 须约定迁移规则：能迁移则自动迁移；不能则**保留原始数据 + 提示导出备份**，不直接覆盖。
- **导入时检查四项**：`caseId`、版本号、字段结构、关联完整性。
- 契约冻结规则同文档头部。

---

## 9. mock 样例引用

界面调试用的假用户状态**唯一来源**：`src/data/mock-state.js`（`window.MOCK_USER_STATE`）。

核心结构（与文件一致）：

```js
{
  stateVersion: "2.0",
  caseId: "fukushima",
  currentStep: 3,
  stepStatus: { 1: "checked", 2: "checked", 3: "draft", /* … */ },
  items: {
    "Q-1-01": { id: "Q-1-01", type: "Q", step: 1, text: "【示例】…", isCore: true, focusReason: "…" },
    "M-3-01": { id: "M-3-01", type: "M", step: 3, text: "【示例】尚缺…" },
    "PA-6-01": { id: "PA-6-01", type: "PA", step: 6, principleId: "p-basic-1", appliesTo: ["Q-1-01"] }
  },
  relations: [
    { id: "REL-0001", kind: "fact-supports-question", from: "f-mat-001", to: "Q-1-01", why: "【示例】…" }
  ],
  conflicts: [
    { id: "CF-6-01", questionId: "Q-1-01", principleA: "p-basic-1", principleB: "p-emp-1", /* 四问字段 */ }
  ],
  snapshots: [
    { id: "SN-01", label: "初步", payload: { items, relations, conflicts: [] } },
    { id: "SN-02", label: "复核后", payload: { /* … */ } }
  ],
  hasAcceptedL3: { 1: true, 2: true, 3: false },
  authorship: { notes: [], reservations: [] }
}
```

---

## 10. 三条设计铁律与来源标注政策

### 10.1 设计铁律（PRODUCT 第二节摘要）

1. **人先写，程序后开口**——仅针对 L3 解释性参考；L1 原始材料随时可读。
2. **只有引导，没有判决**——不出现「正确答案是…」。
3. **结论槽位只能人填**——可恢复用户自己的存档/导入/快照，不自动生成结论。
4. **不拦路，只提醒**——不阻止保存、跳步、返回；导出/演示前汇总。
5. **每一项都要能溯源**——事实/观点/原则带来源标签；预置与用户内容视觉区分。
6. **修改必须留痕**——关键条目改动记录修改原因。

### 10.2 来源标注（PRODUCT 4.3）

| 标签 | 含义 |
|------|------|
| 📘 教材 | 教材明确写的 |
| 👥 本组 | 组内自定，可改 |
| 🎓 老师 | 课程通知要求 |

用户可见文字标签：`事实` / `参考观点` / `我的假设` / `我的判断`（PRODUCT 十六）。

---

## 11. 附录：教材内部不一致的处理

| 项目 | 教材第 2 章正文 | 教材附录 II | 本工具采用 |
|------|-----------------|-------------|------------|
| 伦理问题条数 | 至少 5 条 | 至少 3 条 | **5 条**（附注：附录 II 为 3 条） |
| 聚焦问题数量 | 选 2 条最重要 | 选 1 条 | **2 条**（附注：附录 II 为 1 条） |
| 事实条数 | 每类 2 条（共 6）+ 缺失 2 条 | 未给数量 | **每类 2 条 + 缺失 2 条** |
| 避免问题条数 | 至少 3 条 | 未给数量 | **3 条** |

UI 上数量/格式要求须标注 📘/👥/🎓 来源（见各步 `checks[].refSource` 与 `minSource`）。
