#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""无头 Chromium 驱动自测页（Python 标准库 + 系统浏览器）。"""
from __future__ import annotations

import argparse
import os
import re
import shutil
import subprocess
import sys
import tempfile
import threading
import time
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUT_HTML = ROOT / "dist" / "_selftest.html"
DEFAULT_OUT_PNG = ROOT / "dist" / "_selftest.png"
BUILD = ROOT / "tools" / "build.py"
SELFTEST_JS = ROOT / "tools" / "e2e" / "selftest.js"
PROFILE_DIR = Path(tempfile.gettempdir()) / "engr4960j-edge-smoke"
DOWNLOAD_DIR = Path(tempfile.gettempdir()) / "engr4960j-edge-dl"


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


def read_allowed_skips() -> list[str]:
    if not SELFTEST_JS.is_file():
        return []
    text = SELFTEST_JS.read_text(encoding="utf-8")
    m = re.search(r"ALLOWED_SKIPS\s*=\s*\[(.*?)\]", text, re.S)
    if not m:
        return []
    inner = m.group(1).strip()
    if not inner:
        return []
    return re.findall(r"['\"]([^'\"]+)['\"]", inner)


def kill_tree(pid: int) -> None:
    if os.name == "nt":
        subprocess.run(
            ["taskkill", "/F", "/T", "/PID", str(pid)],
            capture_output=True,
            text=True,
        )
    else:
        try:
            os.kill(pid, 15)
        except OSError:
            pass


def run_browser(cmd: list[str], timeout_s: float) -> tuple[str, str, int]:
    """分块读 stdout（dump-dom 常为单行）；见到 SUMMARY 或超时后结束进程树。"""
    proc = subprocess.Popen(
        cmd,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        encoding="utf-8",
        errors="replace",
    )
    stdout_chunks: list[str] = []
    stderr_chunks: list[str] = []

    def pump(stream, sink: list[str]) -> None:
        if stream is None:
            return
        while True:
            chunk = stream.read(4096)
            if not chunk:
                break
            sink.append(chunk)

    t_out = threading.Thread(target=pump, args=(proc.stdout, stdout_chunks), daemon=True)
    t_err = threading.Thread(target=pump, args=(proc.stderr, stderr_chunks), daemon=True)
    t_out.start()
    t_err.start()
    deadline = time.monotonic() + timeout_s
    while time.monotonic() < deadline:
        text = "".join(stdout_chunks)
        if "SUMMARY:" in text or re.search(r"SELFTEST PASS=\d+ FAIL=\d+ SKIP=\d+", text):
            time.sleep(0.8)
            break
        if proc.poll() is not None and not t_out.is_alive():
            break
        time.sleep(0.1)
    if proc.poll() is None:
        kill_tree(proc.pid)
        try:
            proc.wait(timeout=5)
        except subprocess.TimeoutExpired:
            pass
    t_out.join(timeout=2)
    t_err.join(timeout=2)
    return "".join(stdout_chunks), "".join(stderr_chunks), proc.returncode if proc.returncode is not None else 1


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

    allowed = read_allowed_skips()
    print(f"ALLOWED_SKIPS: {allowed if allowed else '(empty)'}")

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

    if os.name == "nt":
        subprocess.run(
            [
                "powershell",
                "-NoProfile",
                "-Command",
                "Get-CimInstance Win32_Process -Filter \"Name='msedge.exe'\" |"
                " Where-Object { $_.CommandLine -match 'engr4960j-edge' } |"
                " ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }",
            ],
            capture_output=True,
            text=True,
        )
    shutil.rmtree(PROFILE_DIR, ignore_errors=True)
    shutil.rmtree(DOWNLOAD_DIR, ignore_errors=True)
    PROFILE_DIR.mkdir(parents=True, exist_ok=True)
    DOWNLOAD_DIR.mkdir(parents=True, exist_ok=True)

    url = file_url(html_path)
    common = [
        "--disable-gpu",
        "--no-first-run",
        "--no-default-browser-check",
        "--disable-extensions",
        "--disable-background-networking",
        "--disable-sync",
        "--disable-component-update",
        "--disable-popup-blocking",
        "--allow-file-access-from-files",
        "--enable-logging=stderr",
        "--v=0",
        f"--user-data-dir={PROFILE_DIR}",
        f"--download-default-directory={DOWNLOAD_DIR}",
        f"--screenshot={DEFAULT_OUT_PNG}",
        "--window-size=1440,900",
        "--dump-dom",
        url,
    ]
    combos = [
        ["--headless=new", "--virtual-time-budget=15000"] + common,
        ["--headless", "--virtual-time-budget=15000"] + common,
        ["--headless=new"] + common,
    ]
    stdout = ""
    stderr = ""
    for i, extra in enumerate(combos, 1):
        cmd = [str(browser)] + extra
        print(f"Run combo {i}/{len(combos)}:", " ".join(f'"{c}"' if " " in c else c for c in cmd))
        stdout, stderr, _ = run_browser(cmd, 25)
        if re.search(r"SUMMARY:\s*PASS=", stdout):
            break
        print(f"  combo {i} had no SUMMARY ({len(stdout)} stdout bytes)")

    summary_match = re.search(
        r"SUMMARY:\s*PASS=(\d+)\s*FAIL=(\d+)(?:\s*SKIP=(\d+))?", stdout
    )
    if not summary_match:
        summary_match = re.search(
            r"SELFTEST PASS=(\d+) FAIL=(\d+) SKIP=(\d+)", stdout
        )
    for line in stdout.splitlines():
        if line.startswith("PASS:") or line.startswith("FAIL:") or line.startswith("SKIP:"):
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
        if not lines:
            print("  (stdout empty — Edge may have hung before dump-dom)")
        return 1

    pass_n = int(summary_match.group(1))
    fail_n = int(summary_match.group(2))
    skip_n = int(summary_match.group(3) or 0)
    print(summary_match.group(0))
    print(f"Screenshot: {DEFAULT_OUT_PNG.resolve()}")

    if fail_n > 0 or skip_n > 0 or console_fail:
        return 1
    if pass_n == 0:
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
