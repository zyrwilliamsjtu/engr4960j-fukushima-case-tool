// DEPRECATED: 本文件不再持有英文内容，仅为兼容旧调用点保留。
// 英文唯一来源：src/data/fukushima.js 的 ...En 字段 + src/ui/case-text.js
// 下一次界面改动时请移除所有调用点并删除本文件。
(function () {
  "use strict";
  var records = Object.create(null);
  ["facts", "timeline", "sources", "principles", "valueWords"].forEach(function (key) {
    (window.CASE_DATA[key] || []).forEach(function (row) {
      records[row.id] = row;
    });
  });

  function text(row, field, locale) {
    var value = (row && row[field]) || "";
    if (locale !== "en") return value;
    var original = records[row && row.id];
    if (!original || original[field] !== value) return value;
    var CT = window.FieldnotesCaseText;
    if (!CT) return value;
    return CT.materialField(row, field, locale) || value;
  }

  window.FieldnotesMaterials = { text: text };
})();
