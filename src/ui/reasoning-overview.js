/**
 * 推理总览：只读。不写入状态，不新增字段。
 */
(function (root) {
  "use strict";

  var scope = "class";
  var readState = function () {
    return { items: {}, relations: [], conflicts: [] };
  };
  var readData = function () {
    return { facts: [], sources: [], principles: [] };
  };
  var readLocale = function () {
    return "zh";
  };

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function zh() {
    return readLocale() !== "en";
  }

  function label(zhText, enText) {
    return zh() ? zhText : enText;
  }

  function copy(key, zhText, enText) {
    var pairs = root.FieldnotesI18n && root.FieldnotesI18n.pairs;
    if (pairs && pairs[key]) return zh() ? pairs[key][0] : pairs[key][1];
    return label(zhText, enText);
  }

  function itemsOf(state, type) {
    return Object.keys(state.items || {})
      .map(function (id) {
        return state.items[id];
      })
      .filter(function (item) {
        return item && item.type === type;
      });
  }

  function linked(state, questionId, kind) {
    return (state.relations || []).filter(function (rel) {
      if (kind && rel.kind !== kind) return false;
      return rel.to === questionId || rel.from === questionId;
    });
  }

  function factRecord(state, data, id) {
    var fromCase = (data.facts || []).filter(function (fact) {
      return fact.id === id;
    })[0];
    return fromCase || (state.items || {})[id] || null;
  }

  function principleName(data, id) {
    var found = (data.principles || []).filter(function (item) {
      return item.id === id;
    })[0];
    if (!found) return id || "";
    return zh() ? found.name : found.nameEn || found.name;
  }

  function sourceTag(kind) {
    var text =
      kind === "fact"
        ? copy("overviewFactTag", "事实", "Fact")
        : kind === "assumption"
          ? copy("overviewAssumptionTag", "我的假设", "My assumption")
          : kind === "reference"
            ? copy("overviewReferenceTag", "参考观点", "Reference perspective")
            : copy("overviewJudgmentTag", "我的判断", "My judgment");
    return '<span class="tag">' + esc(text) + "</span> ";
  }

  function jump(step, body) {
    return (
      '<button type="button" class="button small quiet" data-action="navigate" data-step="' +
      step +
      '">' +
      body +
      "</button>"
    );
  }

  function group(testId, title, html, hidden) {
    if (hidden) return "";
    return (
      "<section" +
      (testId ? ' data-testid="' + testId + '"' : "") +
      "><h4>" +
      esc(title) +
      "</h4>" +
      (html || "<p>" + esc(copy("overviewEmptyGroup", "这一组还没有记录。", "Nothing in this group yet.")) + "</p>") +
      "</section>"
    );
  }

  function renderQuestion(state, data, question, index) {
    var facts = linked(state, question.id, "fact-supports-question")
      .map(function (rel) {
        var fact = factRecord(state, data, rel.from === question.id ? rel.to : rel.from);
        if (!fact) return "";
        var text = fact.text || fact.id;
        return jump(
          3,
          sourceTag("fact") +
            "<span>" +
            esc(text) +
            "</span><br><small>" +
            esc(copy("overviewWhy", "为什么相关：", "Why it matters: ") + (rel.why || "—")) +
            "</small>"
        );
      })
      .join("");

    var gaps = itemsOf(state, "M")
      .filter(function (item) {
        return linked(state, question.id).some(function (rel) {
          return rel.from === item.id || rel.to === item.id;
        }) || itemsOf(state, "Q").filter(function (q) { return q.isCore; }).length <= 1;
      })
      .map(function (item) {
        return jump(3, sourceTag("judgment") + "<span>" + esc(item.text || item.id) + "</span>");
      })
      .join("");

    var assumptions = itemsOf(state, "A")
      .map(function (item) {
        var basis = (item.basisRefs || [])
          .map(function (id) {
            var hit = factRecord(state, data, id) || (state.items || {})[id];
            return hit ? hit.text || hit.word || hit.title || id : id;
          })
          .filter(Boolean)
          .join(" · ");
        return jump(
          4,
          sourceTag("assumption") +
            "<span>" +
            esc(item.text || item.id) +
            "</span>" +
            (basis ? "<br><small>" + esc(copy("overviewBasis", "依据：", "Basis: ") + basis) + "</small>" : "")
        );
      })
      .join("");

    var concepts = itemsOf(state, "C")
      .map(function (item) {
        var bits = [item.word, item.others, item.mine].filter(Boolean).join(" / ");
        return jump(5, sourceTag("judgment") + "<span>" + esc(bits || item.id) + "</span>");
      })
      .join("");

    var principles = itemsOf(state, "PA")
      .filter(function (item) {
        return (
          !item.appliesTo ||
          !item.appliesTo.length ||
          item.appliesTo.indexOf(question.id) >= 0
        );
      })
      .map(function (item) {
        var name = item.principleId ? principleName(data, item.principleId) : item.text;
        return jump(6, sourceTag(item.principleId ? "reference" : "judgment") + "<span>" + esc(name || item.id) + "</span>" + (item.principleId && item.text ? "<br><small>" + esc(item.text) + "</small>" : ""));
      })
      .join("");

    var conflicts = (state.conflicts || [])
      .filter(function (row) {
        return !row.questionId || row.questionId === question.id;
      })
      .map(function (row) {
        var line =
          principleName(data, row.principleA) +
          " ↔ " +
          principleName(data, row.principleB) +
          (row.priority ? " · " + row.priority : "") +
          (row.reason ? " · " + row.reason : "");
        return jump(6, sourceTag("judgment") + "<span>" + esc(line) + "</span>");
      })
      .join("");

    var answers = (state.relations || [])
      .filter(function (rel) {
        return rel.kind === "resolution-answers-question" && rel.to === question.id;
      })
      .map(function (rel) {
        var answer = (state.items || {})[rel.from];
        if (!answer) return "";
        return jump(
          8,
          sourceTag("judgment") +
            "<span>" +
            esc(answer.text || "—") +
            "</span>" +
            (answer.reason ? "<br><small>" + esc(answer.reason) + "</small>" : "")
        );
      })
      .join("");

    var mark = index === 0;
    var full = scope === "full";
    return (
      '<article class="entry-card"><h3>' +
      esc(question.text || question.id) +
      "</h3>" +
      group(mark ? "overview-group-facts" : "", copy("overviewFacts", "相关事实", "Relevant facts"), facts, false) +
      group(mark ? "overview-group-gaps" : "", copy("overviewGaps", "信息缺口", "Missing facts"), gaps, false) +
      group(mark ? "overview-group-assumptions" : "", copy("overviewAssumptions", "合理假设", "Reasonable assumptions"), assumptions, false) +
      group(mark ? "overview-group-concepts" : "", copy("overviewConcepts", "定义澄清", "Definitional clarification"), concepts, false) +
      group(mark ? "overview-group-principles" : "", copy("overviewPrinciples", "伦理分析", "Ethical analysis"), principles + conflicts, !full) +
      group(mark ? "overview-group-conclusion" : "", copy("overviewConclusion", "结论", "Resolution"), answers, !full) +
      "</article>"
    );
  }

  function renderPanel(state, data) {
    state = state || { items: {}, relations: [], conflicts: [] };
    data = data || { facts: [], sources: [], principles: [] };
    var questions = itemsOf(state, "Q");
    var cores = questions.filter(function (item) {
      return item.isCore;
    });
    var heads = cores.length ? cores : questions;
    var factLinks = (state.relations || []).filter(function (rel) {
      return rel.kind === "fact-supports-question";
    }).length;
    var summaryTpl = copy("overviewSummary", "核心问题 {core} 条 · 关联事实 {facts} 条 · 假设 {assumptions} 条 · 待澄清 {terms} 条", "Core questions {core} · linked facts {facts} · assumptions {assumptions} · terms {terms}");
    var summary = summaryTpl
      .replace("{core}", String(cores.length))
      .replace("{facts}", String(factLinks))
      .replace("{assumptions}", String(itemsOf(state, "A").length))
      .replace("{terms}", String(itemsOf(state, "C").length));
    var notice = cores.length
      ? ""
      : '<p class="hint">' +
        esc(copy("overviewEmpty", "尚未选定核心问题。请先在第 2 步从伦理问题中选出 1–2 条作为分析焦点。", "No core question yet. In step 2, choose 1–2 ethical questions as the focus.")) +
        "</p>";
    var body = heads.length
      ? heads
          .map(function (question, index) {
            return renderQuestion(state, data, question, index);
          })
          .join("")
      : "<p>" + esc(copy("overviewNoQuestions", "还没有伦理问题。请先在第 1 步写下问题。", "No ethical questions yet. Write them in step 1.")) + "</p>";
    return (
      '<div id="reasoning-overview" class="revision-compare" data-readonly="true">' +
      '<p class="revision-summary" data-testid="overview-summary">' +
      esc(summary) +
      "</p>" +
      '<div data-testid="overview-scope" data-value="' +
      scope +
      '">' +
      '<button type="button" class="button small' +
      (scope === "class" ? " primary" : " quiet") +
      '" data-overview-scope="class">' +
      esc(copy("overviewClass", "课堂视图", "Class view")) +
      "</button>" +
      '<button type="button" class="button small' +
      (scope === "full" ? " primary" : " quiet") +
      '" data-overview-scope="full">' +
      esc(copy("overviewFull", "完整视图", "Full view")) +
      "</button></div>" +
      notice +
      body +
      "</div>"
    );
  }

  document.addEventListener("click", function (event) {
    var button = event.target.closest("[data-overview-scope]");
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    scope = button.getAttribute("data-overview-scope") === "full" ? "full" : "class";
    var host = document.getElementById("reasoning-overview");
    if (!host) return;
    host.outerHTML = renderPanel(readState(), readData());
  });

  root.ReasoningOverview = {
    renderPanel: renderPanel,
    setReaders: function (stateFn, dataFn, localeFn) {
      if (stateFn) readState = stateFn;
      if (dataFn) readData = dataFn;
      if (localeFn) readLocale = localeFn;
    },
    getScope: function () {
      return scope;
    },
    setScope: function (value) {
      scope = value === "full" ? "full" : "class";
    }
  };
})(typeof globalThis !== "undefined" ? globalThis : window);
