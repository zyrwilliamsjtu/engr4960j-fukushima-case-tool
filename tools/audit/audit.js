/**
 * 产品审查（仅注入 dist/_audit.html，不进入交付物）。
 * 结果写入 #audit-json，标题以 AUDIT_DONE 开头。
 */
(function () {
  "use strict";

  var checks = [];
  var frictions = [];
  var steps = [];
  var ops = [];
  var errors = [];
  var keywords = [];

  window.addEventListener("error", function (event) {
    errors.push(String(event.message || event.error || "error"));
  });

  function check(id, ok, detail) {
    checks.push({ id: id, status: ok ? "pass" : "fail", detail: detail || "" });
  }

  function friction(persona, severity, title, evidence) {
    frictions.push({ persona: persona, severity: severity, title: title, evidence: evidence });
  }

  function op(step, action) {
    ops.push({ step: step, action: action });
  }

  function $(sel) {
    return document.querySelector(sel);
  }

  function click(sel) {
    var el = typeof sel === "string" ? $(sel) : sel;
    if (!el) return false;
    el.click();
    return true;
  }

  function px(el) {
    if (!el) return 0;
    return parseFloat(getComputedStyle(el).fontSize) || 0;
  }

  function textOf(el) {
    return el ? (el.textContent || "").replace(/\s+/g, " ").trim() : "";
  }

  function stepSummary(n) {
    click("#nav-step-" + n);
    op(n, "navigate");
    var hero = $(".step-hero h1");
    var intro = $(".step-hero p");
    var hint = $("#step-hint-panel");
    var buttons = Array.prototype.map.call(document.querySelectorAll("#workspace .button, #workspace .empty-state .button"), function (b) {
      return textOf(b);
    }).filter(Boolean).slice(0, 8);
    var inputs = document.querySelectorAll("#workspace textarea, #workspace input:not([type=hidden])").length;
    var summary = {
      step: n,
      title: textOf(hero),
      intro: textOf(intro).slice(0, 180),
      hintHidden: !hint || hint.hasAttribute("hidden"),
      buttons: buttons,
      inputs: inputs,
      hasEntryOrEmpty: !!$("#workspace .entries")
    };
    steps.push(summary);
    return summary;
  }

  function scanKeywords() {
    var hard = /参考答案|正确答案|建议结论|自动生成|一键生成/;
    var soft = /结论|答案|建议/;
    var blobs = [];
    if (window.FieldnotesI18n && window.FieldnotesI18n.pairs) {
      Object.keys(window.FieldnotesI18n.pairs).forEach(function (key) {
        var pair = window.FieldnotesI18n.pairs[key];
        blobs.push({ where: "i18n." + key, text: pair[0] + " | " + pair[1] });
      });
    }
    blobs.push({ where: "body", text: document.body.innerText || "" });
    blobs.forEach(function (blob) {
      var parts = blob.text.split(/\n|·|\|/);
      parts.forEach(function (line) {
        var bit = line.trim();
        if (!bit) return;
        if (hard.test(bit) || soft.test(bit)) {
          keywords.push({
            where: blob.where,
            hard: hard.test(bit),
            text: bit.slice(0, 180)
          });
        }
      });
    });
  }

  function viewportMetrics() {
    var hero = $(".step-hero h1");
    var name = $(".step-name");
    var field = $("#workspace textarea, #workspace input[type=text], body");
    var primary = $(".step-footer .button.primary");
    var next = document.querySelector('[data-action="navigate"].primary, #workspace .step-footer .button.primary');
    var shell = $(".app-shell");
    var overlap = false;
    if (shell && next) {
      var a = shell.getBoundingClientRect();
      var b = next.getBoundingClientRect();
      overlap = b.width > 0 && b.bottom > window.innerHeight + 2 && b.top > window.innerHeight;
    }
    return {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      scrollWidth: document.documentElement.scrollWidth,
      overflowX: document.documentElement.scrollWidth > window.innerWidth + 2,
      fonts: {
        hero: px(hero),
        stepName: px(name),
        field: px(field),
        primary: px(primary),
        body: px(document.body)
      },
      nextBelowFold: !!(next && next.getBoundingClientRect().top > window.innerHeight),
      overlapNote: overlap
    };
  }

  function runStorageFail() {
    var status = textOf($(".save-status"));
    var before = errors.length;
    var added = false;
    try {
      if (click('[data-action="add"][data-type="Q"]')) {
        var area = $("#workspace textarea");
        if (area) {
          area.value = "存储失败时仍能写问题吗？";
          area.dispatchEvent(new Event("input", { bubbles: true }));
          added = area.value.indexOf("存储失败") >= 0;
        }
      }
    } catch (err) {
      errors.push(String(err));
    }
    check(
      "D6-3",
      errors.length === before && added && /自动保存不可用|Autosave unavailable/.test(status),
      "status=" + status + " editable=" + added + " newErrors=" + (errors.length - before)
    );
    finish({ role: "storage", viewport: viewportMetrics() });
  }

  function finish(extra) {
    var passN = checks.filter(function (c) { return c.status === "pass"; }).length;
    var failN = checks.filter(function (c) { return c.status === "fail"; }).length;
    var skipN = checks.filter(function (c) { return c.status === "skip"; }).length;
    var report = {
      role: extra.role,
      viewport: extra.viewport,
      checks: checks,
      frictions: frictions,
      steps: steps,
      ops: ops,
      keywords: keywords,
      errors: errors,
      pass: passN,
      fail: failN,
      skip: skipN
    };
    var pre = document.createElement("pre");
    pre.id = "audit-json";
    pre.textContent = JSON.stringify(report);
    document.body.appendChild(pre);
    document.title = "AUDIT_DONE PASS=" + passN + " FAIL=" + failN + " SKIP=" + skipN;
  }

  function runMain() {
    var engine = window.FIELDNOTES && window.FIELDNOTES.getEngine();
    check("D3-boot", !!engine && !!document.getElementById("app"), engine ? "engine mounted" : "no engine");
    if (!engine) {
      finish({ role: "main", viewport: viewportMetrics() });
      return;
    }
    try { localStorage.clear(); } catch (err) { errors.push(String(err)); }
    engine.dispatch({ type: "RESET", payload: {} });

    var emptyErrors = errors.slice();
    check("D6-1-boot", document.querySelector("#workspace") && !/Uncaught/.test(emptyErrors.join(" ")), "workspace after reset");

    var i;
    for (i = 1; i <= 10; i++) {
      var summary = stepSummary(i);
      check(
        "D2-step-" + i,
        !!summary.title && summary.hasEntryOrEmpty && (summary.inputs > 0 || summary.buttons.length > 0),
        summary.title + " | inputs=" + summary.inputs + " buttons=" + summary.buttons.join(",")
      );
    }
    click("#nav-step-1");

    var s1 = steps[0];
    check("D3-1", /问题|question/i.test((s1.buttons || []).join(" ") + s1.intro), "intro=" + s1.intro + " buttons=" + (s1.buttons || []).join("|"));
    check("D3-2", steps.filter(function (s) { return s.step <= 5 && s.intro && s.intro.length > 12; }).length === 5, "hintHidden=" + steps.filter(function (s) { return s.step <= 5 && s.hintHidden; }).map(function (s) { return s.step; }).join(","));
    if (s1.hintHidden) {
      friction("P1", "yellow", "填写示例默认收起", "step-hint-panel hidden on steps " + steps.filter(function (s) { return s.hintHidden; }).map(function (s) { return s.step; }).join(","));
    }
    if (!/课堂|IN CLASS|present/i.test(document.body.innerText)) {
      friction("P2", "yellow", "前 5 步没有可见的课堂标记", "body text has no 课堂展示; presentInClass is data-only");
    }
    check("D4-1", /课堂展示|IN CLASS/.test(document.body.innerText), document.body.innerText.indexOf("课堂") >= 0 ? "found" : "absent");
    check("D4-2", !!document.querySelector('[data-action="present"], [data-testid="present"]') || /返回编辑/.test(document.body.innerText), "presentation control search");
    if (!document.querySelector('[data-action="present"]')) {
      friction("P2", "red", "演示模式没有入口", "i18n has present/exitPresent; no data-action=present in DOM; presentation stays null");
    }

    var distinct = {};
    steps.forEach(function (s) { distinct[s.buttons.join("|") + "|" + s.inputs] = true; });
    check("D2-variety", Object.keys(distinct).length >= 6, "distinct control signatures=" + Object.keys(distinct).length);

    scanKeywords();
    var hardHits = keywords.filter(function (k) { return k.hard; });
    check("D1-1", hardHits.length === 0, "hard=" + hardHits.length + " soft=" + keywords.filter(function (k) { return !k.hard; }).length);

    var step8 = window.CASE_DATA && window.CASE_DATA.steps && window.CASE_DATA.steps[7];
    check("D1-3", !!(step8 && step8.referenceLevel3 == null), "referenceLevel3=" + (step8 ? String(step8.referenceLevel3) : "missing"));
    click("#nav-step-8");
    op(8, "open-help");
    click('[data-testid="toolbar-help"]');
    var refBtn = document.querySelector('[data-action="reference"]');
    check("D1-3b", !refBtn || refBtn.disabled || refBtn.hasAttribute("disabled"), refBtn ? "disabled=" + refBtn.disabled : "no reference button");
    if (document.querySelector("dialog[open], #modal[open]")) {
      var closeBtn = document.querySelector('#modal [data-action="close"]');
      if (closeBtn) closeBtn.click();
    }

    click("#nav-step-1");
    var addOk = click('[data-action="add"][data-type="Q"]');
    op(1, "add-question");
    var qField = $("#workspace textarea[data-field='text']");
    if (qField) {
      qField.value = "运营商是否向公众及时说明了风险？";
      qField.dispatchEvent(new Event("input", { bubbles: true }));
      op(1, "type-question");
    }
    check("D2-2", !!(qField && /问句|[?？]/.test(qField.getAttribute("placeholder") || "") && qField.value.indexOf("运营商") >= 0), qField ? (qField.getAttribute("placeholder") + " | " + qField.value) : "no field");

    click("#nav-step-2");
    op(2, "navigate");
    var core = $("#workspace input[data-field='isCore']");
    if (core && !core.checked) {
      core.checked = true;
      core.dispatchEvent(new Event("change", { bubbles: true }));
      op(2, "check-core");
    }
    var reason = $("#workspace textarea[data-field='focusReason']");
    if (reason) {
      reason.value = "它同时影响公众知情与组织披露。";
      reason.dispatchEvent(new Event("input", { bubbles: true }));
      op(2, "type-reason");
    }
    var cores = window.FIELDNOTES.getEngine().getState().items;
    var autoCore = Object.keys(cores).some(function (id) { return cores[id].type === "Q" && cores[id].isCore && id !== (core && core.dataset.item); });
    check("D2-4", !!core && reason && reason.value.length > 0, "coreChecked=" + !!(core && core.checked));
    if (autoCore) check("D2-4b", false, "another item was core before user choice");

    click("#nav-step-3");
    op(3, "navigate");
    var openedLib = click('[data-action="materials"]');
    op(3, "open-library");
    var target = $("#library-target");
    var why = $("#library-why");
    if (target && target.options.length > 1) {
      target.selectedIndex = 1;
      target.dispatchEvent(new Event("change", { bubbles: true }));
      op(3, "choose-question");
      why = $("#library-why");
      if (why) {
        why.value = "这条事实说明组织在事故后的信息公开时间。";
        why.dispatchEvent(new Event("input", { bubbles: true }));
        op(3, "type-why");
      }
      var form = $("#library-link-form");
      if (form) {
        form.requestSubmit();
        op(3, "save-link");
      }
    }
    var back = document.querySelector('[data-lib="return"]');
    if (back) back.click();
    op(3, "return");
    click("#nav-step-3");
    var relationVisible = /信息公开时间|为什么相关/.test(document.body.innerText) && !!$(".relation");
    check("D5-1", openedLib && relationVisible, "library=" + openedLib + " relation=" + !!$(".relation") + " textHit=" + /信息公开时间/.test($("#workspace") ? $("#workspace").innerText : ""));
    if (!relationVisible) {
      friction("P1", "yellow", "关联后主工作区不一定能看到理由", "after library save, .relation=" + !!$(".relation"));
    }
    var overview = /推理总览/.test(document.body.innerText);
    check("D5-2", overview && relationVisible, overview ? "overview text present" : "no 推理总览 control in the workbook");
    if (!overview) {
      friction("P1", "yellow", "没有推理总览入口", "i18n.overview exists; workbook DOM does not render it");
    }

    var state = window.FIELDNOTES.getEngine().getState();
    window.FIELDNOTES.getEngine().createSnapshot("初步");
    op(1, "snapshot-initial");
    var qid = Object.keys(state.items).filter(function (id) { return state.items[id].type === "Q"; })[0];
    if (qid) {
      window.FIELDNOTES.getEngine().dispatch({ type: "UPDATE_ITEM", payload: { id: qid, fields: { text: "运营商是否向公众及时、完整地说明了风险？" } } });
      op(1, "edit-question");
    }
    window.FIELDNOTES.getEngine().createSnapshot("复核后");
    op(1, "snapshot-reviewed");
    click('[data-testid="revision-compare-open"]');
    op(1, "open-compare");
    var diffItems = document.querySelectorAll(".revision-diff-list li").length;
    var summaryOnly = !!$('[data-testid="revision-summary"]');
    check("D5-3", diffItems > 0 && summaryOnly, "diffItems=" + diffItems + " summary=" + summaryOnly);
    if (diffItems === 0) friction("P2", "yellow", "对比面板没有条目级差异", "revision-diff-list li count 0");
    var close = document.querySelector('#modal [data-action="close"]');
    if (close) close.click();

    click("#nav-step-1");
    click('[data-action="add"][data-type="Q"]');
    op(1, "add-nonquestion");
    var areas = document.querySelectorAll("#workspace textarea[data-field='text']");
    var bad = areas[areas.length - 1];
    if (bad) {
      bad.value = "这不是问句";
      bad.dispatchEvent(new Event("input", { bubbles: true }));
      op(1, "type-nonquestion");
    }
    click('[data-testid="toolbar-help"]');
    op(1, "open-help");
    var helpText = textOf($("#modal-content"));
    var next = document.querySelector('#workspace .step-footer [data-action="navigate"][data-step="2"]');
    check("D5-4", /问句/.test(helpText) && next && !next.disabled, "helpHas问句=" + /问句/.test(helpText) + " nextDisabled=" + !!(next && next.disabled));
    if (!/问句|待回看/.test(textOf($("#workspace")))) {
      friction("P1", "yellow", "形式校验不在步骤正文里", "提醒只出现在帮助弹窗，workspace 不含「问句/待回看」");
    }
    if (close) {
      close = document.querySelector('#modal [data-action="close"]');
      if (close) close.click();
    }
    check("D4-4", !!(next && !next.disabled), "next enabled while form incomplete");

    click("#nav-step-4");
    op(4, "navigate-to-fill");
    if (click('[data-action="add"][data-type="A"]')) op(4, "add-assumption");
    var assumption = $("#workspace textarea[data-field='text']");
    if (assumption) {
      assumption.value = "公开渠道当时可能还没有完整的堆芯状态数据。";
      assumption.dispatchEvent(new Event("input", { bubbles: true }));
      op(4, "type-assumption");
    }
    click("#nav-step-5");
    op(5, "navigate-to-fill");
    var chip = document.querySelector(".word-chip");
    if (chip) {
      chip.click();
      op(5, "pick-term");
    }
    var others = $("#workspace textarea[data-field='others']");
    var mine = $("#workspace textarea[data-field='mine']");
    if (others) {
      others.value = "有人会把它理解成没有人员伤亡。";
      others.dispatchEvent(new Event("input", { bubbles: true }));
      op(5, "type-others");
    }
    if (mine) {
      mine.value = "本组这里指对周围居民的健康风险。";
      mine.dispatchEvent(new Event("input", { bubbles: true }));
      op(5, "type-mine");
    }

    var md = window.FIELDNOTES.exportMarkdown();
    var sections = (md.match(/^## \d+\. /gm) || []).length;
    check("D1-5", md.indexOf("禁止 AI 代笔") >= 0 && md.indexOf("运营商是否") >= 0, "len=" + md.length);
    check("D5-5", sections === 10 && md.indexOf("禁止 AI 代笔") >= 0 && md.indexOf("运营商是否") >= 0, "sections=" + sections);

    var cases = window.FIELDNOTES.getCases();
    var exported = cases.exportProject();
    var parsed = JSON.parse(exported);
    var beforeItems = Object.keys(parsed.items || {}).length;
    var beforeRels = (parsed.relations || []).length;
    var beforeSnaps = (parsed.snapshots || []).length;
    var imported = window.FIELDNOTES.importProjectJson(exported);
    var after = window.FIELDNOTES.getEngine().getState();
    check(
      "D5-6",
      imported && imported.ok && Object.keys(after.items).length === beforeItems && after.relations.length === beforeRels && (after.snapshots || []).length === beforeSnaps,
      "importOk=" + !!(imported && imported.ok) + " items " + beforeItems + "->" + Object.keys(after.items || {}).length
    );

    var snap = JSON.stringify(window.FIELDNOTES.getEngine().getState());
    var badImport = window.FIELDNOTES.importProjectJson('{"stateVersion":"9.9","caseId":"nope"}');
    check("D6-2", badImport && badImport.ok === false && JSON.stringify(window.FIELDNOTES.getEngine().getState()) === snap, "badImport=" + JSON.stringify(badImport && (badImport.code || badImport.ok)));

    click("#nav-step-4");
    check("D2-6", !!$("#workspace") && /假设|assumption/i.test(document.body.innerText), textOf($(".step-hero h1")));
    click("#nav-step-5");
    check("D2-7", document.querySelectorAll(".word-chip").length > 0, "chips=" + document.querySelectorAll(".word-chip").length);
    click("#nav-step-9");
    check("D2-11", /不代表已经减轻责任/.test(document.body.innerText), "constraint notice");
    click("#nav-step-10");
    var preset = Object.keys(window.FIELDNOTES.getEngine().getState().items).some(function (id) {
      var it = window.FIELDNOTES.getEngine().getState().items[id];
      return it.type === "AV" && it.text;
    });
    check("D2-12", !preset, "preset prevention=" + preset);

    var note = "";
    if (window.FieldnotesI18n && window.FieldnotesI18n.pairs.countNote) note = window.FieldnotesI18n.pairs.countNote[0];
    check("D2-3", /附录 II/.test(note) && /5/.test(note) && /3/.test(note), note.slice(0, 120));

    click("#nav-step-1");
    var metrics = viewportMetrics();
    check("D7-1", !metrics.overflowX, "scrollWidth=" + metrics.scrollWidth + " inner=" + metrics.innerWidth);
    check("D7-2-hero", metrics.fonts.hero >= 20, "hero=" + metrics.fonts.hero);
    check("D7-2-field", metrics.fonts.field >= 14, "field=" + metrics.fonts.field);
    check("D7-2-nav", metrics.fonts.stepName >= 13, "stepName=" + metrics.fonts.stepName);
    check("D7-2-body", metrics.fonts.body >= 14, "body=" + metrics.fonts.body);
    check("D7-2-primary", metrics.fonts.primary >= 14, "footerPrimary=" + metrics.fonts.primary);
    if (metrics.fonts.hero < 20 || metrics.fonts.field < 14 || metrics.fonts.stepName < 13) {
      friction("P2", "yellow", "实测字号低于投影阈值", JSON.stringify(metrics.fonts));
    }
    if (metrics.nextBelowFold) {
      friction("P2", "yellow", "下一步在首屏之下", "next.top > innerHeight " + metrics.innerHeight);
    }

    var counts = {};
    ops.forEach(function (item) { counts[item.step] = (counts[item.step] || 0) + 1; });
    [1, 2, 3, 4, 5].forEach(function (n) {
      if ((counts[n] || 0) > 12) friction("P2", "yellow", "第 " + n + " 步交互次数偏高", "ops=" + counts[n]);
    });
    friction("P3", "blue", "结论类词语出现在用户槽位标签和形式提醒里", "soft hits=" + keywords.filter(function (k) { return !k.hard; }).length + "; hard hits=" + hardHits.length);
    friction("P1", "blue", "首屏主行动是添加问题，但品牌名 fieldnotes 先于课程任务", "hero=" + (steps[0] && steps[0].title));

    if (errors.length) check("D6-console", false, errors.join(" | "));
    else check("D6-console", true, "no window.error");

    finish({ role: "main", viewport: metrics, opCounts: counts });
  }

  try {
    if (location.hash === "#storage-fail" || /_audit-storage\.html/.test(location.pathname)) runStorageFail();
    else runMain();
  } catch (err) {
    errors.push(String(err && err.stack || err));
    check("audit-crash", false, String(err));
    var storageMode = location.hash === "#storage-fail" || /_audit-storage\.html/.test(location.pathname);
    finish({ role: storageMode ? "storage" : "main", viewport: { innerWidth: window.innerWidth, innerHeight: window.innerHeight } });
  }
})();
