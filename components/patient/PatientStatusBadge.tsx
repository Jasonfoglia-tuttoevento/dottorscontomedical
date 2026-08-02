import { CheckCircle2, Clock, MessageSquare } from "lucide-react";
import type { CheckupStatus } from "@/lib/types/database";

export default function PatientStatusBadge({ status }: { status: CheckupStatus }) {
  if (status === "new") {
    return <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700"><Clock className="h-3 w-3" />In attesa</span>;
  }
  if (status === "contacted") {
    return <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700"><MessageSquare className="h-3 w-3" />Contattato</span>;
  }
  return <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700"><CheckCircle2 className="h-3 w-3" />Completato</span>;
}
