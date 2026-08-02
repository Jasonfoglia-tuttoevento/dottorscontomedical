import Link from "next/link";

interface LegalDraftProps {
  title: string;
  children: React.ReactNode;
}

export default function LegalDraft({ title, children }: LegalDraftProps) {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16">
      <article className="mx-auto max-w-3xl rounded-2xl border border-amber-200 bg-white p-8 shadow-sm md:p-12">
        <Link href="/" className="text-sm font-bold text-[#0D47A1]">← Torna alla homepage</Link>
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          Documento provvisorio per la beta dimostrativa. Deve essere validato da un professionista prima della raccolta pubblica di dati reali.
        </div>
        <h1 className="mt-8 text-4xl font-black text-gray-900">{title}</h1>
        <div className="mt-8 space-y-5 leading-7 text-gray-700">{children}</div>
      </article>
    </main>
  );
}
