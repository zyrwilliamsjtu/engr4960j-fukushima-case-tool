/**
 * Landing view: product intro and case choice. Same SPA as the workbook.
 */
(function (root) {
  "use strict";

  function mark() {
    return (
      '<svg class="home-mark" width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<rect x="4" y="4" width="64" height="64" rx="16" stroke="currentColor" stroke-width="2"/>' +
      '<path d="M20 46V26h10c6 0 10 3 10 8s-4 8-10 8H26v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
      '<path d="M44 26h8M44 36h8M44 46h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
      "</svg>"
    );
  }

  function render(ctx) {
    var t = ctx.t;
    var esc = ctx.esc;
    var packs = ctx.packs || [];
    var courseId = ctx.courseId;
    var activeId = ctx.activeId;
    var has = ctx.hasProgress;
    var primary = has ? "home-continue" : "home-start";
    var primaryKey = has ? "homeContinue" : "homeStart";
    var cards =
      '<article class="home-card"><h2>' +
      esc(t("homeCanTitle")) +
      "</h2><ul><li>" +
      esc(t("homeCan1")) +
      "</li><li>" +
      esc(t("homeCan2")) +
      "</li><li>" +
      esc(t("homeCan3")) +
      "</li></ul></article>" +
      '<article class="home-card home-card-limit"><h2>' +
      esc(t("homeCantTitle")) +
      "</h2><ul><li>" +
      esc(t("homeCant1")) +
      "</li><li>" +
      esc(t("homeCant2")) +
      "</li><li>" +
      esc(t("homeCant3")) +
      "</li><li>" +
      esc(t("homeCant4")) +
      "</li></ul></article>";
    var cases = packs
      .map(function (pack) {
        var course = pack.id === courseId;
        var selected = pack.id === activeId;
        return (
          '<button type="button" class="home-case ' +
          (course ? "is-course " : "is-custom ") +
          (selected ? "is-selected" : "") +
          '" data-action="select-case" data-id="' +
          esc(pack.id) +
          '" data-testid="' +
          (course ? "home-case-course" : "home-case-custom") +
          '" aria-pressed="' +
          (selected ? "true" : "false") +
          '"><span class="home-case-badge">' +
          esc(course ? t("homeCourseBadge") : t("homeCustomBadge")) +
          '</span><strong>' +
          esc(pack.title) +
          "</strong></button>"
        );
      })
      .join("");
    var actions =
      '<button type="button" class="button primary home-primary" data-action="' +
      (has ? "home-continue" : "home-start") +
      '" data-testid="' +
      primary +
      '">' +
      esc(t(primaryKey)) +
      "</button>";
    if (has) {
      actions +=
        '<p class="home-progress">' +
        esc(t("homeProgress").replace("{n}", String(ctx.step || 1))) +
        '</p><button type="button" class="button quiet" data-action="home-start-fresh" data-testid="home-start-fresh">' +
        esc(t("homeStartFresh")) +
        "</button>";
    }
    var demo = "";
    return (
      '<div class="home-screen" data-testid="home-screen">' +
      '<header class="home-hero"><div class="home-mark-wrap">' +
      mark() +
      '</div><p class="home-kicker">fieldnotes</p><h1>' +
      esc(t("homeTitle")) +
      '</h1><p class="home-tagline">' +
      esc(t("homeTagline")) +
      '</p><p class="home-lead">' +
      esc(t("homeLead")) +
      "</p></header>" +
      '<div class="home-grid">' +
      cards +
      "</div>" +
      '<section class="home-enter"><h2>' +
      esc(t("homeEnterTitle")) +
      "</h2>" +
      demo +
      actions +
      "</section>" +
      '<section class="home-cases" data-testid="home-cases"><h2>' +
      esc(t("homePickCase")) +
      '</h2><div class="home-case-list">' +
      cases +
      "</div></section>" +
      '<footer class="home-foot"><div class="language-switch" role="group" aria-label="' +
      esc(t("language")) +
      '"><button id="lang-zh" data-action="language" data-lang="zh" aria-pressed="' +
      (ctx.locale === "zh") +
      '" class="' +
      (ctx.locale === "zh" ? "selected" : "") +
      '">' +
      esc(t("langZh")) +
      '</button><button id="lang-en" data-action="language" data-lang="en" aria-pressed="' +
      (ctx.locale === "en" ? "true" : "false") +
      '" class="' +
      (ctx.locale === "en" ? "selected" : "") +
      '">' +
      esc(t("langEn")) +
      "</button></div><p>" +
      esc(t("homeLocalOnly")) +
      "</p><p>dataVersion " +
      esc(ctx.dataVersion || "") +
      "</p></footer></div>"
    );
  }

  root.FieldnotesHome = { render: render, markBytes: mark().length };
})(typeof globalThis !== "undefined" ? globalThis : window);
