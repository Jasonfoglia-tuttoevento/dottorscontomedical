import { Shield, Award, Clock, Heart } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Ricerca accessibile",
    description: "Consulta strutture e servizi attraverso un percorso semplice e ordinato"
  },
  {
    icon: Award,
    title: "Opzioni confrontabili",
    description: "Raccogli le informazioni disponibili e confronta i preventivi con maggiore chiarezza"
  },
  {
    icon: Clock,
    title: "Richiesta guidata",
    description: "Invia le informazioni necessarie con un check-up digitale in pochi passaggi"
  },
  {
    icon: Heart,
    title: "Assistenza Dedicata",
    description: "Facilitiamo il contatto tra te e le strutture durante la ricerca"
  }
];

export default function HomeFeatures() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-secondary-dark">
              Perché scegliere <span className="text-primary">Facile Medical</span>
            </h2>
            <p className="text-secondary mb-8">
              Mettiamo in contatto pazienti e strutture sanitarie per semplificare
              ricerca, richieste di preventivo e confronto delle opzioni.
            </p>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#CCF3EC] flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary-dark mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-secondary text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#CCF3EC] to-gray-100 p-8">
              <div className="w-full h-full rounded-2xl bg-white shadow-2xl flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-5xl font-bold text-primary mb-2">Facile</div>
                  <div className="text-secondary mb-4">Un percorso digitale chiaro</div>
                  <div className="flex justify-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-.1.3-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-sm text-secondary">Semplice · Affidabile · Vicino · Conveniente</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
