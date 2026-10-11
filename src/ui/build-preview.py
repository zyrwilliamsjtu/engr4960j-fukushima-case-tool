"""Inline the UI branch into preview.html without changing the PI's tools/dist.

Usage: python src/ui/build-preview.py
No third-party Python packages are required.
"""
from pathlib import Path
import re

root = Path(__file__).resolve().parents[2]
html = (root / "index.html").read_text(encoding="utf-8")


def css(match):
    content = (root / match[1]).read_text(encoding="utf-8")
    return "<style>\n" + content + "\n</style>"


def script(match):
    content = (root / match[1]).read_text(encoding="utf-8")
    content = re.sub(r"</script", r"<\/script", content, flags=re.IGNORECASE)
    return "<script>\n" + content + "\n</script>"


html = re.sub(r'<link rel="stylesheet" href="([^"]+)">', css, html)
html = re.sub(r'<script src="([^"]+)"></script>', script, html)
output = root / "preview.html"
output.write_text(html, encoding="utf-8")
print(f"Built {output.name}: {output.stat().st_size:,} bytes")
