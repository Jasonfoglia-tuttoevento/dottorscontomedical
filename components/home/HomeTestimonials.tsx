import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Marco R.",
    city: "Milano",
    treatment: "Implantologia dentale",
    text: "Ho raccolto le informazioni principali e confrontato le opzioni con maggiore chiarezza.",
  },
  {
    name: "Giulia M.",
    city: "Roma",
    treatment: "Ortodonzia trasparente",
    text: "Il percorso guidato mi ha aiutato a spiegare bene ciò di cui avevo bisogno prima del contatto.",
  },
  {
    name: "Alessandro B.",
    city: "Torino",
    treatment: "Faccette dentali",
    text: "Un modo semplice per orientarmi tra i servizi e inviare la richiesta a una struttura.",
  },
];

export default function HomeTestimonials() {
  return (
    <section id="recensioni" className="scroll-mt-20 bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-black text-gray-950 md:text-5xl">Esperienze sulla piattaforma</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">Esempi dimostrativi del percorso dedicato ai trattamenti dentali.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article key={testimonial.name} className="relative rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
              <Quote className="absolute right-6 top-6 h-8 w-8 text-[#CCF3EC]" />
              <div className="mb-5 flex gap-1">{Array.from({ length: 5 }, (_, index) => <Star key={index} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}</div>
              <p className="leading-7 text-gray-700">“{testimonial.text}”</p>
              <div className="mt-6 border-t border-gray-100 pt-5">
                <p className="font-black text-gray-950">{testimonial.name}</p>
                <p className="mt-1 text-sm text-gray-500">{testimonial.city} · {testimonial.treatment}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
