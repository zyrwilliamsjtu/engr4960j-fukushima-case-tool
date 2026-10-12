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
      if (found) entry(6, ctx.principleName ? ctx.principleName(found) : found.name, "reference", it.id);
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
    function bi(zh,en){return ctx.locale==='en'?en:zh;}
    function edit(step,label,id){return '<a class="summary-edit" href="#" data-action="navigate" data-step="'+step+'" '+(id?'data-id="'+esc(id)+'"':'')+'>'+esc(label)+' ↗</a>';}
    function principleTitle(p){var row=(data.principles||[]).find(function(x){return x.id===p.principleId;});return row?(ctx.principleName?ctx.principleName(row):row.name):(p.text||p.id);}
    var cards=questions.map(function(q,index){
      var facts=factRels.filter(function(r){return r.to===q.id;});
      function factLine(rel){var f=(data.facts||[]).find(function(x){return x.id===rel.from;});return '<li class="summary-evidence"><p>'+esc(f?(ctx.factText?ctx.factText(f):f.text):rel.from)+'</p><div class="summary-relevance"><span>'+esc(bi('关联理由','Relevance'))+'</span><p>'+esc(rel.why||'—')+'</p></div>'+(f&&ctx.sourceName?'<small>'+esc(ctx.sourceName(f.sourceId))+'</small>':'')+'</li>';}
      var selected=principles.filter(function(p){return (p.appliesTo||[]).includes(q.id);});
      var conflicts=(state.conflicts||[]).filter(function(c){return c.questionId===q.id;});
      return '<details class="summary-arg" data-testid="summary-argument" '+(index===0?'open':'')+'><summary><span class="summary-question-index">'+String(index+1).padStart(2,'0')+'</span><div><span class="summary-eyebrow">'+esc(q.isCore?bi('核心问题','Core question'):bi('分析问题','Question'))+'</span><h3>'+esc(q.text||'')+'</h3><small>'+facts.length+' '+esc(bi('条依据','evidence links'))+' · '+selected.length+' '+esc(bi('项关联原则','linked principles'))+'</small></div><span class="summary-chevron">＋</span></summary><div class="summary-argument-body"><section><div class="summary-section-head"><h4>'+esc(t('summaryFacts'))+'</h4>'+edit(3,bi('补充依据','Edit evidence'))+'</div><ol class="summary-evidence-list">'+(facts.length?facts.slice(0,2).map(factLine).join(''):'<li class="summary-empty">'+esc(t('summaryNoFact'))+'</li>')+'</ol>'+(facts.length>2?'<details class="summary-more"><summary>'+esc(t('summaryMoreFacts'))+' · '+(facts.length-2)+'</summary><ol class="summary-evidence-list">'+facts.slice(2).map(factLine).join('')+'</ol></details>':'')+'</section><section class="summary-principle-block"><div class="summary-section-head"><h4>'+esc(t('summaryPrinciples'))+'</h4>'+edit(6,bi('查看取舍','Edit tradeoffs'))+'</div>'+ (selected.length?selected.map(function(p){return '<div class="summary-principle"><strong>'+esc(principleTitle(p))+'</strong><p>'+esc(p.text||bi('尚未填写适用理由','No applicability reason yet'))+'</p></div>';}).join(''):'<p class="summary-empty">'+esc(bi('尚未明确关联到此问题的原则。','No principles explicitly linked to this question yet.'))+'</p>')+conflicts.map(function(c){return '<div class="summary-conflict"><span>'+esc(bi('原则取舍','Tradeoff'))+'</span><p>'+esc(c.reason||c.priority||bi('待填写理由','Reason still needed'))+'</p></div>';}).join('')+'</section></div></details>';
    }).join('')||'<div class="summary-empty-card"><h3>'+esc(t('summaryNeedQuestions'))+'</h3>'+edit(1,bi('提出第一个问题','Write your first question'))+'</div>';
    var conclusions=resolutions.length?resolutions.map(function(r){var rels=(state.relations||[]).filter(function(link){return link.kind==='resolution-answers-question'&&link.from===r.id;});var labels=rels.map(function(link){return state.items[link.to];}).filter(Boolean).map(function(q){return q.text;});return '<article class="summary-resolution"><span class="summary-resolution-question">'+esc(labels.length?labels.join(' / '):bi('全案判断 · 未关联到单一问题','Case-wide · no single question linked'))+'</span><p>'+esc(r.text||'—')+'</p>'+(r.reason?'<div><span>'+esc(bi('理由','Reason'))+'</span><p>'+esc(r.reason)+'</p></div>':'')+edit(8,bi('修改判断','Edit judgment'),r.id)+'</article>';}).join(''):'<div class="summary-empty"><p>'+esc(t('summaryNeedResolution'))+'</p>'+edit(8,bi('形成自己的判断','Write your judgment'))+'</div>';
    var assumptionsHtml=assumptions.map(function(a){return '<li><p>'+esc(a.text||'')+'</p>'+(a.basisRefs&&a.basisRefs.length?'<small>'+a.basisRefs.length+' '+esc(bi('项依据','references'))+'</small>':'')+'</li>';}).join('');
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

    var caseTitle=ctx.caseTitle||data.meta.title;
    return '<div class="summary-report summary-brief" data-readonly="true"><header class="summary-header"><span class="summary-eyebrow">'+esc(bi('分析手记 / SYNTHESIS','YOUR ANALYSIS / SYNTHESIS'))+'</span><h1>'+esc(t('summaryReport'))+'</h1><p class="summary-case-title">'+esc(caseTitle)+'</p><div class="summary-metrics" data-testid="summary-completeness">'+[[questions.length,bi('问题','Questions')],[factRels.length,bi('依据','Evidence links')],[principles.length,bi('原则','Principles')],[gaps.length,bi('待补充步骤','Steps with gaps')]].map(function(m){return '<div><strong>'+m[0]+'</strong><span>'+esc(m[1])+'</span></div>';}).join('')+'</div></header><div class="summary-reading-grid"><div class="summary-main-column"><div class="summary-section-head"><h2>'+esc(bi('问题与论证','Questions & reasoning'))+'</h2><small>'+esc(bi('只呈现已记录的关联','Showing your recorded links'))+'</small></div>'+cards+'<details class="summary-context"><summary>'+esc(bi('全案假设与原则清单','Case-wide assumptions & principles'))+'</summary><h4>'+esc(t('summaryAssumptions'))+'</h4><ul>'+ (assumptionsHtml||'<li>'+esc(t('summaryNeedAssumptions'))+'</li>')+'</ul><h4>'+esc(t('summaryPrinciples'))+'</h4><ul>'+principles.map(function(p){return '<li><strong>'+esc(principleTitle(p))+'</strong><p>'+esc(p.text||'—')+'</p></li>';}).join('')+'</ul></details></div><aside class="summary-side-column"><section class="summary-conclusion-panel"><span class="summary-eyebrow">'+esc(bi('本组判断','YOUR JUDGMENT'))+'</span><h2>'+esc(t('summaryYourConclusion'))+'</h2><p class="summary-scope-note">'+esc(bi('按你记录的问题关联展示，未关联的保留为全案判断。','Question links follow your records. Unlinked judgments stay case-wide.'))+'</p>'+conclusions+'</section><section class="summary-handoff"><h3>'+esc(bi('带走你的分析','Take your analysis with you'))+'</h3><div class="summary-export-row">'+ctx.exportButtons+'</div><p>'+esc(t('summaryReplayNote'))+'</p></section></aside></div>'+ (gaps.length?'<details class="summary-gap-panel"><summary><span>'+esc(bi('下一轮可以补充什么','What to revisit next'))+'</span><b>'+gaps.length+'</b></summary><ul class="summary-gap-list">'+gapList+'</ul></details>':'')+'<details class="summary-full-replay"><summary><span>'+esc(t('summaryReplay'))+'</span><small>10 '+esc(bi('个步骤','steps'))+'</small></summary>'+htmlSections+'<div class="summary-overview">'+overviewHtml+'</div></details><p class="summary-redline">'+esc(t('summaryRedline'))+'</p></div>';

  }

  root.SummaryReport = { render: render };
})(typeof globalThis !== "undefined" ? globalThis : window);
