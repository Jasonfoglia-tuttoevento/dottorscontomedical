import Link from "next/link";
import { ArrowRight, Clock, CheckCircle } from "lucide-react";

const leads = [
  {
    id: 1,
    patient: "Marco R.",
    treatment: "Implantologia",
    city: "Milano",
    budget: "€3.000-5.000",
    status: "new",
    time: "2 ore fa",
  },
  {
    id: 2,
    patient: "Giulia M.",
    treatment: "Trapianto capelli",
    city: "Roma",
    budget: "€5.000-8.000",
    status: "contacted",
    time: "5 ore fa",
  },
  {
    id: 3,
    patient: "Alessandro B.",
    treatment: "Sbiancamento",
    city: "Torino",
    budget: "€500-1.000",
    status: "new",
    time: "1 giorno fa",
  },
];

export default function RecentLeads() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Lead Recenti</h3>
          <Link href="/dashboard/clinic/leads" className="text-red-600 hover:text-red-700 text-sm font-semibold">
            Vedi tutti
          </Link>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {leads.map((lead) => (
          <div key={lead.id} className="p-4 hover:bg-gray-50 transition">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="font-semibold text-gray-900">{lead.patient}</div>
                <div className="text-sm text-gray-600">{lead.treatment}</div>
              </div>
              {lead.status === "new" ? (
                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                  Nuovo
                </span>
              ) : (
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                  Contattato
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
              <span>{lead.city}</span>
              <span>•</span>
              <span>{lead.budget}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="w-3 h-3" />
              {lead.time}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200">
        <Link
          href="/dashboard/clinic/leads"
          className="flex items-center justify-center gap-2 text-red-600 hover:text-red-700 font-semibold text-sm"
        >
          Vedi tutti i lead
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}