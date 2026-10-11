#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""无头 Chromium 驱动自测页（Python 标准库 + 系统浏览器）。"""
from __future__ import annotations

import argparse
import os
import re
import subprocess
import sys
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUT_HTML = ROOT / "dist" / "_selftest.html"
DEFAULT_OUT_PNG = ROOT / "dist" / "_selftest.png"
BUILD = ROOT / "tools" / "build.py"


def browser_candidates() -> list[Path]:
    env = os.environ.get("BROWSER_EXE")
    paths: list[Path] = []
    if env:
        paths.append(Path(env))
    paths.extend(
        [
            Path(r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"),
            Path(r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"),
            Path(r"C:\Program Files\Google\Chrome\Application\chrome.exe"),
            Path(r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"),
            Path(os.path.expandvars(r"%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe")),
        ]
    )
    out: list[Path] = []
    for p in paths:
        if p.is_file() and p not in out:
            out.append(p)
    return out


def find_browser(explicit: str | None) -> Path | None:
    if explicit:
        p = Path(explicit)
        return p if p.is_file() else None
    for p in browser_candidates():
        return p
    return None


def file_url(path: Path) -> str:
    resolved = path.resolve()
    return "file:///" + quote(resolved.as_posix(), safe="/:")


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    if hasattr(sys.stderr, "reconfigure"):
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    parser = argparse.ArgumentParser()
    parser.add_argument("--browser", help="Chromium 系浏览器可执行文件路径")
    args = parser.parse_args()

    browser = find_browser(args.browser)
    if not browser:
        print("SKIP: no Chromium browser found")
        return 0

    print(f"Browser: {browser}")

    build_cmd = [sys.executable, str(BUILD), "--extra-js", "tools/e2e/selftest.js", "--out", "dist/_selftest.html"]
    print("Build:", " ".join(build_cmd))
    proc = subprocess.run(
        build_cmd, cwd=ROOT, capture_output=True, text=True, encoding="utf-8", errors="replace"
    )
    print(proc.stdout, end="")
    if proc.returncode != 0:
        print(proc.stderr, file=sys.stderr)
        return proc.returncode

    html_path = DEFAULT_OUT_HTML
    if not html_path.is_file():
        print("FAIL: missing", html_path)
        return 1

    url = file_url(html_path)
    cmd = [
        str(browser),
        "--headless=new",
        "--disable-gpu",
        "--allow-file-access-from-files",
        "--virtual-time-budget=60000",
        "--enable-logging=stderr",
        "--v=0",
        f"--screenshot={DEFAULT_OUT_PNG}",
        "--window-size=1440,900",
        "--dump-dom",
        url,
    ]
    print("Run:", " ".join(f'"{c}"' if " " in c else c for c in cmd))
    run = subprocess.run(
        cmd, capture_output=True, text=True, encoding="utf-8", errors="replace"
    )
    stdout = run.stdout or ""
    stderr = run.stderr or ""

    summary_match = re.search(r"SUMMARY:\s*PASS=(\d+)\s*FAIL=(\d+)", stdout)
    for line in stdout.splitlines():
        if line.startswith("FAIL:") or line.startswith("SKIP:"):
            print(line)

    console_fail = bool(re.search(r"Uncaught|ERROR:CONSOLE", stderr, re.I))
    if console_fail:
        print("FAIL: browser console reported Uncaught/ERROR:CONSOLE")
        for line in stderr.splitlines()[:20]:
            print("  stderr:", line)

    if not summary_match:
        print("FAIL: SUMMARY line not found in dump-dom stdout")
        lines = stdout.splitlines()[:40]
        for i, line in enumerate(lines, 1):
            print(f"  DOM[{i}]: {line[:200]}")
        return 1

    pass_n, fail_n = int(summary_match.group(1)), int(summary_match.group(2))
    print(summary_match.group(0))
    print(f"Screenshot: {DEFAULT_OUT_PNG.resolve()}")

    if fail_n > 0 or console_fail:
        return 1
    if pass_n == 0:
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
