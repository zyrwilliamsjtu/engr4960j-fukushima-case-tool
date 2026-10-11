/**
 * 逻辑层入口 window.AppLogic
 */
(function (root) {
  root.AppLogic = root.AppLogic || {};

  function createInstance(options) {
    options = options || {};
    var storage = root.AppLogic.createStorage({
      key: options.key || "engr4960j-scaffold"
    });
    var idGen = root.AppLogic.createIdGenerator(options.idGenOptions || {});
    var store = root.AppLogic.createStore({ idGen: idGen, storage: storage });

    var shouldLoad =
      options.persistent !== false && options.loadPersisted !== false;
    if (shouldLoad) {
      var disk = storage.load();
      if (disk.ok && disk.data) {
        store.dispatch({ type: "STATE_LOAD", payload: { state: disk.data } });
      }
    }

    var validateStepImpl = root.AppLogic.validateStep;

    function getState() {
      return store.getState();
    }

    function dispatch(action) {
      return store.dispatch(action);
    }

    function subscribe(listener) {
      return store.subscribe(listener);
    }

    function validateStep(stepId) {
      return validateStepImpl(stepId, store.getState());
    }

    function createSnapshot(label) {
      return store.createSnapshot(label);
    }

    function restoreSnapshot(id) {
      return store.restoreSnapshot(id);
    }

    function exportProject() {
      throw new Error("exportProject 未实现");
    }

    function importProject() {
      throw new Error("importProject 未实现");
    }

    return {
      storage: storage,
      store: store,
      getState: getState,
      dispatch: dispatch,
      subscribe: subscribe,
      validateStep: validateStep,
      createSnapshot: createSnapshot,
      restoreSnapshot: restoreSnapshot,
      exportProject: exportProject,
      importProject: importProject
    };
  }

  // 默认门面：独立键 + 不加载持久化，仅脚手架/测试用，避免与界面案例键互相覆盖。
  var defaultInstance = createInstance({
    key: "engr4960j-scaffold",
    persistent: false,
    loadPersisted: false
  });

  root.AppLogic.createInstance = createInstance;

  root.AppLogic.storage = defaultInstance.storage;
  root.AppLogic.storageAvailable = defaultInstance.storage.available;
  root.AppLogic.getState = function () {
    return defaultInstance.getState();
  };
  root.AppLogic.dispatch = function (action) {
    return defaultInstance.dispatch(action);
  };
  root.AppLogic.subscribe = function (listener) {
    return defaultInstance.subscribe(listener);
  };
  root.AppLogic.validateStep = function (stepId) {
    return defaultInstance.validateStep(stepId);
  };
  root.AppLogic.createSnapshot = function (label) {
    return defaultInstance.createSnapshot(label);
  };
  root.AppLogic.restoreSnapshot = function (id) {
    return defaultInstance.restoreSnapshot(id);
  };
  root.AppLogic.exportProject = function () {
    return defaultInstance.exportProject();
  };
  root.AppLogic.importProject = function () {
    return defaultInstance.importProject();
  };
  root.AppLogic._store = defaultInstance.store;
})(typeof window !== "undefined" ? window : globalThis);
