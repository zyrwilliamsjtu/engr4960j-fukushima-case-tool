# 贡献指南

## 分支命名（历史遗留）

早期使用过 `feat/*`、`docs/*`、`data/*` 等分支。现已改为单分支直推 `main`，
新工作不再创建分支。若因特殊原因需要临时分支，仍沿用上述前缀，用完即删。

## 工作方式：单分支直推

- **所有工作直接在 `main` 上进行**。不再创建功能分支，不再创建 Pull Request。
- 工作流固定为：`git pull --ff-only` → 改动 → 本地自测 → `git add` → 提交 → `git push origin main`。
  若 `--ff-only` 失败改用 `git pull --no-rebase`（允许产生合并节点），然后再推送。
- 每完成一个可独立验证的小块就推送一次。**不要攒一周再推**，避免大范围冲突。
- 提交信息仍用 Conventional Commits（`feat:` / `fix:` / `data:` / `docs:` / `chore:`）。

## 推送前闸门（替代 PR 审查）

推送前必须逐条确认，**任一项不通过就不推送**：

1. `node tools/smoke-test.js` 全部 PASS（逻辑层相关改动必须跑）。
2. 双击 `index.html` 能正常打开、控制台无报错。
3. `git status` 干净，且没有临时文件、调试输出、密钥。
4. 未引入任何外部依赖、CDN、ES Module、`fetch()`。

## 回退方式

- **禁止** `git push --force`、rebase、`git reset --hard`：不得改写已推送的历史。
- 需要撤销某次推送时，用 `git revert <sha>`（生成反向提交，安全）。
- 大改动前先打标签：`git tag checkpoint-<说明>` 并 `git push origin <tag>`。

## 提交信息（Conventional Commits）

- `feat:` 新功能
- `fix:` 缺陷修复
- `data:` 案例数据或契约数据变更
- `docs:` 仅文档
- `chore:` 脚手架、工具、杂项

## 三条红线

1. **禁止**引入任何外部依赖（无 `package.json`、无 npm 包）。
2. **禁止**使用 CDN 或外链 JS/CSS。
3. **禁止**将 API Key 或密钥写入代码或仓库。

## 契约冻结

- `docs/CONTRACT.md` 中的 `window.CASE_DATA` 与用户 `localStorage` 结构为组内接口。
- 字段增删改必须先升 `dataVersion` / `stateVersion`，**在小组群公告**，然后再改代码。
- 不再需要 PR review。
- 若发现契约与实际实现不一致，以契约为准修正实现；确需改契约的，按上一条处理。

## 目录归属（减少冲突）

| 目录 / 文件 | 主要归属 | 说明 |
|---|---|---|
| `src/ui/`、`src/styles/` | 界面负责人 | 另一位不直接改 |
| `src/data/`、`src/logic/` | 数据与逻辑负责人 | 另一位只读 |
| `index.html` | 界面负责人 | 脚手架由数据与逻辑负责人建立，之后归界面负责人 |
| `docs/CONTRACT.md` | 双方共管 | 改动走契约冻结流程 |
| `docs/AI-LOG.md`、`docs/ai-logs/` | 双方各自追加 | **只增不改**，不得回改对方记录 |
| `tools/build.py`、`dist/` | 数据与逻辑负责人 | — |

> 归属只表示「谁主责」，不表示「另一位不能提意见」。
> 跨归属改动建议先在群内说一句，避免同时改同一文件。

## 每轮收尾清单

提交前逐条确认：

- [ ] 本轮与 AI 的对话截图已存入 `docs/ai-logs/`，并在 `docs/AI-LOG.md` 追加一条
- [ ] `docs/DECISIONS.md` 已记录本轮「为什么这么定」的决策（如有）
- [ ] `node tools/smoke-test.js` 全部 PASS（逻辑层改动必做）
- [ ] 双击 `index.html` 仍能打开、控制台无报错
- [ ] 大改动前已打 checkpoint 标签
- [ ] 未引入任何外部依赖、CDN、ES Module 或 `fetch()`
- [ ] 若改了契约字段，已升 `dataVersion` / `stateVersion` 并通知小组群
- [ ] 提交信息符合 Conventional Commits
