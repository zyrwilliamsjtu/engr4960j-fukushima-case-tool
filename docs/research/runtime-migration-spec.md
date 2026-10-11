# 工作台运行时迁移规格（Preview → AppLogic 适配）

> 审计日期：2026-10-11  
> 范围：`src/ui/` 对 `getRuntime()` 返回对象的调用；对照 `src/logic/index.js` 的 `window.AppLogic`。

## 1. 调用链

- `workbench.js:4` — `var engine = cases.getRuntime()`
- `case-workspaces.js:57` — 构造 `runtime`（当前 `FrontendPreviewRuntime.create(...)`）
- `case-workspaces.js:121` — `getRuntime: function () { return runtime; }`
- `workbench.js:208` — `FIELDNOTES.mount(runtime)` 可替换实例

## 2. 运行时方法清单（UI 引擎接口）

| 方法 | 调用处 | 用途 |
|------|--------|------|
| `getState()` | workbench.js:15 | 读取当前分析状态（含 items/relations/conflicts） |
| `validateStep(step)` | workbench.js:69 | 步骤提醒/校验（errors + suggestions） |
| `dispatch({type,payload})` | workbench.js:136 及多处 | 所有写操作（见下表 UI action 类型） |
| `subscribe(fn)` | workbench.js:200 | 状态变更后重绘 |
| `affected(id)` | workbench.js:165（可选） | 删除前提示受影响条目 |
| `recoveryData()` | workbench.js:99,187（可选） | 损坏 localStorage 备份下载 |
| `flush()` | workbench.js:207（可选） | 页面卸载前强制持久化 |
| `exportProject()` | case-workspaces.js:98 | JSON 导出（福岛案例为纯 state） |
| `importProject(json)` | case-workspaces.js:109 | JSON 导入 |
| `getSaveStatus()` | case-workspaces.js:125 | 保存状态 saved/saving/memory |
| `createSnapshot(label)` | runtime-check.cjs（测试；UI 预留 action） | 快照槽位 |
| `restoreSnapshot(id)` | runtime-check.cjs | 恢复快照 |

**方法数：12**（未超过 15 的硬门禁）。

### `dispatch` 使用的 UI action 类型（workbench.js）

`NAVIGATE`, `ADD_ITEM`, `UPDATE_ITEM`, `DELETE_ITEM`, `SET_STATUS`, `SET_CHECKLIST`, `LINK`, `UNLINK`, `ADD_CONFLICT`, `UPDATE_CONFLICT`, `DELETE_CONFLICT`, `ADD_NOTE`, `ACCEPT_L3`, `SET_BASIS`, `ANSWER`, `RESET`

## 3. AppLogic 公开接口映射

| UI 方法 | AppLogic | 映射 |
|---------|----------|------|
| `getState` | `getState()` | **直接对应**（经独立 `createStore` 实例） |
| `subscribe` | `subscribe()` | **直接对应**（实例 store） |
| `validateStep` | `validateStep(stepId, state)` | **需适配**：返回结构一致（errors/suggestions/anchors），UI 亦读 `key`/`message` |
| `createSnapshot` | `createSnapshot(label)` | **需适配**：逻辑层 SN 编号规则与 preview 的 SN-01/02 不同 |
| `restoreSnapshot` | `restoreSnapshot(id)` | **直接对应** |
| `dispatch` | `dispatch({type,payload})` | **需适配**：UI type 与 store type 不同（见 §4） |
| `exportProject` | `exportProject()` | **需适配**：逻辑层入口仍 `throw`，适配器用 `getState` + JSON |
| `importProject` | `importProject()` | **需适配**：逻辑层入口仍 `throw`，适配器用 `STATE_LOAD` |
| `flush` | （无） | **需适配**：调用 `storage.flushSave()` |
| `getSaveStatus` | （无） | **需适配**：由 `storage.available` + 内部 saving 标志推导 |
| `affected` | （无） | **需适配**：在适配器内图遍历（同 preview `related`） |
| `recoveryData` | （无） | **逻辑层没有**：返回 `null` + `console.warn` 一次 |

## 4. 能力使用情况（界面）

| 能力 | 界面 |
|------|------|
| `getState` | 全程 |
| `dispatch` | 全程写路径 |
| `validateStep` | 方法面板、导出提醒 |
| `subscribe` | 绑定 render |
| `createSnapshot` / `restoreSnapshot` | 测试覆盖；UI action 名预留，当前 method 面板无按钮 |
| relations | 第 3–4 步链接、删除保护 |
| conflicts | 第 6 步 |
| 删除保护 | `DELETE_ITEM` + `affected` 提示 |
| needsReview / stale | 逻辑层 `ITEM_DELETE` force 路径；preview 用 stepStatus stale |

## 5. 逻辑层缺失 / 需适配汇总

**按 AppLogic 门面统计“无直接方法”：6 项**（`exportProject`、`importProject`、`flush`、`getSaveStatus`、`affected`、`recoveryData`）——略超“>5”文档门禁，但均可由 **`src/ui/applogic-runtime.js` 适配层** 实现，**无需改 logic 或 workbench**。

**停止条件结论**：方法总数 12 ≤ 15；缺口均可适配 → **继续实现适配器**（若 PI 要求严格停于 5 缺口，可先合并本规格再评审适配器）。

## 6. 持久化键

- Preview 福岛默认键：`engr4960j.frontend.preview.v2`（case-workspaces.js:55）
- AppLogic 脚手架键：`engr4960j.fukushima.v2`（logic/index.js）
- 适配器应使用 **`options.key`**（与 case-workspaces 传入 preview 相同），避免第二套键。

## 7. 切换 patch（由界面负责人应用，PI 未落库）

见任务汇报「patch 1 / patch 2」。

## 落地结果（2026-10-11）

- **改动位置（4 处）**：
  1. `index.html`：在 `preview-runtime.js` 与 `case-workspaces.js` 之间增加 `applogic-runtime.js`
  2. `case-workspaces.js`：新增 `createRuntime(pack, id, extraOptions)`（`storageKey` 之后）
  3. 初始 `runtime`、`select()`、`addFact()` 三处改为 `createRuntime(...)`（`addFact` 保留 `{ state: savedState }`）
  4. `importProject()` 校验仍用 `FrontendPreviewRuntime.create`（旁注中文注释）
- **切换后运行时**：优先 `AppLogicRuntime.create`，失败回退 `FrontendPreviewRuntime`；`preview-runtime.js` 保留。
- **阶段 1 卖点结论**：证据关联（LINK/UNLINK/删除保护）有界面入口，切换后走适配器 dispatch；修订对比（snapshot）**尚无界面按钮**（规格 §4）；需回看依赖 stepStatus/review dispatch，切换后可工作。`recoveryData` 非卖点，空值不影响课堂演示主路径。

## 8. E2E 根因与导入路径（2026-10-11）

### 8.1 上一轮三项 SKIP 根因（A/C 类，非 B 类）

| 断言 | 创建时机 | 自测点击方式 | 点不到原因 | 分类 |
|------|----------|--------------|------------|------|
| `method-panel` | `#snapshot-initial` 仅在 `methodDialog()` 注入 `#modal-content` 后存在 | `more` → `method` → 查按钮 | 无头 `dump-dom` 与嵌套 `setTimeout` 时序不稳定；入口在二级弹窗 | **C** |
| `snapshot-ui-click` | 同上 | 同上 | 同上；脚本曾用 `createSnapshot` 兜底 | **A+C** |
| `revision-summary` | `[data-testid=revision-summary]` 仅在方法弹窗内 `RevisionCompare.renderPanel` | 依赖方法弹窗打开 | 面板未挂载到主文档常驻区 | **C** |

`--virtual-time-budget=60000` 可跑完多数断言，但**不能替代**「元素仅在二级 dialog 内」导致的查询失败；非 DOM 未就绪截断。

**停止条件**：未发现真实用户也 permanently 点不到的主路径（B 类）→ 继续外提入口并改自测。

### 8.2 正常导入是否走逻辑层

- `importProject()` 成功分支：`runtime = createRuntime(pack, active, { state: … })`（`case-workspaces.js`）。
- `createRuntime()`：`AppLogicRuntime.available()` 时 **`AppLogicRuntime.create`**，否则才 `FrontendPreviewRuntime.create`。
- preview 实例仅用于 **`validateAnalysisPayload` 之后的格式校验**（`persistent: false`），**不**作为活动运行时；preview 校验失败且 AppLogic 可用时仍 **`createRuntime` + payload** 装载，**不是** preview 承载草稿。
- **正常导入路径是否走逻辑层：是**（在 AppLogic 脚本已加载且 `available()` 为真时，与当前 dist 一致）。
- **回退到 preview 运行时的条件**：仅 `AppLogicRuntime.available()` 为假或 `create` 返回 null。
- **可见提示**：导入成功后若 `runtime.isPreview`，界面 toast：`当前使用兼容模式，部分保护能力不可用。`
- **`globalThis.AppLogic.getState()`**：来自 `logic/index.js` 的**独立脚手架 store**（键 `engr4960j.fukushima.v2`），与 UI 适配器 store（`options.key`）**不是同一实例**；验证导入应使用 **`getEngine().getState()`**（适配器内 `store.getState()`）。
