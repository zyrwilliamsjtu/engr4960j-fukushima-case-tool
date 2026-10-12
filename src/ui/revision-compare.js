/**
 * 修订对比：基于 snapshots 的纯函数差异与 HTML 渲染（不新增逻辑层接口）。
 */
(function (root) {
  'use strict';

  var LABEL_INITIAL = '初步';
  var LABEL_REVIEWED = '复核后';

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function payloadOf(snap) {
    return snap && snap.payload ? snap.payload : null;
  }

  function findSnapshotByLabel(state, label) {
    var list = (state && state.snapshots) || [];
    var i;
    for (i = list.length - 1; i >= 0; i--) {
      if (list[i].label === label) return list[i];
    }
    return null;
  }

  function fieldDiff(before, after, keys) {
    var parts = [];
    keys.forEach(function (key) {
      var a = before ? before[key] : undefined;
      var b = after ? after[key] : undefined;
      if (JSON.stringify(a) !== JSON.stringify(b)) {
        parts.push({ key: key, before: a, after: b });
      }
    });
    return parts;
  }

  function comparePayloads(left, right) {
    var result = { added: [], deleted: [], modified: [], relationAdded: [], relationDeleted: [], conflictAdded: [], conflictDeleted: [] };
    if (!left || !right) return result;
    var ids = new Set();
    Object.keys(left.items || {}).forEach(function (id) { ids.add(id); });
    Object.keys(right.items || {}).forEach(function (id) { ids.add(id); });
    ids.forEach(function (id) {
      var a = left.items[id];
      var b = right.items[id];
      if (a && !b) result.deleted.push({ id: id, before: a });
      else if (!a && b) result.added.push({ id: id, after: b });
      else if (a && b) {
        var fields = fieldDiff(a, b, ['text', 'basisRefs', 'categories', 'isCore', 'focusReason', 'reason', 'word', 'others', 'mine']);
        if (fields.length) result.modified.push({ id: id, before: a, after: b, fields: fields });
      }
    });
    var relIds = new Set();
    (left.relations || []).concat(right.relations || []).forEach(function (r) { relIds.add(r.id); });
    relIds.forEach(function (rid) {
      var l = (left.relations || []).find(function (x) { return x.id === rid; });
      var r = (right.relations || []).find(function (x) { return x.id === rid; });
      if (l && !r) result.relationDeleted.push(l);
      if (!l && r) result.relationAdded.push(r);
    });
    var cfIds = new Set();
    (left.conflicts || []).concat(right.conflicts || []).forEach(function (c) { cfIds.add(c.id); });
    cfIds.forEach(function (cid) {
      var l = (left.conflicts || []).find(function (x) { return x.id === cid; });
      var r = (right.conflicts || []).find(function (x) { return x.id === cid; });
      if (l && !r) result.conflictDeleted.push(l);
      if (!l && r) result.conflictAdded.push(r);
    });
    return result;
  }

  function summaryLine(diff, locale) {
    if(locale==='en')return 'Added ' + diff.added.length + ' / Modified ' + diff.modified.length + ' / Deleted ' + diff.deleted.length;
    return '新增 ' + diff.added.length + ' 条 / 修改 ' + diff.modified.length + ' 条 / 删除 ' + diff.deleted.length + ' 条';
  }

  function escapeHtml(text) {
    return String(text == null ? '' : text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderPanel(state, locale) {
    locale = locale || 'zh';
    var leftSnap = findSnapshotByLabel(state, LABEL_INITIAL);
    var rightSnap = findSnapshotByLabel(state, LABEL_REVIEWED);
    if (!leftSnap || !rightSnap) {
      return '<div class="revision-compare" data-testid="revision-compare"><p>' +
        (locale === 'zh' ? '请先存两个快照再对比（「初步」与「复核后」）。' : 'Save both snapshots before comparing.') +
        '</p></div>';
    }
    var diff = comparePayloads(payloadOf(leftSnap), payloadOf(rightSnap));
    var html = '<div class="revision-compare" data-testid="revision-compare"><p class="revision-summary" data-testid="revision-summary">' +
      escapeHtml(summaryLine(diff, locale)) + '</p><div class="revision-columns">';
    html += '<section><h4>' + (locale === 'zh' ? '初步' : 'Initial') + '</h4><p><small>' + escapeHtml(leftSnap.createdAt || '') + '</small></p></section>';
    html += '<section><h4>' + (locale === 'zh' ? '复核后' : 'Reviewed') + '</h4><p><small>' + escapeHtml(rightSnap.createdAt || '') + '</small></p></section></div>';
    html += '<ul class="revision-diff-list">';
    diff.added.forEach(function (row) {
      html += '<li><strong>' + (locale==='en'?'Added':'新增') + '</strong> ' + escapeHtml(row.id) + ' — ' + escapeHtml(row.after.text || row.after.word || '') + '</li>';
    });
    diff.deleted.forEach(function (row) {
      html += '<li><strong>' + (locale==='en'?'Deleted':'删除') + '</strong> ' + escapeHtml(row.id) + ' — ' + escapeHtml(row.before.text || row.before.word || '') + '</li>';
    });
    diff.modified.forEach(function (row) {
      html += '<li><strong>' + (locale==='en'?'Modified':'已修改') + '</strong> ' + escapeHtml(row.id);
      row.fields.forEach(function (f) {
        html += '<div class="revision-field"><span>' + escapeHtml(f.key) + '</span><del>' + escapeHtml(JSON.stringify(f.before)) + '</del><ins>' + escapeHtml(JSON.stringify(f.after)) + '</ins></div>';
      });
      html += '</li>';
    });
    diff.relationAdded.forEach(function (r) {
      html += '<li><strong>' + (locale==='en'?'Link added':'关联+') + '</strong> ' + escapeHtml(r.from + ' → ' + r.to) + '</li>';
    });
    diff.relationDeleted.forEach(function (r) {
      html += '<li><strong>' + (locale==='en'?'Link removed':'关联−') + '</strong> ' + escapeHtml(r.from + ' → ' + r.to) + '</li>';
    });
    html += '</ul></div>';
    return html;
  }

  root.RevisionCompare = {
    LABEL_INITIAL: LABEL_INITIAL,
    LABEL_REVIEWED: LABEL_REVIEWED,
    comparePayloads: comparePayloads,
    summaryLine: summaryLine,
    renderPanel: renderPanel,
    findSnapshotByLabel: findSnapshotByLabel
  };
})(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this);
