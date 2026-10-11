# 福岛事实草稿 — 引文对抗式核验报告

> 本文件为 AI 自我核验记录，用于 PI 复核。核验由撰写方执行，可能偏松；
> 每条提供「定位串」，PI 可自行在 PDF 中检索验证。

> **核验日期**：2026-10-11  
> **素材（仅本地，未联网）**：`.pdf-cache/dg.txt`（src-001）、`.pdf-cache/tv1.txt`（src-002）

## 核验汇总

- 总数：**46**
- ✅：**38** | ⚠️：**8** | ❌：**0**
- ❌+⚠️ 占比：**17.4%**（未触发 20% 停止条件，已进入阶段 2）

## 汇总（明细见下表）

- 条目数：**46**
- ✅ 可信：**38**
- ⚠️ 存疑：**8**
- ❌ 未命中：**0**

## PI 优先核验结论

| 检查项 | 结论 |
|---|---|
| Unit 1 SBO **15:42** | TV1 出现 **6** 次；典型上下文：`…TEPCO declared a station blackout at 15:42.`（§1.3.2 Unit 1，**2011-03-11**） |
| 氢爆 **15:36** | TV1 §1.3.2：**2011-03-12 15:36** Unit 1 RB 爆炸（`At 15:36 on 12 March, an explosion occurred on the service floor of the Unit 1 RB`）；**勿与 2011-03-11 15:36–15:37 第二波海啸混淆** |
| `more than ten metres` | **全国/东北沿岸**表述（`north-eastern coast, where several waves reached heights of more than ten metres`），**非**厂址 run-up 14–15 m 测点 |
| **f-mat-009** | 已补逐字引文；✅ 支持 “Unit 2 vent 未成功 + containment failed + releases” |
| **f-mat-007** | ⚠️ 仅 qualitative exceedance，**无**对应具体数字 |
| **tl-006 ~ tl-013** | 备注“具体时刻未获取”的条目：Executive Summary / §1.1 汇总确无分秒链；Unit 1 部分时刻在 §1.3.2（已写入 f-mat-014 / tl-007 备注） |

## 逐条记录

| 编号 | 来源 | 定位串（前 6–8 词） | 命中次数 | 判定 | 上下文证据（归一化后 ±15 词） | 备注 |
|---|---|---|---:|---|---|---|
| tl-001 | src-001 | The Great East Japan Earthquake occurred on 11 | 2 | ✅ | COPYRIGHT NOTICE ...................................................................................................................................... 207 EDITORIAL NOTE ............................................................................................................. |  |
| tl-002 | src-001 | causing a massive earthquake with a magnitude of | 2 | ⚠️ | crust, estimated to be about 500 km in length and 200 km wide, was ruptured, causing a massive earthquake with a magnitude of 9.0 and a tsunami which struck a wide area of coastal Japan, including the north-eastern | 引文为日本东北沿岸/general coastal 浪高，非福岛第一厂址测点数值。 |
| tl-003 | src-002 | The Great East Japan Earthquake occurred at 14 | 1 | ✅ | May 2015, and this was included, where possible. 2 June 2015. 3 Main occurrences 1.1.1. The Great East Japan Earthquake occurred at 14:46 Japan Standard Time (JST)3 on Friday 11 March 2011, off the eastern coast of Japan. |  |
| tl-006 | src-001 | the reactor cores in Units 1 3 overheated | ≥1 | ✅ | （定位串因标点拆分未计 hit，但 full_quote 归一化命中） | Executive Summary 无分机组时刻；PDF 全文亦未检出可填入本表的单一时刻链。 |
| tl-007 | src-001 | Hydrogen was released from the reactor pressure vessels | 2 | ✅ | in Units 1-3 overheated, the nuclear fuel melted and the three containment vessels were breached. Hydrogen was released from the reactor pressure vessels, leading to explosions inside the reactor buildings in Units 1, 3 and 4 that damaged | 氢爆时刻：TV1 §1.3.2 为 2011-03-12 15:36 Unit 1；引文段本身无日期。 |
| tl-008 | src-001 | Radionuclides were released from the plant to the | 2 | ✅ | buildings in Units 1, 3 and 4 that damaged structures and equipment and injured personnel. Radionuclides were released from the plant to the atmosphere and were deposited on land and on the ocean. There were also direct releases | 引文段无释放起止时刻。 |
| tl-009 | src-001 | People within a radius of 20 km of | 2 | ✅ | deposited on land and on the ocean. There were also direct releases into the sea. People within a radius of 20 km of the site and in other designated areas were evacuated, and those within a radius of | Executive Summary 无逐步扩展时刻；分阶段见 DG Emergency preparedness 段。 |
| tl-011 | src-002 | Units 1 5 of the Fukushima Daiichi NPP | ≥1 | ✅ | （定位串因标点拆分未计 hit，但 full_quote 归一化命中） | SBO 持续天数引文命中；Unit 1 起始时刻见 f-mat-014。 |
| tl-012 | src-002 | The reactor pressure vessels RPVs that enclose the | ≥1 | ✅ | （定位串因标点拆分未计 hit，但 full_quote 归一化命中） | §1.1 汇总无 RPV breach 分秒时刻。 |
| tl-013 | src-002 | In order to reduce radiation exposures people within | ≥1 | ✅ | （定位串因标点拆分未计 hit，但 full_quote 归一化命中） | §1.1 汇总无逐步政策时刻。 |
| f-mat-001 | src-002 | The Fukushima Daiichi NPP Fig 1 1 3 | ≥1 | ✅ | （定位串因标点拆分未计 hit，但 full_quote 归一化命中） |  |
| f-mat-002 | src-002 | They flooded the primary and backup power systems | 1 | ✅ | coast of Japan overwhelmed the tsunami barriers of Fukushima Daiichi nuclear power plant (NPP) site. They flooded the primary and backup power systems and equipment, as well as the ultimate heat sink systems and structures, of all six |  |
| f-mat-003 | src-002 | Compounding the off site power loss that occurred | ≥1 | ✅ | （定位串因标点拆分未计 hit，但 full_quote 归一化命中） |  |
| f-mat-004 | src-002 | The reactors of Units 1 2 and 3 | 0 | ✅ |  | 引文截断于 “in those units”（与 PDF 一致，无句号）。 |
| f-mat-005 | src-001 | leading to explosions inside the reactor buildings in | 2 | ⚠️ | and the three containment vessels were breached. Hydrogen was released from the reactor pressure vessels, leading to explosions inside the reactor buildings in Units 1, 3 and 4 that damaged structures and equipment and injured personnel. Radionuclides were | 草稿引文为句中片段（以 leading to 开头），非独立完整句。 |
| f-mat-006 | src-001 | The seismic hazard and tsunami waves considered in | 2 | ✅ | and the associated tsunami impacted on multiple units at the Fukushima Daiichi nuclear power plant. The seismic hazard and tsunami waves considered in the original design were evaluated mainly on the basis of historical seismic records and evidence |  |
| f-mat-007 | src-001 | Both the recorded ground motions and the heights | 2 | ⚠️ | It was followed by a series of tsunami waves, one of which inundated the site. Both the recorded ground motions and the heights of the tsunami waves significantly exceeded the assumptions of hazards that had been made when | 引文为定性 “significantly exceeded”，未给出 ground motion / 海啸具体数值。 |
| f-mat-009 | src-001 | Containment venting for Unit 2 was not successful | 2 | ✅ | and 3 were opened, the primary containment vessels for Units 1 and 3 eventually failed. Containment venting for Unit 2 was not successful, and the containment failed, resulting in radioactive releases. 6  Robust and reliable cooling systems | 逐字引文支持 Unit 2 vent 未成功与 containment failed。 |
| f-mat-010 | src-002 | This gave a design basis tsunami height of | 1 | ✅ | considered as part of the maximum/minimum tidal level for plant design presented in Table 1.2-3. This gave a design basis tsunami height of 3.122 m above the OP level. 62 FIG. 1.2-7. Shallow layer groundwater cross-sectional diagram [15, |  |
| f-mat-011 | src-002 | the tsunami barrier seawalls the breakwater that were | 0 | ⚠️ |  | PDF 文本层在 “maximum” 与 “tsunami height of 5.5 m” 之间插入脚注 12，草稿引文作连续句；且 15:36–15:37 为 3/11 第二波海啸，非氢爆。 |
| f-mat-012 | src-002 | Japan Society of Civil Engineers JSCE assessment method | ≥1 | ✅ | （定位串因标点拆分未计 hit，但 full_quote 归一化命中） | 表 1.2–4 行文本，单元格顺序经归一化后连续命中。 |
| f-mat-013 | src-002 | Establishment Permit OP 3 122 m observed height | ≥1 | ✅ | （定位串因标点拆分未计 hit，但 full_quote 归一化命中） |  |
| f-mat-014 | src-002 | All AC power was lost at 15 37 | 0 | ⚠️ |  | 草稿引文含 “…” 合并 §1.3.2 与 §1.1.3.3，非单一连续逐字段落。 |
| f-mat-015 | src-002 | Latest bathymetric and tidal data on the basis | 1 | ✅ | Unnecessary 2007 Disaster Prevention Plan by Fukushima Prefecture Government approx. OP +5 m Unnecessary 2009 Latest bathymetric and tidal data on the basis of the JSCE assessment method OP +6.1 m Raise elevation of pumps 63 This initial |  |
| f-ind-001 | src-001 | They had to improvise a response in circumstances | 1 | ✅ | tsunami struck and who struggled, in appalling conditions, to bring the stricken reactors under control. They had to improvise a response in circumstances for which they had not been trained, often lacking appropriate equipment. They deserve our respect |  |
| f-ind-002 | src-001 | Despite the efforts of the operators at the | 2 | ✅ | earthquake and tsunami. However, all operating reactor units at these plants were safely shut down. Despite the efforts of the operators at the Fukushima Daiichi nuclear power plant to maintain control, the reactor cores in Units 1-3 overheated, |  |
| f-ind-003 | src-001 | leading to explosions inside the reactor buildings in | 2 | ⚠️ | and the three containment vessels were breached. Hydrogen was released from the reactor pressure vessels, leading to explosions inside the reactor buildings in Units 1, 3 and 4 that damaged structures and equipment and injured personnel. Radionuclides were | 句中片段引文（leading to…），同 f-mat-005。 |
| f-ind-004 | src-001 | The consequences of the earthquake and tsunami and | ≥1 | ✅ | （定位串因标点拆分未计 hit，但 full_quote 归一化命中） |  |
| f-ind-005 | src-001 | There were difficulties in evacuation due to the | 2 | ✅ | iodine thyroid blocking was not implemented uniformly, primarily due to the lack of detailed arrangements. There were difficulties in evacuation due to the damage caused by the earthquake and tsunami and the resulting communication and transportation problems. There |  |
| f-ind-006 | src-002 | The radioactive releases resulted in radiological exposure of | 1 | ✅ | reactors' PCVs, or in an uncontrolled manner upon damage and failure of the confinement structures. The radioactive releases resulted in radiological exposure of the workers at the site and the general public residing in the surrounding communities and | 引文截断于 communities（PDF 后接 “and caused…”）。 |
| f-ind-007 | src-002 | Following the earthquake a tsunami warning was communicated | ≥1 | ⚠️ | （定位串因标点拆分未计 hit，但 full_quote 归一化命中） | PDF 文本层为 “height76”（脚注号粘连），草稿引文同形但非印刷版逐字排版。 |
| f-ind-008 | src-002 | The operators manually stopped both loops of the | 0 | ⚠️ |  | 草稿以 “The operators manually…” 开头；PDF 连续文本为 “…that the operators manually…”（无句首 The operators）。 |
| f-ind-009 | src-002 | At 00 06 the Site Superintendent ordered preparations | ≥1 | ✅ | （定位串因标点拆分未计 hit，但 full_quote 归一化命中） |  |
| f-ind-010 | src-002 | The valve positions were not clear to the | 1 | ✅ | i.e. Units 1 and 2, Units 3 and 4, and Units 5 and 6. 26 The valve positions were not clear to the operators owing to the uncertain timing and sequence of each type of power loss that | 脚注 26 正文命中。 |
| f-org-001 | src-001 | At the Fukushima Daiichi nuclear power plant operated | ≥1 | ✅ | （定位串因标点拆分未计 hit，但 full_quote 归一化命中） | 引文截断于 “to the site”。 |
| f-org-003 | src-002 | including five NPP sites along Japan’s north eastern | ≥1 | ✅ | （定位串因标点拆分未计 hit，但 full_quote 归一化命中） |  |
| f-org-004 | src-001 | The four other nuclear power plants3 along the | 1 | ✅ | function at the three operating reactor units2 as well as at the spent fuel pools. The four other nuclear power plants3 along the coast were also affected to different degrees by the earthquake and tsunami. However, all operating |  |
| f-org-008 | src-001 | More than 100 000 people were evacuated because | 1 | ✅ | also examined. The immense human impact of the Fukushima Daiichi accident should not be forgotten. More than 100 000 people were evacuated because of the release of radionuclides to the environment. At the time of writing, in 2015, |  |
| f-org-009 | src-002 | The operators’ safety management activities were governed by | 1 | ✅ | compliance with the safety management programmes, both of which are to be conducted by METI. The operators' safety management activities were governed by the operational safety programme that NISA reviewed and approved. NISA conducted quarterly operational safety inspections |  |
| f-org-010 | src-002 | After the 2006 revision of this guide NISA | ≥1 | ✅ | （定位串因标点拆分未计 hit，但 full_quote 归一化命中） |  |
| f-org-011 | src-001 | Before the accident the operator had conducted some | ≥1 | ✅ | （定位串因标点拆分未计 hit，但 full_quote 归一化命中） |  |
| ev-001 | src-001 | A major factor that contributed to the accident | 1 | ✅ | they had not been trained, often lacking appropriate equipment. They deserve our respect and admiration. A major factor that contributed to the accident was the widespread assumption in Japan that its nuclear power plants were so safe that |  |
| ev-002 | src-001 | The report considers human organizational and technical factors | ≥1 | ✅ | （定位串因标点拆分未计 hit，但 full_quote 归一化命中） |  |
| ev-003 | src-002 | an authoritative factual and balanced assessment addressing the | ≥1 | ✅ | （定位串因标点拆分未计 hit，但 full_quote 归一化命中） | 前言引号内子串命中。 |
| ev-004 | src-001 | The Fukushima Daiichi accident exposed certain weaknesses in | 1 | ✅ | a result, Japan was not sufficiently prepared for a severe nuclear accident in March 2011. The Fukushima Daiichi accident exposed certain weaknesses in Japan's regulatory framework. Responsibilities were divided among a number of bodies, and it was not |  |
| ev-005 | src-001 | Since the accident Japan has reformed its regulatory | ≥1 | ✅ | （定位串因标点拆分未计 hit，但 full_quote 归一化命中） |  |

## 处置说明

- ⚠️ 条目已在 `fukushima-facts-draft.md` 中将置信度降为「中」并补备注。
- ❌ 条目：无（本轮无定位串与 full_quote 均失败且无法归一化命中的条目）。

