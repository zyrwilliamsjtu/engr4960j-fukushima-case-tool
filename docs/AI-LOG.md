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
