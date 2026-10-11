# 审查发现（含未修复）

日期：2026-10-11。证据主文件：`docs/audit/audit-report.md`。截图：`docs/audit/viewport-*.png`。
自动化结果：`SUMMARY: PASS=55 FAIL=1 SKIP=0`，`ALLOWED_SKIPS` 为空。唯一 FAIL 是 `D5-2`（没有推理总览），未改判、未改成 SKIP。

严重度：🔴 阻断 / 🟡 摩擦 / 🔵 优化或需人工。

## 已修复

### 🟡 形式校验打在错误的存储上

- 证据：`AppLogicRuntime.validateStep` 调用 `AppLogic.validateStep(step, state)`，但门面在统一工厂后只校验默认脚手架实例，第二参数被丢掉。帮助里的提醒因此对不上用户正在写的内容。
- 改前：适配器 `return root.AppLogic.validateStep(step, getState())`。
- 改后：`createInstance` 固定调用 `validate.js` 的两参数实现；适配器改为 `return logicInstance.validateStep(step)`。对外 8 个方法的名字和「门面校验默认实例」的语义没变。
- 复跑：`smoke-test` PASS=8；`adapter-test` PASS=8；审查里非问句会进入提醒文案。

### 🟡 提醒只藏在「帮助」里

- 证据：走查时步骤正文没有「待回看」，`D5-4` 最初 help 文本里没有问句提醒。
- 改后：步骤正文在提示卡下方插入既有的 `warningBlock`（默认折叠，不阻断下一步）。帮助弹窗里的同一块保留。

### 🟡 前 5 步看不出课堂范围，演示模式没有入口

- 证据：`presentInClass` 只在数据里；`presentation` 变量只被赋成 `null`；界面没有 `data-action="present"`。审查记为红灯摩擦。
- 改后：侧栏 1–5 步加「课堂」标记；顶栏「课堂展示」把当前状态做成只读副本，「返回编辑」退出。既有编辑、导出、关联都还在。
- 复跑：`D4-1`、`D4-2` 为 PASS。

### 🔵 下一步按钮 12px

- 证据：`.step-footer .button` 计算字号 12px，低于方案里主按钮 14px。
- 改后：页脚按钮 14px。三视口 `D7-2-primary` 均为 14，且无横向溢出。

## 后续已补（2026-10-11）

### 推理总览（D5-2 转为 PASS）

- 底部工具栏在「对比修订」之后增加「推理总览」。只读弹窗，数据来自当时的 `items` / `relations` / `conflicts`，不写回状态。
- 课堂视图只显示核心问题、相关事实、信息缺口、假设、待澄清概念。完整视图再加原则取舍和结论。
- 未选核心问题时显示：「尚未选定核心问题。请先在第 2 步从伦理问题中选出 1–2 条作为分析焦点。」
- 审查：`D5-2`、`D5-2b`、`D5-2c`、`D5-2d`、`D5-2e`、`D5-2f`、`D5-2f-empty` 均为 PASS。打开前后 `getState()` 一致。

### 按模板分区的导出

- 「存档 ▾」保留原来的「导出素材（Markdown）」（按 10 步）。新增「导出报告素材（按模板分区）」。
- 章节顺序见 `docs/audit/template-mapping.md`。用户已写的文字原样搬入。模板有、工具没有的内容只放 `⚠️ 需人工补充` 占位。案例介绍和自我反思只留「须由小组成员独立撰写」。
- 导出重排是否需要新增契约字段：否。下面这些小节因此仍是占位，不是未实现的导出bug：利益相关方分组及如何受影响、短/长期方案、约束的技术/法规/文化/其他四类、排除理由、回顾后新发现、一般事实的日期地点、假设前的提问、术语为何相关、三种未来方案、APA 文献表。
- `D5-7` PASS：菜单项可触发，文件名 `fukushima-report-material-YYYYMMDD.md`，导出长度大于 0。

## 仍未做

- 填写示例默认收起。界面同事刚收过提示卡，本轮不强制展开。
- 下一步在首屏之下。不缩小英雄区。
- 缺失事实留在第 3 步，不搬到第 4 步。
- 工具栏小按钮和资料库部分文字仍是 12px。
- 上面列出的模板小节不新增契约字段。

## 复跑（推理总览与模板导出之后）

- `node tools/smoke-test.js` — PASS=8 FAIL=0
- `node tools/adapter-test.js` — PASS=8 FAIL=0
- `node tools/export-import-test.js` — PASS=6 FAIL=0
- `node tools/check-data.js` — FAIL=0
- `python tools/build.py` — 已重建 `dist/index.html`
- `python tools/check-dist.py` — PASS=13 FAIL=0
- `python tools/browser-smoke.py` — SUMMARY: PASS=26 FAIL=0 SKIP=0
- `python tools/audit/run-audit.py` — SUMMARY: PASS=63 FAIL=0 SKIP=0

审查脚本在读到标题里的 `AUDIT_DONE` 后不再立刻结束进程，而是等到 `audit-json` 出现。否则 Edge 先吐出标题、后吐出文末结果，存储失败那一轮会被截断。判定标准没有放宽。

## 仍记录的旧项（本轮不改）

### 🟡 填写示例默认收起

- 证据：`step-hint-panel` 在 10 步上都是 `hidden`。英雄区简介是可见的（`D3-2` PASS）。
- 不修的原因：界面同事刚把提示卡缩小并默认收起。强行展开会抵消那轮排版。示例仍可通过「填写提示」打开。

### 🟡 下一步在首屏之下

- 证据：审查摩擦「next.top > innerHeight」（约 805px 高的视口，英雄区很高）。
- 不修的原因：缩小英雄区会碰到刚放大的步骤标题。演示时需要滚一次到页脚。

### 🔵 第 4 步与教材的「缺失事实」拆开了

- 证据：缺失事实在第 3 步，第 4 步主要是假设和依据。教材附录把两者写在同一步。
- 不修的原因：搬字段会改步骤信息架构。

### 🔵 导出对不齐报告模板的若干小节

- 2026-10-11 后续：已加按模板分区的导出，见文末。不新增契约字段。对不上的小节只放占位，不代写。按 10 步的原导出保留。

### 🔵 工具栏小按钮和资料库部分文字仍是 12px

- 证据：页脚主按钮已到 14px；`.button.small` 与资料库阅读区仍有 12px 规则。
- 不修的原因：全局加大容易在 1024 宽把工具栏撑出横向滚动。留给投影彩排决定。

### 🔵 硬红线词没有命中，软词需要人看

- 证据：`D1-1` hard=0，soft=6。出现在「建议」（形式提醒）、「结论/答案」（用户自己填写的槽位名，如「我的判断」）。
- 未发现程序把判断句写入回答。`ANSWER` 创建的是 `text: ""`。第 8 步 `referenceLevel3 === null`，参考按钮禁用（`D1-3` / `D1-3b`）。

## 三种身份的摩擦（修复前记录，修复后状态写在括号里）

### P1 首次使用者

1. 🟡 示例卡默认收起（仍在）。证据：`hintHidden` 全为 true。英雄区有步骤说明。
2. 🟡 形式提醒不在步骤上（已把折叠提醒放到步骤里）。
3. 推理总览已补上（见文末）。课堂视图可指着问题、事实、缺口、假设和待澄清概念讲。
4. 🔵 首屏主按钮是「添加问题」，但品牌名 fieldnotes 比课程任务更醒目。

### P2 课堂演示者

1. 🔴 没有演示入口（已加「课堂展示」只读切换）。
2. 🟡 导航看不出 1–5 步是课堂范围（已加「课堂」标记）。
3. 🟡 下一步在首屏下（仍在）。
4. 交互次数（修复后脚本，含导航）：第 1 步 10、第 2 步 4、第 3 步 7、第 4 步 4、第 5 步 5。第 3 步最重，因为要打开资料库、选问题、写理由、保存、返回。没有单步超过 12 次。这是脚本最小路径，不含口播。

### P3 审查老师

1. 🔵 软词「结论 / 答案 / 建议」在标签和提醒里，不是程序生成的判断。
2. 硬词「参考答案 / 正确答案 / 建议结论 / 自动生成 / 一键生成」命中 0。
3. 第 8 步没有可用的参考观点入口。

## 复跑闸门（修复之后）

- `node tools/smoke-test.js` — PASS=8 FAIL=0
- `node tools/adapter-test.js` — PASS=8 FAIL=0
- `node tools/export-import-test.js` — PASS=5 FAIL=0
- `node tools/check-data.js` — FAIL=0
- `python tools/build.py` — 已重建 `dist/index.html`
- `python tools/check-dist.py` — PASS=13 FAIL=0
- `python tools/browser-smoke.py` — SUMMARY: PASS=26 FAIL=0 SKIP=0
- `python tools/audit/run-audit.py` — SUMMARY: PASS=55 FAIL=1 SKIP=0（失败项仅为 D5-2）
