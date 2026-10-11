# 数据契约 v1

> **契约冻结规则**：`window.CASE_DATA` 与用户 `localStorage` 结构一旦组员开始开发，任何字段增删改、语义变更或校验键变更，必须先升级 `meta.dataVersion` 和/或 `stateVersion`，更新本文档，经 PR review 并在小组群内通知；禁止静默改字段。

---

## 1. 静态数据 `window.CASE_DATA`

挂载方式：`src/data/fukushima.js` 内赋值 `window.CASE_DATA = { ... }`（非 ES Module）。

### 1.1 根级字段

| 字段名 | 类型 | 必填 | 含义 | 示例值 |
|--------|------|------|------|--------|
| `meta` | `object` | 是 | 案例元信息 | 见下表 |
| `timeline` | `array` | 是 | 第 1 步参考：事件时间线 | `[{ "date": "【占位】", "event": "【占位】此处待补", "sourceId": "TODO" }]` |
| `sources` | `array` | 是 | 文献/来源目录，供参考侧栏引用 | `[{ "id": "TODO", "title": "【占位】", "publisher": "【占位】", "year": 0, "url": "" }]` |
| `facts` | `object` | 是 | 第 3 步参考：分桶事实库 | 见 1.2 |
| `valueWords` | `array` | 是 | 第 5 步候选价值含义词 | `[{ "word": "【占位】", "whyVague": "【占位】此处待补" }]` |
| `principles` | `array` | 是 | 第 6 步伦理原则卡片 | `[{ "id": "p-placeholder", "name": "【占位】", "desc": "【占位】此处待补", "sourceId": "TODO" }]` |
| `constraints` | `array` | 是 | 第 9 步缓解/豁免条件选项 | `[{ "id": "c-placeholder", "label": "【占位】", "desc": "【占位】此处待补" }]` |
| `biasChecks` | `array` | 是 | 第 7 步偏见自查项 | `[{ "id": "b-placeholder", "label": "【占位】此处待补" }]` |
| `steps` | `array` | 是 | 10 个分析步骤定义（长度固定为 10） | 见第 2 节 |

### 1.2 `meta` 对象

| 字段名 | 类型 | 必填 | 含义 | 示例值 |
|--------|------|------|------|--------|
| `id` | `string` | 是 | 案例唯一标识 | `"fukushima"` |
| `title` | `string` | 是 | 界面显示标题 | `"福岛第一核电站事故"` |
| `dataVersion` | `string` | 是 | 静态数据契约版本 | `"1.0"` |

### 1.3 `facts` 对象

| 字段名 | 类型 | 必填 | 含义 | 示例值 |
|--------|------|------|------|--------|
| `material` | `array` | 是 | 材料/物理环境类事实 | `[{ "id": "fm-1", "text": "【占位】此处待补", "sourceId": "TODO" }]` |
| `individual` | `array` | 是 | 个人/行为类事实 | `[{ "id": "fi-1", "text": "【占位】此处待补", "sourceId": "TODO" }]` |
| `organization` | `array` | 是 | 组织/制度类事实 | `[{ "id": "fo-1", "text": "【占位】此处待补", "sourceId": "TODO" }]` |

### 1.4 `timeline[]` 元素

| 字段名 | 类型 | 必填 | 含义 | 示例值 |
|--------|------|------|------|--------|
| `date` | `string` | 是 | 事件日期或阶段描述 | `"【占位】"` |
| `event` | `string` | 是 | 事件简述 | `"【占位】此处待补"` |
| `sourceId` | `string` | 是 | 对应 `sources[].id` | `"TODO"` |

### 1.5 `sources[]` 元素

| 字段名 | 类型 | 必填 | 含义 | 示例值 |
|--------|------|------|------|--------|
| `id` | `string` | 是 | 来源唯一 id | `"TODO"` |
| `title` | `string` | 是 | 文献或报告标题 | `"【占位】"` |
| `publisher` | `string` | 是 | 发布方 | `"【占位】"` |
| `year` | `number` | 是 | 出版/发布年 | `0` |
| `url` | `string` | 否 | 链接（离线展示用，可为空） | `""` |

### 1.6 事实条目（`facts.*[]`）

| 字段名 | 类型 | 必填 | 含义 | 示例值 |
|--------|------|------|------|--------|
| `id` | `string` | 是 | 事实条目 id | `"fm-1"` |
| `text` | `string` | 是 | 事实正文 | `"【占位】此处待补"` |
| `sourceId` | `string` | 是 | 来源 id | `"TODO"` |

### 1.7 其他数组元素

**`valueWords[]`**

| 字段名 | 类型 | 必填 | 含义 | 示例值 |
|--------|------|------|------|--------|
| `word` | `string` | 是 | 待澄清词 | `"【占位】"` |
| `whyVague` | `string` | 是 | 为何需要澄清 | `"【占位】此处待补"` |

**`principles[]`**

| 字段名 | 类型 | 必填 | 含义 | 示例值 |
|--------|------|------|------|--------|
| `id` | `string` | 是 | 原则 id | `"p-placeholder"` |
| `name` | `string` | 是 | 原则名称 | `"【占位】"` |
| `desc` | `string` | 是 | 简短说明 | `"【占位】此处待补"` |
| `sourceId` | `string` | 是 | 教材/附录引用 | `"TODO"` |

**`constraints[]`**

| 字段名 | 类型 | 必填 | 含义 | 示例值 |
|--------|------|------|------|--------|
| `id` | `string` | 是 | 条件项 id | `"c-placeholder"` |
| `label` | `string` | 是 | 短标签 | `"【占位】"` |
| `desc` | `string` | 是 | 说明 | `"【占位】此处待补"` |

**`biasChecks[]`**

| 字段名 | 类型 | 必填 | 含义 | 示例值 |
|--------|------|------|------|--------|
| `id` | `string` | 是 | 自查项 id | `"b-placeholder"` |
| `label` | `string` | 是 | 自查问题文案 | `"【占位】此处待补"` |

---

## 2. 单步结构 `steps[]`

每个元素描述一步 UI/校验配置（非用户答案）。

| 字段名 | 类型 | 必填 | 含义 | 示例值 |
|--------|------|------|------|--------|
| `id` | `number` | 是 | 步骤序号 1–10 | `1` |
| `key` | `string` | 是 | 机器可读键 | `"identify"` |
| `name` | `string` | 是 | 步骤中文名 | `"识别伦理问题"` |
| `presentInClass` | `boolean` | 是 | 是否课堂展示（前 5 步为 `true`） | `true` |
| `intro` | `string` | 是 | 背景说明 Markdown/纯文本 | `"【占位】背景说明…"` |
| `prompts` | `string[]` | 是 | 引导问题列表 | `["【占位】引导问题？"]` |
| `fields` | `object[]` | 是 | 本步输入区字段定义 | 见第 4 节 |
| `checks` | `string[]` | 是 | 校验规则 token 列表 | `["minItems:5", "mustBeQuestion"]` |
| `reference` | `object \| null` | 是 | 参考视角内容类型 | `{ "type": "timeline" }` |

**`reference.type` 枚举**

| 值 | 含义 |
|----|------|
| `"timeline"` | 展示 `timeline` |
| `"facts"` | 展示 `facts`（只读、不可一键复制） |
| `"text"` | 展示 `reference.body` 或固定教材摘录（字段扩展时升版本） |
| `null` | 本步无参考视角（如第 8 步） |

可选扩展（v1 未用时勿填）：`reference.body`（`string`）。

**`fields[]` 公共属性**

| 字段名 | 类型 | 必填 | 含义 | 示例值 |
|--------|------|------|------|--------|
| `key` | `string` | 是 | 用户状态中 `fields` 下的键 | `"issues"` |
| `type` | `string` | 是 | 字段类型，见第 4 节 | `"list"` |
| `label` | `string` | 是 | 界面标签 | `"伦理问题"` |
| `hint` | `string` | 否 | 输入提示 | `"请用问句表述"` |
| `min` | `number` | 否 | 最少条目/选项数 | `5` |
| `max` | `number` | 否 | 最多条目/选项数 | `10` |
| `itemSchema` | `string[]` | 否 | `list` 类型子字段约定 | `["text:question", "actor:optional"]` |
| `optionsFrom` | `string` | 否 | 选项来源路径，如 `"steps.1.fields.issues"` | `"steps.1.fields.issues"` |
| `buckets` | `string[]` | 否 | `bucketedFacts` 桶名 | `["material", "individual", "organization"]` |

**`checks[]` 常见 token（逻辑层解析）**

- `minItems:n` — 某字段至少 n 条
- `mustBeQuestion` — 问句格式
- `exactSelect:n` — 多选恰好 n 个
- `nonEmpty` — 文本非空
- `allReviewed` — 回顾步全部标记完成

（新增 token 须升 `dataVersion` 并文档化。）

---

## 3. 用户状态（localStorage）

**存储键（建议）**：`engr4960j.fukushima.v1`（实现时在 `src/logic/` 定稿，键名变更升 `stateVersion`）。

### 3.1 根对象

| 字段名 | 类型 | 必填 | 含义 | 示例值 |
|--------|------|------|------|--------|
| `stateVersion` | `string` | 是 | 用户状态 schema 版本 | `"1.0"` |
| `caseId` | `string` | 是 | 与 `meta.id` 一致 | `"fukushima"` |
| `currentStep` | `number` | 是 | 当前步骤 1–10 | `3` |
| `startedAt` | `string` | 是 | ISO 8601 首次开始时间 | `"2025-10-11T06:00:00.000Z"` |
| `updatedAt` | `string` | 是 | ISO 8601 最后保存时间 | `"2025-10-11T06:30:00.000Z"` |
| `steps` | `object` | 是 | 键为步骤 id 字符串 `"1"`…`"10"` | 见 3.2 |

### 3.2 `steps["n"]` 对象

| 字段名 | 类型 | 必填 | 含义 | 示例值 |
|--------|------|------|------|--------|
| `completed` | `boolean` | 是 | 校验是否通过 | `true` |
| `fields` | `object` | 是 | 键为对应 `fields[].key`，值为用户输入 | `{ "issues": [] }` |
| `revisedAt` | `string` | 否 | 该步最后修订时间 ISO 8601 | `"2025-10-11T06:15:00.000Z"` |

### 3.3 `stateVersion` 说明

- 与 `meta.dataVersion` 独立：数据内容变更升 `dataVersion`；用户存盘结构变更升 `stateVersion`。
- 读取时若 `stateVersion` 不支持，应提示用户导出备份后重置（实现阶段）。
- 开发用 mock：`window.MOCK_USER_STATE`（`src/data/mock-state.js`），结构与本节一致。

---

## 4. 可用字段类型清单

每种类型对应 `steps[].fields[].type`；用户答案写入 `steps[n].fields[field.key]`。

### 4.1 `text`

单行短文本。

```json
{ "key": "shortNote", "type": "text", "label": "备注" }
```

用户值示例：`"【示例】短文本"`

### 4.2 `textarea`

多行长文本。

```json
{ "key": "reason", "type": "textarea", "label": "理由说明" }
```

用户值示例：`"【示例】这是理由段落。"`

### 4.3 `list`

带 min/max 的条目列表；`itemSchema` 描述每条子结构。

```json
{
  "key": "issues",
  "type": "list",
  "label": "伦理问题",
  "min": 5,
  "itemSchema": ["text:question", "actor:optional"]
}
```

用户值示例：

```json
[
  { "text": "【示例】某主体是否应当……？", "actor": "【示例】某角色" }
]
```

### 4.4 `question`

单条问句（可带校验）；常用于列表项或独立问句字段。

```json
{ "key": "focusQuestion", "type": "question", "label": "核心问句" }
```

用户值示例：`"【示例】在某某情境下，是否应当……？"`

### 4.5 `bucketedFacts`

三分类事实 + 缺失事实栏；用户自填内容，与参考库分离。

```json
{
  "key": "relatedFacts",
  "type": "bucketedFacts",
  "label": "相关事实",
  "buckets": ["material", "individual", "organization"]
}
```

用户值示例：

```json
{
  "material": ["【示例】材料类事实 A", "【示例】材料类事实 B"],
  "individual": ["【示例】个人类事实 A", "【示例】个人类事实 B"],
  "organization": ["【示例】组织类事实 A", "【示例】组织类事实 B"],
  "missing": ["【示例】尚缺事实 1", "【示例】尚缺事实 2"]
}
```

### 4.6 `assumption`

假设内容 + 依据绑定。

```json
{ "key": "assumptions", "type": "assumption", "label": "合理假设", "min": 2 }
```

用户值示例：

```json
[
  { "content": "【示例】假设陈述……", "basis": "【示例】依据说明……" }
]
```

### 4.7 `clarify`

价值词双栏：他人理解 / 我的用法。

```json
{ "key": "clarifications", "type": "clarify", "label": "定义澄清", "min": 2 }
```

用户值示例：

```json
[
  {
    "word": "【示例】责任",
    "othersView": "【示例】他人可能理解为……",
    "myUsage": "【示例】我在此分析中指……"
  }
]
```

### 4.8 `multiSelect`

从 `optionsFrom` 或静态选项中多选。

```json
{
  "key": "chosen",
  "type": "multiSelect",
  "label": "选定问题",
  "min": 2,
  "max": 2,
  "optionsFrom": "steps.1.fields.issues"
}
```

用户值示例：`["issue-0", "issue-2"]`

### 4.9 `rankList`

拖拽（或按钮）排序，用于原则冲突。

```json
{ "key": "principleOrder", "type": "rankList", "label": "原则优先级" }
```

用户值示例：`["p-placeholder-a", "p-placeholder-b", "p-placeholder-c"]`

### 4.10 `checkList`

勾选列表（如偏见自查、约束条件）。

```json
{ "key": "biasChecked", "type": "checkList", "label": "偏见自查" }
```

用户值示例：

```json
[
  { "id": "b-placeholder", "checked": true }
]
```

### 4.11 `review`

只读回显前序答案 +「需修订 / 无需修订」开关。

```json
{ "key": "reviewItems", "type": "review", "label": "过程回顾" }
```

用户值示例：

```json
[
  { "ref": "step:1:issues:0", "needsRevision": false }
]
```

---

## 5. 版本

| 版本 | 说明 |
|------|------|
| 静态数据 `dataVersion` | `1.0`（脚手架） |
| 用户状态 `stateVersion` | `1.0`（脚手架） |
