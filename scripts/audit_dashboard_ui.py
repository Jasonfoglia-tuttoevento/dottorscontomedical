from pathlib import Path
import re
import sys

root = Path(__file__).resolve().parents[1]
checks = []


def require(path: str, needle: str, description: str) -> None:
    file_path = root / path
    checks.append((file_path.exists() and needle in file_path.read_text(encoding="utf-8"), description, path))


def forbid(path: str, needle: str, description: str) -> None:
    file_path = root / path
    checks.append((file_path.exists() and needle not in file_path.read_text(encoding="utf-8"), description, path))


def absent(path: str, description: str) -> None:
    checks.append((not (root / path).exists(), description, path))


# No persistent side banners.
absent("components/admin/AdminSidebar.tsx", "Sidebar admin persistente rimossa")
absent("components/clinics/ClinicSidebar.tsx", "Sidebar clinica persistente rimossa")
require("app/dashboard/admin/layout.tsx", "<AdminDashboardNav />", "Admin usa sezioni cliccabili orizzontali")
require("app/dashboard/clinic/layout.tsx", "<ClinicDashboardNav />", "Clinica usa sezioni cliccabili orizzontali")
require("app/dashboard/patient/layout.tsx", "<PatientDashboardHeader", "Paziente usa navigazione dedicata")

# Long pages split into routes.
for route in [
    "app/dashboard/clinic/performance/page.tsx",
    "app/dashboard/clinic/plans/page.tsx",
    "app/dashboard/clinic/profile/general/page.tsx",
    "app/dashboard/clinic/profile/contacts/page.tsx",
    "app/dashboard/clinic/profile/hours/page.tsx",
    "app/dashboard/clinic/profile/gallery/page.tsx",
    "app/dashboard/clinic/profile/services/page.tsx",
    "app/dashboard/admin/activity/page.tsx",
    "app/dashboard/admin/plans/page.tsx",
    "app/dashboard/patient/requests/page.tsx",
]:
    checks.append(((root / route).exists(), "Route dashboard modulare presente", route))

require("app/dashboard/patient/requests/page.tsx", "PAGE_SIZE = 8", "Archivio paziente paginato")
require("app/dashboard/clinic/profile/page.tsx", 'redirect("/dashboard/clinic/profile/general")', "Profilo clinica apre la prima sezione")

# Pricing is centralized and transparent.
require("lib/billing/plans.ts", 'monthlyPrice: 99', "Prezzo Plus centralizzato")
require("lib/billing/plans.ts", 'monthlyPrice: 0', "Piano Free centralizzato")
require("lib/billing/plans.ts", "non sono ancora attivi addebiti automatici", "Disclaimer beta presente")
require("components/billing/PlanComparison.tsx", "PlanCard", "Confronto piani modulare")

# Existing operational controls remain connected.
require("components/clinics/profile/sections/HoursSection.tsx", ".update({ opening_hours: hours })", "Salvataggio orari collegato al database")
require("components/clinics/profile/sections/ServicesSection.tsx", '.eq("clinic_id", clinic.id)', "Azioni servizi limitate alla clinica corrente")
require("components/clinics/profile/sections/GallerySection.tsx", "ProfileSaveMessage", "Upload immagini mostra feedback")
require("components/admin/clinics/ClinicTable.tsx", 'className="space-y-4 md:hidden"', "Cliniche admin leggibili su mobile")
require("components/admin/users/UserTable.tsx", 'className="space-y-4 md:hidden"', "Utenti admin leggibili su mobile")
require("components/clinics/leads/LeadTable.tsx", "md:hidden", "Lead clinica leggibili su mobile")

# No known placeholders or dead hash links.
for source_root in [root / "app/dashboard", root / "components/admin", root / "components/clinics", root / "components/patient", root / "components/billing"]:
    for path in source_root.rglob("*.tsx"):
        text = path.read_text(encoding="utf-8")
        for marker in ["TODO:", "funzionalità in sviluppo"]:
            if marker in text:
                checks.append((False, f"Placeholder operativo trovato: {marker}", str(path.relative_to(root))))
        if "/dashboard/clinic/profile#" in text:
            checks.append((False, "Link hash del vecchio profilo trovato", str(path.relative_to(root))))

# Every form button must have an explicit type unless it submits a form intentionally.
button_pattern = re.compile(r"<button(?![^>]*\btype=)[^>]*>", re.DOTALL)
for source_root in [root / "components/admin", root / "components/clinics", root / "components/patient"]:
    for path in source_root.rglob("*.tsx"):
        text = path.read_text(encoding="utf-8")
        if button_pattern.search(text):
            checks.append((False, "Pulsante senza type esplicito", str(path.relative_to(root))))

failed = [item for item in checks if not item[0]]
if failed:
    print("Audit dashboard non superato:")
    for _, description, path in failed:
        print(f"- {description} ({path})")
    sys.exit(1)

print(f"Dashboard UI audit superato: {len(checks)} controlli statici completati.")
