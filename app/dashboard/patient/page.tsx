import { requireUserRole } from "@/lib/auth/get-user-context";
import { getCheckupsByPatientEmail } from "@/lib/data/checkups";
import type { CheckupStatus } from "@/lib/types/database";
import Link from "next/link";
import Image from "next/image";
import { brand } from "@/lib/brand";
import {
  FileText, CheckCircle2, Clock,
  MessageSquare, ArrowRight, User, LogOut
} from "lucide-react";

export default async function PatientDashboard() {
  const context = await requireUserRole("patient");
  const checkups = await getCheckupsByPatientEmail(context.user.email ?? "");

  const getStatusBadge = (status: CheckupStatus) => {
    switch(status) {
      case 'new': return <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold flex items-center gap-1"><Clock className="w-3 h-3" /> In Attesa</span>;
      case 'contacted': return <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-bold flex items-center gap-1"><MessageSquare className="w-3 h-3" /> Contattato</span>;
      case 'converted': return <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Completato</span>;
      default: return <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Dashboard */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src={brand.logoCompact} alt={brand.name} width={512} height={512} className="h-10 w-10 object-contain" />
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
              <User className="w-4 h-4" />
              <span className="font-medium truncate max-w-[150px]">{context.user.email}</span>
            </div>
            <form action="/auth/signout" method="POST">
              <button type="submit" className="p-2 text-gray-400 hover:text-[#0D47A1] transition rounded-full hover:bg-[#E6FAF5]">
                <LogOut className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 mb-2">Le tue Richieste</h1>
          <p className="text-gray-500">Monitora lo stato dei tuoi preventivi e gestisci le comunicazioni.</p>
        </div>

        {/* Stats Rapide */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-400 font-bold uppercase mb-1">Totale Richieste</p>
            <p className="text-2xl font-black text-gray-900">{checkups?.length || 0}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-400 font-bold uppercase mb-1">In Attesa</p>
            <p className="text-2xl font-black text-blue-600">{checkups?.filter(c => c.status === 'new').length || 0}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-400 font-bold uppercase mb-1">Contattati</p>
            <p className="text-2xl font-black text-yellow-600">{checkups?.filter(c => c.status === 'contacted').length || 0}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-400 font-bold uppercase mb-1">Completati</p>
            <p className="text-2xl font-black text-green-600">{checkups?.filter(c => c.status === 'converted').length || 0}</p>
          </div>
        </div>

        {/* Lista Richieste */}
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
          {checkups.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Nessuna richiesta trovata</h3>
              <p className="text-gray-500 mb-6">Non hai ancora richiesto preventivi.</p>
              <Link href="/check-up" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0D47A1] text-white rounded-xl font-bold hover:bg-[#0B3B86] transition">
                Fai la tua prima richiesta <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {checkups.map((checkup) => (
                <div key={checkup.id} className="p-6 md:p-8 hover:bg-gray-50/50 transition-colors group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                    {/* Info Richiesta */}
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#0D47A1] transition-colors">
                          {checkup.treatment}
                        </h3>
                        {getStatusBadge(checkup.status)}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-gray-400" /> {checkup.category}
                        </span>
                        {checkup.city && (
                          <span className="flex items-center gap-1.5">
                            <User className="w-4 h-4 text-gray-400" /> {checkup.city}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-gray-400" />
                          {new Date(checkup.created_at).toLocaleDateString('it-IT')}
                        </span>
                      </div>

                      {checkup.notes && (
                        <p className="mt-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100 italic">
                          &ldquo;{checkup.notes}&rdquo;
                        </p>
                      )}
                    </div>

                    {/* Azioni */}
                    <div className="flex items-center gap-3 shrink-0">
                      {checkup.status === 'new' && (
                        <span className="text-xs text-gray-400 font-medium px-4 py-2 bg-gray-50 rounded-lg border border-gray-100">
                          In elaborazione...
                        </span>
                      )}
                      {(checkup.status === 'contacted' || checkup.status === 'converted') && (
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-sm hover:border-[#99E7DB] hover:text-[#0D47A1] transition shadow-sm">
                          <MessageSquare className="w-4 h-4" /> Messaggi
                        </button>
                      )}
                      <Link
                        href={`/dashboard/patient/checkup/${checkup.id}`}
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#0D47A1] text-white rounded-xl font-bold text-sm hover:bg-[#0B3B86] transition shadow-md shadow-[#0D47A1]/10"
                      >
                        Dettagli <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
