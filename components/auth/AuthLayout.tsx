import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">{children}</div>
      </div>

      {/* Right - Visual */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-gray-900">
        <img
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80"
          alt="Medical"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>

        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          <Link href="/" className="mb-auto">
            <Image
              src="/images/dottorsconto-logo.png"
              alt="Dottor Sconto"
              width={180}
              height={48}
              className="h-12 w-auto brightness-0 invert"
              priority
            />
          </Link>
          <h2 className="text-4xl font-black mb-4 leading-tight">
            La tua salute,<br />
            il tuo <span className="text-red-600">risparmio</span>.
          </h2>
          <p className="text-gray-300 text-lg max-w-md">
            Unisciti a oltre 1000 pazienti che hanno già trovato la clinica perfetta.
          </p>
        </div>
      </div>
    </div>
  );
}