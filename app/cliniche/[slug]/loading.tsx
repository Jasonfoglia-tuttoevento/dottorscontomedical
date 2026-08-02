export default function ClinicDetailLoading() {
  return (
    <div className="min-h-screen animate-pulse bg-[#F2F4F7]" aria-busy="true" aria-label="Caricamento struttura">
      <div className="h-20 bg-white" />
      <div className="h-96 bg-[#0B1D3A]/80" />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[2fr_1fr]">
        <div className="h-80 rounded-3xl bg-white" />
        <div className="h-64 rounded-3xl bg-white" />
      </div>
    </div>
  );
}
