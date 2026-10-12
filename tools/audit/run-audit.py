#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""无头产品审查。沿用 browser-smoke 的 Edge 驱动，不安装依赖。"""
from __future__ import annotations

import html
import json
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

ROOT = Path(__file__).resolve().parents[2]
BUILD = ROOT / "tools" / "build.py"
AUDIT_JS = ROOT / "tools" / "audit" / "audit.js"
OUT_HTML = ROOT / "dist" / "_audit.html"
REPORT_MD = ROOT / "docs" / "audit" / "audit-report.md"
REPORT_JSON = ROOT / "docs" / "audit" / "audit-report.json"
PROFILE = Path(tempfile.gettempdir()) / "engr4960j-edge-audit"
DOWNLOADS = Path(tempfile.gettempdir()) / "engr4960j-edge-audit-dl"
ALLOWED_SKIPS: list[str] = []
VIEWPORTS = [(1440, 900), (1280, 720), (1024, 768)]


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


def kill_tree(pid: int) -> None:
    if os.name == "nt":
        subprocess.run(["taskkill", "/F", "/T", "/PID", str(pid)], capture_output=True, text=True)
    else:
        try:
            os.kill(pid, 15)
        except OSError:
            pass


def run_browser(cmd: list[str], timeout_s: float) -> tuple[str, str]:
    proc = subprocess.Popen(
        cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, encoding="utf-8", errors="replace"
    )
    stdout_chunks: list[str] = []
    stderr_chunks: list[str] = []

    def pump(stream, sink: list[str]) -> None:
        if stream is None:
            return
        while True:
            chunk = stream.read(65536)
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
        if "AUDIT_DONE" in text and 'id="audit-json"' in text:
            time.sleep(0.2)
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
    return "".join(stdout_chunks), "".join(stderr_chunks)


def file_url(path: Path) -> str:
    return "file:///" + quote(path.resolve().as_posix(), safe="/:")


def extract_report(dom: str) -> dict | None:
    match = re.search(r'<pre id="audit-json">(.*?)</pre>', dom, re.S)
    if not match:
        return None
    raw = html.unescape(match.group(1)).strip()
    return json.loads(raw)


def code_path_notes() -> list[str]:
    runtime = (ROOT / "src" / "ui" / "applogic-runtime.js").read_text(encoding="utf-8")
    notes = []
    if 'item: { type: "R", step: 8, text: "" }' in runtime:
        notes.append("ANSWER 只创建空的 R 条目（text:\"\"），不写入判断句。")
    else:
        notes.append("未在适配器中找到空 text 的 ANSWER 创建路径，需人工复核。")
    if "referenceLevel3 = null" in (ROOT / "src" / "ui" / "case-workspaces.js").read_text(encoding="utf-8"):
        notes.append("自建案例在装载时把 referenceLevel3 置空。")
    return notes


def write_reports(main: dict, viewports: list[dict], storage: dict | None) -> tuple[int, int, int]:
    checks = [c for c in (main.get("checks") or []) if not str(c.get("id", "")).startswith("D7-")]
    for vp in viewports:
        width = (vp.get("viewport") or {}).get("innerWidth")
        for item in vp.get("checks") or []:
            if str(item.get("id", "")).startswith("D7-"):
                cloned = dict(item)
                cloned["id"] = f"{item['id']}@{width}"
                checks.append(cloned)
    if storage:
        checks.extend(storage.get("checks") or [])

    pass_n = sum(1 for c in checks if c.get("status") == "pass")
    fail_n = sum(1 for c in checks if c.get("status") == "fail")
    skip_n = sum(1 for c in checks if c.get("status") == "skip")
    bad_skip = [c for c in checks if c.get("status") == "skip" and c.get("id") not in ALLOWED_SKIPS]

    payload = {
        "allowedSkips": ALLOWED_SKIPS,
        "summary": {"pass": pass_n, "fail": fail_n, "skip": skip_n},
        "checks": checks,
        "frictions": main.get("frictions") or [],
        "steps": main.get("steps") or [],
        "ops": main.get("ops") or [],
        "keywords": main.get("keywords") or [],
        "errors": main.get("errors") or [],
        "viewports": [vp.get("viewport") for vp in viewports],
        "storage": storage.get("checks") if storage else None,
        "codePaths": code_path_notes(),
    }
    REPORT_JSON.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")

    lines = [
        "# 产品审查报告",
        "",
        f"SUMMARY: PASS={pass_n} FAIL={fail_n} SKIP={skip_n}",
        "",
        f"ALLOWED_SKIPS: {ALLOWED_SKIPS or '(empty)'}",
        "",
        "## 视口",
        "",
    ]
    for vp in viewports:
        metrics = vp.get("viewport") or {}
        lines.append(
            f"- {metrics.get('innerWidth')}×{metrics.get('innerHeight')}: "
            f"scrollWidth={metrics.get('scrollWidth')} overflowX={metrics.get('overflowX')} "
            f"fonts={json.dumps(metrics.get('fonts'), ensure_ascii=False)}"
        )
    lines += ["", "## 检查项", ""]
    for item in checks:
        lines.append(f"- **{item.get('status', '').upper()}** `{item.get('id')}` — {item.get('detail')}")
    lines += ["", "## 逐步 DOM 摘要（重置后）", ""]
    for step in main.get("steps") or []:
        lines.append(
            f"- 步骤 {step.get('step')}: {step.get('title')} | hintHidden={step.get('hintHidden')} | "
            f"inputs={step.get('inputs')} | buttons={step.get('buttons')} | intro={step.get('intro')}"
        )
    lines += ["", "## 交互清单", ""]
    counts: dict[str, int] = {}
    for item in main.get("ops") or []:
        key = str(item.get("step"))
        counts[key] = counts.get(key, 0) + 1
        lines.append(f"- 步骤 {item.get('step')}: {item.get('action')}")
    lines.append("")
    lines.append("前 5 步操作次数（含导航）： " + ", ".join(f"{k}={counts.get(k, 0)}" for k in ["1", "2", "3", "4", "5"]))
    lines += ["", "## 摩擦点", ""]
    for item in main.get("frictions") or []:
        lines.append(f"- {item.get('severity')} {item.get('persona')} {item.get('title')} — {item.get('evidence')}")
    lines += ["", "## 关键词命中（软命中需人工判语境）", ""]
    for item in (main.get("keywords") or [])[:80]:
        flag = "HARD" if item.get("hard") else "soft"
        lines.append(f"- [{flag}] {item.get('where')}: {item.get('text')}")
    lines += ["", "## 结论槽写入路径", ""]
    for note in payload["codePaths"]:
        lines.append(f"- {note}")
    if main.get("errors"):
        lines += ["", "## 页面错误", ""]
        for err in main["errors"]:
            lines.append(f"- {err}")
    lines += [
        "",
        "## 无法由本脚本代替的人工项",
        "",
        "- 投影后排可读性、7–8 分钟口播是否走得完、引导例句是否像答案、导出是否够填 Template_3.tex。",
        "",
    ]
    REPORT_MD.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"SUMMARY: PASS={pass_n} FAIL={fail_n} SKIP={skip_n}")
    print(f"ALLOWED_SKIPS: {ALLOWED_SKIPS or '(empty)'}")
    print(f"Report: {REPORT_MD}")
    if fail_n or bad_skip or skip_n:
        return 1
    return 0


def launch(browser: Path, html_path: Path, width: int, height: int, shot: Path) -> dict | None:
    if os.name == "nt":
        subprocess.run(
            [
                "powershell",
                "-NoProfile",
                "-Command",
                "Get-CimInstance Win32_Process -Filter \"Name='msedge.exe'\" |"
                " Where-Object { $_.CommandLine -match 'engr4960j-edge-audit' } |"
                " ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }",
            ],
            capture_output=True,
            text=True,
        )
    shutil.rmtree(PROFILE, ignore_errors=True)
    PROFILE.mkdir(parents=True, exist_ok=True)
    DOWNLOADS.mkdir(parents=True, exist_ok=True)
    url = file_url(html_path)
    cmd = [
        str(browser),
        "--headless=new",
        "--virtual-time-budget=20000",
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
        f"--user-data-dir={PROFILE}",
        f"--download-default-directory={DOWNLOADS}",
        f"--screenshot={shot}",
        f"--window-size={width},{height}",
        "--dump-dom",
        url,
    ]
    print(f"Run {width}x{height}: {html_path.name}")
    stdout, stderr = run_browser(cmd, 40)
    if "Uncaught" in stderr or "ERROR:CONSOLE" in stderr.upper():
        print("  stderr has Uncaught/ERROR:CONSOLE")
    report = extract_report(stdout)
    if not report:
        print(f"  FAIL: no audit-json ({len(stdout)} bytes)")
        title = re.search(r"<title[^>]*>(.*?)</title>", stdout, re.I | re.S)
        print("  title:", (title.group(1)[:180] if title else "(none)"))
        print("  head:", stdout[:180].replace("\n", " "))
        for line in stderr.splitlines():
            if "Uncaught" in line or "audit" in line.lower():
                print("  err:", line[:240])
    return report


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    browsers = browser_candidates()
    if not browsers:
        print("FAIL: no Chromium browser")
        return 1
    browser = browsers[0]
    print("Browser:", browser)
    print("ALLOWED_SKIPS: (empty)")
    case_en = subprocess.run(
        ["node", str(ROOT / "tools" / "audit" / "case-en-verify.js")],
        cwd=ROOT,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
    )
    print(case_en.stdout, end="")
    if case_en.stderr:
        print(case_en.stderr, end="")
    if case_en.returncode != 0:
        return case_en.returncode
    build = subprocess.run(
        [sys.executable, str(BUILD), "--extra-js", "tools/audit/audit.js", "--out", "dist/_audit.html"],
        cwd=ROOT,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
    )
    print(build.stdout, end="")
    if build.returncode != 0:
        print(build.stderr)
        return build.returncode
    html_text = OUT_HTML.read_text(encoding="utf-8")
    if "SELFTEST" in html_text or "audit.js" not in html_text and "AUDIT_DONE" not in html_text:
        if "function finish" not in html_text and "AUDIT_DONE" not in html_text:
            print("FAIL: audit script missing from _audit.html")
            return 1
    storage_html = ROOT / "dist" / "_audit-storage.html"
    injected = html_text.replace(
        "<head>",
        "<head><script>(function(){var orig=Storage.prototype.setItem;"
        "Storage.prototype.setItem=function(key,value){var k=String(key);"
        "if(k.indexOf('engr')>=0||k.indexOf('fieldnotes')>=0){throw new Error('audit-quota');}"
        "return orig.apply(this,arguments);};})();</script>",
        1,
    )
    storage_html.write_text(injected, encoding="utf-8")
    shot_dir = ROOT / "docs" / "audit"
    shot_dir.mkdir(parents=True, exist_ok=True)
    viewports = []
    main_report = None
    for width, height in VIEWPORTS:
        report = launch(browser, OUT_HTML, width, height, shot_dir / f"viewport-{width}x{height}.png")
        if not report:
            print("SUMMARY: PASS=0 FAIL=1 SKIP=0")
            return 1
        viewports.append(report)
        if main_report is None:
            main_report = report
    storage = launch(browser, storage_html, 1440, 900, shot_dir / "viewport-storage-fail.png")
    if not storage or storage.get("role") != "storage":
        print("FAIL: storage-fail run did not report role=storage")
        if storage:
            print("  role=", storage.get("role"))
        return 1
    return write_reports(main_report or {}, viewports, storage)


if __name__ == "__main__":
    sys.exit(main())
