#!/usr/bin/env python3
"""Headless checks that dist/index.demo.html actually renders demo state."""
from __future__ import annotations

import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BUILD = ROOT / "tools" / "build.py"
DEMO_HTML = ROOT / "dist" / "index.demo.html"
DELIVERABLE = ROOT / "dist" / "index.html"
VERIFY_JS = ROOT / "tools" / "audit" / "demo-verify.js"
CHECK_HTML = ROOT / "dist" / "_demo-check.html"

failures = 0


def fail(msg: str) -> None:
    global failures
    failures += 1
    print(f"FAIL: {msg}")


def ok(msg: str) -> None:
    print(f"PASS: {msg}")


def browser() -> Path | None:
    candidates = [
        Path(r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"),
        Path(r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"),
        Path(r"C:\Program Files\Google\Chrome\Application\chrome.exe"),
    ]
    for p in candidates:
        if p.is_file():
            return p
    return None


def file_url(path: Path) -> str:
    from urllib.parse import quote

    return "file:///" + quote(path.as_posix().replace("\\", "/"), safe="/:")


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    build_demo = subprocess.run(
        [
            sys.executable,
            str(BUILD),
            "--extra-js",
            "src/data/demo-state.js",
            "--extra-js",
            "tools/demo-boot.js",
            "--out",
            "dist/index.demo.html",
        ],
        cwd=ROOT,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
    )
    print(build_demo.stdout, end="")
    if build_demo.returncode != 0:
        print(build_demo.stderr)
        return build_demo.returncode

    build_check = subprocess.run(
        [
            sys.executable,
            str(BUILD),
            "--extra-js",
            "src/data/demo-state.js",
            "--extra-js",
            "tools/demo-boot.js",
            "--extra-js",
            "tools/e2e/enter-workbench.js",
            "--extra-js",
            "tools/audit/demo-verify.js",
            "--out",
            "dist/_demo-check.html",
        ],
        cwd=ROOT,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
    )
    if build_check.returncode != 0:
        print(build_check.stderr)
        return build_check.returncode

    br = browser()
    if not br:
        fail("no headless browser")
        return 1

    url = file_url(CHECK_HTML)
    cmd = [
        str(br),
        "--headless=new",
        "--virtual-time-budget=45000",
        "--disable-gpu",
        "--no-first-run",
        "--allow-file-access-from-files",
        "--dump-dom",
        url,
    ]
    proc = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace", timeout=90)
    html = proc.stdout
    proc2 = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace", timeout=90)
    m2 = re.search(r"step1 cards=(\d+)", proc2.stdout)
    m1 = re.search(r"step1 cards=(\d+)", html)
    if m1 and m2 and m1.group(1) != m2.group(1):
        fail(f"demo-idempotent — first={m1.group(1)} second={m2.group(1)}")
    elif m1 and m2:
        ok(f"demo-idempotent — both loads cards={m1.group(1)}")
    m = re.search(r'id="DEMO_AUDIT_JSON"[^>]*>(\[.*?\])</pre>', html, re.S)
    if not m:
        fail("demo-verify did not finish (no DEMO_AUDIT_JSON)")
    else:
        checks = json.loads(m.group(1))
        for row in checks:
            if row.get("ok"):
                ok(f"{row.get('id')} — {row.get('detail', '')}")
            else:
                fail(f"{row.get('id')} — {row.get('detail', '')}")

    deliverable = DELIVERABLE.read_text(encoding="utf-8")
    if "DEMO BUILD" in deliverable or "DEMO_USER_STATE" in deliverable:
        fail("deliverable contains demo markers")
    else:
        ok("deliverable isolated from demo content")
    sample = "Should TEPCO have communicated site risks"
    if sample in deliverable:
        fail("deliverable contains sample question text")
    else:
        ok("deliverable has no sample question text")

    print(f"---\nSUMMARY: FAIL={failures}")
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
