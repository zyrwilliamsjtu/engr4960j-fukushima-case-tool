/**
 * 状态树、dispatch、subscribe、快照
 */
(function (root) {
  root.AppLogic = root.AppLogic || {};

  function clone(x) {
    return JSON.parse(JSON.stringify(x));
  }

  function nowIso() {
    return new Date().toISOString();
  }

  function emptyState() {
    return {
      stateVersion: "2.0",
      caseId: "fukushima",
      currentStep: 1,
      startedAt: nowIso(),
      updatedAt: nowIso(),
      authorship: { notes: [], reservations: [] },
      stepStatus: {},
      items: {},
      relations: [],
      conflicts: [],
      snapshots: [],
      hasAcceptedL3: {},
      idSeq: {}
    };
  }

  function createStore(deps) {
    deps = deps || {};
    var idGen = deps.idGen;
    var storage = deps.storage;
    var listeners = [];
    var state = emptyState();

    function notify() {
      var snapshot = getState();
      var i;
      for (i = 0; i < listeners.length; i++) {
        try {
          listeners[i](snapshot);
        } catch (e) {
          /* 忽略单个 listener 错误 */
        }
      }
    }

    function touch() {
      state.updatedAt = nowIso();
      if (storage && storage.scheduleSave) {
        storage.scheduleSave(getPersistPayload());
      }
      notify();
    }

    function getPersistPayload() {
      return clone({
        stateVersion: state.stateVersion,
        caseId: state.caseId,
        currentStep: state.currentStep,
        startedAt: state.startedAt,
        updatedAt: state.updatedAt,
        authorship: state.authorship,
        stepStatus: state.stepStatus,
        items: state.items,
        relations: state.relations,
        conflicts: state.conflicts,
        snapshots: state.snapshots,
        hasAcceptedL3: state.hasAcceptedL3,
        idSeq: state.idSeq
      });
    }

    function getState() {
      return clone(state);
    }

    function subscribe(listener) {
      listeners.push(listener);
      return function unsubscribe() {
        var idx = listeners.indexOf(listener);
        if (idx >= 0) listeners.splice(idx, 1);
      };
    }

    function findReferences(id) {
      var impact = { relations: [], items: [], conflicts: [] };
      var i;
      for (i = 0; i < state.relations.length; i++) {
        var r = state.relations[i];
        if (r.from === id || r.to === id) impact.relations.push(r.id);
      }
      var key;
      for (key in state.items) {
        var it = state.items[key];
        if (it.basisRefs && it.basisRefs.indexOf(id) >= 0) impact.items.push(key);
        if (it.appliesTo && it.appliesTo.indexOf(id) >= 0) impact.items.push(key);
      }
      for (i = 0; i < state.conflicts.length; i++) {
        var c = state.conflicts[i];
        if (c.questionId === id) impact.conflicts.push(c.id);
      }
      return impact;
    }

    function markDependentsStale(changedId, reason) {
      var impact = findReferences(changedId);
      var i;
      for (i = 0; i < impact.items.length; i++) {
        var kid = impact.items[i];
        if (state.items[kid]) {
          state.items[kid].needsReview = true;
          state.items[kid].staleReason = reason || "dependency_changed";
        }
      }
      var stepKeys = Object.keys(state.stepStatus || {});
      for (i = 0; i < stepKeys.length; i++) {
        var sn = stepKeys[i];
        if (state.stepStatus[sn] === "checked") state.stepStatus[sn] = "stale";
      }
    }

    function loadState(payload, options) {
      options = options || {};
      if (!payload) return { ok: false, reason: "empty_payload" };
      if (payload.stateVersion !== "2.0") {
        return { ok: false, reason: "version_mismatch", expected: "2.0", got: payload.stateVersion };
      }
      if (payload.caseId !== "fukushima") {
        return { ok: false, reason: "case_mismatch" };
      }
      if (options.replace !== true) {
        return { ok: false, reason: "use_replace_flag" };
      }
      state = clone(payload);
      if (!state.idSeq) state.idSeq = root.AppLogic.seedSeqFromState(state);
      idGen.loadSeq(state.idSeq);
      touch();
      return { ok: true };
    }

    function dispatch(action) {
      if (!action || !action.type) return { ok: false, reason: "invalid_action" };
      var p = action.payload || {};
      var result = { ok: true };

      switch (action.type) {
        case "STATE_INIT": {
          var g = typeof window !== "undefined" ? window : root;
          var mock = g.MOCK_USER_STATE;
          if (p.useMock && mock) {
            var loaded = loadState(clone(mock), { replace: true });
            if (!loaded.ok) return loaded;
            state.idSeq = root.AppLogic.seedSeqFromState(state);
            idGen.loadSeq(state.idSeq);
          } else {
            state = emptyState();
            idGen.loadSeq(state.idSeq);
          }
          touch();
          break;
        }
        case "STATE_LOAD": {
          var lr = loadState(p.state, { replace: true });
          return lr;
        }
        case "STATE_RESET": {
          state = emptyState();
          idGen.loadSeq(state.idSeq);
          touch();
          break;
        }
        case "ITEM_ADD": {
          var prefix = p.prefix;
          var step = p.step;
          if (!prefix) return { ok: false, reason: "missing_prefix" };
          var newId = idGen.next(prefix, step);
          var item = clone(p.item || {});
          item.id = newId;
          item.type = item.type || prefix;
          item.step = step != null ? step : item.step || 1;
          if (!item.createdAt) item.createdAt = nowIso();
          item.updatedAt = nowIso();
          state.items[newId] = item;
          state.idSeq = idGen.getSeq();
          touch();
          result.id = newId;
          break;
        }
        case "ITEM_UPDATE": {
          var uid = p.id;
          if (!uid || !state.items[uid]) return { ok: false, reason: "not_found" };
          var prev = clone(state.items[uid]);
          var patch = p.patch || {};
          var fk;
          for (fk in patch) {
            if (Object.prototype.hasOwnProperty.call(patch, fk)) {
              state.items[uid][fk] = patch[fk];
            }
          }
          state.items[uid].updatedAt = nowIso();
          if (prev.basisRefs && patch.basisRefs && JSON.stringify(prev.basisRefs) !== JSON.stringify(patch.basisRefs)) {
            markDependentsStale(uid, "basis_changed");
          }
          touch();
          break;
        }
        case "ITEM_SET_FIELD": {
          var fid = p.id;
          if (!fid || !state.items[fid]) return { ok: false, reason: "not_found" };
          state.items[fid][p.field] = p.value;
          state.items[fid].updatedAt = nowIso();
          touch();
          break;
        }
        case "ITEM_DELETE": {
          var delId = p.id;
          if (!delId || !state.items[delId]) return { ok: false, reason: "not_found" };
          var imp = findReferences(delId);
          var hasRef =
            imp.relations.length || imp.items.length || imp.conflicts.length;
          if (hasRef && !p.force) {
            return { ok: false, reason: "referenced", impact: imp };
          }
          delete state.items[delId];
          if (p.force) {
            state.relations = state.relations.filter(function (r) {
              return r.from !== delId && r.to !== delId;
            });
          }
          markDependentsStale(delId, "item_deleted");
          touch();
          break;
        }
        case "STEP_STATUS_SET": {
          state.stepStatus[String(p.step)] = p.status;
          touch();
          break;
        }
        case "RELATION_ADD": {
          var relId = idGen.next("REL");
          var rel = clone(p.relation || {});
          rel.id = relId;
          if (!rel.createdAt) rel.createdAt = nowIso();
          state.relations.push(rel);
          state.idSeq = idGen.getSeq();
          touch();
          result.id = relId;
          break;
        }
        case "RELATION_DELETE": {
          var rid = p.id;
          state.relations = state.relations.filter(function (r) {
            return r.id !== rid;
          });
          touch();
          break;
        }
        case "CONFLICT_UPSERT": {
          var cf = clone(p.conflict || {});
          if (!cf.id) {
            cf.id = idGen.next("CF", p.step || 6);
          }
          var found = false;
          var ci;
          for (ci = 0; ci < state.conflicts.length; ci++) {
            if (state.conflicts[ci].id === cf.id) {
              state.conflicts[ci] = cf;
              found = true;
              break;
            }
          }
          if (!found) state.conflicts.push(cf);
          state.idSeq = idGen.getSeq();
          touch();
          result.id = cf.id;
          break;
        }
        case "SNAPSHOT_CREATE": {
          var sid = createSnapshotInternal(p.label || "快照");
          result.id = sid;
          break;
        }
        case "SNAPSHOT_RESTORE": {
          var rr = restoreSnapshotInternal(p.id);
          return rr;
        }
        case "L3_ACCEPT": {
          state.hasAcceptedL3[String(p.step)] = true;
          touch();
          break;
        }
        default:
          return { ok: false, reason: "unknown_action" };
      }
      return result;
    }

    function createSnapshotInternal(label) {
      var sid = idGen.next("SN");
      var payload = {
        items: clone(state.items),
        relations: clone(state.relations),
        conflicts: clone(state.conflicts),
        stepStatus: clone(state.stepStatus),
        hasAcceptedL3: clone(state.hasAcceptedL3),
        idSeq: clone(state.idSeq)
      };
      state.snapshots.push({
        id: sid,
        label: label,
        createdAt: nowIso(),
        payload: payload
      });
      state.idSeq = idGen.getSeq();
      touch();
      return sid;
    }

    function restoreSnapshotInternal(sid) {
      var i;
      var snap = null;
      for (i = 0; i < state.snapshots.length; i++) {
        if (state.snapshots[i].id === sid) {
          snap = state.snapshots[i];
          break;
        }
      }
      if (!snap) return { ok: false, reason: "snapshot_not_found" };
      var pl = snap.payload;
      state.items = clone(pl.items);
      state.relations = clone(pl.relations);
      state.conflicts = clone(pl.conflicts || []);
      state.stepStatus = clone(pl.stepStatus || {});
      state.hasAcceptedL3 = clone(pl.hasAcceptedL3 || {});
      state.idSeq = clone(pl.idSeq || {});
      idGen.loadSeq(state.idSeq);
      touch();
      return { ok: true };
    }

    function createSnapshot(label) {
      return createSnapshotInternal(label);
    }

    function restoreSnapshot(id) {
      return restoreSnapshotInternal(id);
    }

    return {
      getState: getState,
      dispatch: dispatch,
      subscribe: subscribe,
      createSnapshot: createSnapshot,
      restoreSnapshot: restoreSnapshot,
      getPersistPayload: getPersistPayload
    };
  }

  root.AppLogic.createStore = createStore;
})(typeof window !== "undefined" ? window : globalThis);
