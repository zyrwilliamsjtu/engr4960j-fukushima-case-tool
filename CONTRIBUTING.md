# 贡献指南

## 分支命名

- `feat/ui-*` — 界面与样式
- `feat/logic-*` — 流程、校验、存储、导出
- `data/*` — 案例内容与数据结构
- `docs/*` — 文档与契约

## Pull Request

- 至少 **1 人** review 后方可合并。
- 使用仓库 PR 模板，并勾选 **「是否影响数据契约」**。
- 若契约变更，必须先升版本号并在小组群内通知（见 `docs/CONTRACT.md`）。

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

`docs/CONTRACT.md` 中的 `window.CASE_DATA` 与用户 `localStorage` 结构为组内接口。字段增删改必须先更新 `dataVersion` / `stateVersion`，经 review 并在群内公告后再合并。
