# Fieldnotes 前端交接

## 打开与打包

- 开发：双击根目录 `index.html`，相邻 `src/` 必须保留。
- 单文件预览：双击 `preview.html`。该文件内联所有 JS、CSS，无 CDN、API、字体下载或网络请求。
- 更新单文件：`python src/ui/build-preview.py`。
- 本分支为 `frontend`，从最新 `origin/main` 创建，未合并。UI 不修改 PI 负责的 `src/data/`、`src/logic/`、`tools/` 或 `dist/`。
- 最终提交之前，由 PI 完成事实核实、接入逻辑层、运行正式构建，再按老师要求命名 `Group #… 4960.html`。目前 `preview.html` 可供前端独立评审，不能把待补资料或开发样例当作分析发现。

## 页面与体验

暖纸色工作台、深绿色导航与材料抽屉，全部图形由本地 SVG/CSS 绘制；装饰线条不是福岛地图。十步可以自由跳转，第一至第五步有课堂标记。正文为小组输入，界面只做结构整理和形式提醒。

三种视图：

1. **分析工作台**：问句、聚焦理由、三类事实、信息缺口、假设依据、概念双栏、原则应用/排序、冲突四问、逐条复核、手写结论、约束与责任判断、预防措施。
2. **推理总览**：按问题回显相关材料、缺口、假设、原则与用户填写的判断。点击卡片可回到原步骤。未关联的内容不会被自动挂接。
3. **修订对比**：明确保存初步和复核后两份快照，按稳定 ID 比较条目、关联、冲突，忽略时间戳与纯复核标记。随后的编辑不会改变已有快照。可恢复快照，恢复前提示备份。

中文/English 切换只改变界面和方法提示，不翻译用户写作。教材英文原文保留。未来案例事实和资料中的原文也会保留；需要双语材料时，由内容负责人提供经过核对的译文，界面不会调用模型翻译。

修改原因通过卡片的历史图标记录到 `authorship.notes`，可以跳过；不在每次键入时强制弹窗打断讨论。讨论笔记和保留意见可署名。课堂展示读取用户记录的深拷贝，隐藏编辑控件；展示时的跳步不会修改工作区。

## 运行时接入

契约仍是 `docs/CONTRACT.md` v2，未增删根字段。`src/ui/preview-runtime.js` 是**可替换的前端预览适配器**，不冒充正式逻辑实现。它暂时负责本机试用；正式逻辑接入后不应另起一套答案状态。

在 `workbench.js` 之前安装 PI 的运行时实例：

```js
window.CASE_RUNTIME = /* PI 创建的 runtime 实例 */;
```

UI 仅调用约定的 `getState / dispatch / validateStep / subscribe / exportProject / importProject / createSnapshot / restoreSnapshot`。开发时也可以通过 `window.FIELDNOTES.mount(runtime)` 替换实例。`subscribe(listener)` 返回取消订阅函数。

预览适配器的 action 约定（这是前端接入说明，不是冻结契约的根字段变更）：

| type | payload |
|---|---|
| NAVIGATE | `{step}` |
| ADD_ITEM | `{type, step, fields?}` |
| UPDATE_ITEM | `{id, fields, reason?}` |
| DELETE_ITEM | `{id}` |
| SET_STATUS | `{step, status}` |
| SET_CHECKLIST | `{id, ids}`；复核清单附在首条已有记录的 `checkedIds` 上 |
| LINK | `{from, to, kind, why}` |
| UNLINK | `{id}` |
| SET_BASIS | `{id, refs, gap, why}` |
| ADD_CONFLICT | `{questionId, principleA, principleB, supportsA, supportsB, priority, scope, reason}` |
| UPDATE_CONFLICT | `{id, fields}` |
| DELETE_CONFLICT | `{id}` |
| ANSWER | `{question}`；用户主动点击后创建**空白** R 条目，绝不填答案 |
| ADD_NOTE | `{kind:'note'\|'reservation', text}` |
| ACCEPT_L3 | `{step}` |
| RESET | `{}` |

字段遵循契约的字段→存储映射：C 使用 `word/others/mine`（读取时兼容 mock 的 `othersView/myUsage`）；PA 使用 `principleId/appliesTo/order/text`；R 使用 `text/reason`；RC 使用 `text/alternatives/mitigationJudgment`。自定义原则的 `text` 同时容纳原则、依据和适用理由，不新增顶层模型。

建议 PI 对齐以下返回值：

- `validateStep(step)` → `{errors:[], suggestions:[], locators:[]}`。提醒可为字符串，或 `{message, itemId, step, source}`；UI 也支持预览适配器的 `{key, ...}`。提醒永不阻止导航、保存、导出。
- `exportProject()` → JSON 字符串或 Blob；`importProject(json)` → `{ok, state?, errors?}`，失败必须保持原工作区。
- `createSnapshot('initial'|'reviewed')` 固定映射 SN-01 / SN-02，两槽可按任意顺序保存。
- 可选 `getSaveStatus()` → `saving|saved|memory`，只能在实际写入成功后报告 saved。缺失此接口时，界面显示保存由逻辑层管理，不声称已保存。
- 可选 `flush()`、`affected(id)`、`recoveryData()`，用于关页保存、删除影响提醒、下载不兼容原存档。

## 数据隔离与资料边界

预览保存键是 `engr4960j.frontend.preview.v2`，与生产建议键隔离。JSON 文件包含完整工作状态，可换电脑导入。浏览器拒绝 localStorage 时仍可填写和导出。读取到不兼容数据会保留原字符串、停止覆盖旧存档，并在使用指南中提供原存档下载。

开发样例只能从使用指南主动加载仓库 `MOCK_USER_STATE`，在不持久化的独立运行时中显示醒目提示，退出可回到原草稿。界面不会默认装入样例，也不会生成福岛事实。

材料库随时开放；L3 参考观点须先有个人记录，且配置实际存在。第 8 步和没有 L3 配置的步骤禁用参考按钮。占位 L3 显示待内容负责人补充。原则库照用仓库已有 23 条原则和 10 项权利，不把 UI 英文短标题冒充教材原句。

## 验证

```text
node --check src/ui/i18n.js
node --check src/ui/preview-runtime.js
node --check src/ui/workbench.js
node src/ui/tests/runtime-check.cjs
python src/ui/build-preview.py
```

`src/ui/tests/browser-check.cjs` 用开发机已有的 Playwright 和 Chrome/Edge 检查真实浏览器；应用本身不依赖这些工具，也无 package.json。指定 `FIELDNOTES_PLAYWRIGHT` 为现有 Playwright 路径、`FIELDNOTES_BROWSER` 为浏览器可执行文件，再运行该脚本。

浏览器检查：断网打开单文件、中英文各十步、完整填写链、原则多选与排序、导出 JSON、刷新恢复、快照差异、样例与展示隔离、390px 手机布局、无外部请求和控制台错误。截图在 `docs/ai-logs/frontend-qa/`，其中测试文字均为虚构 QA 内容。

**这些是界面 QA 截图，不是老师要求的 AI 对话截图。** 全部真实 vibe-coding 聊天截图仍需由组员从聊天界面保存，不能用测试截图或虚构聊天代替。
