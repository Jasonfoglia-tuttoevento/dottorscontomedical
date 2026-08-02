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
    description:
      "Per iniziare a costruire la presenza digitale della clinica su FACILE MEDICAL.",
    highlighted: false,
    badge: "Ingresso",
    features: [
      "Profilo pubblico della clinica",
      "Pubblicazione di contatti e orari",
      "Servizi e prezzi pubblicabili",
      "Ricezione delle richieste assegnate",
      "Dashboard operativa essenziale",
      "Statistiche principali del profilo",
    ],
    limits: [
      "Visibilità standard nel marketplace",
      "Nessun posizionamento prioritario",
      "Supporto tramite email",
    ],
  },
  {
    id: "plus",
    name: "Plus",
    monthlyPrice: 499,
    annualPrice: 4990,
    description:
      "Un servizio gestito di visibilità, posizionamento e sviluppo commerciale per cliniche che vogliono attrarre pazienti nazionali e internazionali.",
    highlighted: true,
    badge: "Crescita gestita",
    features: [
      "Tutte le funzioni comprese nel piano Free",
      "Badge Plus e profilo verificato",
      "Posizionamento prioritario nel marketplace",
      "Analitiche avanzate su visualizzazioni, visitatori unici e click",
      "Monitoraggio delle interazioni su telefono, email, sito e richieste",
      "Onboarding completo gestito da FACILE MEDICAL",
      "Configurazione professionale di servizi, prezzi, orari e galleria",
      "Ottimizzazione del profilo in italiano, inglese e albanese",
      "Revisione trimestrale di testi, immagini e offerta commerciale",
      "Report mensile delle performance con azioni consigliate",
      "Account manager dedicato con revisione commerciale mensile",
      "Supporto prioritario entro un giorno lavorativo",
      "Playbook operativo per migliorare la gestione e la conversione dei lead",
      "Una vetrina o iniziativa stagionale per trimestre, secondo disponibilità",
    ],
    limits: [
      "€499 al mese",
      "€4.990 all’anno: due mesi inclusi",
      "Attivazione e onboarding gestiti manualmente durante la beta",
      "Le iniziative promozionali sono soggette a disponibilità editoriale",
      "Il servizio non garantisce un numero minimo di lead, pazienti o ricavi",
    ],
  },
];

export const plansDisclaimer =
  "Il piano Plus combina software e servizi commerciali gestiti. Durante la beta non sono ancora attivi addebiti automatici o limiti tecnici per piano; attivazione e fatturazione vengono amministrate manualmente da FACILE MEDICAL.";
