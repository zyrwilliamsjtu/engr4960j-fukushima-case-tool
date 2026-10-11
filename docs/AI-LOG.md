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
