#!/usr/bin/env python3
"""
Rebuild the tiny browser-readable site state from the two JSON files in /data.

Keeping this generated means the site still works when I open index.html
directly from Finder/Rider, without needing fetch() or a local web server.
"""

from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]

site = json.loads((ROOT / "data" / "site.json").read_text(encoding="utf-8"))
updates = json.loads((ROOT / "data" / "updates.json").read_text(encoding="utf-8"))

payload = {"site": site, "updates": updates}

output = (
    "// Generated from data/site.json + data/updates.json.\n"
    "// Edit the JSON files, then run tools/build_site_state.py.\n"
    f"window.NADA_WORKBENCH_STATE = {json.dumps(payload, indent=2)};\n"
)

(ROOT / "assets" / "site-state.js").write_text(output, encoding="utf-8")
print("Built assets/site-state.js")
