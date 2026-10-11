/**
 * validateStep — 只读校验，不修改状态
 */
(function (root) {
  root.AppLogic = root.AppLogic || {};

  function getCaseData() {
    var g = typeof window !== "undefined" ? window : root;
    return g.CASE_DATA || {};
  }

  function questionLike(text) {
    if (!text || typeof text !== "string") return false;
    var t = text.trim();
    if (/[?？]$/.test(t)) return true;
    if (/是否|应该|该不该|能否|可否/.test(t)) return true;
    if (/\b(should|ought to)\b/i.test(t)) return true;
    return false;
  }

  var checkRegistry = {
    minItems: function (ctx, check) {
      var min = ctx.fieldMin != null ? ctx.fieldMin : 1;
      var count = ctx.itemCount != null ? ctx.itemCount : 0;
      if (count >= min) return null;
      return {
        level: check.level || "suggest",
        message: "建议至少 " + min + " 条（当前 " + count + " 条）",
        fieldKey: ctx.fieldKey,
        itemIds: ctx.itemIds
      };
    },
    atLeastN: function (ctx, check) {
      return checkRegistry.minItems(ctx, check);
    },
    mustBeQuestion: function (ctx) {
      var bad = [];
      var ids = ctx.itemIds || [];
      var items = ctx.items || {};
      var i;
      for (i = 0; i < ids.length; i++) {
        var it = items[ids[i]];
        if (!it || !it.text) continue;
        if (!questionLike(it.text)) bad.push(ids[i]);
      }
      if (!bad.length) return null;
      return {
        level: "suggest",
        message: "部分条目看起来不是问句形式（教材建议写成问句）",
        fieldKey: ctx.fieldKey,
        itemIds: bad
      };
    },
    requireBasis: function (ctx) {
      var missing = [];
      var ids = ctx.itemIds || [];
      var items = ctx.items || {};
      var i;
      for (i = 0; i < ids.length; i++) {
        var it = items[ids[i]];
        if (!it || it.type !== "A") continue;
        if (!it.basisRefs || !it.basisRefs.length) missing.push(ids[i]);
      }
      if (!missing.length) return null;
      return {
        level: "suggest",
        message: "这条假设还没有记录依据",
        fieldKey: ctx.fieldKey,
        itemIds: missing
      };
    },
    requireWhy: function (ctx) {
      var missing = [];
      var rels = ctx.relations || [];
      var i;
      for (i = 0; i < rels.length; i++) {
        if (!rels[i].why || !String(rels[i].why).trim()) {
          missing.push(rels[i].id);
        }
      }
      if (!missing.length) return null;
      return {
        level: "suggest",
        message: "关联须填写「为什么相关」",
        fieldKey: "relations",
        relationIds: missing
      };
    },
    requireConclusionAndReason: function (ctx) {
      var issues = [];
      var ids = ctx.itemIds || [];
      var items = ctx.items || {};
      var i;
      for (i = 0; i < ids.length; i++) {
        var it = items[ids[i]];
        if (!it) continue;
        if (!it.conclusion || !String(it.conclusion).trim()) issues.push(ids[i]);
        else if (!it.reason || !String(it.reason).trim()) issues.push(ids[i]);
      }
      if (!issues.length) return null;
      return {
        level: "suggest",
        message: "每条核心问题须有结论与理由",
        fieldKey: ctx.fieldKey,
        itemIds: issues
      };
    }
  };

  function buildStepContext(state, stepDef) {
    var stepId = stepDef.id;
    var items = state.items || {};
    var ids = [];
    var key;
    for (key in items) {
      if (!Object.prototype.hasOwnProperty.call(items, key)) continue;
      if (items[key].step === stepId) ids.push(key);
    }
    var fieldMin = null;
    var fieldKey = null;
    var fields = stepDef.fields || [];
    var fi;
    for (fi = 0; fi < fields.length; fi++) {
      if (fields[fi].min != null) {
        fieldMin = fields[fi].min;
        fieldKey = fields[fi].key;
        break;
      }
    }
    return {
      stepId: stepId,
      fieldKey: fieldKey,
      fieldMin: fieldMin,
      itemCount: ids.length,
      itemIds: ids,
      items: items,
      relations: state.relations || []
    };
  }

  function toAnchor(result) {
    if (!result) return null;
    return {
      fieldKey: result.fieldKey,
      itemIds: result.itemIds,
      relationIds: result.relationIds,
      message: result.message
    };
  }

  function validateStep(stepId, state) {
    var errors = [];
    var suggestions = [];
    var anchors = [];
    var caseData = getCaseData();
    var steps = caseData.steps || [];
    var stepDef = null;
    var i;
    for (i = 0; i < steps.length; i++) {
      if (steps[i].id === stepId) {
        stepDef = steps[i];
        break;
      }
    }
    if (!stepDef) {
      return { errors: errors, suggestions: suggestions, anchors: anchors };
    }

    var ctx = buildStepContext(state, stepDef);
    var checks = stepDef.checks || [];
    for (i = 0; i < checks.length; i++) {
      var check = checks[i];
      var fn = checkRegistry[check.id];
      if (!fn) {
        anchors.push({
          fieldKey: null,
          message: "已跳过未注册的 check id: " + check.id
        });
        continue;
      }
      var out = fn(ctx, check);
      if (!out) continue;
      var level = check.level || out.level || "suggest";
      var entry = {
        checkId: check.id,
        level: level,
        message: out.message,
        anchors: [toAnchor(out)]
      };
      if (level === "error") errors.push(entry);
      else suggestions.push(entry);
      anchors.push(toAnchor(out));
    }

    if (stepId === 4) {
      ctx.itemIds = [];
      for (var k in state.items) {
        if (state.items[k].type === "A") ctx.itemIds.push(k);
      }
      var basisOut = checkRegistry.requireBasis(ctx, { level: "suggest" });
      if (basisOut) {
        suggestions.push({
          checkId: "requireBasis",
          level: "suggest",
          message: basisOut.message,
          anchors: [toAnchor(basisOut)]
        });
        anchors.push(toAnchor(basisOut));
      }
    }

    if (stepId === 3) {
      var whyOut = checkRegistry.requireWhy(
        { relations: state.relations, fieldKey: "relations" },
        {}
      );
      if (whyOut) {
        suggestions.push({
          checkId: "requireWhy",
          level: "suggest",
          message: whyOut.message,
          anchors: [toAnchor(whyOut)]
        });
        anchors.push(toAnchor(whyOut));
      }
    }

    return { errors: errors, suggestions: suggestions, anchors: anchors };
  }

  root.AppLogic.validateStep = validateStep;
  root.AppLogic._checkRegistry = checkRegistry;
})(typeof window !== "undefined" ? window : globalThis);
