/**
 * 将 PI 逻辑层 AppLogic（独立 createStore 实例）适配为 workbench 期望的运行时接口。
 * 回退：在 case-workspaces 中继续使用 FrontendPreviewRuntime.create(...)。
 *
 * 逻辑层暂无、本适配器以空值 + console.warn 兜底的方法：
 * - recoveryData（无损坏存档概念）
 */
(function (root) {
  "use strict";

  var RUNTIME_ID = "FIELDNOTES_AppLogic_RUNTIME_V1";
  var warned = {};

  function warnOnce(key, message) {
    if (warned[key]) return;
    warned[key] = true;
    if (typeof console !== "undefined" && console.warn) {
      console.warn("[AppLogicRuntime] " + message);
    }
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function logicReady() {
    return !!(
      root.AppLogic &&
      root.AppLogic.createStore &&
      root.AppLogic.createStorage &&
      root.AppLogic.createIdGenerator &&
      root.AppLogic.validateStep
    );
  }

  function related(state, id) {
    var result = new Set();
    function visit(target) {
      state.relations.forEach(function (r) {
        var dependent =
          r.kind === "resolution-answers-question" || r.kind === "review-targets-item"
            ? r.to === target
              ? r.from
              : null
            : r.from === target
              ? r.to
              : null;
        if (dependent && !result.has(dependent)) {
          result.add(dependent);
          visit(dependent);
        }
      });
      Object.keys(state.items || {}).forEach(function (kid) {
        var it = state.items[kid];
        if (!it) return;
        var refs = [].concat(it.basisRefs || [], it.appliesTo || []);
        if (refs.indexOf(target) >= 0 && !result.has(kid)) {
          result.add(kid);
          visit(kid);
        }
      });
    }
    visit(id);
    result.delete(id);
    return Array.from(result);
  }

  function loadState(store, next) {
    return store.dispatch({ type: "STATE_LOAD", payload: { state: clone(next) } });
  }

  function create(caseData, options) {
    options = options || {};
    if (!logicReady()) {
      if (typeof console !== "undefined" && console.error) {
        console.error(
          "[AppLogicRuntime] window.AppLogic 未就绪，无法创建运行时（请加载 src/logic/*.js）"
        );
      }
      return null;
    }

    var key = options.key || "engr4960j.frontend.preview.v2";
    var logicInstance = root.AppLogic.createInstance({
      key: key,
      persistent: options.persistent
    });
    var storage = logicInstance.storage;
    var store = logicInstance.store;
    var saving = storage.available ? "saved" : "memory";

    if (options.state) {
      loadState(store, options.state);
    }

    function getState() {
      return store.getState();
    }

    function touchSaving() {
      saving = storage.available ? "saving" : "memory";
      if (storage.available) saving = "saved";
    }

    function uiDispatch(action) {
      if (!action || !action.type) return getState();
      var type = action.type;
      var p = action.payload || {};
      var st = getState();
      var r;

      switch (type) {
        case "NAVIGATE": {
          var step = Math.max(1, Math.min(10, Number(p.step) || 1));
          var next = clone(st);
          next.currentStep = step;
          loadState(store, next);
          break;
        }
        case "ADD_ITEM": {
          var fields = clone(p.fields || {});
          if (p.type === "C" && !fields.word) {
            fields.word = "";
            fields.others = fields.others || "";
            fields.mine = fields.mine || "";
          }
          r = store.dispatch({
            type: "ITEM_ADD",
            payload: {
              prefix: p.type,
              step: p.step,
              item: Object.assign({ type: p.type, step: p.step, text: "" }, fields)
            }
          });
          if (r && r.ok && p.type === "PA" && fields.appliesTo) {
            fields.appliesTo.forEach(function (target) {
              store.dispatch({
                type: "RELATION_ADD",
                payload: {
                  relation: {
                    from: r.id,
                    to: target,
                    kind: "principle-applies-to",
                    why: fields.text || ""
                  }
                }
              });
            });
          }
          break;
        }
        case "UPDATE_ITEM": {
          store.dispatch({
            type: "ITEM_UPDATE",
            payload: { id: p.id, patch: clone(p.fields || {}) }
          });
          if (p.fields && p.fields.appliesTo) {
            var pa = getState().items[p.id];
            var targets = p.fields.appliesTo;
            var trimmed = clone(getState());
            trimmed.relations = trimmed.relations.filter(function (rel) {
              return !(rel.from === p.id && rel.kind === "principle-applies-to");
            });
            loadState(store, trimmed);
            targets.forEach(function (target) {
              store.dispatch({
                type: "RELATION_ADD",
                payload: {
                  relation: {
                    from: p.id,
                    to: target,
                    kind: "principle-applies-to",
                    why: (pa && pa.text) || ""
                  }
                }
              });
            });
          }
          if (p.reason) {
            var noteState = clone(getState());
            noteState.authorship.notes.push(
              new Date().toISOString() + " · " + p.id + " · " + p.reason
            );
            loadState(store, noteState);
          }
          break;
        }
        case "DELETE_ITEM":
          store.dispatch({ type: "ITEM_DELETE", payload: { id: p.id } });
          break;
        case "SET_STATUS":
          store.dispatch({
            type: "STEP_STATUS_SET",
            payload: { step: p.step, status: p.status }
          });
          break;
        case "SET_CHECKLIST":
          store.dispatch({
            type: "ITEM_UPDATE",
            payload: { id: p.id, patch: { checkedIds: p.ids } }
          });
          store.dispatch({
            type: "STEP_STATUS_SET",
            payload: { step: 7, status: "draft" }
          });
          break;
        case "LINK":
          // Updating an existing citation keeps its identity and snapshot history.
          var linkState = store.getState();
          var existingLink = linkState.relations.find(function (r) {
            return r.from === p.from && r.to === p.to && r.kind === (p.kind || "fact-supports-question");
          });
          if (existingLink) {
            existingLink.why = p.why || "";
            loadState(store, linkState);
            break;
          }
          store.dispatch({
            type: "RELATION_ADD",
            payload: {
              relation: {
                from: p.from,
                to: p.to,
                kind: p.kind || "fact-supports-question",
                why: p.why || ""
              }
            }
          });
          break;
        case "UNLINK":
          store.dispatch({ type: "RELATION_DELETE", payload: { id: p.id } });
          break;
        case "ADD_CONFLICT":
          store.dispatch({
            type: "CONFLICT_UPSERT",
            payload: { step: 6, conflict: clone(p) }
          });
          break;
        case "UPDATE_CONFLICT":
          store.dispatch({
            type: "CONFLICT_UPSERT",
            payload: {
              step: 6,
              conflict: Object.assign({ id: p.id }, clone(p.fields || {}))
            }
          });
          break;
        case "DELETE_CONFLICT": {
          var filtered = clone(getState());
          filtered.conflicts = filtered.conflicts.filter(function (c) {
            return c.id !== p.id;
          });
          loadState(store, filtered);
          break;
        }
        case "ADD_NOTE": {
          var withNote = clone(getState());
          var bucket = p.kind === "reservation" ? "reservations" : "notes";
          withNote.authorship[bucket].push(p.text);
          loadState(store, withNote);
          break;
        }
        case "ACCEPT_L3":
          store.dispatch({ type: "L3_ACCEPT", payload: { step: p.step } });
          break;
        case "SET_BASIS": {
          store.dispatch({
            type: "ITEM_UPDATE",
            payload: { id: p.id, patch: { basisRefs: p.refs || [] } }
          });
          if (p.gap) {
            store.dispatch({
              type: "RELATION_ADD",
              payload: {
                relation: {
                  from: p.id,
                  to: p.gap,
                  kind: "assumption-fills-gap",
                  why: p.why || ""
                }
              }
            });
          }
          store.dispatch({
            type: "STEP_STATUS_SET",
            payload: { step: 4, status: "draft" }
          });
          break;
        }
        case "ANSWER": {
          var existing = getState().relations.find(function (rel) {
            return rel.kind === "resolution-answers-question" && rel.to === p.question;
          });
          if (!existing) {
            var addR = store.dispatch({
              type: "ITEM_ADD",
              payload: {
                prefix: "R",
                step: 8,
                item: { type: "R", step: 8, text: "" }
              }
            });
            if (addR && addR.ok) {
              store.dispatch({
                type: "RELATION_ADD",
                payload: {
                  relation: {
                    from: addR.id,
                    to: p.question,
                    kind: "resolution-answers-question",
                    why: ""
                  }
                }
              });
            }
          }
          break;
        }
        case "RESET":
          store.dispatch({ type: "STATE_RESET", payload: {} });
          break;
        default:
          warnOnce("dispatch-" + type, "未映射的 UI action: " + type);
      }
      touchSaving();
      return getState();
    }

    return {
      getState: getState,
      dispatch: uiDispatch,
      validateStep: function (step) {
        return logicInstance.validateStep(step);
      },
      subscribe: function (listener) {
        return store.subscribe(listener);
      },
      exportProject: function () {
        return JSON.stringify(getState(), null, 2);
      },
      importProject: function (json) {
        var input;
        try {
          input = typeof json === "string" ? JSON.parse(json) : clone(json);
        } catch (e) {
          return { ok: false, errors: ["json"] };
        }
        if (!input || input.stateVersion !== "2.0") {
          return { ok: false, errors: ["version"] };
        }
        var lr = loadState(store, input);
        if (!lr.ok) return { ok: false, errors: [lr.reason || "load"] };
        return { ok: true, state: getState() };
      },
      createSnapshot: function (label) {
        var res = store.dispatch({
          type: "SNAPSHOT_CREATE",
          payload: { label: label || "snapshot" }
        });
        return (res && res.id) || null;
      },
      restoreSnapshot: function (id) {
        store.dispatch({ type: "SNAPSHOT_RESTORE", payload: { id: id } });
      },
      flush: function () {
        if (storage.flushSave) storage.flushSave();
        saving = storage.available ? "saved" : "memory";
      },
      getSaveStatus: function () {
        return saving;
      },
      affected: function (id) {
        return related(getState(), id);
      },
      recoveryData: function () {
        warnOnce("recoveryData", "recoveryData 无 AppLogic 实现，返回 null");
        return null;
      },
      storageKey: key,
      runtimeId: RUNTIME_ID,
      isAppLogicAdapter: true
    };
  }

  root.AppLogicRuntime = {
    RUNTIME_ID: RUNTIME_ID,
    available: logicReady,
    create: create
  };
})(typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : this);
