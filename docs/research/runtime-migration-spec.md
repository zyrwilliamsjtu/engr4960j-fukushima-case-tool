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
