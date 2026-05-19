#!/usr/bin/env python3
"""Phase 1 POC for PMSalad landing page asset + dependency readiness.

This intentionally avoids app code and verifies the core landing-page foundation:
- Uploaded video and screenshots are reachable and have expected content types.
- Frontend animation dependencies are installed (gsap + three).
- CTA destinations are valid absolute/internal links.
"""
from __future__ import annotations

import json
import sys
import urllib.request
from pathlib import Path

ASSETS = {
    "hero_video": "https://customer-assets.emergentagent.com/job_c1d005c6-6d66-49fd-82a5-0351e7bff432/artifacts/mirnp0mk_Video_Generation_Successful.mp4",
    "meeting_ui": "https://customer-assets.emergentagent.com/job_c1d005c6-6d66-49fd-82a5-0351e7bff432/artifacts/71gccsq9_Screenshot%202026-04-26%20at%2016.23.51.png",
    "tasks_ui": "https://customer-assets.emergentagent.com/job_c1d005c6-6d66-49fd-82a5-0351e7bff432/artifacts/rmek14xo_Screenshot%202026-04-26%20at%2016.24.06.png",
    "graph_ui": "https://customer-assets.emergentagent.com/job_c1d005c6-6d66-49fd-82a5-0351e7bff432/artifacts/epo3vn2m_Screenshot%202026-04-26%20at%2016.24.21.png",
    "kanban_ui": "https://customer-assets.emergentagent.com/job_c1d005c6-6d66-49fd-82a5-0351e7bff432/artifacts/46pcbf67_Screenshot%202026-04-26%20at%2016.24.45.png",
}

CTA_LINKS = {
    "start_free": "https://pmsalad-f.vercel.app/signup",
    "sign_in": "https://pmsalad-f.vercel.app/login",
    "book_demo": "#contact",
    "demo_mailto_fallback": "mailto:hello@pmsalad.com?subject=Book%20a%20PMSalad%20demo",
}


def check_asset(name: str, url: str) -> bool:
    req = urllib.request.Request(url, headers={"User-Agent": "PMSaladLandingPOC/1.0", "Range": "bytes=0-2048"})
    with urllib.request.urlopen(req, timeout=20) as resp:
        status = getattr(resp, "status", 200)
        content_type = resp.headers.get("content-type", "").lower()
        content_length = resp.headers.get("content-length")
        sample = resp.read(32)
    expected = "video" if name == "hero_video" else "image"
    ok = 200 <= status < 400 and expected in content_type and len(sample) > 0
    print(f"[{ 'PASS' if ok else 'FAIL' }] {name}: status={status}, type={content_type}, length={content_length}")
    return ok


def check_dependencies() -> bool:
    package_path = Path("/app/frontend/package.json")
    package = json.loads(package_path.read_text())
    deps = package.get("dependencies", {})
    checks = {
        "gsap": "gsap" in deps,
        "three": "three" in deps,
        "react": "react" in deps,
    }
    for dep, ok in checks.items():
        print(f"[{ 'PASS' if ok else 'FAIL' }] dependency:{dep}")
    return all(checks.values())


def check_ctas() -> bool:
    ok = True
    for name, link in CTA_LINKS.items():
        valid = link.startswith("https://") or link.startswith("#") or link.startswith("mailto:")
        print(f"[{ 'PASS' if valid else 'FAIL' }] cta:{name} -> {link}")
        ok = ok and valid
    return ok


def main() -> int:
    results = []
    results.extend(check_asset(name, url) for name, url in ASSETS.items())
    results.append(check_dependencies())
    results.append(check_ctas())
    if all(results):
        print("\nCORE POC SUCCESS: landing assets, animation dependencies, and CTA foundations are ready.")
        return 0
    print("\nCORE POC FAILED: fix failed checks before app implementation.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
