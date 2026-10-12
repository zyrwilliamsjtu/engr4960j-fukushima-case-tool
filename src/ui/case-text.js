/**
 * CASE_DATA 双语字段选择（只读展示层）。
 */
(function (root) {
  "use strict";
  var warned = Object.create(null);

  function warnOnce(key, detail) {
    if (warned[key]) return;
    warned[key] = true;
    console.warn("[FieldnotesCaseText] missing English field:", detail);
  }

  function pick(obj, zhKey, enKey, locale, idHint) {
    if (!obj) return "";
    if (locale === "en") {
      var en = obj[enKey];
      if (en != null && String(en).trim()) return en;
      warnOnce(idHint + "." + enKey, idHint + "." + enKey);
    }
    return obj[zhKey] != null ? obj[zhKey] : "";
  }

  function stripVerificationNote(note, locale) {
    if (!note) return "";
    if (locale === "en" && /核验|待核|待复核|⚠/.test(note) && !/[A-Za-z]{8,}/.test(note)) {
      return "";
    }
    return note;
  }

  root.FieldnotesCaseText = {
    fact: function (fact, locale) {
      return pick(fact, "text", "textEn", locale, fact && fact.id);
    },
    factNote: function (fact, locale) {
      var n = pick(fact, "note", "noteEn", locale, fact && fact.id);
      return stripVerificationNote(n, locale) || (locale === "en" ? "" : fact.note || "");
    },
    timelineEvent: function (row, locale) {
      return pick(row, "event", "eventEn", locale, row && row.id);
    },
    assessmentText: function (row, locale) {
      return pick(row, "text", "textEn", locale, row && row.id);
    },
    principleDesc: function (p, locale) {
      return pick(p, "desc", "descEn", locale, p && p.id);
    },
    valueWord: function (w, locale) {
      return pick(w, "word", "wordEn", locale, w && w.id);
    },
    valueWhy: function (w, locale) {
      return pick(w, "whyVague", "whyVagueEn", locale, w && w.id);
    },
    constraintLabel: function (c, locale) {
      return pick(c, "label", "labelEn", locale, c && c.id);
    },
    constraintDesc: function (c, locale) {
      return pick(c, "desc", "descEn", locale, c && c.id);
    },
    biasLabel: function (b, locale) {
      return pick(b, "label", "labelEn", locale, b && b.id);
    },
    reviewLabel: function (r, locale) {
      return pick(r, "label", "labelEn", locale, r && r.id);
    },
    stepName: function (step, locale) {
      return pick(step, "name", "nameEn", locale, "step" + (step && step.id));
    },
    stepIntro: function (step, locale) {
      return pick(step, "intro", "introEn", locale, "step" + (step && step.id));
    },
    promptText: function (prompt, locale, stepId, index) {
      return pick(prompt, "text", "textEn", locale, "step" + stepId + ".prompt" + index);
    },
    fieldLabel: function (field, locale, stepId, index) {
      return pick(field, "label", "labelEn", locale, "step" + stepId + ".field" + index);
    },
    fieldHint: function (field, locale, stepId, index) {
      return pick(field, "hint", "hintEn", locale, "step" + stepId + ".field" + index);
    },
    sourceTitle: function (source, locale) {
      return pick(source, "title", "titleEn", locale, source && source.id);
    },
    sourceNote: function (source, locale) {
      if (locale === "en") {
        var en = source && source.noteEn;
        if (en != null && String(en).trim()) return en;
        if (source && source.note && /[\u4e00-\u9fff]/.test(source.note)) return "";
      }
      return (source && source.note) || "";
    },
    metaTitle: function (meta, locale) {
      return pick(meta, "title", "titleEn", locale, "meta.title");
    },
    referenceBody: function (ref, locale, stepId) {
      if (!ref) return "";
      return pick(ref, "body", "bodyEn", locale, "step" + stepId + ".referenceLevel3");
    }
  };
})(typeof globalThis !== "undefined" ? globalThis : window);
