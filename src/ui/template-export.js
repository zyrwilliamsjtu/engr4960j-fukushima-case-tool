/**
 * 按作业报告模板分区的素材导出。只搬运用户已写文本，不代写分析。
 */
(function (root) {
  "use strict";

  var DISCLAIMER =
    "> 本文件为分析素材。案例分析正文与自我反思报告须由小组成员独立撰写，禁止 AI 代笔。";

  var CHAPTERS = [
    "Case introduction",
    "Identifying Ethical Issues",
    "Narrowing the Focus",
    "Determining Relevant and Missing Facts",
    "Reasonable Assumptions",
    "Undertaking Definitional Clarification",
    "Step 6. Applying Ethical Principles",
    "Step 7. Review process",
    "Step 8. Solving Ethical Issues",
    "Step 9. Identifying practical constraints",
    "Step 10. Avoiding/Predicting Ethical Issues in the future",
    "Self-Reflection report",
    "References"
  ];

  var STEP_NAME = {
    1: "识别伦理问题",
    2: "聚焦",
    3: "确定相关事实",
    4: "作出合理假设",
    5: "定义澄清",
    6: "进行伦理分析",
    7: "回顾过程",
    8: "解决问题",
    9: "识别实践约束",
    10: "避免伦理问题"
  };

  function listItems(state, type) {
    return Object.keys(state.items || {})
      .map(function (id) {
        return state.items[id];
      })
      .filter(function (item) {
        return item && (!type || item.type === type);
      });
  }

  function factsFor(state, data, category) {
    var linkedIds = {};
    (state.relations || []).forEach(function (rel) {
      if (rel.kind === "fact-supports-question") linkedIds[rel.from] = true;
    });
    return (data.facts || []).filter(function (fact) {
      if (!linkedIds[fact.id]) return false;
      var cats = fact.categories || [];
      if (!category) return cats.indexOf("material") < 0 && cats.indexOf("individual") < 0 && cats.indexOf("organization") < 0;
      return cats.indexOf(category) >= 0;
    });
  }

  var STEP_NAME_EN = ["", "Identify ethical issues", "Narrow the focus", "Determine relevant facts", "Make reasonable assumptions", "Clarify definitions", "Conduct ethical analysis", "Review the process", "Resolve the issue", "Consider practical constraints", "Avoid ethical problems"];
  var EN_COPY = {
  "本节属报告正文，须由小组成员独立撰写。": "Group members must write this report section themselves.",
  "「为什么这一步重要」属报告正文，须由小组成员独立撰写。": "Group members must explain why this step matters themselves.",
  "案例分析素材": "Case analysis materials",
  "工具把伦理问题记成问句列表，并可选填涉及主体。模板分成公司、工程师、其他三类，并要求说明谁如何受影响。请按模板自行归类，下面是原记录。": "The tool stores questions and optional actors. The template groups issues by company, engineers and others, and asks who is affected and how. Organize your original records yourself.",
  "列出伦理问题（问句），并说明受影响的主体。": "List ethical questions and identify the people affected.",
  "按公司、工程师、其他分组，并写明至少三类利益相关方如何受影响。": "Group issues by company, engineers and others. Explain how at least three stakeholder groups are affected.",
  "工具用一段「为什么优先讨论」记录聚焦理由。模板还分开要求直接/间接原因、严重性、范围、长短期后果。": "The tool stores a focus reason in one field. The template separately asks for direct and indirect causes, severity, scope, and short- and long-term consequences.",
  "从伦理问题中选出分析重点，并写明为什么重要。": "Choose a focal ethical question and explain why it matters.",
  "把聚焦理由拆成直接/间接原因、严重性、范围、长短期后果。": "Expand the focus reason into causes, severity, scope, and short- and long-term consequences.",
  "补上模板要求的日期、地点等一般事实。这些不是单独字段。": "Add general facts such as dates and locations. The tool has no separate fields for them.",
  "写入物质/工程类相关事实，并说明为何与问题相关。": "Add material or engineering facts and explain their relevance.",
  "写入关于个人的相关事实。": "Add relevant facts about individuals.",
  "写入关于组织的相关事实。": "Add relevant facts about organizations.",
  "下列已关联事实没有落入物质/个人/组织三类。": "The following linked facts have no material, individual or organizational category.",
  "列出仍然缺失、但会影响分析的事实。": "List missing facts that could affect the analysis.",
  "工具记录假设正文和依据条目。模板还要求先写出为作出假设而提出的问题。": "The tool stores assumptions and supporting references. The template also asks for the question leading to each assumption.",
  "针对缺失事实写下合理假设，并说明推断理由。": "State reasonable assumptions about missing facts and explain the inference.",
  "为每条假设补上模板中的「为作出假设而提出的问题」。": "Add the question leading to each assumption.",
  "工具记录术语、他人理解、本组用法。模板还要求定义、澄清，以及该词为何与本案相关。": "The tool stores terms, other interpretations and your usage. The template also asks for definitions, clarification and case relevance.",
  "澄清带价值含义的术语：他人如何理解，本组如何使用。": "Clarify value-laden terms: how others understand them and how your group uses them.",
  "补上该术语为何与本案相关。工具没有单独的相关性字段。": "Explain why the term matters to this case. The tool has no separate relevance field.",
  "列出与待决问题相关的原则，并写明为何适用。": "List relevant ethical principles and explain their applicability.",
  "说明为什么有些附录原则没有纳入（排除理由）。": "Explain why some appendix principles were excluded.",
  "若原则冲突，写明冲突双方、如何取舍，以及该优先关系是仅本案还是更普遍。": "If principles conflict, identify both sides, explain your priority, and state whether it is case-specific or general.",
  "写下回顾时发现、但前面步骤没有记录的问题、事实、概念或原则。": "Record issues, facts, concepts or principles discovered during review that earlier steps omitted.",
  "工具对核心问题有一段回答和一段简要理由。模板要求短期方案与长期方案分开写。": "The tool stores an answer and a brief reason for each core question. The template separates short- and long-term solutions.",
  "针对第 2 步选定的问题写下你的解决办法和简要理由。": "Write your solution and brief reasoning for the question selected in step 2.",
  "把解决办法分成短期方案和长期方案；并补上回顾之后才发现的问题。": "Separate short- and long-term solutions and address questions discovered during review.",
  "工具把现实约束记成一条记录（约束是什么、当时还有哪些选择、是否减轻责任）。模板分成技术工程、法规、文化、其他四类。下面不替你归类。": "The tool stores each constraint, alternatives and its effect on responsibility. The template groups constraints into technical, regulatory, cultural and other categories. Categorize these records yourself.",
  "列出可能影响责任判断的现实约束，并写明当时的可行选择。": "List practical constraints affecting responsibility and the alternatives feasible at the time.",
  "按技术与工程、法规、文化、其他四类重新整理这些约束。": "Organize constraints into technical and engineering, regulatory, cultural and other categories.",
  "工具记录一条预防措施。模板还要求同时写出工程方案、政府/法律方案和其他方案。": "The tool stores preventive measures. The template also asks for engineering, governmental or legal, and other approaches.",
  "基于前面的步骤，写下这些伦理问题本可以如何被避免。": "Based on earlier steps, explain how these ethical problems could have been avoided.",
  "为每条预防思路补上工程方案、政府/法律方案和其他方案。": "Add engineering, governmental or legal, and other approaches to each preventive idea.",
  "按 APA 第 7 版另列至少 10 条参考文献。工具里的来源信息只附在事实后面，不生成文献表。": "Prepare at least 10 references in APA 7 style. The tool appends source information to facts but does not generate a bibliography.",
  "> 本节属报告正文，须由小组成员独立撰写。\n\n": "> Group members must write this report section themselves.\n\n",
  "> 「为什么这一步重要」属报告正文，须由小组成员独立撰写。\n\n": "> Group members must explain why this step matters themselves.\n\n",
  "[来源：": "[Source: "
};

  function exportReport(state, data, locale) {
    var english = locale === "en";
    function copy(text) { return english ? EN_COPY[text] || text : text; }
    function human() {
      return copy("> 本节属报告正文，须由小组成员独立撰写。\n\n");
    }

    function whyImportant() {
      return copy("> 「为什么这一步重要」属报告正文，须由小组成员独立撰写。\n\n");
    }

    function gap(step, what) {
      return english ? "> ⚠️ Complete manually (step " + step + ": " + STEP_NAME_EN[step] + "): " + what + "\n\n" : "> ⚠️ 需人工补充（来自第 " + step + " 步：" + STEP_NAME[step] + "）：" + what + "\n\n";
    }

    function note(text) {
      return (english ? "> Existing fields do not fully match the template: " : "> 工具按现有字段搬入，与模板结构不完全相同：") + text + "\n\n";
    }

    function block(text) {
      if (text == null || text === "") return "";
      return String(text) + "\n\n";
    }

    function sourceLine(data, sourceId) {
      var source = (data.sources || []).filter(function (item) {
        return item.id === sourceId;
      })[0];
      if (!source) return "";
      var line = copy("[来源：") + (source.title || "") + ", " + (source.publisher || "") + ", " + (source.year == null ? "" : source.year) + "]";
      return line + "\n\n";
    }

    function factBlocks(data, facts) {
      if (!facts.length) return "";
      return facts
        .map(function (fact) {
          var extra = "";
          if (fact.quote) extra += fact.quote + "\n\n";
          if (fact.locator) extra += fact.locator + "\n\n";
          var factText =
            english && root.FieldnotesCaseText
              ? root.FieldnotesCaseText.fact(fact, "en")
              : fact.text;
          return block(factText) + sourceLine(data, fact.sourceId) + extra;
        })
        .join("");
    }


    state = state || { items: {}, relations: [], conflicts: [] };
    data = data || { facts: [], sources: [], principles: [] };
    var reportTitle = data.meta && data.meta.title;
    if (english && data.meta && root.FieldnotesCaseText) reportTitle = root.FieldnotesCaseText.metaTitle(data.meta, "en");
    var questions = listItems(state, "Q");
    var cores = questions.filter(function (item) {
      return item.isCore;
    });
    var skipDisclaimer = root.__FN_DEMO_PACK;
    var lines = ["# " + (reportTitle || copy("案例分析素材")), ""];
    if (!skipDisclaimer) {
      lines.push("", english ? "> These are analysis materials. Group members must write the case analysis and self-reflection themselves; AI must not write them." : DISCLAIMER, "");
    } else {
      lines.push("");
    }

    lines.push("## " + CHAPTERS[0], "", human());

    lines.push("## " + CHAPTERS[1], "", whyImportant());
    lines.push(
      note(copy("工具把伦理问题记成问句列表，并可选填涉及主体。模板分成公司、工程师、其他三类，并要求说明谁如何受影响。请按模板自行归类，下面是原记录。"))
    );
    if (!questions.length) lines.push(gap(1, copy("列出伦理问题（问句），并说明受影响的主体。")));
    questions.forEach(function (item) {
      lines.push(block(item.text));
      if (item.actors && item.actors.length) lines.push(block(item.actors.join(english ? ", " : "，")));
    });
    lines.push(gap(1, copy("按公司、工程师、其他分组，并写明至少三类利益相关方如何受影响。")));

    lines.push("## " + CHAPTERS[2], "", whyImportant());
    lines.push(note(copy("工具用一段「为什么优先讨论」记录聚焦理由。模板还分开要求直接/间接原因、严重性、范围、长短期后果。")));
    if (!cores.length) lines.push(gap(2, copy("从伦理问题中选出分析重点，并写明为什么重要。")));
    cores.forEach(function (item) {
      lines.push(block(item.text));
      lines.push(block(item.focusReason));
    });
    lines.push(gap(2, copy("把聚焦理由拆成直接/间接原因、严重性、范围、长短期后果。")));

    lines.push("## " + CHAPTERS[3], "", whyImportant());
    lines.push("### General Facts", "", gap(3, copy("补上模板要求的日期、地点等一般事实。这些不是单独字段。")));
    lines.push("### Material Facts", "", factBlocks(data, factsFor(state, data, "material")) || gap(3, copy("写入物质/工程类相关事实，并说明为何与问题相关。")));
    lines.push("### Facts Regarding Individuals", "", factBlocks(data, factsFor(state, data, "individual")) || gap(3, copy("写入关于个人的相关事实。")));
    lines.push("### Facts Regarding Organizations", "", factBlocks(data, factsFor(state, data, "organization")) || gap(3, copy("写入关于组织的相关事实。")));
    var uncategorized = factBlocks(data, factsFor(state, data, null));
    if (uncategorized) lines.push(note(copy("下列已关联事实没有落入物质/个人/组织三类。")), uncategorized);
    lines.push("### Missing Facts", "");
    var gaps = listItems(state, "M");
    if (!gaps.length) lines.push(gap(3, copy("列出仍然缺失、但会影响分析的事实。")));
    gaps.forEach(function (item) {
      lines.push(block(item.text));
    });

    lines.push("## " + CHAPTERS[4], "", whyImportant());
    lines.push(note(copy("工具记录假设正文和依据条目。模板还要求先写出为作出假设而提出的问题。")));
    var assumptions = listItems(state, "A");
    if (!assumptions.length) lines.push(gap(4, copy("针对缺失事实写下合理假设，并说明推断理由。")));
    assumptions.forEach(function (item) {
      lines.push(block(item.text));
      if (item.basisRefs && item.basisRefs.length) lines.push(block(item.basisRefs.join(english ? ", " : "，")));
    });
    lines.push(gap(4, copy("为每条假设补上模板中的「为作出假设而提出的问题」。")));

    lines.push("## " + CHAPTERS[5], "", whyImportant());
    lines.push(note(copy("工具记录术语、他人理解、本组用法。模板还要求定义、澄清，以及该词为何与本案相关。")));
    var concepts = listItems(state, "C");
    if (!concepts.length) lines.push(gap(5, copy("澄清带价值含义的术语：他人如何理解，本组如何使用。")));
    concepts.forEach(function (item) {
      if (item.word) lines.push(block(item.word));
      if (item.others) lines.push(block(item.others));
      if (item.mine) lines.push(block(item.mine));
    });
    lines.push(gap(5, copy("补上该术语为何与本案相关。工具没有单独的相关性字段。")));

    lines.push("## " + CHAPTERS[6], "", whyImportant());
    var principles = listItems(state, "PA");
    if (!principles.length) lines.push(gap(6, copy("列出与待决问题相关的原则，并写明为何适用。")));
    principles.forEach(function (item) {
      var name = item.principleId || "";
      var found = (data.principles || []).filter(function (row) {
        return row.id === item.principleId;
      })[0];
      if (found) name = english ? found.nameEn || found.name : found.name;
      if (name) lines.push(block(name));
      if (item.text) lines.push(block(item.text));
    });
    lines.push(gap(6, copy("说明为什么有些附录原则没有纳入（排除理由）。")));
    lines.push("### Conflicts Between Principles", "");
    if (!(state.conflicts || []).length) lines.push(gap(6, copy("若原则冲突，写明冲突双方、如何取舍，以及该优先关系是仅本案还是更普遍。")));
    (state.conflicts || []).forEach(function (row) {
      ["principleA", "principleB", "supportsA", "supportsB", "priority", "reason", "scope"].forEach(function (key) {
        if (row[key]) lines.push(block(String(row[key])));
      });
    });

    lines.push("## " + CHAPTERS[7], "", whyImportant());
    lines.push(gap(7, copy("写下回顾时发现、但前面步骤没有记录的问题、事实、概念或原则。")));

    lines.push("## " + CHAPTERS[8], "", whyImportant());
    lines.push(note(copy("工具对核心问题有一段回答和一段简要理由。模板要求短期方案与长期方案分开写。")));
    var answers = listItems(state, "R");
    if (!answers.length) lines.push(gap(8, copy("针对第 2 步选定的问题写下你的解决办法和简要理由。")));
    answers.forEach(function (item) {
      if (item.text) lines.push(block(item.text));
      if (item.reason) lines.push(block(item.reason));
    });
    lines.push(gap(8, copy("把解决办法分成短期方案和长期方案；并补上回顾之后才发现的问题。")));

    lines.push("## " + CHAPTERS[9], "", whyImportant());
    lines.push(note(copy("工具把现实约束记成一条记录（约束是什么、当时还有哪些选择、是否减轻责任）。模板分成技术工程、法规、文化、其他四类。下面不替你归类。")));
    var constraints = listItems(state, "RC");
    if (!constraints.length) lines.push(gap(9, copy("列出可能影响责任判断的现实约束，并写明当时的可行选择。")));
    constraints.forEach(function (item) {
      if (item.text) lines.push(block(item.text));
      if (item.alternatives) lines.push(block(item.alternatives));
      if (item.mitigationJudgment) lines.push(block(item.mitigationJudgment));
    });
    lines.push(gap(9, copy("按技术与工程、法规、文化、其他四类重新整理这些约束。")));

    lines.push("## " + CHAPTERS[10], "", whyImportant());
    lines.push(note(copy("工具记录一条预防措施。模板还要求同时写出工程方案、政府/法律方案和其他方案。")));
    var preventions = listItems(state, "AV");
    if (!preventions.length) lines.push(gap(10, copy("基于前面的步骤，写下这些伦理问题本可以如何被避免。")));
    preventions.forEach(function (item) {
      lines.push(block(item.text));
    });
    lines.push(gap(10, copy("为每条预防思路补上工程方案、政府/法律方案和其他方案。")));

    lines.push("## " + CHAPTERS[11], "", human());
    lines.push("## " + CHAPTERS[12], "", gap(3, copy("按 APA 第 7 版另列至少 10 条参考文献。工具里的来源信息只附在事实后面，不生成文献表。")));

    return lines.join("\n");
  }

  root.TemplateExport = {
    DISCLAIMER: DISCLAIMER,
    CHAPTERS: CHAPTERS,
    exportReport: exportReport
  };
})(typeof globalThis !== "undefined" ? globalThis : window);
