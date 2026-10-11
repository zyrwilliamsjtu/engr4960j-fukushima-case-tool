> ⚠️ 本文件为 AI 检索的**未经审阅草稿**。任何内容在 PI 逐条核实前，不得写入
> `src/data/fukushima.js`。本文件不是产品内容，只是核对工作台。
>
> 本版仅基于实际抓取成功的官方 PDF 直链；被拦截的站点记录于第 6 节。

# 福岛第一核电站事故 — 事实检索草稿（IAEA PDF 通道）

## 1. 来源清单

| 编号 | 标题 | 出版方 | 年份 | URL | 访问日期 | 抓取方式 |
|---|---|---|---|---|---|---|
| src-001 | THE FUKUSHIMA DAIICHI ACCIDENT — REPORT BY THE DIRECTOR GENERAL | International Atomic Energy Agency (IAEA) | 2015 | https://www-pub.iaea.org/MTCD/Publications/PDF/Pub1710-ReportByTheDG-Web.pdf | 2026-10-11 | WebFetch / 本地 PDF 文本缓存 |
| src-002 | The Fukushima Daiichi Accident — Technical Volume 1/5: Description and Context of the Accident | IAEA | 2015 | https://www-pub.iaea.org/MTCD/Publications/PDF/AdditionalVolumes/P1710/Pub1710-TV1-Web.pdf | 2026-10-11 | WebFetch / 本地 PDF 文本缓存 |

| 编号 | 标题 | 出版方 | 年份 | URL | 访问日期 | 抓取方式 |
|---|---|---|---|---|---|---|
| src-003 | The Fukushima Daiichi Accident（书目页 STI/PUB/1710） | IAEA | 2015 | https://www.iaea.org/publications/10962/the-fukushima-daiichi-accident | 2026-10-11 | **元数据来自搜索结果，待 PI 在浏览器核对**；HTML 正文未抓取（Cloudflare） |

---

## 2. 时间线

| 编号 | 日期 | 事件（中文一句话） | 来源 | 章节/页码 | 置信度 | 备注 |
|---|---|---|---|---|---|---|
| tl-001 | 2011-03-11 | 东日本大震灾（Great East Japan Earthquake）发生。 | src-001 | Executive Summary 首段 | 高 | 原文："occurred on 11 March 2011" |
| tl-002 | 2011-03-11 | 地震震级为 9.0，海啸在包括东北海岸在内的日本沿岸造成多道浪，部分浪高超过十米。 | src-001 | Executive Summary | 高 | 原文："magnitude of 9.0" / "heights of more than ten metres" |
| tl-003 | 2011-03-11 14:46 JST | 主震发生于日本标准时间 2011 年 3 月 11 日 14:46（星期五）。 | src-002 | §1.1.1 Main occurrences | 高 | 原文："14:46 Japan Standard Time (JST) ... Friday 11 March 2011" |
| tl-004 | 2011-03-11 | 福岛第一核电厂（Fukushima Daiichi NPP）因地震损坏场外输电线路，因海啸严重破坏厂内运行与安全基础设施。 | src-001 | Executive Summary | 高 | 运营商为 TEPCO，同段 |
| tl-005 | 2011-03-11 | 场外与场内电力丧失，三台运行中的反应堆及乏燃料池失去冷却功能。 | src-001 | Executive Summary | 高 | 原文："loss of the cooling function at the three operating reactor units" |
| tl-006 | 2011-03-11 及之后 | 1–3 号机组堆芯过热、燃料熔化，三个 containment vessels 被 breach。 | src-001 | Executive Summary | 高 |  |
| tl-007 | 2011-03-11 及之后 | 1、3、4 号机组 reactor buildings 内发生氢气相关爆炸并造成结构/设备损坏。 | src-001 | Executive Summary | 高 |  |
| tl-008 | 2011-03-11 及之后 | 放射性物质释入大气并沉积于陆地与海洋，亦有直接向海释放。 | src-001 | Executive Summary | 高 |  |
| tl-009 | 2011-03-11 及之后 | 厂址半径 20 km 及部分指定区域人员被疏散；20–30 km 先 shelter 后建议自愿撤离。 | src-001 | Executive Summary | 高 |  |
| tl-010 | 2011-03-11 | 海啸浪超过福岛第一核电厂海啸防护，淹没厂内主/备电源与最终热阱等设备，六台机组均受影响。 | src-002 | §1.1 Summary of the accident | 高 |  |
| tl-011 | 2011-03-11 及之后 | 1–5 号机组经历长时间全厂断电（SBO）；1、2 号超过 9 天，3、4 号超过 14 天。 | src-002 | §1.1 | 高 |  |
| tl-012 | 2011-03-11 及之后 | 1–3 号机组 RPV 最终 breach，放射性物质经可控 vent 或 confinement 失效释出。 | src-002 | §1.1 | 高 |  |
| tl-013 | 2011-03-11 及之后 | 为降低照射，20 km 内及周边指定区域疏散，食品与饮用水分销/消费受限。 | src-002 | §1.1 | 高 |  |
| tl-014 | 2012-09 | IAEA 总干事在 2012 年 9 月大会宣布 IAEA 将编写福岛第一事故报告。 | src-002 | 前言 / Director General 说明段 | 高 | 报告编写启动节点 |
| tl-015 | 2015 | IAEA 总干事报告（src-001）付印信息为 2015 年 8 月（PDF 版权页）。 | src-002 | 版权页 | 高 | 用于区分报告写作时点 |

---

## 3. 事实：物质 / 技术类（`f-mat-`）

| 编号 | 事实（中文一句话，只写客观事实） | 来源 | 章节/页码 | 置信度 | 备注 |
|---|---|---|---|---|---|
| f-mat-001 | 福岛第一核电厂址共有六台核电机组（Units 1–6）。 | src-002 | §1.1；目录 §1.3.3 提及 Units 4–6 outage | 高 |  |
| f-mat-002 | 2011-03-11 海啸淹没厂内主、备电源系统及最终热阱相关设备/结构。 | src-002 | §1.1 | 高 |  |
| f-mat-003 | 地震在 tsunami 之前已造成场外输电系统损坏。 | src-002 | §1.1 | 高 |  |
| f-mat-004 | 1–3 号机组因长时间失去电力与排热，燃料过热并熔化，RPV 最终 breach。 | src-002 | §1.1 | 高 |  |
| f-mat-005 | 1、3、4 号机组 reactor buildings 内发生与氢气释放相关的爆炸。 | src-001 | Executive Summary | 高 |  |
| f-mat-006 | 设计中的地震/海啸 hazard 主要依据日本历史地震记录与海啸证据评估。 | src-001 | Executive Summary（设计基准段） | 高 |  |
| f-mat-007 | 记录到的 ground motions 与 tsunami 波高均显著超过设计基准。 | src-001 | Executive Summary | 高 |  |
| f-mat-008 | 海啸 flooding 同时挑战了前三个运行机组的相关系统（报告 Executive Summary 表述）。 | src-001 | Executive Summary | 高 |  |
| f-mat-009 | 2 号机组 containment venting 未成功，containment 失效（Executive Summary 技术序列一句）。 | src-001 | Executive Summary | 中 | 需 PI 对照同一文件前后文核对语境 |

---

## 4. 事实：个人类（`f-ind-`）

| 编号 | 事实 | 来源 | 章节/页码 | 置信度 | 备注 |
|---|---|---|---|---|---|
| f-ind-001 | 报告 Foreword 称现场人员需在未完全按培训场景准备的情况下采取应对行动。 | src-001 | Foreword | 高 | 原文含 "not been trained" / "improvise" 等，PI 核对原文 |
| f-ind-002 | Executive Summary 称尽管运营商人员努力维持控制，1–3 号机组仍发生堆芯损伤。 | src-001 | Executive Summary | 高 | 仅陈述"努力维持控制"与结果并存 |
| f-ind-003 | 氢气爆炸造成 structures and equipment 损坏并造成 personnel injured（Executive Summary）。 | src-001 | Executive Summary | 高 | 未给出具体人数 |
| f-ind-004 | 地震与 tsunami 后果及辐射水平升高，使 on-site response 条件困难（Executive Summary 一段）。 | src-001 | Executive Summary | 高 |  |
| f-ind-005 | 疏散过程中存在因地震/tsunami 破坏导致的困难（Executive Summary 疏散段）。 | src-001 | Executive Summary | 高 |  |
| f-ind-006 | TV1 §1.1 称事故造成现场工作人员与周边公众受到辐射照射。 | src-002 | §1.1 | 高 |  |

---

## 5. 事实：组织类（`f-org-`）

| 编号 | 事实 | 来源 | 章节/页码 | 置信度 | 备注 |
|---|---|---|---|---|---|
| f-org-001 | 福岛第一核电厂由 Tokyo Electric Power Company（TEPCO）运营。 | src-001 | Executive Summary | 高 |  |
| f-org-002 | IAEA 2015 年总干事报告对事故原因与后果作出评估（报告自我定位，非本组结论）。 | src-001 | Foreword | 高 | 归属 IAEA |
| f-org-003 | 东北沿岸五处 NPP 场址受影响：Higashidori、Onagawa、Fukushima Daiichi、Fukushima Daini、Tokai Daini。 | src-002 | §1.1.1 | 高 | 区分第一/第二核电站 |
| f-org-004 | 上述五场址中，除福岛第一外，其余场址运行机组均安全 shut down（Executive Summary）。 | src-001 | Executive Summary | 高 |  |
| f-org-005 | IAEA 在 2012 年 9 月大会宣布准备福岛事故报告（TV1 前言）。 | src-002 | 前言 | 高 |  |
| f-org-006 | 日本政府/监管框架在 TV1 中有专节描述（§1.2.4），本草稿尚未逐条摘录监管细节。 | src-002 | 目录 §1.2.4 | 中 | **待 PI 补摘录** |
| f-org-007 | 食品与饮用水分销/消费受到限制（Executive Summary）。 | src-001 | Executive Summary | 高 | 政策事实 |
| f-org-008 | 报告编写时（2015）仍有大量撤离人员未能返家（Foreword 数据）。 | src-001 | Foreword | 高 | ">100 000 evacuated" |

---

## 6. 冲突、不确定与未获取项

### 来源冲突

- 本草稿仅使用 IAEA 2015 两套 PDF，**尚未**与日本国会调查（NAIIC）、TEPCO 独立报告交叉核对同一数值（如海啸波高测点、各机组精确时刻链）。

### 待核实

- PDF 文本提取**无稳定印刷页码**时，定位以 **章节号（§1.1 等）** 为准；PI 打开 PDF 后请补印页页码。
- src-003 书目元数据（ISBN、页数）仅在搜索摘要中出现，**未**通过浏览器打开 iaea.org 核对。

### 已排查但排除

- 未使用 Wikipedia、自媒体或未署名汇编。
- 未将 Cloudflare 挑战页 HTML 当作来源正文。

### 未能获取

| 站点/资源 | 现象 | 记录日期 |
|---|---|---|
| https://www.iaea.org/…（HTML 出版物页、专题页） | curl / WebFetch 为 Cloudflare「Just a moment…」或超时 | 2026-10-11 |
| https://www.naiic.go.jp/… | HTTP 403（Akamai） | 2026-10-11 |
| TEPCO / 日本政府 HTML 入口 | 未在本轮完成可核对正文抓取 | 2026-10-11 |

### 常见混淆点（PI 核对清单）

- **福岛第一 vs 第二**：src-002 §1.1.1 明确列出 Fukushima Daiichi 与 Fukushima Daini 为不同场址。
- **机组编号**：Executive Summary 强调运行中三台 reactor units 与 Units 1–3 堆芯损伤；TV1 目录区分 Units 4–6 outage 序列。
- **海啸高度**：src-001 为沿岸「more than ten metres」表述，**非**单一测点数值；与其他来源对比时须分口径。
- **时刻链**：TV1 给出主震 14:46 JST；全厂断电、vent、氢爆等**分秒级链**本草稿未逐条录入，待 TV1 §1.3.2 精读。
- **释放量估算**：本草稿**未**收录任何释放量数值（避免多机构口径混用）。

---

## 7. 评估性内容（不得写入第 3–5 节事实表）

| 编号 | 内容摘要 | 归属 | 来源 | 章节/页码 |
|---|---|---|---|---|
| ev-001 | IAEA 总干事 Foreword 称日本曾 widespread assumption 认为核电厂极不可能发生此类严重事故，并讨论监管框架 weaknesses 等。 | IAEA（Yukiya Amano 总干事报告 Foreword） | src-001 | Foreword |
| ev-002 | IAEA 总干事称报告旨在提供 lessons learned 供各国政府、监管机构与运营商行动。 | IAEA | src-001 | Foreword |
| ev-003 | TV1 前言引述总干事对报告定位为 "authoritative, factual and balanced assessment" 及 "lessons learned"。 | IAEA | src-002 | 前言 |

---

## 检索记录（本轮）

- **成功通道**：`www-pub.iaea.org` PDF 直链（src-001、src-002）。
- **失败通道**：`www.iaea.org` HTML（Cloudflare）；`naiic.go.jp`（403）。
- **未写入 `src/data/fukushima.js`**：已确认本轮未修改该文件。
