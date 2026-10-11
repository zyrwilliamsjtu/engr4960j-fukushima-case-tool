# 报告模板映射

只读来源：`Template_3.tex`（作业报告模板，未改）。对照工具现有 `items` / `relations` / `conflicts` 与资料包 `facts` / `sources`。不新增契约字段。

导出重排是否需要新增契约字段：否

重排能做的，是按下面的章节顺序原样搬入已有文本，并在对不上的地方放占位。占位不是新字段。若以后要把占位变成可填写的结构化输入，才需要改契约；本轮不做。

## 映射表

| 模板章节（原文标题） | 模板需要什么 | 可来自工具的哪一步 / 哪个字段 | 覆盖情况 |
|---|---|---|---|
| Case introduction | 不超过 100 词的案情与时间线 | 无。资料包时间线不是用户写的报告段落 | 🚫 不需要工具提供 |
| Identifying Ethical Issues | 说明这一步为何重要；问题按公司 / 工程师 / 其他分组；每条有标题和描述 | 第 1 步 `Q.text`；可选 `Q.actors` | ⚠️ 部分映射。工具是问句列表，没有公司/工程师/其他三类，也没有单独的问题标题 |
| Identifying Ethical Issues → Who or what is being affected, and how? | 至少三类利益相关方，以及各自如何受影响 | 无对应字段。`actors` 只是可选主体名单，不是分组影响说明 | ❌ 无来源 |
| Narrowing the Focus | 说明这一步为何重要；选定哪一条；直接/间接原因、严重性、范围、长短期后果、其他理由 | 第 2 步 `Q.isCore`、`Q.text`、`Q.focusReason` | ⚠️ 部分映射。工具只有一段聚焦理由，没有拆成模板的五段 |
| Determining Relevant and Missing Facts | 说明这一步为何重要 | 无单独字段 | 🚫 不需要工具提供（该段是报告正文） |
| Determining Relevant and Missing Facts → General Facts | 日期、地点、其他一般事实 | 无 | ❌ 无来源 |
| Determining Relevant and Missing Facts → Material Facts | 物质/工程事实 | 第 3 步已关联事实：`relations[kind=fact-supports-question]`，`facts.categories` 含 `material`，正文 `facts.text` | ✅ 直接可映射 |
| Determining Relevant and Missing Facts → Facts Regarding Individuals | 关于个人的事实 | 同上，`categories` 含 `individual` | ✅ 直接可映射 |
| Determining Relevant and Missing Facts → Facts Regarding Organizations | 关于组织的事实 | 同上，`categories` 含 `organization` | ✅ 直接可映射 |
| Determining Relevant and Missing Facts → Missing Facts | 缺失事实列表 | 第 3 步 `M.text` | ✅ 直接可映射 |
| Reasonable Assumptions | 先写为作出假设而提出的问题，再写假设与理由 | 第 4 步 `A.text`；依据 `A.basisRefs` | ⚠️ 部分映射。有假设正文和依据，没有「为作出假设而提出的问题」 |
| Undertaking Definitional Clarification | 至少 3 个术语：术语、定义、澄清、为何与本案相关 | 第 5 步 `C.word`、`C.others`、`C.mine` | ⚠️ 部分映射。三列对得上术语 / 他人理解 / 本组用法；没有「为何相关」 |
| Step 6. Applying Ethical Principles | 原则名称，以及为何适用于本案 | 第 6 步 `PA.principleId`（名称来自资料包原则表）、`PA.text` | ✅ 直接可映射（名称是所选原则的既有名称，理由是用户原文） |
| Step 6 → Rationale for exclusion | 未纳入的附录原则及排除理由 | 无 | ❌ 无来源 |
| Step 6 → Conflicts Between Principles | 原则冲突，以及如何取舍 | `conflicts.principleA/B`、`supportsA/B`、`priority`、`reason`、`scope` | ✅ 直接可映射 |
| Step 7. Review process | 回顾后才发现、前文没有的要素 | 第 7 步只有复核状态（未看 / 无需修订 / 需修订），没有发现文字 | ❌ 无来源 |
| Step 8. Solving Ethical Issues | 每个问题的短期方案与长期方案；回顾后才发现的问题及其短/长期方案 | 第 8 步 `R.text`、`R.reason`（经 `resolution-answers-question` 连到核心问题） | ⚠️ 部分映射。一段回答加一段理由，没有短期/长期两栏，也没有「回顾后新问题」 |
| Step 9. Identifying practical constraints | 四类：技术与工程、法规、文化、其他。每条有名称、描述、对本案的重要性 | 第 9 步 `RC.text`、`RC.alternatives`、`RC.mitigationJudgment` | ⚠️ 部分映射。工具是一条约束记录（是什么、当时还有哪些选择、是否减轻责任）。资料包提示词是深层文化规范、组织压力、信息不对称、时间压力、职业风险，不是模板四类 |
| Step 10. Avoiding/Predicting Ethical Issues in the future | 未来问题；工程方案 + 政府/法律方案 + 其他方案 | 第 10 步 `AV.text` | ⚠️ 部分映射。只有一条预防记录，没有三种方案分栏 |
| Self-Reflection report | 三个 AI 协作问题，各约 150 词 | 无。这是小组成员自己的反思 | 🚫 不需要工具提供 |
| References | 单独一页、APA 第 7 版、至少 10 条、字母序、文中要引用 | 事实条目上的 `sources[]`（`title`、`publisher`、`year`）以及 `quote`、`locator` | ❌ 无来源（作为文献表）。来源信息只能附在事实后面，不能生成 APA 文献表 |

各步开头的 “Describe why this step is important (50-100 words)” 都是报告正文，工具不提供，导出里只留一行提示。

## 特别核查

### 1. 利益相关方分组

模板要求。位置在 Identifying Ethical Issues 末尾：“Who or what is being affected, and how?”，并举例员工、供应商、客户、政府、当地社区等，至少三类，还要写如何受影响。

工具里最接近的是第 1 步可选字段 `actors`（涉及主体，逗号分开的名单）。它不是分组，也没有「如何受影响」。导出原样搬入已填的 `actors`，分组和影响说明用占位。

### 2. 短期 / 长期方案

模板要求。两处：

- Narrowing the Focus 里的 “Long-term and Short-term consequences”（后果，不是方案）。
- Step 8 每个问题下的 “Short-term solution” 与 “Long-term solution”，包括回顾之后才识别出的问题。

工具没有这两套字段。第 2 步只有 `focusReason`。第 8 步只有 `R.text` 与 `R.reason`。导出原样搬入这两段，短/长期分栏用占位。

### 3. 约束的分类

模板四类：

- Practical constraints related to technological & engineering part of the case
- Practical constraints related to Regulatory and Legal Frameworks
- Practical constraints related to the cultural environment
- Other practical constraints

工具第 9 步不是这四类。用户记录是 `RC.text`（约束是什么）、`alternatives`（当时的其他选择）、`mitigationJudgment`（是否减轻责任）。资料包里的可选提示是文化规范、组织压力、信息不对称、时间压力、职业风险。导出不替用户归入模板四类，原样搬入已写的三段，再放一条请自行归类的占位。

### 4. 参考文献 / 引用格式

模板要求单独的 APA 第 7 版文献表（至少 10 条，字母序，且在正文中被引用）。不能用 Wikipedia 或 ChatGPT。

`sources[].title`、`publisher`、`year` 加上事实上的 `quote`、`locator` 足以在事实后面附上可核对的出处，格式为 `[来源：title, publisher, year]`，并附引用句和定位。这是资料元数据，不是分析文字，也不是 APA 文献表。文献表仍须人工另写，导出只放占位。

## 缺口怎么处理

可以通过重排现有数据解决（不改契约）：

- 伦理问题原文与可选主体
- 核心问题原文与聚焦理由
- 已关联事实按物质 / 个人 / 组织三类搬入，并附来源、引用句、定位
- 缺失事实原文
- 假设原文与依据
- 术语、他人理解、本组用法
- 所选原则名称与适用理由
- 原则冲突各字段原文
- 对核心问题的回答与简要理由
- 约束三段原文
- 预防措施原文

模板需要、工具没有、因此只放占位（仍不新增字段）：

- 利益相关方分组及如何受影响
- 公司 / 工程师 / 其他问题分类
- 聚焦理由的直接/间接、严重性、范围、长短期后果
- 一般事实中的日期与地点
- 为作出假设而提出的问题
- 术语为何与本案相关
- 未纳入原则的排除理由
- 回顾后新发现的要素
- 短期方案与长期方案
- 约束的四类归档
- 未来问题的工程 / 法律 / 其他方案
- APA 文献表

不由工具提供：Case introduction，各步「为什么这一步重要」，Self-Reflection report。
