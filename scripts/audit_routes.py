from pathlib import Path
import re
import sys

root = Path(__file__).resolve().parents[1]
app = root / "app"
source_roots = [app, root / "components"]

routes = set()
patterns = []
for path in app.rglob("*"):
    if not path.is_file() or path.name not in {"page.tsx", "page.ts", "page.jsx", "page.js", "route.ts", "route.js"}:
        continue
    relative = path.parent.relative_to(app)
    segments = []
    dynamic = False
    for part in relative.parts:
        if part.startswith("(") and part.endswith(")"):
            continue
        if part.startswith("[") and part.endswith("]"):
            dynamic = True
            segments.append("*")
        else:
            segments.append(part)
    route = "/" + "/".join(segments)
    route = route.rstrip("/") or "/"
    if dynamic:
        regex = "^" + re.escape(route).replace(r"\*", "[^/]+") + "$"
        patterns.append(re.compile(regex))
    else:
        routes.add(route)

reference_pattern = re.compile(r"(?:href|action)\s*=\s*[\"'](/[^\"'`$]*)[\"']")
missing = []
for base in source_roots:
    for path in list(base.rglob("*.tsx")) + list(base.rglob("*.ts")):
        text = path.read_text(encoding="utf-8")
        for match in reference_pattern.finditer(text):
            raw = match.group(1)
            route = raw.split("#", 1)[0].split("?", 1)[0].rstrip("/") or "/"
            if route.startswith("/brand/") or route.startswith("/api/"):
                continue
            if route in routes or any(pattern.match(route) for pattern in patterns):
                continue
            missing.append((path.relative_to(root), raw))

if missing:
    print("Collegamenti interni verso route mancanti:")
    for path, route in sorted(set(missing)):
        print("- {0}: {1}".format(path, route))
    sys.exit(1)

print("Route audit superato: nessun collegamento statico verso pagine mancanti.")
