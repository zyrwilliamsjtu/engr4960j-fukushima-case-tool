/**
 * 稳定 ID 生成（单调递增，删除条目不回收编号）
 */
(function (root) {
  root.AppLogic = root.AppLogic || {};

  function pad(num, width) {
    var s = String(num);
    while (s.length < width) {
      s = "0" + s;
    }
    return s;
  }

  function createIdGenerator(initialSeq) {
    var seq = initialSeq
      ? JSON.parse(JSON.stringify(initialSeq))
      : {};

    function next(prefix, step) {
      if (!seq[prefix]) {
        seq[prefix] = 0;
      }
      seq[prefix] += 1;
      if (prefix === "REL" || prefix === "SN") {
        return prefix + "-" + pad(seq[prefix], 4);
      }
      if (prefix === "CF") {
        var st = step != null ? step : 6;
        return prefix + "-" + st + "-" + pad(seq[prefix], 2);
      }
      var stepNum = step != null ? step : 1;
      return prefix + "-" + stepNum + "-" + pad(seq[prefix], 2);
    }

    function getSeq() {
      return JSON.parse(JSON.stringify(seq));
    }

    function loadSeq(nextSeq) {
      seq = JSON.parse(JSON.stringify(nextSeq));
    }

    return { next: next, getSeq: getSeq, loadSeq: loadSeq };
  }

  /** 从已有状态条目推断各前缀计数器下限（只增不减） */
  function seedSeqFromState(state) {
    var seq = {};
    var items = state.items || {};
    var key;
    for (key in items) {
      if (!Object.prototype.hasOwnProperty.call(items, key)) continue;
      bumpFromId(seq, items[key].id);
    }
    var rels = state.relations || [];
    var i;
    for (i = 0; i < rels.length; i++) {
      bumpFromId(seq, rels[i].id);
    }
    var snaps = state.snapshots || [];
    for (i = 0; i < snaps.length; i++) {
      bumpFromId(seq, snaps[i].id);
    }
    var conflicts = state.conflicts || [];
    for (i = 0; i < conflicts.length; i++) {
      bumpFromId(seq, conflicts[i].id);
    }
    return seq;
  }

  function bumpFromId(seq, id) {
    if (!id || typeof id !== "string") return;
    var parts = id.split("-");
    if (parts.length < 2) return;
    var prefix = parts[0];
    var numPart = parts[parts.length - 1];
    var n = parseInt(numPart, 10);
    if (isNaN(n)) return;
    if (!seq[prefix] || seq[prefix] < n) {
      seq[prefix] = n;
    }
  }

  root.AppLogic.createIdGenerator = createIdGenerator;
  root.AppLogic.seedSeqFromState = seedSeqFromState;
})(typeof window !== "undefined" ? window : globalThis);
