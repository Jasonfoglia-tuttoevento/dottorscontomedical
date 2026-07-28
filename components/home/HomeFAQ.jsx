import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Il check-up è davvero gratuito?",
    a: "Sì, il check-up iniziale è gratuito e senza impegno. Serve a raccogliere le informazioni utili per inoltrare la tua richiesta alle strutture disponibili; non sostituisce una diagnosi medica."
  },
  {
    q: "Come vengono selezionate le cliniche?",
    a: "Puoi consultare le informazioni pubblicate dalle strutture e confrontare servizi, sede e contatti prima di scegliere come procedere."
  },
  {
    q: "Devo pagare qualcosa in più?",
    a: "No, il nostro servizio è gratuito per i pazienti. Le cliniche partner ci riconoscono una fee solo se decidi di prenotare."
  },
  {
    q: "Posso parlare direttamente con la clinica?",
    a: "Sì, dopo il matching puoi chattare direttamente con la clinica tramite la piattaforma per chiarire ogni dubbio."
  },
  {
    q: "In quanto tempo ricevo le proposte?",
    a: "I tempi dipendono dalla disponibilità delle strutture. Potrai controllare lo stato della richiesta dalla tua area personale."
  },
  {
    q: "Che specializzazioni coprite?",
    a: "Attivamente copriamo tre macro-aree: dentali (implantologia, ortodonzia, igiene), capelli (trapianti, tricologia) ed estetica (medicina estetica, dermatologia)."
  }
];

export default function HomeFAQ() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary-dark">
            Domande frequenti
          </h2>
          <p className="text-secondary">
            Tutto quello che devi sapere sul nostro servizio
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="card group overflow-hidden">
              <summary className="w-full px-6 py-5 text-left flex justify-between items-center cursor-pointer font-semibold text-secondary-dark hover:bg-gray-50 transition">
                {faq.q}
                <ChevronDown className="w-5 h-5 transition group-open:rotate-180 text-primary flex-shrink-0 ml-4" />
              </summary>
              <div className="px-6 pb-5 text-secondary">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
