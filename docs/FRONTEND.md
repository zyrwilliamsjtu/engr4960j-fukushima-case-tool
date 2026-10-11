# Fieldnotes 前端交接

## 打开与打包

- 开发：双击根目录 `index.html`，相邻 `src/` 必须保留。
- 单文件预览：双击 `preview.html`。该文件内联所有 JS、CSS，无 CDN、API、字体下载或网络请求。
- 更新单文件：`python src/ui/build-preview.py`。
- 用户最新授权将 frontend 全部合入 main；最新逻辑与研究草稿完整保留。后续遵循 CONTRIBUTING 的直接维护 main 流程。本轮功能改动仍只在 UI 层，未修改 src/data、src/logic、tools 或 dist。
- 最终提交之前，由 PI 完成事实核实、接入逻辑层、运行正式构建，再按老师要求命名 `Group #… 4960.html`。目前 `preview.html` 可供前端独立评审，不能把待补资料或开发样例当作分析发现。

## 页面与体验（简化版）

本轮按用户反馈收敛界面：深蓝导航、蓝紫标题区、蓝灰底色与淡蓝/暖色填写卡片，少量黄绿色强调。所有装饰由本地 SVG/CSS 绘制，无图片或字体下载。

主页面只有 **十步导航 + 当前步骤 + 填写区 + 上下步**。移除常驻参考栏、三视图标签和固定底部工具栏。涉及主体、原则关联/优先级、冲突四问、偏见清单折叠显示；原始 ID 只保留在数据中，不占据页面。形式提醒和教材参考在「更多 → 方法提示」中查看。

右上角「案例」可新建/切换独立案例；「案例材料」打开按需抽屉。「更多」提供 JSON 导出/导入、Markdown 导出、方法提示和清空记录。一步只有一个主要添加入口；空步骤点击按钮即可开始写。

中文/English 切换只改变界面，不翻译用户写作与原始材料。十步全部可用，结论从空白开始，所有伦理判断由小组填写。输入法组合和折叠区状态在刷新界面时保留。

推理总览、修订快照、课堂展示、讨论笔记与开发样例退出当前界面；较完整的旧界面可从提交 `ad9e36e` 复用。运行时和已保存状态的这些数据不删除，JSON 仍完整携带它们。当前页面不加载 mock 文件，避免开发样例混入正式工作。

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

- `validateStep(step)` → `{errors:[], suggestions:[], anchors:[]}`（与最新 CONTRACT 一致）。提醒可为字符串，或 `{message, itemId, step, source}`；UI 也支持预览适配器的 `{key, ...}`。提醒永不阻止导航、保存、导出。
- `exportProject()` → JSON 字符串或 Blob；`importProject(json)` → `{ok, state?, errors?}`，失败必须保持原工作区。
- `createSnapshot('initial'|'reviewed')` 固定映射 SN-01 / SN-02，两槽可按任意顺序保存。
- 可选 `getSaveStatus()` → `saving|saved|memory`，只能在实际写入成功后报告 saved。缺失此接口时，界面显示保存由逻辑层管理，不声称已保存。
- 可选 `flush()`、`affected(id)`、`recoveryData()`，用于关页保存、删除影响提醒、下载不兼容原存档。

## 数据隔离与资料边界

预览保存键是 `engr4960j.frontend.preview.v2`，与生产建议键隔离。JSON 文件包含完整工作状态，可换电脑导入。浏览器拒绝 localStorage 时仍可填写和导出。读取到不兼容数据会保留原字符串、停止覆盖旧存档，并在使用指南中提供原存档下载。

材料库随时开放；方法提示中的 L3 参考观点须先有个人记录，且配置实际存在。第 8 步和没有 L3 配置的步骤禁用参考按钮。占位 L3 显示待内容负责人补充。原则库照用仓库已有 23 条原则和 10 项权利，保留来源原文。

## 验证

```text
node --check src/ui/i18n.js
node --check src/ui/preview-runtime.js
node --check src/ui/workbench.js
node src/ui/tests/runtime-check.cjs
python src/ui/build-preview.py
```

`src/ui/tests/browser-check.cjs` 用开发机已有的 Playwright 和 Chrome/Edge 检查真实浏览器；应用本身不依赖这些工具，也无 package.json。指定 `FIELDNOTES_PLAYWRIGHT` 为现有 Playwright 路径、`FIELDNOTES_BROWSER` 为浏览器可执行文件，再运行该脚本。

当前浏览器检查：断网打开单文件和源码入口、中英文各十步、完整填写链、原则选择/排序、手写结论、导出 JSON、无效导入保留草稿、刷新恢复、中文输入法、折叠区输入后保持展开、1440/1024/768/390px 无横向溢出、无外部请求和控制台错误。新截图在 `docs/ai-logs/frontend-qa-v2/`，旧截图保留在 `frontend-qa/`。所有测试文字均为虚构 QA 内容。

**这些是界面 QA 截图，不是老师要求的 AI 对话截图。** 全部真实 vibe-coding 聊天截图仍需由组员从聊天界面保存，不能用测试截图或虚构聊天代替。

## 2026-10-11：通用案例与 main 整合

用户最新需求覆盖 PRODUCT v1.0 的「只做福岛」范围限制。主工作台统一显示「案例分析工作台」，具体名称在案例选择面板中出现。预置案例仍保留，已有草稿保存键不迁移、不覆盖。

`case-workspaces.js` 管理案例数据包和当前运行时。自建案例复用通用原则、术语与十步框架，事实、时间线从空白开始，不继承原案例的 L3 解释性参考。第 3 步与材料抽屉可人工添加事实、来源定位、年份、链接及多个类别，再主动填写与问题相关的理由。

现有 CASE_DATA 和分析状态保持 v2 根字段。caseId 取对应 meta.id；选中案例使用独立的运行时与存储键。额外的案例目录属于 UI 层：`fieldnotes.ui.case-catalog.v1`；自建案例状态键为 `fieldnotes.ui.case.<id>.v2`。清空仅清当前案例分析，材料和其他案例保留。

自建案例导出采用外层文件封装，不改冻结的分析状态：

```js
{ format: 'fieldnotes-project-v1', caseData: /* existing v2 data pack */, state: /* existing v2 state */ }
```

导入先在内存中校验资料包、caseId、状态结构及引用，成功才替换对应案例。预置案例继续导出原 v2 状态 JSON，兼容旧文件。目录或状态无法保存时提示导出备份；不兼容存档不直接覆盖。

最新 `src/logic/index.js` 挂载 AppLogic，动作是 ITEM_ADD/ITEM_UPDATE 等，exportProject/importProject 仍抛未实现异常。它尚不能直接作为 CASE_RUNTIME 接入。保留其源码与独立 smoke-test；目前页面使用可工作的 UI 适配器。正式接入需对齐动作、完整导入导出、保存反馈与多案例实例创建，避免把部分实现当成完整运行时。

新增验证：`node src/ui/tests/cases-check.cjs` 检查案例隔离、材料引用、跨电脑载入、重启恢复、损坏资料包保护与清空范围。浏览器 QA 加入新建案例→添加多类别事实与来源→关联问题→切换→刷新→导出载入；截图另存 `frontend-qa-v3/`，不覆盖旧证据。新增案例与事实为明确标记的虚构测试内容。
