# Fieldnotes 前端交接

## 打开与打包

- 开发：双击根目录 `index.html`，相邻 `src/` 必须保留。
- 单文件预览：双击 `preview.html`。该文件内联所有 JS、CSS，无 CDN、API、字体下载或网络请求。
- 更新单文件：`python src/ui/build-preview.py`。
- 用户最新授权将 frontend 全部合入 main；最新逻辑与研究草稿完整保留。后续遵循 CONTRIBUTING 的直接维护 main 流程。本轮功能改动仍只在 UI 层，未修改 src/data、src/logic、tools 或 dist。
- 最终提交之前，由 PI 完成事实核实、接入逻辑层、运行正式构建，再按老师要求命名 `Group #… 4960.html`。目前 `preview.html` 可供前端独立评审，不能把待补资料或开发样例当作分析发现。

## 页面与体验（简化版）

本轮按用户反馈收敛界面：深蓝导航、蓝紫标题区、蓝灰底色与淡蓝/暖色填写卡片，少量黄绿色强调。所有装饰由本地 SVG/CSS 绘制，无图片或字体下载。

最新视觉调整见文末「资料用途与全页面改版」；历史设计说明保留，当前以最新补充为准。

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

## 2026-10-11：资料用途与全页面改版

「案例材料」改名为「资料与依据」。这里是原始材料的资料夹：先核对内容与出处，再手动选择相关事实、关联已有问题并填写理由。第 3 步仅展示选用的事实，多类别用标签表达，每条事实只显示一次。新增事实仅加入资料库，不自动选用，也不自动填推断或结论。信息缺口与选用依据分开填写。

事实抽屉默认开放，提供三类事实筛选；原文与出处折叠显示来源全名、章节/页码、英文引文、资料包置信度、核验备注与可用来源链接。待复核状态按资料包已有备注展示，不把 high 置信度解释为已核验。来源目录保留“仅书目元数据，不得作为事实依据”等原始备注。切换语言只翻译界面，资料原文及作者记录保留。

新版共用深蓝导航与蓝灰背景；理解、分析、行动分别采用蓝、紫、青绿，第 3 步使用青色，第 5 步使用紫色，第 9 步使用暖棕。桌面导航为 16px。统一十步写作卡片、双色概念对照、原则排序卡片、紧凑复核列表、资料卡片和弹窗；标题插画随步骤变化。移动端切换为横向步骤导航，保留键盘焦点、跳转链接、输入法与折叠状态。

前端接收负责人更新的 `dataVersion: "2.1"`，不修改 CASE_DATA 或分析状态契约。自建/载入资料包兼容 2.0 与 2.1；新建案例按当前模板版本，清空 facts、timeline、assessments 与 referenceLevel3。2.1 的 assessments 保留在资料包内，目前不展示为事实或自动判断。已有 2.0 案例与草稿无需迁移。

验证包括数据自检、逻辑冒烟、UI 状态与跨案例恢复、离线 Chrome 完整填写链、中英文各十步、60 组窄屏步骤检查及英文手机抽屉。新界面 QA 截图在 `docs/ai-logs/frontend-qa-v4/`，其中作者文本明确为虚构测试内容；仍不能代替真实 AI 聊天截图。

推送前同步了同学的核验标签修正、AppLogicRuntime 适配器与正式构建工具（065e73e）。没有切换当前工作台的运行时。使用同学提供的 `tools/build.py` 重新生成 `dist/index.html`，与源码和 preview 的界面一致。浏览器检查可通过 `FIELDNOTES_HTML=dist/index.html` 直接跑完整交付包，通过 `FIELDNOTES_QA_DIR` 另存截图，避免覆盖旧轮次。整合后的预览/交付截图分别为 `frontend-qa-v5/` 与 `frontend-qa-v5-dist/`。

v4 保留完整中英文十步及弹窗截图；v5 与 v5-dist 各保留原文出处、事实抽屉、概念页和英文手机抽屉四张代表图。合并后的两种 HTML 均运行完整检查，重复页面截图不重复入库。

导入先在内存中校验资料包、caseId、状态结构及引用，成功才替换对应案例。预置案例继续导出原 v2 状态 JSON，兼容旧文件。目录或状态无法保存时提示导出备份；不兼容存档不直接覆盖。

最新 `src/logic/index.js` 挂载 AppLogic，动作是 ITEM_ADD/ITEM_UPDATE 等，exportProject/importProject 仍抛未实现异常。它尚不能直接作为 CASE_RUNTIME 接入。保留其源码与独立 smoke-test；目前页面使用可工作的 UI 适配器。正式接入需对齐动作、完整导入导出、保存反馈与多案例实例创建，避免把部分实现当成完整运行时。

新增验证：`node src/ui/tests/cases-check.cjs` 检查案例隔离、材料引用、跨电脑载入、重启恢复、损坏资料包保护与清空范围。浏览器 QA 加入新建案例→添加多类别事实与来源→关联问题→切换→刷新→导出载入；截图另存 `frontend-qa-v3/`，不覆盖旧证据。新增案例与事实为明确标记的虚构测试内容。


## 2026-10-11：资料阅读工作区与引用体验

`src/ui/evidence-library.js` 替换原长卡片抽屉，使用独立的双栏阅读弹窗：左侧搜索与列表、右侧摘要/出处/原文/手写引用理由。手机采用上下布局，两个区域各自滚动；底部保留返回分析入口。UI 保持纯本地、无依赖、无请求。

- 搜索涵盖摘要、原文、定位、来源、备注与原始 ID；支持多词匹配、中文输入法组合、无结果清除筛选。
- 事实支持类别、来源、已引用筛选。来源目录可反查引用该来源的资料；时间线按日期文字排序，保留资料包的日期精度。
- 原文先于引用表单展示；“说明与问题的关系”跳到表单。用户主动提交后才 dispatch LINK；更新已有同一对事实/问题关系，保留 runtime 的去重机制。保存与移除后资料页保持打开。
- 每条事实、每个问题的未提交理由在当前页面会话内分别保留；切换列表、标签、语言、关闭再打开不会丢失。刷新页面不保留未提交理由，表单明确标注“未保存”；已提交关系仍由既有运行时保存。切换案例清除阅读区暂存，保持案例隔离。
- 原则可连续选取多项后回第 6 步填写适用理由与优先级，不代写理由。术语提示只创建空白定义栏。官方 assessments 继续不作为事实或自动结论展示。
- 依据选择弹窗优先展示已有依据/引用，支持搜索内容、原文和来源，过滤隐藏的勾选项仍提交；数量反馈和滚动列表避免长页操作。
- 新配色为深青标题、鼠尾草绿列表、暖纸色阅读区；十步仍共用深蓝导航与蓝灰画布，聚焦、假设、复核、预防增加阶段色。空状态给出返回问题/聚焦的实际操作入口。

模块接口：`FieldnotesLibrary.create(ctx)` 返回 `open(tab, id?)` 和 `isOpen()`。ctx 提供 data/state/locale 的动态 getter、dispatch、escape/materialText、翻译、只读状态与导航回调。依赖在 workbench 前以 classic script 加载，构建工具自动内联。CASE_DATA、分析状态契约、资料与逻辑源码都未改。

验证新增 `node src/ui/tests/library-check.cjs`：真实离线 Chrome 检查中英搜索/IME、来源反查、逐问题暂存、空白理由拒绝、主动引用/更新/移除、连续原则选择、待复核备注、空白术语、依据筛选，以及中英文 5 标签 × 4 屏宽。`browser-check.cjs` 继续检查中英文十步与完整写作流程。两套检查在 preview 和 dist 均通过；数据 TEXT_DIFF=0、逻辑冒烟 8/8、适配器 7/7、状态/案例恢复及交付静态检查通过。

浏览器检查默认只输出代表性截图，设置 `FIELDNOTES_QA_ALL=1` 可保存全部十步与弹窗。截图输出仍由 `FIELDNOTES_QA_DIR` 控制，请使用新目录避免覆盖。新 UI 证据在 `frontend-qa-library-final/`，dist 代表图在 `frontend-qa-library-final-dist/`；两张早期设计图另存于 `frontend-qa-library/` 和 `frontend-qa-library-v2/`。它们是页面 QA 图，不是 AI 对话截图。


## 2026-10-11：初学者提示与资料选择改版

资料用途：第 3 步选择事实并说明它与问题的关系；第 4 步用已选事实支撑假设、注明缺失信息；第 5 步核对术语来源并自己定义；第 6 步选择原则并解释适用性和冲突；第 7 步返回材料检查遗漏和反例。资料打开、阅读和提示轮换本身不会产生分析记录。

`src/ui/guidance.js` 提供每步至少 3 条中英提示，第 1 步 4 条，总计 31 条。首击展开、后续轮换、可关闭；提示序号与开关仅存页面会话，不写入冻结状态。提示是小组教学文案，不是教材原句或具体案例答案。

资料弹窗占可用视口 94%，桌面列表扩大到 43%，紧凑行显示摘要和核验标记，出处移到右侧阅读区。每页 12 条，搜索/类别/来源/已引用筛选覆盖整个库，筛选后回第一页。手机改为全高列表，点击后全高阅读，返回保留列表位置；引用理由暂存机制继续保留。1440、816、390px 宽 × 900px 高的检查均可显示至少 4 条完整条目。

同步 main 的正式运行时、导入导出与修订对比后，修复两个交互回归：同一引用更新保留关联 ID，避免重复记录；正式 store 目前只允许内置 caseId，因此自建案例保留兼容运行时并继续测试隔离/跨电脑导入。旧 v2.0 预览存档没有 idSeq，导入允许省略，由正式 store 初始化；自建案例仍严格通过兼容层结构校验。未修改 src/logic 或资料包。

验证：guidance-check.cjs 检查十步中英轮换、循环、提示不改状态、分页/全库搜索、移动分屏和溢出；browser-check.cjs 在 preview 与正式 dist 完整流程通过，library-check.cjs 在正式 dist 检查引用更新不重复、依据选择等。cases/runtime、logic smoke 8/8、adapter 7/7、export-import 5/5、数据 TEXT_DIFF=0、交付检查 13/13 均通过。原 Python browser-smoke 在本机使用共享 Chrome 配置启动时未取得 DOM；改用 Playwright 的隔离浏览器运行相同 tools/e2e/selftest.js，得到 PASS=20 FAIL=0 SKIP=0（未跳过检查）。

页面 QA 图在 docs/ai-logs/frontend-qa-guided-hints-v3/ 与 frontend-qa-guided-delivery-v3/。这是界面验证图，不是课程要求的 AI 聊天截图。


## 2026-10-12：预置资料英文层和引导式复核

`material-translations.js` 提供 FieldnotesMaterials.text(row, field, locale)。译文只应用于已知 ID 且字段与预置原文完全一致的记录；资料、来源、原文引文及分析存档不被改写。新增/修改后的自录字段保持原样。英文资料页覆盖 50 事实、33 原则、15 时间线、6 来源和 4 术语提示的可显示字段；来源状态和警告保留其原有含义，不代表重新核验。English/Chinese 搜索并行，资料页支持主动切换原文。第 3 步已选事实与出处、假设依据显示也使用相同翻译助手。

`review-workspace.js` 提供 FieldnotesReview.create(ctx) 的 render/input/click 接口。选择记录、筛选、检查角度与未提交原因仅存页面会话，切换案例清空；只有 Save 才写 review。Keep=checked，Revise=revise，Discuss=unseen + 必填 note，避免新增状态枚举。已有 unseen 且有 note 的记录显示为待讨论。需要修改时将原步骤标 stale；保留时用户明确确认后清除 needsReview。不会改写 text、word 或依据，也不自动将第 7 步标为完成。复核进度不是伦理评分。

上下文展示相关原始记录、概念两种理解、原则理由、假设依据、关联事实和手写关联理由。提供回原步骤修改、相关事实原文入口、保存并下一条和分类筛选。课堂视图只读；修复原页脚 review-step 在课堂模式仍可写状态的入口。

新检查 material-review-check.cjs：遍历所有资料条目，检查默认英文没有汉字，双语搜索、主动显示原文、资料不变；验证复核选择、必填原因、未提交草稿、自动进入下一条、筛选、回看标记、刷新恢复、快照/分析原文不改、四种屏宽与只读课堂。preview 与 dist 通过；完整写作流程、英文检查、资料交互与十步提示通过，data TEXT_DIFF=0、交付检查 14/14。QA 为 frontend-qa-guided-review-v2/v3 与 frontend-qa-guided-review-flow，全部使用明确标记的虚构测试记录，不是案例发现或 AI 对话截图。


## 2026-10-12：复核渐进展示
第 7 步的局部 UI 状态增加 part 和 phase（read/decide/reason），不写入分析状态。默认先选择部分；记录卡每次只呈现一个阶段，决定按钮和原因输入互不同时呈现。上下文/依据、选择其他记录与偏见清单按需展开。分类结束后回到部分选择，不自动摊开下一组。既有草稿、复核枚举、原因要求、快照保护和只读模式保留。

## 2026-10-12：资料阅读与时间线
同步 main 的英文单一来源更新后，资料列表移除待复核徽标；详细备注收纳于“资料备注”折叠项，保留原始出处、引文、可信度及备注。事实摘要字号 14px，桌面阅读正文 20px，出处与原文 14px；阅读区使用暖色背景与分层出处卡片，移动端继续列表/阅读分屏。

新增 FieldnotesTimeline.describe/sort，仅对显示顺序排序，不修改 CASE_DATA。精确时刻按时间排列，同日日期级记录单独注明时刻未明确；日期范围保留原文；持续事件独立成组。时间线连续显示全部 15 条，不再分页打断日期分组；双语搜索也覆盖译文日期。

同期修复第 7 步调用英文助手时将对象误当函数的问题（CT().biasLabel → CT.biasLabel）。此前进入记录会抛出异常；已用真实浏览器回归复核保存、草稿、刷新与只读保护。

验证入口：timeline-library-check.cjs（时间精度、双语、四屏宽、数据/状态不变），library-check.cjs（引用、搜索、来源、手机），material-review-check.cjs，review-layout-check.cjs。UI 截图在 frontend-qa-library-timeline-v2 与 frontend-qa-library-timeline-final，仅为界面验证材料。

## 2026-10-12：案例准备看板与总结阅读改版
首页默认提供新案例准备：案例名/背景、点击或拖放文本、PDF、图片文件，再进入分析；已有案例与演示资料仍可明确选择。仅提供文件时以文件名作为案例名。文件上限 20 个、合计 2 MB，界面会明确拒绝超额/不支持的格式。文本可直接阅读；PDF 依靠浏览器原生预览，图片原样显示，不自动提取事实或生成分析。

`FieldnotesIntake.create(ctx)` 的 render/click/input/submit 管理未提交准备内容，语言切换保留文本与文件。`FieldnotesCases.create(title,{brief,files})` 在自建案例包增加可选 caseMaterials 数组（id/name/kind/text 或 dataUrl/size/sourceId）；不增加冻结分析状态字段。对应 sources 使用 year=0（未知发表年），不将上传年误写为发表年。自建案例目录持久化，导出项目 JSON 包含原材料；import 验证 MIME、格式、来源引用与字段，兼容旧包。浏览器空间不足沿用 memory 状态提醒，仍可导出保存。

每步的“查看案例材料”入口与资料库新增 Case materials 标签提供背景/原文件回看；手工摘录、明确分类后调用 materialFact 添加事实，来源沿用原文件。阅读或摘录不自动关联问题；引用仍需自己选问题、说明相关理由。第 4 步可使用已摘录事实作为依据，第 7 步沿引用回查。无需联网或智能体。

SummaryReport 保留只读行为：头部指标、左侧问题/实际关联事实/原则、右侧只显示一次的判断与导出；结论标注已记录的问题关联或全案未关联。假设与全案原则、待补充、十步回放默认折叠，减少重复阅读。各问题仅显示实际关联的原则，不将全部假设/第一条结论重复分配给所有问题。

验证：intake-summary-check.cjs 实测拖放/点击、三种文件、超限/不支持格式拒绝、背景保留、十步入口、明确摘录、来源追踪、无自动分析/关联、刷新、跨浏览器存档、中英四屏宽、总结只读与不重复判断；cases-check、browser-check、library-check、english-check 和隔离浏览器 demo-verify 通过。页面 QA 在 frontend-qa-intake-summary-final-v2，仅是虚构 QA 内容，不是课程 AI 聊天截图或案例结论。

## 2026-10-12：十步阅读与编辑排版
正式 index.html 和 index.demo.html 共用改版：缩小步骤头图、取消装饰图占位；标题/正文/出处采用清晰字号层级，背景统一为浅暖绿，三个阶段保留不同强调色。编辑页的问题/预防记录在宽屏并排，长事实改为展开一个条目的阅读列表；演员、原文、原则设置继续按需展开。
第 2 步取消重复问题文本框，核心问题的选择理由直接填写，调整措辞单独展开；第 4 步依据以数量、入口和逐条列表呈现，推断理由按需回看；第 5/9 步两种概念理解、可行选择/责任判断以对照面板呈现，手机单列；第 6 步精简重复编号；第 7 步保留已有逐部分流程。
课堂模式的各条记录使用键盘可操作的 details/summary，默认展开首条，展开另一条时收起上一条；宽屏收起项并排，展开项占整行。折叠状态只在 UI，切换语言保留，不写分析存档。辅助候选词与编辑动作不铺到课堂页面，判断和原文均保留。
验证 step-reading-check：两份最终 HTML × 中英文 × 十步 × 1440/816/390/320px，文本不溢出、键盘展开、同一时刻最多一项、浏览状态不改、按需编辑问题/依据等；写作全流程、提示、复核、修订按钮对比度、英文和案例材料迁移检查通过。演示检查主动展开对应原文后验证成员内容，13 项通过。QA 在 frontend-qa-step-reading-final-v2，正式版内容为虚构测试，演示内容保留小组来源。

## 2026-10-12：案例准备入口蓝色主题
按用户要求将开始前的准备看板改为与导航一致的深蓝/雾蓝/浅蓝灰。顶部选项卡深蓝底、选中项浅蓝，输入区和上传区统一冷色；上传图标使用已有线条风格 SVG，文件行与移除按钮增强可辨识度，开始按钮采用蓝色渐变。已有案例选中态及语言开关一并调整；首页标题明确分为两行，避免手机末尾孤字。所有规则限定在首页，不改后续步骤内容及材料存储。
三份 HTML 已重建。intake-summary-check 验证双语、上传/拖放、四屏宽、案例存档/材料沿用等通过，交付静态检查 14/14。最新 QA 在 frontend-qa-intake-blue-final。

准备面板进一步加深蓝色（2026-10-12）：显式标签选择不再被演示默认覆盖，输入草稿随切换保留；自动展示限定内置样例，用户新建案例进入编辑。新增 intake-tabs-check.cjs 检查双版本点击/键盘、语言与四屏宽。准备过程不写分析记录。

第 3 步布局修复（2026-10-12）：步骤整体为单列，事实摘要网格只应用在事实列表内部；信息缺口独立 section 并单独编号。stage-section-count 显示真实条目数量。step3-layout-check.cjs 覆盖宽屏/窄屏、中英和编辑/展示的块宽度及垂直顺序，避免通用网格再次将整组材料挤到一侧。

准备页与导航（2026-10-12）：准备页按视口高度布局，主操作始终可见，长文件/案例列表拥有内部滚动。工作台 render 捕获导航坐标，restoreNavigationScroll 在工作台和总结重建后恢复；UI 状态不写入分析存档。viewport-navigation-check.cjs 覆盖双版本、双语、九个视口和真实点击后的滚动保留。
