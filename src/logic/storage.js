/**
 * localStorage 封装（不可用时不抛错）
 */
(function (root) {
  root.AppLogic = root.AppLogic || {};

  function clone(x) {
    return JSON.parse(JSON.stringify(x));
  }

  function createStorage(options) {
    options = options || {};
    var key = options.key || "engr4960j.fukushima.v2";
    var debounceMs = options.debounceMs != null ? options.debounceMs : 1000;
    var intervalMs = options.intervalMs != null ? options.intervalMs : 30000;

    var available = false;
    var storage = null;
    try {
      if (typeof localStorage !== "undefined") {
        var probe = "__engr4960j_probe__";
        localStorage.setItem(probe, "1");
        localStorage.removeItem(probe);
        storage = localStorage;
        available = true;
      }
    } catch (e) {
      available = false;
    }

    var pending = null;
    var debounceTimer = null;
    var intervalTimer = null;
    var lastPayload = null;

    function load() {
      if (!available || !storage) return { ok: false, reason: "storage_unavailable" };
      try {
        var raw = storage.getItem(key);
        if (!raw) return { ok: true, data: null };
        return { ok: true, data: JSON.parse(raw) };
      } catch (err) {
        return { ok: false, reason: "parse_error", error: String(err) };
      }
    }

    function saveNow(data) {
      if (!available || !storage) return { ok: false, reason: "storage_unavailable" };
      try {
        storage.setItem(key, JSON.stringify(data));
        lastPayload = clone(data);
        return { ok: true };
      } catch (err) {
        return { ok: false, reason: "write_error", error: String(err) };
      }
    }

    function scheduleSave(data) {
      lastPayload = clone(data);
      if (!available) return;
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        saveNow(lastPayload);
      }, debounceMs);
    }

    function flushSave() {
      if (lastPayload) return saveNow(lastPayload);
      return { ok: true };
    }

    function startInterval(getDataFn) {
      if (!available || intervalTimer) return;
      intervalTimer = setInterval(function () {
        if (typeof getDataFn === "function") {
          scheduleSave(getDataFn());
        }
      }, intervalMs);
    }

    function stopInterval() {
      if (intervalTimer) {
        clearInterval(intervalTimer);
        intervalTimer = null;
      }
    }

    return {
      key: key,
      available: available,
      load: load,
      saveNow: saveNow,
      scheduleSave: scheduleSave,
      flushSave: flushSave,
      startInterval: startInterval,
      stopInterval: stopInterval
    };
  }

  root.AppLogic.createStorage = createStorage;
})(typeof window !== "undefined" ? window : globalThis);
