# AI 协作日志（作业 1.2 交付物）

本文件记录开发与 AI 工具（如 Cursor）的每次迭代，供 vibe-coding 证据提交使用。

## 硬性要求

每次记录须包含：

- **日期**（YYYY-MM-DD）
- **提示词要点**（做了什么、约束是什么）
- **产出**（改了哪些文件或决策）
- **截图路径**（对话或结果截图的相对/绝对路径）

## 填写规范

- 按时间**倒序**追加（最新在上）或正序追加，组内统一一种即可；当前采用**正序追加**。
- 提示词要点用条目，避免粘贴整段密钥或隐私信息。
- 截图建议放在 `docs/ai-screenshots/`（若创建该目录），文件名含日期。

## 模板条目

```markdown
### YYYY-MM-DD — 简短标题

- **提示词要点**：
  - …
- **产出**：
  - …
- **截图**：`docs/ai-screenshots/YYYY-MM-DD-xxx.png`（待补）
```

---

### 2025-XX-XX — 脚手架搭建

- **提示词要点**：
  - 初始化仓库目录、契约、占位数据与 index.html 静态外壳；禁止 CDN/构建/真实福岛事实。
- **产出**：
  - 仓库脚手架、`docs/CONTRACT.md`、`src/data/fukushima.js` 占位结构等。
- **截图**：待补（本文档由 Cursor Agent 生成）

### 2026-10-11 — CONTRACT v2 与原则库

- **本轮目标**：同步 PRODUCT v1.0，正式化数据契约 v2，填入 33 条原则库与 mock 状态。
- **提示词要点**：
  - 仅文档与静态数据；不实现 logic/ui；禁止福岛真实事实与 CDN/构建。
  - CONTRACT 依据 PRODUCT 第九～十一节；原则英文原文逐字照抄。
- **产出**：
  - `docs/PRODUCT.md`（v1.0 全文 + 状态头）
  - `docs/CONTRACT.md` v2.0
  - `src/data/fukushima.js`（原则库 + steps 骨架）
  - `src/data/mock-state.js`（stateVersion 2.0）
  - `docs/DECISIONS.md` 追加 4 条
- **备注**：截图由 PI 补入 `docs/ai-logs/`

### 2026-10-11 — CONTRIBUTING 与 CONTRACT 冻结前修订

- **本轮目标**：补齐协作规则；消化 4 项契约歧义（nameEn、ID 命名空间、isCore/focusReason、字段→存储映射）。
- **提示词要点**：
  - 追加 CONTRIBUTING 四节；修订 CONTRACT 与占位 id；不改原则库与业务逻辑。
- **产出**：
  - `CONTRIBUTING.md`、`docs/CONTRACT.md`、`src/data/fukushima.js`、`src/data/mock-state.js`、`docs/DECISIONS.md`
- **备注**：截图由 PI 补入 `docs/ai-logs/`

### 2026-10-11 — 阶段 B：src/logic 状态层骨架

- **阶段名**：阶段 B（逻辑层）
- **目标**：实现 `getState` / `dispatch` / `validateStep` / `subscribe` / 快照 / storage 降级；`tools/smoke-test.js`。
- **提示词要点**：契约 v2.0 为准；不碰 UI 与 fukushima.js；Node 可测；ID 不回收。
- **产出**：`src/logic/*.js`、`tools/smoke-test.js`
- **备注**：截图待 PI 补入 `docs/ai-logs/`；阶段 A 草稿在分支 `docs/fukushima-facts-draft`

### 2026-10-11 — 静态数据写入 fukushima.js（dataVersion 2.1）

- **提示词要点**：
  - 仅据 `fukushima-facts-draft.md` 写入 timeline/facts/assessments/sources；契约 2.1；`tools/check-data.js`。
- **产出**：
  - `src/data/fukushima.js`、`docs/CONTRACT.md`、`tools/check-data.js`、`src/data/mock-state.js`（注释与示例 relation）
- **截图**：待 PI 补入

### 2026-10-11 — NAIIC / TEPCO 本地 PDF 抽取（阶段 2）

- **提示词要点**：
  - 只读 `ass1/refs/` 已有 PDF；新增 20–30 条逐字引用；官方分歧表；不改 fukushima.js。
- **产出**：
  - `docs/research/fukushima-facts-draft.md`（src-004/005，+24 条，分歧表，ev-006–009）
- **截图**：待 PI 补入

### 2026-10-11 — IAEA 引文对抗式核验（阶段 1）

- **提示词要点**：
  - 仅本地 `.pdf-cache/`；禁止联网；46 条逐条核验；产出 verification.md；⚠️ 降置信度。
- **产出**：
  - `docs/research/fukushima-facts-verification.md`
  - `docs/research/fukushima-facts-draft.md`（8 条 ⚠️）
  - `.gitignore` 增加 `.pdf-cache/`、`*.pdf`
- **截图**：待 PI 补入
- **阶段 2**：`ass1/refs/` 下 NAIIC/TEPCO PDF 未检测到，未执行。

### 2026-10-11 — 事实草稿逐字引用与条目扩充

- **提示词要点**：
  - 仅改 `docs/research/fukushima-facts-draft.md`；删除重复/报告元条目；各表增加「原文引用（逐字，英文）」列；自 IAEA PDF 文本缓存补 8–12 条；第 6 节汇总缺失依据；不改 `fukushima.js` / UI / logic。
- **产出**：
  - `docs/research/fukushima-facts-draft.md`（删 9 条、增 11 条、全表逐字引用）
- **截图**：待 PI 补入

### 2026-10-11 — Fieldnotes 前端实现与真实浏览器迭代

- **用户目标**：读取最新 main 与本地产品功能草案，创建 frontend 分支；实现美观、人性化的中英文前端，在本地 frontend 文件夹开发并推送，暂不合并。
- **本轮真实迭代**：
  1. 阅读产品与数据契约，建立十步工作台、材料抽屉、双语 UI 和可替换预览适配器。
  2. 增加推理关联、两槽快照、手写判断、排序双通道、独立展示与隔离 mock。
  3. 检查并修正快照保存顺序、展示起始步骤、重复自定义原则字段、依赖方向、中文输入法组合、mock 概念清空兼容、存储恢复提示。
  4. 离线 Chrome 跑完整填写流程、双语各十步、JSON 下载、刷新恢复、快照差异、展示隔离、手机布局。首次测试发现导航定位器同时命中品牌链接与步骤按钮，已把测试定位限制为 step-nav。
- **产出**：index.html、src/ui/、src/styles/workbench.css、preview.html、docs/FRONTEND.md。
- **数据边界**：未编辑 src/data、src/logic、tools、dist、CONTRACT 或本地用户草案；未补造福岛事实。
- **截图**：docs/ai-logs/frontend-qa/ 是实际界面 QA 截图，含明确虚构测试文本；不是 AI 聊天截图。真实对话截图待组员从当前聊天保存，不伪造迭代或截图证据。


### 2026-10-11 — 用户反馈后的简化与视觉重做

- **实际用户反馈**：布局乱、色彩太淡、功能繁杂、说明文字过多；要求先做简单版本，后续扩展，并大幅美化。
- **本轮调整**：重新设计蓝白视觉与 SVG 插画；三栏改为导航加填写区；移除三视图和固定底部工具栏；材料与文件操作按需打开；删除重复说明、原始 ID 展示和重复添加按钮；低频表单折叠。
- **真实修订**：修正折叠区在自动保存重绘后关闭的问题，保留中文输入法组合；对原则关联设置采用折叠展示；精简旧界面未使用的视图代码，不再默认加载 mock。
- **验证**：真实离线 Chrome 完整填写十步，中英文切换、JSON 下载、无效导入保护、刷新恢复、中文输入法、四种屏宽；在用户当前 IAB 标签页刷新并查看新页面。
- **记录**：新 UI 截图在 docs/ai-logs/frontend-qa-v2/，旧图保留；这些仍是页面 QA 截图，真实 AI 对话截图须由组员从聊天界面保存。

### 2026-10-11 — 最新仓库整合、通用案例与配色优化

- **真实用户要求**：完整读取仓库最新内容，把 frontend 全部合入 main；工作台泛化，去掉具体事故名称；导航字体放大，中部减少纯白。
- **读取与整合**：读取 main 新增的逻辑实现、冒烟测试、研究草稿及引用、最新协作规则；双方日志冲突按追加方式保留完整记录；大改前推送 checkpoint-before-workbench-consolidation 标签。
- **实现**：通用工作台标题与侧栏文案；15px 桌面导航；蓝紫标题、蓝灰背景和有色填写卡片；UI 层增加轻量案例选择、新建、独立草稿、人工添加事实/来源/多标签、可携带材料的 JSON 封装。
- **边界**：未改静态 data 与 PI logic；最新 AppLogic 导入导出仍未实现，继续使用可替换的 UI 运行层；研究草稿保持未经审阅状态，不自动发布为事实；分析状态的 v2 根字段保留。
- **验证**：Node 逻辑冒烟 8/8；UI 状态检查与案例隔离/跨电脑恢复检查通过；离线 Chrome 中英文各十步、完整写作链、自建案例事实关联、刷新/切换/导入、损坏文件保护、IME、四种屏宽通过；零页面错误、零外部请求；预览服务 HTTP 200，IAB 显示新版且保留原先第 5 步状态。
- **截图**：docs/ai-logs/frontend-qa-v3/（明确虚构的 QA 输入）。以前两轮 QA 截图完整保留。这些是页面检查截图，不能替代真实 AI 对话截图；真实对话截图仍需从聊天界面保存。

### 2026-10-11 — 推送前保留同期 main 资料更新

- 提交前 fetch 发现 main 新增 a641e41 与 d9d0ac7；完整读取引文核验报告、扩展事实草稿、官方报告分歧表与日志新增内容，再普通合并。两轮同学提交完整保留，研究材料未被前端写入预置事实。
- 应用源码与预置数据未因这次同步改变，保留此前离线浏览器验证结果；再次检查冒烟测试、合并完整性与 diff 格式。
