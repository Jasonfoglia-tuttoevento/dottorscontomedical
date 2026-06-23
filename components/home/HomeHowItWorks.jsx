import { ClipboardCheck, Search, Users, Calendar } from "lucide-react";

const steps = [
  {
    icon: ClipboardCheck,
    step: "01",
    title: "Check-up Gratuito",
    description: "Compila il form con le tue esigenze e il problema che vuoi risolvere"
  },
  {
    icon: Search,
    step: "02",
    title: "Analisi del Caso",
    description: "Il nostro team analizza la tua richiesta e identifica le soluzioni migliori"
  },
  {
    icon: Users,
    step: "03",
    title: "Matching Cliniche",
    description: "Ricevi 3 proposte di cliniche verificate e confronta i preventivi"
  },
  {
    icon: Calendar,
    step: "04",
    title: "Prenota Visita",
    description: "Scegli la clinica che preferisci e prenota la tua prima visita"
  }
];

export default function HomeHowItWorks() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary-dark">
            Come funziona
          </h2>
          <p className="text-secondary max-w-2xl mx-auto">
            Da zero a clinica in 4 semplici passi, completamente gratuito
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
              )}

              <div className="text-center relative z-10">
                <div className="w-24 h-24 rounded-full bg-white shadow-lg border-2 border-primary flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-10 h-10 text-primary" />
                </div>
                
                <div className="text-primary font-bold text-sm mb-2">
                  {item.step}
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-secondary-dark">
                  {item.title}
                </h3>
                
                <p className="text-secondary text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}