/* Tests portable case packs and isolated drafts; Node built-ins only. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '../../..');
function boot(store = new Map()) {
  const context = { window: {}, localStorage: { getItem: k => store.get(k) || null, setItem: (k, v) => store.set(k, v) }, setTimeout, clearTimeout, Date };
  vm.createContext(context);
  for (const file of ['src/data/fukushima.js', 'src/ui/preview-runtime.js', 'src/ui/case-workspaces.js']) vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
  return context.window.FieldnotesCases;
}
const store = new Map(), cases = boot(store);
const send = (type, payload) => cases.getRuntime().dispatch({ type, payload });
send('ADD_ITEM', { type: 'Q', step: 1, fields: { text: 'Original case question?' } });
const original = cases.exportProject();
const caseId = cases.create('Bridge design');
assert.notEqual(caseId, 'fukushima');
assert.equal(cases.getData().facts.length, 0);
assert.equal(cases.getData().principles.length, 33);
assert.ok(cases.getData().steps.every(s => s.referenceLevel3 === null));
send('ADD_ITEM', { type: 'Q', step: 1, fields: { text: 'Should the team disclose limitations?', isCore: true } });
const question = Object.values(cases.getRuntime().getState().items)[0].id;
assert.equal(cases.addFact('A fictional QA record.', ['material', 'organization'], 'QA report §2', 2026, ''), true);
send('LINK', { from: cases.getData().facts[0].id, to: question, kind: 'fact-supports-question', why: 'Independent test reasoning.' });
send('ANSWER', { question });
assert.equal(Object.values(cases.getRuntime().getState().items).find(it => it.type === 'R').text, '');
cases.getRuntime().flush();
const bundle = cases.exportProject();
const otherComputer = boot();
assert.equal(otherComputer.importProject(bundle).ok, true);
assert.equal(otherComputer.getData().meta.title, 'Bridge design');
assert.equal(otherComputer.getData().facts.length, 1);
assert.equal(otherComputer.getRuntime().getState().relations.length, 2);
const restored = boot(store);
assert.equal(restored.getData().meta.id, caseId);
assert.equal(restored.getRuntime().getState().relations.length, 2);
restored.getRuntime().flush();
cases.select('fukushima');
assert.equal(cases.exportProject(), original, 'Switching preserves the original draft.');
cases.select(caseId);
const before = cases.exportProject();
for (const mutate of [
  b => { b.state.caseId = 'wrong-case'; },
  b => { b.state.items[question].principleId = question; },
  b => { b.caseData.facts[0].sourceId = 'missing-source'; },
  b => { b.caseData.steps[0] = null; },
  b => { b.state.relations[0].to = 'missing-question'; },
  b => { b.caseData.valueWords[0].word = null; }
]) {
  const corrupt = JSON.parse(bundle); mutate(corrupt);
  assert.equal(cases.importProject(corrupt).ok, false);
  assert.equal(cases.exportProject(), before, 'Malformed packs never replace current work.');
}
send('RESET');
assert.equal(cases.getRuntime().getState().caseId, caseId);
assert.equal(cases.getData().facts.length, 1, 'Reset clears analysis, keeps source materials.');
cases.select('fukushima');
assert.equal(cases.exportProject(), original);
cases.getRuntime().flush(); otherComputer.getRuntime().flush();
console.log('PASS: case isolation, blank judgments, sourced materials, cross-computer portability, refresh recovery, malformed-pack protection, scoped reset.');
