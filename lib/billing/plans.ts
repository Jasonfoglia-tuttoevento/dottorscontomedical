export interface SaasPlan {
  id: "free" | "plus";
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  highlighted: boolean;
  badge: string;
  features: string[];
  limits: string[];
}

export const saasPlans: SaasPlan[] = [
  {
    id: "free",
    name: "Free",
    monthlyPrice: 0,
    annualPrice: 0,
    description: "Per iniziare a costruire la presenza della clinica su FACILE MEDICAL.",
    highlighted: false,
    badge: "Ingresso",
    features: [
      "Profilo pubblico della clinica",
      "Dati di contatto e orari",
      "Servizi e prezzi pubblicabili",
      "Ricezione delle richieste assegnate",
      "Dashboard operativa essenziale",
    ],
    limits: [
      "Visibilità standard nel marketplace",
      "Statistiche essenziali",
      "Supporto tramite email",
    ],
  },
  {
    id: "plus",
    name: "Plus",
    monthlyPrice: 99,
    annualPrice: 990,
    description: "Per cliniche che vogliono maggiore visibilità, controllo e supporto commerciale.",
    highlighted: true,
    badge: "Consigliato",
    features: [
      "Tutte le funzioni del piano Free",
      "Priorità nel marketplace con attivazione beta manuale",
      "Analytics e andamento delle richieste",
      "Contatti dei lead accettati",
      "Supporto onboarding prioritario",
      "Materiali e assistenza per il profilo commerciale",
    ],
    limits: [
      "€99 al mese",
      "€990 all'anno: due mesi inclusi",
      "Attivazione manuale durante la beta",
    ],
  },
];

export const plansDisclaimer =
  "Prezzi beta indicativi. In questa versione non sono ancora attivi addebiti automatici o limiti tecnici per piano.";
