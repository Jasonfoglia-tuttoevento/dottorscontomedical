import Link from "next/link";
import { Smile, Scissors, Sparkles, ArrowUpRight } from "lucide-react";

const categories = [
  {
    icon: Smile,
    title: "Dentali",
    description: "Implantologia, ortodonzia, sbiancamento e igiene dentale professionale",
    slug: "dentali",
    clinics: 24,
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80",
    gradient: "from-red-600 to-red-800"
  },
  {
    icon: Scissors,
    title: "Capelli",
    description: "Trapianti, cura della calvizie, trattamenti tricologici avanzati",
    slug: "capelli",
    clinics: 18,
    image: "https://images.unsplash.com/photo-1585232004423-244e0e6904e3?w=800&q=80",
    gradient: "from-gray-700 to-gray-900"
  },
  {
    icon: Sparkles,
    title: "Estetica",
    description: "Medicina estetica, dermatologia, trattamenti viso e corpo di ultima generazione",
    slug: "estetica",
    clinics: 15,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
    gradient: "from-red-600 to-gray-800"
  }
];

export default function HomeCategories() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-50 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-red-600 rounded-full"></span>
            <span className="text-red-600 text-sm font-semibold uppercase tracking-wide">
              Specializzazioni
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            Scegli la tua area<br />
            di <span className="text-red-600">interesse</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tre macro-categorie, centinaia di cliniche verificate, un unico obiettivo: la tua salute.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link 
              key={cat.slug}
              href={`/cliniche?cat=${cat.slug}`}
              className="group relative overflow-hidden rounded-3xl bg-gray-100 aspect-[4/5] cursor-pointer"
            >
              {/* Image */}
              <img 
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.gradient} opacity-80 group-hover:opacity-90 transition-opacity`}></div>
              
              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-8 text-white">
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <cat.icon className="w-7 h-7" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white group-hover:text-gray-900 transition">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <div className="text-sm font-semibold text-white/70 mb-2 uppercase tracking-wider">
                    {cat.clinics} cliniche disponibili
                  </div>
                  <h3 className="text-3xl font-black mb-3">{cat.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}