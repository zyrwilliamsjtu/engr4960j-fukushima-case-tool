/* Case packs and workspace selection live outside the frozen v2 analysis state.
 * Each pack uses the existing CASE_DATA schema. No case judgments are generated.
 */
(function () {
  'use strict';
  var template = window.CASE_DATA;
  var catalogKey = 'fieldnotes.ui.case-catalog.v1';
  var clone = function (value) { return JSON.parse(JSON.stringify(value)); };
  var packs = {}, active = template.meta.id, catalogWritable = true, recovery = null;
  var arrays = ['sources', 'timeline', 'facts', 'principles', 'valueWords', 'constraints', 'biasChecks', 'reviewPrompts', 'steps'];
  packs[template.meta.id] = template;

  function validPack(pack) {
    try {
    if (!pack || !pack.meta || !/^[a-z0-9][a-z0-9-]{0,100}$/.test(pack.meta.id) ||
        typeof pack.meta.title !== 'string' || !pack.meta.title.trim() || !['2.0', '2.1'].includes(pack.meta.dataVersion) ||
        typeof pack.meta.builtAt !== 'string' || arrays.some(function (key) { return !Array.isArray(pack[key]); })) return false;
    if (pack.meta.dataVersion === '2.1' && !Array.isArray(pack.assessments)) return false;
    if (pack.assessments !== undefined && !Array.isArray(pack.assessments)) return false;
    var ids = new Set();
    if (arrays.concat(pack.assessments ? ['assessments'] : []).filter(function (key) { return key !== 'steps'; }).some(function (key) {
      return pack[key].some(function (entry) {
        if (!entry || typeof entry.id !== 'string' || ids.has(entry.id)) return true;
        ids.add(entry.id); return false;
      });
    })) return false;
    var sources = new Set(pack.sources.map(function (s) { return s.id; }));
    if (pack.timeline.concat(pack.facts, pack.assessments || []).some(function (entry) {
      return ['quote', 'locator', 'note'].some(function (key) { return entry[key] !== undefined && typeof entry[key] !== 'string'; }) ||
        (entry.confidence !== undefined && !['high', 'medium', 'low'].includes(entry.confidence));
    })) return false;
    if ((pack.assessments || []).some(function (entry) { return typeof entry.text !== 'string' || !sources.has(entry.sourceId) || !Array.isArray(entry.appliesToSteps) || entry.appliesToSteps.some(function (step) { return !Number.isInteger(step) || step < 1 || step > 10; }); })) return false;
    return pack.steps.length === 10 && pack.steps.every(function (step, i) { return step && step.id === i + 1; }) &&
      pack.sources.every(function (s) { return typeof s.title === 'string' && typeof s.publisher === 'string' && Number.isInteger(s.year); }) &&
      pack.facts.every(function (f) { return typeof f.text === 'string' && Array.isArray(f.categories) && f.categories.length && f.categories.every(function (c) { return ['material', 'individual', 'organization'].includes(c); }) && sources.has(f.sourceId); }) &&
      pack.principles.every(function (p) { return typeof p.name === 'string' && typeof p.nameEn === 'string' && typeof p.desc === 'string'; }) &&
      pack.valueWords.every(function (w) { return typeof w.word === 'string' && typeof w.whyVague === 'string'; }) &&
      pack.constraints.every(function (c) { return typeof c.label === 'string'; }) &&
      pack.biasChecks.concat(pack.reviewPrompts).every(function (p) { return typeof p.label === 'string' && Number.isInteger(p.jumpTo) && p.jumpTo >= 1 && p.jumpTo <= 10; });
    } catch (error) { return false; }
  }

  try {
    var raw = localStorage.getItem(catalogKey);
    if (raw) {
      var saved = JSON.parse(raw);
      if (saved.format !== 'fieldnotes-catalog-v1' || !Array.isArray(saved.cases) || saved.cases.some(function (pack) { return !validPack(pack); })) throw new Error('Invalid catalog');
      saved.cases.forEach(function (pack) { if (pack.meta.id !== template.meta.id) packs[pack.meta.id] = pack; });
      if (Object.prototype.hasOwnProperty.call(packs, saved.active)) active = saved.active;
    }
  } catch (error) { catalogWritable = false; recovery = raw || null; }

  function saveCatalog() {
    if (!catalogWritable) return false;
    try {
      localStorage.setItem(catalogKey, JSON.stringify({ format: 'fieldnotes-catalog-v1', active: active,
        cases: Object.values(packs).filter(function (pack) { return pack.meta.id !== template.meta.id; }) }));
      return true;
    } catch (error) { return false; }
  }
  function storageKey(id) {
    return id === template.meta.id ? 'engr4960j.frontend.preview.v2' : 'fieldnotes.ui.case.' + id + '.v2';
  }
  function createRuntime(pack, id, extraOptions) {
    var opts = { key: storageKey(id) };
    if (extraOptions) {
      for (var k in extraOptions) {
        if (Object.prototype.hasOwnProperty.call(extraOptions, k)) opts[k] = extraOptions[k];
      }
    }
    // The formal store currently accepts only the built-in case identifier.
    if (id === template.meta.id && window.AppLogicRuntime && window.AppLogicRuntime.available && window.AppLogicRuntime.available()) {
      var adapted = window.AppLogicRuntime.create(pack, opts);
      if (adapted) return adapted;
    }
    var compatible = window.FrontendPreviewRuntime.create(pack, opts);
    compatible.isPreview = true;
    return compatible;
  }
  var runtime = window.CASE_RUNTIME || createRuntime(packs[active], active);
  var metadataSaved = saveCatalog();

  function select(id) {
    if (!Object.prototype.hasOwnProperty.call(packs, id)) return false;
    if (runtime.flush) runtime.flush();
    active = id;
    runtime = createRuntime(packs[id], id);
    metadataSaved = saveCatalog();
    return true;
  }
  function create(title) {
    if (typeof title !== 'string' || !title.trim()) throw new Error('A case name is required');
    var pack = clone(template);
    var id = 'case-' + Date.now().toString(36);
    while (packs[id]) id += '-1';
    pack.meta = { id: id, title: title.trim(), dataVersion: template.meta.dataVersion, builtAt: new Date().toISOString().slice(0, 10) };
    pack.facts = []; pack.timeline = [];
    if (pack.assessments) pack.assessments = [];
    pack.sources = template.sources.filter(function (source) { return pack.principles.some(function (p) { return p.sourceId === source.id; }); });
    // Case-specific interpretive references must not leak into a new case.
    pack.steps.forEach(function (step) { step.referenceLevel3 = null; });
    packs[id] = pack;
    select(id);
    return id;
  }
  function addFact(text, categories, sourceTitle, year, url) {
    if (active === template.meta.id) return false;
    if (!text.trim() || !sourceTitle.trim() || !categories.length || categories.some(function (c) { return !['material', 'individual', 'organization'].includes(c); }) || !Number.isInteger(year)) return false;
    var pack = packs[active], suffix = Date.now().toString(36);
    var sourceId = 'src-user-' + suffix;
    while (pack.sources.some(function (source) { return source.id === sourceId; })) sourceId += '-1';
    pack.sources.push({ id: sourceId, title: sourceTitle.trim(), publisher: '', year: year, url: url || '', accessedAt: new Date().toISOString().slice(0, 10) });
    pack.facts.push({ id: 'f-' + { material: 'mat', individual: 'ind', organization: 'org' }[categories[0]] + '-user-' + sourceId.slice(9), text: text.trim(), categories: categories, sourceId: sourceId, note: '' });
    metadataSaved = saveCatalog();
    // Rebuild static-reference validation without changing the author's analysis.
    var savedState = runtime.getState();
    if (runtime.flush) runtime.flush();
    runtime = createRuntime(pack, active, { state: savedState });
    return true;
  }
  function staticRefIds(pack) {
    var ids = new Set();
    pack.facts.forEach(function (f) { ids.add(f.id); });
    pack.sources.forEach(function (s) { ids.add(s.id); });
    pack.principles.forEach(function (p) { ids.add(p.id); });
    return ids;
  }
  function validateAnalysisPayload(payload, pack) {
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      return { ok: false, code: 'structure', message: '存档结构无效：根对象缺失或类型错误。' };
    }
    if (payload.stateVersion !== '2.0') {
      return { ok: false, code: 'version', message: '版本不匹配：需要 stateVersion "2.0"。' };
    }
    if (payload.caseId !== pack.meta.id) {
      return { ok: false, code: 'caseId', message: '案例不匹配：存档 caseId 为「' + payload.caseId + '」，当前为「' + pack.meta.id + '」。' };
    }
    if (!payload.items || typeof payload.items !== 'object' || Array.isArray(payload.items)) {
      return { ok: false, code: 'structure', message: '存档结构无效：items 必须为对象。' };
    }
    if (!Array.isArray(payload.relations) || !Array.isArray(payload.conflicts) || !Array.isArray(payload.snapshots)) {
      return { ok: false, code: 'structure', message: '存档结构无效：relations / conflicts / snapshots 必须为数组。' };
    }
    if (!payload.stepStatus || typeof payload.stepStatus !== 'object' || Array.isArray(payload.stepStatus) || (payload.idSeq !== undefined && (!payload.idSeq || typeof payload.idSeq !== 'object' || Array.isArray(payload.idSeq)))) {
      return { ok: false, code: 'structure', message: '存档结构无效：stepStatus 或 idSeq 类型错误。' };
    }
    var ids = staticRefIds(pack);
    Object.keys(payload.items).forEach(function (id) { ids.add(id); });
    var ri;
    for (ri = 0; ri < payload.relations.length; ri++) {
      var rel = payload.relations[ri];
      if (!rel || !ids.has(rel.from) || !ids.has(rel.to)) {
        return { ok: false, code: 'integrity', message: '关联完整性失败：relation ' + (rel && rel.id ? rel.id : ri) + ' 引用不存在的 id。' };
      }
    }
    var ci;
    for (ci = 0; ci < payload.conflicts.length; ci++) {
      var cf = payload.conflicts[ci];
      if (!cf || !ids.has(cf.questionId) || !ids.has(cf.principleA) || !ids.has(cf.principleB)) {
        return { ok: false, code: 'integrity', message: '关联完整性失败：conflict ' + (cf && cf.id ? cf.id : ci) + ' 引用不存在的 id。' };
      }
    }
    return { ok: true };
  }
  function exportProject() {
    if (active === template.meta.id) return runtime.exportProject();
    return JSON.stringify({ format: 'fieldnotes-project-v1', caseData: packs[active], state: runtime.getState() }, null, 2);
  }
  function importProject(json) {
    var input;
    try { input = typeof json === 'string' ? JSON.parse(json) : clone(json); } catch (error) { return { ok: false, code: 'json', message: '无法解析 JSON。' }; }
    var bundled = input && input.format === 'fieldnotes-project-v1';
    var pack = bundled ? input.caseData : input && Object.prototype.hasOwnProperty.call(packs, input.caseId) ? packs[input.caseId] : null;
    var payload = bundled ? input.state : input;
    if (!pack || (bundled && (!validPack(pack) || pack.meta.id === template.meta.id))) {
      return { ok: false, code: 'pack', message: '无法识别案例包或不允许导入到内置福岛包。' };
    }
    var checked = validateAnalysisPayload(payload, pack);
    if (!checked.ok) return { ok: false, code: checked.code, message: checked.message };
    // 仅用于校验导入数据格式，不承载运行时状态，故保留 preview 实例。
    var candidate = window.FrontendPreviewRuntime.create(pack, { persistent: false });
    var result = candidate.importProject(payload);
    candidate.flush();
    if (!result.ok) {
      if (pack.meta.id !== template.meta.id || !(window.AppLogicRuntime && window.AppLogicRuntime.available())) {
        return { ok: false, code: 'preview', message: '预览运行时拒绝该存档（结构或字段不兼容）。' };
      }
      if (runtime.flush) runtime.flush();
      packs[pack.meta.id] = pack;
      active = pack.meta.id;
      runtime = createRuntime(pack, active, { state: payload });
      metadataSaved = saveCatalog();
      return { ok: true, compatMode: !!(runtime && runtime.isPreview) };
    }
    if (runtime.flush) runtime.flush();
    packs[pack.meta.id] = pack;
    active = pack.meta.id;
    runtime = createRuntime(pack, active, { state: result.state || payload });
    metadataSaved = saveCatalog();
    return { ok: true, compatMode: !!(runtime && runtime.isPreview) };
  }
  window.FieldnotesCases = {
    getData: function () { return packs[active]; }, getRuntime: function () { return runtime; },
    list: function () { return Object.values(packs).map(function (pack) { return { id: pack.meta.id, title: pack.meta.title }; }); },
    select: select, create: create, addFact: addFact, importProject: importProject, exportProject: exportProject,
    validateAnalysisPayload: validateAnalysisPayload,
    isCustom: function () { return active !== template.meta.id; },
    getSaveStatus: function () { return metadataSaved ? (runtime.getSaveStatus ? runtime.getSaveStatus() : 'unknown') : 'memory'; },
    mount: function (instance) { if (runtime.flush) runtime.flush(); runtime = instance; },
    recoveryData: function () { return recovery; }
  };
})();
