#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
单文件离线包构建：将 index.html 引用的本地 CSS/JS 内联为 dist/index.html。

用法（仓库根目录）：
  python tools/build.py

规则：
  - 按 index.html 中 <script src> / <link rel="stylesheet"> 的出现顺序内联。
  - 在「Load the PI's CASE_RUNTIME」注释处额外内联 src/logic/*.js（ids → storage →
    validate → store → index），随后内联 src/ui/applogic-runtime.js；不内联 mock-state.js。
  - 本地图片 url() 转为 data: URI；单张 >512KB 时 WARNING。
  - UTF-8 输出，覆盖 dist/index.html。
"""
from __future__ import annotations

import argparse
import base64
import hashlib
import mimetypes
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"
DEFAULT_OUT = ROOT / "dist" / "index.html"
DELIVERABLE = DEFAULT_OUT
SELFTEST_MARKERS = ("SelftestResult", 'document.title = "SELFTEST ')

LOGIC_CHAIN = [
    "src/logic/ids.js",
    "src/logic/storage.js",
    "src/logic/validate.js",
    "src/logic/store.js",
    "src/logic/index.js",
]

ADAPTER_SCRIPT = "src/ui/applogic-runtime.js"

EXCLUDE_SCRIPTS = {"src/data/mock-state.js"}

CSS_URL_RE = re.compile(
    r"url\s*\(\s*(['\"]?)([^)'\"]+)\1\s*\)", re.IGNORECASE
)
SCRIPT_SRC_RE = re.compile(
    r'<script\s+src="([^"]+)">\s*</script>', re.IGNORECASE
)
LINK_CSS_RE = re.compile(
    r'<link\s+rel="stylesheet"\s+href="([^"]+)">\s*', re.IGNORECASE
)
RUNTIME_COMMENT = (
    "<!-- Load the PI's CASE_RUNTIME here before the UI adapter when ready. -->"
)


def escape_script(content: str) -> str:
    return re.sub(r"</script", r"<\\/script", content, flags=re.IGNORECASE)


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def inline_css_urls(css: str, css_path: Path, warnings: list[str]) -> str:
    def repl(match: re.Match[str]) -> str:
        raw = match.group(2).strip()
        if raw.startswith("data:") or raw.startswith("http://") or raw.startswith("https://"):
            return match.group(0)
        asset = (css_path.parent / raw).resolve()
        if not asset.is_file():
            warnings.append(f"CSS 资源未找到: {css_path} -> {raw}")
            return match.group(0)
        data = asset.read_bytes()
        if len(data) > 512 * 1024:
            warnings.append(
                f"图片 >512KB: {asset.relative_to(ROOT)} ({len(data):,} bytes)"
            )
        mime, _ = mimetypes.guess_type(str(asset))
        if not mime:
            mime = "application/octet-stream"
        b64 = base64.standard_b64encode(data).decode("ascii")
        return f'url("data:{mime};base64,{b64}")'

    return CSS_URL_RE.sub(repl, css)


def inline_script_tag(content: str) -> str:
    return f"<script>\n{escape_script(content)}\n</script>"


def inline_style_tag(content: str) -> str:
    return f"<style>\n{content}\n</style>"


def build(out_path: Path, extra_js_list: list[Path]) -> int:
    warnings: list[str] = []
    inlined: list[tuple[str, int]] = []

    html = read_text(INDEX)

    def css_repl(match: re.Match[str]) -> str:
        rel = match.group(1)
        path = (ROOT / rel).resolve()
        if not path.is_file():
            raise FileNotFoundError(rel)
        content = read_text(path)
        content = inline_css_urls(content, path, warnings)
        inlined.append((rel, len(content.encode("utf-8"))))
        return inline_style_tag(content)

    html = LINK_CSS_RE.sub(css_repl, html)

    def script_repl(match: re.Match[str]) -> str:
        rel = match.group(1).replace("\\", "/")
        if rel in EXCLUDE_SCRIPTS:
            warnings.append(f"跳过排除脚本: {rel}")
            return ""
        path = (ROOT / rel).resolve()
        if not path.is_file():
            raise FileNotFoundError(rel)
        content = read_text(path)
        inlined.append((rel, len(content.encode("utf-8"))))
        return inline_script_tag(content)

    html = SCRIPT_SRC_RE.sub(script_repl, html)

    if RUNTIME_COMMENT in html:
        logic_blocks = []
        for rel in LOGIC_CHAIN:
            path = (ROOT / rel).resolve()
            if not path.is_file():
                raise FileNotFoundError(rel)
            content = read_text(path)
            inlined.append((rel, len(content.encode("utf-8"))))
            logic_blocks.append(inline_script_tag(content))
        adapter_path = (ROOT / ADAPTER_SCRIPT).resolve()
        if adapter_path.is_file():
            adapter_content = read_text(adapter_path)
            inlined.append((ADAPTER_SCRIPT, len(adapter_content.encode("utf-8"))))
            logic_blocks.append(inline_script_tag(adapter_content))
        html = html.replace(RUNTIME_COMMENT, "\n".join(logic_blocks))

    for extra_js in extra_js_list:
        extra_path = extra_js.resolve()
        if not extra_path.is_file():
            raise FileNotFoundError(extra_js)
        extra_content = read_text(extra_path)
        rel = str(extra_js).replace("\\", "/")
        inlined.append((rel, len(extra_content.encode("utf-8"))))
        inject = inline_script_tag(extra_content)
        if "</body>" in html:
            html = html.replace("</body>", inject + "\n</body>", 1)
        else:
            html += inject

    out_resolved = out_path.resolve()
    if out_resolved == DELIVERABLE.resolve():
        for marker in SELFTEST_MARKERS:
            if marker in html:
                print(f"ERROR: deliverable must not contain SELFTEST marker ({marker!r})")
                return 1

    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(html, encoding="utf-8")
    final_size = out_path.stat().st_size
    digest = hashlib.sha256(out_path.read_bytes()).hexdigest()

    print(f"Built: {out_path.relative_to(ROOT)}")
    print(f"Inline count: {len(inlined)}")
    for rel, size in inlined:
        print(f"  {rel}: {size:,} bytes")
    print(f"Final size: {final_size:,} bytes ({final_size / 1024:.1f} KB)")
    print(f"SHA256: {digest}")
    if warnings:
        print("WARNINGS:")
        for w in warnings:
            print(f"  - {w}")
    else:
        print("WARNINGS: (none)")
    return 0


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Inline local assets into a single HTML file.")
    parser.add_argument(
        "--out",
        default=str(DEFAULT_OUT.relative_to(ROOT)).replace("\\", "/"),
        help="Output HTML path (default: dist/index.html)",
    )
    parser.add_argument(
        "--extra-js",
        dest="extra_js",
        action="append",
        default=None,
        help="Extra script inlined immediately before </body> (repeatable)",
    )
    return parser.parse_args()


if __name__ == "__main__":
    args = parse_args()
    out = (ROOT / args.out).resolve()
    extra_list: list[Path] = []
    if args.extra_js:
        extra_list = [(ROOT / rel).resolve() for rel in args.extra_js]
    raise SystemExit(build(out, extra_list))
