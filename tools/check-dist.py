#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""验证 dist/index.html 是否为可离线交付的单文件包（Python 标准库）。"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist" / "index.html"

# 与 fukushima.js 中 facts 对照，防止 UTF-8/内联损坏
FACT_SAMPLES = [
    "福岛第一核电厂址共有六台核电机组（Units 1–6）。",
    "现场人员需在未按培训场景准备的情况下即兴应对，且常缺合适设备。",
    "福岛第一核电厂由 Tokyo Electric Power Company（TEPCO）运营。",
]

pass_n = 0
fail_n = 0


def ok(msg: str) -> None:
    global pass_n
    pass_n += 1
    print(f"PASS: {msg}")


def bad(msg: str) -> None:
    global fail_n
    fail_n += 1
    print(f"FAIL: {msg}")


def main() -> int:
    if not DIST.is_file():
        bad(f"missing {DIST}")
        print(f"SUMMARY: PASS={pass_n} FAIL={fail_n}")
        return 1

    html = DIST.read_text(encoding="utf-8")
    size = DIST.stat().st_size
    kb = size / 1024
    print(f"SIZE: {size:,} bytes ({kb:.1f} KB)")

    if re.search(r"<script[^>]+src\s*=", html, re.I):
        bad("<script src= present")
    else:
        ok("no external <script src=")

    if re.search(r'<link[^>]+rel\s*=\s*["\']stylesheet["\'][^>]+href\s*=', html, re.I):
        bad("<link rel=stylesheet href= present")
    else:
        ok("no external stylesheet link")

    if re.search(r'<script[^>]+type\s*=\s*["\']module["\']', html, re.I):
        bad("<script type=module present")
    else:
        ok("no script type=module")

    # 仅检查内联 <script> 块内是否出现 ES module / fetch（非 HTML 属性里的 UI 文案）
    scripts = re.findall(r"<script>([\s\S]*?)</script>", html, re.I)
    script_body = "\n".join(scripts)
    if re.search(r"\bimport\s+", script_body):
        bad("import statement in inline scripts")
    else:
        ok("no import statements in scripts")
    if re.search(r"\bexport\s+", script_body):
        bad("export statement in inline scripts")
    else:
        ok("no export statements in scripts")
    if re.search(r"\bfetch\s*\(", script_body):
        bad("fetch() in inline scripts")
    else:
        ok("no fetch() in scripts")

    # 资源级 http(s)：HTML 标签上的 src/href，或 CSS @import / url(http…)；
    # 允许 CASE_DATA 等 JS 字符串里的来源 URL（如 sources[].url）。
    ext_patterns = [
        (r"<script[^>]+src\s*=\s*['\"]https?://", "script src http(s)"),
        (
            r"<link[^>]+href\s*=\s*['\"]https?://",
            "link href http(s)",
        ),
        (
            r"<(?:img|iframe|audio|video|embed|source)[^>]+src\s*=\s*['\"]https?://",
            "media src http(s)",
        ),
        (r"@import\s+['\"]https?://", "css @import http(s)"),
    ]
    html_no_scripts = re.sub(r"<script>[\s\S]*?</script>", "", html, flags=re.I)
    ext_fail = False
    for pat, label in ext_patterns:
        if re.search(pat, html_no_scripts, re.I):
            bad(f"external resource ref: {label}")
            ext_fail = True
    if not ext_fail:
        ok("no HTML/CSS-level http(s) resource refs (tag attrs/@import only; URLs in JS strings OK)")

    has_case = "window.CASE_DATA" in html
    has_logic = bool(re.search(r"\.AppLogic\s*=", html))
    if has_case and has_logic:
        ok("window.CASE_DATA and AppLogic mount (window/root.AppLogic) present")
    else:
        bad("missing window.CASE_DATA and/or AppLogic definition")

    if re.search(r"window\.MOCK_USER_STATE\s*=", html):
        bad("window.MOCK_USER_STATE definition present (mock-state must be excluded)")
    else:
        ok("no window.MOCK_USER_STATE definition")

    if kb > 2048:
        print(
            f"WARNING: dist size {kb:.1f} KB exceeds 2048 KB "
            "( classroom double-click target; monitor if TA email limits apply )"
        )
    else:
        print(f"PASS: size under 2048 KB warning threshold ({kb:.1f} KB)")

    missing_facts = [t for t in FACT_SAMPLES if t not in html]
    if missing_facts:
        bad(f"fact text samples missing from file ({len(missing_facts)}/3)")
        for t in missing_facts:
            print(f"  missing: {t[:40]}…")
    else:
        ok("3 fact text samples found verbatim in dist")

    print("---")
    print(f"SUMMARY: PASS={pass_n} FAIL={fail_n}")
    return 0 if fail_n == 0 else 1


if __name__ == "__main__":
    raise SystemExit(main())
