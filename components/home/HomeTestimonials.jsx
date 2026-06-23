import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Marco R.",
    city: "Milano",
    treatment: "Implantologia dentale",
    rating: 5,
    text: "Ho risparmiato oltre il 40% rispetto al preventivo iniziale. Il team mi ha seguito passo passo nella scelta della clinica migliore.",
    avatar: "https://i.pravatar.cc/150?img=12"
  },
  {
    name: "Giulia M.",
    city: "Roma",
    treatment: "Trapianto capelli",
    rating: 5,
    text: "Servizio eccezionale. In 24 ore avevo già 3 proposte di cliniche verificate. Risultato perfetto e prezzo onesto.",
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    name: "Alessandro B.",
    city: "Torino",
    treatment: "Medicina estetica",
    rating: 5,
    text: "Professionali e trasparenti. Nessuna sorpresa, solo il risparmio promesso. Consigliatissimo!",
    avatar: "https://i.pravatar.cc/150?img=33"
  }
];

export default function HomeTestimonials() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary-dark">
            Cosa dicono i nostri pazienti
          </h2>
          <p className="text-secondary max-w-2xl mx-auto">
            Oltre 1000 persone hanno già scelto Dottor Sconto Medical
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="card p-8 relative">
              <Quote className="absolute top-6 right-6 w-8 h-8 text-red-100" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-secondary-dark mb-6 italic">
                "{t.text}"
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <img 
                  src={t.avatar} 
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-secondary-dark">{t.name}</div>
                  <div className="text-sm text-secondary">{t.city} • {t.treatment}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}