> ⚠️ 本文件为 AI 检索的**未经审阅草稿**。任何内容在 PI 逐条核实前，不得写入
> `src/data/fukushima.js`。本文件不是产品内容，只是核对工作台。
>
> 本版仅基于实际抓取成功的官方 PDF 直链；被拦截的站点记录于第 6 节。

# 福岛第一核电站事故 — 事实检索草稿（IAEA + NAIIC + TEPCO 本地 PDF）

## 1. 来源清单

| 编号 | 标题 | 出版方 | 年份 | URL | 访问日期 | 抓取方式 |
|---|---|---|---|---|---|---|
| src-001 | THE FUKUSHIMA DAIICHI ACCIDENT — REPORT BY THE DIRECTOR GENERAL | International Atomic Energy Agency (IAEA) | 2015 | https://www-pub.iaea.org/MTCD/Publications/PDF/Pub1710-ReportByTheDG-Web.pdf | 2026-10-11 | WebFetch / 本地 PDF 文本缓存 |
| src-002 | The Fukushima Daiichi Accident — Technical Volume 1/5: Description and Context of the Accident | IAEA | 2015 | https://www-pub.iaea.org/MTCD/Publications/PDF/AdditionalVolumes/P1710/Pub1710-TV1-Web.pdf | 2026-10-11 | WebFetch / 本地 PDF 文本缓存 |

| 编号 | 标题 | 出版方 | 年份 | URL | 访问日期 | 抓取方式 |
|---|---|---|---|---|---|---|
| src-003 | The Fukushima Daiichi Accident（书目页 STI/PUB/1710） | IAEA | 2015 | https://www.iaea.org/publications/10962/the-fukushima-daiichi-accident | 2026-10-11 | **元数据来自搜索结果，待 PI 在浏览器核对**；HTML 正文未抓取（Cloudflare） |

| 编号 | 标题 | 出版方 | 年份 | URL | 访问日期 | 抓取方式 |
|---|---|---|---|---|---|---|
| src-004 | The Official Report of the Fukushima Nuclear Accident Independent Investigation Commission（NAIIC 英文摘要版） | National Diet of Japan / NAIIC | 2012 | `file:///E:/学习档案库-D/ENGR496/assignment/ass1/refs/NAIIC_report_lo_res.pdf` | 2026-10-11 | PI 提供本地 PDF，Cursor 提取文本 |
| src-005 | TEPCO 事故相关附件（120620e0106：地震动评价与历史安全评估档案等） | Tokyo Electric Power Company (TEPCO) | 2012 | `file:///E:/学习档案库-D/ENGR496/assignment/ass1/refs/120620e0106.pdf` | 2026-10-11 | PI 提供本地 PDF，Cursor 提取文本 |

---

## 2. 时间线

| 编号 | 日期 | 事件（中文一句话） | 来源 | 章节/页码 | 原文引用（逐字，英文） | 置信度 | 备注 |
|---|---|---|---|---|---|---|---|
| tl-001 | 2011-03-11 | 东日本大震灾（Great East Japan Earthquake）发生。 | src-001 | Executive Summary | The Great East Japan Earthquake occurred on 11 March 2011. | 高 |  |
| tl-002 | 2011-03-11 | 地震震级 9.0；海啸在包括东北海岸在内的沿岸造成多道浪，部分浪高超过十米。 | src-001 | Executive Summary | causing a massive earthquake with a magnitude of 9.0 and a tsunami which struck a wide area of coastal Japan, including the north-eastern coast, where several waves reached heights of more than ten metres. | 中 | 核验⚠️：为全国/东北沿岸浪高表述，**非**厂址 run-up 测点（见 f-mat-011） |
| tl-003 | 2011-03-11 14:46 JST | 主震发生于 JST 2011-03-11 14:46（星期五）。 | src-002 | §1.1.1 Main occurrences | The Great East Japan Earthquake occurred at 14:46 Japan Standard Time (JST)3 on Friday 11 March 2011, off the eastern coast of Japan. | 高 |  |
| tl-006 | 2011-03-11 及之后 | 1–3 号机组堆芯过热、燃料熔化，三个 containment vessels 被 breach。 | src-001 | Executive Summary | the reactor cores in Units 1–3 overheated, the nuclear fuel melted and the three containment vessels were breached. | 高 | 具体时刻未获取（Executive Summary 未给出分机组时刻链） |
| tl-007 | 2011-03-11 及之后 | 1、3、4 号机组 reactor buildings 内发生氢气相关爆炸并造成结构/设备损坏与人员受伤。 | src-001 | Executive Summary | Hydrogen was released from the reactor pressure vessels, leading to explosions inside the reactor buildings in Units 1, 3 and 4 that damaged structures and equipment and injured personnel. | 高 | Unit 1 氢爆时刻见 TV1 §1.3.2（2011-03-12 15:36）；3、4 号具体时刻未获取 |
| tl-008 | 2011-03-11 及之后 | 放射性物质释入大气并沉积于陆地与海洋，亦有直接向海释放。 | src-001 | Executive Summary | Radionuclides were released from the plant to the atmosphere and were deposited on land and on the ocean. There were also direct releases into the sea. | 高 | 具体时刻未获取 |
| tl-009 | 2011-03-11 及之后 | 厂址半径 20 km 及部分指定区域人员被疏散；20–30 km 先 shelter 后建议自愿撤离。 | src-001 | Executive Summary | People within a radius of 20 km of the site and in other designated areas were evacuated, and those within a radius of 20–30 km were instructed to shelter before later being advised to voluntarily evacuate. | 高 | 分阶段扩展见 DG「Emergency preparedness」段（如 2 km→20 km） |
| tl-011 | 2011-03-11 及之后 | 1–5 号机组经历长时间全厂断电（SBO）；1、2 号超过 9 天，3、4 号超过 14 天。 | src-002 | §1.1 Summary of the accident | Units 1–5 of the Fukushima Daiichi NPP experienced extended station blackout (SBO) events, which exceeded nine days in Units 1 and 2, and 14 days in Units 3 and 4. | 高 | Unit 1：15:37 失 AC、15:42 宣布 SBO（§1.3.2）；结束日未在本表展开 |
| tl-012 | 2011-03-11 及之后 | 1–3 号机组 RPV 最终 breach，放射性物质经可控 vent 或 confinement 失效释出。 | src-002 | §1.1 Summary of the accident | The reactor pressure vessels (RPVs) that enclose the reactor cores were eventually breached in those units, and radioactive material escaped from the reactors. The radioactive material confined in the primary containment vessels (PCVs) was further released directly to the environment either in a controlled manner, i.e. by venting of the reactors’ PCVs, or in an uncontrolled manner upon damage and failure of the confinement structures. | 高 | 具体时刻未获取 |
| tl-013 | 2011-03-11 及之后 | 为降低照射，20 km 内及周边指定区域疏散，食品与饮用水分销/消费受限。 | src-002 | §1.1 Summary of the accident | In order to reduce radiation exposures, people within a radius of 20 km of the site, as well as other specified areas, were evacuated, and restrictions were placed on the distribution and consumption of food and drinking water. | 高 | 具体时刻未获取 |
| tl-016 | 2011-03-11 15:37 | NAIIC 事故时间轴标注海啸（峰值）到达时刻。 | src-004 | 事故时间轴（Conclusions 前时间轴图） | 15:37 Tsunami (peak of waves) | 高 | 与 TV1 §1.1.2.5 第二波 15:36–15:37 一致口径 |
| tl-017 | 2011-03-12 15:36 | Unit 1 reactor building 发生爆炸（服务楼层）。 | src-002 | §1.3.2 Unit 1 sequence | At 15:36 on 12 March 2011, an explosion occurred on the service floor of the Unit 1 RB | 高 | 补 tl-007 备注中 Unit 1 氢爆时刻 |
| tl-018 | 2009-07-15 | NISA 完成对代表电厂抗震 interim report 的 validity 审查。 | src-005 | Attachment 3-14 Main developments regarding the seismic back-check | July 15, 2009 Review completed | 高 | 耐震回溯检查时间线 |
| tl-019 | 2008-10 ~ 2008-12 | TEPCO 接收 Jogan 海啸研究并进行试算、协调修订海啸评估方法。 | src-005 | Attachment 3-15 Principle Chronology of Tsunami Safety Assessment | Receive Jogan Tsunami research paper in progress from Dr. Satake | 高 | 同页含 Implement trial calculations on Jogan Tsunami（2008-12） |
| tl-020 | 2011-03-11 21:23 | 下达 3 km 疏散令时，仅约 20% 厂址所在町居民知晓事故。 | src-004 | Conclusions — Evacuation issues | only 20 percent of the residents of the town hosting the plant knew about the accident when evacuation from the 3km zone was ordered at 21:23 on the evening of March 11. | 高 |  |

---

## 3. 事实：物质 / 技术类（`f-mat-`）

| 编号 | 事实（中文一句话，只写客观事实） | 来源 | 章节/页码 | 原文引用（逐字，英文） | 置信度 | 备注 |
|---|---|---|---|---|---|---|
| f-mat-001 | 福岛第一核电厂址共有六台核电机组（Units 1–6）。 | src-002 | §1.1.2.2 Plant status | The Fukushima Daiichi NPP (Fig. 1.1–3), which comprises six units [12] with boiling water reactors (BWRs) (see Box 1.1–1), was located 180 km from the epicentre. | 高 |  |
| f-mat-002 | 2011-03-11 海啸淹没厂内主、备电源与最终热阱等设备/结构，**六台机组**均受影响。 | src-002 | §1.1 Summary of the accident | They flooded the primary and backup power systems and equipment, as well as the ultimate heat sink systems and structures, of all six units on the site. | 高 | 并入原 tl-010 信息 |
| f-mat-003 | 地震在 tsunami 之前已造成场外输电系统损坏。 | src-002 | §1.1 Summary of the accident | Compounding the off-site power loss that occurred before the tsunami due to the earthquake damage to the transmission system, the flooding caused the loss of on-site power sources (and/or on-site power distribution systems). | 高 |  |
| f-mat-004 | 1–3 号机组因长时间失去电力与排热，燃料过热并熔化，RPV 最终 breach。 | src-002 | §1.1 Summary of the accident | The reactors of Units 1, 2 and 3 suffered damage as the fuel overheated and melted. The reactor pressure vessels (RPVs) that enclose the reactor cores were eventually breached in those units | 高 |  |
| f-mat-005 | 1、3、4 号机组 reactor buildings 内发生与氢气释放相关的爆炸。 | src-001 | Executive Summary | leading to explosions inside the reactor buildings in Units 1, 3 and 4 that damaged structures and equipment and injured personnel. | 中 | 核验⚠️：引文为 Executive Summary **句中片段**（非独立完整句） |
| f-mat-006 | 设计中的地震/海啸 hazard 主要依据日本历史地震记录与近期海啸证据评估。 | src-001 | NUCLEAR SAFETY CONSIDERATIONS — Vulnerability | The seismic hazard and tsunami waves considered in the original design were evaluated mainly on the basis of historical seismic records and evidence of recent tsunamis in Japan. | 高 | 非 Executive Summary 小节标题 |
| f-mat-007 | 记录到的 ground motions 与 tsunami 波高均显著超过设计基准假设。 | src-001 | NUCLEAR SAFETY CONSIDERATIONS — Vulnerability | Both the recorded ground motions and the heights of the tsunami waves significantly exceeded the assumptions of hazards that had been made when the plant was originally designed. | 中 | 核验⚠️：引文为定性表述，**未给出**具体 ground motion / 海啸数值 |
| f-mat-009 | 2 号机组 containment venting 未成功，containment 失效并造成放射性释放。 | src-001 | NUCLEAR SAFETY CONSIDERATIONS — Fundamental safety functions | Containment venting for Unit 2 was not successful, and the containment failed, resulting in radioactive releases. | 高 |  |
| f-mat-010 | 原始 EP 设计基准最高潮位对应海啸高度为 OP +3.122 m。 | src-002 | §1.2.5.6 Oceanography；Table 1.2–3 | This gave a design basis tsunami height of 3.122 m above the OP level. | 高 | OP = Onahama Port 潮位基准 |
| f-mat-011 | 防波堤/海堤按最大海啸 5.5 m 设计；第二波 run-up 14–15 m 淹没厂址。 | src-002 | §1.1.2.5 Tsunami and station blackout | the tsunami barrier seawalls, the breakwater, that were designed to protect against a maximum tsunami height of 5.5 m [15]. However, about 10 minutes after the first wave (between 15:36 and 15:37), the second and largest tsunami wave, with a run-up height of 14–15 m, reached the plant. | 中 | 核验⚠️：PDF 文本层在 “maximum” 与 “5.5 m” 之间插入脚注 12，引文作连续句；**15:36–15:37 为 3/11 海啸波，非氢爆** |
| f-mat-012 | 2002 年 JSCE 方法重评海啸高度为 OP +5.7 m，并采取抬高泵位等对策。 | src-002 | Table 1.2–4 | Japan Society of Civil Engineers (JSCE) assessment method OP +5.7 m Raise elevation of pumps | 高 | 同表另有 Make buildings watertight |
| f-mat-013 | 1966 年许可基准引用的观测海啸来自 1960 年智利地震海啸。 | src-002 | Table 1.2–4 | Establishment Permit OP +3.122 m (observed height resulting from Chilean tsunami in 1960) | 高 | Table 1.2–3 Remarks 亦有 24 May 1960 表述 |
| f-mat-014 | Unit 1：15:37 失全部 AC，15:42 宣布 station blackout；IC 在 tsunami 前被运行人员停止后堆芯冷却丧失。 | src-002 | §1.3.2；§1.1.3.3 | All AC power was lost at 15:37 … TEPCO declared a station blackout at 15:42. … core cooling at Unit 1 was lost when the IC was stopped by the operators just before the tsunami | 中 | 核验⚠️：引文含 “…” **合并两节**，非 PDF 单一连续段落；15:42 为 Unit 1 SBO 宣布（§1.3.2） |
| f-mat-015 | 2009 年 bathymetric 重评给出 OP +6.1 m（对策含抬高泵位）。 | src-002 | Table 1.2–4 | Latest bathymetric and tidal data on the basis of the JSCE assessment method OP +6.1 m Raise elevation of pumps | 高 | 与 f-mat-011 遭遇 run-up 14–15 m 对照；未写释放量 |
| f-mat-016 | TEPCO 档案：福岛第一 JSCE 评估最大海啸高度 5.7 m（后 6.1 m），应急海水泵安装高度 4 m。 | src-005 | Attachment 4-4 Status of TEPCO efforts | the maximum tsunami height from the JSCE assessment was 5.7m (finally 6.1m), and the emergency seawater pump installation height was 4m. | 高 | **TEPCO 口径**；与 IAEA run-up 14–15 m 不同指标 |
| f-mat-017 | TEPCO 时间线：2009 年 4 月安全评价给出福岛第一水位 O.P.+5.4~6.1 m。 | src-005 | Attachment 3-15 chronology | Water level : O.P.+5.4~6.1m | 高 |  |
| f-mat-018 | 1966–1972 建设许可基准引用智利地震，潮位 O.P.+3.122 m。 | src-005 | Attachment 3-15 | based on the Chilean earthquake, -- Water level: O.P. +3.122m | 高 |  |
| f-mat-019 | TEPCO 地震动评价结论：基岩面地震动与设计基准 Ss **约同量级**。 | src-005 | Attachment 3-3 (2/20) §3 Conclusion | the free surface of the base stratum seismic motion and the design basis seismic ground motion Ss are approximately the same level. | 高 | **TEPCO 2012 附件口径** |
| f-mat-020 | NAIIC：福岛第一记录地震动超过新指引假设，且未到位适当抗震加固。 | src-004 | Summary of Findings — The lack of tsunami countermeasures 前段 | the recorded seismic motion at Fukushima Daiichi exceeded the assumption of the new guideline. It is clear that appropriate anti-seismic reinforcements were not in place at the time of the March 11 earthquake. | 高 |  |

---

## 4. 事实：个人类（`f-ind-`）

| 编号 | 事实 | 来源 | 章节/页码 | 原文引用（逐字，英文） | 置信度 | 备注 |
|---|---|---|---|---|---|---|
| f-ind-001 | 现场人员需在未按培训场景准备的情况下即兴应对，且常缺合适设备。 | src-001 | Foreword | They had to improvise a response in circumstances for which they had not been trained, often lacking appropriate equipment. | 高 |  |
| f-ind-002 | 尽管运营商人员努力维持控制，1–3 号机组仍发生堆芯损伤。 | src-001 | Executive Summary | Despite the efforts of the operators at the Fukushima Daiichi nuclear power plant to maintain control, the reactor cores in Units 1–3 overheated, the nuclear fuel melted and the three containment vessels were breached. | 高 |  |
| f-ind-003 | 氢气爆炸造成 structures and equipment 损坏并造成 personnel injured。 | src-001 | Executive Summary | leading to explosions inside the reactor buildings in Units 1, 3 and 4 that damaged structures and equipment and injured personnel. | 中 | 核验⚠️：句中片段引文；未给出具体人数 |
| f-ind-004 | 地震、海啸后果及辐射水平升高使 on-site response 极其困难。 | src-001 | EMERGENCY PREPAREDNESS AND RESPONSE | The consequences of the earthquake and tsunami, and increased radiation levels, made the on-site response extremely difficult. | 高 |  |
| f-ind-005 | 疏散因地震/tsunami 破坏及通信交通问题而存在困难。 | src-001 | EMERGENCY PREPAREDNESS AND RESPONSE — Protecting the public | There were difficulties in evacuation due to the damage caused by the earthquake and tsunami and the resulting communication and transportation problems. | 高 |  |
| f-ind-006 | 事故造成现场工作人员与周边公众受到辐射照射。 | src-002 | §1.1 Summary of the accident | The radioactive releases resulted in radiological exposure of the workers at the site and the general public residing in the surrounding communities | 高 |  |
| f-ind-007 | MCR 人员经厂内广播发布海啸预警；初报 3–4 m，低标高人员撤离。 | src-002 | §1.2.6（人员响应段） | Following the earthquake, a tsunami warning was communicated by the MCR staff via the plant internal announcement system. The initial prediction for the tsunami was 3–4 m in height76, thus evacuation and reassembly instructions were provided mainly for personnel who were working at lower elevations. | 中 | 核验⚠️：PDF 文本层为 `height76`（脚注号粘连）；§1.2.6 人员响应段 |
| f-ind-008 | Unit 1 运行人员在 15:03 手动停止两套 IC，以避免超过 55°C/h 冷却限制。 | src-002 | §1.3.2 Unit 1 sequence | The operators manually stopped both loops of the IC systems at 15:03, in order to prevent the cool down limit of 55°C/h, set by the plant’s operational limits and conditions (OLCs), from being exceeded. | 中 | 核验⚠️：PDF 连续文本为 `…that the operators manually stopped…`，非句首 `The operators` |
| f-ind-009 | Site Superintendent 于 00:06 下令准备对 Unit 1（及 Unit 2）vent。 | src-002 | §1.3.2（2011-03-12） | At 00:06, the Site Superintendent ordered preparations for venting of Unit 1 (and Unit 2) and a notice was issued at 00:49 identifying an ‘abnormal rise in primary containment vessel pressure’ | 高 | 角色称谓保留英文 |
| f-ind-010 | 运行人员因各类电源丧失时序不明，无法确知 IC 隔离阀位置。 | src-002 | §1.3.2 脚注 26 | The valve positions were not clear to the operators owing to the uncertain timing and sequence of each type of power loss that would determine the operation of isolation condenser status of isolation valves. | 高 | 信息不足的具体描述 |
| f-ind-011 | 失去电力后，现场须在缺少有效工具与手册的情况下当场决策。 | src-004 | 第 14 页事故应对叙述 | The decisions and responses to the accident had to be made on the spot by operational staff at the site, absent valid tools and manuals. | 高 |  |
| f-ind-012 | 首相（Prime Minister）亲赴现场指挥堆芯受损处置人员。 | src-004 | Conclusions — crisis management | The Prime Minister made his way to the site to direct the workers who were dealing with the damaged core. | 高 | NAIIC 称此为 unprecedented direct intervention |
| f-ind-013 | 10 km 内多数居民直至 2011-03-12 05:44 发布撤离令时才得知事故。 | src-004 | Conclusions — Evacuation issues | Most residents within 10km of the plant learned about the accident when the evacuation order was issued at 5:44 on March 12 | 高 |  |
| f-ind-014 | NAIIC 时间轴：Unit 1 于 19:04 开始海水注入（图表标注）。 | src-004 | 事故时间轴（Unit 1 列） | 19:04 Start of seawater injection | 高 | 图表短语，非叙事句 |
| f-ind-015 | vent 决策未确认传达至 METI 高层或官邸（Kantei）。 | src-004 | Conclusions | But there is no confirmation that the venting decision was conveyed to senior members of METI, or to the Kantei. | 高 |  |

---

## 5. 事实：组织类（`f-org-`）

| 编号 | 事实 | 来源 | 章节/页码 | 原文引用（逐字，英文） | 置信度 | 备注 |
|---|---|---|---|---|---|---|
| f-org-001 | 福岛第一核电厂由 Tokyo Electric Power Company（TEPCO）运营。 | src-001 | Executive Summary | At the Fukushima Daiichi nuclear power plant, operated by the Tokyo Electric Power Company (TEPCO), the earthquake caused damage to the electric power supply lines to the site | 高 |  |
| f-org-003 | 东北沿岸五处 NPP 场址：Higashidori、Onagawa、Fukushima Daiichi、Fukushima Daini、Tokai Daini。 | src-002 | §1.1.1 Main occurrences | including five NPP sites along Japan’s north-eastern coast: Higashidori, Onagawa, Fukushima Daiichi, Fukushima Daini and Tokai Daini. | 高 |  |
| f-org-004 | 除福岛第一外，其余受影响场址的运行机组均安全 shut down。 | src-001 | Executive Summary | The four other nuclear power plants3 along the coast were also affected to different degrees by the earthquake and tsunami. However, all operating reactor units at these plants were safely shut down. | 高 | 脚注 3 列出场址名称 |
| f-org-008 | 报告编写时（2015 Foreword）逾 10 万人因释放而撤离，许多人仍无法返家。 | src-001 | Foreword | More than 100 000 people were evacuated because of the release of radionuclides to the environment. At the time of writing, in 2015, many of them were still unable to return to their homes. | 高 |  |
| f-org-009 | 运行方安全管理活动受 NISA 审查批准的安全管理 programme 约束；NISA 按 programme 做季度检查。 | src-002 | §1.2.2.9 Inspections | The operators’ safety management activities were governed by the operational safety programme that NISA reviewed and approved. NISA conducted quarterly operational safety inspections to check the operators’ compliance with the programme. | 高 | 事故前监管—运营商关系 |
| f-org-010 | 2006 指南修订后 NISA 要求 licensees 做 seismic/tsunami「backcheck」；TEPCO 启动重评但在事故前**未完成**。 | src-002 | §1.2.2.8 Requirements for backfitting | After the 2006 revision of this guide, NISA requested licensees to conduct a ‘backcheck’ of seismic and tsunami hazards. TEPCO started the re-evaluation but had not finished its ‘backcheck’ before the accident at the Fukushima Daiichi NPP. | 高 | 内部评估采纳/完成度事实 |
| f-org-011 | 事故前运营商用 2002 共识方法重评海啸，数值高于原设计并采取部分补偿措施，但事故时仍不足。 | src-001 | NUCLEAR SAFETY CONSIDERATIONS — Vulnerability | Before the accident, the operator had conducted some reassessments of extreme tsunami flood levels, using a consensus based methodology developed in Japan in 2002, which had resulted in values higher than the original design basis estimates. Based on the results, some compensatory measures were taken, but they proved to be insufficient at the time of the accident. | 高 |  |
| f-org-012 | NAIIC 结论：事故系政府、监管与 TEPCO **共谋（collusion）**及治理缺失所致。 | src-004 | Conclusions — A “manmade” disaster | The TEPCO Fukushima Nuclear Power Plant accident was the result of collusion between the government, the regulators and TEPCO, and the lack of governance by said parties. | 高 |  |
| f-org-013 | NISA 隶属 METI，而 METI 同时推动核电发展。 | src-004 | Conclusions（Earthquake damage 段） | NISA was created as part of the Ministry of Economy, Trade & Industry (METI), an organization that has been actively promoting nuclear power. | 高 |  |
| f-org-014 | NISA 曾告知运营商无需考虑 SBO，并要求其撰写“无需考虑”的理由报告。 | src-004 | Conclusions | NISA informed the operators that they did not need to consider a possible station blackout (SBO) because the probability was small and other measures were in place. It then asked the operators to write a report that would give the appropriate rationale for why this consideration was unnecessary. | 高 |  |
| f-org-015 | 事故时 Unit 1–3 所需结构加固**均未实施**；NISA 对拖延给予 tacit consent。 | src-004 | Conclusions | no part of the required reinforcements had been implemented on Units 1 through 3 by the time of the accident. This was the result of tacit consent by NISA for a significant delay by the operators in completing the reinforcement. | 高 |  |
| f-org-016 | TEPCO 通过 FEPC 积极反对新安全法规并拖延与监管谈判。 | src-004 | Conclusions（TEPCO perspective 段） | enough motivation for TEPCO to aggressively oppose new safety regulations and draw out negotiations with regulators via the Federation of Electric Power Companies (FEPC). | 高 | 句中片段；含 enough motivation for 前缀 |
| f-org-017 | NISA 未向公众披露海啸评估或对运营商指示，亦未保留记录。 | src-004 | The lack of tsunami countermeasures §1 | NISA did not disclose any information to the public on their evaluations or their instructions to reconsider the assumptions used in designing the plant’s tsunami defenses. Nor did NISA keep any records of the information. | 高 |  |
| f-org-018 | TEPCO 2007 档案称已抬高电机等，**当时理解**厂站安全已获保证。 | src-005 | Attachment 4-4 | actions were already taken to increase the elevation of the motors, thus safety had been ensured. | 高 | **运营商自我评估表述** |
| f-org-019 | 2006 年起监管方与 TEPCO 已知海啸致全厂断电及堆芯损伤风险，但未出台法规或防护。 | src-004 | Conclusions | Since 2006, the regulators and TEPCO were aware of the risk that a total outage of electricity at the Fukushima Daiichi plant might occur if a tsunami were to reach the level of the site. | 高 |  |
| f-org-020 | 监管方、METI 与 TEPCO 未能建立评估损害概率、 collateral 损害与公众撤离计划等基本安全要求。 | src-004 | Conclusions | The operator (TEPCO), the regulatory bodies (NISA and NSC) and the government body promoting the nuclear power industry (METI), all failed to correctly develop the most basic safety requirements—such as assessing the probability of damage, preparing for containing collateral damage from such a disaster, and developing evacuation plans for the public in the case of a serious radiation release. | 高 |  |

---

## 6. 冲突、不确定与未获取项

### 官方报告之间的分歧（AI 整理，待 PI 确认）

| 议题 | NAIIC 的表述 | 原文引用 | TEPCO 的表述 | 原文引用 | 差异性质 |
|---|---|---|---|---|---|
| 事故主因 | 事故为「manmade」，系监管—政府—TEPCO 共谋与治理失败；自然灾仅为触发 | we conclude that the accident was clearly “manmade.” | （2007 档案语境）已采取抬高电机等措施，**当时认为**安全已获保证 | thus safety had been ensured. | 归因框架（制度 vs 已实施对策） |
| 地震 vs 设计基准 | 记录地震动**超过**新指引假设；抗震加固未到位 | the recorded seismic motion at Fukushima Daiichi exceeded the assumption of the new guideline. | 基岩面地震动与设计基准 Ss **约同量级** | the free surface of the base stratum seismic motion and the design basis seismic ground motion Ss are approximately the same level. | 同一物理量不同结论（评价方法与时间点不同） |
| 海啸风险是否被采纳 | TEPCO **忽视**警告；NISA 未披露评估、未督促 countermeasures | TEPCO overlooked these warnings, and the small margins of safety that existed were far from adequate for such an emergency situation. | JSCE 评估 5.7 m（后 6.1 m）；已抬高电机并认为安全 | the maximum tsunami height from the JSCE assessment was 5.7m (finally 6.1m) … thus safety had been ensured. | 是否“充分采纳/足够” |
| 监管与运营责任 | TEPCO **过快**将原因归咎于海啸以回避责任；地震亦可能致损 | TEPCO was too quick to cite the tsunami as the cause of the nuclear accident and deny that the earthquake caused any damage. | NISA 对 JSCE 方法表示认可；未见 NAIIC 式责任裁定 | With respect to the assessment of tsunami height, NISA’s go-ahead was obtained on using the JSCE methodology | 责任叙述 vs 程序性合规叙述 |

### 来源冲突（数值与口径）

- 海啸高度：IAEA **run-up 14–15 m**（厂址遭遇） vs TEPCO 档案 **JSCE 5.7–6.1 m**（评估潮位 O.P.） vs 1966 **O.P.+3.122 m**（许可基准）——**勿混列**。

### 待核实

- PDF 文本提取**无稳定印刷页码**时，定位以 **章节号（§1.1 等）** 为准；PI 打开 PDF 后请补印页页码。
- src-003 书目元数据（ISBN、页数）仅在搜索摘要中出现，**未**通过浏览器打开 iaea.org 核对。
- 表内「原文引用」摘自 PDF 文本层，换行/连字符可能与印刷版略有差异，以 PI 打开的 PDF 为准。

### 逐字依据缺失条目

- **（无 ❌）** 2026-10-11 对抗式核验：46 条引文均在归一化文本层找到对应内容；见 `docs/research/fukushima-facts-verification.md`。

### 待 PI 复核（核验未通过 ❌）

- **（无）**

### 核验存疑（⚠️，已降置信度为「中」）

- tl-002、f-mat-005、f-mat-007、f-mat-011、f-mat-014、f-ind-003、f-ind-007、f-ind-008（共 8 条；理由见各条备注与核验报告）

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
- **海啸高度**：设计/重评（OP +3.122 m、+5.7 m、+6.1 m、海堤 5.5 m）与遭遇 run-up（14–15 m）**勿混口径**。
- **时刻链**：TV1 给出主震 14:46 JST 与 Unit 1 SBO 15:42 等；3/4 号氢爆等**分秒级链**仍待 §1.3.x 精读。
- **释放量估算**：本草稿**未**收录任何释放量数值（避免多机构口径混用）。

---

## 7. 评估性内容（不得写入第 3–5 节事实表）

| 编号 | 内容摘要 | 归属 | 来源 | 章节/页码 | 原文引用（逐字，英文） |
|---|---|---|---|---|---|
| ev-001 | 日本曾 widespread assumption 认为此类严重事故 unthinkable；监管与政府未挑战该假设。 | IAEA（Yukiya Amano Foreword） | src-001 | Foreword | A major factor that contributed to the accident was the widespread assumption in Japan that its nuclear power plants were so safe that an accident of this magnitude was simply unthinkable. This assumption was accepted by nuclear power plant operators and was not challenged by regulators or by the Government. |  |
| ev-002 | 报告旨在理解发生了什么及原因，以便各国政府、监管与运营商落实 lessons learned。 | IAEA | src-001 | Foreword | The report considers human, organizational and technical factors, and aims to provide an understanding of what happened, and why, so that the necessary lessons learned can be acted upon by governments, regulators and nuclear power plant operators throughout the world. |  |
| ev-003 | 总干事称 IAEA 报告将为 authoritative, factual and balanced assessment，并涵盖 lessons learned。 | IAEA | src-002 | TV1 前言 | “an authoritative, factual and balanced assessment, addressing the causes and consequences of the accident, as well as lessons learned”. |  |
| ev-004 | 事故暴露日本监管框架 certain weaknesses；职责分散且 authority 不清。 | IAEA | src-001 | Foreword | The Fukushima Daiichi accident exposed certain weaknesses in Japan’s regulatory framework. Responsibilities were divided among a number of bodies, and it was not always clear where authority lay. |  |
| ev-005 | 事故后日本改革监管体系以更符合国际标准（评估性结论，非第 5 节事实）。 | IAEA | src-001 | Foreword | Since the accident, Japan has reformed its regulatory system to better meet international standards. It gave regulators clearer responsibilities and greater authority. |  |
| ev-006 | NAIIC：事故**非**自然灾害，而是「profoundly manmade disaster」。 | NAIIC（Chairman Message） | src-004 | Message from the Chairman | It was a profoundly manmade disaster – that could and should have been foreseen and prevented. |  |
| ev-007 | NAIIC：灾难「Made in Japan」，根因含服从权威、不愿质疑等文化因素。 | NAIIC | src-004 | Message from the Chairman | this was a disaster “Made in Japan.” Its fundamental causes are to be found in the ingrained conventions of Japanese culture: our reflexive obedience; our reluctance to question authority |  |
| ev-008 | NAIIC：TEPCO 过快把原因归咎于海啸，可能为回避地震相关责任。 | NAIIC | src-004 | Conclusions — Earthquake damage | TEPCO was too quick to cite the tsunami as the cause of the nuclear accident and deny that the earthquake caused any damage. |  |
| ev-009 | TEPCO 档案：基于 JSCE 保守评估，**当时理解**厂站安全已获保证。 | TEPCO | src-005 | Attachment 4-4 (2/9) | Accordingly, TEPCO conducted conservative assessments based on the JSCE methodology and understood that the power station’s safety was ensured at that time. |  |

---

## 检索记录（本轮）

- **阶段 1（2026-10-11）**：只读 `.pdf-cache/dg.txt`、`tv1.txt` → `fukushima-facts-verification.md`（✅38 / ⚠️8 / ❌0）。
- **阶段 2（2026-10-11）**：只读 `ass1/refs/NAIIC_report_lo_res.pdf`、`120620e0106.pdf` 提取至 `.pdf-cache/naiic.txt`、`tepco0106.txt`（**未下载**）；新增事实/时间线 **24** 条（tl×5 / f-mat×5 / f-ind×5 / f-org×9）+ 评估 **4** 条（ev-006–009）；`120620e0101/0104/0105` 未使用。
- **未写入 `src/data/fukushima.js`**：已确认本轮未修改该文件。
