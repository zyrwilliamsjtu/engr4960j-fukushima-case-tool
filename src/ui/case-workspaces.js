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
        typeof pack.meta.title !== 'string' || !pack.meta.title.trim() || pack.meta.dataVersion !== '2.0' ||
        typeof pack.meta.builtAt !== 'string' || arrays.some(function (key) { return !Array.isArray(pack[key]); })) return false;
    var ids = new Set();
    if (arrays.filter(function (key) { return key !== 'steps'; }).some(function (key) {
      return pack[key].some(function (entry) {
        if (!entry || typeof entry.id !== 'string' || ids.has(entry.id)) return true;
        ids.add(entry.id); return false;
      });
    })) return false;
    var sources = new Set(pack.sources.map(function (s) { return s.id; }));
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
  var runtime = window.CASE_RUNTIME || window.FrontendPreviewRuntime.create(packs[active], { key: storageKey(active) });
  var metadataSaved = saveCatalog();

  function select(id) {
    if (!Object.prototype.hasOwnProperty.call(packs, id)) return false;
    if (runtime.flush) runtime.flush();
    active = id;
    runtime = window.FrontendPreviewRuntime.create(packs[id], { key: storageKey(id) });
    metadataSaved = saveCatalog();
    return true;
  }
  function create(title) {
    if (typeof title !== 'string' || !title.trim()) throw new Error('A case name is required');
    var pack = clone(template);
    var id = 'case-' + Date.now().toString(36);
    while (packs[id]) id += '-1';
    pack.meta = { id: id, title: title.trim(), dataVersion: '2.0', builtAt: new Date().toISOString().slice(0, 10) };
    pack.facts = []; pack.timeline = [];
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
    runtime = window.FrontendPreviewRuntime.create(pack, { key: storageKey(active), state: savedState });
    return true;
  }
  function exportProject() {
    if (active === template.meta.id) return runtime.exportProject();
    return JSON.stringify({ format: 'fieldnotes-project-v1', caseData: packs[active], state: runtime.getState() }, null, 2);
  }
  function importProject(json) {
    var input;
    try { input = typeof json === 'string' ? JSON.parse(json) : clone(json); } catch (error) { return { ok: false }; }
    var bundled = input && input.format === 'fieldnotes-project-v1';
    var pack = bundled ? input.caseData : input && Object.prototype.hasOwnProperty.call(packs, input.caseId) ? packs[input.caseId] : null;
    var payload = bundled ? input.state : input;
    if (!pack || (bundled && (!validPack(pack) || pack.meta.id === template.meta.id))) return { ok: false };
    var candidate = window.FrontendPreviewRuntime.create(pack, { persistent: false });
    var result = candidate.importProject(payload);
    candidate.flush();
    if (!result.ok) return result;
    // Validation completes before touching any active draft or catalog.
    if (runtime.flush) runtime.flush();
    packs[pack.meta.id] = pack;
    active = pack.meta.id;
    runtime = window.FrontendPreviewRuntime.create(pack, { key: storageKey(active), state: result.state });
    metadataSaved = saveCatalog();
    return { ok: true };
  }
  window.FieldnotesCases = {
    getData: function () { return packs[active]; }, getRuntime: function () { return runtime; },
    list: function () { return Object.values(packs).map(function (pack) { return { id: pack.meta.id, title: pack.meta.title }; }); },
    select: select, create: create, addFact: addFact, importProject: importProject, exportProject: exportProject,
    isCustom: function () { return active !== template.meta.id; },
    getSaveStatus: function () { return metadataSaved ? (runtime.getSaveStatus ? runtime.getSaveStatus() : 'unknown') : 'memory'; },
    mount: function (instance) { if (runtime.flush) runtime.flush(); runtime = instance; },
    recoveryData: function () { return recovery; }
  };
})();
