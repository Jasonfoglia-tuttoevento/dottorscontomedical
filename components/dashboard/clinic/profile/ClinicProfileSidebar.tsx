"use client";

import { useState } from "react";
import { Building2, MapPin, Phone, Clock, Image, Star, FileText } from "lucide-react";

const sections = [
  { id: "general", label: "Informazioni Generali", icon: Building2 },
  { id: "location", label: "Indirizzo e Mappa", icon: MapPin },
  { id: "contact", label: "Contatti", icon: Phone },
  { id: "hours", label: "Orari", icon: Clock },
  { id: "gallery", label: "Galleria Foto", icon: Image },
  { id: "services", label: "Servizi", icon: FileText },
  { id: "reviews", label: "Recensioni", icon: Star },
];

export default function ClinicProfileSidebar() {
  const [activeSection, setActiveSection] = useState("general");

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sticky top-6">
      <h3 className="font-bold text-gray-900 mb-4 px-3">Sezioni</h3>
      <nav className="space-y-1">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
              activeSection === section.id
                ? "bg-red-50 text-red-600"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <section.icon className="w-5 h-5" />
            {section.label}
          </button>
        ))}
      </nav>
    </div>
  );
}