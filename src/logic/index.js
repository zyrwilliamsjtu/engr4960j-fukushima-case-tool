/**
 * 逻辑层入口 window.AppLogic
 */
(function (root) {
  root.AppLogic = root.AppLogic || {};

  var storage = root.AppLogic.createStorage({
    key: "engr4960j.fukushima.v2"
  });
  var idGen = root.AppLogic.createIdGenerator({});
  var store = root.AppLogic.createStore({ idGen: idGen, storage: storage });

  function getState() {
    return store.getState();
  }

  function dispatch(action) {
    return store.dispatch(action);
  }

  function subscribe(listener) {
    return store.subscribe(listener);
  }

  var validateStepImpl = root.AppLogic.validateStep;

  function validateStep(stepId) {
    return validateStepImpl(stepId, store.getState());
  }

  function createSnapshot(label) {
    return store.createSnapshot(label);
  }

  function restoreSnapshot(id) {
    return store.restoreSnapshot(id);
  }

  // TODO: 未实现，见下一轮
  function exportProject() {
    throw new Error("exportProject 未实现");
  }

  // TODO: 未实现，见下一轮
  function importProject() {
    throw new Error("importProject 未实现");
  }

  root.AppLogic.storage = storage;
  root.AppLogic.storageAvailable = storage.available;
  root.AppLogic.getState = getState;
  root.AppLogic.dispatch = dispatch;
  root.AppLogic.subscribe = subscribe;
  root.AppLogic.validateStep = validateStep;
  root.AppLogic.createSnapshot = createSnapshot;
  root.AppLogic.restoreSnapshot = restoreSnapshot;
  root.AppLogic.exportProject = exportProject;
  root.AppLogic.importProject = importProject;
  root.AppLogic._store = store;
})(typeof window !== "undefined" ? window : globalThis);
