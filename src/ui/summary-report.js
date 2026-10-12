/**
 * 总结与报告（只读）：搬运用户已填内容，不写入状态。
 */
(function (root) {
  "use strict";

  function itemsOf(state, type, step) {
    return Object.keys(state.items || {})
      .map(function (id) {
        return state.items[id];
      })
      .filter(function (it) {
        return it && (!type || it.type === type) && (!step || it.step === step);
      });
  }

  function linkedFacts(state, data) {
    var linked = {};
    (state.relations || []).forEach(function (rel) {
      if (rel.kind === "fact-supports-question") linked[rel.from] = rel;
    });
    return (data.facts || []).filter(function (fact) {
      return linked[fact.id];
    });
  }

  function render(ctx) {
    var state = ctx.state;
    var data = ctx.data;
    var esc = ctx.esc;
    var t = ctx.t;
    var title = ctx.stepTitle;
    var statusLabel = ctx.statusLabel;
    var tag = ctx.sourceTag;
    var gapLine = ctx.gapLine;
    var overviewHtml = ctx.overviewHtml || "";

    var byStep = [];
    var i;
    for (i = 0; i <= 10; i++) byStep[i] = [];
    var filled = 0;
    var gaps = [];

    function entry(step, text, tagKey, id) {
      if (text == null || !String(text).trim()) return;
      filled += 1;
      byStep[step].push(
        '<li class="summary-entry">' +
          '<span class="tag muted">' +
          esc(tag(tagKey)) +
          "</span>" +
          '<p class="summary-entry-text">' +
          esc(String(text)) +
          "</p>" +
          '<a href="#" data-action="navigate" data-step="' +
          step +
          '"' +
          (id ? ' data-id="' + esc(id) + '"' : "") +
          ">" +
          esc(t("summaryJump")) +
          "</a></li>"
      );
    }

    function needGap(step, what) {
      gaps.push({ step: step, what: what, name: title(step) });
      byStep[step].push('<li class="summary-gap">' + esc(gapLine(step, title(step), what)) + "</li>");
    }

    itemsOf(state, "Q").forEach(function (it) {
      entry(1, it.text, "judgment", it.id);
      if (it.actors && it.actors.length) entry(1, it.actors.join(", "), "judgment", it.id);
    });
    if (!itemsOf(state, "Q").length) needGap(1, t("summaryNeedQuestions"));

    itemsOf(state, "Q")
      .filter(function (q) {
        return q.isCore;
      })
      .forEach(function (it) {
        entry(2, it.text, "judgment", it.id);
        entry(2, it.focusReason, "judgment", it.id);
      });
    if (
      !itemsOf(state, "Q").some(function (q) {
        return q.isCore;
      })
    )
      needGap(2, t("summaryNeedCore"));

    linkedFacts(state, data).forEach(function (fact) {
      var rel = (state.relations || []).find(function (r) {
        return r.from === fact.id && r.kind === "fact-supports-question";
      });
      entry(3, ctx.factText ? ctx.factText(fact) : fact.text, "fact", fact.id);
      if (rel && rel.why) entry(3, rel.why, "judgment", fact.id);
    });
    itemsOf(state, "M").forEach(function (it) {
      entry(3, it.text, "judgment", it.id);
    });
    if (!linkedFacts(state, data).length && !itemsOf(state, "M").length) needGap(3, t("summaryNeedFacts"));

    itemsOf(state, "A").forEach(function (it) {
      entry(4, it.text, "assumption", it.id);
      (it.basisRefs || []).forEach(function (refId) {
        var basis = state.items[refId];
        var fact = (data.facts || []).find(function (f) {
          return f.id === refId;
        });
        if (basis) entry(4, basis.text || basis.title, "fact", it.id);
        else if (fact) entry(4, ctx.factText ? ctx.factText(fact) : fact.text, "fact", it.id);
      });
      var fill = (state.relations || []).find(function (r) {
        return r.from === it.id && r.kind === "assumption-fills-gap";
      });
      if (fill && fill.why) entry(4, fill.why, "judgment", it.id);
    });
    if (!itemsOf(state, "A").length) needGap(4, t("summaryNeedAssumptions"));

    itemsOf(state, "C").forEach(function (it) {
      entry(5, it.word, "judgment", it.id);
      entry(5, it.others || it.othersView, "reference", it.id);
      entry(5, it.mine || it.myUsage, "judgment", it.id);
    });
    if (!itemsOf(state, "C").length) needGap(5, t("summaryNeedConcepts"));

    itemsOf(state, "PA").forEach(function (it) {
      var found = (data.principles || []).find(function (p) {
        return p.id === it.principleId;
      });
      if (found) entry(6, found.name, "reference", it.id);
      if (it.text) entry(6, it.text, "judgment", it.id);
    });
    (state.conflicts || []).forEach(function (c) {
      ["supportsA", "supportsB", "priority", "reason"].forEach(function (key) {
        entry(6, c[key], "judgment", c.id);
      });
    });
    if (!itemsOf(state, "PA").length && !(state.conflicts || []).length) needGap(6, t("summaryNeedPrinciples"));

    Object.keys(state.items || {}).forEach(function (id) {
      var it = state.items[id];
      if (!it || it.step >= 7) return;
      var text = it.text || it.word;
      if (!text) return;
      if (it.review && it.review.note) entry(7, it.review.note, "judgment", it.id);
    });
    if (
      !Object.keys(state.items || {}).some(function (id) {
        var it = state.items[id];
        return it && it.step < 7 && (it.text || it.word);
      })
    )
      needGap(7, t("summaryNeedReview"));

    itemsOf(state, "R").forEach(function (it) {
      entry(8, it.text, "judgment", it.id);
      entry(8, it.reason, "judgment", it.id);
    });
    if (!itemsOf(state, "R").length) needGap(8, t("summaryNeedResolution"));

    itemsOf(state, "RC").forEach(function (it) {
      entry(9, it.text, "judgment", it.id);
      entry(9, it.alternatives, "judgment", it.id);
      entry(9, it.mitigationJudgment, "judgment", it.id);
    });
    if (!itemsOf(state, "RC").length) needGap(9, t("summaryNeedConstraints"));

    itemsOf(state, "AV").forEach(function (it) {
      entry(10, it.text, "judgment", it.id);
    });
    if (!itemsOf(state, "AV").length) needGap(10, t("summaryNeedPrevention"));

    var questions = itemsOf(state, "Q").filter(function (q) {
      return q.isCore;
    });
    if (!questions.length) questions = itemsOf(state, "Q");
    var resolutions = itemsOf(state, "R");
    var assumptions = itemsOf(state, "A");
    var principles = itemsOf(state, "PA");
    var factRels = (state.relations || []).filter(function (r) {
      return r.kind === "fact-supports-question";
    });
    var cards = questions
      .map(function (q) {
        var facts = factRels.filter(function (r) {
          return r.to === q.id;
        });
        var shown = facts.slice(0, 2);
        var rest = facts.slice(2);
        function factLine(rel) {
          var fact = (data.facts || []).find(function (f) {
            return f.id === rel.from;
          });
          var wording = fact ? (ctx.factText ? ctx.factText(fact) : fact.text) : rel.from;
          var src = fact && ctx.sourceName ? ctx.sourceName(fact.sourceId) : "";
          return (
            "<li><p>" +
            esc(wording) +
            "</p><p>" +
            esc(t("overviewWhy")) +
            esc(rel.why || "") +
            (src ? " · " + esc(src) : "") +
            "</p></li>"
          );
        }
        var factHtml = shown.map(factLine).join("");
        if (!facts.length) factHtml = "<li>" + esc(t("summaryNoFact")) + "</li>";
        var more = rest.length
          ? "<details><summary>" +
            esc(t("summaryMoreFacts")) +
            "</summary><ul>" +
            rest.map(factLine).join("") +
            "</ul></details>"
          : "";
        var assumptionHtml = assumptions.length
          ? assumptions
              .slice(0, 2)
              .map(function (a) {
                return "<li>" + esc(a.text || "") + (a.basisRefs && a.basisRefs.length ? " · " + esc(a.basisRefs.join(", ")) : "") + "</li>";
              })
              .join("")
          : "<li>" + esc(gapLine(4, title(4), t("summaryNeedAssumptions"))) + "</li>";
        var principleHtml = principles.length
          ? principles
              .slice(0, 2)
              .map(function (p) {
                var found = (data.principles || []).find(function (row) {
                  return row.id === p.principleId;
                });
                return "<li>" + esc((found && (ctx.localeName ? ctx.localeName(found) : found.name)) || p.text || p.id) + "</li>";
              })
              .join("")
          : "<li>" + esc(gapLine(6, title(6), t("summaryNeedPrinciples"))) + "</li>";
        var conclusion = resolutions.length
          ? "<p>" + esc(resolutions[0].text || "") + (resolutions[0].reason ? " · " + esc(resolutions[0].reason) : "") + "</p>"
          : "<p>" + esc(gapLine(8, title(8), t("summaryNeedResolution"))) + "</p>";
        return (
          '<article class="summary-arg" data-testid="summary-argument">' +
          "<h3>" +
          esc(q.text || "") +
          "</h3><h4>" +
          esc(t("summaryFacts")) +
          "</h4><ul>" +
          factHtml +
          "</ul>" +
          more +
          "<h4>" +
          esc(t("summaryAssumptions")) +
          "</h4><ul>" +
          assumptionHtml +
          "</ul><h4>" +
          esc(t("summaryPrinciples")) +
          "</h4><ul>" +
          principleHtml +
          "</ul><h4>" +
          esc(t("summaryYourConclusion")) +
          "</h4>" +
          conclusion +
          "</article>"
        );
      })
      .join("");
    if (!questions.length) {
      cards = '<article class="summary-arg" data-testid="summary-argument"><p>' + esc(gapLine(1, title(1), t("summaryNeedQuestions"))) + "</p></article>";
    }

    var htmlSections = "";
    for (var step = 1; step <= 10; step++) {
      var body = byStep[step].join("");
      if (!body) body = '<li class="summary-gap">' + esc(gapLine(step, title(step), t("summaryStepEmpty"))) + "</li>";
      var st = (state.stepStatus && state.stepStatus[step]) || "todo";
      htmlSections +=
        '<section class="summary-step" data-testid="summary-step-' +
        step +
        '">' +
        '<header class="summary-step-head">' +
        "<h3>" +
        esc(title(step)) +
        "</h3>" +
        statusLabel(st) +
        "</header>" +
        '<ul class="summary-step-list">' +
        body +
        "</ul></section>";
    }

    var gapList = gaps
      .map(function (g) {
        return (
          '<li><a href="#" data-action="navigate" data-step="' +
          g.step +
          '">' +
          esc(gapLine(g.step, g.name, g.what)) +
          "</a></li>"
        );
      })
      .join("");

    var counts = t("summaryCounts")
      .replace("{q}", String(questions.length))
      .replace("{f}", String(factRels.length))
      .replace("{p}", String(principles.length))
      .replace("{r}", String(resolutions.length))
      .replace("{g}", String(gaps.length));

    return (
      '<div class="summary-report summary-brief" data-readonly="true">' +
      '<blockquote class="summary-redline">' +
      esc(t("summaryRedline")) +
      "</blockquote>" +
      '<header class="summary-header"><h1>' +
      esc(t("summaryReport")) +
      '</h1><p class="hint">' +
      esc(t("summaryIntro")) +
      "</p><p class=\"summary-completeness\" data-testid=\"summary-completeness\">" +
      esc(counts) +
      " · " +
      esc(t("summaryFilled").replace("{n}", String(filled)).replace("{m}", String(gaps.length))) +
      "</p></header>" +
      cards +
      (gaps.length ? '<ul class="summary-gap-list">' + gapList + "</ul>" : "") +
      '<p class="hint">' +
      esc(t("summaryReplayNote")) +
      "</p>" +
      '<div class="summary-export-row">' +
      ctx.exportButtons +
      "</div>" +
      '<details class="summary-full-replay"><summary>' +
      esc(t("summaryReplay")) +
      "</summary>" +
      htmlSections +
      '<div class="summary-overview">' +
      overviewHtml +
      "</div></details></div>"
    );
  }

  root.SummaryReport = { render: render };
})(typeof globalThis !== "undefined" ? globalThis : window);
